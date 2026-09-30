# Contributing

Thanks for considering a contribution. This repository is a **process specification** first and a
toolbox second, so the highest-value contributions are the ones that make the process more falsifiable.

## Good contributions

- A step in `docs/` that is ambiguous, unverifiable, or missing a failure mode.
- A new `tools/` utility, or a fix that removes a hard-coded path or assumption.
- Motion-library entries in a **format-compatible** way (see `docs/05-motion-library.md`), with
  provenance recorded.
- Translations. Keep translations in a sibling file (e.g. `README.zh-CN.md`) and link both ways.

## Hard rules

1. **No personal data.** No absolute paths from your machine, no usernames, no emails, no API keys, no
   client names, no internal hostnames. Run before every PR:
   ~~~bash
   node tools/sanitize-check.mjs .
   node tools/check-secrets.mjs .
   ~~~
2. **No third-party payloads.** Do not commit media, full prompt text or component source from a
   commercial library. Metadata (description, tags, strength, source, reference URL) only.
3. **Evidence over adjectives.** If you claim a check works, show the command and its output.
4. **One idea per PR.** Small diffs are reviewable; rewrites of the whole spec are not.

## Licence of contributions

By contributing you agree that code contributions are licensed under **MIT** and documentation
contributions under **CC BY 4.0**.
