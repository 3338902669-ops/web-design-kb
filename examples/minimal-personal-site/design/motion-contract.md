# Motion narrative contract — minimal personal site (example)

## 0. Theme deconstruction

- Subject: an individual engineer's public page
- Purpose: one scrollable statement plus three pieces of evidence and a contact route
- Audience: hiring managers, collaborators
- Tone: quiet, precise, unadvertised
- **Core metaphor: a printed document.** The page behaves like paper: a margin rule, consistent
  measure, nothing shouts.
- Pillars (<=3): what I do · what I have shipped · how to reach me
- CTA: email / GitHub
- Style basis: supplied by the user (cold grey, editorial)

## 1. Interaction mode

- Primary: 1 — Scroll
- Secondary: none. Keyboard focus only where there are links.

## 2. Scene table

| Scene | Name | Purpose | Key content | Emotion / pacing | Motion intent |
|---|---|---|---|---|---|
| M0 | Statement | attract | name + one sentence | still | a single rule draws as you enter |
| M1 | Timeline | develop | five dated moments | steady | the rule persists; entries mark in |
| M2 | Evidence | support | three projects | steady | content reveals once |
| M3 | Contact | convert | email + GitHub | still | none (static) |

## 3. Sourcing

The library was searched with `--require-spec` and **3D left off** (the tokens forbid it).

| Scene | Candidate | Source | Spec | Fit reason | Adopted |
|---|---|---|---|---|---|
| all | *(no library candidate adopted)* | — | — | The brief is typographic; every matching library entry is a dark 3D hero | — |
| M0–M3 | hand-built scroll rule (40 lines of CSS/JS) | original | in-repo | The metaphor is paper, not motion | yes |

> Recording "no library candidate adopted, here is why" is a valid outcome. What is **not** valid is
> picking a 3D hero because the library ranks it first.

### 3.1 Adaptation instructions

- Brand: replace the placeholder name and copy.
- Colour: accent used only for the rule, links and one underline.
- Pacing: reveals 320 ms, one property (`opacity` + 8 px translate), no stagger longer than 60 ms.
- Demo content removed: n/a (hand-built).

## 4. Transition language

- Shared anchor: **the margin rule** — a 1 px accent line at the left of the measure that grows with
  scroll progress and stays for the whole page. This is the only continuously moving element.
- Unified language: 320 ms, `cubic-bezier(.2,.7,.2,1)`, always upward 8 px.
- M0→M1 continuation of the same rule; M1→M2 rule continues, sections separated by a hairline;
  M3 static. No morphs, no crossfades of whole blocks.
- Forbidden here: parallax, particles, video, glow, per-section easing.

## 5. Master timeline

- Global progress: `document.scrollTop / (scrollHeight - innerHeight)` → rule `scaleY`.
- Reveals: one `IntersectionObserver` marks elements `[data-reveal]`; no per-section triggers.
- Auto-narrative: none.

## 6. Degradation & intent table

| Block | Declared intent | Semantics match | Transition shares element | Reduces to readable static | Holds at 390 px |
|---|---|---|---|---|---|
| M0 | orient | yes | rule continues to M1 | yes (rule at 100%) | yes |
| M1 | sequence | yes | rule | yes | yes (dates stack) |
| M2 | prove | yes | hairline | yes | yes |
| M3 | contact | yes | — | yes | yes |
