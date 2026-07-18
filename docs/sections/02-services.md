# 02 / Tjenester — active contract

Last reconciled: 2026-07-18.

Implementation note: dark-token calibration is present as protected,
uncommitted worktree state; inspect the diff before the next 02 task.

- Read `design.md` before evaluating the next Tjenester proposal. NuDot is a
  flow and motion reference only; use Tigon's semantic tokens and clean-room
  implementation boundary.

- Files: `WhatWeBuild.tsx`, `what-we-build.css`, `servicesScene`.
- Preserve all five services, copy, capabilities, images and established hrefs.
- Dark base/raised material, shared line/media recipe and semantic type are
  active. Feature titles use `display-xl`; compact rows use `display-lg`.
- Motion is limited to small opposing settles and mild image parallax.
- No pin, sticky service navigation or animation-dependent content.
- The next redesign gate may change composition after user approval, but must
  preserve the five services, established links, normal-flow fallback and the
  connected handoff into `OutcomeTensionBridge`.
