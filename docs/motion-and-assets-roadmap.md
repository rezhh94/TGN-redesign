# Tigon motion and asset roadmap

Last reconciled: 2026-07-19.

## Guardrails

- Motion enhances server-rendered final states.
- One owner per mechanic, scoped cleanup and no global trigger kills.
- Lenis is the sole desktop scroll transport; compact/touch/reduced motion use
  native scroll.
- Do not import third-party reference CSS, JS, fonts, media or shaders.
- Homepage background art is intentionally unassigned. Do not add decorative
  background assets until a new Tigon-owned direction is approved.

## Owner map

| Chapter | Owner | Mechanic |
| --- | --- | --- |
| Hero | `heroEntrance` | one-time masthead assembly |
| Intro | `introFillScene` | character fill, line/plus, support entry |
| Tjenester | `servicesScene` | dual streams, focus and CSS-3D cube |
| 02→03 | `OutcomeTensionBridge` | scoped typographic tension |
| Effekt | `effectScene` | result marker and local media reveal |
| Arbeid | `workArchiveScene` | archive reveal, local image parallax, title exit |
| 04→05 | `workProcessJourney` | short depth/overlap handoff |
| Prosess | `processScene` | local phase choreography |
| System | `manifestoReveal` | quiet one-shot assembly |
| Footer | existing footer owner | scoped footer parallax |

## Asset state

- Existing service, proof and capability images are content media and stay
  local to their components.
- Current Effekt proof mockups are temporary and may be replaced only in a
  dedicated asset task.
- New visual assets require provenance, local optimization, responsive sizing,
  alt/fallback treatment and explicit ownership.

## Validation gate

- TypeScript, production build and `git diff --check`.
- 390, 768, 1024 and 1440px.
- Mouse, touch, keyboard, reduced motion and no-JS.
- Reverse scroll, deep load, refresh and resize.
- No hidden content, duplicate triggers or horizontal overflow.
