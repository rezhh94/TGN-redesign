# Current Project Rules

Last reconciled: 2026-07-18.

Read `docs/project-continuation-context.md` for Git/worktree boundaries,
`docs/current-homepage-state.md` for mounted state and
`design.md` for the canonical design language before opening another section.
Then read the relevant section contract and `docs/remaining-work.md`.

## Design direction

Tigon is a premium digital studio. The homepage should feel editorial,
restrained, typographic, confident, near-monochrome, spacious and custom. It
must not drift into SaaS, dashboard, SEO-portal, generic agency-template or
effect-demo styling.

The page uses one dark design family with different levels of depth, focus,
media density and motion. Intro through Arbeid share one physical global
atmosphere; the sections retain different content layouts above it.

## Global background rule

- `01 / Intro`, `02 / Tjenester`, `03 / Effekt` and `04 / Arbeid` must sit
  above one persistent wave/poster/spotlight/vignette/material/veil/grain
  atmosphere owner.
- A section may change the atmosphere state, but may not restart or replace the
  full background at its boundary.
- Do not allow stacked exit/intro spacing, a veil reset or an unloaded media
  layer to create an empty black hold between these sections.
- Local raised/focus surfaces remain valid for media. Full-section backgrounds
  stay transparent after the shared owner is mounted.
- Material and grain stay below every section's text, links, navigation and
  local media. Background texture may never wash over readable content.
- Mobile uses the same lightweight global wave and static texture recipe.
  Reduced motion and no-JS use its poster plus the continuous static material.
- Section content motion remains scoped; only background lifecycle is global.

## Brand platform

The canonical meaning is in `docs/tigon-brand-platform.md`.

- Promise: `BYGD FOR Å BLI VALGT.`
- Positioning: high-end websites, apps and digital systems where design,
  technology and visibility are built as one whole.
- Result system: `FUNNET. FORSTÅTT. VALGT. MÅLT.`
- Visual concept: selection, focus and distinction.
- Demonstrate the promise through clarity and quality; do not repeat `VALGT`
  as decoration.

## Protected scope

Do not change without explicit instruction:

- SEO metadata, schema, sitemap, robots or canonical.
- URLs or slugs.
- Header or Hero.
- Footer DOM, NAP or important links.
- Established service/guide hrefs.
- Approved Intro, 03 or 04 while working on another section.
- Existing uncommitted work in another section.

Do not import legacy project CSS/JS or third-party reference code, fonts,
media or assets. Intro's scoped Typekit kit `upd0woi` and the user-supplied
`wavebg.mp4` global-atmosphere source are the two documented exceptions. Do
not introduce visible orange.

## Active section decisions

### 01 / Intro

- Appendix A in `design.md` and `docs/sections/01-approach.md` are the full
  Intro contract.
- Stable `BYGD SAMMEN` foreground with Tigon integrated-practice copy.
- Decorative Tigon terms move and scramble behind it.
- Each decorative term fades before colliding with the foreground copy.
- No visible card, box, mask or backdrop blur behind the main statement.
- The global Intro-through-Arbeid owner supplies the wave/material field;
  mobile keeps the lightweight wave while reduced motion/no-JS use its poster.

### 02 / Tjenester

- Preserve all five services, copy, capability lists, hrefs and the five local
  images mapped to the five service faces of the center cube.
- Keep `Hva vi bygger` as a concise normal-flow prelude. The sticky scene owns
  only the active cube face and index; do not rebuild the former center copy
  stack.
- Above 800 px, preserve the paired left/right streams. Through 800 px, keep
  one complete full-width service chapter at a time with zero horizontal wave.
- Do not turn the section into giant service type, a card grid, a five-image
  template or an isolated full-screen canvas.
- Sit above the global wave/spotlight/vignette atmosphere and retain the
  restrained JUST Sans/Caleb Mono hierarchy.
- `servicesScene` owns one section-scoped dual-wave calculation: measured
  ranges, sine offsets, opposing lane direction and center focus.
- Do not add ScrollSmoother, a second scroll transport, a second image trigger,
  preloader or third-party assets. Reduced-motion/no-JS use one static first
  image and normal flow.
- Strengthen Tjenester only through the existing global `services-focus`
  atmosphere state; never mount a local section backdrop.

### 02 → 03

- `OutcomeTensionBridge` is the mounted owner.
- Three complete server-rendered statements share one scoped typographic stage
  when enhanced and remain readable in fallback states.

### 03 / Effekt

- Preserve the asymmetric `FUNNET / FORSTÅTT / VALGT / MÅLT` result chain.
- Preserve explanations, measurement signals, current mockups and 10 px meta
  floor.
- Existing proof mockups are temporary; replacement is a separate asset task.

### 04 / Arbeid

- Show what Tigon can create, never past customer work.
- Preserve six real capability links: Webapp, Nettsted, Plattform, E-handel,
  AI and App.
- Use capability, demonstration, concept, system, prototype or lab language.
- Never use portfolio, case-list, client parade or delivered-project framing.
- Do not imply that a concept surface is delivered customer work.
- Desktop may use the approved sticky archive. Compact/touch/reduced/no-JS use
  normal flow with visible `Utforsk` actions.
- The functional Dynamic Text Cursor is limited to these six links.

### 05 / Prosess

- Preserve Retning, Bygg and Live with their explanations and outputs.
- Dark system map in normal document flow; no state-switching pin.
- Existing dark-surface worktree changes must be reviewed before new work.

### 06 / System

- Preserve assembly mark, statement and explanation.
- Keep the quiet dark conclusion into the protected footer.
- Existing dark-token worktree changes must be reviewed before new work.

## Shared motion rules

- Important text and links remain server-rendered and readable without JS.
- Respect reduced motion, touch, mobile and keyboard use.
- Scope GSAP to the owning section or transition.
- Avoid master pins, global kills, duplicate triggers and captured scrolling.
- Native scroll is canonical; do not introduce global smooth-scroll transport.
- No motion should compensate for weak layout or hide critical content.

## Dynamic cursor rule

- Approved only for the six clickable 04 capability surfaces.
- Runs only with fine pointer/hover and without reduced motion.
- Label action and target: `Utforsk / [capability]`.
- Never use on navigation, footer, body copy, ordinary links, forms,
  decorative media or non-clickable surfaces.
- The real link, keyboard focus and visible touch action remain available.

## Git discipline

- Approved commits: Intro `e4dbba7`; 03/04 `c349ef7`.
- The committed `7ef236d` mosaic remains historical rollback context. The
  active dirty 02/Tjenester worktree is the explicitly requested dual-wave
  redesign and must move with its supporting documentation.
- Global Lenis/lifecycle cleanup remains a separate task and must not be folded
  silently into a visual section commit.
- Never reset or discard the full worktree for a section rollback.
- Commit or push only after explicit user instruction.

## Task language

- Redesign: visible layout or structure change is expected.
- Polish: smaller visual refinements.
- Effect/motion implementation: scoped GSAP is allowed.
- Audit: inspect and report without implementing.

Follow the user's current scope. Do not reconstruct deleted reference concepts
from Git history unless the user explicitly requests a rollback.
