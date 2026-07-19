# 01 / Tilnærming — active contract

Last reconciled: 2026-07-19. Approved base commit: `e4dbba7`.

- Files: `ApproachStatementBridge.tsx`, `approach-statement-bridge.css`,
  `introStoryScene` in `HomeMotion.tsx`.
- Appendix A in `design.md` is the detailed implementation, reference and
  licence contract. The main body of `design.md` governs the shared homepage
  language.
- Stable foreground: `BYGD SAMMEN`, the integrated-practice paragraph and
  `TGN / integrated practice`. It never scrambles or flips. At the final
  handoff only, the complete foreground block fades and lifts 12 px before
  `Hva vi bygger` enters the main reading field; reverse scroll restores it.
- Decorative Tigon capability words preserve Codrops' `group`, `el`, `pos-*`,
  Flip and scramble architecture behind the foreground copy.
- Each decorative word fades before it intersects the measured foreground
  rectangle. Do not add a visible card, text box, mask or backdrop blur.
- Sits above the global Intro-through-Arbeid
  wave/material/spotlight/vignette/grain atmosphere. `HomeAtmosphere` plays
  the one lightweight wave on desktop and mobile; reduced motion/no-JS use its
  static poster and static grain.
- Display and mono roles use local TGS Perfect and Caleb Mono. The former
  render-blocking Typekit import is removed.
- The server-rendered handoff `01 → 02 / Én helhet. Fem fag.` remains.
- Desktop word-group rhythm is shortened from `10vh` to `8.5vh`; through
  800 px it uses `9vh`. No words or semantic content are removed.
- Reduced motion/no-JS place the foreground in ordinary flow, keep all stable
  content and the readable handoff, and avoid a sticky cross-section overlap.
- Header and Hero are outside this section's writable scope.

The former Intro-local backdrop is removed. Intro keeps only its content and
Flip/scramble/collision-clearance contract above `HomeAtmosphere`.
