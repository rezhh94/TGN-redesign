# Tigon — remaining work

Last reconciled: 2026-07-18.

This is the canonical backlog for the homepage. It describes what remains
without prescribing old reference sites or rejected visual concepts.

## Approved baseline

- 01 / Intro is approved and committed in `e4dbba7`.
- 03 / Effekt and 04 / Arbeid are approved and committed in `c349ef7`.
- Header/Hero, SEO infrastructure and Kontakt/footer remain protected.
- `design.md` is the canonical design entry point for all remaining sections;
  `tokens.css` remains the implementation value authority and section
  contracts own local composition.

## Current worktree review

- 02 / Tjenester has an approved compact NuDot-inspired mosaic, shared Tigon
  atmosphere and scoped `servicesScene` motion. Minor polish may follow without
  reopening its composition.
- Supporting current-state, motion and design documents are updated with that
  exact direction.
- The earlier broader dirty worktree was discarded at the user's explicit
  request. Do not reconstruct its 05/06 or lifecycle changes from historical
  notes.
- Global Lenis and dormant homepage initializers remain in the mounted clean
  baseline. Their cleanup is still open and must be a separate technical task.

## Next section sequence

The user chooses the next section. For each selected section:

1. Inspect its current source and dirty diff.
2. Read `design.md` and map new styling to its canonical semantic roles.
3. Take a before screenshot and create a scoped rollback point when requested.
4. Preserve content, links and neighboring approved sections.
5. Implement only that section and the minimum transition it owns.
6. Verify desktop, tablet, mobile, reduced motion, touch and no-JS as relevant.
7. Show before/after and stop for approval when requested.
8. Commit only after explicit approval.

Recommended review order if the user has no preference:

1. Optional scoped polish of the approved 02 / Tjenester checkpoint.
2. 05 / Prosess — confirm the existing 04 exit lands cleanly.
3. 06 / System — finish the body journey into the protected footer.
4. Global lifecycle cleanup — review and commit separately from visual work.

## Content and asset work still open

- Effekt proof mockups are temporary and await a separate, explicit asset task.
- Retain the tracked `videos/tigon-work-atmosphere/` project as the reproducible
  source for the active wave loop.
- Service/link decisions that are not exact label-to-route matches remain a
  content decision; see `docs/services-link-contract.md`.
- The protected Hero contains a known service-link issue documented in the SEO
  contract. Fix it only through an explicit link-only Hero task.

## Final integration gate

After the remaining sections are individually approved:

- run the full journey at 1440, 1024, 900, 768 and 390 px;
- verify reverse scroll, refresh position, resize and deep links;
- verify touch, keyboard, reduced motion and no-JS;
- confirm all six Work links and visible touch actions;
- confirm Header/Hero, SEO, URLs and footer/NAP are unchanged;
- run typecheck, production build and `git diff --check`;
- reconcile the active documentation and create one explicit integration
  commit only if the user requests it.
