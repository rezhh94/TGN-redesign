# Tigon Motion and Asset Roadmap

Last reconciled: 2026-07-18.

## Global guardrails

- Native scroll remains the canonical target. The mounted clean baseline still
  initializes global Lenis; removal is an open, separate lifecycle task.
- Important text and links remain server-rendered and visible without JS.
- Respect reduced motion, touch and compact layouts.
- Motion is section-scoped with one owner and explicit cleanup.
- No master pin, global kills, horizontal scroll, visible orange or decorative
  cursor system. The only custom cursor remains the functional Work cursor.

## Active owner map

### Hero

- Existing one-time entrance only. Protected and unchanged.

### Global Intro → Arbeid atmosphere

- Mounted owner: one persistent supplied wave/poster, asymmetric spotlight,
  vignette, dark material, veil and two-scale grain field spanning Intro,
  Tjenester, Effekt and Arbeid with named focus/handoff states.
- `HomeAtmosphere` owns playback and responsive fallback. The former Intro and
  Tjenester background instances are removed.
- Compact plays the same lightweight wave with static grain. Reduced/no-JS use
  its poster plus the continuous static material. Section content timelines
  remain locally owned.

### 01 / Tilnærming

- `introStoryScene`: reference-faithful Codrops ScrollTextMotion adaptation.
  Decorative Tigon terms use Flip between `pos-*` states and ScrambleText on
  entry/re-entry while the stable `BYGD SAMMEN` foreground never transforms.
- A measured collision-clearance pass fades each decorative word before it
  intersects the foreground copy, without a visible blocking surface.
- The global wave plays once on desktop and mobile. Reduced motion/no-JS use
  the static poster/grain field. Collision clearance and Flip/scramble cleanup
  remain section-scoped.

### 02 / Tjenester

- `servicesScene` owns one section-scoped dual-wave engine. It measures the
  paired lanes, applies sine-wave horizontal offsets in opposing directions
  and marks the service closest to the viewport center.
- The text thesis is a normal-flow prelude. Only the active image/index axis is
  CSS-sticky; it does not pin or capture the viewport.
- From 801 px, compact/desktop use measured opposing ranges. Through 800 px,
  the range resolves to zero and each active service reads as one full-width
  chapter below the sticky image.
- Reduced motion and no-JS skip the engine and use the first static image plus
  a normal-flow service ledger.
- The closest-to-center index also switches one borderless center visual among
  five local images. It reuses the existing trigger and adds no preloader.
- No ScrollSmoother, reference asset or duplicate scroll transport is part of
  the implementation.
- `homeAtmosphereStateScene` owns the stronger asymmetric `services-focus`
  light/wave/grain/veil state. Background ownership remains global.

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

## Open lifecycle debt

The user-requested reset restored the clean `2aaa6ad` baseline. It still mounts:

- global Lenis init, RAF ticker bridge, dependency and helper module;
- generic content reveal, generic parallax, shutter and approach-path
  initializers;
- older compact lifecycle behavior outside the active 02 scope.

Review and remove this only in a separate lifecycle task. Do not mix it into
the Tjenester visual approval or commit.

## Asset state

- The mounted global Intro-through-Arbeid owner uses the explicitly
  user-supplied wave source as `/video/work-wave-loop.mp4`; its audio track is
  removed without re-encoding the video frames. Intro deliberately imports
  Codrops' Typekit kit `upd0woi` inside its namespaced stylesheet.
- `videos/tigon-work-atmosphere/` remains the retained source project and QA
  record for the former generated 12-second loop. It is no longer the active
  delivery source and must not be deleted silently.
- `/video/work-wave-poster.jpg` is the reduced-motion/no-JS frame and
  `/atmosphere/film-grain.png` is the deterministic local texture tile.
- Five existing files under `public/services/` are mounted by the active center
  visual; no NuDot or Codrops image asset is imported.
- Work and temporary Effekt surfaces use existing Tigon files under
  `public/work/capability-stage/`.
- Effekt mockups remain placeholders awaiting final user-supplied assets.
- The two-scale grain is part of the global atmosphere through Intro→Arbeid.
  Only the fine desktop tile shifts; mobile and reduced motion keep it static.
- No unapproved third-party code, font, image, shader or tracking was added.
  The user-supplied wave and Intro Typekit kit are the documented exceptions.

## Validation gate

For every later motion change:

1. Confirm static, reduced-motion, touch and no-JS readability.
2. Test 1440, 1024, 900, 768 and 390 px.
3. Test refresh/deep-link, resize and reverse scroll.
4. Confirm six direct Work hrefs and visible touch actions.
5. Run `npm run typecheck`, `npm run build` and `git diff --check`.
