# Trionn homepage animation breakdown

Audit date: 2026-07-19
Target: `https://trionn.com/`
Purpose: technical study for an original Next.js implementation. This report does not recommend copying Trionn's design, content, shader code or assets.

Sister documents: `DESIGN-TRIONN.md` explains the construction system behind
the page; `docs/trionn-ekstrakt.md` records the current KEEP/ADAPT/REJECT
boundary for Tigon.

## 1. Mirror and source boundary

The site was mirrored with GNU Wget 1.25.0 using:

```sh
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent \
  --domains=trionn.com,www.trionn.com \
  --directory-prefix=outputs/qa-trionn-animation-audit/mirror \
  https://trionn.com/
```

The initial pass fetched 161 files. Four homepage chunks referenced only through the Turbopack runtime were then fetched explicitly, because `--page-requisites` cannot discover runtime-generated chunk URLs. Final snapshot: 165 files, about 20 MB. `index.html` and all four lazy chunks return HTTP 200 when the mirror is served locally.

The first-party module map is in
`outputs/qa-trionn-animation-audit/pretty-js/README.md`. Mixed bundles are
retained as evidence because Turbopack combines application and library
modules. GSAP, ScrollTrigger, SplitText, DrawSVG, Three.js, Lenis, Swiper and
ScrollSmoother implementations are libraries and are not classified as
Trionn-authored code.

## 2. Runtime stack and global coordination

The animation stack is:

- React/Next.js with Turbopack chunks and dynamically imported heavy sections.
- GSAP 3.15, ScrollTrigger, SplitText, DrawSVG, Observer/Draggable support.
- Lenis as the active global smooth-scroll engine.
- Three.js for the hero symbol and Dribbble orbit.
- A raw WebGL 1 fragment shader for the footer smoke.
- A shared `CanvasManager` requestAnimationFrame scheduler that activates callbacks only while scenes are near/in view.
- Swiper for testimonials.
- IntersectionObserver for cheap enter reveals, canvas activation and counter starts.

### Lenis and ScrollTrigger

`ReactLenis` runs at the root with `autoRaf: false`; GSAP's ticker supplies `lenis.raf(time * 1000)`. Lenis emits scroll events directly to `ScrollTrigger.update`. The ticker uses `lagSmoothing(500, 33)`.

Common options:

| Option | Desktop | Touch |
| --- | --- | --- |
| duration | `1.05` | `1.05` |
| easing | `1 - (1 - t)^3` | same |
| lerp | `0.105` | `0.105` |
| smoothWheel | `true` | `true` |
| smoothTouch | `false` | `false` |
| syncTouch | `true` | `true` |
| wheelMultiplier | Apple `0.6`, otherwise `0.85` | `0.6` |
| touchMultiplier | `1.1` | `1.2` |

Lenis is stopped during the loader, route wipes and modal playback; HTML/body overflow is locked at the same time. It restarts after `trionn-loader:complete`, `trionn-transition:complete` or modal close. ScrollTrigger refreshes after loader/route completion and after visibility recovery. A held Space key manually advances Lenis by 15 px per ticker tick.

The Dribbble chunk contains and registers ScrollSmoother, but no `ScrollSmoother.create()` call exists. It is dead bundle weight, not the active scroll system.

### Shared reveal primitives

These patterns recur throughout the homepage:

- `BlurTextReveal`: SplitText into chars or words; initial `autoAlpha: 0`, `filter: blur(12px)`. Defaults: trigger self, `start: "top 90%"`, `end: "bottom 10%"`, `scrub: false`, reveal container `0.5s`, units `duration: 0.8`, `stagger: 0.05`, `ease: power2.out`.
- `FadeOnScroll`: SplitText color interpolation. Defaults: `start: "top 80%"`, `end: "bottom center"`, `scrub: true`, `stagger: 0.03`.
- `FadeInOnScroll`: IntersectionObserver enter reveal, normally `y: 20`, `duration: 0.8`, `ease: power2.out`; this is not ScrollTrigger.
- Line/plus separator: line width `0 -> 100%` and plus rotation `0 -> 360`, trigger line, typically `start: "top bottom"`, `end: "top center"`, `scrub: true`, `ease: none`. After completion, pointer movement scrubs the plus along the line with `0.3s power2.out`; leave returns it in `0.6s power2.out`.
- Marquee module `81371`: clones one child enough times to overfill the viewport and moves the track by a per-frame `speed` value. It wraps at one item width, eases pause/play state by `current += (target-current) * stopSpeed`, and is activated by IntersectionObserver with `rootMargin: 64px`. Optional drag uses GSAP Observer/Draggable inertia (`dragResistance: 0.12`, `throwResistance: 2500`).

## 3. Section-by-section setup

### A. Preloader / first visit

Technique: custom requestAnimationFrame choreography, CSS transform rigging, SVG path/slot-counter manipulation and synthesized/file audio. It is not a GSAP timeline.

DOM/CSS rig:

- fixed overlays at z-index `9050–9500`;
- ten flex belts, each starting at `scaleY(0)` with `will-change: transform`;
- center wrapper with `perspective: 800px`;
- fixed flying pluses and a responsive logo box (`clamp(10rem, 22vw, 17.5rem)`);
- SVG border and three logo paths start at opacity 0;
- tagline words use a CSS `0.5s cubic-bezier(.16,1,.3,1)` opacity/translate transition.

JS sequence:

1. Four pluses converge from viewport corners to the logo box over `900ms`.
2. The logo box appears/scales over `600ms`.
3. Three logo paths enter over `700ms` each with manual delays `0/200/400ms`; the combined window is `1100ms`.
4. After a short pause, the counter/border advances for `2000ms`; the outline fade is `200ms`.
5. The box expands to the viewport over `900ms` with a custom cubic in/out curve. Corner pluses fade after 65% progress; a white/gray overlay fades in the final 20%.
6. Logo pieces exit over `500ms`, delayed `0/100/200ms`.
7. The final overlay fades for `700ms`; content is made visible and the loader-complete event follows about `50ms` later.

The background line field uses 28 paths per direction. Per-line delay is about `0.028239 * index`; the normalized draw, fill and fade windows are approximately `0.1540`, `0.2156` and `0.3389`.

Readiness is event-driven: the About/intro gate listens for `trionn:intro-text-finished`, with a `4500ms` fallback, before marking the page ready.

### B. Route transitions

Technique: a phase state machine plus custom RAF belt/plus animation. Local links are intercepted; navigation occurs only after the belts report closed.

- Phases: `loader -> idle -> sweep-in -> label-show -> sweep-out`.
- Sweep in: 10 belts animate `scaleY(.008) -> 1` over `500ms`, staggered `38ms` per belt.
- Four pluses travel from screen corners to box corners over `840ms`, rotating by `+/-720deg`; label moves `y: 100 -> 0` and fades in over `840ms`.
- Sweep out after route change: belts reverse over `420ms`, again `38ms` apart. Pluses return to screen corners over `760ms` and fade after 60% progress; label moves `y: 0 -> -100` and fades over `760ms`.
- CSS supplies the fixed layers, initial visibility and `scaleY(0)` state; JS owns all temporal interpolation and navigation gating.

### C. Hero copy and scroll hint

Technique: SplitText/blur reveals, a randomized rotating word timeline, a small ScrollTrigger fade and a looping arrow timeline.

- “Designed to”: char reveal, `stagger: 0.08`, `delay: 1.2`.
- Rotating word: default interval `3000ms`; repeat delay is `interval/1000 - 0.6 = 2.4s`. Chars leave and enter with `blur(12px)`, randomized stagger `each: 0.05` (the headline instances also pass `0.08`), `power2.in` out and `power2.out` in.
- CTA: `autoAlpha: 0 -> 1`, blur to 0, `duration: 0.8`, `ease: power2.out`, trigger CTA, `start: "top 90%"`.
- Stats block: trigger section, `start: "top center"`; fade out `0.3s` onEnter and restore `0.3s` onLeaveBack.
- Scroll arrow: infinite timeline, `repeatDelay: 0.08`; `y: -15/alpha 0 -> y: 0/alpha 1` in `0.62s power3.out`, hold `0.36s`, then `y: 15/alpha 0` in `0.5s power2.in`. The entire hint fades with global scroll `start: 0`, `end: 100`, `scrub: true`.

CSS keeps important text in normal server-rendered flow and places it over the scene with relative z-index/mix-blend rules; GSAP only changes per-character opacity/filter and the small CTA/stats transforms.

### D. Hero symbol: Three.js plus 2D lightning canvas

Technique: Three.js extruded geometry, physical materials, cube-camera reflections, a separate 2D canvas texture, pointer parallax, hold-to-explode interaction and a pinned ScrollTrigger.

Three setup:

- `WebGLRenderer({ alpha: false, antialias: true, powerPreference: "high-performance" })`.
- pixel ratio capped at `1` on mobile and `1.5` on desktop;
- ACES filmic tone mapping, exposure `1.1`;
- physical material roughly `metalness: 1`, `roughness: .08`, `transmission: .35`, `ior: 2.4`, `opacity: .88`, `clearcoat: 1`;
- responsive perspective camera: FOV `36–42`, z `6–9.35`, scene scale `.74–1`.

Motion/config:

- ScrollTrigger: trigger symbol wrapper, `start: "top top"`, `end: "+=300%"` touch / `"+=400%"` desktop, `pin: true`, `pinSpacing: false`, `anticipatePin: 1`.
- Scroll is read from Lenis and normalized manually. Explosion rises from 0 to 1 across about `0.1–1.0vh`, holds to `1.2vh`, and returns to 0 by `1.8vh`; frame smoothing is `.06`.
- Scene/canvas exits vertically during roughly `2.0–2.8vh` of normalized scroll. At trigger progress `>= .8`, rendering/audio is suspended; onEnterBack resumes it.
- Auto rotation is `.0042` per frame (`.0015` with reduced motion). Pointer parallax amplitude is `.22`, smoothed by `.06`.
- Press/hold begins the burst after `500ms`; burst rises `.02` per frame to 1 and decays `.025` per frame on release. DOM text vibration resets with CSS transitions around `0.6–0.7s`.

CSS makes the scene absolute/full-viewport and non-interactive while copy stays above it. JS owns camera, geometry, shader/canvas drawing, draw loop, pointer state, audio and scroll mapping. The 3D skill review flags the main reimplementation risks: GPU memory, context loss, mobile fill rate and the fact that reduced motion only slows rotation here rather than disabling the expensive scene.

### E. About

Technique: shared blur reveal, scrubbed per-character color reveal, IntersectionObserver fades and the scrubbed line/plus separator.

- Heading/body labels use `BlurTextReveal`, mostly word stagger `.05`.
- Main statement uses `FadeOnScroll`: trigger text, `start: "top 80%"`, `end: "bottom center"`, `scrub: true`, `stagger: .03`, interpolating from low-alpha gray to `#d8d8d8`.
- Supporting paragraph uses enter fade with `delay: .3`, default `duration: .8`, `power2.out`.
- The section itself remains normal-flow with a min-height viewport grid. CSS establishes typography/color; JS only animates split units, filters/colors and the separator.

### F. Vision

Technique: one pinned scrub timeline, five full-screen stripe wipes and a continuous marquee.

- Trigger: Vision section.
- `start: "top top"`.
- `end: "+=150%"` touch / `"+=200%"` desktop.
- `pin: true`, `pinSpacing: true`, `anticipatePin: 1`, `scrub: .6`.
- Timeline default `ease: none`.
- Five stripes animate `scaleY: 0 -> 1`; each stripe has `duration: .3`, reverse-staggered over offsets from `.3` down to `0`, followed by a `.1` hold.
- The marquee runs at `speed: .8`, `gap: 0`, and pauses once timeline progress reaches `.5`.

CSS creates an `h-dvh` stage, absolute stripes with bottom transform origins and a mix-blend text layer. On `refreshInit`, JS sets `#keyfacts-section` to `marginTop: -vision.offsetHeight`, creating the seamless overlap into the next scene.

### G. Key Facts

Technique: responsive split architecture—desktop CSS 3D card fan, mobile pinned horizontal deck—plus rolling counters and logo crossfades.

Desktop (`min-width: 768px`):

- CSS parent: `perspective: 1400px`, `transform-style: preserve-3d`; cards use backface hiding.
- JS initial state: `autoAlpha: 0`, `rotateX: -92`, transform origin center top.
- Timeline trigger section, `start: "top center"`, `end: "top top"`, `scrub: 2`.
- Cards animate to `rotateX: 0`, `autoAlpha: 1`, `duration: 2.65`, `stagger: { each: .6, from: "start" }`, `ease: none`.

Mobile:

- Section is pinned with `start: "top top"`, `end: "bottom top"`, `pin: true`, `anticipatePin: 1`, `scrub: 2`.
- JS translates the horizontal list far enough to center the final card and reveals cards at normalized steps with `duration: .15`, `power2.out`.

Counters start through IntersectionObserver at threshold `.5`. Digit reels animate `y` by measured digit height using `power3.inOut`; different cards use `1.55s` or `1.85s`, with `0.1s` per-digit delay. Award logos run an infinite crossfade: outgoing/incoming `1.2s power1.inOut`, then `+=2s`. Team videos play on hover and reset on leave. Partner logos are static on desktop and reuse the marquee on mobile.

### H. Work to Services connected journey

Technique: a single large desktop pin with manual progress regions, a different mobile pin, horizontal work cards, an image sequence, video/audio, cloned-character particles, 3D service cards, DrawSVG and a stripe handoff.

Outer scroll allocation:

- Desktop Work trigger: `start: "top top"`, `end: "+=1350%"`, `pin: true`, `anticipatePin: 1`.
- Mobile Work is normal flow; Services is pulled up with `marginTop: -100vh` and pinned `start: "top top"`, `end: "+=800%"`, `pin: true`, `anticipatePin: 1`.
- The desktop 1350% budget is conceptually `200 + 150 + 800 + 200`; mobile connected budget is `200 + 60 + 600 + 200 = 1060%`, with Work and Services split structurally.

Work phase:

- Desktop progress first translates the work track from x 0 to `-(scrollWidth - viewportWidth)`.
- Card inner panels start around `y: 550` and ease upward based on their viewport position.
- Vertical lines reveal `scaleY: 0 -> 1`, `duration: 1.2`, `ease: power2.out`, delayed `.1 * index`.
- Card content timeline defaults to `power3.out`: title `autoAlpha` in `0.7s sine`, subtitle `0.6s sine` at the same position, CTA `0.4s` at `<50%`.
- On mobile transforms are cleared and cards remain readable in flow.

Services phase:

- A 371-frame WebP image sequence (`frame_0001` onward) is preloaded in idle batches of 20. Frame index follows mapped scroll with smoothing `.12`.
- A screen-blended video is rotated `180deg`, fades toward opacity `.5` over the early progress range around `.04–.12`, and only plays while active. Thunder audio follows the scene and fades near the end.
- The main copy crossfades per character with opacity/blur.
- During approximately progress `.35–.53`, characters from four service words are measured, cloned into fixed particles and animated with a manually driven paused GSAP timeline (`duration: 1`, `ease: none`). A few hero characters scale around `6–10x` toward center; the rest scatter outward.
- Six service cards then use paused GSAP keyframe timelines driven by scroll. Desktop animates left/right pairs, `duration: .45` per pair starting at `0/.2/.4`; mobile uses one card at a time, `duration: .3`, offsets `.12`.
- SVG strokes use DrawSVG `0 -> 100%`, `duration: 1.5`, `ease: none`, `stagger: .04` once a card reaches center.
- CSS provides `perspective: 93.75rem`, preserve-3D/backdrop-blur cards, fixed particle positioning and layered video/image surfaces. JS measures geometry and drives all progress.
- Exit to Testimonials: five stripes animate `scaleY` with the same reverse-stagger `.3` pattern. Testimonials receives `marginTop: -100dvh` so it is already underneath the wipe.

### I. Testimonials

Technique: normal-flow reveal primitives plus a Swiper fade carousel. There is no section-level pin or scrubbed ScrollTrigger.

- Swiper `effect: "fade"`, `fadeEffect.crossFade: true`.
- `speed: 600ms`.
- Autoplay `delay: 5000ms`, `disableOnInteraction: false`, `pauseOnMouseEnter: true`.
- `loop: true`; navigation uses `.js-testimonials-prev` and `.js-testimonials-next`.
- Company selector opacity is CSS `500ms`; portrait/action blocks use CSS `300ms` transitions.
- Heading and separator reuse shared reveal components. The gradient/min-height/overflow stage is CSS.
- Opening a video modal dispatches `trionn-modal:open`, which stops Lenis; close restarts it.

### J. Dribbble orbit gallery and footer handoff

Technique: Three.js custom shader geometry arranged on a double helix, a long pinned scene, a separate scrubbed title track, manual WebGL progress smoothing and a five-stripe footer reveal.

Title track:

- trigger section, `start: "top center"`;
- dynamic end `+= sectionScrollDistance * geometryFactor + innerHeight/2`;
- `scrub: .6`;
- top word moves `x: +100vw`, bottom word `x: -100vw`, `ease: none`.

Main scene:

- Three.js renderer is alpha-enabled at pixel ratio `2`.
- Responsive FOV: mobile `58`, tablet `54`, desktop `52`; camera z `28/24/22`.
- Nine texture planes run across three rows on mobile and two on desktop, deformed with a custom subdivided plane shader.
- ScrollTrigger: `start: "top top"`, dynamic `end: +=4.5 viewport-heights` mobile / `+=6.5 viewport-heights` desktop, `pin: true`, `anticipatePin: 1`. It has no `scrub` property; `onUpdate` feeds a custom renderer.
- The orbit receives the first `3/(3+1.5)` mobile or `5/(5+1.5)` desktop share. Scroll progress is time-smoothed with `1 - 0.001^dt`.
- Raycasting targets hover; plane scale approaches `1.12`. Line geometry uses `setDrawRange` as the path progresses.
- The final progress share animates five dark stripes to reveal the Footer. Footer is pre-positioned with `marginTop: -100dvh`.

CSS makes the canvas/title/stripe layers absolute and stacked; JS owns geometry, shader uniforms, camera, raycaster and scroll-to-orbit mapping.

### K. Footer

Technique: normal-flow footer, raw WebGL 1 smoke shader, shared text reveals and interactive SVG wave lines. No ScrollTrigger and no pin.

- Footer CSS: `min-height: 100dvh`, dark background, overflow hidden. It visually enters through the Dribbble stripe wipe and negative margin.
- Full-screen fragment shader uses three-octave FBM noise. Uniforms represent time, smoke motion, audio/pulse energy and resolution.
- CanvasManager runs only near view; IntersectionObserver uses `rootMargin: 160px`. ResizeObserver updates the buffer.
- Vertical smoke drift is approximately `(4 + 16*audioLevel + 2.8*pulse) * dt`; pulse decays by `.9^(60*dt)`.
- Web Audio analyser `fftSize: 64`; audio envelope attack/release `.3/.03`, pulse envelope `.25/.04`.
- Each interactive SVG line is rebuilt every frame from 26 segments over 2.2 cycles. Hover uses amplitude `7`, speed `18`; click uses amplitude `11`, speed `26`.
- GSAP returns amplitude and speed to zero: hover `duration: .9`, click `1.1`, both `ease: expo.out`.
- Invisible widened SVG clones provide pointer hit areas; notes are synthesized with Web Audio.

## 4. Architecture and initialization order

The effective layout order is:

1. sound provider;
2. transition provider/state machine;
3. first-visit preloader;
4. route-transition overlay;
5. header/menu;
6. content-visibility gate;
7. root Lenis provider and GSAP ticker bridge;
8. page: Hero symbol -> Hero/About -> Vision -> Key Facts -> Work/Services -> Testimonials -> Dribbble;
9. global Footer.

Heavy sections are dynamically imported. The main HTML contains server-rendered text/links while WebGL and scroll choreography hydrate later. A small event vocabulary coordinates otherwise independent modules: loader complete, transition start/belts closed/complete, intro text finished, modal open/close and visibility recovery.

Repeated architectural patterns:

- A pinned viewport is treated as a deterministic progress domain, then split into named phases.
- ScrollTrigger often controls only pinning/progress; paused GSAP timelines, frame sequences and WebGL scenes are advanced manually from `progress`.
- Visual handoffs use five or ten `scaleY` stripes plus `-100dvh` overlap, so the next section is already underneath.
- CSS establishes geometry, perspective, stacking, blend modes and readable initial layout; JS supplies temporal transforms and measured geometry.
- One global Lenis/GSAP clock coordinates DOM and canvas work. Canvas callbacks are culled using IntersectionObserver.
- Desktop and mobile are separate choreography branches, not only responsive CSS.
- Shared text/line/marquee primitives make the site feel consistent while heavyweight scenes remain isolated.

## 5. Recommended original Next.js decomposition

Reimplement the techniques as independent components rather than porting bundles:

- `MotionRuntime`: Lenis root, GSAP ticker bridge, refresh events and scroll locks.
- `TransitionShell`: explicit transition state machine and accessible local-link interception.
- `SplitReveal`, `EnterFade`, `ScrollLine`, `RafMarquee`: reusable primitives with reduced-motion fallbacks.
- `HeroScene`: dynamically imported Three canvas with context-loss handling, DPR budget and static poster fallback.
- `PinnedStripeSection` and `PinnedFactsDeck`: section-local ScrollTriggers with `gsap.context()` cleanup.
- `WorkServicesJourney`: one documented progress map, image loader, service-card sub-timelines and mobile branch.
- `TestimonialCarousel`: Swiper-only; no dependency on the global scroll scene.
- `OrbitGallery`: separate renderer and lifecycle from Hero.
- `FooterField`: isolated WebGL shader with a CSS/static fallback and audio opt-in.

Preserve the ideas—progress segmentation, coordinated clocks, layered handoffs and lifecycle culling—but write new component structure, markup, motion curves, shaders, assets and visual design.
