# Current Homepage State

Last reconciled against mounted source and Git: 2026-07-18.

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
- The active 02/Tjenester checkpoint consists of the new mosaic, its
  `servicesScene` motion owner and current design/status documentation.
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
  across the Tigon system. Intro alone deliberately scopes Codrops' Typekit kit
  `upd0woi` for its reference-faithful display/mono treatment.
- Migrated sections use semantic `display`, `lead`, `body` and `meta` roles.
  Visible meta has a 10 px minimum.
- All body sections share `homepage-gutter`, 12/6-column grid logic, dark line
  roles and named section rhythm.
- `HomeAtmosphere` physically owns one Work wave, spotlight, vignette, veil and
  restrained desktop grain layer from Intro through Arbeid. All four section
  roots are transparent; no section boundary restarts the background.
- Mobile/reduced motion disable video and grain but retain the same continuous
  static spotlight. No new third-party asset was introduced.
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
- Sits above the one global Work wave/spotlight/vignette/grain field. Video and
  grain are desktop-only; reduced motion and mobile use the static spotlight.
- The handoff `01 → 02 / Én helhet. Fem fag.` remains server-rendered.
- Full implementation contract: Appendix A in `design.md` and
  `docs/sections/01-approach.md`.

### 02 / Tjenester

- Five services, descriptions, capability lists, images and established hrefs
  are unchanged and server-rendered.
- Sits transparently above `HomeAtmosphere`; there is no local section canvas,
  duplicate wave or separate grey background.
- A restrained sticky rail anchors a three-row asymmetric desktop mosaic. The
  two existing images are media anchors; the other three services are compact
  text modules.
- Service hierarchy uses moderate JUST Sans rather than large display type.
  Repeated chapter borders and the redundant delivery register are removed.
- Motion is limited to small module settles and mild image parallax. Through
  900 px the rail is static; mobile/reduced motion keep ordinary flow while the
  global atmosphere supplies its lightweight fallback.

### 02 → 03

- `OutcomeTensionBridge` is the mounted handoff.
- Three complete statements share one sticky typographic stage on enhanced
  motion: launch → understanding → action.
- Compact/reduced/no-JS retain readable complete text.

### 03 / Effekt and 03 → 04

- Semantic typography and the 10 px meta floor are active.
- The global atmosphere continues through
  `effect-focus → handoff → work-focus → exit`.
- Desktop uses the same existing Work wave/grain already visible in Intro and
  Tjenester; mobile/reduced motion use the continuous static CSS spotlight.
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
- No visible orange or unapproved third-party code, media, shader, loader or
  asset was added. Intro deliberately loads Codrops' Typekit kit `upd0woi`;
  this scoped exception is documented in `design.md` and must not spread.
- No old `styles.css`, `signature.css` or `main.js` was imported.

## Verification

Verification record:

- The global atmosphere worktree passes TypeScript, the optimized production
  build and `git diff --check`.
- Desktop QA confirmed one wave video, one sticky backdrop, transparent
  Intro/Tjenester/Effekt/Arbeid roots, continuous Intro→Tjenester light and no
  horizontal overflow. Mobile and reduced-motion QA confirmed video/grain are
  disabled while the static spotlight and all content remain present.
- The new mosaic was reviewed at 1440, 1024, 900, 768 and 390 px. Reduced
  motion, 390 px no-JS, all five service hrefs and horizontal overflow were
  checked directly; all five modules remain visible and video is disabled in
  compact/reduced states.
- The isolated Intro commit passed TypeScript and production build checks.
- The isolated 03/04 commit passed TypeScript and a production Webpack build.
- The earlier integrated dark-homepage pass was checked on 2026-07-17 at 1440,
  1024, 900, 768 and 390 px, including reduced motion, touch, no-JS, reverse,
  anchors and static prerendering.
- The Intro changed on 2026-07-18. Do not treat the July 17 visual matrix as a
  visual approval of the new Intro; rerun relevant viewport/lifecycle checks
  before the next connected-section approval.

## Rollback

Approved commits:

- Intro: `e4dbba7`.
- 03/04: `c349ef7`.

For rollback, checkpoint newer work and restore only the explicitly named
section files or approved commit. Never reset the full worktree.
