# Current homepage state

Last reconciled: 2026-07-20.

This file describes what is mounted now. Historical experiments are not design
authority. The latest committed Tjenester baseline is `5545f80`; always inspect
the live worktree and preserve unrelated edits.

## Mounted order

1. Header
2. Hero
3. Intro / Tilnærming
4. Tjenester
5. Outcome tension handoff
6. Effekt
7. Arbeid
8. Prosess
9. System
10. Footer

The body from Intro onward sits on solid semantic surfaces. There is no mounted
page-wide decorative background system or related media lifecycle.

## Design system

- `design.md` explains the canonical system and reference boundary.
- `src/styles/tokens.css` owns font roles, optical type scales, 4px spacing,
  12/6-column grid, surfaces, lines, buttons, motion and layer bands.
- TGS Perfect is display; JUST Sans is editorial; Caleb Mono is meta/actions.
- Light information fields use the shared Switzer Regular `type-paper-*`
  hierarchy and `--paper-text-*` contrast roles; JUST Sans remains the global
  editorial voice and sections do not define their own sizes or greys. Paper
  sizes use the source-verified responsive basis documented in `design.md`.
- Trionn is construction calibration only. No reference font, code, asset,
  shader or surface palette is imported; the approved paper size and neutral
  contrast calibration is isolated in semantic tokens documented in
  `design.md`.
- Visible orange is prohibited.

## Section state

### Intro

`ApproachStatementBridge` is server-rendered in normal flow. It uses an
asymmetric 12-column statement, lower support split, real Tjenester action and
line/plus axis. `IntroServicesJourney` now carries it through a vertical
selection axis into Tjenester. `introFillScene` enhances the statement with
character colour progress and small one-shot entries. Reduced motion/no-JS
expose the final composition.

### Tjenester

`WhatWeBuild` contains all five service links and local Tigon images. Desktop
uses a bounded pinned sequence of five complete 50/50 panels: a landscape image
on the left and a calm information field with counter, title, short explanation,
four capability rows and the existing service link on the right. Panels move
up through one full-viewport stage. The information half remains pure white
throughout; only the left media field alternates white and dark. A separate
five-band pinned handoff covers the dark prelude and reveals the first service
already beneath it, which hides the change between the two scroll domains.
There is no cube, WebGL scene, top divider, bottom index or progress hairline.
Phones below 768px keep the five service panels in normal flow after a shorter
touch-calibrated handoff; 768px and wider use the pinned panel sequence.
Reduced-motion and no-JS omit the bands and present all five panels directly.
`servicesScene` owns the complete 01→02 bridge, handoff and panel sequence; CSS
remains the readable source of truth.

### Outcome tension

`OutcomeTensionBridge` keeps three complete statements in HTML and enhances
them as one scoped transition.

### Effekt

`WhatWeImprove` owns the result chain, explanations, measurement signals and
local proof media. `effectScene` handles marker and media reveals only.

### Arbeid

`WorkProof` is capability-led, not portfolio-led. Six direct accessible links
remain mounted. Desktop uses the sticky archive; compact/touch/no-JS use normal
flow. The dynamic cursor is limited to those links.

### Prosess and System

Prosess currently presents Retning, Bygg and Live. System currently provides
the quiet conclusion into Footer. Both keep complete static content without JS.

## Motion and lifecycle

- `HomeMotion` initializes scoped scene owners and cleanup.
- Lenis is the sole smooth-scroll transport and forwards its scroll event to
  `ScrollTrigger.update`. Desktop uses `lerp .105`, Apple wheel `.6`, other
  wheel `.85`, touch uses wheel `.6` and touch multiplier `1.2`, and both use
  duration `1.05` with GSAP ticker lag smoothing `500/33`.
- Reduced motion uses native scrolling. Mobile service content remains normal
  flow below 768px even though the shared scroll transport stays coordinated.
- Critical content is never hidden behind JavaScript.

## Redesign status

- Every visual region, including Header/Hero and Footer, is open to redesign.
- Mounted structure is current-state evidence, not a preservation target.
- SEO metadata, schema, sitemap, robots, canonical, routes and slugs remain
  outside visual work unless explicitly reopened.
- Factual NAP and verified href destinations remain correct even if their
  placement and presentation change.
- 04 permanently stays capability-led and never becomes a list of websites
  Tigon has built; its layout, component, interaction and motion are not
  protected.

## Verification gate

Run TypeScript, production build and `git diff --check`. Visually validate 390,
768, 1024 and 1440px, reduced motion, keyboard focus, reverse scroll and deep
loading before accepting the current worktree.
