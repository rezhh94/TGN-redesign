# 02 / Tjenester — pinned panel contract

Last reconciled: 2026-07-20.

Status: implemented in the current worktree.

## Composition

- Intro leads into a restrained Tjenester prelude before the service journey.
- Every service is one complete semantic panel: local Tigon image on the left,
  counter, title, concise explanation, four concrete capability rows and the
  established service link on the right.
- The desktop construction uses five full-viewport 50/50 panels layered in one
  pinned stage. The useful reference principle is the split between a visual
  field and a calm information field, not Trionn's identity or artwork.
- Every information field stays on Tigon's pure-white `--tigon-paper`. Only the left
  media field alternates `--tigon-paper` and `--surface-base`, keeping the copy
  surface continuous while still marking each new service.
- The information hierarchy consumes the global `type-paper-heading`,
  `type-paper-copy`, `type-paper-label` and `type-paper-row` roles. All four use
  Switzer Regular as the user-approved paper voice; JUST Sans remains the
  site-wide editorial font. The shared scale and neutral paper colours are
  owned by `tokens.css` and `typography.css`, never repeated as section-local
  values. The responsive sizes are computed from verified local-source
  breakpoints and remain isolated from the document root.
- The former cube, perspective transforms, corner brackets, duplicate labels,
  bottom index, progress hairline and top divider are absent.
- A quiet vertical seam and the capability rules are the only structural lines.
- All titles, descriptions, capabilities and links are server-rendered.

## Motion

- `servicesScene` owns the Intro→Tjenester bridge and the service sequence.
- The dark prelude is a separate `100svh` handoff stage. Five full-width bands
  are rigged in CSS and animated bottom-up with `scaleY: 0→1`, bottom origin,
  reverse offsets over `0.3`, a `0.1` hold and `ease: none`.
- The handoff uses `start: "top top"`, `end: "+=200%"` on non-touch and
  `"+=150%"` on touch, `scrub: 0.6`, pins the prelude with spacing and uses
  `anticipatePin: 1`. The first service deck is overlapped by `-100svh`, so it
  is already beneath the final paper bands.
- The pinned service-panel enhancement applies from 768px with no
  reduced-motion preference, including touch tablets.
- The service `ScrollTrigger` uses `start: "top top"`, an end of
  `1.2 * innerHeight * 5`, `scrub: 0.6`, `pin: stage`, `pinSpacing: true`,
  `anticipatePin: 0.5` and `invalidateOnRefresh: true`.
- The sequence opens with a `0.5` hold. Each incoming panel travels from
  `yPercent: 100` to `0` for `1`; the previous information field travels to
  `yPercent: -100` over the same interval. Capability rules draw with `0.08`
  stagger, followed by a `0.5` reading hold. There is no content fade or image
  scale, and every scroll-driven transform uses `ease: none`.
- The final service-to-Effekt handoff uses five dark shutter bands. They close
  the final paper service into one complete dark viewport before Effekt starts.
  The Effekt title is not inside those bands and never follows their movement.
  Phones use the same five-band shutter over the final viewport.
- CSS owns the complete readable layout. JavaScript only creates the desktop
  stack, two sequential pins and transitions after successful hydration.
- Lenis remains the sole scroll transport and forwards scroll updates
  to ScrollTrigger through `HomeMotion`. Its effective desktop calibration is
  `lerp: 0.105`, `duration: 1.05`, cubic-out easing, `wheelMultiplier: 0.6`
  on Apple platforms and `0.85` elsewhere. GSAP ticker lag smoothing is
  `500, 33`. Touch uses the same lerp/duration, `wheelMultiplier: 0.6`,
  `touchMultiplier: 1.2` and `syncTouch: true`.

## Responsive and fallback

- From 768px: bounded five-stop pinned sequence, including touch tablets.
- Below 768px: five complete panels in normal flow after the pinned handoff;
  media stacks above the information field, only the media surface alternates
  and links never depend on hover.
- Through 640px: spacing and image ratio tighten for a single-column phone
  composition.
- Reduced motion receives the complete normal-flow layout without pins or
  animated handoff bands.
- No-JS receives the same five complete panels because no important content is
  hidden in the server-rendered markup or base CSS.
- During the pinned scene only the active service link is tabbable. Focus has a
  visible two-pixel ring; cleanup restores ordinary link behaviour.
- The service deck supplies one stable light theme to the floating header.

## Reference and performance boundary

- Local Trionn HTML, CSS and route-specific first-party JS were used only to
  verify the five-band handoff, full-panel pinning, media-only alternation and
  responsive split.
- The separate Trionn orbit/WebGL intro, media, shaders, code, fonts, wording
  and identity-bearing combinations are not used.
- Tigon uses five existing responsive raster assets; the first is eager and the
  remaining four are lazy-loaded. There is no canvas or WebGL lifecycle.

## Boundaries

- Header, Hero, Effekt, Arbeid, Prosess, System and Footer are untouched.
- Metadata, schema, sitemap, robots, canonical, URLs, slugs, NAP and link
  destinations are unchanged.
- No Trionn or legacy CSS, JavaScript, font or asset is imported. The only
  external type resource is user-approved Switzer Regular from Fontshare's
  official web-font endpoint. No visible orange is introduced.
