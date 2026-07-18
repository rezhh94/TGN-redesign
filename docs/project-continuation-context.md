# Tigon — project continuation context

Last reconciled: 2026-07-18.

This is the first-read handoff for a new Codex chat. It records the exact
relationship between committed work, the current dirty worktree and the design
contracts. Mounted source code wins if documentation and runtime disagree.

## Git and worktree state

- Active branch: `codex/work-services-accordion`.
- Approved Intro commit: `e4dbba7 feat: redesign intro scroll typography`.
- Approved 02/Tjenester commit: `7ef236d feat: redesign services as compact mosaic`.
- Approved 03/04 commit: `c349ef7 feat: unify effect and work atmosphere`.
- The active instruction, status, decision, section and design documents are
  maintained as tracked project context. This includes
  `docs/project-continuation-context.md`, `docs/remaining-work.md`,
  `docs/services-link-contract.md`, `docs/homepage-dark-design-contract.md` and
  `docs/adr-global-lenis.md`.
- `2aaa6ad` is the clean baseline and includes the canonical `design.md`
  handbook/read order.
- The earlier broad dirty worktree was discarded at the user's explicit
  request. Do not reconstruct its 05/06 or lifecycle directions from stale
  notes or Git history.
- The active 02/Tjenester checkpoint is intentionally scoped to the mosaic in
  `WhatWeBuild.tsx`, `what-we-build.css`, `servicesScene` and the current
  design/status documentation. The user approved this direction on 2026-07-18;
  later spacing/calibration changes should be separate polish work.
- The user made one physical global background from Intro through Arbeid
  explicit and non-negotiable. The current dirty worktree implements it through
  `HomeAtmosphere`, transparent 01→04 section roots and one Work wave/grain
  lifecycle. Local Intro/Tjenester backdrop copies are removed.
- Global Lenis and dormant homepage initializers remain mounted in the clean
  baseline. Cleanup is still open but must stay separate from 02 design work.
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
5. `design.md` for the shared design language and token authority.
6. The relevant `docs/sections/*.md` contract.
7. `docs/remaining-work.md`.
8. `docs/homepage-dark-design-contract.md` for detailed surfaces and
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
- Full active contract: Appendix A in `design.md` and
  `docs/sections/01-approach.md`.

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

## Committed 02 checkpoint

- A compact, clean-room NuDot-inspired 02/Tjenester mosaic.
- Two existing service media anchors, three text-led services and five complete
  accessible links with unchanged hrefs/content.
- Small section-scoped settles and media parallax in `servicesScene`.
- Approved commit: `7ef236d`.

## Active global atmosphere worktree

- Adds `HomeAtmosphere` as the one physical Work background owner from Intro
  through Arbeid.
- Removes Intro/Tjenester backdrop and duplicate wave markup/styles/playback.
- Makes Intro, Tjenester, Effekt and Arbeid roots transparent and preserves
  their approved content, typography, links and local choreography.
- Reduces only the stacked 01→02 transition spacing that created the empty
  black hold.
- Adds one responsive playback owner: one desktop video/grain field; mobile
  and reduced motion use the static spotlight.
- Updates the global state selectors and documentation to the one-owner model.

No 05/06 content, Header/Hero, footer, SEO, URL, service content/link or global
Lenis cleanup is part of this worktree scope.

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

- The current global atmosphere worktree passes TypeScript, optimized
  production build and `git diff --check`.
- Desktop QA confirms one video, one sticky backdrop, transparent 01→04 roots,
  no horizontal overflow and a continuous Intro→Tjenester handoff. Mobile and
  reduced-motion QA confirm video/grain are disabled and the static spotlight
  remains continuous.
- The 02 visual matrix was checked at 1440, 1024, 900, 768 and 390 px, plus
  reduced motion, 390 px no-JS, five hrefs and horizontal overflow.
- The isolated Intro commit passed TypeScript and production build checks.
- The isolated 03/04 commit passed TypeScript and a production Webpack build.
- A previous full dark-homepage pass was recorded on 2026-07-17, but the Intro
  changed afterward. Run the relevant visual matrix again before approving a
  new cross-section journey; do not claim the July 17 screenshots validate the
  new Intro.
- Required widths for cross-section checks: 1440, 1024, 900, 768 and 390 px,
  plus reverse scroll, resize, touch, reduced motion and no-JS where relevant.

## Safe next-step protocol

The active uncommitted visual task is the implemented global atmosphere across
Intro, Tjenester, Effekt and Arbeid. Preserve its one-owner architecture while
reviewing light strength and spacing; do not restore local section backdrops.

When the user opens another section:

1. Read its active section contract and inspect its current dirty diff.
2. Take a before screenshot and create a scoped rollback point when requested.
3. Change only the named section and the minimum shared handoff it owns.
4. Do not restyle Intro, 03 or 04 merely to make the new section convenient.
5. Show before/after and stop for approval when the user asks for a gate.
6. Commit only after explicit approval, with unrelated changes left unstaged.
