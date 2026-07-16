# Current Homepage State

Last verified: 2026-07-16

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
4. 03 / Effekt — `WhatWeImprove`
5. 03 → 04 / Fra resultat til form — `EffectWorkBridge`
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

- Status: explicitly reopened and reconciled with the connected homepage story on 2026-07-15.
- Uses the four-line thesis `Hver for seg / blir det lansert. / Bygd sammen / blir det valgt.` followed by the complete supporting explanation.
- The closing handoff `01 → 02 / Én helhet. Fem fag.` prepares the direct answer `Dette bygger vi` in Tjenester.
- The former material assembly, repeated three-column explanations and closing restatement are removed.
- Desktop and mobile remain ordinary document flow. Osmo Masked Text Reveal uses GSAP SplitText on the authored lines: the two `Hver for seg` lines arrive separately, the two `Bygd sammen` lines lock together, and support/handoff copy settles with the conclusion.
- Reduced-motion and no-JS states show the same complete static content.

### Tjenester → Effekt

- `EffectBridge` is no longer mounted as a separate homepage section.
- Tjenester now ends with the compact line `Lansert er ikke ferdig.` and an Osmo-adapted pixel transition directly into 03 / Effekt.
- The handoff copy is server-rendered inside `WhatWeBuild`; the generated transition grid is decorative and section-scoped.

### Effekt

- Status: redesigned, integration-tested and approved through G6 on 2026-07-13. Final mockup assets remain the only open item.
- Uses one continuous asymmetric editorial result chain in ordinary document flow; the earlier equal 2x2 visual matrix is superseded.
- Funnet, Forstått, Valgt and Målt remain in semantic order as four large alternating typographic fields rather than being hidden behind a selector or active-card state.
- Every outcome keeps its description, measurement point and tools in server-rendered HTML.
- Existing Tigon mockup surfaces currently act as clearly labelled proof placeholders attached to each outcome. They must be replaced by the user's final Effect assets and are not an approved permanent asset choice.
- Desktop alternates word, proof surface and supporting copy across the grid. Tablet and mobile retain the same authored left/right rhythm while stacking all four outcomes in order.
- The closing line resolves the chain as `Synlighet inn -> Målbar kontakt ut`.
- Motion uses the section-scoped Osmo Highlight Marker reveal: dark covers withdraw from FUNNET, FORSTÅTT, VALGT and MÅLT in two visible rows. Copy and proof surfaces stay still; there is no pin, scrubbed Proof Lock, sticky stack, selector or active-state dependency.
- Desktop uses the full restrained displacement; mobile keeps the same mechanism with smaller travel and higher starting proof opacity. Reduced motion and no-JS show the finished static composition.

### Effekt → Arbeid

- The new unnumbered handoff states `Effekt må bygges inn.` and labels the boundary `03 → 04 / Fra resultat til form`.
- One continuous `mauve-warm` surface now connects Effekt, the 03→04 bridge and the entire Work catalogue. The former mineral-mauve and white paper cuts are removed.
- Desktop uses a distinct MWG 053-inspired 3D line flip rather than repeating 02→03. `Effekt må bygges inn.` rotates away around the Y-axis while the single semantic `Dette kan Tigon lage.` title rotates into the shared 03→04→Arbeid sticky stage.
- Mobile, reduced motion and no-JS remain in ordinary flow with all text, images and links visible. No new asset or external effect code was imported.

### Arbeid

- Status: simplified and verified on 2026-07-15 after the user removed the card-opening layer.
- Uses one continuous mauve, asymmetric editorial capability wall adapted from the Anatoly reference without adopting portfolio semantics.
- The same `Dette kan Tigon lage.` node introduced by the 03→04 flip remains sticky behind all six capability links. It contracts into a restrained central background title as the catalogue enters; no duplicate Work title is rendered.
- The catalogue is paced as three asymmetric 2–2–2 chapters: Webapp + Nettsted, Plattform + E-handel, then AI + App. Each pair receives roughly one desktop viewport so the centre title can breathe between the two surfaces.
- Six complete surfaces still use unequal widths, formats and vertical offsets in normal document flow.
- Webapp, Nettsted, Plattform, E-handel, AI and App remain immediately visible and readable.
- It is a capability catalogue, not a customer portfolio.
- Every item describes something Tigon can create for a future project; the section does not refer to previously built websites or use case/archive links as proof.
- The current `Dette kan Tigon lage.` heading is capability framing. It is not portfolio language and does not replace the global `BYGD FOR Å BLI VALGT.` promise.
- Every surface is one real accessible link to its established service/guide URL. The entire surface navigates directly; there is no native dialog, bottom sheet, card-opening state or next/previous switcher.
- Desktop fine-pointer hover uses the approved regular Dynamic Text Cursor with `Utforsk / [capability]`; mobile shows a visible `Utforsk` action.
- The `Selected systems` pinned/orbital concept was rejected because it distracted from what Tigon delivers and reacted too aggressively to scroll.
- A later static fan of six tilted capability cards was also rejected and fully rolled back because overlap, cropping and decorative composition obscured the capability argument.
- Each pair uses one coordinated scrubbed approach from the left and right over the shared background title. The removed `Nettsider, apper og digitale systemer …` interstitial no longer interrupts the sequence. The MWG 051 reference contributes no random placement, infinite loop, Observer or scroll capture; there is still no orbit, parallax stage or hidden active state.

### Arbeid → Prosess

- A shared Work/Process wrapper lets the scoped sticky cover and the real dark Process section occupy the same final viewport.
- The handoff now keeps only the server-rendered `Slik blir det til.` statement. There is no rotating word, second statement or intermediate output line.
- The enhanced pass uses an Osmo-inspired Overlapping Parallax architecture: the mauve Work surface moves only 14–22svh and darkens slightly while the real Process section travels over it in normal scroll.
- Process owns a broad curved leading edge adapted from Curved Wipe. The curve enters before the rectangular section boundary, covers the outgoing statement and continues directly into `Uklart inn. System ut.`
- The transition provides roughly 140svh of real scroll on desktop and 125svh on mobile, while a softened GSAP scrub controls only the slower outgoing parallax and curve expansion.
- The earlier horizontal MWG 052 line, six-to-three field scene, three dark panels and black hold remain removed.
- No Osmo CSS, JavaScript, Barba instance, fonts or media are imported; only the overlapping movement and curved-edge principles are rebuilt with existing structure and GSAP.
- Reduced motion and no-JS preserve the single handoff statement and complete Process section in readable ordinary flow without overlap or a decorative curve.

### Prosess

- Status: approved as the preserved baseline on 2026-07-13.
- Uses a visible `TGN / Systemflyt` map from `Uklart behov` to `Målbar kontaktvei`.
- The three phases are Retning, Bygg and Live, each with materials and an explicit output.
- It is ordinary document flow on desktop and mobile.
- The MWG 031-style pinned/receding card sequence and the later scroll-sensitive stage were rejected as repetitive and harder to read.
- Current motion is one-shot panel settling in phase order 01→02→03; each panel's copy arrives before its oversized numeral. No pin, title decode, line draw or state switching.
- Accessible copy spacing and the reduced-motion fallback were corrected in commit `651145b`; the authored static card positions now remain intact when motion is reduced.

### Manifest and contact

- Manifest was reviewed on desktop and mobile on 2026-07-13 and intentionally preserved as the quiet system-level conclusion.
- Kontakt/footer remains intentionally calm. Desktop uses the existing Osmo Footer Parallax wrapper plus a small one-shot wordmark reveal; mobile, reduced motion and no-JS keep the same semantic footer in ordinary flow.
- No redesign or extra motion is currently planned for either section unless the user explicitly reopens them.

## Motion budget

- Important text and links remain visible in server-rendered HTML.
- Reduced motion and no-JS states remain readable.
- No pin is used inside Tjenester, Effekt or the Process system map. The unnumbered 03→04 and 04→05 handoffs use scoped sticky scenes; the Work catalogue itself remains ordinary flow.
- No numbered content system is hidden behind a JS-driven pin. The former separate Overlevering section is not mounted; Effekt, the Work links and the Process panels remain readable ordinary flow.
- Continuous motion is limited to transform/opacity work scoped to the relevant section.
- The only custom-cursor use is the functional Dynamic Text Cursor on clickable Arbeid surfaces; it is disabled for touch and reduced motion.
- No MadeWithGSAP code, CSS, fonts, images or other assets were imported.

## Preservation state

- Header and navigation were not changed. They are explicitly deferred for a separate full redesign.
- Hero remains preserved for now.
- Tilnærming was simplified and reconnected to the homepage story within its existing `01` scope on 2026-07-15.
- Tjenester was approved and locked within its existing `02` scope on 2026-07-12.
- Effekt is the approved asymmetric `03` result chain with a section-scoped Osmo Highlight Marker reveal; its mockup surfaces remain temporary asset placeholders.
- Arbeid is the capability-led light asymmetric `WorkProof` implementation with six direct accessible links and the narrowly approved Dynamic Text Cursor. The removed detail dialog is not part of the current implementation.
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
- `outputs/` is an untracked local QA/artifact directory. It is not application source and is excluded from scoped commits unless explicitly requested.

## Verification

Verified through 2026-07-15:

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Desktop browser review at 1440 x 900 and 1440 x 1000
- Full-page responsive review at 1440, 1024, 768 and 390 px with no horizontal overflow, broken images or browser errors
- Mobile/touch review at 390 x 844
- Reduced-motion and no-JS review of Effekt, Arbeid and Prosess
- Six Work capability anchors, correct established hrefs, no dialog/buttons/nested links and keyboard focus on the real link
- Server-rendered 03→04 thesis, mauve/light background zones and the real first Webapp match target
- Desktop review of the direct-link Work wall and the three-row Work→Process shutter
- Effect refresh-position and section-local motion cleanup
- Desktop/mobile review of Manifest and the Prosess-to-Manifest transition
- Homepage remained statically prerendered
