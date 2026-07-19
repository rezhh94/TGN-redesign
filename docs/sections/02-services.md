# 02 / Tjenester — flat selector contract

Last reconciled: 2026-07-19.

Status: implemented in the current uncommitted worktree.

## Composition

- The connected Intro→Tjenester selection axis remains.
- The desktop service scene restores the composition recorded in the approved
  screenshot: one flat centred image, title/action on the left, explanation on
  the right and a five-service orientation line below.
- There is no cube, 3D transform or dual-wave lane.
- The original `SERVICE 02` and `02 / 05` orientation, large service title,
  `UTFORSK TJENESTEN` action and four slash-separated capability labels are
  restored to match the recorded composition.
- All titles, descriptions, capabilities and established hrefs are
  server-rendered.

## Motion

- `servicesScene` owns the Intro→Tjenester bridge and the service selector.
- CSS owns the sticky `100svh` stage. Five semantic `100svh` chapters provide
  scroll distance; ScrollTrigger measures their centres and selects one active
  service without JavaScript pinning.
- The active local image crossfades and settles from `scale: 1.02` to `1`.
  Side content enters by 22px according to scroll direction.
- One global counter, bottom orientation line and progress hairline reflect the
  same active chapter. Cleanup stays section-scoped.

## Responsive and fallback

- Above 900px with hover/fine pointer: full sticky selector.
- Through 900px or on coarse/touch input: five complete normal-flow chapters,
  each with its own local image, title, explanation, capability rows and link.
- Through 640px: chapters collapse to one column with a wide image.
- Reduced motion and no-JS use the same complete normal-flow reading order.
- Keyboard focus has a visible focus ring and activates the corresponding
  service on desktop. Touch never depends on hover.

## Boundaries

- Header, Hero, Effekt, Arbeid, Prosess, System and Footer are untouched.
- Metadata, schema, sitemap, robots, canonical, URLs, slugs, NAP and link
  destinations are unchanged.
- No external or legacy code, font or asset is imported. No visible orange is
  introduced.
