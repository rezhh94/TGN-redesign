# Current homepage state

Last reconciled: 2026-07-21.

This file describes what is mounted now. Historical experiments are not design
authority. The committed Tjenester→Effekt recovery point is `b9b4b5a`, built on the
responsive Tjenester baseline at `293c552`; always inspect the live worktree
and preserve unrelated edits.

## Mounted order

1. Header
2. Hero
3. Intro / Tilnærming
4. Service prelude
5. Tjenester
6. Effekt
7. Arbeid
8. Prosess
9. System
10. Footer

The body from Intro onward sits on solid semantic surfaces. There is no mounted
page-wide decorative background system or related media lifecycle.

## Design system

- `design.md` explains the canonical system and reference boundary.
- `src/styles/tokens.css` owns font roles, the exact source-matched Trionn type
  metrics and responsive type basis, 4px spacing,
  12/6-column grid, surfaces, lines, buttons, motion and layer bands.
- Familjen Grotesk is the source-matched display/title/menu face; PP Neue
  Montreal is the legal Neue Haas substitute for reading copy; Martian Mono
  Standard Light is the action/technical face; PP Editorial New Ultralight is
  reserved for explicit serif accents.
- Familjen Grotesk and Martian Mono use exact official open-source WOFF2 files.
  PP Neue Montreal and PP Editorial New use the user's licensed Pangram files.
  No font binary comes from the Trionn mirror. See
  `docs/trionn-typography-source-ledger.md`.
- Light information fields use the shared Familjen/PP Neue Montreal
  `type-paper-*`
  hierarchy and `--paper-text-*` contrast roles; sections do not define their
  own families, sizes or greys. Paper
  sizes use the source-verified responsive basis documented in `design.md`.
- Trionn is construction calibration. Verified first-party public modules and
  exact construction values may be adapted when the local evidence identifies
  their ownership. No reference-only font binary, media, logo, content, whole bundle,
  co-located third-party runtime or identity-bearing combination is imported.
- Visible orange is prohibited.
- The active identity assets come from the user's final Tigon export. Header
  uses the official horizontal lockup, Footer the official wordmark, and all
  mark masks plus favicon metadata use the final geometric Tigon mark. Their
  normalized web copies live under `public/brand/`; obsolete inline logo
  geometry is not mounted.

## Section state

### Intro

`ApproachStatementBridge` is server-rendered in normal flow. It uses an
asymmetric 12-column statement, lower support split, real Tjenester action and
line/plus axis. `IntroServicesJourney` then mounts `ServicePrelude` before
Tjenester. The prelude is a second normal-flow dark chapter with three
Tigon system cards: `Tre fag. Én helhet.`, `Fem leveranser. Ett ansvar.` and
`Fire utfall. Samme mål.` Desktop ports Trionn Key Facts' verified
`perspective: 1400px`, `rotateX: -92`, `scrub: 2`, `duration: 2.65` and `.6`
stagger reveal for exactly three cards. Card geometry, padding, radius and
inside type sizes match Trionn Key Facts' responsive source values exactly.
Below 768px the facts stage ports Trionn's separate
pinned horizontal branch: `top top` to `bottom top`, `anticipatePin: 1`,
`scrub: 2`, with the final card calculated into the viewport centre. The local
pin excludes the following marquee and shutter so their sequence cannot overlap
the cards.

The prelude closes with `TYDELIGHET / KVALITET / SYNLIGHET / EFFEKT` in a
source-ported Trionn marquee. It preserves the measured clone count, `.8`
ticker step, zero gap, `.5` pause lerp and `64px` IntersectionObserver wake
margin, then pauses halfway through the exit. The existing Osmo shutter owner
generates 16/10/6 paper rows across desktop/tablet/mobile and covers the dark
chapter from `bottom bottom` to `bottom top`, revealing the real Tjenester
surface beneath. `introFillScene` still enhances the original statement with
character colour progress and small one-shot entries. Reduced motion/no-JS
show all prelude content statically and generate neither marquee clones nor
shutter rows.

### Tjenester

`WhatWeBuild` contains all five service links and local Tigon images. Desktop
uses the verified Trionn Selected Work construction: an opening half-panel,
five half-width service cards and one final all-services half-panel travel in a
single horizontal `100dvh` track. Images use the exact `670 / 460` ratio,
`0.5rem` radius and source spacing. The gradient, paper text hierarchy and
Familjen/PP Neue/Martian roles are centralized in the shared design tokens.
Cards retain the real service destinations and are not presented as projects
or past work. `servicesScene` preserves the source `550px` card entry curve,
content thresholds, line drawing and horizontal movement rate. The paper layer
then moves one viewport left to reveal a visual copy of the real Effekt opening
behind the final axis. Mobile deliberately ports the same horizontal motor and
effects with Trionn's `calc(100vw - 3rem)` visible phone card width plus the
source spacing of `5rem` before and after each regular card. The final action
uses its separate source `py-40` rhythm as a `10rem` horizontal entry before a
centred `viewport - 3rem` content field. Its additional lead is part of the
paper panel rather than a transparent margin, so Effekt is not exposed before
the final paper field owns the viewport. Reduced-motion and no-JS show the
complete vertical flow without pins or hidden text.

### Effekt

`WhatWeImprove` follows Tjenester directly. `Effekt som kan måles.` and its
supporting sentence start sharp to match the exposed underlay, then
remain in the same fixed centre position while four semantic result cards —
FUNNET, FORSTÅTT, VALGT and MÅLT — pass around or over the title. The title
blurs out only at the scene exit. The result scene itself stays typographic;
it contains no outgoing image aperture or duplicated Arbeid preview. From
901px, the cards use Trionn's source-verified continuous paired
paths instead of a Tigon-authored landing: left cards travel bottom-to-top,
right cards top-to-bottom, and each bends toward its side lane only during the
first half. At 901–1511px cards are `42%` of viewport width; from 1512px they
are `28%`; height is `32%` of viewport height. Each pair uses 13 samples,
duration `.45` and pair offset `.2`. Below 768px, the title remains centred
while the cards move over it through one 24px-gutter vertical lane: width
`viewport - 48px`, height `55%` of
card width, 13 samples, duration `.3`, offsets `.12` and edge fades at
`.15/.85`. At every width the final Tjenester paper plane moves left and reveals
the matching Effekt opening; its accessible heading remains owned by the real
Effect section and does not move with the outgoing layer. The real Effekt scene
starts in the same sharp state when the Tjenester pin releases, preventing a
visible opacity/blur jump. The phone card sequence reaches the unchanged `.66`
card threshold in a five-viewport scene. The title remains sharp before the
unchanged `.56` card threshold and remains present through the card phase. Both use
smoothing factor `.08`. Widths 768–900px use a two-column normal-flow layout. Reduced
motion and no-JS expose the complete normal-flow composition. No Trionn media,
graphics, reference font binaries or identity assets are mounted.

### Arbeid

`WorkProof` is capability-led, not portfolio-led. Six direct accessible links
remain mounted. The 03→04 handoff is typographic: as Arbeid enters, the two
parts of `Dette kan Tigon lage.` travel in opposite directions, meet as one
readable statement and cross away. The title traversal remains a separate
scrubbed trigger. At the pin boundary, the real Webapp surface opens from one
central slit; there is no duplicate bridge image. From 901px the focus stage is
pinned for six viewport lengths with `top top`, `anticipatePin: 1` and
`scrub: .6`. One scroll-controlled Orbit Tiles owner replaces the former
static panel replacement: the six complete link surfaces travel through a
shared flat orbit, interpolate scale, blur and brightness by depth, update one
active index, and counter-rotate their contents so the landed surface stays
readable. Below 768px, the section uses a separate six-viewport mobile Orbit.
The title crosses the viewport in opposite directions, then the same six
Tigon links rotate through one horizontal depth path and land one by one in a
fixed image focus above a fixed copy field. The active item is derived from
its actual angular distance to that focus; copy appears only inside the
landing threshold. ScrollTrigger owns pinning and target progress but has no
`scrub`; Trionn's verified time-based `1 - .001^dt` interpolation supplies the
settling. The final App landing holds before Prosess, with no Helix or closing
grid. Widths 768–900px retain the normal-flow film. Reduced motion and no-JS
expose all six complete chapters without pinning. No autonomous loop, WebGL,
Three.js, TSL, dynamic cursor, portfolio wall or reference asset is mounted.

### Prosess and System

Prosess currently presents Retning, Bygg and Live. System currently provides
the quiet conclusion into Footer. Both keep complete static content without JS.

## Motion and lifecycle

- `servicePreludeScene` is one lazy local owner for the three-card desktop
  reveal, the separate mobile pin/translation branch, measured marquee clones,
  ticker, wake observer, resize measurement and exit pause.
  `initShutterScrollTransition` remains the separate existing Osmo owner for
  generated shutter rows and breakpoint cleanup.
- `HomeMotion` initializes scoped scene owners and cleanup. Effekt uses one
  owner per active responsive branch; desktop and phone branches each use one
  pinned ScrollTrigger, while 768–900px stays in normal flow.
- Arbeid owns a separate desktop title traversal and one `work-focus-scene`;
  that trigger is also the only Orbit owner. Scroll progress drives the orbit,
  so no animation clock runs while the scene is outside the viewport. Keyboard
  focus moves the same trigger to the focused capability's settled frame.
  Below 768px, `work-focus-mobile-orbit` is the only mobile owner. Its ticker
  is added once, removed on cleanup and only settles while the scene is active
  or has remaining interpolation. Keyboard focus uses a CSS-visible focused
  surface and copy while preserving DOM order. The 04→05 handoff starts from
  the measured mobile trigger end; at 768–900px it continues from the ordinary
  document boundary.
- Initial hash navigation is corrected once after the shared
  `ScrollTrigger.refresh()`, so anchors such as `#arbeid` use the final measured
  document position after pinned spacing has been created.
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
