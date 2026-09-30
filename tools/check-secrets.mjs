#!/usr/bin/env node
// Scan a directory for likely secrets. Dependency-free, best-effort, no network.
// Usage: node tools/check-secrets.mjs [dir ...] [--json]
// Exit codes: 0 clean, 1 findings, 2 usage/IO error.
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  console.log('check-secrets.mjs - scan for likely secrets\nUsage: node tools/check-secrets.mjs [dir ...] [--json]');
  process.exit(0);
}
const asJson = argv.includes('--json');
const targets = argv.filter((a) => !a.startsWith('-'));
if (!targets.length) targets.push('.');

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', '.next', 'coverage', '.cache', 'vendor']);
const SKIP_FILES = new Set(['check-secrets.mjs', 'sanitize-check.mjs', 'package-lock.json', 'pnpm-lock.yaml']);
const TEXT_EXT = /\.(mjs|cjs|js|jsx|ts|tsx|json|md|txt|ya?ml|toml|ini|env|html|css|scss|sh|ps1|bat|cmd|py|rb|go|java|php|xml|svg)$/i;
const MAX_BYTES = 2 * 1024 * 1024;

const RULES = [
  { id: 'aws-access-key', re: /AKIA[0-9A-Z]{16}/g },
  { id: 'github-token', re: /(gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{20,})/g },
  { id: 'openai-style-key', re: /sk-[A-Za-z0-9]{20,}/g },
  { id: 'slack-token', re: /xox[baprs]-[A-Za-z0-9-]{10,}/g },
  { id: 'google-api-key', re: /AIza[0-9A-Za-z\-_]{35}/g },
  { id: 'private-key-block', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { id: 'bearer-token', re: /[Bb]earer\s+[A-Za-z0-9._\-]{24,}/g },
  { id: 'hardcoded-secret-assignment', re: /(password|passwd|secret|api[_-]?key|access[_-]?token|client[_-]?secret)\s*[:=]\s*['"][^'"\n]{12,}['"]/gi },
  { id: 'jwt', re: /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g },
];

function walk(dir, out) {
  let items;
  try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) { if (!SKIP_DIRS.has(it.name)) walk(p, out); continue; }
    if (SKIP_FILES.has(it.name)) continue;
    if (!TEXT_EXT.test(it.name)) continue;
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
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const r of RULES) {
      r.re.lastIndex = 0;
      if (r.re.test(line)) findings.push({ file: path.relative(process.cwd(), f), line: i + 1, rule: r.id });
    }
  });
}

if (asJson) console.log(JSON.stringify({ scanned: files.length, findings }, null, 2));
else {
  console.log('scanned ' + files.length + ' files; findings: ' + findings.length);
  findings.slice(0, 100).forEach((x) => console.log('  ' + x.file + ':' + x.line + '  ' + x.rule));
  if (findings.length > 100) console.log('  ... ' + (findings.length - 100) + ' more');
}
process.exit(findings.length ? 1 : 0);
