#!/usr/bin/env node
// Export a filtered copy of a motion library, e.g. to drop third-party entries
// before redistributing the file.
// Usage: node tools/export-subset.mjs --sources "Aceternity UI,React Bits" --out my-library.json [--db path]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  console.log([
    'export-subset.mjs - filter a motion library by source',
    '',
    'Usage:',
    '  node tools/export-subset.mjs --out <file> [--sources "a,b"] [--cats "a,b"] [--exclude-sources "a,b"] [--db <path>]',
    '',
    'At least one of --sources / --cats / --exclude-sources is required.',
  ].join('\n'));
  process.exit(0);
}
function get(name, dflt) { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt; }
const list = (name) => (get(name, '') || '').split(',').map((s) => s.trim()).filter(Boolean);
const sources = list('--sources');
const cats = list('--cats');
const excludeSources = list('--exclude-sources');
const out = get('--out', '');
if (!out || (!sources.length && !cats.length && !excludeSources.length)) { console.error('need --out and at least one filter; see --help'); process.exit(64); }

const dbPath = path.resolve(get('--db', process.env.MOTION_DB || path.join(HERE, '..', 'data', 'motion-db.json')));
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const entries = (Array.isArray(db) ? db : (db.entries || [])).filter((e) => {
  if (sources.length && !sources.includes(e.source)) return false;
  if (cats.length && !cats.includes(e.cat)) return false;
  if (excludeSources.length && excludeSources.includes(e.source)) return false;
  return true;
});
const srcCount = {};
entries.forEach((e) => { srcCount[e.source] = (srcCount[e.source] || 0) + 1; });
const payload = { version: (db.version || 1), built: new Date().toISOString().slice(0, 10), sources: srcCount, entries };
fs.writeFileSync(path.resolve(out), JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log('wrote ' + out + ' with ' + entries.length + ' entries');
