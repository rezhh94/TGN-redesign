# Tigon — active decision register

Last reconciled: 2026-07-18.

This register contains only decisions that still govern the mounted homepage.
Superseded experiments and external reference audits have been removed from the
working documentation so they cannot steer later tasks.

## Brand and visual system

- Tigon is a premium, editorial, restrained, typographic and near-monochrome
  digital studio.
- Brand promise: `BYGD FOR Å BLI VALGT.`
- Result system: `FUNNET. FORSTÅTT. VALGT. MÅLT.`
- The body journey uses one dark design family with `deep`, `base`, `raised`
  and `focus` roles. Different sections retain distinct compositions.
- Intro, Tjenester, Effekt and Arbeid must sit above one physical global
  atmosphere. Shared colours or cloned background recipes do not satisfy this
  decision.
- TGS Perfect, JUST Sans and Caleb Mono remain the Tigon font system.
- No visible orange.
- `design.md` is the canonical design entry point; `tokens.css` owns actual
  values and section contracts own local composition.
- NuDot is a clean-room reference for flow, hierarchy, depth and motion
  grammar. Its fonts, code, general assets, global Lenis, loader, decorative
  cursor and default-heavy WebGL architecture are not part of the Tigon
  system. The user-supplied `wavebg.mp4` is one explicit documented exception.
- New work prefers semantic `surface-*`, `text-*`, `line-*`, `type-*`, grid and
  rhythm roles. Legacy aliases are retired only inside explicitly opened
  sections, never through an unrelated global rewrite.

## Protected boundaries

- Header/Hero, SEO infrastructure, URLs/slugs and footer/NAP are unchanged
  unless explicitly reopened.
- Important copy and links remain server-rendered.
- Mobile, touch, reduced motion and no-JS receive complete fallbacks.
- Native scroll is canonical; motion is owned by individual sections.

## 01 / Intro

Decision:
Use the approved Codrops `ScrollTextMotion` architecture with Tigon content.
Keep `BYGD SAMMEN`, the integrated-practice paragraph and
`TGN / integrated practice` stable in the foreground. Decorative Tigon terms
use Flip/scramble motion behind it and fade before colliding with the foreground
copy. Reuse the existing Work wave/spotlight recipe without a visible text box.

Status:
Approved and committed as `e4dbba7`. Appendix A in `design.md` is the detailed
contract; the main body of `design.md` governs the shared homepage language.

## 02 / Tjenester

Decision:
Keep five complete services with their existing copy, capability lists and
verified hrefs as server-rendered links. Place a moderate centered
`Hva vi bygger` prelude in normal flow, then let paired title/detail streams
move around a sticky cube-only axis. Existing service imagery occupies five
large faces of one local CSS-3D cube. The face nearest the active 90-degree stop
follows the service closest to the viewport center, translating the supplied
NuDot recording and MIT cube reference without copying their assets or UI.

Adapt only the audited motion architecture from
`ValentinDBS/codrops-tutorial-text-animation` commit
`90dfeb2eec89dd6879cabf2e76f4e7096e515a8a`: measured ranges, opposing
multipliers, sine offsets, closest-center focus and resize recalculation. Keep
it section-scoped; do not add ScrollSmoother or external assets. The held-stop
cube rotation belongs to the same owner and may not create a second trigger or
media lifecycle. Reduced motion and no-JS use normal flow.

Revision after direct visual review: through 800 px, remove horizontal travel
and present one full-width service chapter at a time beneath the sticky cube.
The existing global `services-focus` state becomes more asymmetric and vivid;
no local background is added.

Status:
Implemented in the active worktree and awaiting review/commit. `7ef236d` is the
historical compact-mosaic rollback point, not the active composition.

## 02 → 03

Decision:
Use `OutcomeTensionBridge` as the only mounted handoff. Three complete
server-rendered statements share one typographic stage when motion is enabled.

## 03 / Effekt and 04 / Arbeid

Decision:
Run Effekt and Arbeid on one shared atmosphere with states `entry`,
`effect-focus`, `handoff`, `work-focus` and `exit`. Calibrate the existing wave,
spotlight, vignette, veil and grain rather than introducing another system.

Effekt preserves its result order, explanations, measurement signals and 10 px
meta floor. Arbeid remains six future-facing capability links and never becomes
portfolio or customer proof. Its cursor remains limited to those six links.

Status:
Approved and committed as `c349ef7`.

## Global Intro → Arbeid atmosphere

Decision:
Hoist the existing wave, spotlight, vignette and veil into one persistent
background owner spanning Intro, Tjenester, Effekt and Arbeid. Sections retain
their approved content compositions and local motion above transparent roots.
The global owner changes named focus states without restarting at chapter
boundaries. Compact/reduced/no-JS use one continuous static light field.

Status:
Approved and committed as `b5d1a10`.
`HomeAtmosphere` is the sole background owner; Intro, Tjenester, Effekt and
Arbeid retain their content compositions above transparent roots.

Material revision, 2026-07-18:
Keep the same sole owner but replace its former generated delivery loop with
the exact video stream from the user-supplied `wavebg.mp4`, stripped of audio.
Build the NuDot-like surface from a deep asymmetric vignette, multiply material
and two restrained tiled grain scales below all text and media. Remove the 25
FPS viewport canvas. Desktop and mobile play the one lightweight wave; reduced
motion/no-JS use its poster and static material. No local section background or
new scroll owner is allowed.

Status: implemented in the active worktree and awaiting review/commit.

## 05 / Prosess

Decision:
Keep Retning, Bygg and Live as a readable dark three-phase system map in normal
document flow. The approved Work exit lands directly into it.

Status:
Dark-surface calibration exists as protected uncommitted work and requires its
own review.

## 06 / System

Decision:
Keep the assembly mark, statement and explanation as the quiet dark conclusion
before the protected footer.

Status:
Dark-token calibration exists as protected uncommitted work and requires its
own review.

## Open decisions

- Final Effekt proof assets require an explicit asset task.
- Several service labels do not yet have exact approved route mappings; see
  `docs/services-link-contract.md`.
- The protected Hero link issue requires an explicit link-only task.
- Existing 05/06 and lifecycle work need separate review and approval before
  commit.
- Full cross-section QA must be rerun after remaining section approvals.
