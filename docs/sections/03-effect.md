# 03 / Effekt — active contract

Last reconciled: 2026-07-20. Connected recovery checkpoint: `b9b4b5a`.

- Files: `WhatWeImprove.tsx`, `what-we-improve.css` and `effectCardsScene` in
  `HomeMotion.tsx`. `OutcomeTensionBridge` is not mounted.
- `Effekt som kan måles.` and its supporting sentence are the opening phase.
  They stay fixed in the centre, resolve from a soft blur, hold sharp for
  reading and remain as the central anchor while all four cards pass; there is
  no vertical title translation, mask or scale animation. Only opacity and
  blur animate on the text, and it blurs out only at the scene exit.
  Funnet, Forstått, Valgt and Målt remain four real HTML cards in semantic
  order with explanations and measurement signals.
- No foreground or background image is mounted in the section. The former local
  `/effect/tigon-effect-anchor.png` remains an unused repository asset and is
  not deleted as part of this reversible visual trial.
- From 901px, one bounded pinned timeline starts after the outgoing Tjenester
  shutter has completed. It uses Trionn's actual continuous pair paths,
  not a separate settle animation: left cards travel bottom-to-top and right
  cards top-to-bottom. At 901–1511px width is `round(.42 * viewportWidth)`;
  from 1512px it is `round(.28 * viewportWidth)`; height is
  `round(.32 * viewportHeight)`. Each pair uses 13 samples, `.45` duration and
  `.2 * pairIndex` offset. The horizontal bend follows `sin(progress * PI)`
  through the first half and then holds the 40px or 10%-viewport side lane.
- Cards continue through the viewport and fade at the `.15/.85` edges. The
  central title remains behind them and blurs away at the handoff to the next section.
- The wide scene ends at `4.6 * innerHeight`, or `3.9 * innerHeight` for touch,
  overlaps the completed shutter by one viewport so its centre is fixed as the
  handoff ends, and begins the title's opacity-and-blur sequence at progress
  `0`. It then
  completes the title reveal before mapping the
  unchanged card phase directly from `.56–1` with reference smoothing `.08`.
  Entry and card traversal share one scene owner and ScrollTrigger.
- Below 768px, one pinned phone scene keeps the central title fixed while all
  cards cross it in a single lane. Card geometry is a 24px
  gutter, width `viewport - 48px`, height `round(.55 * width)`, 13 keyframes,
  vertical travel from `viewportHeight` to `-cardHeight`, duration `.3`, start
  offset `.12 * index`, opacity ramps at `.15/.85` and smoothing factor `.08`.
  Its five-viewport scene starts at the mobile shutter's natural end boundary
  with no overlap and reserves `0–.66` for the fixed blur reveal; phone
  cards therefore begin at `.66`. With four Tigon cards the reference's card
  timing formula is preserved without inventing two absent cards.
- Widths 768–900px use a two-column normal-flow layout. At every width, reduced
  motion and no-JS use the complete normal-flow composition and omit pinning.
- No Trionn image, video, frame sequence, audio, shader, DrawSVG, asset, font or
  code is used. The scene consumes Tigon type, surface, line and spacing roles.
- Layout, interaction and motion remain open to later redesign.
