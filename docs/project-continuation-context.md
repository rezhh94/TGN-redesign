# Tigon — project continuation context

Last reconciled: 2026-07-20.

## Worktree boundary

The latest committed responsive Tjenester baseline is `293c552`. Always inspect the current
worktree before acting; do not reset, checkout or overwrite unrelated changes.
Do not commit or push without explicit instruction, and stage exact files if
publishing is later requested.

## Read order

1. this file;
2. `docs/current-homepage-state.md`;
3. `docs/current-project-rules.md`;
4. `design.md`;
5. the relevant file under `docs/sections/`;
6. `docs/remaining-work.md`.

## Mounted journey

Header → Hero → Intro → Tjenester → Effekt → Arbeid → Prosess → System →
Footer.

Intro and Tjenester contain the committed responsive baseline. The current
worktree replaces the rejected 02→03 outcome experiment with one uncommitted
Effekt scene: a stable central headline and four scroll-driven result cards.
Inspect the diff before assuming it is published. Arbeid is capability-led and
never a false portfolio claim. No visual section is protected: Header, Hero,
all body chapters, handoffs, Arbeid and Footer may be redesigned.

The page body currently uses solid semantic surfaces only. No decorative
background-media owner or related scroll state is mounted. A future original
visual direction is a separate task.

## Current design-system decision

`design.md` is now the complete design authority, with executable values in
`src/styles/tokens.css`. The system uses Tigon's TGS Perfect, JUST Sans and
Caleb Mono core families plus user-approved Switzer Regular as a narrow paper
information role; optical type roles; 4px spacing primitives; a 12/6-column
grid; semantic surfaces/lines; a unified button recipe; and a shared
`type-paper-*` hierarchy. Its paper text colours are centralized as
`--paper-text-*` roles, and its responsive role sizes use the isolated,
source-verified basis documented in `design.md`.

The Trionn study supplies generic construction lessons only. Do not import its
fonts, media, code, shaders, palette or exact identity-bearing combinations.

## Next-step protocol

1. Re-read the mounted component and its section contract.
2. Confirm which dirty files already belong to the user's work.
3. Add roles to `tokens.css` before adding section-local values.
4. Keep important HTML complete without JS and respect reduced motion/touch.
5. Validate typecheck, build, diff check and the responsive matrix.
6. Report exact files, visual scope and non-visual boundaries; do not publish
   automatically.
