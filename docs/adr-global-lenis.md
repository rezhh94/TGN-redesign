# ADR — homepage scroll transport

Last reconciled: 2026-07-18.

## Decision

The homepage uses native scroll. GSAP/ScrollTrigger may use local `scrub` for
an approved section or transition, but no global smooth-scroll transport should
control the full page.

## Reason

A global transport changes the feel of protected Hero/footer and every body
section, complicates refresh and breakpoint verification, and has no single
section owner. Tigon's current architecture is normal document flow with a few
scoped motion owners.

## Current implementation status

The current worktree removes the global Lenis initialization from
`HomeMotion`, deletes the unused helper `src/lib/motion.ts` and removes the
package/lockfile dependency. No mounted section uses that helper.

This cleanup is protected uncommitted work. Review and commit it separately
from a visual section change.

## Consequences

- Desktop, mobile, touch and reduced motion share one base scroll model.
- ScrollTrigger listens to native scroll directly.
- Scrub values are calibrated by their section owner.
- Do not reintroduce global smoothing to repair timing in one section.

## Rollback

Checkpoint newer work first, then restore only `HomeMotion`,
`src/lib/motion.ts`, `package.json` and `package-lock.json` from the last known
state that intentionally used Lenis. Never reset the full worktree.
