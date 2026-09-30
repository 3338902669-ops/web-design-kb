#!/usr/bin/env node
// Scan a directory for personal or machine-specific data before publishing.
// Usage: node tools/sanitize-check.mjs [dir ...] [--json] [--ignore <file>] [--banned "a,b,c"]
// Exit codes: 0 clean, 1 findings, 2 usage/IO error.
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  console.log([
    'sanitize-check.mjs - find personal or machine-specific data before publishing',
    '',
    'Usage: node tools/sanitize-check.mjs [dir ...] [--json] [--ignore <file>] [--banned "word1,word2"]',
    '',
    'Built-in rules: user home paths (Windows backslash and forward slash, macOS, Linux),',
    'email addresses, private LAN IPs, localhost/private hostnames with ports.',
    '',
    'Extend per project (.sanitizeignore is loaded automatically from the current directory):',
    '  --ignore <file>   regex allow-list, one per line (# for comments); "path:<re>" skips whole paths',
    '  --banned "a,b"    literal strings that must never appear (internal codenames, client names).',
    '                    ASCII words match on word boundaries; non-ASCII match as substrings.',
    '',
    'Keep a committed .sanitizeignore next to the repo root and run this in CI.',
  ].join('\n'));
  process.exit(0);
}
const asJson = argv.includes('--json');
const showSamples = argv.includes('--show-samples');

const ignoreIdx = argv.indexOf('--ignore');
const ignoreFile = ignoreIdx >= 0 && argv[ignoreIdx + 1] ? argv[ignoreIdx + 1] : '.sanitizeignore';
const extraIgnores = [];
const pathIgnores = [];
if (fs.existsSync(ignoreFile)) {
  fs.readFileSync(ignoreFile, 'utf8').split(/\r?\n/).forEach((l) => {
    const s = l.trim();
    if (!s || s.startsWith('#')) return;
    if (s.startsWith('path:')) pathIgnores.push(new RegExp(s.slice(5)));
    else extraIgnores.push(new RegExp(s));
  });
}
const bannedIdx = argv.indexOf('--banned');
const banned = bannedIdx >= 0 && argv[bannedIdx + 1]
  ? argv[bannedIdx + 1].split(',').map((s) => s.trim()).filter(Boolean)
  : [];
const skipIdx = new Set();
if (ignoreIdx >= 0) skipIdx.add(ignoreIdx + 1);
if (bannedIdx >= 0) skipIdx.add(bannedIdx + 1);
const targets = argv.filter((a, i) => !a.startsWith('-') && !skipIdx.has(i));
if (!targets.length) targets.push('.');

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', '.next', 'coverage', '.cache', 'vendor']);
const SKIP_FILES = new Set(['sanitize-check.mjs', 'check-secrets.mjs', '.sanitizeignore']);
const TEXT_EXT = /\.(mjs|cjs|js|jsx|ts|tsx|json|md|txt|ya?ml|toml|ini|env|html|css|scss|sh|ps1|bat|cmd|py|rb|go|java|php|xml|svg)$/i;
const MAX_BYTES = 2 * 1024 * 1024;

const RULES = [
  { id: 'windows-user-path', re: /[A-Za-z]:[\\/]{1,2}Users[\\/]{1,2}[^\\/\s"']+/g },
  { id: 'mac-home-path', re: /\/Users\/[A-Za-z0-9._-]+/g },
  { id: 'linux-home-path', re: /\/home\/[A-Za-z0-9._-]+/g },
  { id: 'email-address', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g },
  { id: 'private-lan-ip', re: /\b(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/g },
  { id: 'localhost-service', re: /\b(localhost|127\.0\.0\.1):\d{2,5}\b/g },
  { id: 'private-hostname', re: /\b[a-z0-9-]+\.(local|lan|internal|intranet|corp)\b/gi },
];

function bannedHit(line, word) {
  const ascii = /^[\x20-\x7e]+$/.test(word);
  if (!ascii) return line.includes(word);
  const w = word.toLowerCase();
  const l = line.toLowerCase();
  let idx = l.indexOf(w);
  const isWordChar = (c) => /[a-z0-9_-]/.test(c);
  while (idx >= 0) {
    const before = idx > 0 ? l[idx - 1] : '';
    const after = idx + w.length < l.length ? l[idx + w.length] : '';
    if (!isWordChar(before) && !isWordChar(after)) return true;
    idx = l.indexOf(w, idx + 1);
  }
  return false;
}

function walk(dir, out) {
  let items;
  try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) { if (!SKIP_DIRS.has(it.name)) walk(p, out); continue; }
    if (SKIP_FILES.has(it.name)) continue;
    if (!TEXT_EXT.test(it.name)) continue;
    { const rel = path.relative(process.cwd(), p).replace(/\\/g, '/'); if (pathIgnores.some((r) => r.test(rel) || r.test(p.replace(/\\/g, '/')))) continue; }
    try { if (fs.statSync(p).size > MAX_BYTES) continue; } catch { continue; }
    out.push(p);
  }
}

const files = [];
targets.forEach((t) => {
  const p = path.resolve(t);
  if (!fs.existsSync(p)) { console.error('path not found: ' + p); process.exit(2); }
  if (fs.statSync(p).isDirectory()) walk(p, files); else files.push(p);
});

const findings = [];
for (const f of files) {
  let text;
  try { text = fs.readFileSync(f, 'utf8'); } catch { continue; }
  text.split(/\r?\n/).forEach((line, i) => {
    if (extraIgnores.some((r) => r.test(line))) return;
    for (const r of RULES) {
      r.re.lastIndex = 0;
      const m = r.re.exec(line);
      if (m) findings.push({ file: path.relative(process.cwd(), f), line: i + 1, rule: r.id, sample: m[0].slice(0, 60) });
    }
    for (const w of banned) {
      if (bannedHit(line, w)) findings.push({ file: path.relative(process.cwd(), f), line: i + 1, rule: 'banned-word', sample: w });
    }
  });
}

const display = showSamples ? findings : findings.map((x) => Object.assign({}, x, { sample: '[redacted]' }));
if (asJson) console.log(JSON.stringify({ scanned: files.length, banned, findings: display }, null, 2));
else {
  console.log('scanned ' + files.length + ' files; findings: ' + findings.length + (banned.length ? ' (banned: ' + banned.join(',') + ')' : ''));
  display.slice(0, 100).forEach((x) => console.log('  ' + x.file + ':' + x.line + '  ' + x.rule + '  ' + x.sample));
  if (findings.length > 100) console.log('  ... ' + (findings.length - 100) + ' more');
}
process.exit(findings.length ? 1 : 0);
