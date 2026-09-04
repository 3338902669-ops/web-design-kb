import fs from "node:fs";
const db = JSON.parse(fs.readFileSync("C:/Users/33389/.openclaw/workspace/motion-db.json", "utf8"));
const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf("-" + k); return i >= 0 ? args[i + 1] : ""; };
const kw = get("k") || ""; const src = get("src") || ""; const cat = get("cat") || ""; const st = get("s") || "";
let out = db.entries.filter(e => {
  if (kw && !((e.name || "") + (e.tag || "") + (e.motion || "") + (e.style || "")).toLowerCase().includes(kw.toLowerCase())) return false;
  if (src && !(e.source || "").toLowerCase().includes(src.toLowerCase())) return false;
  if (cat && (e.cat || "") !== cat) return false;
  if (st && (e.strength || "") !== st) return false;
  return true;
});
if (!kw && !src && !cat && !st) out = db.entries;
console.log("MATCH " + out.length);
out.slice(0, 40).forEach(e => console.log([e.source || "?", e.cat, e.name, e.strength || "", (e.motion || "").slice(0, 44)].join(" | ")));