#!/usr/bin/env node
// Search a motion library file. Dependency-free.
// Usage: node tools/motion-search.mjs [-k keyword] [-s strength] [-src source] [-cat category]
//        [--db path] [--json] [-h|--help]
// Library path resolution: --db > $MOTION_DB > <repo>/data/motion-db.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);

function usage() {
  console.log([
    'motion-search.mjs - search a motion library',
    '',
    'Usage:',
    '  node tools/motion-search.mjs [-k <keyword>] [-s <light|strong|cinematic>] [-src <source>] [-cat <category>]',
    '                               [--db <path>] [--json] [--limit <n>]',
    '',
    'Notes:',
    '  - Library path resolution: --db > $MOTION_DB > <repo>/data/motion-db.json',
    '  - Only status=valid entries are returned.',
    '  - -s matches the strength field exactly; entries with unknown strength ("?") are filtered out.',
    '  - -k also matches tags.',
  ].join('\n'));
}

if (argv.includes('-h') || argv.includes('--help')) { usage(); process.exit(0); }

function get(name, dflt) {
  const i = argv.indexOf(name);
  if (i < 0) return dflt;
  const v = argv[i + 1];
  return v === undefined || v.startsWith('-') ? dflt : v;
}
const dbPath = path.resolve(get('--db', process.env.MOTION_DB || path.join(HERE, '..', 'data', 'motion-db.json')));
const kw = (get('-k', '') || '').toLowerCase();
const src = (get('-src', '') || '').toLowerCase();
const cat = get('-cat', '') || '';
const st = get('-s', '') || '';
const limit = Number(get('--limit', '40')) || 40;
const asJson = argv.includes('--json');

let db;
try { db = JSON.parse(fs.readFileSync(dbPath, 'utf8')); }
catch (e) { console.error('cannot read library at ' + dbPath + ': ' + e.message); process.exit(2); }
const entries = Array.isArray(db) ? db : (db.entries || []);

const hay = (e) => [e.name, e.tag, e.motion, e.style, (e.tags || []).join(' ')].filter(Boolean).join(' ').toLowerCase();
let out = entries.filter((e) => {
  if ((e.status || 'valid') !== 'valid') return false;
  if (kw && !hay(e).includes(kw)) return false;
  if (src && !String(e.source || '').toLowerCase().includes(src)) return false;
  if (cat && String(e.cat || '') !== cat) return false;
  if (st && String(e.strength || '') !== st) return false;
  return true;
});

if (asJson) {
  console.log(JSON.stringify({ db: dbPath, match: out.length, entries: out }, null, 2));
} else {
  console.log('MATCH ' + out.length + ' (db: ' + dbPath + ')');
  out.slice(0, limit).forEach((e) => console.log([
    e.source || '?', e.cat || '?', e.name || '?', e.strength || '?', (e.motion || '').slice(0, 60),
  ].join(' | ')));
}
