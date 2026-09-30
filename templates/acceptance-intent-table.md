# Acceptance record

> Copy into the project as `design/acceptance-<date>.md`. One row per check.
> Evidence levels: E1 reproducible / E2 peer review / E3 self-report / E4 planned (`docs/06-evidence-levels.md`).

- Project / version / commit:
- Date:
- Implementer:
- **Verifier (must not be the implementer on this deliverable):**

## Gate A - runtime evidence

| Check | Command / method | Result | Evidence level | Notes |
|---|---|---|---|---|
| Desktop 1440 full scroll |  |  |  |  |
| 390 px |  |  |  |  |
| reduced-motion |  |  |  |  |
| console / pageerror / 4xx |  |  |  |  |
| motion changes pixels (2-frame diff) |  |  |  |  |
| keyboard focus + activation |  |  |  |  |
| intent table, block by block |  |  |  |  |
| particle six measurements (if applicable) |  |  |  |  |
| 3D model gate (if applicable) |  |  |  |  |

## Gate B - non-motion checks

| Area | Threshold used | Result | Evidence | Waived? reason / owner |
|---|---|---|---|---|
| Accessibility (axe critical/serious = 0) |  |  |  |  |
| SEO / metadata |  |  |  |  |
| Performance (LCP / CLS / INP) |  |  |  |  |
| Asset licensing recorded |  |  |  |  |
| i18n |  |  |  |  |
| Versioning / rollback point |  |  |  |  |
| Deploy & caching re-test |  |  |  |  |
| Privacy / third parties |  |  |  |  |

## Gate C - security

| Item | Command | Exit code | Threshold | Verdict (artifacts) | Re-scan |
|---|---|---|---|---|---|
|  |  |  | high |  |  |

## Sign-off

- Verified by / date:
- Not verified (state explicitly what could not be checked and why):
- Findings above threshold and their disposition:
