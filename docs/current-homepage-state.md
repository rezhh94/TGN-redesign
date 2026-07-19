# Current Homepage State

Last reconciled against mounted source and Git: 2026-07-19.

This is the canonical mounted-state snapshot. Read
`docs/project-continuation-context.md` first for commit/worktree boundaries,
`docs/remaining-work.md` for the open backlog and
`design.md` for the canonical design language. The detailed dark-surface
recipes remain in `docs/homepage-dark-design-contract.md`.

## Git boundary

- `e4dbba7` contains the approved ScrollTextMotion Intro.
- `7ef236d` contains the approved compact Tjenester mosaic.
- `c349ef7` contains the approved 03/04 atmosphere and typography work.
- `2aaa6ad` is the clean baseline and contains the canonical design handbook.
- `b5d1a10` contains the approved one-owner global atmosphere through Arbeid.
- The active dirty 02/Tjenester worktree replaces the earlier mosaic with the
  explicitly requested centered dual-wave composition. Its implementation,
  section contract and current-state documentation move together.
- Global Lenis removal is not present after the user-requested reset. Lenis and
  dormant homepage initializers remain mounted and must be handled only in a
  separate lifecycle task.

## Active page journey

1. Header / Hero — protected and unchanged.
2. 01 / Tilnærming — `ApproachStatementBridge`.
3. 02 / Tjenester — `WhatWeBuild`.
4. 02 → 03 — `OutcomeTensionBridge`.
5. 03 / Effekt — `WhatWeImprove`.
6. 03 → 04 — `EffectWorkBridge`.
7. 04 / Arbeid — `WorkProof`.
8. 04 → 05 and 05 / Prosess — shared `work-process-journey` + `ProcessLayers`.
9. 06 / System — `SystemManifesto`.
10. Kontakt / footer — `ContactFooter`, protected and unchanged.

## Active design system

- All body sections from Intro/01 through 06/System run in dark mode.
- Dark mode is not one flat black: `surface-deep`, `surface-base`,
  `surface-raised` and `surface-focus` create depth and section identity.
- TGS Perfect remains display, JUST Sans editorial/body and Caleb Mono meta
  across the Tigon system. Intro now uses the same local display/mono roles;
  the former render-blocking Codrops Typekit import is removed.
- Migrated sections use semantic `display`, `lead`, `body` and `meta` roles.
  Visible meta has a 10 px minimum.
- All body sections share `homepage-gutter`, 12/6-column grid logic, dark line
  roles and named section rhythm.
- `HomeAtmosphere` physically owns one Tigon focus-field loop, poster, asymmetric
  spotlight, vignette, dark material, veil and two-scale film-grain field from
  Intro through Arbeid. All four section roots are transparent; no section
  boundary restarts the background.
- Both grain scales are restrained static background layers below chapter text and
  media; the former page-wide overlay above content is explicitly rejected.
- Desktop and mobile arm the same lightweight 644×360 focus-field loop only
  after the load event and an idle/fallback window. Reduced motion and no-JS
  use its static poster plus static grain. The former 25 FPS viewport grain
  canvas has been removed.
- The mounted loop is independently authored for Tigon and reproducible under
  `videos/tigon-focus-field/`. The former user-supplied `wavebg.mp4` remux is
  retained for rollback but is no longer mounted.
- The current clean baseline still mounts global Lenis. The canonical future
  direction remains native scroll, but lifecycle cleanup is outside the active
  02 design scope.

## Section state

### 01 / Tilnærming

- Uses the approved, section-scoped Codrops `ScrollTextMotion` adaptation.
- Stable foreground: `BYGD SAMMEN`, the existing integrated-practice paragraph
  and `TGN / integrated practice`, without a card or visible text box.
- Decorative Tigon capability words use Codrops' `group`, `el`, `pos-*`, GSAP
  Flip and scramble architecture behind the foreground statement.
- Collision clearance fades each decorative word before it overlaps the
  foreground copy. The background motion continues above and below the text.
- Decorative group spacing is shortened to `8.5vh` on desktop and `9vh`
  through 800 px, reducing the 2048×1024 Intro from about 4.52 to 4.21
  viewports without removing any term or semantic content.
- During the measured final handoff, the complete stable foreground fades and
  lifts 12 px before `Hva vi bygger` occupies the main field. Reverse scroll
  restores it. Reduced motion/no-JS use ordinary-flow foreground content.
- Sits above the one global wave/material/vignette/grain field. Mobile retains
  the lightweight wave and static grain; reduced motion/no-JS use the poster.
- The handoff `01 → 02 / Én helhet. Fem fag.` remains server-rendered.
- Full implementation contract: Appendix A in `design.md` and
  `docs/sections/01-approach.md`.

### 02 / Tjenester

- Five services, descriptions, capability lists and established hrefs are
  unchanged and server-rendered. Five existing local service images occupy five
  brighter faces of one large CSS-3D cube on the center axis.
- Sits transparently above `HomeAtmosphere`; there is no local section canvas,
  duplicate wave or separate grey background.
- `Hva vi bygger` and its explanation form a concise normal-flow prelude. The
  sticky scene that follows contains only the active cube; the former central
  `01 / 05` index and hero-like center stack are removed.
- Above 800 px, paired service panels move in opposing left/right streams
  around that cube axis. Through 800 px, every active service is one complete
  full-width chapter below the sticky cube; there are no split ghost columns.
- The service hierarchy remains moderate JUST Sans with Caleb Mono metadata;
  it does not use full-screen service names, cards or ornamental dividers.
- One section-scoped `servicesScene` adapts the audited Codrops dual-wave
  mechanics: measured ranges, sine offsets, opposing directions and
  closest-to-center focus. That same row position holds the active face around
  its service centre, then rotates the local cube through five service faces;
  there is no second trigger, preloader or ScrollSmoother.
- The outer stage starts at an adaptive one-CSS-pixel scale but is optically
  hidden at the exact pre-scroll rest. It fades in across the first three
  percent while its cubic depth curve and the inner cube's X/Y/Z tumble remain
  live from zero. It settles at full size on `Nettsider`; later 90-degree turns
  use long centred windows and controlled compound arcs. Wide desktop alternates
  X pitch `-58deg / +48deg / -58deg` through the first three turns, adds only
  `5–7deg` Z roll, and reduces that depth on compact/mobile. This exposes top,
  bottom and side planes across the journey without changing any front-on stop.
- The bottom face reuses the already requested first service image, so every
  visible edge carries imagery during the tumble without another asset request.
- The responsive perspective is exactly five times the face size with a centred
  origin, matching the verified NuDot cube geometry without importing its code.
- Above 1200 px, faint focus registers connect the active left/right panels to
  the cube. Above 1500 px both lanes sit one grid column inward. No local
  backdrop or additional content is introduced.
- Each held stop isolates one active service; adjacent rows are visually hidden
  and pointer-inactive until scroll transfers focus. Keyboard focus reveals an
  inactive real link, while reduced-motion/no-JS retain the complete ledger.
  The cube keeps more of its size during each turn.
- From 801–900 px the dual streams use smaller measured ranges. Through 800 px
  horizontal travel is zero and the visible service metadata owns orientation.
  Reduced motion and no-JS receive the first
  static image and a complete normal-flow ledger.
- Through 800 px, the outgoing service fades before entering the sticky cube
  field and the incoming service appears only after that field clears.
- `services-focus` strengthens the existing global atmosphere with asymmetric
  light, higher wave/grain presence and a lower veil. It does not add a local
  background owner.

### 02 → 03

- `OutcomeTensionBridge` is the mounted handoff.
- Three complete statements share one sticky typographic stage on enhanced
  motion: launch → understanding → action.
- Compact/reduced/no-JS retain readable complete text.

### 03 / Effekt and 03 → 04

- Semantic typography and the 10 px meta floor are active.
- The global atmosphere continues through
  `effect-focus → handoff → work-focus → exit`.
- Desktop and mobile use the same wave/material already visible in Intro and
  Tjenester; reduced motion/no-JS use the continuous poster/light/grain field.
- The asymmetric result content and established 03→04 thesis remain unchanged.

### 04 / Arbeid

- Six future-facing capability links remain Webapp, Nettsted, Plattform,
  E-handel, AI and App. It is capability, never portfolio or customer proof.
- Sticky archive title and six-row asymmetric wall use the approved clip,
  scale, parallax and word-exit mechanics on desktop.
- Tablet/mobile use normal flow; touch gets visible `Utforsk`; reduced motion
  and no-JS keep all real links readable.
- Dynamic Text Cursor is still limited to the six fine-pointer capability links.

### 05 / Prosess

- Retning, Bygg and Live remain one visible three-phase system map in ordinary
  document flow.
- Former paper/mineral panels are now dark `raised`, `focus` and `deep`
  materials. No light panel or section surface remains.
- One-shot panel settling remains; there is no pin or state-switching stage.
- The approved 04→05 overlap lands directly in `surface-deep`.

### 06 / System

- Keeps the Tigon assembly mark, statement and system explanation.
- Uses the same type, gutter, line and surface contract as the rest of the body.
- Its quieter radial focus and grid close the journey before the unchanged
  footer entry. Motion remains one-shot and section-scoped.

## Motion and lifecycle

- `HomeAtmosphere` owns global background playback and responsive fallback.
  `HomeMotion` owns atmosphere states and local content choreography;
  `introStoryScene` owns only Intro Flip, scramble and collision clearance.
- Global Lenis plus the generic reveal/parallax/shutter/approach initializers
  remain mounted in the clean baseline; their removal is a separate open task.
- CSS and JS compact geometry are reconciled: Effekt uses compact logic through
  900 px; Work archive through 1000 px.
- No master pin, global ScrollTrigger kill or critical animation-dependent
  content was added. The current baseline still uses global Lenis.
- Explicit scroll margins keep `#arbeid`, `#prosess` and heading fragments
  below the fixed header.

## Preservation state

- Header, Hero, footer DOM, NAP, important footer links, SEO metadata, schema,
  sitemap, robots, canonical, URLs and slugs were not changed.
- 04 capability semantics and six established hrefs were not changed.
- No visible orange or unapproved third-party code, font, shader, loader or
  asset was added. The former Typekit dependency is no longer mounted.
- No old `styles.css`, `signature.css` or `main.js` was imported.

## Verification

Verification record:

- The global atmosphere/material worktree passes TypeScript, the optimized
  production build and `git diff --check`.
- The committed ownership baseline confirmed one wave video, one sticky
  backdrop, transparent Intro/Tjenester/Effekt/Arbeid roots, continuous
  Intro→Tjenester light and no horizontal overflow. The active material pass
  supersedes its mobile/reduced fallback and was revalidated in production.
- Production QA at 1440, 1024, 900, 768 and 390 px confirmed exactly one
  atmosphere owner, backdrop, wave and grain stage; named states resolve from
  Intro through Work and every width has zero horizontal overflow.
- The atmosphere video is deferred until after load/idle on desktop and mobile.
  Reduced motion and 390 px no-JS hide the video, keep the poster/material/grain
  visible and retain all five service links. Both grain scales are static at
  every width and motion preference.
- The Tigon focus-field source passed HyperFrames lint/runtime/layout/motion
  checks; the mounted source swap passes TypeScript, production build and
  `git diff --check` with the existing 644×360 playback contract unchanged.
- The matrix exposed only the already documented protected `/kontakt` route
  prefetch 404 at wider widths; this task did not change that link or route.
- The revised Tjenester composition was checked at 1440, 1100, 1024, 900, 800,
  768 and 390 px, including the exact 800/801 px choreography boundary.
  Desktop/tablet-wide retain opposing transforms; through 800 px both panels
  are full-width with zero horizontal transform. All tested widths have zero
  document overflow and the larger cube clears both text panels.
- The CSS-3D cube maps one-to-one with active services without a central index.
  Its held stop isolates the matching service before the extended turn.
  Reduced-motion and no-JS retain the large first face as a static visual.
- The 2026-07-19 connected matrix checked 2048×1024, 1440, 1024, 900,
  801/800, 768 and 390 px. Intro exit measured `1 → 0.5 → 0`; the corrected
  cube entry begins at one CSS pixel and uses a cubic scale curve while linear
  rotation runs from `X -360° / Y -540° / Z -42°` to the first front-on face.
  Perspective measured `5 ×`
  at every width. All five stops, upright top SEO face, extended centred
  turns, reverse, refresh-in-section, responsive resize, reduced motion, no-JS
  and zero document overflow passed alongside production build and TypeScript.
- A clean extension-free production profile with Pixel 5 geometry, 4× CPU
  throttle and constrained network measured LCP/FCP at 816–920 ms after the
  correction, down from 1,440–1,580 ms. Transfer fell from 636.3 to 532.7 KiB,
  estimated blocking from 452–805 to 259–370 ms, and CLS stayed at 0–0.025.
  This is a controlled production profile, not a claimed Lighthouse score.
- The isolated Intro commit passed TypeScript and production build checks.
- The isolated 03/04 commit passed TypeScript and a production Webpack build.
- The earlier integrated dark-homepage pass was checked on 2026-07-17 at 1440,
  1024, 900, 768 and 390 px, including reduced motion, touch, no-JS, reverse,
  anchors and static prerendering.
- The connected Intro→Tjenester journey was rechecked on 2026-07-19; later
  section changes still require their own scoped matrix.

## Rollback

Approved commits:

- Intro: `e4dbba7`.
- 03/04: `c349ef7`.

For rollback, checkpoint newer work and restore only the explicitly named
section files or approved commit. Never reset the full worktree.
