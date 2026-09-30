# Third-party notice

This repository contains **metadata describing animation patterns** collected from public and
commercial sources. It does **not** contain the source code, media files, videos or full prompt text of
those sources — only short human-written descriptions, tags, strength labels, provenance fields and
reference keys/URLs, used to make the patterns searchable.

| Source | Entries | Nature | Notes |
|---|---:|---|---|
| Framesbase | 620 | Commercial prompt library (metadata only) | Descriptions and reference keys point at content hosted by Framesbase. No prompt text or media is redistributed here. |
| Aceternity UI | 108 | Open-source React component library | Metadata only; component code lives upstream. |
| React Bits | 22 | Open-source React component collection | Metadata only; component code lives upstream. |
| Original / self-authored | 1 | Produced for this workflow | Included as an example of the `self-authored` entry type. |

Files affected: `data/motion-db.json`, `data/backgrounds-index.json`,
`data/site-components-motion.json`, `data/framesbase-motion-merged.json`.

## What this means for you

- **Read-only research use** of this metadata is the intended use.
- If you **redistribute** this repository or its data, or use it commercially, it is **your
  responsibility** to confirm that your use complies with each upstream source's terms of service and
  licence. This repository grants you no rights to the upstream material.
- If you only need the workflow, you can drop the data entirely — the tools accept any compatible
  library file via `--db` or the `MOTION_DB` environment variable.

## Full prompt texts (`data/prompts/`)

229 prompt files are mirrored locally so the sourcing step has a real specification:

| Source | Files | Licence |
|---|---:|---|
| `xiiiabu/motionsites.ai` (GitHub, also mirrored by the commercial Framesbase service) | 164 + 65 | **MIT** |

Upstream: https://github.com/xiiiabu/motionsites.ai — public and MIT-licensed (verified 2026-09-30).
Files are unmodified. Keep the attribution if you redistribute. These are demo-landing-page
specifications with fictional brands and copy: **replace the demo brand, copy and imagery** before
shipping (see `docs/00-workflow.md` step 6).

## Removing third-party data

~~~bash
# extract only entries from sources you have the rights to redistribute
node tools/export-subset.mjs --sources "Aceternity UI,React Bits,self-authored" --out my-library.json
~~~

## Other projects referenced, not bundled

- **GSAP / ScrollTrigger** — a separate product with its own licence. Install it from npm in your own
  project; nothing from GSAP is bundled here.
- **Blender**, **Figma**, **ffmpeg** and any generative-3D service mentioned in the docs are independent
  tools with their own terms.

## Attribution in your own projects

Licence hygiene is part of the acceptance standard (see `docs/02-acceptance-standard.md`): record the
source and licence of every font, image, model, texture and audio asset you ship, and keep that record
in the project's `design/ATTRIBUTION.md`.
