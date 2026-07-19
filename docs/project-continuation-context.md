# Tigon — project continuation context

Last reconciled: 2026-07-19.

## Worktree boundary

The repository is intentionally dirty with active Intro, Tjenester, shared
token, motion and documentation work. Do not reset, checkout or overwrite the
worktree. Do not commit or push without explicit instruction. Inspect
`git status --short` and stage exact files if publishing is later requested.

## Read order

1. this file;
2. `docs/current-homepage-state.md`;
3. `docs/current-project-rules.md`;
4. `design.md`;
5. the relevant file under `docs/sections/`;
6. `docs/remaining-work.md`.

## Mounted journey

Header → Hero → Intro → Tjenester → Outcome tension → Effekt → Arbeid →
Prosess → System → Footer.

Intro and Tjenester currently contain active refinements. Effekt and Arbeid
retain their approved content architecture. Arbeid is capability-led and never
a portfolio. Header/Hero and Footer are protected unless reopened explicitly.

The page body currently uses solid semantic surfaces only. No decorative
background-media owner or related scroll state is mounted. A future original
visual direction is a separate task.

## Current design-system decision

`design.md` is now the complete design authority, with executable values in
`src/styles/tokens.css`. The system uses Tigon's own TGS Perfect, JUST Sans and
Caleb Mono families; optical type roles; 4px spacing primitives; a 12/6-column
grid; semantic surfaces/lines; and a unified button recipe.

The Trionn study supplies generic construction lessons only. Do not import its
fonts, media, code, shaders, palette or exact identity-bearing combinations.

## Safe next-step protocol

1. Re-read the mounted component and its section contract.
2. Confirm which dirty files already belong to the user's work.
3. Add roles to `tokens.css` before adding section-local values.
4. Keep important HTML complete without JS and respect reduced motion/touch.
5. Validate typecheck, build, diff check and the responsive matrix.
6. Report exact files and protected boundaries; do not publish automatically.
