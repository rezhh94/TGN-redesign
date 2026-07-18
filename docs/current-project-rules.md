# Current Project Rules

Last reconciled: 2026-07-18.

Read `docs/project-continuation-context.md` for Git/worktree boundaries,
`docs/current-homepage-state.md` for mounted state and
`docs/remaining-work.md` before opening another section.

## Design direction

Tigon is a premium digital studio. The homepage should feel editorial,
restrained, typographic, confident, near-monochrome, spacious and custom. It
must not drift into SaaS, dashboard, SEO-portal, generic agency-template or
effect-demo styling.

The page uses one dark design family with different levels of depth, focus,
media density and motion. Same system does not mean identical section layouts.

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
media or assets. Intro's scoped Typekit kit `upd0woi` is the one documented
exception. Do not introduce visible orange.

## Active section decisions

### 01 / Intro

- `design.md` is the full contract.
- Stable `BYGD SAMMEN` foreground with Tigon integrated-practice copy.
- Decorative Tigon terms move and scramble behind it.
- Each decorative term fades before colliding with the foreground copy.
- No visible card, box, mask or backdrop blur behind the main statement.
- Existing Work wave/spotlight recipe is reused; mobile/reduced motion disables
  video.

### 02 / Tjenester

- Preserve all five services, copy, capability lists, images and hrefs.
- Ordinary editorial flow with small settles and mild image parallax.
- Existing dark-token worktree changes must be reviewed before new work.

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
- Existing 02/05/06 and lifecycle changes are protected, uncommitted work.
- Inspect the exact dirty diff before touching one of those areas.
- Never reset or discard the full worktree for a section rollback.
- Commit or push only after explicit user instruction.

## Task language

- Redesign: visible layout or structure change is expected.
- Polish: smaller visual refinements.
- Effect/motion implementation: scoped GSAP is allowed.
- Audit: inspect and report without implementing.

Follow the user's current scope. Do not reconstruct deleted reference concepts
from Git history unless the user explicitly requests a rollback.
