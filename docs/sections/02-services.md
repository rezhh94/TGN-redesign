# 02 / Tjenester — pinned panel contract

Last reconciled: 2026-07-19.

Status: implemented in the current uncommitted worktree.

## Composition

- Intro leads into a restrained Tjenester prelude before the service journey.
- Every service is one complete semantic panel: local Tigon image on the left,
  counter, title, concise explanation, four concrete capability rows and the
  established service link on the right.
- The desktop construction uses five full-viewport 50/50 panels layered in one
  pinned stage. The useful reference principle is the split between a visual
  field and a calm information field, not Trionn's identity or artwork.
- Every information field stays on Tigon's warm `--tigon-paper`. Only the left
  media field alternates `--tigon-paper` and `--surface-base`, keeping the copy
  surface continuous while still marking each new service.
- The former cube, perspective transforms, corner brackets, duplicate labels,
  bottom index, progress hairline and top divider are absent.
- A quiet vertical seam and the capability rules are the only structural lines.
- All titles, descriptions, capabilities and links are server-rendered.

## Motion

- `servicesScene` owns the Intro→Tjenester bridge and the service sequence.
- The dark prelude is a separate `100svh` handoff stage. Five full-width bands
  are rigged in CSS and animated bottom-up with `scaleY: 0→1`, bottom origin,
  reverse offsets over `0.3`, a `0.1` hold and `ease: none`.
- The handoff uses `start: "top top"`, `end: "+=200%"`, `scrub: 0.6`, pins the
  prelude with spacing and uses `anticipatePin: 1`. The first service deck is
  overlapped by `-100svh`, so it is already beneath the final paper bands.
- Desktop enhancement applies only above 900px with hover, fine pointer and no
  reduced-motion preference.
- The service `ScrollTrigger` uses `start: "top top"`, an end of
  `1.2 * innerHeight * 5`, `scrub: 0.6`, `pin: stage`, `pinSpacing: true`,
  `anticipatePin: 0.5` and `invalidateOnRefresh: true`.
- The sequence opens with a `0.5` hold. Each incoming panel travels from
  `yPercent: 100` to `0` for `1`; the previous information field travels to
  `yPercent: -100` over the same interval. Capability rules draw with `0.08`
  stagger, followed by a `0.5` reading hold. There is no content fade or image
  scale, and every scroll-driven transform uses `ease: none`.
- CSS owns the complete readable layout. JavaScript only creates the desktop
  stack, two sequential pins and transitions after successful hydration.
- Lenis remains the sole desktop scroll transport and already forwards scroll
  updates to ScrollTrigger through `HomeMotion`.

## Responsive and fallback

- Above 900px with hover/fine pointer: bounded five-stop pinned sequence.
- Through 900px or on coarse/touch input: five complete panels in normal flow;
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
- No external or legacy CSS, JavaScript, font or asset is imported. No visible
  orange is introduced.
