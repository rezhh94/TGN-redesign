# 02 / Tjenester — dual-wave contract

Last reconciled: 2026-07-19.

Status: reopened by explicit user direction after the approved compact mosaic
checkpoint. The rollback point remains `b5d1a10`.

## Composition

- Files: `WhatWeBuild.tsx`, `what-we-build.css`, `servicesScene`.
- `Hva vi bygger` and its complete explanation form a concise normal-flow
  prelude. They leave before the service scroll scene takes over; they are not
  retained as a hero-like sticky center stack.
- The complete heading statement is:
  `Fem fagområder. Én sammenhengende leveranse fra første valg til en løsning
  som kan finnes, forstås og måles.`
- Above 800 px, five service rows travel around a sticky CSS-3D cube axis. The
  left stream carries service number, title and action; the right stream carries
  the description and complete capability list.
- Through 800 px, horizontal wave travel resolves to zero. Each service becomes
  one complete full-width chapter below the sticky cube, with title,
  description, capabilities and action in the same readable column.
- The two sides of a row belong to one real service link. They are a visual
  split, never duplicate interactive or accessible content.
- The section uses a solid semantic surface. It owns no decorative background
  media, canvas, texture or lighting state.
- A local CSS-3D cube uses the five existing Tigon service images on its front,
  right, back, left and top faces; the bottom reuses the first local image so
  the entrance tumble never exposes an empty face or adds another request.
- The cube begins at an adaptive scale equal to one CSS pixel but is optically
  hidden at the exact pre-scroll rest. It fades in across the first three
  percent while its cubic depth curve and linear X/Y/Z rotation remain live
  from zero. It completes a `-360° / -540° / -42°` tumble and settles on the
  front-on `Nettsider` face.
- Perspective stays at exactly five times the responsive face size with a
  centred perspective origin. The inner cube remains at `scale(1)` throughout
  every turn.
- Above 1200 px, faint section-local focus registers extend from the active
  title/detail panels toward the cube. Above 1500 px the two lanes move one
  grid column inward. These are content-layer guides, not a new backdrop.
- Typography stays restrained: JUST Sans for title/body and Caleb Mono for
  numbering, capabilities and actions. No giant full-screen service titles.
- Through 800 px, the outgoing chapter fades before it enters the sticky cube
  field; the incoming chapter appears only after that field has cleared.

## Reference extraction

The motion reference is Valentin Descombes/Codrops
`codrops-tutorial-text-animation`, audited at commit
`90dfeb2eec89dd6879cabf2e76f4e7096e515a8a`.

- `DualWaveAnimation.calculateRanges`, `setInitialPositions`,
  `calculateWavePosition`, opposing column multipliers, centre-focus selection,
  quick setters, resize recalculation and `destroy` cleanup are adapted.
- The reference's imperative `src` swap and image preloader are not copied.
  Five local images are server-rendered on five cube faces, and the same
  closest-to-center calculation rotates the active face forward. This adds no
  second trigger or media lifecycle.
- The additional user-supplied `N > Six Faces / Walking The Cow V2` reference
  is MIT licensed by Luis Alberto Martinez Riancho. Tigon uses its generic
  six-face CSS-3D and 90-degree stop principles, not its UI, copy, assets,
  scroll capture or source files.
- Reference `ScrollSmoother` and `normalizeScroll` are deliberately omitted.
  Tjenester owns no global scroll transport.
- Reference CSS is not imported. Its two-column relationship is rebuilt with
  Tigon tokens, protected-centre geometry and this section's real content.
- Preserve the MIT attribution if a substantial source translation remains in
  the final implementation.

## Motion ownership

- `servicesScene` is the only JavaScript owner for service motion.
- Desktop uses one section-scoped ScrollTrigger. A sine function moves the two
  streams in opposing horizontal directions while natural document scroll
  supplies vertical movement.
- The service row closest to viewport centre owns the focus stop. At rest only
  that service is visible and pointer-active; the next service appears when
  scroll transfers focus through the interval. Each cube face has a readable
  front-on rest before and after a deliberately extended 90-degree turn. The
  centred turn window is `64%` desktop, `68%` compact and `72%` mobile so both
  adjoining image faces remain visible during rotation; no scale pulse is applied.
- The first four faces advance between Y-axis stops. On wide desktop, the first
  three turns add temporary X pitch arcs of `-58° / +48° / -58°`, exposing top,
  bottom and side planes across the journey, plus only `+7° / -6° / +7°` Z roll.
  Compact/mobile scale those extra angles down. Every arc returns to zero at its
  stop; no full spin or scale pulse is added. The fifth top face keeps the
  verified combined X/Y terminal orientation required to remain camerafacing
  and upright, with only a temporary `-5°` roll during its turn.
- Inactive rows remain server-rendered real links, but are visually isolated
  during the enhanced scene. Keyboard focus reveals its complete row before
  interaction; no-JS and reduced-motion keep the full ledger visible.
- Range values are derived from measured lane and panel widths and recalculated
  on real viewport changes. Animation writes only transform/opacity state.
- No master pin, captured scrolling, duplicate trigger per service, global
  kill, independent image trigger or second smooth-scroll engine is allowed.
- Cleanup kills the trigger/tweens, removes listeners and restores all inline
  transforms and focus attributes.

## Compact, touch and fallback

- Compact/touch through 800 px is a separately authored choreography, not the
  desktop columns squeezed into a narrow viewport. The sticky cube remains in
  the upper field while one complete service chapter occupies the lower field.
- The cube-level `01 / 05` counter is removed at every width. The visible
  `SERVICE 01` metadata already provides orientation.
- Service text may wrap, but no established description, capability or href is
  removed. Touch has a visible action and does not depend on hover.
- Reduced motion and no-JS use an ordinary single-column service ledger after
  the centred heading and retain the first cube face as a static visual. No
  important content starts hidden in CSS.
- Keyboard focus reveals and outlines the complete service link without moving
  focus or trapping the user.
- The section must have no horizontal document overflow at 1440, 1024, 900,
  800, 768 or 390 px.

## Handoffs and preservation

- Preserve the approved Intro content and its Flip/scramble/collision owner.
  Only the final 01→02 spacing/state handoff may be calibrated.
- Preserve all five service labels, descriptions, complete capability lists
  and established hrefs.
- Preserve the clean release into `OutcomeTensionBridge`; do not restyle 03 or
  04 to support this section.
- Header/Hero, SEO, URLs, footer, global background ownership and visible-orange
  prohibition remain unchanged.

## Approval gate

The implementation is not complete until desktop and compact motion, reverse
scroll, refresh-in-section, resize/orientation, touch, keyboard, reduced motion,
no-JS, five hrefs, horizontal overflow, TypeScript and production build have
been checked directly.
