# Acceptance standard

Acceptance has **two gates that are independent and both required**: the runtime gate and the
security/licence gate. A passing runtime gate does not excuse a failing scan, and a clean scan does not
excuse a broken mobile layout.

The implementer produces evidence. The **Verifier** re-runs it and signs. See `06-evidence-levels.md`.

---

## Gate A - runtime evidence (six dimensions)

| # | Dimension | How to produce | Pass condition |
|---|---|---|---|
| 1 | Desktop full scroll | 1440 px, scripted scroll to 100%, screenshots at each act | All acts render; no missing assets |
| 2 | Mobile | 390 px, same pass | No horizontal overflow; content intact; heavy WebGL/video disabled or reduced |
| 3 | Reduced motion | Emulate `prefers-reduced-motion: reduce` | Animation skipped; narrative still readable as static content |
| 4 | Console | Capture `console` + `pageerror` + network responses | 0 errors, 0 4xx |
| 5 | Motion is real | Two frames from the same viewport, compare pixel signatures | Signatures differ (the thing actually animates) |
| 6 | Interaction & keyboard | Tab through the page; activate each control | Focus visible on every interactive element; Enter/Space work |

Plus the contract's **intent table**, checked block by block: does the motion serve the declared content,
do transitions share an element, does the reduced-motion path still tell the story?

### Visual quality loop (required before the intent table)

Programmatic checks prove the page is not broken. They cannot prove it looks good. Run this loop **at
least twice** before declaring the runtime gate done:

1. Render the page at desktop and 390 px (headless is fine) and capture the hero plus the full page.
2. **Look at the captures** — a human, or a vision model whose output you then verify. Programmatic
   checks alone are not a substitute.
3. Write down the **three worst things** (e.g. generic type hierarchy, muddy imagery, spacing that
   collapses on mobile, motion that draws the eye away from the CTA).
4. Fix only those three. Re-render. Repeat until a pass produces no new top-three.
5. Record the loop in the acceptance file: rounds, what changed, who judged.

If no human can judge, say so: write "self-judged by model, not independently verified (E3)".

### Subjective items need a named judge

Some checks have no numeric threshold: "does the motion semantically match", "is the transition smooth",
"is the visual grade A/B/C", "does it look cheap". These **must be judged by the client or a named
reviewer**, with screenshots attached and the judgement recorded. The implementer supplies evidence and
does not sign these.

### Extra checks for real-time particles / point clouds

When the page ships a WebGL particle/point field (see `04-particle-field-method.md`), add six
measurements, before/after, same camera and frame:

| Metric | How | Expectation |
|---|---|---|
| Equivalent particle diameter | mean length of connected ink runs in a sampled region | matches the target band (brand grain ~3 px) |
| Visible particle count | number of connected runs | rises as diameter shrinks |
| Edge transition | sum of first differences in the region | rises with density |
| Coverage / ink | share of target-colour pixels | shrinking diameter loses ink - compensate with density |
| Frame rate | **real window**, not headless | >= 24-30 fps for the target tier |
| Console | pageerror | 0 |

To decide whether the shape reads (letters vs a blob), use **empty-column ratio** against a mask
baseline; to locate points during debugging, use a debug tint parameter rather than eyeballing.

### Extra checks for real 3D models

When a GLB/glTF enters the page: record source triangles and exported triangles, draw calls, material
count, texture memory, file size; judge silhouette/lighting/occlusion/text-safety in a frozen camera at
desktop and 390 px; measure frame time and decode time in a real window; record asset source and licence.
AI-generated rough geometry must be cleaned up in a real DCC tool before it goes to production.

---

## Gate B - non-motion, non-security checks

These are easy to forget and expensive to retrofit. A project may adjust thresholds, but **omitting a
row must be recorded with a reason and an owner**.

| Area | Requirement | Evidence |
|---|---|---|
| Accessibility semantics | single h1, no skipped heading levels, landmarks, image alt, form labels, visible focus | axe-core (or equivalent) run on the delivered pages; critical/serious = 0; attach the JSON |
| SEO / metadata | title, meta description, canonical, og:*/twitter:*, html lang, favicon | DOM assertion output or source diff |
| Performance budget | lab LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms; first-load HTML+critical CSS/JS size recorded | Lighthouse or a custom probe JSON; note the test machine and throttling |
| Asset licensing | fonts, images, models, textures, audio - source and licence recorded | project `design/ATTRIBUTION.md`; no unattributed asset ships |
| i18n | correct `lang` per locale, no half-translated pages, no mixed-language residue | screenshots + copy inventory |
| Versioning & rollback | a VCS baseline before delivery; a recorded rollback point and command | commit hash + deploy note |
| Deploy & caching | re-test with a cache-busting query after deploy; note stale artifacts that survive deletion | response content/content-type captured |
| Privacy & third parties | third-party scripts minimised; consent and privacy policy where required | script inventory + page evidence |

---

## Gate C - security

See `08-security-gate.md`. Summary: high/critical findings are fixed and re-scanned; medium/low are
recorded with an owner and a decision; the verdict comes from artifacts, not from an exit code alone.

---

## Sign-off

A deliverable is accepted when:

1. Gate A evidence exists and the intent table is complete.
2. Gate B rows are satisfied or explicitly waived with a reason.
3. Gate C is clean at the chosen severity threshold, or the findings are fixed and re-scanned.
4. The **Verifier** re-ran the checks and signed, with evidence labelled E1-E4.

"HTTP 200", "one screenshot", and "the source looks fine" are not acceptance.
