# The motion library

Step 3 of the workflow says "motion comes from a library, not from memory". This document defines the
library: its schema, its provenance rules, how to build your own, and the honest gaps in the bundled
copy.

Bundled file: `data/motion-db.json`. **Read [THIRD-PARTY-NOTICE.md](../THIRD-PARTY-NOTICE.md) before
using or redistributing it.**

## Schema

~~~json
{
  "version": 1,
  "built": "YYYY-MM-DD",
  "sources": { "source name": 620 },
  "entries": [
    {
      "cat": "Sites | Apps | Sections | Backgrounds | Components",
      "name": "short human name",
      "tag": "one-line theme",
      "style": "visual language, scene and where it fits",
      "motion": "what moves, and the strength band",
      "strength": "light | strong | cinematic | ?",
      "source": "which library it came from",
      "id": "stable id",
      "key": "stable reference path/URL",
      "tags": ["controlled tag", "..."],
      "nature": "prompt | visual | component | frame | self-authored",
      "status": "valid | suspect",
      "notes": "how to reference it; required for self-authored entries"
    }
  ]
}
~~~

### Field semantics that matter

- **`status`** - only `valid` entries may enter a candidate list. `suspect` means the original could not
  be verified (dead link, black frame, no visible motion).
- **`nature`** - how the description was obtained:
  - `prompt` - distilled from a full prompt; the strongest evidence
  - `frame` - distilled from frame-by-frame inspection
  - `visual` - inferred from a thumbnail/screenshot, weakest
  - `component` - an official component with a URL
  - `self-authored` - produced by you; must point at the implementation and must never be presented as a
    third-party candidate
- **`strength`** - a coarse band, not a measurement.
- **`tags[]`** - a **controlled vocabulary**. Keep it closed; a free-text tag cloud stops being searchable.
  The bundled set has 20 tags (3D, glassmorphism, magnetic/elastic, split/reveal, light pulse,
  scroll-triggered, gradient, particles, fluid, enter/exit, scan/wipe, parallax, video background, text
  animation, stage/spotlight, hover, noise/texture, mask/reveal, HUD/data, rhythm).

## Counting rule (makes step 3 verifiable)

For a given section query:

> **expected candidate count = number of entries the query matches with `status=valid`**

Listing fewer than that is a failed step; there is no upper limit. Rank by effect first, semantic fit
second; break ties by "3D -> component/prompt evidence -> higher strength -> stable id order" and record
the ranking reason.

**3D candidates** - define the rule once, explicitly, and apply it consistently. Two defensible
definitions:

- text rule: `name` or `motion` contains "3D"/"three-dimensional"
- tag rule: `tags[]` contains "3D"
- **union** of the two: the full 3D pool

In the bundled library these are 73 (text), 137 (tag) and **138 (union)** — the tag rule is *not* a strict
superset of the text rule, so reporting "137" as "all 3D entries" would be off by one. Pick one rule,
state it in the contract, and report the count under that rule. Mixing them silently is how "the library
has no 3D options" becomes a false conclusion.

## Honest gaps in the bundled copy (measured)

- Total **751** entries; `valid` **594**, `suspect` **157** (see the degraded-capture note below).
- Sessions 336 / Apps 43 / Sections 91 / Backgrounds 151 / Components 130.
- Sources: one large commercial prompt library (620), two open-source component collections (108 + 22),
  and 1 self-authored example.
- A failed capture batch left **152 entries** with an empty name and `motion: "ERR:..."`. They were marked
  `status: "suspect"`, so search tools skip them. This is why the published valid count is 594 rather
  than the raw collection's 746. One duplicate id was de-duplicated in the same pass. Details:
  [data/README.md](../data/README.md).
- **`strength` is unknown ("?") for 620 of 751 entries.** Consequence: a `-s strong` filter silently
  drops most of the library. Never conclude "no suitable candidate" from a strength-filtered result.
  Backfilling strength is a data-editing task that must be validated (`tools/motion-db-check.mjs`).
- Descriptions are short metadata, not full prompts. A full prompt must be obtained from the source
  before implementing; record where it came from.

## Building your own library

1. Decide the controlled tag vocabulary first (start from the 20 above).
2. Collect candidates from sources whose terms you accept: your own builds, open-source component
   libraries, commercial libraries you are licensed to use.
3. Record one entry per pattern with the schema above. Keep `key`/url so the entry can be re-found.
4. Mark unverifiable entries `suspect`; never let them into a candidate list.
5. Validate after every edit:
   ~~~bash
   node tools/motion-db-check.mjs data/my-library.json
   ~~~
6. Point the tools at it:
   ~~~bash
   MOTION_DB=./data/my-library.json node tools/motion-search.mjs -k particles
   ~~~

Never paste full third-party prompts, media or component source into your public library file.

## Tools

| Tool | Purpose |
|---|---|
| `tools/motion-search.mjs` | keyword/source/category/strength search |
| `tools/motion-inspect.mjs` | size, field and distribution audit |
| `tools/motion-tags.mjs` | tag frequency and 3D audit |
| `tools/motion-find.mjs` | score entries against a section-by-section query set |
| `tools/motion-db-check.mjs` | schema, required fields, duplicate ids, self-authored rules |
| `tools/export-subset.mjs` | filter the bundled data by source (e.g. to drop third-party entries) |

All tools accept `--db <path>` or the `MOTION_DB` environment variable, and default to
`data/motion-db.json` relative to the repository.
