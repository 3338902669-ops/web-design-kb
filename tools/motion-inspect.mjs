#!/usr/bin/env node
// Audit a motion library: size, fields, distributions, 3D counts.
// Usage: node tools/motion-inspect.mjs [--db path] [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  console.log('motion-inspect.mjs - library audit\nUsage: node tools/motion-inspect.mjs [--db <path>] [--json]');
  process.exit(0);
}
const i = argv.indexOf('--db');
const dbPath = path.resolve(i >= 0 && argv[i + 1] ? argv[i + 1] : (process.env.MOTION_DB || path.join(HERE, '..', 'data', 'motion-db.json')));

let db;
try { db = JSON.parse(fs.readFileSync(dbPath, 'utf8')); }
catch (e) { console.error('cannot read library at ' + dbPath + ': ' + e.message); process.exit(2); }
const entries = Array.isArray(db) ? db : (db.entries || []);

const count = (fn) => entries.reduce((a, e) => { const k = fn(e) || '(none)'; a[k] = (a[k] || 0) + 1; return a; }, {});
const dist = (fn) => Object.fromEntries(Object.entries(count(fn)).sort((a, b) => b[1] - a[1]));
const text3d = entries.filter((e) => /3d|三维/i.test((e.name || '') + (e.motion || ''))).length;
const tag3d = entries.filter((e) => (e.tags || []).includes('3D')).length;
const union3d = entries.filter((e) => /3d|三维/i.test((e.name || '') + (e.motion || '')) || (e.tags || []).includes('3D')).length;

const report = {
  db: path.relative(process.cwd(), dbPath),
  entries: entries.length,
  fields: entries[0] ? Object.keys(entries[0]) : [],
  status: dist((e) => e.status),
  source: dist((e) => e.source),
  category: dist((e) => e.cat),
  strength: dist((e) => e.strength || '?'),
  nature: dist((e) => e.nature),
  threeD: { textRule: text3d, tagRule: tag3d, union: union3d },
};
if (argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log('db       ' + report.db);
  console.log('entries  ' + report.entries);
  console.log('fields   ' + report.fields.join(','));
  console.log('status   ' + JSON.stringify(report.status));
  console.log('sources  ' + JSON.stringify(report.source));
  console.log('cats     ' + JSON.stringify(report.category));
  console.log('strength ' + JSON.stringify(report.strength));
  console.log('nature   ' + JSON.stringify(report.nature));
  console.log('3D       text=' + text3d + ' tag=' + tag3d + ' union=' + union3d);
  const unknown = (report.strength['?'] || 0);
  if (unknown > report.entries / 2) console.log('WARNING  ' + unknown + '/' + report.entries + ' entries have unknown strength; -s filters will silently drop them.');
}
