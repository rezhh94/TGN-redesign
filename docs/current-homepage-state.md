# Current homepage state

Last reconciled: 2026-07-19.

This file describes what is mounted now. Historical experiments are not design
authority. The latest implementation baseline is commit `af6f28f`; always
inspect the live worktree and preserve unrelated edits.

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
- Trionn is construction calibration only. No reference font, code, asset,
  palette, shader or exact formula is imported.
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
up through one full-viewport stage; there is no cube, WebGL scene, top divider,
bottom index or separate progress hairline. Compact, touch, reduced-motion and
no-JS present the same five complete panels in normal flow. `servicesScene`
owns the 01→02 bridge and service transitions within one section-scoped
lifecycle; CSS remains the readable source of truth.

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
- Lenis is the sole desktop smooth-scroll transport and forwards its scroll
  event to `ScrollTrigger.update`.
- Touch, through 768px and reduced motion use native scrolling.
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
