# data/ - bundled motion library

> **Third-party content. Read [THIRD-PARTY-NOTICE.md](../THIRD-PARTY-NOTICE.md) before redistribution or
> commercial use.**
>
> **This is an idea index, not a design baseline.** It was collected from showcase/demo sites and
> component galleries: the aesthetic skews dark/3D/spectacle, and most entries are one line of
> description with no executable spec. Use `tools/motion-search.mjs --has-spec` when you need
> something you can actually implement.

| File | What it is |
|---|---|
| `motion-db.json` | the library: 751 entries with descriptions, tags, strength, source and reference keys |
| `backgrounds-index.json` | background-only description index |
| `site-components-motion.json` | component-library subset (official component URLs) |
| `framesbase-motion-merged.json` | merged motion descriptions for one source |
| `prompts/<slug>.md` | **164 full prompt texts** mirrored from the upstream MIT repo |
| `prompts/motionsites/<Name>.md` | 65 further prompts from the same upstream repo |
| `prompts-index.json` | slug -> file, title, size, sha256 prefix, provenance |

## Exact counts (as published)

```
entries   751
valid     594
suspect   157   (5 flagged by the original collection + 152 degraded captures)
sources   Framesbase 620 | Aceternity UI 108 | React Bits 22 | self-authored 1
cats      Sites 336 | Backgrounds 151 | Components 130 | Sections 91 | Apps 43
strength  unknown 620 | light 107 | strong 23 | cinematic 1
3D        text rule 73 | tag rule 137 | union 138   (tag is not a strict superset: use the union)
prompts   229 files / 1.7 MB of text: 209 of 751 entries resolve to a full prompt
spec      130 components carry an official URL; the rest without a prompt are inspiration only
```

### Why 152 entries are `suspect`

A background batch failed during capture: the entries have an empty `name` and `motion: "ERR:..."`.
They are kept for provenance and are marked `status: "suspect"` with a `notes` field, so search tools
(which only return `valid`) skip them. One duplicated id was de-duplicated in the same pass.

This means the published valid count (594) is **lower than the raw collection's** (746). If you only want
clean, usable entries, this file already reflects that.

## Rebuilding

Point the tools at your own file instead of editing this one:

```bash
MOTION_DB=./data/my-library.json node tools/motion-search.mjs -k particles
node tools/motion-db-check.mjs data/my-library.json
```

To drop third-party sources before redistributing:

```bash
node tools/export-subset.mjs --sources "Aceternity UI,React Bits,self-authored" --out my-library.json
```
