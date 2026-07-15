# Homepage Design Approval Plan

Status: COMPLETE — G6 approved and P7 handoff complete
Created: 2026-07-13
Current checkpoint: `P7 complete — Effect delivery accepted`
Exact next step: `No active implementation phase; open a new explicit scope before further homepage work`

Current-use note, 2026-07-15: this is a completed approval record, not the current motion or handoff specification. Later Intro, Effekt, Arbeid and cross-section changes are governed by `docs/current-homepage-state.md` and `docs/sections/`.

## Purpose

This plan prevents another broad design pass from reaching the page before its core idea is proven. It controls sequence, scope, approval and rollback for the reopened homepage refinement.

The target is an authored, Awwwards-level Tigon experience: editorial, restrained, typographic, confident, near-monochrome and specific to Tigon. The target is not maximum motion, a recognisable agency template or a collection of fashionable UI effects.

## Baseline

- The repository was clean when this plan was created.
- The mounted homepage described in `docs/current-homepage-state.md` remains the approved implementation baseline.
- The previous multi-section experiment was fully reverted and must not be reconstructed from memory.
- No section implementation is changed by this plan.
- Final Effect assets remain a separate user-supplied asset pass. Work uses the current active capability mockups; any replacement is a separate explicit asset task.

## Locked while 03 / Effekt is explored

Do not change:

- Header or Hero
- 01 / Tilnærming
- 02 / Tjenester
- Overlevering
- 04 / Arbeid
- 05 / Prosess
- Manifest or Kontakt/footer
- SEO metadata, schema, sitemap, robots, canonical, URLs or slugs
- global palette, typography tokens or shared motion architecture

An adjacent section may be inspected for context, but not edited without a new explicit approval.

## Reference standard

References are used as quality lenses, never as visual templates:

- **Lama Lama:** pacing, asymmetry, compositional courage and clear chapter breaks.
- **Jack & AI:** one coordinated idea per chapter and asset treatment as part of identity.
- **Nudot:** spatial hierarchy, depth through light/scale and stable typographic anchors.
- **Nothin':** near-monochrome interface, meaningful negative space and asset-led colour.
- **Trionn:** hard tonal contrast and a recurring motif that belongs to the content.

Tigon must remain stricter, calmer and more precise than the references. No reference layout, cursor, 3D object, texture, glitch, WebGL scene or motion sequence may be copied as the design answer.

## Awwwards quality gate

The internal review mirrors the weighting recorded in the reference audit:

- Design: 40%
- Usability: 30%
- Creativity: 20%
- Content: 10%

A proposal does not pass because it looks impressive in one screenshot. Design and usability must both improve. Motion that weakens clarity, mobile behaviour, performance or control is a net loss.

Every candidate must pass all of these:

1. **Static strength:** the section is distinctive and complete with motion disabled.
2. **Content logic:** the composition makes `FUNNET. FORSTÅTT. VALGT. MÅLT.` clearer, not merely more decorated.
3. **Tigon specificity:** the idea cannot be relabelled for any generic digital agency without losing its meaning.
4. **Hierarchy:** one focal idea is obvious; supporting text and metadata remain calm.
5. **Reference level:** the result demonstrates comparable authorship, pacing and finish without imitating a reference surface.
6. **Usability:** all content is readable, server-rendered and available without a hidden state.
7. **Mobile integrity:** 390 px is an authored composition, not a collapsed desktop fallback.
8. **Restraint:** every unusual treatment has a content or interaction role.
9. **Page fit:** entry from Overlevering and exit to Arbeid remain visually coherent without redesigning either neighbour.
10. **Technical quality:** reduced motion, no-JS, keyboard, touch and performance remain intact.

## Immediate rejection criteria — anti-slop gate

Reject the direction before implementation if it relies on any of these as the main idea:

- generic card grid, dashboard, bento or SaaS layout
- glassmorphism, floating glass cards or soft AI-product gradients
- random 3D, WebGL, particles, smoke or objects without a Tigon-specific motif
- decorative timelines, rails, corner marks or selection boxes that do not improve comprehension
- literal colour coding presented like a strategy diagram or presentation deck
- faux-terminal, fake analytics, meaningless technical labels or invented proof
- a large condensed heading plus four interchangeable boxes with no authored composition
- effects stacked to manufacture novelty: tilt + parallax + blur + cursor + morph
- copied reference composition with Tigon fonts placed on top
- motion used to rescue a weak static frame
- additional page length without a clear narrative or reading benefit

Passing the anti-slop gate means the concept has a specific reason to exist. It does not mean the concept is approved.

## Execution sequence and approval gates

Only one phase may be active. Saying `godkjent` advances exactly one gate to the listed next phase.

### P0 — Plan and scope lock

Status: **complete**

Deliverables:

- durable plan
- locked scope
- quality criteria
- approval and rollback rules

Next after approval: `P1`

### P1 — Baseline and direction brief

Status: **complete — G1 approved**
Mode: read-only; no component, CSS or motion edits

Work:

1. Render the current Effect section at 1440 px and 390 px.
2. Capture the complete section plus Overlevering→Effekt and Effekt→Arbeid seams.
3. State the exact communication and composition problem in no more than three sentences.
4. Identify what is already strong and must survive.
5. Select one primary reference principle and at most one supporting principle.
6. Define one Tigon-specific concept sentence.
7. Name the exact files that a static prototype would be allowed to touch.

Approval package:

- current screenshots
- problem statement
- preserve list
- concept sentence
- reference transfer explanation
- explicit do-not-build list

Gate `G1`: user approves or rejects the direction brief.

If approved, next: `P2 — static prototype`.
If rejected, revise only the brief; no code has to be undone.

### P2 — Static Effect prototype

Status: **complete — G2 approved**
Allowed scope by default:

- `src/components/WhatWeImprove.tsx`
- `src/styles/what-we-improve.css`

Work:

1. Implement one static concept, not several mixed directions.
2. Keep all four outcomes and their critical copy visible.
3. Do not add GSAP, new global tokens or neighbour-section transitions.
4. Render desktop and mobile before/after images at identical dimensions.
5. Measure section height and report any increase.
6. Compare the result against every Awwwards and anti-slop criterion above.

Gate `G2`: user reviews the actual browser result.

If approved, next: `P3 — static refinement`.
If rejected, revert only the P2 files to the clean baseline and return to `P1`.

### P3 — Static refinement and responsive finish

Status: **complete — G3 approved**

Work:

1. Refine typography, spacing, crop, rules and metadata hierarchy.
2. Resolve desktop and mobile independently where needed.
3. Validate the two page seams without changing adjacent sections.
4. Confirm no important content depends on JavaScript.
5. Produce final static screenshots for approval.

Gate `G3`: static art direction is either locked or reverted.

If approved, next: `P4 — motion brief`.
If rejected, return to `P2` without opening other sections.

### P4 — Motion brief and storyboard

Status: **complete — G4 approved**
Mode: specification first; no motion code

Work:

1. Decide whether motion materially improves sequence, focus or causality.
2. Define one primary mechanism and its start, progression and settled state.
3. Define desktop, touch/mobile and reduced-motion behaviour.
4. Define performance boundaries and animated properties.
5. Show a short state storyboard or annotated captures.

`No motion` is a valid and preferred result when the static section is already complete.

Gate `G4`: user approves the motion brief or locks the section as static.

If motion is approved, next: `P5 — motion implementation`.
If static is approved, skip to `P6`.

### P5 — Motion implementation

Status: **complete — G5 approved**

Allowed additional scope only after approval:

- section-scoped Effect logic in `src/components/motion/HomeMotion.tsx`

Work:

1. Implement only the approved mechanism.
2. Keep important text visible without JavaScript.
3. Avoid pinning unless the approved storyboard proves it improves reading.
4. Validate mobile/touch, reduced motion, no-JS and refresh behaviour.
5. Check for duplicate triggers, global kills and transform blur.
6. Capture the final states in the real page.

Gate `G5`: user approves motion in context.

If approved, next: `P6 — final integration QA`.
If rejected, remove only P5 motion and retain the approved static section.

### P6 — Final integration QA

Status: **complete — G6 approved**

Work:

1. Review the entire homepage at desktop and mobile sizes.
2. Confirm Effect has not created a new competing climax or repeated mechanic.
3. Run typecheck, production build and `git diff --check`.
4. Verify keyboard, touch, reduced motion and no-JS.
5. Report exact files changed and all protected surfaces untouched.

Gate `G6`: final user acceptance.

If approved, next: `P7 — documentation and optional git action`.

### P7 — Documentation and handoff

Status: **complete**

Work:

1. Update active section and motion documentation to match only the approved implementation.
2. Record rejected directions briefly so they are not revived.
3. Commit or push only if explicitly requested.
4. Choose the next homepage problem only through a new explicit scope decision.

## Change-control rules

- No phase may silently expand to another section.
- No second visual concept is added to rescue a weak first concept.
- No docs describing implementation are updated before final acceptance.
- Every implementation gate includes a before/after visual comparison and scoped diff.
- A rejected phase is reverted completely before a new direction starts.
- Existing user changes are preserved; rollback applies only to the active phase files.
- Assets are not invented, sourced or generated unless the user explicitly opens the asset pass.
- Header/Hero, SEO, URLs and footer remain protected throughout this plan.

## Current state register

| Phase | State | Approval needed | Next action |
|---|---|---|---|
| P0 Plan and scope | Complete | Acknowledged | P1 baseline and brief |
| P1 Baseline and brief | Complete | G1 approved | P2 static prototype |
| P2 Static prototype | Complete | G2 approved | P3 refinement |
| P3 Static refinement | Complete | G3 approved | P4 motion brief |
| P4 Motion brief | Complete | G4 approved | P5 motion implementation |
| P5 Motion implementation | Complete | G5 approved | P6 integration QA |
| P6 Integration QA | Complete | G6 approved | P7 documentation |
| P7 Documentation/handoff | Complete | Explicit git instruction still required | Close or new scope |

## Exact next action

The controlled Effect sequence is closed. No implementation phase is active. A future asset replacement, Header redesign or another homepage change requires a new explicit scope; commit and push still require a separate user instruction.
