#!/usr/bin/env node
// Validate a motion library file: JSON, required fields, id uniqueness, enum values, self-authored notes.
// Empty/degraded entries are reported as findings; degrade them further or mark them status=suspect.
// Usage: node tools/motion-db-check.mjs [path] [--strict]   (default: data/motion-db.json)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const strict = argv.includes('--strict');
const target = path.resolve(argv[0] && !argv[0].startsWith('-') ? argv[0] : path.join(HERE, '..', 'data', 'motion-db.json'));
const NATURES = ['prompt', 'visual', 'component', 'frame', 'self-authored'];
const STATUSES = ['valid', 'suspect'];

let db;
try { db = JSON.parse(fs.readFileSync(target, 'utf8')); }
catch (e) { console.error('FAIL cannot parse ' + target + ': ' + e.message); process.exit(1); }

const entries = Array.isArray(db) ? db : (db.entries || []);
const errors = [];
const warnings = [];
const seen = new Map();
entries.forEach((e, i) => {
  const at = 'entry[' + i + '] ' + (e && e.name ? e.name : '(unnamed)');
  if (!e || typeof e !== 'object') { errors.push(at + ': not an object'); return; }
  for (const f of ['source', 'status']) if (!e[f]) errors.push(at + ': missing required field "' + f + '"');
  if (e.status && !STATUSES.includes(e.status)) errors.push(at + ': status must be one of ' + STATUSES.join('|'));
  if (e.nature && !NATURES.includes(e.nature)) errors.push(at + ': nature must be one of ' + NATURES.join('|'));
  if (e.tags && !Array.isArray(e.tags)) errors.push(at + ': tags must be an array');
  if (e.id) { const n = (seen.get(e.id) || 0) + 1; seen.set(e.id, n); if (n > 1) errors.push(at + ': duplicate id ' + e.id); }
  if (e.nature === 'self-authored' && !e.notes) errors.push(at + ': self-authored entries require notes pointing at the implementation');
  if (!e.name) (e.status === 'suspect' ? warnings : errors).push(at + ': empty name' + (e.status === 'suspect' ? ' (marked suspect)' : ''));
  if (!e.key && !e.id) warnings.push(at + ': no key/id - the entry cannot be re-found later');
  if (!e.motion && e.status !== 'suspect') warnings.push(at + ': no motion description');
  if (e.status === 'suspect' && strict) warnings.push(at + ': suspect entry (excluded from candidate lists)');
});
const unknownStrength = entries.filter((e) => !e.strength).length;
if (unknownStrength) warnings.push(unknownStrength + '/' + entries.length + ' entries have no strength value (tools that filter by strength will drop them)');
const suspect = entries.filter((e) => e.status === 'suspect').length;

console.log(JSON.stringify({ file: path.relative(process.cwd(), target), entries: entries.length, valid: entries.length - suspect, suspect, errors: errors.length, warnings: warnings.length, strict }, null, 2));
errors.forEach((e) => console.log('ERROR   ' + e));
warnings.slice(0, 25).forEach((w) => console.log('WARN    ' + w));
if (warnings.length > 25) console.log('WARN    ... ' + (warnings.length - 25) + ' more');
process.exit(errors.length ? 1 : 0);
