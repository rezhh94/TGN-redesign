# Current project rules

Last reconciled: 2026-07-19.

Read `docs/project-continuation-context.md`, `docs/current-homepage-state.md`,
`design.md`, the relevant section contract and `docs/remaining-work.md` before
changing a section.

## Direction and token authority

Tigon is editorial, restrained, typographic, confident, near-monochrome and
custom. It must not become SaaS, dashboard, SEO portal, generic agency template
or an effects demo.

`design.md` defines the design logic. `src/styles/tokens.css` is the executable
token source. Components consume semantic type, spacing, surface, line, button
and layer roles; section-local design systems are not allowed.

Homepage chapters currently use explicit solid surfaces. Do not add decorative
background media, texture, canvas, lighting or shaders. Future background art
requires a separate Tigon-authored direction and explicit user approval.

## Brand

- Promise: `BYGD FOR Å BLI VALGT.`
- Positioning: high-end websites, apps and digital systems where design,
  technology and visibility are built as one whole.
- Result system: `FUNNET. FORSTÅTT. VALGT. MÅLT.`
- Visual concept: selection, focus and distinction.
- Demonstrate the promise through clarity and quality; do not repeat `VALGT`
  as decoration.

## Protected scope

Do not change without explicit instruction:

- SEO metadata, schema, sitemap, robots, canonical, URLs or slugs;
- Header or Hero structure/content;
- Footer DOM, NAP or important links;
- established service and guide hrefs;
- unrelated uncommitted work.

Do not import legacy project CSS/JS, third-party reference code, fonts, media or
assets. Do not introduce visible orange. Do not commit or push unless asked.

## Active sections

### 01 / Intro

- Server-rendered, normal-flow editorial statement on the 12-column grid.
- Keep the character fill, line/plus axis, asymmetric support and real
  Tjenester action section-scoped. Never pin the section.
- No card, mask, blur, decorative term stream or local visual backdrop.
- Use the canonical statement, lead, meta and text-action roles.

### 02 / Tjenester

- Preserve five services, copy, capability lists, hrefs and local face images.
- Desktop keeps paired streams around the CSS-3D cube. Through 800px, use one
  complete full-width service chapter at a time.
- `servicesScene` is the sole service-motion owner. Do not add ScrollSmoother,
  a second image trigger, preloader or extra scroll transport.
- Reduced motion and no-JS retain a complete readable ledger.

### 02 → 03

- `OutcomeTensionBridge` is the mounted owner.
- Three complete server-rendered statements share one enhanced stage and stay
  readable in fallback states.

### 03 / Effekt

- Preserve the asymmetric `FUNNET / FORSTÅTT / VALGT / MÅLT` chain,
  explanations, measurement signals and current mockups.
- Current mockups are temporary; replacement is a separate asset task.

### 04 / Arbeid

- Show what Tigon can create, never past customer work.
- Preserve six direct capability links: Webapp, Nettsted, Plattform, E-handel,
  AI and App.
- Desktop may use the sticky archive. Touch, compact, reduced motion and no-JS
  use normal flow with visible actions.
- Dynamic Text Cursor is limited to these six real links.

### 05 / Prosess and 06 / System

- Preserve Retning, Bygg and Live with explanations and outputs.
- Prosess stays a readable dark system map; System is the quiet conclusion.
- Do not change the protected footer boundary.

## Motion and access

- Important text and links remain server-rendered and readable without JS.
- Respect reduced motion, touch, keyboard and mobile use.
- Scope GSAP to one section or handoff owner; avoid master pins, global kills,
  duplicate triggers and captured scrolling.
- Global Lenis is the sole desktop scroll transport. Touch, through 768px and
  reduced motion use native scroll.
- Motion never compensates for weak composition or hides critical content.

## Git discipline

Preserve the dirty worktree and stage exact files only. Never reconstruct
deleted directions from Git history unless the user explicitly requests a
rollback. Commit or push only after explicit instruction.
