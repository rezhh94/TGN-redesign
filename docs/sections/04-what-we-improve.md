# 03 / Effekt — aktiv stablet kort-kontrakt

> Brand role, 2026-07-10: Effekt owns the intellectual result system `FUNNET. FORSTÅTT. VALGT. MÅLT.` defined in `docs/tigon-brand-platform.md`. This is how the page explains and earns the promise `BYGD FOR Å BLI VALGT`; it is not decorative slogan repetition.

Last reconciled with the implementation: 2026-07-10.

## Active direction

The restored implementation comes from historical revision `25b423a`.

- Left: a sticky reading anchor with the Effect statement, explanation and one active measurement detail.
- Right: four large outcome cards that stack with CSS sticky positioning.
- Outcomes: Funnet, Forstått, Valgt and Målt.
- Each card contains its outcome, explanation, measurement signal and a visual surface.
- Previous card headers remain visible as the next card stacks above them.

## Motion

- The stack works without JavaScript.
- GSAP only detects the front card and synchronises its active state with the left measurement detail.
- Reduced motion and no-JS retain the full two-column document and stacking behavior.
- No decorative signal rail, SplitText scatter or imported MadeWithGSAP files.

## Must preserve

- Immediate readability of all four outcomes.
- Real HTML for outcome and supporting copy.
- Clear left anchor versus right stack.
- Mobile and reduced-motion readability.
- No visible orange.

## Active files

- `src/components/WhatWeImprove.tsx`
- `src/styles/what-we-improve.css`
- `src/components/motion/HomeMotion.tsx`
