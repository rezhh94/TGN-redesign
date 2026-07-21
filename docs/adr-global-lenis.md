# ADR — homepage scroll transport

Last reconciled: 2026-07-19.

## Decision

**The homepage uses global Lenis as its scroll transport.** It is initialized
once in `HomeMotion` with `lerp: 0.095`, `smoothWheel: true`,
`wheelMultiplier: 1`, and is coupled to GSAP via
`lenis.on("scroll", ScrollTrigger.update)`.

Lenis is automatically disabled on touch devices, on viewports ≤ 768px and
under `prefers-reduced-motion` (see `src/lib/motion.ts`), so mobile and
reduced-motion users get native scroll.

This supersedes the earlier direction that described native scroll as the
canonical future; that cleanup was never merged and the decision has been
reversed. No document in this repo should claim native scroll as the desktop
baseline.

## Reason

The homepage's scroll-driven scenes (services cube, tension bridge, archive
exits) read Lenis-smoothed scroll. One shared smoothing layer gives every
scene the same base feel and lets scene owners keep their own damping short.

## Consequences

- **One damping layer per movement.** Lenis is the first layer; per-scene
  quickTo/scrub values are calibrated short on top of it (see the Animation
  Charter, rule 2). Do not stack a second slow lerp on top of Lenis.
- Scrub values remain owned per section.
- Desktop verification must scroll through Lenis (dev builds expose
  `window.__lenis`); mobile/touch/reduced-motion verification uses native
  scroll.

## Rollback

Remove the `initLenis` call in `HomeMotion`, the ScrollTrigger coupling and
`src/lib/motion.ts`, then re-tune per-scene damping (they are calibrated with
Lenis present).
