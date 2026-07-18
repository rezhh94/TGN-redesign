# Tigon — project continuation context

Last reconciled: 2026-07-18.

This is the first-read handoff for a new Codex chat. It records the exact
relationship between committed work, the current dirty worktree and the design
contracts. Mounted source code wins if documentation and runtime disagree.

## Git and worktree state

- Active branch: `codex/work-services-accordion`.
- Approved Intro commit: `e4dbba7 feat: redesign intro scroll typography`.
- Approved 03/04 commit: `c349ef7 feat: unify effect and work atmosphere`.
- The active instruction, status, decision, section and design documents are
  maintained as tracked project context. This includes
  `docs/project-continuation-context.md`, `docs/remaining-work.md`,
  `docs/services-link-contract.md`, `docs/homepage-dark-design-contract.md` and
  `docs/adr-global-lenis.md`.
- The worktree intentionally still contains pre-existing, uncommitted changes
  for 02/Tjenester, 05/Prosess, 06/System, global Lenis removal, lifecycle
  cleanup and supporting documentation. Preserve them. Do not reset, discard,
  fold into another section or commit them without inspecting the exact diff
  and obtaining the user's instruction.
- `videos/tigon-work-atmosphere/` is tracked source material for the active
  12-second `public/video/work-wave-loop.mp4` and must be retained. It contains
  the 1920×1080 render source, project metadata and QA snapshots.
- The former external-reference image/PDF library had no production references
  or duplicates under `public/` and was removed on 2026-07-18. Its tracked
  files remain recoverable from Git history if an explicit historical audit is
  ever required.
- The unrelated repo-local `outputs/hatch-pet/` copy was removed after its
  final sprite was verified byte-identical to the installed Snitt pet. The full
  QA/export material was preserved at
  `~/.codex/pets/snitt/source-export/snitt-2026-07-15`.
- `next-env.d.ts` also has a pre-existing generated diff. Do not fold it into a
  design commit without first confirming why Next regenerated it.

## Read order in a new chat

1. `AGENTS.md`.
2. This file.
3. `docs/current-homepage-state.md`.
4. `docs/current-project-rules.md`.
5. `docs/remaining-work.md`.
6. The relevant `docs/sections/*.md` contract.
7. `design.md` for Intro work.
8. `docs/homepage-dark-design-contract.md` for shared tokens, surfaces and
   motion rules.
9. `docs/tigon-brand-platform.md` for meaning and copy decisions.

## Mounted homepage order

1. Protected Header/Hero.
2. 01 / Intro — `ApproachStatementBridge`.
3. 02 / Tjenester — `WhatWeBuild`.
4. 02→03 — `OutcomeTensionBridge`.
5. 03 / Effekt — `WhatWeImprove`.
6. 03→04 — shared atmosphere and `EffectWorkBridge`.
7. 04 / Arbeid — `WorkProof`.
8. 04→05 + 05 / Prosess — `work-process-journey` and `ProcessLayers`.
9. 06 / System — `SystemManifesto`.
10. Protected Kontakt/footer.

## Approved and committed now

### 01 / Intro

- Approved adaptation of Codrops `ScrollTextMotion`.
- Stable foreground: `BYGD SAMMEN`, the Tigon integrated-practice paragraph
  and `TGN / integrated practice`.
- Decorative Tigon capability words Flip, scramble and move behind it.
- Each decorative word fades before it enters the protected foreground text
  rectangle; there is no visible card, box or mask behind the main statement.
- Reuses the 04 atmosphere recipe with the existing
  `/video/work-wave-loop.mp4`; mobile/reduced motion disables the video.
- Uses the original Codrops Typekit kit `upd0woi`, scoped to Intro. This is a
  deliberate exception and must not spread to other sections.
- Full active contract: `design.md` and `docs/sections/01-approach.md`.

### 03 / Effekt + 04 / Arbeid

- One shared `surface-base` atmosphere with named states
  `entry → effect-focus → handoff → work-focus → exit`.
- Existing wave, spotlight, vignette, veil and grain are calibrated as one
  journey. Compact/reduced states avoid video/grain.
- Effekt retains `FUNNET / FORSTÅTT / VALGT / MÅLT` and the 10 px meta floor.
- Arbeid remains six future-facing capability links, never portfolio or
  customer proof. Desktop uses the sticky archive treatment; through 1000 px,
  touch, reduced motion and no-JS use normal flow.
- The functional cursor remains limited to the six capability links.

## Present in the worktree but not in the two approved commits

- 02/Tjenester dark-token and layout calibration in `what-we-build.css`.
- 05/Prosess dark-surface calibration in `process-layers.css`.
- 06/System dark-token calibration in `system-manifesto.css`.
- 02→03 token alignment in `outcome-tension-bridge.css`.
- Removal of global Lenis and dormant homepage initializers in
  `HomeMotion.tsx`, `package.json`, `package-lock.json` and deleted
  `src/lib/motion.ts`.
- Active design/status documentation describing the broader dark homepage.

Treat this as protected in-progress work. Before working on 02, 05, 06 or the
global scroll lifecycle, inspect the dirty diff and ask only if the intended
scope cannot be determined from the user's task.

## Non-negotiable preservation

- Do not change Header/Hero, SEO/schema/sitemap/robots/canonical, URLs/slugs or
  footer/NAP/important links without explicit instruction.
- Do not turn 04 into portfolio, cases or past-client proof.
- Do not import legacy project CSS/JS or unapproved third-party reference code,
  fonts or assets.
- No visible orange, SaaS cards, dashboard language or template styling.
- Important text and links remain server-rendered; respect mobile, touch,
  reduced motion and no-JS.
- No broad reset or rollback. Checkpoint newer work first and restore only the
  explicitly named section manifest.

## Verification truth

- The isolated Intro commit passed TypeScript and production build checks.
- The isolated 03/04 commit passed TypeScript and a production Webpack build.
- A previous full dark-homepage pass was recorded on 2026-07-17, but the Intro
  changed afterward. Run the relevant visual matrix again before approving a
  new cross-section journey; do not claim the July 17 screenshots validate the
  new Intro.
- Required widths for cross-section checks: 1440, 1024, 900, 768 and 390 px,
  plus reverse scroll, resize, touch, reduced motion and no-JS where relevant.

## Safe next-step protocol

When the user opens another section:

1. Read its active section contract and inspect its current dirty diff.
2. Take a before screenshot and create a scoped rollback point when requested.
3. Change only the named section and the minimum shared handoff it owns.
4. Do not restyle Intro, 03 or 04 merely to make the new section convenient.
5. Show before/after and stop for approval when the user asks for a gate.
6. Commit only after explicit approval, with unrelated changes left unstaged.
