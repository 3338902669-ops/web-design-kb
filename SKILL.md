---
name: web-design-workflow
description: Use when designing or rebuilding a marketing website, landing page, portfolio or product page that needs to look premium and ship with evidence. Turns a brief into a frozen design contract, a per-section motion plan, a single-scroll narrative and an acceptance record. Covers style tokens, motion sourcing from a searchable library, 3D/particle decisions, accessibility, performance and licensing gates.
---

# Web Design Workflow

A process skill, not a code generator. It forces the decisions that make the difference between a
premium site and a generic one, and it produces evidence instead of opinions.

**Read this file first.** It is the entry point; `docs/` explains each step in depth.

## Non-negotiables

1. **No default style.** Get the style basis from the brief or the user. If it is missing, ask. Never
   silently reuse a previous project's palette.
2. **Style tokens before motion.** Produce `design/style-tokens.md` (fonts, palette, spacing, image
   treatment, motion character) **before** selecting any animation. No tokens, no sourcing.
3. **Interaction is chosen, not assumed.** One of the 14 patterns, recorded and confirmed.
4. **Motion must be executable.** A candidate only enters the plan if you have either its full prompt
   text or an official component URL. A one-line description is inspiration, not a spec.
5. **Rank by fit first, impact second.** Semantic fit to the brief outranks "strongest effect".
   **3D is opt-in**: only include 3D candidates when the brief asks for depth, space or spectacle.
6. **One narrative, one timeline.** One core metaphor, one shared anchor, one master timeline.
7. **The implementer never signs off.** If you are working alone, say so explicitly in the acceptance
   record — do not present self-checking as independent verification.

## The 8 steps and their artifacts

| # | Step | Artifact | Gate |
|---|---|---|---|
| 1 | Theme deconstruction | `design/kickoff.md` | one core metaphor, style basis present |
| 2 | Interaction mode | recorded in kickoff | one pattern chosen |
| 3 | Style tokens | `design/style-tokens.md` | fonts + palette + spacing + image treatment |
| 4 | Motion sourcing | `design/motion-contract.md` §3 | per section: candidates with a **usable spec** |
| 5 | Narrative contract | `design/motion-contract.md` | scenes, anchor, transitions, master timeline |
| 6 | Implementation spec | contract §3.1 | adaptation instructions per adopted motion |
| 7 | Implementation | the site | reduced-motion, 390 px, console clean |
| 8 | Acceptance | `design/acceptance-<date>.md` | evidence + **visual loop** + security gate |

Templates: `templates/`. Depth: `docs/00-workflow.md`.

## Sourcing motions correctly

~~~bash
# 1. see what the library actually contains
node tools/motion-inspect.mjs

# 2. find candidates for a section, only ones with a usable spec, fit-first
node tools/motion-find.mjs --queries design/queries.json --require-spec --fit-first

# 3. or search directly
node tools/motion-search.mjs -k "editorial minimal" --has-spec

# 4. read the full prompt for an adopted entry
node tools/get-prompt.mjs "Aethera Studio"
~~~

**Read `data/README.md` before trusting the bundled library.** It is metadata collected from
showcase/demo sites: most entries have a one-line description and **no executable spec**, and the
aesthetic skews dark/3D/spectacle. Use it as an idea index, never as the design baseline.

## When you are working without a human in the loop

The workflow assumes a client confirms the interaction mode, the candidates, the static draft and the
result. If nobody is available:

- do **not** auto-approve those gates; write the assumption down in the contract and flag it in the
  final message as "assumed, not confirmed";
- still run the **visual quality loop** (see `docs/02-acceptance-standard.md`): render, look, list the
  three worst things, fix them, re-render — at least twice;
- never claim independent verification. Write "self-checked only (E3)".

## Prohibitions

- No animation without a copied spec or official URL.
- No 3D/particle field on a brief that did not ask for it.
- No per-section easing or independent scroll triggers.
- No AI-generated imagery for anything a customer reads as a real product, person or place.
- No publishing before the security/licence gate (`docs/08-security-gate.md`).
