# Tigon — remaining work

Last reconciled: 2026-07-18.

This is the canonical backlog for the homepage. It describes what remains
without prescribing old reference sites or rejected visual concepts.

## Approved baseline

- 01 / Intro is approved and committed in `e4dbba7`.
- 03 / Effekt and 04 / Arbeid are approved and committed in `c349ef7`.
- Header/Hero, SEO infrastructure and Kontakt/footer remain protected.

## Worktree review before new design work

The current worktree contains existing, uncommitted changes for:

- 02 / Tjenester dark-token and layout calibration.
- 05 / Prosess dark-surface calibration.
- 06 / System dark-token calibration.
- 02→03 token alignment.
- global Lenis removal and dormant lifecycle cleanup.
- the active documentation set.

These changes must be reviewed section by section. Do not discard them and do
not combine them into the next unrelated commit.

## Next section sequence

The user chooses the next section. For each selected section:

1. Inspect its current source and dirty diff.
2. Take a before screenshot and create a scoped rollback point when requested.
3. Preserve content, links and neighboring approved sections.
4. Implement only that section and the minimum transition it owns.
5. Verify desktop, tablet, mobile, reduced motion, touch and no-JS as relevant.
6. Show before/after and stop for approval when requested.
7. Commit only after explicit approval.

Recommended review order if the user has no preference:

1. 02 / Tjenester — closest open section after approved Intro.
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
