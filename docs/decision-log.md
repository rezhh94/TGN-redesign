# Tigon — active decision register

Last reconciled: 2026-07-19.

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

Revision after connected-section review: shorten only the decorative group
rhythm and fade the complete stable block during the measured final handoff.
Do not remove Intro copy or fade individual foreground lines. Reduced/no-JS
place the foreground in ordinary flow instead of recreating the overlap.

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

Revision after production review: the outer cube stage grows from a responsive
small state to full size at `Nettsider`, while the inner cube retains the five
verified face stops. Preserve the combined terminal X/Y orientation because it
is required for the top SEO face to land upright. Wide screens may use faint
focus registers and one-column-inward lane placement to activate the negative
space without adding cards, assets or another motion owner.

Cube-motion correction, 2026-07-19: use an adaptive one-CSS-pixel starting
scale and cubic size growth. Hide only the exact pre-scroll rest, then fade the
stage in across the first three percent while linear
`X -360° / Y -540° / Z -42°` rotation remains bound from zero and settles
front-on at `Nettsider`. The bottom face reuses an existing local image rather
than exposing an empty plane. Later service turns use extended centred windows
at constant inner scale. Wide desktop alternates temporary
`X -58° / +48° / -58°` pitch through the first three Y turns, with restrained
alternating Z roll capped at `5–7°`; compact/mobile reduce both amplitudes. The
full journey therefore reveals top, bottom and side planes without adding a
full spin. The final keeps the verified combined X/Y top-face endpoint.
Perspective remains exactly five times the face size. The prelude-to-scene
overlap is tightened without changing row order, and the central `01 / 05`
counter is removed. Through 800 px, service-copy opacity clears the physical
cube field before and after each turn. The five stops and upright terminal
orientation are unchanged.

Performance correction, 2026-07-19: remove Intro's render-blocking Adobe
Typekit import, defer the global atmosphere video until after load/idle, mount
the grain as WebP, lazy-load every below-fold cube face and cache service-row
centres instead of reading all row geometry on every scroll update. A clean
throttled production profile improved LCP/FCP from 1,440–1,580 ms to 816–920 ms
and transfer from 636.3 to 532.7 KiB. The shared HomeMotion/GSAP client chunk
remains the largest structural CPU item and should be split only in a separate
lifecycle task.

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

Status: material principles retained; active media source superseded by the
Tigon-owned revision below.

Tigon-owned atmosphere revision, 2026-07-19:
Replace the mounted supplied wave with an independently authored focus-field
loop expressing selection, focus and distinction. Keep the existing one-owner
`HomeAtmosphere`, state interface, 644×360 delivery geometry and fallback
contract. Reduce the multiply material, make both film-grain scales static and
retain the previous wave only for rollback.

Status: user-reviewed, mounted and approved for commit.

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
