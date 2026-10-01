# Quality bar - <project>

> **Two kinds of row.** Static rows can be produced by `tools/quality-audit.mjs`; judged rows need a
> named person (or a model plus a note) looking at the rendered page. A row with no measured value is
> **not** a pass, and a static pass is never the whole bar.
> Judged by: <name or "self-judged by model (E3)">  Started: <date>

## Static rows (tool-measured)

| # | Dimension | Threshold | Measured | Verdict | Evidence (command + output) |
|---|---|---|---|---|---|
| 1a | Typography | no text < 12 px; <= 2 named families; scale ratio >= 1.25 | | | `node tools/quality-audit.mjs <file>` |
| 2a | Whitespace | largest spacing token >= 96 px (desktop floor; 56 px is the mobile floor) | | | same |
| 3a | Hierarchy channels | emphasis in >= 2 of size / weight / colour | | | same |
| 4a | Colour (signal) | literate fg/bg pairs >= 4.5:1; a low pair is a WARNING, verify in the render | | | same (WARN line) |
| 5a | Motion (CSS) | transition/animation present, no duration > 500 ms, `prefers-reduced-motion` fallback | | | same (NOTE if canvas/script drives it) |
| 6a | Interaction | `:focus`/`:focus-visible` present; hover or a link affordance present | | | same |
| 7a | Responsive signals | viewport meta, a media query, no fixed width > 420 px outside media | | | same |
| 8a | Originality signals | title + meta description, no lorem ipsum | | | same |

## Judged rows (a person must look)

| # | Dimension | What to judge on the rendered page |
|---|---|---|
| 1b | Typography | line length reads 55-80 chars; no orphan/widow stacks; no heading block over 6 lines |
| 2b | Whitespace | the rhythm reads as deliberate; >= 3 distinct steps in use; the hero breathes |
| 3b | Visual hierarchy | exactly 1 primary CTA per view; the 2-second squint leaves the intended element dominant |
| 4b | Colour | contrast over the real composite (video/gradient/image); <= 1 accent family |
| 5b | Motion | each adopted motion has a copied spec; entrance <= 500 ms; one master timeline; frame diff proves movement |
| 6b | Micro-interactions | hover / focus-visible / active all feel intentional; state change <= 200 ms |
| 7b | Responsive | no overflow at 390/768/1440 _in a browser_; tap targets >= 44 px; heavy media off at 390 |
| 8b | Originality | the core metaphor is visible; >= 1 second-read detail exists |

## Optimisation rounds

| Round | Top three findings | Change made | Re-measured verdicts | Judge |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

## Accepted debt (with reason)

- <item> - accepted because <budget / missing asset / client decision>; not a pass, a recorded decision.

## Exit

Two consecutive full passes with **no dimension below threshold** and **no new top-three finding**, or
the debt list above is complete and signed. Anything else means the loop keeps running.
