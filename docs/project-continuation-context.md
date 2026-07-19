# Tigon — project continuation context

Last reconciled: 2026-07-19.

This is the first-read handoff for a new Codex chat. It records the exact
relationship between committed work, the current dirty worktree and the design
contracts. Mounted source code wins if documentation and runtime disagree.

## Git and worktree state

- Active branch: `codex/work-services-accordion`.
- Approved Intro commit: `e4dbba7 feat: redesign intro scroll typography`.
- Historical 02/Tjenester rollback commit: `7ef236d feat: redesign services as compact mosaic`.
- Approved 03/04 commit: `c349ef7 feat: unify effect and work atmosphere`.
- Approved global atmosphere commit: `b5d1a10 feat: unify homepage atmosphere through work`.
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
- The active dirty 02/Tjenester worktree replaces the committed mosaic by
  explicit user direction. It is scoped to `WhatWeBuild.tsx`,
  `what-we-build.css`, `servicesScene` and the synchronized design/status
  documentation. Do not restore mosaic assumptions while reviewing it.
- The user made one physical global background from Intro through Arbeid
  explicit and non-negotiable. Commit `b5d1a10` implements it through
  `HomeAtmosphere`, transparent 01→04 section roots and one Work wave/grain
  lifecycle. Local Intro/Tjenester backdrop copies remain removed.
- Global Lenis and dormant homepage initializers remain mounted in the clean
  baseline. Cleanup is still open but must stay separate from 02 design work.
- `videos/tigon-work-atmosphere/` remains tracked historical/reproducible source
  material for the former generated 12-second wave and must not be removed.
  The user-supplied `wavebg.mp4` remux is also retained for rollback. The
  active delivery is the independently authored Tigon focus-field loop with
  reproducible source under `videos/tigon-focus-field/`.
- The former external-reference image/PDF library had no production references
  or duplicates under `public/` and was removed on 2026-07-18. Its tracked
  files remain recoverable from Git history if an explicit historical audit is
  ever required.
- The unrelated repo-local `outputs/hatch-pet/` copy was removed after its
  final sprite was verified byte-identical to the installed Snitt pet. The full
  QA/export material was preserved at
  `~/.codex/pets/snitt/source-export/snitt-2026-07-15`.
- Production builds may regenerate the route-types import in `next-env.d.ts`.
  Keep that generated-only change outside design commits.

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
- The active connected-section calibration shortens only the decorative group
  rhythm and fades the complete stable block during the final measured handoff.
  It is fully gone before `Hva vi bygger` occupies the main reading field;
  reverse restores it. Reduced motion/no-JS use ordinary-flow foreground copy.
- Reuses the global atmosphere with `/video/tigon-focus-field.mp4`; mobile keeps
  the lightweight wave and reduced motion/no-JS use its static poster.
- Uses local TGS Perfect and Caleb Mono roles. The former Codrops Typekit import
  is removed because it blocked the initial render.
- Full active contract: Appendix A in `design.md` and
  `docs/sections/01-approach.md`.

### 03 / Effekt + 04 / Arbeid

- One shared `surface-base` atmosphere with named states
  `entry → effect-focus → handoff → work-focus → exit`.
- Wave, asymmetric spotlight, vignette, dark material, veil and film grain are
  calibrated as one journey. Compact keeps the lightweight wave with static
  texture; reduced motion/no-JS use the poster and static texture.
- Effekt retains `FUNNET / FORSTÅTT / VALGT / MÅLT` and the 10 px meta floor.
- Arbeid remains six future-facing capability links, never portfolio or
  customer proof. Desktop uses the sticky archive treatment; through 1000 px,
  touch, reduced motion and no-JS use normal flow.
- The functional cursor remains limited to the six capability links.

## Historical committed 02 checkpoint

- A compact, clean-room NuDot-inspired 02/Tjenester mosaic.
- Two existing service media anchors, three text-led services and five complete
  accessible links with unchanged hrefs/content.
- Small section-scoped settles and media parallax in `servicesScene`.
- Approved commit: `7ef236d`.

## Active 02 / Tjenester worktree

- Replaces the old mosaic with a concise normal-flow `Hva vi bygger` prelude,
  followed by a sticky scroll-driven cube/index axis.
- Above 800 px, five paired service rows move in opposing left/right streams.
  Through 800 px, each service is one complete full-width chapter with no
  horizontal travel or split ghost text.
- Preserves every service label, description, capability and established href
  as server-rendered content. Five existing local service images are mounted
  on five faces of one large local CSS-3D cube.
- Adapts the fully audited dual-wave motion architecture from
  `ValentinDBS/codrops-tutorial-text-animation` at commit
  `90dfeb2eec89dd6879cabf2e76f4e7096e515a8a`: measured ranges, sine offsets,
  opposing multipliers, closest-to-center focus and resize recalculation.
- The same closest-to-center calculation holds each readable face front-on for
  a readable rest, then rotates through five 90-degree stops inside extended
  centred turn windows. The inner cube stays at `scale(1)` and adds no second
  trigger or preloader.
- The outer cube stage begins at an adaptive one-CSS-pixel scale, is optically
  hidden at the exact pre-scroll rest, then fades in across the first three
  percent while growing cubically to exact full size at `Nettsider`. The inner
  cube rotates linearly from `X -360° / Y -540° / Z -42°` from zero. Later,
  wide desktop alternates `X -58° / +48° / -58°` transient pitch and restrained
  `5–7°` Z roll through the first three centred Y turns; compact/mobile reduce
  this depth. No added angle survives a stop. The final top-face turn and all
  five front-on stops remain unchanged. The bottom face reuses the first local
  image; perspective remains `5 ×` face size at every breakpoint.
- The central `01 / 05` counter is removed at every breakpoint.
- Each enhanced stop shows only its active service. Inactive rows remain
  server-rendered but visually hidden and pointer-inactive until scroll or
  keyboard focus transfers the service focus.
- The polished cube is approximately 10–15 percent larger on desktop, modestly
  larger on compact/mobile and uses brighter near-monochrome service imagery.
- Wide desktop places both content lanes one grid column inward and uses faint
  active focus registers toward the cube. They are content-layer guides, not a
  grid, card system or background owner.
- Does not import reference CSS, JS, fonts or assets and does not add
  ScrollSmoother or captured scrolling.
- Reduced-motion and no-JS use the first static image and a complete
  normal-flow ledger.
- The global `services-focus` state now has stronger asymmetric light, wave and
  shared material/grain with a lower veil. No local background is mounted.
- Retains the one global atmosphere from `b5d1a10`; no local background was
  introduced.

## Active global atmosphere material and media

- Uses the independently authored 10-second Tigon focus-field loop as a
  644×360 fast-start delivery file, with a local poster and HyperFrames source.
- Retains the user-supplied `wavebg.mp4` remux and former generated source for
  rollback/history; neither is mounted.
- Adds a local poster and a deterministic tiled WebP grain asset.
- Replaces the 25 FPS full-viewport grain canvas with CSS material/grain layers:
  reduced dark multiply texture, restrained static two-scale film texture, asymmetric light
  and deeper irregular vignette, all below chapter text and media.
- Keeps `HomeAtmosphere` as the only physical owner; Intro, Tjenester, Effekt
  and Arbeid remain transparent and no new scroll trigger is introduced.
- Mobile now retains the lightweight wave and static grain. Reduced motion and
  no-JS use the poster and static grain.
- Normal playback is armed only after load/idle so atmosphere media does not
  compete with Hero LCP. All five below-fold cube faces are lazy-loaded.

## Committed global atmosphere

- Adds `HomeAtmosphere` as the one physical Work background owner from Intro
  through Arbeid.
- Removes Intro/Tjenester backdrop and duplicate wave markup/styles/playback.
- Makes Intro, Tjenester, Effekt and Arbeid roots transparent and preserves
  their approved content, typography, links and local choreography.
- Reduces only the stacked 01→02 transition spacing that created the empty
  black hold.
- Adds one responsive playback owner. This historical commit disabled its
  desktop-only video/grain on mobile; the active material worktree supersedes
  that fallback as documented above.
- Updates the global state selectors and documentation to the one-owner model.

Approved commit: `b5d1a10`.

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

- The active dual-wave Tjenester plus global material worktree passes
  TypeScript, optimized production build and `git diff --check`.
- The committed ownership baseline confirmed one video, one sticky backdrop,
  transparent 01→04 roots, no horizontal overflow and a continuous
  Intro→Tjenester handoff. The active material pass changes the compact and
  reduced fallback and therefore requires the new verification recorded below
  before approval.
- The active 02 composition was checked at 1440, 900, 800, 768 and 390 px,
  including the exact 800/801 px boundary. Above 800 px the paired transforms
  remain active; through 800 px both service panels are full-width with zero
  horizontal travel. Reduced motion, 390 px no-JS, five hrefs and overflow were
  checked directly.
- The one-owner global material baseline was checked in production at 1440,
  1024, 900, 768 and 390 px. Every width has one atmosphere owner, one
  backdrop, one video, one grain stage, correct named state changes and zero
  horizontal overflow. Desktop/mobile play the wave; reduced motion and 390 px
  no-JS use the poster and static grain. Both grain scales are now static at
  every width and motion preference.
- The Tigon focus-field source passes HyperFrames lint/runtime/layout/motion;
  its mounted 644×360 delivery passes TypeScript, production build and
  `git diff --check` without changing owner count or section geometry.
- The only production matrix network failure was the already documented
  protected `/kontakt` prefetch 404. Header/Hero links and routes were outside
  this task and remain unchanged.
- The supplied NuDot recording was sampled at one-second and 50 ms intervals.
  Its fixed focal-object behavior was translated with existing Tigon assets;
  the later user-supplied MIT cube reference supplies the six-face CSS-3D
  precedent without importing its CSS, JavaScript or images.
- The polished cube pass was checked in the production build at 1440, 1100,
  1024, 900, 800 and 390 px. All five active indices expose the matching face,
  the protected center axis clears both text panels and document overflow
  remains zero. The face transform is unchanged through the first 10 percent
  of each interval before rotating through its middle; reduced-motion/no-JS
  retain five links plus the static first face.
- The 2026-07-19 connected 01→02 pass was checked in production at 2048×1024,
  1440, 1024, 900, 801/800, 768 and 390 px. It passed the shortened Intro
  geometry, measured foreground fade, distant scroll-bound entrance roll,
  mobile cube-field clearance, responsive cube growth, all five face
  stops, upright top SEO face, reverse scroll, refresh-in-section, resize,
  keyboard reveal, reduced motion, no-JS, five hrefs and zero overflow.
- The clean throttled production profile measured LCP/FCP at 816–920 ms,
  transfer at 532.7 KiB, estimated blocking at 259–370 ms and CLS at 0–0.025.
  The remaining shared HomeMotion/GSAP split is a separate lifecycle task.
- The isolated Intro commit passed TypeScript and production build checks.
- The isolated 03/04 commit passed TypeScript and a production Webpack build.
- A previous full dark-homepage pass was recorded on 2026-07-17, but the Intro
  changed afterward. Run the relevant visual matrix again before approving a
  new cross-section journey; do not claim the July 17 screenshots validate the
  new Intro.
- Required widths for cross-section checks: 1440, 1024, 900, 768 and 390 px,
  plus reverse scroll, resize, touch, reduced motion and no-JS where relevant.

## Safe next-step protocol

The active uncommitted visual task is the calibrated Intro→Tjenester journey.
Preserve the committed one-owner Intro-through-Arbeid atmosphere and do not
restore local section backdrops.

When the user opens another section:

1. Read its active section contract and inspect its current dirty diff.
2. Take a before screenshot and create a scoped rollback point when requested.
3. Change only the named section and the minimum shared handoff it owns.
4. Do not restyle Intro, 03 or 04 merely to make the new section convenient.
5. Show before/after and stop for approval when the user asks for a gate.
6. Commit only after explicit approval, with unrelated changes left unstaged.
