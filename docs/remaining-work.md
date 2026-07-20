# Tigon — remaining work

Last reconciled: 2026-07-20.

## Current review gate

- Review the connected Intro and Tjenester journey against `design.md`.
- Confirm the shared typography and button roles at 390, 768, 1024 and 1440px.
- Include Header/Hero and Footer in the redesign review; none is visually
  protected.
- Run TypeScript, production build and `git diff --check`.

## Recommended sequence

1. Redesign Header and Hero as the opening Trionn-calibrated system.
2. Review and refine the implemented Intro and Tjenester connected journey.
3. Review the connected Tjenester→Effekt→Arbeid transition, including the
   shutter, opening-copy fade, central image and source-matched desktop/mobile
   card traversal.
4. Redesign capability-led Arbeid without treating the mounted archive as safe.
5. Redesign Prosess, System and Footer as one closing sequence.
6. Perform the full integration, performance and accessibility matrix.

## Open design work

- Original Tigon background art direction is intentionally postponed. It has
  no mounted owner or approved asset recipe.
- The current Effekt material image is reviewable and may be swapped for a
  different Tigon-owned mock-up without changing the motion contract.
- Remaining section-local raw font, spacing and button values should migrate to
  semantic roles only when that section is actively reviewed.

## Final integration gate

- One smooth-scroll transport and no duplicate ScrollTriggers.
- Complete no-JS/reduced-motion/touch paths.
- Keyboard-visible controls and real hrefs.
- No external reference code/assets, visible orange or portfolio framing in
  04 / Arbeid.
- Explicit user approval before commit or push.
