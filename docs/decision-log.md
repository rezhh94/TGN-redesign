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
  grammar. Its fonts, code, assets, global Lenis, loader, decorative cursor and
  default-heavy WebGL architecture are not part of the Tigon system.
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
Keep five complete services with their existing copy, imagery, capability lists
and verified hrefs in normal editorial flow. Motion remains small, local and
non-essential.

Status:
Approved and committed as `7ef236d`. Later spacing or atmosphere calibration
must preserve the compact mosaic composition and established links/content.

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
Implemented in the current worktree and awaiting user approval/commit.
`HomeAtmosphere` is the sole background owner; Intro, Tjenester, Effekt and
Arbeid retain their approved content compositions above transparent roots.

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
