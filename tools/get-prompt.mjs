#!/usr/bin/env node
// Resolve a library entry (name, id or slug) to its full prompt text.
// Usage: node tools/get-prompt.mjs <name|id|slug> [--db path] [--prompts dir] [--print] [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
if (!argv.length || argv.includes('-h') || argv.includes('--help')) {
  console.log([
    'get-prompt.mjs - resolve an entry to its full prompt text',
    '',
    'Usage: node tools/get-prompt.mjs <name|id|slug> [--print] [--json] [--db <path>] [--prompts <dir>]',
    '',
    'Prints metadata and the path; --print also dumps the full prompt text.',
  ].join('\n'));
  process.exit(argv.length ? 0 : 64);
}
function get(name, dflt) { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt; }
const query = argv.find((a, i) => !a.startsWith('-') && a !== get('--db', '') && a !== get('--prompts', ''));
const dbPath = path.resolve(get('--db', process.env.MOTION_DB || path.join(HERE, '..', 'data', 'motion-db.json')));
const promptsDir = path.resolve(get('--prompts', path.join(HERE, '..', 'data')));
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const entries = Array.isArray(db) ? db : (db.entries || []);
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const q = norm(query);

let hit = entries.find((e) => e.id === query || e.key === query);
if (!hit) hit = entries.find((e) => norm(e.name) === q);
if (!hit) hit = entries.find((e) => norm(e.name).includes(q) || String(e.key || '').toLowerCase().includes(String(query).toLowerCase()));
if (!hit) { console.error('no entry matched "' + query + '"'); process.exit(1); }

let promptRel = hit.promptRef || null;
if (!promptRel) {
  const m = String(hit.key || '').match(/motionsites\/[^/]+\/([^/]+)/);
  if (m) {
    const cand = path.join(promptsDir, 'prompts', m[1] + '.md');
    if (fs.existsSync(cand)) promptRel = 'prompts/' + m[1] + '.md';
  }
}
const promptAbs = promptRel ? path.join(promptsDir, promptRel) : null;
const info = {
  query,
  entry: { name: hit.name, id: hit.id, source: hit.source, cat: hit.cat, tags: hit.tags, url: hit.url || null },
  prompt: promptRel && fs.existsSync(promptAbs)
    ? { ref: promptRel, chars: fs.statSync(promptAbs).size }
    : { ref: null, note: 'no prompt mirrored for this entry; use the official URL (components) or treat the description as inspiration only' },
};
if (argv.includes('--json')) console.log(JSON.stringify(info, null, 2));
else {
  console.log('entry : ' + info.entry.name + '  [' + info.entry.source + ' / ' + info.entry.cat + ']');
  console.log('url   : ' + (info.entry.url || '(none)'));
  console.log('prompt: ' + (info.prompt.ref || '(none)'));
  if (argv.includes('--print') && info.prompt.ref) console.log('\n' + fs.readFileSync(promptAbs, 'utf8'));
}
