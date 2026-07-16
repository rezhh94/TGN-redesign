# Homepage handoffs — active contract

Last reconciled: 2026-07-16.

## 01 → 02 / Tilnærming → Tjenester

- Active files: `src/components/ApproachStatementBridge.tsx`, `src/styles/approach-statement-bridge.css` and section-scoped initialization in `HomeMotion.tsx`.
- Tilnærming states `Hver for seg / blir det lansert. / Bygd sammen / blir det valgt.` and closes with `01 → 02 / Én helhet. Fem fag.`.
- Tjenester answers immediately with `Dette bygger vi`; there is no separate generated transition layer at this boundary.
- Osmo Masked Text Reveal uses GSAP SplitText only to choreograph the authored Intro copy. Important text remains server-rendered, and reduced motion keeps the complete static statement.

## 02 → 03 / Tjenester → Effekt

- Active files: `src/components/WhatWeBuild.tsx`, `src/styles/what-we-build.css`, `src/lib/osmo-motion.ts` and initialization in `HomeMotion.tsx`.
- `EffectBridge` is retained in the repository for rollback but is not mounted or imported by the homepage.
- Tjenester ends with `Lansert er ikke ferdig.` and a short supporting line before a pixelated cover transition into 03 / Effekt.
- The handoff is part of Tjenester, not a separate numbered section or scroll scene.
- The transition adapts Osmo's Pixelated Scroll Transition with Tigon's mauve Effect colour; it imports no external CSS, JS, fonts or assets.
- Important copy remains fully readable without JavaScript, while reduced motion falls back to the clean section boundary.

## 03 → 04 / Effekt → Arbeid

- Active files: `src/components/EffectWorkBridge.tsx`, `src/styles/effect-work-bridge.css`, `src/components/WorkProof.tsx`, `src/styles/work-proof.css` and section-scoped initialization in `HomeMotion.tsx`.
- Effekt hands off through the server-rendered thesis `Effekt må bygges inn.` and the label `03 → 04 / Fra resultat til form`.
- The `mauve-warm` Effect surface continues through the bridge and the complete Work catalogue. No colour cut or white paper surface is introduced at this boundary.
- Desktop deliberately differs from 02→03: `Effekt må bygges inn.` rotates out line by line around the Y-axis while `Dette kan Tigon lage.` rotates in as the reverse side of the same typographic surface.
- The MWG 053 reference informs only the 3D line-flip architecture; no external code, fonts or assets are imported. No image crosses or competes with the Work heading, and the first capability visual is never clipped. Mobile, reduced motion and no-JS use ordinary readable flow with no sticky enhancement.
- The flip and complete Work catalogue share one wrapper, so the actual final title remains sticky behind three 2–2 capability chapters. It contracts into a restrained central watermark as Work enters; no duplicate title is rendered.
- The shared image is an existing Tigon capability asset. No new or external asset was introduced, and the transition does not imply delivered customer work.

## 04 → 05 / Arbeid → Prosess

- Active files: `src/components/WorkProof.tsx`, `src/styles/work-proof.css`, `src/components/ProcessLayers.tsx`, `src/styles/process-layers.css` and initialization in `HomeMotion.tsx`.
- Arbeid and Process share a wrapper so the real dark 05 section can sit one viewport underneath the sticky mauve handoff.
- `Slik blir det til.` is the only transition statement. It remains centered on the outgoing Work surface; no text replacement or looping effect is used.
- The real Process section rises in front through normal scroll. Its wide elliptical top edge is adapted from Curved Wipe, while Work shifts only 14–22svh and darkens underneath using the Overlapping Parallax depth principle.
- The enhanced range is roughly 140svh desktop and 125svh mobile. GSAP scrub softens the outgoing parallax, veil and subtle curve expansion; the incoming section itself remains directly connected to scroll.
- The older 03→04 sticky backdrop fades as the curved Process surface enters. `Uklart inn. System ut.` and the real process system are part of the incoming surface, not transition duplicates.
- The earlier MWG 052 line, six-to-three scene, dark fields and black hold remain removed.
- Only the Osmo curved-edge and overlapping-motion principles are adapted. No external code, CSS, Barba instance, fonts, Lenis instance or media are imported.
- Reduced motion and no-JS show the single transition statement and the complete sections in readable ordinary flow without overlap.
