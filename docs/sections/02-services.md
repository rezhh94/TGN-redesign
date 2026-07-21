# 02 / Tjenester — Selected Work track contract

Last reconciled: 2026-07-21.

Status: implemented in the current worktree.

## Composition

- `WhatWeBuild` keeps the existing five service destinations and Tigon-owned
  images, but uses the verified construction from Trionn's public first-party
  Selected Work module.
- Desktop is one `100dvh` horizontal track. The opening title, each service and
  the final all-services action occupy exactly `50%` of the viewport width.
- Service images use the source ratio `670 / 460`, `0.5rem` radius and `5rem`
  horizontal panel inset. Cards use `5rem` vertical padding, tightening to
  `4rem` from 1024px.
- Each service has one image, H3, concise explanation and the established
  service link. This is a service catalogue, not a portfolio or case archive.
- The surface is the verified `#D2D2D2 → #FFFFFF` vertical gradient. Values
  live in shared `--paper-track-*` tokens; text and hairlines consume the
  existing `--paper-text-*` roles.
- Familjen Grotesk Medium owns the opening title. Familjen Grotesk Regular owns
  service headings, PP Neue Montreal owns descriptions, and Martian Mono
  Standard Light owns the source-ported word-shift actions.
- All titles, descriptions, images and links are server-rendered.

## Motion

- `servicesScene` pins the section root at every motion-capable width and moves the track from
  `x: 0` to `-(scrollWidth - viewportWidth)`.
- Trionn's movement rate is preserved: `1.5` viewport widths over `2` viewport
  heights, or `0.75px` horizontal travel per vertical scroll pixel. Tigon's
  five services make the horizontal phase longer without making it faster.
- Every card inner starts at `y: 550`. The source position curve resolves it to
  zero as the card enters. Content reveals at normalized position `< 1.05`;
  separators draw at `< 1` over `1.2s`, `power2.out`, delayed by `0.1 * index`.
- H3, description and action use the source sequence: `.7s`, `.6s` and `.4s`
  with sine/power easing and overlapping starts.
- After the last panel settles, the entire paper layer moves one viewport left
  over `150%` scroll. The final axis draws and its 13px plus rotates while a
  non-semantic visual copy of the real dark Effekt opening is revealed behind
  it. The real Effekt scene starts in the identical sharp state when the pin
  releases, so there is no blank or blurred replacement frame.
- The section root itself is pinned with spacing. This is required so the pin
  duration participates in document flow and does not let Effekt initialize
  over the service track.

## Responsive and fallback

- Below 768px Tigon deliberately runs the same horizontal x-axis motor and
  effect thresholds requested for desktop. The opening is full-width. Visible
  service cards retain Trionn's verified `calc(100vw - 3rem)` phone width, while
  their horizontal panel pitch remaps the source `py-20` flow spacing to `5rem`
  before and `5rem` after each card.
- The final action is a separate full-viewport panel. Its `8.5rem` lead plus
  `1.5rem` inner gutter remaps Trionn's mobile `py-40` to exactly `10rem` before
  the centred `viewport - 3rem` content field without clipping the handoff.
  The `8.5rem` lead expands the paper panel itself; it is not a transparent
  flex margin that can reveal Effekt between the last service and final action.
- Mobile keeps the `670 / 460` images, vertical separator drawing, `550px` card
  orbit, visible actions and the same leftward Effekt reveal.
- Reduced motion and no-JS use the same complete vertical document flow with
  all content visible and no transformed or pinned layers.
- Links remain real anchors with visible focus treatment; no destination
  depends on pointer hover or JavaScript.

## Boundaries

- Section order is now Intro → ServicePrelude → Tjenester → Effekt.
- The incoming paper shutter belongs to `ServicePrelude`; the existing
  horizontal Tjenester motor still begins on the real `WhatWeBuild` root and
  retains its own complete measurement and cleanup.
- Header and Hero are unchanged. Effekt content is unchanged; its motion start
  is now sharp so it matches the visual opening exposed beneath Tjenester.
- Metadata, schema, sitemap, robots, canonical, URLs, slugs, NAP and service
  destinations are unchanged.
- No Trionn media, logo, wording, font binary, deployed bundle, third-party
  runtime or legacy stylesheet is imported. No visible orange is introduced.
