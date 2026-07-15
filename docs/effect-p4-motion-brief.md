# 03 / Effekt — P4 Motion Brief

Status: `HISTORICAL IMPLEMENTATION RECORD — PROOF LOCK SUPERSEDED 2026-07-15`
Date: 2026-07-13
Mode: approved specification and implementation record

Current-use note: the asymmetric Effect layout remains active, but Proof Lock was replaced by the one-shot Osmo Highlight Marker in commit `a1216e2`. See `docs/sections/03-effect.md` for the active contract.

## Decision

Motion adds value only if it explains the approved overlap between each result claim and its proof surface. The current whole-outcome slide-in is generic and should be replaced, not combined with another effect.

The proposed mechanism is **Proof Lock**: the result word and proof surface begin slightly separated, converge during a short viewport pass, and stop in the exact approved static composition. This demonstrates selection, focus and documented effect without a rail, active card, pinned sequence or hidden content.

## One mechanism

For each outcome:

1. The number, measurement signal and result word are already fully visible.
2. The result word begins slightly inward, toward the proof surface.
3. The proof surface begins farther outward and at lower opacity.
4. The proof surface travels the greater distance while the result word settles the final small distance.
5. The description rises a few pixels into its final baseline.
6. All layers finish at the authored P3 position and remain still.

Odd and even outcomes mirror the same geometry. Nothing changes state after it has locked.

## Storyboard

The frames are simulated in the real P3 browser layout; they are not generated art and do not modify product code.

| State | Result word | Proof surface | Description |
|---|---|---|---|
| `01 / Discovered` | fully visible, 1% inward | 8% outward, 44% layer opacity | 10 px below final baseline |
| `02 / Converging` | 0.35% inward | 3% outward, 72% layer opacity | 4 px below final baseline |
| `03 / Locked` | approved static position | approved static position and opacity | approved static baseline |

Browser frames:

- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p4-01-discovered.png`
- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p4-02-converging.png`
- `/Users/reezy/.codex/visualizations/2026/07/13/019f5c1a-8540-7ed0-a19e-7d06a45c8e23/effect-p4-03-locked.png`

## Desktop and tablet behaviour

- Trigger each outcome independently in ordinary document flow.
- Start: outcome top at approximately 88% of the viewport.
- End: outcome top at approximately 50% of the viewport.
- Use one scrubbed timeline per outcome, with approximately `0.18` scrub smoothing.
- Odd outcomes use positive proof displacement and a small positive word displacement; even outcomes mirror both values.
- The header and measurement signal remain static.
- The section intro, closing statement and neighbouring sections receive no motion changes.

## Touch and mobile behaviour

- Use the same Proof Lock response to scroll; no hover or touch gesture is introduced.
- Reduce proof displacement to approximately 4%.
- Reduce word displacement to approximately 0.5%.
- Reduce description displacement to 6 px.
- Begin around 90% and finish around 66% of the viewport, with approximately `0.12` scrub smoothing.
- Preserve every outcome in normal reading order; no carousel, snapping or active-item state.

## Reduced motion and no-JS

- With `prefers-reduced-motion: reduce`, do not create the Effect timelines.
- The final P3 composition remains the only state.
- Without JavaScript, all four outcomes, signals, descriptions and proof surfaces remain server-rendered and visible.
- Motion never owns layout or content visibility.

## Performance and implementation boundaries

- Replace the current `effectScene()` whole-outcome animation; do not stack Proof Lock on top of it.
- P5 may edit only the section-scoped `effectScene()` logic in `src/components/motion/HomeMotion.tsx`.
- Query existing `h3`, `[data-effect-placeholder]` and `.what-improve__outcome-copy` elements; no component or CSS change is required.
- Use transform and opacity only.
- Do not animate filter, blur, shadow, clip-path, colour or layout properties.
- Do not add scale, parallax, staggered characters, a cursor effect, a signal line or a transition into Work.
- Use one ScrollTrigger-backed timeline per outcome, scoped by `gsap.context()`.
- Keep `invalidateOnRefresh: true`, section-local cleanup and no global trigger kills.
- Do not add a pin or alter Lenis.

## G4 acceptance test

Approve this only if the motion reads as proof attaching to a claim, not as four objects sliding into view. G4 approval opens P5 implementation in `HomeMotion.tsx` only. Choosing static instead skips P5 and moves directly to P6 integration QA.

Final outcome: Proof Lock was implemented only inside `effectScene()`, passed desktop/mobile/reduced-motion/no-JS and refresh QA, and was accepted at G5 and G6.
