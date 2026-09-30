# Filling the motion narrative contract

The contract is the document that stops "we'll figure the motion out while coding" from happening.
Template: `templates/motion-contract.md`. Store the filled copy in the project as
`design/motion-contract.md`.

Order of writing matters — each section depends on the previous one.

## 0. Theme deconstruction

See step 1 of the workflow. The important field is the **core metaphor**: the one image the entire page
animates. It determines the shared anchor and which transitions are even allowed.

## 1. Interaction mode

Record the single primary pattern chosen in step 2, plus any secondary behaviour (e.g. "auto-play hero,
then hand over to scroll").

## 2. Scene table

Each row is one act of the narrative — not one "section of the layout". For each scene: purpose
(attract / develop / support / convert), key content, emotional pacing, and a one-sentence motion intent.

## 3. Per-scene sourcing table

For each scene: the content point being served, candidate entries from the library, why each candidate
matches semantically, the intent, the strength band, and where the full prompt or official URL lives.

### 3.1 Adaptation instructions (mandatory)

Copied prompts must never ship as-is. Write, per adopted candidate:

- what gets replaced (brand, copy, imagery, palette)
- the colour/light logic, referencing the theme card
- the content anchor the motion serves
- pacing
- demo content to delete

## 4. Transition language

- **Shared anchor** (>=1, whole page): one continuously moving system — the same light band, the same
  particle field, the same progress signal. This is what makes scene changes feel continuous.
- **Unified motion language**: default easing, duration bands, one direction convention.
- **Per-pair transition**: shared-anchor continuation, morph, or rhythm bridge. Write which, for each
  adjacent pair.
- **Forbidden**: hard cuts between unrelated visual languages; per-scene easings; motion decoupled from
  scroll progress.

## 5. Master timeline spec

- one global scroll progress system; every block is a sub-timeline
- progress mapping (which scene occupies which part of 0-100%)
- sub-timeline names and attach points
- pause/skip affordances if there is auto-narrative

## 6. Degradation & intent table

One row per motion block: declared intent, content semantics, transition continuity, whether the
narrative still reads under `prefers-reduced-motion`, and whether it holds at 390 px.

This table is what the Verifier checks first. Keep it honest — an unfilled cell is a known gap, which is
better than a claimed pass.

## Why so much structure

A motion contract turns subjective taste into reviewable claims. It lets a client say "this is not the
metaphor I approved" instead of "I don't like it", and it lets a verifier check specific promises rather
than vibes.
