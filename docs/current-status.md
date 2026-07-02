# Tigon Redesign Current Status

## Source of truth

Main working repo:
/Users/reezy/Konsepter/TGN-redesign

Do not use /Users/reezy/Konsepter/TGN-redesign-fable5 for implementation unless explicitly approved.

## Current static homepage

The homepage currently has:

1. Hero
2. 01 / Tilnærming
3. 02 / Tjenester
4. 03 / Effekt
5. 04 / Arbeid
6. 05 / Prosess
7. 06 / Kontakt/Footer

No new main sections should be added before full static review.

## Static status

Hero:
Strong. Do not redesign. Needs H1/SEO strategy before live.

01 / Tilnærming:
Approved static. Waits for future text-fill motion.

02 / Tjenester:
Approved direction. Rows are now real server-rendered links. Dead +/- affordance removed/replaced.

03 / Effekt:
Keep current 2x2 outcome-map. Proof Column experiment was rejected as too tight/aggressive.

04 / Arbeid:
Approved as static skeleton only. Needs real Envato/Tigon mockups later. Placeholder visuals are not final.

05 / Prosess:
Approved as static skeleton. Candidate for later signature stacking motion. May need future polish.

06 / Kontakt/Footer:
Approved as static v2, but may need later premium polish. All NAP/footer links must remain preserved.

## Motion status

No production motion pass has been approved.

Approach motion exists as WIP stash and must not be applied without review.

Motion roadmap order:
1. Tilnærming text-fill
2. Effekt active outcome fill
3. Arbeid visual reveal after real assets
4. Prosess stacking layers
5. Services hover/active later
6. Kontakt only small reveal/microinteractions

Do not animate everything.

## Asset status

No real work visuals are ready yet.

04 / Arbeid needs:
- one main Envato/Tigon mockup
- one detail crop
- dark UI / dark studio tone
- Tigon logo/design inserted via Photoshop later

Hero visual may also need real asset later.

## SEO/CRO status

docs/homepage-seo-contract.md is now part of repo and must be considered before live replacement.

Known pending SEO/CRO decisions:
- H1 strategy
- metadata/canonical/schema before live
- footer/link delta decisions
- NAP preservation
- regional/resource/case link coverage
- live integration mapping

## Recent completed work

- Imported Contact/Footer refinement.
- Fixed mobile menu hidden bug.
- Fixed hero href hygiene.
- Made WhatWeBuild rows real server-rendered links.
- Removed/replaced dead +/- affordance.

## What not to do now

Do not:
- add new sections
- redesign the whole page
- add GSAP
- add random images
- add portfolio grid
- add cards
- change metadata/schema/sitemap/robots/canonical without a dedicated live-integration task
- switch repos again by default

## Immediate next priorities

1. Create and commit this status file.
2. Decide H1 strategy.
3. Decide link-delta strategy against homepage SEO contract.
4. Run full responsive static review.
5. Then begin motion/assets passes.
