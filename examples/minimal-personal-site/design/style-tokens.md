# Style tokens — "L. Han, software person" (example)

## Where the style basis came from

- Source: the user asked for "cold grey, editorial, nothing flashy; it should read like a printed CV"
- If none was given: n/a — an explicit basis was supplied. (If it has not been, **ask first**.)

## Typography

| Role | Family | Weight | Size (desktop / 390 px) | Line height | Tracking |
|---|---|---|---|---|---|
| Display | Georgia / "Times New Roman", serif | 400 | clamp(2.6rem, 7vw, 5.2rem) | 1.04 | -0.02em |
| Heading | same serif | 400 | 1.5rem / 1.3rem | 1.2 | 0 |
| Body | system-ui, -apple-system, "Segoe UI", sans-serif | 400 | 1.0625rem / 1rem | 1.7 | 0 |
| Label | system-ui | 500 | 0.75rem uppercase | 1.2 | 0.14em |

- Font licence: system stacks + Georgia — no web-font licence to record.
- Fallback stack: as above.

## Colour

| Token | Value | Use |
|---|---|---|
| bg | #f6f5f2 | page |
| surface | #ffffff | cards, if any |
| text | #1c1c1a | body and headings |
| text-muted | #6b6a66 | labels, meta |
| accent | #2f5d50 | the single attention colour (progress rule, links) |
| border | #e2e0da | hairlines |

- Contrast measured: text/bg 15.8:1; muted/bg 5.1:1; accent/bg 6.4:1 (all >= 4.5:1).
- Palette: **light, neutral-warm**. → glow, neon and 3D would contradict it.

## Space & layout

- Base unit: 8 px; scale 8 / 16 / 24 / 40 / 64 / 96
- Max content width: 68ch text column, 1180 px grid
- Section rhythm: 96 px desktop / 64 px mobile
- Grid: 12 col desktop (gutter 24), single column at 390 px

## Imagery

- Treatment: none (typographic page). One optional portrait slot, photographic only.
- Source and licence: placeholder frame; the project must record a licensed portrait or omit it.
- 3D / motion imagery justified? **No.** The brief is editorial; depth and spectacle would fight it.

## Motion character

Calm and small-amplitude. Motion exists to (a) show reading progress and (b) reveal content that has
arrived in the viewport. Nothing moves until the reader does. Motion is **not** allowed to loop, to
auto-play video, to use particles/glow/3D, or to move anything larger than ~16 px.
