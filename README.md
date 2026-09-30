# Web Design Workflow

**A repeatable design -> build -> acceptance process for premium marketing sites.**
Motion-first, evidence-gated, verifier-checked. Works for a solo designer with AI help, or a small team.

**New here? Read [SKILL.md](SKILL.md) first** — the entry point: when to use this, the
non-negotiables, the 8 steps and their artifacts, and how to behave when no human is available to
confirm a gate.

[中文说明](README.zh-CN.md) · [Workflow](docs/00-workflow.md) · [Acceptance standard](docs/02-acceptance-standard.md) · [Licenses](#licensing)

---

## Why this exists

Most "premium website" projects fail the same way: the design is decided by taste, the motion is copied
from whatever demo was seen last, and "done" means the developer looked at it once. This repo turns that
into a process with **falsifiable checkpoints** — a frozen design contract, a per-section motion sourcing
method, a single animation timeline, and an acceptance gate where the person who built it is not allowed
to sign it off.

It is distilled from a working practice (hundreds of hours of real client and concept builds) and then
**stripped of everything personal**: no private paths, no client names, no accounts, no internal tooling.
Adopt it as-is, or fork it into your own house standard.

## Core principles

1. **No default style.** Style is chosen by the client/brief at kickoff. If it was not specified, ask —
   never silently apply your last project's palette.
2. **Interaction is chosen, not assumed.** Scroll is one of 14 interaction patterns. The choice is made
   before any animation work and recorded.
3. **Motion comes from a library, not from memory.** Every animation candidate is retrieved from a
   searchable database, with source and full prompt/official URL recorded. Vibes are not a spec.
4. **One narrative, one timeline.** A page is a sequence of scenes (acts) with a shared anchor and a
   single master timeline. Hard cuts between unrelated motion languages are a defect.
5. **Impact, not duration.** Animation budget: 100-500 ms per element, <=2-3 s per sequence. "Cinematic"
   is intensity and craft, not length.
6. **Evidence, not adjectives.** Acceptance produces reproducible evidence (commands, exit codes,
   screenshots, pixel diffs, frame timings) and labels it E1-E4. Self-reports are not acceptance.
7. **The implementer never signs off.** Verification is done by someone (or some tool) that did not
   write the code.

## The 8-step workflow

| # | Step | Gate to pass before moving on |
|---|---|---|
| 1 | Client & theme analysis | Theme card: purpose, audience, tone, **one core metaphor**, <=3 content pillars, CTA, style basis |
| 2 | Interaction mode | One of 14 patterns chosen **and confirmed by the client** |
| 3 | Motion sourcing | Per section: candidates from your motion DB, >=3 per block, >=1 3D, ranked, full prompt/URL; client-confirmed |
| 4 | Motion narrative contract | Scene table, shared anchor, transitions, single master timeline defined |
| 5 | Implementation spec | Full prompt/official URL copied, plus explicit brand adaptation instructions |
| 6 | Custom asset fallback | Only when the library has no close match (procedural/generative assets) |
| 7 | Implementation | GSAP + local assets, transform/opacity only, reduced-motion path, 390 px clean, console clean |
| 8 | Acceptance | Intent table + runtime evidence (6 dimensions) + security gate; independent verification |

Details: [docs/00-workflow.md](docs/00-workflow.md) · Contract template: [templates/motion-contract.md](templates/motion-contract.md)

## Quickstart

~~~bash
git clone https://github.com/<your-org>/web-design-kb.git
cd web-design-kb

# Inspect the bundled motion library (see THIRD-PARTY-NOTICE.md first)
node tools/motion-inspect.mjs

# Search it
node tools/motion-search.mjs -k particle
node tools/motion-search.mjs -k 3D -cat Sections
node tools/motion-search.mjs -k "editorial minimal" --has-spec   # only entries you can build
node tools/motion-search.mjs -h

# read the full prompt behind an entry (229 prompts mirrored in data/prompts/)
node tools/get-prompt.mjs "Aethera Studio" --print

# Check a site folder before publishing
node tools/check-secrets.mjs ./path/to/site
node tools/sanitize-check.mjs ./path/to/site
# findings are redacted by default; add --show-samples locally if you need the matched text
~~~

Point the tools at **your own** library at any time:

~~~bash
node tools/motion-search.mjs --db ./my-library.json -k glass
# or
MOTION_DB=./my-library.json node tools/motion-search.mjs -k glass
~~~

## Repository layout

~~~
docs/         the process, in order
  00-workflow.md                   the 8 steps in detail
  01-motion-narrative-contract.md  how to fill the contract
  02-acceptance-standard.md        dual gate: runtime evidence + security
  03-3d-web-pipeline.md            when to use 3D, budgets, export rules
  04-particle-field-method.md      real-time particle/point-cloud builds + measurement
  05-motion-library.md             DB schema, provenance, how to build your own
  06-evidence-levels.md            E1-E4: what counts as proof
  07-multi-agent-handoff.md        single-writer + handoff discipline for AI-assisted teams
  08-security-gate.md              what a security gate must produce
  09-prompt-coverage.md            how many entries are actually implementable
  10-award-quality-bar.md          Awwwards/Webby/FWA bar as 8 measurable dimensions + stop condition
templates/    fill-in-the-blank artifacts (contract, intent table, handoff, kickoff)
SKILL.md      process entry point (start here)
tools/        small dependency-free Node utilities
data/         bundled motion library + indexes + mirrored full prompts
examples/     a reference implementation (minimal personal site) to compare against
~~~

## How much of the library is implementable?

Of the 751 entries: **215** ship a full prompt text, **130** carry an official component URL, and
**406** are metadata only (direction, not a spec). The generated manifest is
[`data/prompt-coverage.json`](data/prompt-coverage.json); what it means and what to do about it is
[docs/09-prompt-coverage.md](docs/09-prompt-coverage.md). Use
`tools/motion-search.mjs --has-spec` when you need something you can build from today.

## Roles

The process assumes three hats. One person can wear more than one hat, but **hat 2 and hat 3 must not be
the same person on the same deliverable**:

| Hat | Owns |
|---|---|
| **Author / Lead** | brief, style decision, interaction choice, contract approval, client communication |
| **Implementer** | code, assets, the implementation evidence |
| **Verifier** | independently re-runs the acceptance checks and signs the result |

## Licensing

- **Code** (`tools/`, `.github/`, any script): [MIT](LICENSE)
- **Documentation & templates** (`docs/`, `templates/`, `README*`): [CC BY 4.0](LICENSE-docs)
- **Bundled motion library data** (`data/`): third-party metadata — read
  [THIRD-PARTY-NOTICE.md](THIRD-PARTY-NOTICE.md) before redistributing or using it commercially.

## Contributing

Issues and PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). If you adopt this workflow and change it
for your context, a note on **what you changed and why** is more useful than a style-only PR.
