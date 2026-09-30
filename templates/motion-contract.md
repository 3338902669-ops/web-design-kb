# Motion narrative contract

> Copy into the project as `design/motion-contract.md`. Fill it before implementing any animation.
> Guide: `docs/01-motion-narrative-contract.md`.

## 0. Theme deconstruction

- Brand / client:
- Page purpose:
- Audience & situation:
- Emotional tone:
- **Core metaphor (1):**
- Content pillars (<=3):
- Primary CTA:
- Style basis:

## 1. Interaction mode

- Primary:
- Secondary:
- Confirmed by / date:

## 2. Scene table

| Scene | Name | Purpose | Key content | Emotion / pacing | Motion intent (1 sentence) |
|---|---|---|---|---|---|
| M0 | Hero | attract |  |  |  |
| M1 |  |  |  |  |  |

## 3. Per-scene sourcing

| Scene | Content point | Candidate (id/key) | Source | Tags | Strength | Semantic match reason | Intent | Full prompt / official URL |
|---|---|---|---|---|---|---|---|---|
| M0 |  |  |  |  |  |  |  |  |

Counting rule applied: expected candidates = query hits with status=valid. Query used:
3D rule used (text / tag):

### 3.1 Adaptation instructions (mandatory before implementation)

Per adopted candidate:

- what is replaced (brand, copy, imagery, palette):
- colour / light logic (from the theme card):
- content anchor (which word/image/number the motion serves):
- pacing (100-500 ms per element, <=2-3 s per sequence):
- demo content to remove:

## 4. Transition language

- Shared anchor (>=1, whole page), and how it is implemented:
- Unified motion language: default easing / duration bands / direction convention:
- Per adjacent pair: shared-anchor continuation | morph | rhythm bridge (write which, for each):
- Explicitly forbidden on this page:

## 5. Master timeline spec

- Global progress source:
- Progress mapping (which scene occupies which % of 0-100):
- Sub-timeline names and attach points:
- Pause / skip affordances (auto-narrative only):

## 6. Degradation & intent table (Verifier checks this first)

| Block | Declared intent | Content semantics match | Transition shares an element (no hard cut) | Narrative readable under reduced-motion | Holds at 390 px |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
