# 03 / Effekt — active contract

Last reconciled: 2026-07-22.

## Mounted direction

- `WhatWeImprove.tsx`, `what-we-improve.css` and `effectCardsScene` in
  `HomeMotion.tsx` implement a Tigon adaptation of the Paperfold construction
  used by Trionn's `Our values` section on `/about`.
- The heading remains `Effekt som kan måles.` Four semantic HTML cards retain
  the result chain `FUNNET`, `FORSTÅTT`, `VALGT`, `MÅLT` and their practical
  explanations.
- The section is a light editorial field. It uses no animal, image, video,
  canvas, WebGL, Three.js, particle explosion, icon drawing or decorative
  background object.
- Tjenester's final plane first reveals a complete white Effekt intro mounted
  beneath it: the label `FRA TJENESTER TIL RESULTAT`, the large integration
  stack `DESIGN`, `TEKNOLOGI`, `SYNLIGHET`, `ÉN HELHET`, and the closing line
  `ULIKE FAG. ÉN SAMLET RETNING.` This follows the verified Trionn construction
  in which the next full-viewport typography scene sits at `z-1` beneath the
  outgoing Selected Work layer at `z-2`.
- After the outgoing plane has cleared, the real Paperfold section rises from
  below and covers the intro with `Effekt som kan måles.`. The intro is content,
  not an empty hold, and the real section remains the only semantic H2 owner.

## Verified Trionn source construction

The live page and local first-party evidence used the same deployed files on
2026-07-22:

- `/_next/static/chunks/0sue_k2sp00no.js` — homepage Selected Work with the
  embedded Services intro and its shared scroll progress
- `/about`
- `/_next/static/chunks/0i2v4-x9rvr_g.js` — Paperfold component, module `48605`
- `/_next/static/chunks/0sc3z3ff25230.css` — grid, spacing and type utilities
- `/_next/static/chunks/0w-26ub2icye_.js` — adjacent `How we work` construction,
  reviewed but not selected because Tigon already has a separate Prosess chapter

Retained handoff construction:

- the embedded intro is a complete viewport beneath the outgoing work layer
- intro layer `z-1`; outgoing layer `z-2`
- outgoing desktop motion is one viewport on the x-axis
- intro layout is top label, centred four-line type and bottom copy using a
  full-height flex column with `space-between`
- Trionn's source headline uses `clamp(5rem, 9.164vw, 10rem)`, tracking `-.08em`
  and line-height `.672`; Tigon deliberately relaxes this to
  `clamp(3.25rem, 7.4vw, 8rem)`, `-.045em` and `.9` so the Norwegian copy is
  spacious and readable rather than compressed

Retained Paperfold values:

- 12-column grid and `24px` column gaps
- container gutters `24px`, then `40px` from `768px`
- section padding `80px`, then `150px` from `1024px`
- heading-to-stack gap `64px`, then `80px` from `1024px`
- stack perspective `2500px` and card gap `2px`
- card padding `32px`, radius `4px`, inner gap `16px` / `24px`
- every card starts at `rotateX: -90`, top-centre origin, hidden at zero opacity
- card offsets are `.5 * index`
- fold duration `.6`, `power2.out`
- inner-content fade starts at `offset + .09`, duration `.36`, `power1.in`
- shadow starts at `offset + .18`, fades from `.08` over `.42`, `power1.out`
- scroll starts: phone `top 65%`, tablet `top 70%`, desktop `top 80%`
- scroll distances per card: phone `180px`, tablet `200px`, desktop `150px`
- from `1024px`, the heading pins without pin spacing until the section bottom
  minus header height, tagline height and twice the section bottom padding
- title reveal follows Trionn's verified BlurText defaults: `12px` blur,
  `.5` parent reveal, `.8` character reveal, `.05` random stagger,
  `power2.out`, once from `top 90%`
- supporting copy follows the verified FadeIn defaults: `y: 20`, `.8` duration,
  `.3` delay and `power2.out`

## Tigon adaptation boundaries

- Trionn's structure and motion values are rebuilt against local GSAP APIs and
  Tigon markup. No deployed bundle is imported at runtime.
- All visible copy, semantic roles, colours, typography and links are Tigon.
  Trionn fonts, content, images, video, audio, logos and identity assets are not
  used.
- The local gradient resolves through Tigon's existing paper surface tokens.
- Without JavaScript or with reduced motion, the complete heading, supporting
  copy and all four result cards remain visible in ordinary document flow.
- Layout and motion remain open to later redesign.
