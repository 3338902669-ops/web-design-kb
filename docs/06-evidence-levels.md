# Evidence levels (E1-E4)

Every claim of "done", "verified" or "passing" must carry an evidence level. Teams that skip this end up
treating "an AI said it looks fine" as proof.

| Level | Meaning | How to phrase it |
|---|---|---|
| **E1 - reproducible** | A command, exit code, hash, screenshot or captured response that someone else can re-run and get the same result | "Verified: `<command>` exit 0, output ..." |
| **E2 - peer review** | Another person/agent re-ran it and published the reproduction steps | "Reviewed by X (steps attached)" |
| **E3 - self-report** | The author says they checked, with no reproducible artifact | "**Self-reported, not independently verified**: ..." |
| **E4 - planned** | Not executed yet; a plan or hypothesis | "Planned verification: ..." |

## Rules

1. **Separate who said it from what proves it.** Never let an E3 opinion appear in an E1 voice.
2. **Nothing self-certifies.** On any deliverable where hats are separated, the implementer may run
   self-checks but cannot issue the acceptance conclusion. A verifier who did not write the code (person,
   agent, or tool) does that.
3. **Re-verify after context compaction or handoff.** A stale "verified" from an earlier session is not
   evidence; re-run before repeating the claim.
4. **Irreversible actions need explicit approval.** Deploy, publish, send, delete, pay: a recorded
   approval, not an inference from "the task said ship it".
5. **Independent means outside the system that produced the work.** Two components of the same pipeline
   reviewing each other is peer review (E2), not independent verification - label it honestly.

## Practical application

- Implementation log: list commands actually run, with exit codes.
- Acceptance report: one row per check with its evidence level.
- Handoff: state explicitly which items are E3/E4 so the next person knows what still needs proving.
