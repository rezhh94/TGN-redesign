# Homepage simplification — change and rollback reference

Last updated: 2026-07-15.

The complete homepage implementation from immediately before this change is preserved at commit:

`c82a3fc871a2206ff795da289a90f06c776826d1`

Use this note when the longer Intro, the separate Overlevering section or the entire previous journey should be restored.

## Current implementation

- `01 / Tilnærming` keeps `Tre fag. Én helhet.`, its short explanation and a compact Design / Teknologi / Synlighet index.
- The large Intro assembly, three explanatory discipline cards and closing restatement are removed.
- `EffectBridge` is not mounted between Tjenester and Effekt.
- Tjenester ends with `Lansert er ikke ferdig.` and an Osmo-adapted pixel cover into `03 / Effekt`.
- The pixel cover is decorative. Reduced motion and no-JS use a clean direct section boundary.

## Removed from 01 / Tilnærming

### Markup and content

Removed from `src/components/ApproachStatementBridge.tsx`:

- the detailed discipline objects with statement, body, output and material tone;
- `.approach-assembly`, its three material fields, `Én helhet.` lockup, rule and legend;
- `.approach-index-head`;
- the three large `.approach-index__item` explanation cards;
- `.approach-resolution` with `Én retning. Én leveranse.` and its supporting paragraph.

### Styling and motion

- The matching assembly, material-card, index-card and resolution CSS was removed from `src/styles/approach-statement-bridge.css`.
- The scroll-coupled three-material assembly and closing-resolution reveal were removed from `introStoryScene()` in `src/components/motion/HomeMotion.tsx`.
- The remaining Intro motion is only a small one-shot reveal for the title group and compact discipline index.

## Removed from the Tjenester → Effekt journey

- The `EffectBridge` import and mounted component were removed from `src/app/page.tsx`.
- The `effect-bridge.css` import was removed from `src/app/layout.tsx`.
- `bridgeScene()` and its desktop/mobile lifecycle calls were removed from `src/components/motion/HomeMotion.tsx`.

The original implementation files were deliberately retained and were not modified:

- `src/components/EffectBridge.tsx`
- `src/styles/effect-bridge.css`

Its existing image and the shared shutter helper also remain in the repository.

## Added in their place

- `.what-build__handoff` markup in `src/components/WhatWeBuild.tsx`.
- The line `Lansert er ikke ferdig.` plus its short measurement statement.
- `.what-build__pixel-transition` with responsive pixel/row counts.
- Tigon-scoped handoff and pixel-grid CSS in `src/styles/what-we-build.css`.
- `initPixelatedScrollTransition()` in `src/lib/osmo-motion.ts`.
- Pixel-transition setup and cleanup in `src/components/motion/HomeMotion.tsx`.

No external Osmo CSS, JS, fonts or assets were imported. Only the motion architecture was adapted.

## Restore options

### Restore the entire previous bundle

Find the commit that introduced this note and revert that commit:

```bash
git log --oneline -- docs/homepage-simplification-rollback.md
git revert <commit-hash>
```

This restores both the old Intro and separate Overlevering while removing the compact handoff and pixel transition. Review later changes first if the same files have been edited after this commit.

### Restore only the previous Intro

Use the baseline versions as the source of truth:

```bash
git show c82a3fc871a2206ff795da289a90f06c776826d1:src/components/ApproachStatementBridge.tsx
git show c82a3fc871a2206ff795da289a90f06c776826d1:src/styles/approach-statement-bridge.css
git show c82a3fc871a2206ff795da289a90f06c776826d1:src/components/motion/HomeMotion.tsx
```

Restore the first two files and copy only the old `introStoryScene()` implementation and its lifecycle usage from the third file. Do not replace all of `HomeMotion.tsx` if later motion work must be preserved.

Then update:

- `docs/current-homepage-state.md`
- `docs/sections/01-approach.md`
- `docs/current-project-rules.md` if the active rule changes again.

### Restore only the separate Overlevering

1. Re-add the `EffectBridge` import in `src/app/page.tsx`.
2. Mount `<EffectBridge />` between `<WhatWeBuild />` and `<WhatWeImprove />`.
3. Re-add `@/styles/effect-bridge.css` in `src/app/layout.tsx`.
4. Copy `bridgeScene()` and its desktop/mobile setup and cleanup from the baseline `HomeMotion.tsx` shown above.
5. Remove `.what-build__handoff` and `.what-build__pixel-transition` if the old section should replace the compact handoff completely.
6. Remove `initPixelatedScrollTransition()` and its setup only if no other section uses it.
7. Reconcile `docs/current-homepage-state.md`, `docs/sections/handoff.md` and `docs/current-project-rules.md`.

## Files in this change bundle

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/components/ApproachStatementBridge.tsx`
- `src/components/WhatWeBuild.tsx`
- `src/components/motion/HomeMotion.tsx`
- `src/lib/osmo-motion.ts`
- `src/styles/approach-statement-bridge.css`
- `src/styles/what-we-build.css`
- `docs/current-homepage-state.md`
- `docs/current-project-rules.md`
- `docs/sections/01-approach.md`
- `docs/sections/handoff.md`
- `docs/homepage-simplification-rollback.md`
- `docs/decision-log.md`

Header, Hero, Effekt content, Arbeid, Prosess, Manifest, footer, SEO metadata, schema, sitemap, robots, canonical, URLs and slugs were not changed.
