# 03 / Effekt — active contract

Last reconciled: 2026-07-20. Recovery checkpoint: `91f8580`; transition and
path refinements are uncommitted.

- Files: `WhatWeImprove.tsx`, `what-we-improve.css` and `effectCardsScene` in
  `HomeMotion.tsx`. `OutcomeTensionBridge` is not mounted.
- `Effekt som kan måles.` and its supporting sentence are the opening phase.
  They fade before the central Tigon-owned image appears; the same copy is not
  repeated on the image. Funnet, Forstått, Valgt and Målt remain four real HTML
  cards in semantic order with explanations and measurement signals.
- The image source is `/effect/tigon-effect-anchor.png`, copied from the user's
  `Tigon mock ups ferdige/Industriell detalj med matte teksturer.png`. It is a
  static Tigon asset, not Trionn's stone, frame sequence or media.
- From 901px, one bounded pinned timeline reveals the dark scene after the
  five-band Tjenester shutter. It uses Trionn's actual continuous pair paths,
  not a separate settle animation: left cards travel bottom-to-top and right
  cards top-to-bottom. At 901–1511px width is `round(.42 * viewportWidth)`;
  from 1512px it is `round(.28 * viewportWidth)`; height is
  `round(.32 * viewportHeight)`. Each pair uses 13 samples, `.45` duration and
  `.2 * pairIndex` offset. The horizontal bend follows `sin(progress * PI)`
  through the first half and then holds the 40px or 10%-viewport side lane.
- Cards continue through the viewport and fade at the `.15/.85` edges. The
  central image remains for the handoff to the next section.
- The wide scene ends at `4.6 * innerHeight`, or `3.9 * innerHeight` for touch,
  and maps the card phase directly from `.56–1` with reference smoothing `.08`.
  Entry and card traversal share one scene owner and ScrollTrigger.
- Below 768px, one pinned phone scene keeps the central image fixed while all
  cards cross it in a single lane. The image element is the reference's exact
  `999 × 594px` centred mobile geometry. Card geometry is a 24px
  gutter, width `viewport - 48px`, height `round(.55 * width)`, 13 keyframes,
  vertical travel from `viewportHeight` to `-cardHeight`, duration `.3`, start
  offset `.12 * index`, opacity ramps at `.15/.85`, card-phase threshold `.56`
  and smoothing factor `.08`. With four Tigon cards the reference's timing
  formula is preserved without inventing two absent cards.
- Widths 768–900px use a two-column normal-flow layout. At every width, reduced
  motion and no-JS use the complete normal-flow composition and omit pinning.
- No Trionn image, video, frame sequence, audio, shader, DrawSVG, asset, font or
  code is used. The scene consumes one Tigon image plus Tigon type, surface,
  line and spacing roles.
- Layout, interaction and motion remain open to later redesign.
