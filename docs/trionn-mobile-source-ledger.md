# Trionn mobile source ledger

Status: execution authority for the mobile-parity pass.

Verified: 2026-07-21 against the public homepage at
`https://trionn.com/` and the local 2026-07-19 evidence snapshot.

## Verification identity

- Active public build ID: `hiulZVSrv2NpDnHoHj34N`.
- The active homepage still resolves the lazy Dribbble owner as module
  `99060`; its first-party implementation is module `40169`.
- The fetched live orbit chunk and the mirrored chunk
  `0.924d2y-5~87.js` both hash to
  `4eb98f3013a2d1c228bedfbbab834ed4e4b79e949302b3aef40fd6b3630e7c2a`.
- Public HTML, build identity and bundle equality were rechecked before this
  ledger was written. Values below come from code, not visual estimation.

## Evidence boundary

Use only the Trionn-authored modules named in
`outputs/qa-trionn-animation-audit/pretty-js/README.md`:

| Evidence | First-party owner | What it proves |
| --- | --- | --- |
| `pretty-js/trionn-homepage.first-party.pretty.js` | `68152`, `72959`, `67198` | Hero copy, About, Vision and responsive Key Facts |
| `pretty-js/trionn-homepage.symbol.first-party.pretty.js` | `54377`, `53101` | Hero scene, mobile camera and renderer budget |
| `evidence/shared-layout.mixed.pretty.js` | `68479`, `1401`, `23319`, `4173` | Header, Footer and Lenis bridge |
| `evidence/shared-ui.mixed.pretty.js` | `42936`, `91092`, `84997`, `38846`, `11846` | Shared reveal primitives |
| `evidence/line-and-plugins.mixed.pretty.js` | `70221` | Line/plus motion |
| `evidence/work-services.mixed.pretty.js` | `7617`, `28236` | Work/Services responsive choreography |
| `evidence/testimonials.mixed.pretty.js` | component after about line 5304 | Carousel configuration |
| `evidence/dribbble.mixed.pretty.js` | `40169`, `99060` | Mobile orbit and Footer handoff |

Third-party library modules co-located in mixed bundles are excluded. No
Trionn font, logo, text, image, video, audio, colour signature or other
identity asset may enter Tigon. We rebuild verified construction against
Tigon markup, routes, assets and tokens; deployed bundles are evidence only.

## Global mobile runtime

These values are shared infrastructure, not section styling:

| Property | Verified value |
| --- | --- |
| Lenis clock | `autoRaf: false`; GSAP ticker calls `lenis.raf(time * 1000)` |
| Duration/easing | `1.05`; `1 - (1 - t)^3` |
| Lerp | `.105` |
| Wheel | `smoothWheel: true`; touch and Apple multiplier `.6`, other desktop `.85` |
| Touch | `smoothTouch: false`; `syncTouch: true`; `touchMultiplier: 1.2` |
| GSAP ticker | `lagSmoothing(500, 33)` |
| Structural breakpoints | `440`, `640`, `768`, `1024` px |
| Mobile container | `1.5rem` inline gutter; six-column/single-column composition |
| Viewport stages | `100dvh`; `svh` only where stable visible height matters |

Tigon acceptance: keep one Lenis owner and one GSAP clock, never add a
section-local smooth-scroll engine or a second global ticker.

## Shared motion grammar

| Primitive | Verified values | Tigon use |
| --- | --- | --- |
| Blur reveal | `blur(12px)`, `autoAlpha: 0`, start `top 90%`, unit duration `.8`, stagger `.05`, `power2.out` | ADAPT for short headings only |
| Scroll colour reveal | start `top 80%`, end `bottom center`, scrub, stagger `.03` | ADAPT for Intro statement |
| Enter fade | IntersectionObserver, `y: 20`, duration `.8`, `power2.out` | COPY construction |
| Line/plus | width `0→100%`, rotation `0→360`, `top bottom→top center`, scrub | ADAPT using Tigon line tokens |
| Stripe handoff | five reverse-staggered `scaleY` bands, each duration `.3`, then `.1` hold | ADAPT only at existing chapter handoffs |

All important text and links remain visible in server HTML. Reduced motion
shows the final state immediately.

## Section register

### Header

Source: `shared-layout.mixed.pretty.js`, module `68479`.

Mobile is a structural branch below `768px`:

- full-viewport menu starts at `x: 100%` and moves to `0%` over `.8s`
  with `expo.inOut`;
- menu items start at `y: 20`, opacity `0`; duration `.8`, stagger `.1`,
  start position `.4`, `power2.out`;
- divider width `0→100%`, duration `.8`, `expo.out`;
- bottom items start at `y: 20`, duration `.5`, stagger `.05`;
- icon stroke changes use `.3s` and offsets `0/.05/.2/.25`;
- close/reverse runs at `timeScale(1.75)`;
- menu closes after more than `50px` scroll and on resize/transition events;
- body scroll is locked only while the mobile menu is open.

Decision: COPY timing and lifecycle; ADAPT layout, labels and surfaces to
Tigon. Preserve focus management, Escape handling and a 44px target.

### Hero

Source: first-party modules `68152`, `54377`, `53101`.

- pinned scene: `start: top top`, touch `end: +=300%`, desktop
  `+=400%`, `pinSpacing: false`, `anticipatePin: 1`;
- renderer DPR cap: mobile `1`, desktop `1.5`;
- responsive camera: FOV `36–42`, z `6–9.35`, scene scale `.74–1`;
- scroll/explosion smoothing `.06`; pointer amplitude `.22`;
- auto-rotation `.0042` per frame, reduced-motion reference `.0015`;
- press/hold threshold `500ms`, rise `.02` and decay `.025` per frame;
- renderer suspends at trigger progress `>= .8` and resumes on enter-back;
- hero text blur uses `12px`; primary character stagger `.08`;
- scroll hint fades over scroll `0→100`.

Decision: ADAPT construction. Hero canvas must be dynamically initialized,
use Tigon geometry/material, handle context loss and expose a static poster.
On constrained devices or reduced motion, do not run the expensive scene.

### Intro / Tilnærming

Source: About in module `68152` plus shared primitives.

- normal flow; no mobile pin;
- statement: `top 80%→bottom center`, scrub, character stagger `.03`;
- support copy: enter delay `.3`, duration `.8`, `power2.out`;
- line/plus uses the shared scrub recipe.

Decision: COPY motion ownership, retain current Tigon composition and wording.

### Tjenester → Effekt

Source: `work-services.mixed.pretty.js`, modules `7617` and `28236`.

- mobile Work content remains readable in flow with transforms cleared;
- connected mobile Services budget is `200 + 60 + 600 + 200 = 1060%`;
- Services pin itself is `start: top top`, `end: +=800%`,
  `anticipatePin: 1`;
- frame mapping smoothing `.12`;
- mobile cards move one at a time, duration `.3`, offsets `.12`;
- title characters use measured opacity/blur transitions;
- exit uses five reverse-staggered stripes; next surface sits at
  `marginTop: -100dvh`.

Decision: current Tigon Tjenester and Effekt already use the verified
structural split and mobile card timings. First action is regression QA, not a
rewrite. Only discrepancies found in measured runs may be patched.

### Arbeid

Source: `dribbble.mixed.pretty.js`, modules `40169` and `99060`.

- breakpoint: mobile below `768px`;
- renderer: alpha, DPR `2` in reference; Tigon must cap by performance tier;
- mobile FOV `58`, camera z `28`;
- nine surfaces; mobile grid uses two columns and three rows;
- viewport fill factors: inline `.88`, block `.82`;
- mobile gaps: inline `.18`, block `.22`;
- pinned duration: `4.5 × viewport height`;
- orbit share: `3 / (3 + 1.5)`; Footer handoff share:
  `1.5 / (3 + 1.5)`;
- trigger: `start: top top`, `pin: true`, `anticipatePin: 1`;
- there is deliberately no ScrollTrigger `scrub`; `onUpdate` supplies target
  progress to the renderer;
- time-based smoothing: `1 - .001^dt`; the secondary settle uses
  `1 - .01^dt`;
- title track has its own `scrub: .6`; upper/lower words move
  `+100vw/-100vw`;
- Footer is already underneath at `marginTop: -100dvh`.

Decision after the Tigon pilot: COPY the single-owner progress architecture,
no-scrub target updates, time-based smoothing, pin lifecycle and opposing
title travel. REJECT the Helix path and two-by-three closing grid for Arbeid:
they do not connect six capability descriptions to six image landings. ADAPT
the renderer to a six-stop Tigon Orbit whose active item is calculated from
actual distance to one fixed focus. Desktop Orbit at `76de5a2` remains the
regression baseline. Mobile stays capability-led, keyboard reachable and
touch actionable. A canvas enhancement may never replace the six semantic
links.

### Prosess

Closest construction references: Vision module `72959` and mobile Key Facts
module `67198`.

- Vision: `top top`, touch `+=150%`, pin, pin spacing,
  `anticipatePin: 1`, `scrub: .6`;
- Key Facts mobile: `top top→bottom top`, pin, `anticipatePin: 1`,
  `scrub: 2`; horizontal list centers the final card;
- card reveal duration `.15`, `power2.out`.

Decision: ADAPT the deterministic mobile progress model, not Trionn card
styling. Keep Tigon's three process stages and semantic order.

### System → Footer

Source: Dribbble handoff and Footer modules `40169`, `23319`, `1401`.

- five-stripe handoff occupies the final `1.5` share of the orbit progress;
- Footer enters from `-100dvh` overlap and remains normal flow;
- Footer minimum height `100dvh`;
- heavy canvas runs only near view with IntersectionObserver
  `rootMargin: 160px`;
- ResizeObserver updates its buffer;
- reference shader uses three-octave FBM; this is construction evidence only;
- interactive line: 26 segments, 2.2 cycles; hover amplitude/speed `7/18`,
  click `11/26`; settles over `.9/1.1s` with `expo.out`.

Decision: ADAPT the reveal and lifecycle. Do not copy the smoke shader or
audio. Tigon receives a static CSS fallback before any optional enhancement.

## Explicit rejects

- first-visit preloader and route-transition interception in this pass;
- Trionn media, font files, identity, copy, palette and sound;
- whole deployed bundles or embedded GSAP/Three/Swiper implementations;
- ScrollSmoother: it is bundled with the orbit but never instantiated;
- autoplay carousel logic for capability links;
- canvas-only content, hidden server text or pointer-only actions;
- mobile DPR `2` as an unconditional rule on low-power devices.

## Execution gates

Every package stops uncommitted after:

1. TypeScript and production build;
2. `git diff --check`;
3. console and runtime error check;
4. forward and reverse scroll;
5. touch, keyboard and reduced-motion checks;
6. mobile widths `320`, `375`, `390`, `430`, `640`, `767`, plus
   boundary `768` and landscape `844×390`;
7. desktop regression at `1024`, `1440` and `2048`;
8. exact changed-file review and proof that SEO/schema/routes/NAP, Header/Hero
   and other sections stayed untouched unless that package explicitly owns
   them.

The first implementation package is Arbeid mobile only. Header/Hero and the
remaining sections cannot be changed until that pilot passes its gate.
