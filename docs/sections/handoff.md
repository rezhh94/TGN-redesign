# Tjenester → Effekt — active handoff

Last reconciled: 2026-07-14.

- Active files: `src/components/WhatWeBuild.tsx` and `src/styles/what-we-build.css`.
- `EffectBridge` is retained in the repository for rollback but is not mounted or imported by the homepage.
- Tjenester ends with `Lansert er ikke ferdig.` and a short supporting line before a pixelated cover transition into 03 / Effekt.
- The handoff is part of Tjenester, not a separate numbered section or scroll scene.
- The transition adapts Osmo's Pixelated Scroll Transition with Tigon's mauve Effect colour; it imports no external CSS, JS, fonts or assets.
- Important copy remains fully readable without JavaScript, while reduced motion falls back to the clean section boundary.
