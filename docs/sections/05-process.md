# 05 / Prosess — active contract

Last reconciled: 2026-07-22.

- Files: `ProcessLayers.tsx`, `process-layers.css` and `processScene` in
  `HomeMotion.tsx`.
- Retning, Bygg and Live remain the server-rendered content model and semantic
  order. The established `/kontakt?ref=prosess` action remains a real link.
- The mounted construction is a Tigon rebuild of Trionn's first-party
  `HowWork` module `24498` from
  `outputs/qa-trionn-animation-audit/mirror/trionn.com/_next/static/chunks/0w-26ub2icye_.js`.
  No bundle, runtime, font, logo, copy, media or identity asset is imported.
- The section uses the verified dark, zero-stripe `/about` variant. Its header
  is a 12-column composition with `05 / Prosess` in the first two columns and
  `Fra retning til live.` in the remaining ten. The phase ledger begins in
  column three and uses open typography, lines and plus marks rather than
  cards.
- From `768px`, all three phases remain visible in one row. The entrance
  trigger is `top 25%` to `top -125%` (`150vh`): phase labels begin at
  `.5 * index`; moving plus and line use `.4`, step `.2`, title `.2` at `+.1`,
  body `.25` at `+.15`, and the next fixed plus appears at `+.4`.
- The desktop stage pins from `top top` for `+=250%`, with `pinSpacing: false`,
  `anticipatePin: 1` and `scrub: .6`. There is no stripe wipe.
- Through `767px`, each phase is a vertical 3/9 grid row. The source-led
  entrance runs `top center` to `top top`; phase groups begin at `.3 * index`
  and use `.4` text reveals plus `.5` divider draws. The stage pins for
  `+=150%` with `pinSpacing: false` and scrubbed progress.
- Mobile viewports at or below `699px` high keep complete ordinary flow and do
  not pin. Reduced motion and no-JS also show the complete ordinary-flow
  composition immediately.
- `processScene` is the sole owner of Process motion and the Process→System
  overlap. Because Tigon's following System composition is one viewport rather
  than Trionn's longer following `/about` scene, the owner extends the dark
  System canvas by the active pin distance and offsets its inner panel by that
  same `250svh` or `150svh`. The outer canvas is transparent during the overlap;
  the real `100svh` System panel is the foreground cover. A scrubbed single-
  sheet clip reveal runs from `.55` to `1` of the pin timeline, so System takes
  ownership continuously and reversibly instead of through a binary
  `onLeave`/`onEnterBack` layer switch. It lands fully open exactly when Process
  releases, and Footer remains one viewport below. Its GSAP context removes
  only its own styles, attributes and ScrollTriggers during cleanup.
