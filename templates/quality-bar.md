# Quality bar - <project>

> One row per dimension. A dimension with no measured value is **not** a pass.
> Judged by: <name or "self-judged by model (E3)">  Started: <date>

| # | Dimension | Threshold (from `docs/10-award-quality-bar.md`) | Measured | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 | Typography | body 55-80 chars; scale ratio >= 1.25; <= 2 families; no text < 12 px | | | |
| 2 | Whitespace | section padding >= 96 px (desktop) / >= 56 px (390); >= 3 rhythm steps | | | |
| 3 | Visual hierarchy | exactly 1 primary CTA per view; blur test leaves the intended element dominant | | | |
| 4 | Colour | body >= 4.5:1, large >= 3:1 over the real composite; <= 1 accent family | | | |
| 5 | Motion | spec copied per motion; entrance <= 500 ms; 1 master timeline; frame diff differs | | | |
| 6 | Micro-interactions | hover + focus-visible + active on every control; state change <= 200 ms | | | |
| 7 | Responsive | no overflow at 390 / 768 / 1440; tap targets >= 44 px; heavy media off at 390 | | | |
| 8 | Originality | 1 core metaphor + >= 1 second-read detail stated in the kickoff | | | |

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
