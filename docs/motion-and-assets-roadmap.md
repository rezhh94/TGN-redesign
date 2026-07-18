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

- Mounted owner: one persistent Work wave/spotlight/vignette/veil/grain field spanning
  Intro, Tjenester, Effekt and Arbeid with named focus/handoff states.
- `HomeAtmosphere` owns playback and responsive fallback. The former Intro and
  Tjenester background instances are removed.
- Compact/reduced/no-JS use one continuous static CSS light field. Section
  content timelines remain locally owned.

### 01 / Tilnærming

- `introStoryScene`: reference-faithful Codrops ScrollTextMotion adaptation.
  Decorative Tigon terms use Flip between `pos-*` states and ScrambleText on
  entry/re-entry while the stable `BYGD SAMMEN` foreground never transforms.
- A measured collision-clearance pass fades each decorative word before it
  intersects the foreground copy, without a visible blocking surface.
- The global Work wave plays once on desktop; mobile and reduced motion disable
  video/grain. Collision clearance and Flip/scramble cleanup remain
  section-scoped.

### 02 / Tjenester

- `servicesScene` owns only small mosaic settles and mild parallax on the two
  existing service images. Background playback belongs to `HomeAtmosphere`.
- The desktop sticky rail is CSS-owned and does not pin the viewport. Compact
  through 900 px uses one-shot settles; mobile/reduced motion disable video.

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

- The mounted global Intro-through-Arbeid owner uses
  `/video/work-wave-loop.mp4`. Intro deliberately imports Codrops' Typekit kit
  `upd0woi` inside its namespaced stylesheet. This is the only new
  external-font exception.
- `videos/tigon-work-atmosphere/` is the retained source project for the active
  12-second Work/Intro wave loop. Keep its 1920×1080 source and QA snapshots;
  `public/video/work-wave-loop.mp4` is the optimized website delivery file.
- Tjenester uses existing files under `public/services/`.
- Work and temporary Effekt surfaces use existing Tigon files under
  `public/work/capability-stage/`.
- Effekt mockups remain placeholders awaiting final user-supplied assets.
- Restrained desktop grain is part of the global Work atmosphere through
  Intro→Arbeid; mobile/reduced motion use one continuous static CSS field.
- No unapproved third-party code, font, image, video, shader or tracking was
  added.

## Validation gate

For every later motion change:

1. Confirm static, reduced-motion, touch and no-JS readability.
2. Test 1440, 1024, 900, 768 and 390 px.
3. Test refresh/deep-link, resize and reverse scroll.
4. Confirm six direct Work hrefs and visible touch actions.
5. Run `npm run typecheck`, `npm run build` and `git diff --check`.
