# 01 → 02 / Service prelude — active contract

Last reconciled: 2026-07-21.

## Purpose and composition

- `ServicePrelude` sits between `ApproachStatementBridge` and `WhatWeBuild`
  inside `IntroServicesJourney`.
- It is a Tigon-owned normal-flow chapter, not a copy of Trionn's
  Vision→Key Facts→Selected Work sequence.
- All meaningful content is server-rendered. The three factual cards summarize
  Tigon's joined disciplines, five mounted delivery categories and the brand's
  canonical `FUNNET. FORSTÅTT. VALGT. MÅLT.` result system.
- The first and third cards deliberately omit numbers, eyebrows and `01 → 02`
  labels. The middle delivery card uses a Tigon-owned `5 → 1` information
  composition: a small top label, a large white circular statistic and a
  centred delivery explanation at the bottom. It communicates five mounted
  delivery categories under one responsibility without making an unsupported
  performance claim. The cards' geometry copies the Key Facts source values
  directly: mobile width `85vw`,
  `396px` maximum and `50svh` height clamped to `300–440px`; from 768px width
  `380px` and height `488px`; from 1024px width `100%` capped at `396px`;
  `24px` gap, `32px/40px` responsive padding and `8px` radius.
- Inside-card typography follows the source's `.title` and `.small` recipes:
  Familjen title at `18px/1/-0.02em` and uppercase, `1.063rem` from 1024px,
  `18px` from 1536px and `16px` from 2000px; reading copy is `20px` with
  normal leading below 1024px, `18px/28px` from 1024px and `16px/24px` from
  2000px. Tigon keeps its locally licensed font equivalents and its own
  content, surfaces and identity.
- The closing marquee uses the Tigon words Tydelighet, Kvalitet, Synlighet and
  Effekt. No Trionn wording, logo, media, partner claim or identity asset is
  mounted. No logo wall is part of this implementation.

## Verified source-port boundary

- Marquee construction comes only from first-party module `81371` in
  `outputs/qa-trionn-animation-audit/evidence/marquee-shared.mixed.pretty.js`.
  The active values match Trionn Vision's module `72959`: speed `.8`, gap `0`,
  measured group width, `ceil(container / cycle) + 2` clones, wrap at one cycle,
  pause interpolation `.5` and IntersectionObserver margin `64px 0px`.
- The marquee uses the shared source-matched marquee typography role. It does
  not import the supplied Osmo CSS Marquee, Trionn's bundled runtime or any
  reference stylesheet.
- Desktop card motion ports first-party Key Facts module `67198` values:
  `perspective: 1400px`, `rotateX: -92`, top-centred origin, `scrub: 2`,
  `duration: 2.65`, `.6` stagger and `ease: none`. The source's hard three-card
  guard now maps directly to the three Tigon cards.
- The supplied Osmo Shutter Scroll Transition already lives as the typed local
  `initShutterScrollTransition` owner in `src/lib/osmo-motion.ts`. The prelude
  uses that owner without changing its GSAP algorithm: cover mode, `.3` scrub,
  `.1` row duration, `.01` reverse stagger and responsive cleanup.

## Responsive, access and lifecycle

- From 768px the cards use the source-ported 3D reveal. Below 768px the source's
  separate Key Facts branch is ported directly: cards are `85vw` wide with a
  396px cap, 24px gap and `300px–440px` / `50svh` height; the local facts stage
  pins from `top top` to `bottom top` with `anticipatePin: 1` and `scrub: 2`,
  while the list translates until the final card is centred with the source's
  `4vw` correction. The stage boundary is the only local adaptation: it keeps
  the following marquee and shutter outside the Key Facts pin so they cannot
  cover the cards before the horizontal sequence completes.
- Shutter rows are 16 desktop, 10 tablet and 6 mobile. Local CSS lets each set
  fill one `100svh` transition field and uses the real Tjenester paper colour.
  The trigger uses the section's final measured bottom after GSAP has inserted
  the mobile facts pin spacing, so the shutter begins only after the horizontal
  deck and marquee have released.
- `servicePreludeScene` is lazy-initialized. It owns the marquee ticker,
  IntersectionObserver, ResizeObserver, pause trigger, card timeline and full
  teardown. `initShutterScrollTransition` separately owns only generated rows
  and its ScrollTrigger.
- Reduced motion generates no marquee clones, card transforms, mobile pin or
  shutter rows. Reduced motion and no-JS retain native horizontal access to all
  three cards plus one complete static word row.

## Scope boundary

- Header and Hero are unchanged.
- Existing Tjenester cards, media, hrefs, horizontal motor and Tjenester→Effekt
  handoff are unchanged.
- Metadata, schema, sitemap, robots, canonical, URLs, slugs and NAP are
  unchanged.
- No external or legacy CSS/JS, reference asset, logo wall or visible orange is
  introduced.
