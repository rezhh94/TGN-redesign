# 05 / Prosess — active contract

Last reconciled: 2026-07-18.

Implementation note: dark-surface calibration is the mounted baseline, not a
protected design. Inspect the current component before the next 05 task.

- Files: `ProcessLayers.tsx`, `process-layers.css`, `workProcessJourney` and
  `processScene`.
- Retning, Bygg and Live are the current content model; their layout, visual
  treatment and motion may be redesigned.
- The three phases are dark `raised`, `focus` and `deep` materials. No light
  paper/mineral panel remains.
- The current Process section receives the mounted 04→05 overlap and then stays
  in ordinary document flow. This handoff may be replaced.
- Motion is one low-intensity settle in phase order. No pin/state switching.
- Reduced motion/no-JS preserve the authored static transforms and content.
