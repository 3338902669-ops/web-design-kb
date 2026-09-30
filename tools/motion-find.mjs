#!/usr/bin/env node
// Score library entries against a per-section query set.
// Usage: node tools/motion-find.mjs --queries queries.json [--db path] [--top 7] [--json]
// queries.json: { "M0 hero": "3D|metal|text", "M1 rooms": "mask|reveal|parallax" }
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help') || !argv.includes('--queries')) {
  console.log([
    'motion-find.mjs - score entries against a per-section query set',
    '',
    'Usage:',
    '  node tools/motion-find.mjs --queries <queries.json> [--db <path>] [--top <n>] [--json]',
    '',
    'queries.json example:',
    '  { "M0 hero": "3D|metal|text", "M1 detail": "mask|reveal|parallax" }',
  ].join('\n'));
  process.exit(argv.includes('--queries') ? 0 : 64);
}
function get(name, dflt) { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt; }
const dbPath = path.resolve(get('--db', process.env.MOTION_DB || path.join(HERE, '..', 'data', 'motion-db.json')));
const top = Number(get('--top', '7')) || 7;
const queries = JSON.parse(fs.readFileSync(path.resolve(get('--queries', '')), 'utf8'));
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const entries = (Array.isArray(db) ? db : (db.entries || [])).filter((e) => (e.status || 'valid') === 'valid');

function score(e, kws) {
  const hay = [e.name, e.motion, e.style, (e.tags || []).join(' ')].filter(Boolean).join(' ');
  let s = 0;
  for (const k of kws) if (hay.includes(k)) s += 1;
  if ((e.tags || []).includes('3D')) s += 1.5;
  if (/3d|三维/i.test((e.name || '') + (e.motion || ''))) s += 0.5;
  if (e.nature === 'prompt' || e.nature === 'self-authored') s += 0.5;
  if (e.status === 'valid') s += 0.3;
  return s;
}
const result = {};
for (const [block, pattern] of Object.entries(queries)) {
  const kws = String(pattern).split('|').map((s) => s.trim()).filter(Boolean);
  const scored = entries.map((e) => ({ e, s: score(e, kws) })).filter((x) => x.s > 1.6).sort((a, b) => b.s - a.s).slice(0, top);
  result[block] = scored;
}
if (argv.includes('--json')) console.log(JSON.stringify({ db: dbPath, queries, result }, null, 2));
else for (const [block, scored] of Object.entries(result)) {
  console.log('\n### ' + block + '  (' + scored.length + ' candidates)');
  scored.forEach((x) => console.log(' - [' + x.s.toFixed(1) + '] ' + [x.e.name, x.e.source, x.e.cat, (x.e.tags || []).join('/'), String(x.e.key || '').slice(0, 60)].join(' | ')));
  if (!scored.length) console.log('   (no entry above the score floor - widen the query or check that the library is loaded)');
}
