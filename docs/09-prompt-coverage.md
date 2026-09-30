# 09 - Prompt coverage: what is actually implementable

> Generated artifact: [data/prompt-coverage.json](../data/prompt-coverage.json).
> Regenerate with `node tools/prompt-coverage.mjs --db data/motion-db.json --repo . --json data/prompt-coverage.json`.

The bundled library has **751 entries**. Shipping a name and a one-line description is not the same as
shipping a spec. This page states, per entry class, what you actually get, so nobody discovers it by
starting to build.

## The three classes

| Class | Count | What you get | Can you implement from it? |
|---|---|---|---|
| **promptRef** | **461** | A full prompt text shipped in `data/prompts/` | Yes - read the file, then adapt it |
| **executable URL** | **126** | No prompt text, but an official component/demo URL in the `url` field (Aceternity UI, React Bits) | Yes - the official component page is the spec |
| **no executable spec** | **164** | Metadata only: name, category, tags, motion description in words | **No** - treat it as direction, never as a spec |

The 406 are Framesbase showcase records (405) plus 1 self-authored entry. They are
`nature: frame` (110) or `nature: visual` (295): descriptions and tags distilled from a poster or a
video frame. The full prompt text for these was never collected locally, and most of the upstream cards
behind them are not free. **Nothing is invented to fill the gap** - the manifest lists them by name.

Check any single entry before you plan around it:

~~~bash
node tools/motion-search.mjs --db data/motion-db.json -k glass --has-spec
node tools/get-prompt.mjs "Global gateway"      # promptRef -> prints the file path
~~~

The covered set grew on 2026-10-01: 212 further library entries were linked to prompt texts harvested
through the Framesbase MCP by the repository owner's membership (387 new files in
`data/prompts/motionsites/`, plus `data/framesbase-mcp-manifest.json` recording what could and could not be
opened). See [THIRD-PARTY-NOTICE.md](../THIRD-PARTY-NOTICE.md) for the source and licence status of each
prompt family before redistributing.

## If you need one of the 198

Three legitimate routes, in order of cost:

1. **Pick a covered entry instead.** `--has-spec` (215 prompt texts + 130 component URLs) is usually
   enough for a real page.
2. **Use the component URL** when the entry is a component: the official page is the executable spec.
3. **Write the spec yourself from the description + tags.** That is authoring, not sourcing - your
   acceptance record should say so, and the result is yours, not a mirrored prompt.

Do not paste one of the 406 descriptions into a build as if it were a prompt. That is exactly the
failure mode this file exists to prevent.

## Provenance and licensing

- `data/prompts/*.md` (164) - full text recovered from a locally cached copy of the Motionsites.ai
  mirror; treated as MIT (upstream `github.com/xiiiabu/motionsites.ai`).
- `data/prompts/motionsites/*.md` (65) - mirrored from the same public upstream repo.
- `data/prompt-coverage.json` - generated from this library; CC BY 4.0 like the rest of `docs/`.
- The upstream cards are marked free/paid by the source site. This bundle carries no new prompt text
  beyond the two sets above. Read [THIRD-PARTY-NOTICE.md](../THIRD-PARTY-NOTICE.md) before commercial use.
