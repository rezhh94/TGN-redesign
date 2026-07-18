# Tigon Motion and Asset Roadmap

Last reconciled: 2026-07-18.

## Global guardrails

- Native scroll is canonical. Global Lenis and its dependency are removed in
  the current protected, uncommitted worktree state.
- Important text and links remain server-rendered and visible without JS.
- Respect reduced motion, touch and compact layouts.
- Motion is section-scoped with one owner and explicit cleanup.
- No master pin, global kills, horizontal scroll, visible orange or decorative
  cursor system. The only custom cursor remains the functional Work cursor.

## Active owner map

### Hero

- Existing one-time entrance only. Protected and unchanged.

### 01 / Tilnærming

- `introStoryScene`: reference-faithful Codrops ScrollTextMotion adaptation.
  Decorative Tigon terms use Flip between `pos-*` states and ScrambleText on
  entry/re-entry while the stable `BYGD SAMMEN` foreground never transforms.
- A measured collision-clearance pass fades each decorative word before it
  intersects the foreground copy, without a visible blocking surface.
- The existing Work wave is lazy-loaded only for desktop motion; mobile and
  reduced motion disable video. Cleanup pauses video, removes clearance state
  and reverts section-scoped triggers/tweens.

### 02 / Tjenester

- `servicesScene`: small opposing copy/media settle, one-shot register rows and
  mild desktop image parallax.
- Compact threshold matches the 900 px CSS composition.

### 02 → 03

- `outcomeTensionBridge`: three server-rendered statements share one sticky
  stage when enhanced.

### 03 / Effekt

- `effectScene`: one scoped result stage with marker reveal, media settle and
  the shared atmosphere state handoff.
- Compact motion now matches the CSS through 900 px.

### 03 → 04 and 04 / Arbeid

- `atmosphereStateScene`: updates the shared continuum state without a new
  master timeline.
- `effectWorkJourney`: scoped wave/spotlight/veil/grain handoff into Work.
- `workArchiveScene`: sticky title, clip/scale media entrance, six calibrated
  parallax values and word-wise title exit on desktop.
- The archive uses compact normal-flow behavior through 1000 px, matching CSS.
- `setupDynamicTextCursor`: six real capability links only; disabled for touch
  and reduced motion.

### 04 → 05 and 05 / Prosess

- `workProcessJourney`: outgoing Work shifts and darkens while the real Process
  section rises in normal scroll.
- `processScene`: low-intensity one-shot settling in phase order 01→02→03.
- No light panels, pin or state switching.

### 06 / System

- `manifestoReveal`: masked statement, four assembly pieces, support and grid
  settle once. The dark CSS composition is complete without motion.

### Footer

- Existing footer parallax and wordmark reveal remain. Footer markup and links
  are protected and unchanged.

## Removed lifecycle debt

Status note: the following cleanup is present in the current dirty worktree,
not in the two approved Intro and 03/04 commits.

- Global Lenis init, RAF ticker bridge, dependency and unused helper module.
- Dormant homepage initialization of generic content reveal, generic parallax,
  shutter transition and approach-path journey; none had mounted hooks.
- 769–900 Effekt and 769–1000 Work JS/CSS geometry mismatch.

## Asset state

- Intro reuses `/video/work-wave-loop.mp4` and deliberately imports Codrops'
  Typekit kit `upd0woi` inside its namespaced stylesheet. This is the only new
  external-font exception.
- `videos/tigon-work-atmosphere/` is the retained source project for the active
  12-second Work/Intro wave loop. Keep its 1920×1080 source and QA snapshots;
  `public/video/work-wave-loop.mp4` is the optimized website delivery file.
- Tjenester uses existing files under `public/services/`.
- Work and temporary Effekt surfaces use existing Tigon files under
  `public/work/capability-stage/`.
- Effekt mockups remain placeholders awaiting final user-supplied assets.
- Desktop-only 03→04 wave/grain remains existing scoped media; mobile/reduced
  motion disables it.
- No unapproved third-party code, font, image, video, shader or tracking was
  added.

## Validation gate

For every later motion change:

1. Confirm static, reduced-motion, touch and no-JS readability.
2. Test 1440, 1024, 900, 768 and 390 px.
3. Test refresh/deep-link, resize and reverse scroll.
4. Confirm six direct Work hrefs and visible touch actions.
5. Run `npm run typecheck`, `npm run build` and `git diff --check`.
