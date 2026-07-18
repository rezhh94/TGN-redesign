# 02 / Tjenester — active contract

Last reconciled: 2026-07-18.

Status: approved as the active checkpoint on 2026-07-18. Later visual polish
may refine spacing or calibration without reopening the composition contract.

- Files: `WhatWeBuild.tsx`, `what-we-build.css`, `servicesScene`.
- NuDot is the composition reference for restrained scale, asymmetric service
  placement and media/text balance. No NuDot code, font, image or asset is
  imported.
- The section reuses Tigon's `surface-base` wave, spotlight, vignette and veil
  recipe so Intro releases into Tjenester without a new grey section canvas.
- Desktop uses a quiet sticky information rail and a three-row asymmetric
  mosaic. It is not a full-viewport pin, card grid or large-title sequence.
- `Hva vi bygger` and all service names use restrained JUST Sans scale. Caleb
  Mono owns numbering, capabilities and actions; no `display-xl/2xl` service
  typography is allowed.
- Existing Nettsider and Webapper media are the two visual anchors. Apper,
  AI-systemer and SEO & AI-søk remain compact text modules; do not manufacture
  filler media to make all five items identical.
- Every module is one real accessible link with its established href. All five
  descriptions and complete capability lists remain server-rendered.
- The former `Hele leveransen` register and repeated card-like chapter framing
  are removed because they duplicated visible service information.
- `servicesScene` lazy-loads and pauses the existing wave on desktop, applies a
  small transform/opacity settle and mild media parallax, and owns cleanup.
- Through 900 px the rail is no longer sticky; at 640 px the composition is one
  normal-flow column. Mobile and reduced motion disable the video. No-JS keeps
  all content and links visible.
- Preserve the clean release into the existing `OutcomeTensionBridge`.
