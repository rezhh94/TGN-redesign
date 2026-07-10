# Current Homepage State

Last verified: 2026-07-10

This is the canonical implementation snapshot for the redesign checkout. Historical audits and section experiments may remain in the repository, but they do not override this file, `AGENTS.md`, `docs/current-project-rules.md` or the current user instruction.

## Active brand direction

- Canonical definition: `docs/tigon-brand-platform.md`.
- Brand promise: `BYGD FOR Å BLI VALGT.`
- Positioning: high-end websites, apps and digital systems where design, technology and visibility are built as one whole.
- Result system: `FUNNET. FORSTÅTT. VALGT. MÅLT.`
- Visual concept: selection, focus and distinction.
- Existing `Uklart` wording belongs to process/implementation context and must not be read as the overall Tigon identity.

## Active page journey

The homepage is mounted in this order:

1. Header / Hero
2. 01 / Tilnærming — `ApproachStatementBridge`
3. 02 / Tjenester — `WhatWeBuild`
4. Overlevering — `EffectBridge`
5. 03 / Effekt — `WhatWeImprove`
6. 04 / Arbeid — `WorkProof`
7. 05 / Prosess — `ProcessLayers`
8. Manifest — `SystemManifesto`
9. Kontakt / footer — `ContactFooter`

## Current section decisions

### Tjenester

- Uses the readable pre-sticky accordion.
- All service names, descriptions and links are server-rendered.
- Images are supporting material inside the rows, not the navigation mechanism.
- The attempted sticky image-led service journey was rejected because users could see imagery without reliably seeing the services while scrolling.
- Do not restore the sticky service prototype unless explicitly reopened.

### Tilnærming

- Approved and unchanged in the 2026-07-09 motion revision.

### Overlevering

- Uses a Jack & AI-inspired layered handoff: readable foreground statement and image, oversized words moving in opposite directions behind it.
- It is not pinned.
- The previous long pinned ignite treatment was removed to reduce repeated pinned-scroll moments.

### Effekt

- Uses the restored stacked-outcome implementation from historical revision `25b423a`.
- The left column remains the reading anchor with title, explanation and active measurement detail.
- The right column contains four CSS-sticky cards: Funnet, Forstått, Valgt and Målt.
- GSAP only marks the front card and matching detail as active; stacking and readability do not depend on JavaScript.

### Arbeid

- Uses the restored always-open zig-zag capability catalogue from historical revision `25b423a`.
- Six complete rows alternate copy and three visual/mockup surfaces.
- Webapp, Nettsted, Plattform, E-handel, AI and App remain immediately visible and readable.
- It is a capability catalogue, not a customer portfolio.
- Every item describes something Tigon can create for a future project; the section does not refer to previously built websites or use case/archive links as proof.
- The current `Dette kan Tigon lage.` heading is capability framing. It is not portfolio language and does not replace the global `BYGD FOR Å BLI VALGT.` promise.
- The `Selected systems` pinned/orbital concept was rejected because it distracted from what Tigon delivers and reacted too aggressively to scroll.
- Current motion is one-shot row settling and mild counter-phase column parallax. No pin or accordion.

### Prosess

- Uses a visible `TGN / Systemflyt` map from `Uklart behov` to `Målbar kontaktvei`.
- The three phases are Retning, Bygg and Live, each with materials and an explicit output.
- It is ordinary document flow on desktop and mobile.
- The MWG 031-style pinned/receding card sequence and the later scroll-sensitive stage were rejected as repetitive and harder to read.
- Current motion is one-shot material settling, title decode and a decorative line draw. No pin.

### Manifest and contact

- Remain quiet closing sections.
- No redesign or extra motion was added in the 2026-07-09 revision.

## Motion budget

- Important text and links remain visible in server-rendered HTML.
- Reduced motion and no-JS states remain readable.
- No pin is used in Tjenester, Overlevering, Arbeid or Prosess.
- The existing Tilnærming showpiece remains the only active pinned section in this checkout.
- Continuous motion is limited to transform/opacity work scoped to the relevant section.
- No MadeWithGSAP code, CSS, fonts, images or other assets were imported.

## Preservation state

- Header and Hero were not changed in the 2026-07-09 revision.
- Tilnærming was not changed.
- SEO metadata, schema, sitemap, robots, canonical, URLs and slugs were not changed.
- Footer/NAP/important links were not changed.
- No visible orange was introduced.
- No old `styles.css`, `signature.css` or `main.js` was imported.

## Verification

Verified on 2026-07-10:

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Desktop browser review at 1440 x 900
- Mobile browser review at 390 x 844
- Homepage remained statically prerendered
