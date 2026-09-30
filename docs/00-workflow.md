# The 8-step workflow

> This is the spine of the repository. Every other document expands one step. A step is not "done"
> because you thought about it — it is done when its gate is satisfied by an artifact.

Roles referenced below: **Author/Lead** (owns the brief and decisions), **Implementer** (owns code and
evidence), **Verifier** (independent; owns the sign-off). See also `06-evidence-levels.md` and
`07-multi-agent-handoff.md`.

---

## 1. Client & theme analysis

**Output:** a theme card (template: `templates/kickoff.md`).

Required fields:

- client / brand, and what the page is actually for (one sentence)
- audience and the situation they arrive in
- emotional tone (2-3 words)
- **one core metaphor** — the single image the whole page animates (a beam of light, a river of data, a
  growing garden). The metaphor decides the shared anchor and the transitions. One, not three.
- <=3 content pillars
- the primary conversion action
- **style basis** — explicitly supplied by the client/brief.

**Gate:** the style basis is written down. If the client did not specify one, ask. There is deliberately
no default.

> Failure mode this prevents: every project converging on the same trendy look because "we always do it
> that way".

## 2. Interaction mode (chosen before any animation work)

Pick exactly one primary pattern and record it:

1. Scroll 2. Click-through sections 3. Horizontal scroll 4. Parallax 5. Split-screen comparison
6. Timed auto-narrative 7. Keyboard/arrow driven 8. Hover reveal 9. 3D/WebGL scene transition
10. Drag-orbit exploration 11. Bento grid selection 12. Full-screen video opening
13. Spatial zoom (Prezi-style) 14. Guided Q&A / form-driven

**Gate:** the choice is recorded in the contract and confirmed by the client. Scroll is allowed — it is
simply not the default.

> Note on parallax: controlled studies find it raises *perceived fun* but not usability or satisfaction,
> and can cause motion sickness. Use it for hedonic pages, and always ship a reduced-motion path.

## 3. Motion sourcing (library-first, per section)

Split the page into sections/acts first. Then, for **each** section:

1. Query your motion library (see `05-motion-library.md`).
2. List **as many relevant candidates as the query returns** — the bar is verifiable: your candidate
   count must equal the number of `status=valid` entries the query matched. Listing 2-3 and stopping is
   a failed step.
3. Every section must include **at least one 3D candidate**.
4. Rank by "strongest effect -> closest semantic match" and record, per candidate: id/key, name, source,
   category, tags, strength, evidence nature, why it matches, intent, and where the full prompt /
   official URL lives.
5. Present the ranked list to the client and get confirmation before implementing anything.

**Gate:** the candidate table exists, is complete by the counting rule above, and is confirmed.

> Library data quality matters. Check your library's `status` and `strength` fields first — if most
> entries have unknown strength, an `-s strong` filter will silently hide them, and "the library has
> nothing" may be false.

## 4. Motion narrative contract

Fill the contract (`templates/motion-contract.md`, explained in `01-motion-narrative-contract.md`).
The non-negotiables:

- one core metaphor (from step 1)
- at least one **shared anchor** running through the whole page
- scene-to-scene transitions by shared element / morph / rhythm bridge — no hard cuts between unrelated
  motion languages
- one unified motion language: easing, duration bands, direction
- **one master timeline** driving the whole scroll narrative

**Gate:** the contract is complete and approved. Implementation has not started yet.

## 5. Implementation spec

For each adopted motion: copy the **full prompt text** or record the **official component URL**, then
write explicit adaptation instructions:

- brand colour / light colour (from the theme card)
- real copy and content anchors (which word, image or number the motion serves)
- pacing (100-500 ms per element; <=2-3 s per sequence)
- what demo content must be removed

**Gate:** no adopted motion enters implementation without its spec. "I remembered roughly how it looked"
is not a spec.

## 6. Custom asset fallback

Only when the library has no close match, or the brief needs something bespoke. Prefer:

- **real-time procedural** (shader/Canvas) for particles, point clouds, flow fields — see
  `04-particle-field-method.md`
- **generative imagery/video** for ambience and texture only

**Red line:** AI-generated imagery is a *design element*. Anything the client's customer reads as a
product, person, building or space must be real or licensed.

**Gate:** the reason for going custom is written down, and the result passes the same acceptance gate as
everything else.

## 7. Implementation

- GSAP + ScrollTrigger for scroll narratives; **vendor the library into the project** (no CDN, no
  absolute paths).
- One master timeline: total scroll progress drives sub-timelines. Blocks do not invent their own
  triggers.
- Animate `transform` and `opacity`. Avoid layout-thrashing properties.
- `prefers-reduced-motion`: skip animation, keep the narrative readable as static content.
- 390 px: no horizontal overflow, information intact.
- Console: zero errors, zero 4xx.
- Real-time WebGL/particles: the motion lives in the shader; GSAP only drives parameters.

**Gate:** the page runs clean at desktop and 390 px, with reduced-motion honoured.

## 8. Acceptance

Two gates, both required:

- **Runtime gate** — six dimensions of evidence (desktop 1440, 390 px, reduced-motion, console/pageerror
  and 4xx clean, animation actually changing pixels between frames, interaction + keyboard focus), plus
  the contract's intent table, plus the particle/3D add-ons where applicable.
- **Security/licence gate** — see `08-security-gate.md`; high/critical findings are fixed and re-scanned.

Plus the non-motion gates in `02-acceptance-standard.md` (accessibility, SEO, performance budget, asset
licensing, i18n, versioning/rollback, caching, privacy).

**Gate:** the **Verifier** — not the implementer — signs the result, with evidence labelled E1-E4.

---

## Abbreviated version (small projects)

If the project is genuinely small, you may collapse steps 4-5 into a one-page contract, but you may
**not** skip: the style decision (1), the interaction choice (2), per-section sourcing (3), the
reduced-motion + 390 px + console checks (7), or independent verification (8).
