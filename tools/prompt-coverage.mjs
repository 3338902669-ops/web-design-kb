#!/usr/bin/env node
// Report which library entries carry an executable spec and which carry metadata only.
// Usage: node tools/prompt-coverage.mjs --db data/motion-db.json [--repo .] [--json <file>] [--check]
// Exit codes: 0 ok; 1 generated manifest is stale (--check); 2 usage/IO error.
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  console.log([
    'prompt-coverage.mjs - what fraction of the library is actually implementable',
    '',
    'Usage: node tools/prompt-coverage.mjs --db data/motion-db.json [--repo .] [--json <file>] [--check]',
    '',
    'An entry counts as:',
    '  promptRef  - a shipped prompt file resolves from the repo root',
    '  url-spec   - no prompt text, but the entry has an official component/demo URL',
    '  no-spec    - metadata only; never treat it as a design spec',
    '',
    '--json <file>  write the manifest',
    '--check        compare the manifest on disk with the library; exit 1 if stale',
  ].join('\n'));
  process.exit(0);
}
const dbIdx = argv.indexOf('--db');
const dbPath = dbIdx >= 0 && argv[dbIdx + 1] ? argv[dbIdx + 1] : 'data/motion-db.json';
const repoIdx = argv.indexOf('--repo');
const repo = repoIdx >= 0 && argv[repoIdx + 1] ? argv[repoIdx + 1] : '.';
const jsonIdx = argv.indexOf('--json');
const jsonOut = jsonIdx >= 0 && argv[jsonIdx + 1] ? argv[jsonIdx + 1] : '';
const check = argv.includes('--check');

let db;
try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (e) {
  console.error('cannot read db: ' + e.message);
  process.exit(2);
}
const entries = Array.isArray(db) ? db : (db.entries || []);
const withRef = [];
const urlSpec = [];
const noSpec = [];
for (const e of entries) {
  const ref = e.promptRef || '';
  if (ref && !/^https?:/i.test(ref)) {
    if (fs.existsSync(path.join(repo, ref))) { withRef.push(e); continue; }
    console.error('WARN  unresolvable promptRef: ' + e.name + ' -> ' + ref);
  }
  if (/^https?:\/\//i.test(String(e.url || ''))) { urlSpec.push(e); continue; }
  noSpec.push(e);
}
const by = (arr, key) => arr.reduce((m, e) => (m[e[key] || '?'] = (m[e[key] || '?'] || 0) + 1, m), {});
const report = {
  generated: new Date().toISOString().slice(0, 10),
  db: path.relative(repo, dbPath).split(path.sep).join('/'),
  totals: {
    entries: entries.length,
    withPromptRef: withRef.length,
    executableUrlOnly: urlSpec.length,
    noExecutableSpec: noSpec.length,
  },
  bySourceOfNoSpec: by(noSpec, 'source'),
  byNatureOfNoSpec: by(noSpec, 'nature'),
  missing: noSpec.map((e) => ({ name: e.name, source: e.source, cat: e.cat, nature: e.nature, status: e.status, id: e.id || null })),
};
if (jsonOut) {
  const text = JSON.stringify(report, null, 1) + '\n';
  if (check) {
    let old = null;
    try { old = JSON.parse(fs.readFileSync(jsonOut, 'utf8')); } catch { /* missing or broken */ }
    const same = old && JSON.stringify(old.totals) === JSON.stringify(report.totals)
      && JSON.stringify(old.missing) === JSON.stringify(report.missing);
    if (!same) { console.error('STALE  ' + jsonOut + ' does not match the library; regenerate it'); process.exit(1); }
    console.log('OK  ' + jsonOut + ' matches the library');
  } else {
    fs.writeFileSync(jsonOut, text);
    console.log('wrote ' + jsonOut);
  }
}
console.log(JSON.stringify(report.totals));
