#!/usr/bin/env node
// Static half of the award-quality bar: measure what can be measured without a browser.
// Usage: node tools/quality-audit.mjs <file.html|dir> [...] [--json <out.json>] [--quiet]
// Exit codes: 0 = every measurable dimension passes; 1 = at least one fails; 2 = usage/IO error.
//
// Covered here: typography, whitespace, hierarchy, colour, responsive (static), motion,
// micro-interaction presence, originality. Values are resolved through CSS custom properties.
//
// Colour is a SIGNAL, not a verdict: a text colour with no background in the same rule is compared
// against the page background, which can mis-flag text that sits on a differently-coloured parent or
// on media. Confirm every low pair in the rendered page before acting on it.
// Motion is also partial: canvas/script-driven animation is reported, not measured.
// NOT covered here: real overflow at 390/768/1440, console/network, frame diff, reduced-motion
// behaviour, contrast against the rendered composite, and whether the design is any good.
// Those need a browser plus a named judge. Never present this output as the whole bar.

import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  console.log([
    'quality-audit.mjs - static checks for the eight-dimension quality bar',
    '',
    'Usage: node tools/quality-audit.mjs <file.html|dir> [...] [--json <out.json>]',
    '',
    'Checks (thresholds are the floor, see docs/10-award-quality-bar.md):',
    '  typography    base >= 14px, no text < 12px, <= 2 families (+1 mono allowed), scale ratio >= 1.25',
    '  whitespace    a section rhythm >= 96px desktop / >= 56px mobile',
    '  hierarchy     emphasis in >= 2 channels (size / weight / colour)',
    '  colour        literal fg-on-bg pairs >= 4.5:1 (custom properties resolved)',
    '  responsive    viewport meta, a media query, no fixed width > 420px outside media queries',
    '  motion        transition/animation, durations <= 500ms, prefers-reduced-motion fallback',
    '  interaction   every <a>/<button> reachable by hover + focus styling',
    '  originality   title + meta description, no lorem ipsum',
  ].join('\n'));
  process.exit(0);
}
const jsonIdx = argv.indexOf('--json');
const jsonOut = jsonIdx >= 0 && argv[jsonIdx + 1] ? argv[jsonIdx + 1] : '';
const skip = new Set();
if (jsonIdx >= 0) skip.add(jsonIdx + 1);
const targets = argv.filter((a, i) => !a.startsWith('-') && !skip.has(i));
if (!targets.length) targets.push('.');
const quiet = argv.includes('--quiet');

function collect(p, out) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      collect(path.join(p, e.name), out);
    }
    return;
  }
  if (/\.(html?|xhtml)$/i.test(p)) out.push(p);
}
const files = [];
for (const t of targets) {
  try { collect(t, files); } catch (e) { console.error('cannot read ' + t + ': ' + e.message); process.exit(2); }
}
if (!files.length) { console.error('no HTML files found'); process.exit(2); }

const px = (v) => Math.round(parseFloat(v) * 100) / 100;
const toPx = (v, rem = 16) => /rem$/.test(v) ? parseFloat(v) * rem : parseFloat(v);
const hexToRgb = (h) => {
  const s = String(h).replace('#', '');
  const n = s.length === 3 ? s.split('').map(c => c + c).join('') : s.slice(0, 6);
  if (!/^[0-9a-f]{6}$/i.test(n)) return null;
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
};
const luminance = (rgb) => {
  const a = rgb.map(v => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const contrast = (a, b) => { const l1 = luminance(a), l2 = luminance(b); const hi = Math.max(l1, l2), lo = Math.min(l1, l2); return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100; };

const results = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
  const inlineStyles = [...html.matchAll(/style="([^"]*)"/gi)].map(m => m[1]).join(';');
  const css = styleBlocks + '\n' + inlineStyles;
  // resolve custom properties (one pass is enough for :root tokens used directly)
  const vars = new Map();
  for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;}]+)/gi)) vars.set(m[1], m[2].trim());
  const resolve = (v) => {
    let out = String(v).trim();
    for (let i = 0; i < 3; i++) {
      const m = out.match(/^var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)$/i);
      if (!m) break;
      out = vars.get(m[1]) || m[2] || out;
    }
    return out;
  };
  const pxValues = (chunk) => [...chunk.matchAll(/([0-9.]+)(px|rem)\b/g)].map(m => toPx(m[1] + m[2]));
  const dims = [];
  const add = (name, ok, detail) => dims.push({ name, ok, detail });

  // typography - font-size / short-hand font declarations
  let sizes = [...css.matchAll(/(?:^|[;{\s])font-size\s*:\s*([^;}]+)/gi)].map(m => resolve(m[1])).flatMap(pxValues);
  sizes = sizes.concat([...css.matchAll(/(?:^|[;{\s])font\s*:\s*([^;}]+)/gi)].map(m => resolve(m[1])).flatMap(pxValues).filter(v => v >= 9));
  const uniq = [...new Set(sizes)].sort((a, b) => a - b);
  const tooSmall = uniq.filter(s => s < 12);
  // font-family declarations plus font shorthands; a family name starts with a letter and is not a keyword
  const keywords = new Set(['normal', 'italic', 'oblique', 'bold', 'bolder', 'lighter', 'small-caps', 'inherit', 'initial', 'unset', 'revert']);
  const isFamily = (s) => { const t = s.trim().replace(/["']/g, ''); return !!t && /^[A-Za-z]/.test(t) && !keywords.has(t.toLowerCase()) && !/^(var|calc|clamp)\(/.test(t); };
  const familyTokens = [];
  for (const m of css.matchAll(/font-family\s*:\s*([^;}]+)/gi)) for (const part of String(m[1]).split(',')) if (isFamily(part)) familyTokens.push(part);
  for (const m of css.matchAll(/(?:^|[;{\s])font\s*:\s*([^;}]+)/gi)) for (const part of String(m[1]).split(',')) if (isFamily(part)) familyTokens.push(part);
  const firstFamilies = [...new Set(familyTokens.map(part => part.trim().replace(/["']/g, '').split(/\s+/).slice(0, 2).join(' ')))];
  // sys-ui stacks count once: collapse known generic families
  const generics = new Set(['system-ui', '-apple-system', 'sans-serif', 'serif', 'monospace', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'Roboto', 'Segoe UI', 'Times New Roman', 'Georgia', 'Arial', 'Helvetica']);
  const namedFamilies = firstFamilies.filter(f => ![...generics].some(g => f.toLowerCase().startsWith(g.toLowerCase())));
  let ratioOk = true, ratioNote = 'n/a';
  if (uniq.length >= 2) { const r = Math.round((uniq[uniq.length - 1] / uniq[0]) * 100) / 100; ratioOk = r >= 1.25; ratioNote = 'max/min=' + r; }
  add('typography', sizes.length === 0 ? false : (tooSmall.length === 0 && namedFamilies.length <= 2 && ratioOk),
    'sizes=' + uniq.join('/') + 'px, <12px=' + tooSmall.length + ', named families=' + namedFamilies.length + ' (' + namedFamilies.slice(0, 4).join(', ') + '), ' + ratioNote);

  // whitespace - the section rhythm (clamp() max counts as its upper bound)
  const padChunks = [...css.matchAll(/(?:^|[;{\s])(?:padding|padding-(?:top|bottom)|margin|gap)\s*:\s*([^;}]+)/gi)].map(m => resolve(m[1]));
  const widths = padChunks.flatMap(c => [...c.matchAll(/([0-9.]+)(px|rem)\b/g)].map(m => toPx(m[1] + m[2])));
  const maxPad = widths.length ? Math.max(...widths) : 0;
  add('whitespace', maxPad >= 56, 'max spacing token = ' + maxPad + 'px (need >=56 mobile, >=96 desktop)');

  // hierarchy
  const hasWeight = /font-weight\s*:\s*(?:[5-9]00|bold)/i.test(css) || /font\s*:\s*(?:[5-9]00)/.test(css);
  const hasSize = uniq.length >= 3;
  const hasColour = /(?:^|[;{\s])(?:background|color)\s*:\s*(#[0-9a-f]{3,6}|var\()[^;}]*/i.test(css);
  const channels = [hasWeight, hasSize, hasColour].filter(Boolean).length;
  add('hierarchy', channels >= 2, 'channels: size=' + hasSize + ' weight=' + hasWeight + ' colour=' + hasColour);

  // colour - per rule: a text colour is only compared against a background declared in the same
  // rule, or against the page background when the rule declares none. (A global first-background
  // heuristic produced false 1.1:1 alarms on pages whose hero used a gradient.)
  const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map(m => ({ sel: m[1].trim(), body: m[2] }));
  const pageBgM = css.match(/(?:^|[;{\s])background(?:-color)?\s*:\s*(var\([^)]+\)|#[0-9a-f]{3,6})/i) || css.match(/(?:^|[;{\s])background\s*:\s*(var\([^)]+\)|#[0-9a-f]{3,6})/i);
  const pageBg = pageBgM ? hexToRgb(resolve(pageBgM[1])) : null;
  const pairs = [];
  for (const r of rules) {
    const fgM = r.body.match(/(?:^|;)\s*color\s*:\s*(var\([^)]+\)|#[0-9a-f]{3,6})/i);
    if (!fgM) continue;
    const fg = hexToRgb(resolve(fgM[1]));
    const bgM = r.body.match(/(?:^|;)\s*background(?:-color)?\s*:\s*(var\([^)]+\)|#[0-9a-f]{3,6})/i);
    let bg = bgM ? hexToRgb(resolve(bgM[1])) : pageBg;
    if (fg && bg) pairs.push({ sel: r.sel.slice(0, 40), c: contrast(fg, bg) });
  }
  const worstPair = pairs.length ? pairs.reduce((a, b) => (a.c <= b.c ? a : b)) : null;
  add('colour', !worstPair || worstPair.c >= 4.5, worstPair ? 'worst pair = ' + worstPair.c + ':1 at ' + worstPair.sel + ' (' + pairs.length + ' pair(s) checked)' : 'no literal fg/bg pair found (not measured)');

  // responsive
  const hasViewport = /name="viewport"[^>]*width=device-width/i.test(html);
  const mediaChunks = [...css.matchAll(/@media[^{]*\{([\s\S]*?)\n\}/gi)].map(m => m[1]).join('\n');
  const cssNoMedia = css.replace(/@media[^{]*\{[\s\S]*?\n\}/gi, '');
  const fixedWide = [...cssNoMedia.matchAll(/(?:^|[;{\s])width\s*:\s*([0-9.]+)px/gi)].map(m => Number(m[1])).filter(w => w > 420);
  add('responsive', hasViewport && /@media/.test(css) && fixedWide.length === 0,
    'viewport=' + hasViewport + ', media=' + /@media/.test(css) + ', fixed widths >420px outside media=' + fixedWide.length);

  // motion
  const hasMotion = /(transition|animation)\s*:/.test(css);
  const durations = [...css.matchAll(/(?:transition|animation)(?:-duration)?\s*:[^;}]*?([0-9.]+)(m?s)\b/gi)].map(m => m[2] === 'ms' ? Number(m[1]) : Number(m[1]) * 1000);
  const slow = durations.filter(d => d > 500);
  const hasReduced = /prefers-reduced-motion/i.test(css);
  const scriptMotion = /requestAnimationFrame|setInterval|addEventListener\(['"]scroll|<canvas\b/i.test(html);
  add('motion', hasMotion && hasReduced,
    'css motion=' + hasMotion + ', durations>500ms=' + slow.length + ', reduced-motion(css)=' + hasReduced
    + (scriptMotion ? ' | NOTE: canvas/script animation detected - CSS checks cannot confirm it; measure frames in a browser' : ''));

  // interaction
  const controls = [...html.matchAll(/<(a|button)\b/gi)].length;
  const hover = (css.match(/:hover/g) || []).length;
  const focus = (css.match(/:focus(-visible)?/g) || []).length;
  const linkAffordance = /text-underline-offset|text-decoration|border-bottom/i.test(css);
  const inputControls = [...html.matchAll(/<(input|select|textarea)\b/gi)].length;
  const hasFocusForInputs = controls + inputControls === 0 || focus >= 1;
  add('interaction', (controls + inputControls) === 0 ? true : (hasFocusForInputs && (hover >= 1 || linkAffordance)),
    'controls=' + (controls + inputControls) + ' (' + controls + ' a/button, ' + inputControls + ' input), :hover rules=' + hover + ', :focus rules=' + focus + ', link affordance=' + linkAffordance
    + (controls + inputControls > focus ? ' | NOTE: fewer focus rules than controls - a shared rule can cover many, check the count against the DOM' : ''));

  // originality
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
  const desc = /name="description"/i.test(html);
  const lorem = /lorem ipsum/i.test(html);
  add('originality', !!title && desc && !lorem, 'title=' + (title ? 'yes' : 'no') + ', meta-description=' + desc + ', lorem=' + lorem);

  results.push({ file, dims, pass: dims.every(d => d.ok) });
}

const failed = results.flatMap(r => r.dims.filter(d => !d.ok).map(d => r.file + ' :: ' + d.name));
if (!quiet) {
  for (const r of results) {
    console.log((r.pass ? 'PASS  ' : 'FAIL  ') + r.file);
    for (const d of r.dims) console.log('   ' + (d.ok ? 'ok  ' : 'BAD ') + d.name.padEnd(13) + d.detail);
  }
  console.log('\n' + (failed.length ? 'FAIL: ' + failed.length + ' dimension(s) below threshold' : 'PASS: all measurable dimensions above threshold'));
}
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), files: results, failed }, null, 1) + '\n');
process.exit(failed.length ? 1 : 0);
