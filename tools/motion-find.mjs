#!/usr/bin/env node
// Score library entries against a per-section query set.
// Usage: node tools/motion-find.mjs --queries queries.json [--db path] [--top 7]
//        [--require-spec] [--fit-first] [--want-3d] [--json]
//
// Ranking rule (2026-10 update, fixes the "3D demo always wins" failure):
//   semantic fit first, executable spec second, strength/impact last.
//   3D is opt-in: pass --want-3d to give 3D entries a bonus.
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
    '  node tools/motion-find.mjs --queries <queries.json> [--top <n>] [--db <path>]',
    '                             [--require-spec] [--fit-first] [--want-3d] [--json]',
    '',
    '  --require-spec  only return entries with an executable spec (mirrored prompt or official URL)',
    '  --fit-first     rank semantic fit above impact (default)',
    '  --want-3d       give 3D-tagged entries a bonus (off by default: 3D must be justified by the brief)',
    '',
    'queries.json example:',
    '  { "M0 hero": "editorial|type reveal|line", "M1 proof": "mask|reveal|scroll" }',
  ].join('\n'));
  process.exit(argv.includes('--queries') ? 0 : 64);
}
function get(name, dflt) { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt; }
const dbPath = path.resolve(get('--db', process.env.MOTION_DB || path.join(HERE, '..', 'data', 'motion-db.json')));
const top = Number(get('--top', '7')) || 7;
const requireSpec = argv.includes('--require-spec');
const want3d = argv.includes('--want-3d');
const queries = JSON.parse(fs.readFileSync(path.resolve(get('--queries', '')), 'utf8'));
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
let entries = (Array.isArray(db) ? db : (db.entries || [])).filter((e) => (e.status || 'valid') === 'valid');

const hasSpec = (e) => Boolean(e.promptRef || e.url || e.nature === 'component');
if (requireSpec) entries = entries.filter(hasSpec);

function score(e, kws) {
  const hay = [e.name, e.tag, e.style, e.motion, (e.tags || []).join(' ')].filter(Boolean).join(' ');
  let hit = 0;
  for (const k of kws) if (hay.includes(k)) hit += 1;
  const fit = hit / Math.max(1, kws.length);          // 0..1 semantic fit
  let s = fit * 4;                                     // fit dominates
  if (fit === 0) return -1;                            // never rank an unrelated entry
  if (hasSpec(e)) s += 1.2;                            // executable beats pretty-but-vague
  if (e.promptRef) s += 0.6;
  if (e.nature === 'component') s += 0.3;
  if (want3d && ((e.tags || []).includes('3D') || /3d|三维/i.test((e.name || '') + (e.motion || '')))) s += 1.0;
  if (e.strength === '强' || e.strength === '电影级' || /电影级|强动效/.test(e.motion || '')) s += 0.4;
  return s;
}
const result = {};
for (const [block, pattern] of Object.entries(queries)) {
  const kws = String(pattern).split('|').map((s) => s.trim()).filter(Boolean);
  const scored = entries.map((e) => ({ e, s: score(e, kws) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, top);
  result[block] = scored;
}
if (argv.includes('--json')) {
  console.log(JSON.stringify({ db: dbPath, requireSpec, want3d, queries, result }, null, 2));
} else {
  console.log('# db=' + path.relative(process.cwd(), dbPath) + ' require-spec=' + requireSpec + ' want-3d=' + want3d);
  for (const [block, scored] of Object.entries(result)) {
    console.log('\n### ' + block + '  (' + scored.length + ' candidates)');
    scored.forEach((x) => console.log(' - [' + x.s.toFixed(1) + '] ' + [
      x.e.name, x.e.source, x.e.cat, (x.e.tags || []).join('/'),
      hasSpec(x.e) ? (x.e.promptRef ? 'prompt:' + x.e.promptRef : 'url') : 'NO-SPEC',
    ].join(' | ')));
    if (!scored.length) console.log('   (nothing matched with an executable spec - widen the query, or relax --require-spec and record the gap)');
  }
}
