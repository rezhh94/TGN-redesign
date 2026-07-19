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
- The former cube, perspective transforms, corner brackets, duplicate labels,
  bottom index, progress hairline and top divider are absent.
- A quiet vertical seam and the capability rules are the only structural lines.
- All titles, descriptions, capabilities and links are server-rendered.

## Motion

- `servicesScene` owns the Intro→Tjenester bridge and the service sequence.
- Desktop enhancement applies only above 900px with hover, fine pointer and no
  reduced-motion preference.
- The service `ScrollTrigger` uses `start: "top top"`, a measured end of
  `innerHeight * 4.75`, `scrub: 0.55`, `pin: stage`, `pinSpacing: true`,
  `anticipatePin: 0.5` and `invalidateOnRefresh: true`.
- Each incoming panel travels from `yPercent: 100` to `0`. Its image settles
  from `scale: 1.045`; its content rises 28px with `power3.out`; capability
  rules draw with `power2.out` and `0.06` stagger. The outgoing information
  field recedes slightly so the handoff reads as one continuous journey.
- CSS owns the complete readable layout. JavaScript only creates the desktop
  stack, pin and transitions after successful hydration.
- Lenis remains the sole desktop scroll transport and already forwards scroll
  updates to ScrollTrigger through `HomeMotion`.

## Responsive and fallback

- Above 900px with hover/fine pointer: bounded five-stop pinned sequence.
- Through 900px or on coarse/touch input: five complete panels in normal flow;
  images stack above the information field and links never depend on hover.
- Through 640px: spacing and image ratio tighten for a single-column phone
  composition.
- Reduced motion receives the complete normal-flow layout without a pin.
- No-JS receives the same five complete panels because no important content is
  hidden in the server-rendered markup or base CSS.
- During the pinned scene only the active service link is tabbable. Focus has a
  visible two-pixel ring; cleanup restores ordinary link behaviour.

## Reference and performance boundary

- Local Trionn HTML, CSS and route-specific first-party JS were used only to
  verify its full-panel pinning and responsive split.
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
