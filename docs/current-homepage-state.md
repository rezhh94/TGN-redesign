# Current homepage state

Last reconciled: 2026-07-22.

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
The middle delivery card expresses `Fem leveranser. Ett ansvar.` as a
Tigon-owned `5 → 1` information graphic with a circular white statistic field;
it uses no image or unsupported customer-performance claim.
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
surface beneath. On mobile the trigger reads the section bottom after the facts
pin spacer has been measured; it does not add a second viewport offset.
`introFillScene` still enhances the original statement with
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
content thresholds, line drawing and horizontal movement rate. On desktop its
track and outgoing paper layer also retain Trionn's source-authored short GSAP
tween tail on each progress update; this damps the visible landing and release
without adding another scroll engine. Touch keeps the source's `duration: 0`
path for direct finger tracking. The paper layer then moves one viewport left
to reveal a visual copy of the real Effekt opening behind the final axis.
Mobile deliberately ports the same horizontal motor and effects with Trionn's
`calc(100vw - 3rem)` visible phone card width plus the source spacing of `5rem`
before and after each regular card. The final action
uses its separate source `py-40` rhythm as a `10rem` horizontal entry before a
centred `viewport - 3rem` content field. Its additional lead is part of the
paper panel rather than a transparent margin, so Effekt is not exposed before
the final paper field owns the viewport. Reduced-motion and no-JS show the
complete vertical flow without pins or hidden text.

### Effekt

`WhatWeImprove` follows Tjenester as a light editorial Paperfold field adapted
from Trionn `/about`'s live `Our values` component. Before it enters, the final
Tjenester plane exposes a complete white Effekt intro beneath it. The verified
Trionn layer model is retained: outgoing Selected Work at `z-2`, embedded next
scene at `z-1`. Tigon replaces Trionn's service words with the result stack
`DESIGN / TEKNOLOGI / SYNLIGHET / ÉN HELHET`, framed by `FRA TJENESTER TIL
RESULTAT` and `ULIKE FAG. ÉN SAMLET RETNING.` The four result words remain
reserved for the Paperfold cards. The real section then rises from below and
covers the intro with the only `03 / Effekt` label and the single semantic
`Effekt som kan måles.` heading.

The semantic `Effekt som kan måles.` H2 sits in a 12-column opening beside the
supporting sentence. Four complete HTML cards — FUNNET, FORSTÅTT, VALGT and
MÅLT — sit in an eight-column stack. The construction keeps Trionn's verified
24px grid gap, 24/40px gutters, 80/150px section padding, 32px card padding,
2px stack gap, 4px radius and 2500px perspective.

Each card starts at `rotateX: -90` with a top-centre origin. Cards enter at
`.5 * index`; the fold uses `.6 / power2.out`, inner content begins at `+.09`
for `.36 / power1.in`, and the `.08` fold shadow clears from `+.18` over `.42 /
power1.out`. Scroll starts at `top 65%`, `top 70%` or `top 80%` across
phone/tablet/desktop and allocates respectively `180`, `200` or `150px` per
card. From 1024px the heading pins without added spacing until the stack and
tagline have passed; its pin uses `anticipatePin: 1`, matching the reference
pin lifecycle. The title uses the verified 12px-blur character reveal;
support copy uses the verified 20px, .8-second fade.

There is no mounted animal, image, video, canvas, Three.js, particle field,
SVG icon drawing or stripe wipe. Reduced motion and no-JS expose the complete
normal-flow composition. Trionn code is rebuilt against local APIs; no Trionn
bundle, media, font, content or identity asset is imported.

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

Prosess presents Retning, Bygg and Live in an open source-led `HowWork` ledger:
12-column header and three-column line sequence on desktop, vertical 3/9 rows
on mobile. It ports the verified Trionn `/about` module `24498` timing without
its content, identity, assets, fonts, runtime bundle or stripes. System follows
with `Det du ser.`, `Det som virker.`, `Ett system.` and `Bygges sammen fra
start.` Both keep complete static content without JS.

## Motion and lifecycle

- `servicePreludeScene` is one lazy local owner for the three-card desktop
  reveal, the separate mobile pin/translation branch, measured marquee clones,
  ticker, wake observer, resize measurement and exit pause.
  `initShutterScrollTransition` remains the separate existing Osmo owner for
  generated shutter rows and breakpoint cleanup.
- `HomeMotion` initializes scoped scene owners and cleanup. Effekt uses one
  owner per active responsive branch; desktop and phone branches each use one
  pinned ScrollTrigger, while 768–900px stays in normal flow.
- `processScene` is the single Prosess→System owner. It uses the verified
  `150vh` desktop entrance and `250%` zero-stripe pin, or the separate mobile
  row entrance and `150%` pin. System is raised by `-100dvh` behind the pinned
  stage; its transparent canvas and inner offset carry the same active pin
  distance. The real dark inner panel reveals as a single scrubbed sheet from
  `.55` to `1`, replacing the former binary release-time z-index toggle. It has
  no independent reveal trigger. Mobile viewports at or below `699px` high,
  reduced motion and no-JS remain in ordinary flow.
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
- Pin attachment itself remains binary inside ScrollTrigger. Perceived softness
  is handled locally with `anticipatePin: 1`, Trionn's desktop progress-tween
  tail in Tjenester and continuous section covers at handoff boundaries; no
  second smooth-scroll runtime or global pin easing is mounted.
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
