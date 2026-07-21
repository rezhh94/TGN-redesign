# 05 / Prosess — active contract

Last reconciled: 2026-07-21.

- Files: `ProcessLayers.tsx`, `process-layers.css`, `workProcessJourney` and
  `processScene`.
- Retning, Bygg and Live remain the content model and semantic order.
- The section is one compact production deck. The title block contains only
  `Prosessen` and `Fra retning til live.` Each phase contains its name and one
  short explanation; numbering, markers, dividers, output rows and progress
  decoration are intentionally absent.
- Important text and the `/kontakt?ref=prosess` link are server-rendered.
- Desktop from `768px` keeps all three phases visible in one ordinary-flow row.
  The cards are capped at `300px` wide and `320px` high. A section-scoped,
  reversible perspective fold adapts Trionn Key Facts' verified motion values;
  it does not pin the section or control later sections.
- Mobile through `767px` is a separate horizontal composition. Native
  touch/keyboard scroll-snap is the static, no-JS and reduced-motion baseline.
  Cards are capped at `280px` wide and `290px` high. With motion enabled and
  sufficient viewport height, the stage pins for `68vh` while measured progress
  centers Retning, Bygg and Live in order.
- Mobile viewports below `560px` high keep native scroll-snap and do not pin.
- `workProcessJourney` still owns only the short 04→05 overlap. The Work Orbit
  implementation and its triggers remain untouched.
- `processScene` owns all Process motion and cleans up only its local GSAP
  context, active-state attributes and ScrollTriggers.
