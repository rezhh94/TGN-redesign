# 01 / Tilnærming — active contract

Last reconciled: 2026-07-19. Mounted baseline commit: `af6f28f`.

- Files: `ApproachStatementBridge.tsx`, `approach-statement-bridge.css`, the
  shared statement roles in `tokens.css` and `introFillScene` in
  `HomeMotion.tsx`.
- The section is a clean-room Tigon adaptation of the generic construction
  pattern documented for Trionn About: normal flow, minimum one viewport,
  asymmetric 12-column statement, lower support split and one line/plus axis.
  No Trionn code, CSS, font, copy, media, shader or asset is imported.
- The server-rendered statement is the canonical Tigon positioning:
  `High-end nettsider, apper og digitale systemer hvor design, teknologi og
  synlighet bygges som én helhet.`
- JUST Sans owns the large sentence-case statement. Caleb Mono owns the
  chapter label, three-part register, handoff and action. The section uses the
  shared `statement`, `lead`, `meta`, text and line roles.
- The lower composition keeps `Design / tydelighet`,
  `Teknologi / kvalitet`, `Synlighet / effekt`, the server-rendered
  `01 → 02 / Én helhet. Fem fag.` handoff and one explanation. The real CTA
  points to the existing `#what-build-title` target; no new route is invented.
- Main statement motion splits only after hydration and interpolates each
  character from `text-faint` to its CSS final colour. Trigger is the statement,
  `start: "top 80%"`, `end: "bottom center"`, `scrub: true`,
  `duration: .45`, `stagger: .03`, `ease: none`.
- The hairline and plus share one scrubbed timeline. Trigger is the line,
  `start: "top bottom"`, `end: "top center"`, `scrub: true`, `ease: none`;
  line `scaleX 0 → 1`, plus `rotate 0 → 360` and `autoAlpha 0 → 1`.
- After that timeline is complete, fine-pointer movement moves the plus along
  the line with `.3s power2.out`; pointer leave returns it with
  `.6s power2.out`. Touch has no pointer-only dependency.
- Label and supporting columns use one-shot entrances only when they begin
  below the viewport: label `.8s power2.out` with an 8 px blur/10 px settle;
  support `.8s power2.out`, `.3s` delay and `.12` stagger.
- The mounted section is not pinned. CSS currently owns final layout and GSAP
  owns colour, transform and opacity progress; a redesign may replace this
  architecture.
- Above 900 px the label and statement share a row; the statement begins in
  column two with a first-line indent. At 900 px the title and label stack.
  At 640 px the support columns become normal flow and the section may grow
  beyond one viewport rather than compress its copy.
- It uses the solid `surface-base` role. No decorative background media,
  canvas, texture or lighting layer exists.
- Reduced motion and no-JS keep the complete statement, separator, support,
  action and handoff visible with no transforms. Header and Hero are also open
  to redesign when included in the task scope.
