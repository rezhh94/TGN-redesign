# Homepage handoffs — active contract

Last reconciled: 2026-07-15.

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

## 04 → 05 / Arbeid → Prosess

- Active files: `src/components/WorkProof.tsx`, `src/styles/work-proof.css`, `src/lib/osmo-motion.ts` and initialization in `HomeMotion.tsx`.
- Arbeid ends with `Slik blir det til.`, `Seks muligheter. Én metode.` and the Retning / Bygg / Live index.
- The transition uses the original Osmo Shutter Scroll Transition architecture with exactly three generated rows across breakpoints.
- The rows cover the light Work surface with the dark Process colour before 05 content takes over; they are decorative and contain no critical text.
- Reduced motion generates no rows and keeps the clean static boundary.
