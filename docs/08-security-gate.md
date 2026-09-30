# Security gate

The security gate is a **delivery gate**, parallel to the runtime gate. It is scanner-agnostic: use
whatever scanner your stack supports (SAST, dependency audit, secret scanning, or a hosted review
service). What follows is the minimum contract for calling the gate "passed".

## What the gate must produce

1. A **scan of the delivered source**, not a sample and not a summary.
2. **Artifacts on disk outside the repository**: report, findings, coverage/status manifest.
3. A **threshold decision**: typically high and critical block delivery; medium/low are recorded with a
   risk owner and a decision.
4. A **re-scan** after fixes, using the same command, with the conclusion recorded in the handoff.
5. An explicit **waiver** only if the client asks for one, with the reason recorded.

## Verify the scanner before trusting it

- **Preflight the model/credentials** before a long scan. A scan that dies in its first seconds with a
  quota or authentication error is *not* a clean result.
- **Read the artifacts, not just the exit code.** A scan can finish and write its report after the
  process is killed; treat "artifacts exist and are complete" as the source of truth.
- **Distinguish four outcomes** and never let them impersonate each other:
  - scanner/transport failure -> **no conclusion**
  - credentials/quota exhausted -> **could not run**
  - findings above threshold -> **a real result, fix it** (do not "retry until it passes")
  - pass -> conclusion
- **Recompute the verdict from artifacts**, offline, whenever the scanner supports it. If a verdict
  cannot be recomputed from saved output, it is not E1.

## What to scan for

- injection surfaces (template/command/SQL/path), unsafe deserialisation
- authentication and authorisation gaps on every mutating endpoint
- secrets and credentials in source, build output, and client bundles
- dependency vulnerabilities, including transitive ones
- state-machine gaps: out-of-order callbacks, duplicate webhooks, race conditions on read-modify-write
- unbounded request bodies and missing rate limits on public POST endpoints
- verbose error responses that leak internals
- security headers and cookie flags on deployed responses

## Practical notes

- Keep report output **outside the repository** so it can never be published by accident.
- Budget by pricing tier: run a cheap model over changed paths first, then a full scan before delivery.
- The gate is about the **deployed artifact**: after deployment, re-test with a cache-busting query and
  check content types - a 200 response can be an SPA fallback returning the index page for a path that
  does not exist.
- Never publish a scan report that contains live tokens or customer data.
