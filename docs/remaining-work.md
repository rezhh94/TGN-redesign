# Tigon — remaining work

Last reconciled: 2026-07-22.

## Current review gate

- Review the uncommitted Arbeid mobile pilot at 390px before opening the Header
  package. Its source register is `docs/trionn-mobile-source-ledger.md`.
- Review the source-ported horizontal Tjenester track against `design.md`.
  Confirm the reference desktop tween tail at both pin boundaries and direct
  `duration: 0` touch tracking on mobile.
- Review the new Paperfold Effekt sequence at 390, 768, 1024 and 1440px:
  continuous light Tjenester handoff, readable title reveal, four folding result
  cards, desktop heading pin, reverse scroll and the direct light-to-dark Arbeid
  boundary.
- Review the new Intro→Tjenester prelude at 390, 768, 1024 and 1440px: three
  source-sized desktop cards, source-ported pinned mobile card row, marquee cadence,
  16/10/6-row shutter and the clean release into the existing service track.
- Visually confirm the source-matched typography and button roles at 390, 768,
  1024 and 1440px; the code values are recorded in
  `docs/trionn-typography-source-ledger.md`.
- Include Header/Hero and Footer in the redesign review; none is visually
  protected.
- Review the implemented Prosess→System closing sequence at 390, 768, 1024 and
  1440px: ledger readability, reverse scroll, the late scrubbed single-sheet
  cover, the zero-stripe overlap, the short-height mobile fallback and the
  unchanged Footer entry.
- Run TypeScript, production build and `git diff --check`.

## Recommended sequence

1. Approve or adjust the completed six-landing Arbeid mobile Orbit without
   changing its verified desktop branch.
2. Redesign Header and Hero as separate Trionn-calibrated packages.
3. Review and refine the implemented Intro and horizontal Tjenester journey.
4. Review the connected Tjenester→Effekt→Arbeid transition, including the
   leftward paper exit, continuous sharp Effekt opening and source-matched card
   traversal.
5. Review the implemented capability-led Arbeid title handoff, single-surface
   opening, scroll-controlled six-link desktop orbit and separate six-landing
   mobile Orbit; do not reinterpret it as portfolio proof.
6. Review and refine the implemented Prosess→System sequence, then decide
   separately whether the unchanged Footer needs a later redesign.
7. Perform the full integration, performance and accessibility matrix.

## Open design work

- The stopped Effekt video/object trial is not mounted. Its processed local
  derivatives were removed from the repository before review.
- The former Effekt material image remains available as an unused local asset,
  but the mounted scene is typographic and surface-led only.
- Remaining section-local spacing values should migrate to semantic roles only
  when that section is actively reviewed. Mounted font sizes, leading and
  tracking now resolve through the source-matched shared type roles.

## Final integration gate

- One smooth-scroll transport and no duplicate ScrollTriggers.
- Complete no-JS/reduced-motion/touch paths.
- Keyboard-visible controls and real hrefs.
- No reference fonts/media/identity, unverified bundle/runtime code, visible
  orange or portfolio framing in 04 / Arbeid.
- Explicit user approval before commit or push.
