# 03 / Effekt — active contract

Last reconciled: 2026-07-20. Current redesign is uncommitted.

- Files: `WhatWeImprove.tsx`, `what-we-improve.css` and `effectCardsScene` in
  `HomeMotion.tsx`. `OutcomeTensionBridge` is not mounted.
- `Effekt som kan måles.` is the stable central focus. Funnet, Forstått, Valgt
  and Målt remain four real HTML cards in semantic order with explanations and
  measurement signals.
- From 901px, one bounded pinned timeline moves two diagonal card pairs inward,
  then holds the complete composition. The headline does not swap or leave.
- The wide scene ends at `3.8 * innerHeight`, or `3.2 * innerHeight` for touch,
  with scrub `.55`. It owns no upstream service transition.
- Through 900px the cards use normal flow: two columns on tablet and one column
  on phone, with optional one-shot entries. Reduced motion and no-JS show the
  complete final state immediately.
- No image, video, frame sequence, audio, shader, DrawSVG, Trionn asset, font or
  code is used. The scene consumes Tigon type, surface, line and spacing roles.
- Layout, interaction and motion remain open to later redesign.
