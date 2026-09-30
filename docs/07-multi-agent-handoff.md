# Handoff discipline for AI-assisted teams

This repository is often used with one or more AI agents doing implementation. That works well **if** you
keep three rules: one writer per file, a durable handoff record, and verification by someone who did not
write the code. Without them, multi-agent work produces duplicated effort, contradictory edits and
confident-but-unverified claims.

## 1. Single writer per file

At any moment exactly one agent owns a file. Everyone else reads it, or writes an isolated verification
script that does not modify the artifact.

- State the **write scope** (file or directory prefixes) before work starts.
- If two scopes overlap, serialise them; do not "merge later".
- Before taking over a file, confirm the current owner is not editing it.

## 2. A durable handoff file

Keep one plain-text handoff file outside the code (e.g. `HANDOFF.md`), not in chat history. It is the only
surface that survives context resets and model switches.

Minimum contents:

~~~markdown
## <date> · <task>
- status: in progress | waiting | done
- owner:
- write scope:
- what changed (files + what):
- commands run + exit codes:
- evidence level for each claim (E1-E4):
- open questions / known gaps:
- next step:
~~~

Update it **before** pausing or switching agents, and read it **before** starting. "In progress" means
continue, do not restart. A handoff that omits evidence levels lets an E3 self-report become an E1 fact
three sessions later.

## 3. Task cards

When delegating, give a card that can be executed without the surrounding conversation:

- goal (one sentence, outcome not activity)
- working directory
- allowed write paths (whitelist)
- forbidden paths (secrets, delivered artifacts, other owners' files)
- current-state evidence (what is already true, with commands)
- acceptance command(s) and expected output
- where the machine-readable result must be written

A card that says "improve the site" is not a task; it is a wish.

## 4. Verification independence

- The implementer may self-check; the implementer may **not** issue the acceptance verdict.
- The verifier re-runs the acceptance commands from scratch and writes their own report, including what
  they could **not** verify. "I could not run X" is a valid, useful result.
- If the same agent or the same toolchain did the implementation, label the review **peer review (E2)**,
  not independent verification.
- Verification should be adversarial: try to make it fail, not to confirm it works.

## 5. Context compaction and model switching

- After a context reset, treat every prior "verified" as E4 until re-run.
- Prefer artifacts over memory: put state in files (handoff, contract, evidence), not in the prompt.
- If the same file must be edited from a fresh context, re-read it first; never rewrite a long file from
  a partial read.

## 6. Cost and rate discipline

- Batch independent read-only checks; serialise anything that writes.
- Give long scans a preflight step so a bad credential fails in seconds, not after an hour.
- Never let "retry until it passes" touch a real result: findings above threshold are an answer, not a
  transient error.
