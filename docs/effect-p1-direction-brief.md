# 03 / Effekt — P1 Direction Brief

Status: `HISTORICAL CHECKPOINT — LAYOUT DIRECTION RETAINED, ENTRY AND MOTION LATER SUPERSEDED`
Date: 2026-07-13
Mode: read-only baseline and art-direction decision; no product implementation

Current-use note, 2026-07-15: this file preserves the P1 review evidence. The active entry now comes directly from Tjenester through the pixel transition, and active motion is documented in `docs/sections/03-effect.md`.

## Verified baseline

The current section was rendered from the restored homepage with reduced motion at:

- desktop: 1440 × 1000 px viewport; section height 1845 px
- mobile: 390 × 844 px viewport; section height 2763 px
- entry: `Overlevering → Effekt`
- exit: `Effekt → Arbeid`

Capture evidence:

- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p1-desktop-effect.png`
- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p1-desktop-entry-seam.png`
- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p1-desktop-exit-seam.png`
- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p1-mobile-effect.png`
- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p1-mobile-entry-seam.png`
- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p1-mobile-exit-seam.png`

## Exact problem

The section is clear and visually controlled, but four equally weighted cells make Tigon's core result system read as a well-made content matrix rather than the intellectual climax of the page. The large section title and four similarly large outcome titles compete for primacy, while the repeated image-copy-metadata rhythm makes mobile feel mechanical across 2763 px. The dark-to-mauve entry and mauve-to-paper exit already provide strong chapter breaks; the problem is the internal composition, not either transition.

## Preserve

- the mauve near-monochrome field and its hard contrast with both neighbours
- the copy `Effekt som kan måles.` and the existing introduction
- all four outcomes, in the order `FUNNET / FORSTÅTT / VALGT / MÅLT`
- each outcome's measurement signal, explanation and discipline metadata
- server-rendered visibility of every outcome; no active-card state
- the restrained technical microtype as a supporting voice
- the current clean entry from Overlevering and exit to Arbeid
- mobile as a deliberate reading order, not a hidden or swipe-only experience
- current placeholders only as temporary content; no invented or sourced assets in this pass

## Reference transfer

Primary principle — **Lama Lama:** use asymmetry and compositional courage to give one chapter its own authored reading rhythm. Transfer the principle, not its playful styling, cursor, textures or layouts.

Supporting principle — **Nothin':** keep the interface near-monochrome and use negative space as structure, leaving future real proof assets to carry their own visual weight. Do not import its 3D language or video dependency.

## Tigon concept sentence

**Effekt gjør selve resultatsystemet til heroen: `FUNNET / FORSTÅTT / VALGT / MÅLT` bygges som én asymmetrisk typografisk komposisjon over hele mauve-flaten, og hvert ord får sin måling og forklaring festet direkte til seg — uten kort, rail eller skjult tilstand.**

## Static prototype contract for P2

The prototype may:

- demote the generic section-intro scale so the four result words become the primary composition
- replace the equal 2×2 cell logic with one continuous, asymmetric editorial field
- vary width, offset, whitespace and information density to clarify reading order
- preserve semantic DOM order and all critical content
- resolve desktop and mobile as related but independently composed layouts

Only these product files may be changed:

- `src/components/WhatWeImprove.tsx`
- `src/styles/what-we-improve.css`

## Explicit do-not-build list

- no four-card, bento, dashboard or equal-row replacement
- no selection rail, timeline, progress line, corner marks, crosshair or focus-box UI
- no literal colour coding for design, technology or visibility
- no glass, gradient, 3D, WebGL, particles, cursor treatment or faux-tech overlay
- no fake metrics, fake analytics or invented proof
- no new assets and no redesign of the temporary asset content
- no pinning, sticky sequence, carousel, modal or hidden active result
- no GSAP, new motion mechanism or edits to `HomeMotion.tsx`
- no changes to Overlevering, Arbeid, Header, Hero, global tokens or shared styles
- no extra page length unless the static comparison proves a reading benefit

## G1 decision

Approve or reject the concept sentence and prototype contract only. Approval opens `P2`, where one static browser prototype is implemented in the two allowed files and returned with identical desktop/mobile before-and-after captures; it does not approve motion or any other section.

Final outcome: the asymmetric editorial field was implemented, refined and accepted through G6 without opening neighbouring sections.
