# Tigon — remaining work

Last reconciled: 2026-07-21.

## Current review gate

- Review the uncommitted Arbeid mobile pilot at 390px before opening the Header
  package. Its source register is `docs/trionn-mobile-source-ledger.md`.
- Review the source-ported horizontal Tjenester track against `design.md`.
- Visually confirm the source-matched typography and button roles at 390, 768,
  1024 and 1440px; the code values are recorded in
  `docs/trionn-typography-source-ledger.md`.
- Include Header/Hero and Footer in the redesign review; none is visually
  protected.
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
6. Redesign Prosess, System and Footer as one closing sequence.
7. Perform the full integration, performance and accessibility matrix.

## Open design work

- Original Tigon background art direction is intentionally postponed. It has
  no mounted owner or approved asset recipe.
- The former Effekt material image remains available as an unused local asset,
  but the mounted scene is currently typographic only.
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
