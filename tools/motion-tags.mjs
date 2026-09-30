#!/usr/bin/env node
// Tag frequency and 3D audit for a motion library.
// Usage: node tools/motion-tags.mjs [--db path] [--tag <name>] [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  console.log('motion-tags.mjs - tag frequency and 3D audit\nUsage: node tools/motion-tags.mjs [--db <path>] [--tag <name>] [--json]');
  process.exit(0);
}
function get(name, dflt) { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt; }
const dbPath = path.resolve(get('--db', process.env.MOTION_DB || path.join(HERE, '..', 'data', 'motion-db.json')));
const only = get('--tag', '');

let db;
try { db = JSON.parse(fs.readFileSync(dbPath, 'utf8')); }
catch (e) { console.error('cannot read library at ' + dbPath + ': ' + e.message); process.exit(2); }
const entries = Array.isArray(db) ? db : (db.entries || []);

const freq = {};
entries.forEach((e) => (e.tags || []).forEach((t) => { freq[t] = (freq[t] || 0) + 1; }));
const ranked = Object.entries(freq).sort((a, b) => b[1] - a[1]);

if (only) {
  const hit = entries.filter((e) => (e.tags || []).includes(only));
  console.log('TAG ' + only + ' -> ' + hit.length);
  hit.forEach((e) => console.log(' - ' + [e.name, e.source, e.cat, e.strength].join(' | ')));
} else if (argv.includes('--json')) {
  console.log(JSON.stringify({ db: dbPath, tags: Object.fromEntries(ranked), threeD: entries.filter((e) => (e.tags || []).includes('3D')).length }, null, 2));
} else {
  console.log('tags (count): ' + ranked.map(([k, v]) => k + ':' + v).join('  '));
  const three = entries.filter((e) => (e.tags || []).includes('3D'));
  console.log('--- entries tagged 3D: ' + three.length + ' (first 40) ---');
  three.slice(0, 40).forEach((e) => console.log(' - ' + [e.name, e.source, e.cat, e.strength].join(' | ')));
}
