# 05 / Prosess — active contract

Last reconciled: 2026-07-13.

- Active files: `src/components/ProcessLayers.tsx`, `src/styles/process-layers.css` and section-scoped motion in `HomeMotion.tsx`.
- The visible `TGN / Systemflyt` maps `Uklart behov` to `Målbar kontaktvei` through Retning, Bygg and Live.
- Every phase keeps its materials and explicit output in ordinary document flow.
- Motion is one-shot settling, title decode and a decorative line draw; there is no pin or state switching.
- Reduced motion preserves the authored static composition. Important text remains readable without JavaScript.
- Do not restore pinned/receding cards or the aggressive scroll-sensitive stage.
