# Example: minimal personal site

This folder is the **quality anchor** for the workflow. It demonstrates what "calm brief, no 3D, still
premium" looks like when the process is followed:

- `design/style-tokens.md` was written **before** any motion decision;
- the motion plan is one deliberate system (a scroll-progress rule), not a pile of effects;
- no 3D, because the tokens say the brief does not justify it;
- `prefers-reduced-motion` degrades to a readable static page;
- the layout holds at 390 px.

Open `index.html` directly, or serve the folder. There are no dependencies.

Use it as a comparison target: if a generated page does not reach this level of restraint and hierarchy,
the problem is in steps 1–4 (tokens and sourcing), not in the code.

Files:
- `index.html` — the page (inline CSS/JS, no build step)
- `design/style-tokens.md` — the gate that everything else derives from
- `design/motion-contract.md` — a filled contract for a *minimal* brief
