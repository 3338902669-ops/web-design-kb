# 10 - Award-quality bar (Awwwards / Webby / FWA)

Shipping without errors is not shipping at award level. This page turns "make it award-worthy" into
eight dimensions that can each be judged against a threshold, plus a loop that says when to stop.

**Quality reference, not a claim.** Awwwards / Webby / FWA winners are the bar. This file does not
promise a win, and no agent may write "award-winning" in a deliverable. What it does demand is that
each dimension below is measured, fixed, and re-measured, and that the acceptance record names who
judged the subjective calls.

---

## The eight dimensions

| # | Dimension | What "award level" means | Measurable proxy (do this) | Fail when |
|---|---|---|---|---|
| 1 | **Typography** | One deliberate type system: a display face with real character, a body face with rhythm, a scale with an obvious jump, optical line length, no orphan/widow stacks | Body line length 55-80 characters at 1440 px; type scale ratio >= 1.25 between adjacent steps; <= 2 families (+1 mono max); no text below 12 px; no > 6 consecutive lines in a heading block | default system-font stack, ratio ~1.1, 4+ sizes with no logic, walls of centred copy |
| 2 | **Whitespace** | Space is a material: section rhythm, breathing room around the hero claim, density that varies instead of one uniform gap | Repeating vertical rhythm from a small set of steps (e.g. 4/8/16/32/64/128); section padding >= 96 px desktop / >= 56 px mobile; hero has one dominant empty region | every section the same gap, content hugging the viewport, cramped 390 px |
| 3 | **Visual hierarchy** | The eye lands in the intended order: one primary action per view, secondary elements visibly lower in weight | For each viewport: exactly one primary CTA; contrast and size rank declared in the tokens; a 2-second blur test (squint at the screenshot) leaves the intended element dominant | two competing CTAs, hierarchy carried only by colour, everything the same size |
| 4 | **Colour** | Intentional palette with a role for each colour; contrast that survives the real background (video, gradient, image) | Body text contrast >= 4.5:1, large text >= 3:1, checked **over the actual composite**; <= 1 accent hue family; gradient stops named in tokens | palette from a library default, accent used for everything, contrast only checked on a flat colour |
| 5 | **Motion** | Motion carries meaning: an entrance that orients, transitions that share an element, a master timeline, nothing decorative that fights the content | Every adopted motion has a copied spec; entrance <= 500 ms; one master timeline; no independent per-section easings; two-frame pixel diff proves it moves | animation for its own sake, 3+ easings, motion on load that delays reading |
| 6 | **Micro-interactions** | The small replies: hover/press/focus states with intent, magnetic or elastic feedback where it fits, cursor work that helps | Every interactive element has hover, focus-visible and active states; state change <= 200 ms; focus ring never removed without replacement | no hover states, pointer-only interactions, focus outlines stripped |
| 7 | **Responsive** | Not "it fits": the composition is re-decided per breakpoint (390 / 768 / 1440 minimum) | No horizontal overflow at 390; type scale and section rhythm re-checked at each breakpoint; heavy WebGL/video off or reduced at 390; tap targets >= 44 px | desktop shrunk down, overflow, 10 px tap targets, hero that only works wide |
| 8 | **Originality** | The page could not be swapped with a template: a stated core metaphor, a second-read moment, brand-specific imagery and copy | The kickoff names one core metaphor and at least one second-read detail; no lorem/default component look; the design would be unrecognisable with the logo removed | generic SaaS stack, stock phrasing, "AI-looking" gradient card grid |

Two of these are also in the runtime gate (motion, responsive). Do not accept a programmatic pass as
the visual judgement for the other six.

---

## The self-optimisation loop (required, not optional)

Run until a full pass adds nothing. "Looks fine" is not an exit condition.

1. **Baseline audit** - fill `templates/quality-bar.md`: one row per dimension, threshold, measured
   value, verdict (PASS / FAIL / N-A), evidence (screenshot, DOM measurement, or command output).
2. **Rank the failures** by how much they cheapen the page, not by how easy they are to fix.
3. **Fix the top three.** Do not rewrite everything; smallest change that moves the verdict.
4. **Re-measure** the same eight dimensions, with fresh captures. Mark regressions honestly.
5. **Repeat.** Stop only when two consecutive full passes produce **no dimension below threshold and
   no new top-three finding**, or when the remaining items are explicitly listed as accepted debt with
   the reason (budget, missing asset, client decision).
6. **Record** in `design/acceptance-<date>.md`: rounds, what changed per round, who judged the
   subjective calls, and the residual debt.

Thresholds are the floor. Above the floor, the question is always "what is the cheapest change that
makes this look more deliberate", and that question stays open as long as the loop is running.

## Fast programmatic checks worth wiring in

These cover the numeric half of the table; the rest is a judgement call with named evidence.

~~~bash
# overflow / layout at the three breakpoints, with console + network captured
node tools/  # there is no browser tool bundled; use your own Playwright/Puppeteer runner and record:
             # - document.scrollWidth - innerWidth (must be <= 0 at 390 / 768 / 1440)
             # - console errors / pageerror / responses >= 400 (must be 0)
             # - every interactive element has hover/focus/active state
             # - prefers-reduced-motion: reduce leaves the narrative readable
~~~

The library tools in `tools/` cover sourcing and hygiene, not the render. Do not claim this page's
visual or responsive checks were done by the bundled tools.

## Honesty clause

- A model judging its own page writes **"self-judged (E3)"** in the acceptance file.
- "Award-level" may only be claimed as **the standard aimed at**, never as a result.
- If a dimension could not be measured, write "not measured" and why. An unmeasured dimension is not a
  pass.
