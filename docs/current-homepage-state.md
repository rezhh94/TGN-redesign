# Current Homepage State

Last verified: 2026-07-13

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

- Status: approved and locked on 2026-07-12. Do not redesign or replace this section unless the user explicitly reopens it.
- Uses a varied editorial sequence in ordinary document flow: one lead chapter, a compact two-up pair, one wide technical chapter and a tighter closing chapter.
- Every service name, description, capability list and service link is server-rendered and immediately available without JavaScript.
- Existing Tigon service imagery supports each chapter but never becomes the navigation mechanism.
- Desktop and mobile use small opposing scroll offsets for copy and media; there is no pin or sticky service header.
- The previous sticky image-led journey remains rejected because it buried service readability.

### Tilnærming

- Status: approved and locked on 2026-07-12. Do not redesign or replace this section unless the user explicitly reopens it.
- Uses the editorial `Tre fag. Én helhet.` direction introduced on 2026-07-12.
- The opening follows the same typographic and material grammar as Arbeid and Prosess without copying either section's layout.
- A responsive desktop scroll assembly aligns three large material fields for Design, Teknologi and Synlighet while the section stays in ordinary document flow.
- The assembly is decorative. The argument remains complete in the server-rendered intro, three-part index and closing statement.
- Mobile uses a mild, unpinned scroll response adapted to the vertically stacked material fields.
- Reduced-motion and no-JS states use the finished static composition.

### Overlevering

- Uses a Jack & AI-inspired layered handoff: readable foreground statement and image, oversized words moving in opposite directions behind it.
- It is not pinned.
- The previous long pinned ignite treatment was removed to reduce repeated pinned-scroll moments.

### Effekt

- Status: redesigned, integration-tested and approved through G6 on 2026-07-13. Final mockup assets remain the only open item.
- Uses one continuous asymmetric editorial result chain in ordinary document flow; the earlier equal 2x2 visual matrix is superseded.
- Funnet, Forstått, Valgt and Målt remain in semantic order as four large alternating typographic fields rather than being hidden behind a selector or active-card state.
- Every outcome keeps its description, measurement point and tools in server-rendered HTML.
- Existing Tigon mockup surfaces currently act as clearly labelled proof placeholders attached to each outcome. They must be replaced by the user's final Effect assets and are not an approved permanent asset choice.
- Desktop alternates word, proof surface and supporting copy across the grid. Tablet and mobile retain the same authored left/right rhythm while stacking all four outcomes in order.
- The closing line resolves the chain as `Synlighet inn -> Målbar kontakt ut`.
- Motion uses the section-scoped `Proof Lock`: each visible result word, proof surface and description converge over a short viewport pass into the approved static overlap. There is no pin, sticky stack, selector or active-state dependency.
- Desktop uses the full restrained displacement; mobile keeps the same mechanism with smaller travel and higher starting proof opacity. Reduced motion and no-JS show the finished static composition.

### Arbeid

- Status: redesigned and under review on 2026-07-13 after the user explicitly reopened the section.
- Uses a light, asymmetric editorial capability wall adapted from the Anatoly reference without adopting portfolio semantics.
- Six complete surfaces use unequal widths, formats and vertical offsets in normal document flow.
- Webapp, Nettsted, Plattform, E-handel, AI and App remain immediately visible and readable.
- It is a capability catalogue, not a customer portfolio.
- Every item describes something Tigon can create for a future project; the section does not refer to previously built websites or use case/archive links as proof.
- The current `Dette kan Tigon lage.` heading is capability framing. It is not portfolio language and does not replace the global `BYGD FOR Å BLI VALGT.` promise.
- Every surface is a real accessible detail trigger. Desktop fine-pointer hover uses the approved regular Dynamic Text Cursor; mobile shows a visible `Les mer` action.
- Capability details open in a native dialog/bottom sheet without creating project slugs or presenting the concepts as delivered work.
- The `Selected systems` pinned/orbital concept was rejected because it distracted from what Tigon delivers and reacted too aggressively to scroll.
- A later static fan of six tilted capability cards was also rejected and fully rolled back because overlap, cropping and decorative composition obscured the capability argument.
- Current motion is limited to small one-shot tile settling and the section-scoped functional cursor. No pin, orbit, parallax stage or scroll-driven state.

### Prosess

- Status: approved as the preserved baseline on 2026-07-13.
- Uses a visible `TGN / Systemflyt` map from `Uklart behov` to `Målbar kontaktvei`.
- The three phases are Retning, Bygg and Live, each with materials and an explicit output.
- It is ordinary document flow on desktop and mobile.
- The MWG 031-style pinned/receding card sequence and the later scroll-sensitive stage were rejected as repetitive and harder to read.
- Current motion is one-shot material settling, title decode and a decorative line draw. No pin.
- Accessible copy spacing and the reduced-motion fallback were corrected in commit `651145b`; the authored static card positions now remain intact when motion is reduced.

### Manifest and contact

- Manifest was reviewed on desktop and mobile on 2026-07-13 and intentionally preserved as the quiet system-level conclusion.
- Kontakt/footer remains unchanged and intentionally calm.
- No redesign or extra motion is currently planned for either section unless the user explicitly reopens them.

## Motion budget

- Important text and links remain visible in server-rendered HTML.
- Reduced motion and no-JS states remain readable.
- No pin is used in Tjenester, Overlevering, Arbeid or Prosess.
- No main homepage section uses a JS-driven pin. Overlevering retains its CSS-sticky viewport; Effekt remains in ordinary flow.
- Continuous motion is limited to transform/opacity work scoped to the relevant section.
- The only custom-cursor use is the functional Dynamic Text Cursor on clickable Arbeid surfaces; it is disabled for touch and reduced motion.
- No MadeWithGSAP code, CSS, fonts, images or other assets were imported.

## Preservation state

- Header and navigation were not changed. They are explicitly deferred for a separate full redesign.
- Hero remains preserved for now.
- Tilnærming was redesigned, approved and locked within its existing `01` scope on 2026-07-12.
- Tjenester was approved and locked within its existing `02` scope on 2026-07-12.
- Effekt is the approved asymmetric `03` result chain with section-scoped Proof Lock; its mockup surfaces remain temporary asset placeholders.
- Arbeid is the capability-led light asymmetric `WorkProof` implementation with accessible detail triggers and the narrowly approved Dynamic Text Cursor.
- Prosess remains the readable three-phase system map, with only fallback/accessibility corrections committed on 2026-07-13.
- Manifest and Kontakt/footer remain preserved quiet closing sections.
- SEO metadata, schema, sitemap, robots, canonical, URLs and slugs were not changed.
- Footer/NAP/important links were not changed.
- No visible orange was introduced.
- No old `styles.css`, `signature.css` or `main.js` was imported.

## Repository hygiene

- Active section contracts live under `docs/sections/` and mirror the mounted homepage.
- Superseded audits, generated review snapshots, rejected drafts, old QA media and the unmounted `WorkShowcase` variant were removed on 2026-07-13.
- Historical tracked material remains recoverable through git history; `_design-input/` is reference research and does not override active project documents.

## Verification

Verified through 2026-07-13:

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Desktop browser review at 1440 x 900 and 1440 x 1000
- Full-page responsive review at 1440, 1024, 768 and 390 px with no horizontal overflow, broken images or browser errors
- Mobile/touch review at 390 x 844
- Reduced-motion and no-JS review of Effekt, Arbeid and Prosess
- Keyboard activation, native Work dialog, Escape close and focus return
- Effect refresh-position and section-local motion cleanup
- Desktop/mobile review of Manifest and the Prosess-to-Manifest transition
- Homepage remained statically prerendered
