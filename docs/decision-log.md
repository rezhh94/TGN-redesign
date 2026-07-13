# Tigon Redesign Decision Log

## 2026-07-01 — Clean rebuild

Decision:
Start from a clean project, not the old prototype.

Reason:
The old prototype accumulated too many CSS/JS layers, sections and experiments.

## 2026-07-01 — Header + Hero first

Decision:
Build Header + Hero as first approved foundation.

Reason:
Hero defines brand tone and visual direction.

## 2026-07-01 — No old intro

Decision:
Do not recreate the old "STRUKTUR / FØR / PYNT + 4 rows" intro.

Reason:
It felt too much like a premium SEO landing page and too similar to adjacent dark hero sections.

## 2026-07-01 — No visible orange for now

Decision:
Use black / off-white / gray only for current visible design.

Reason:
Orange previously created contrast and tone problems and made the design feel less restrained.

## 2026-07-01 — Static first

Decision:
Every section is built static first, motion second.

Reason:
Motion should enhance a strong layout, not rescue a weak one.

## 2026-07-09 — Tjenester restored to readable accordion

Decision:
Keep the earlier accordion structure and remove the sticky image-led service journey.

Reason:
The sticky prototype made the images visible while the actual services became unreliable to discover during normal scrolling. Service comprehension and server-rendered readability take priority.

## 2026-07-09 — Reduce repeated pinned-scroll moments

Decision:
Do not use the same pinned-scroll pattern across Tjenester, Overlevering, Arbeid and Prosess.

Reason:
Repeated pinning made the homepage feel mechanically repetitive and made scroll input feel overly sensitive. Each section now has a different role and pacing.

## 2026-07-09 — Overlevering becomes a non-pinned handoff

Decision:
Use a readable foreground statement and image with two oversized background tracks moving in opposing directions.

Reason:
This keeps the Jack & AI-inspired layered energy without adding another scroll trap. The statement remains readable without JavaScript.

## 2026-07-09 — Reject `Selected systems`

Decision:
Replace the pinned/orbital `Selected systems` Work prototype with a normal-flow asymmetric editorial index.

Reason:
The former concept competed with the explanation of what Tigon delivers, and its images reacted too quickly to scrolling. The new index labels each Tigon demonstration, category and delivery clearly.

## 2026-07-09 — Prosess becomes a visible system map

Decision:
Replace pinned/receding cards and the later scroll-sensitive stage with a three-phase `TGN / Systemflyt` map: Retning, Bygg and Live.

Reason:
The system map explains input, work and output immediately. It is readable in normal flow on desktop, mobile, reduced-motion and no-JS states.

## 2026-07-09 — Quiet ending preserved

Decision:
Keep Manifest and Kontakt as calm closing sections.

Reason:
The homepage already has sufficient energy earlier in the journey. The ending should create clarity and conversion, not another showpiece.

## 2026-07-10 — Canonical brand platform

Decision:
Use `BYGD FOR Å BLI VALGT.` as the global brand promise, supported by the positioning around high-end websites, apps and digital systems where design, technology and visibility are built as one whole. Use `FUNNET. FORSTÅTT. VALGT. MÅLT.` as the result system and selection/focus/distinction as the visual concept.

Clarification:
`Uklart` remains valid process language but is not the overall brand identity. 04 / Arbeid shows what Tigon can create for future projects and must never become a portfolio, previous-project list or «see what we made» section.

Reason:
The new platform connects design, technology, SEO/visibility, conversion and measurement while giving the visual system more range than the former unclear-to-buildable motif.

## 2026-07-12 — Tjenester approved and locked

Decision:
Keep the current `02 / Tjenester` implementation: one large lead service, a compact two-up pair, one wide technical chapter and a tighter closing chapter in ordinary document flow. Keep the charcoal `#090A09` background and the mild unpinned scroll response.

Reason:
The varied hierarchy gives every service sufficient presence without repeating five identical full-size scenes. Service names, descriptions, capabilities and links remain immediately readable on desktop, mobile, reduced-motion and no-JS states. Do not redesign or replace the section unless the user explicitly reopens it.

## 2026-07-12 — Tilnærming approved and locked

Decision:
Keep the `Tre fag. Én helhet.` direction with three responsive material fields in ordinary document flow. Desktop assembles the fields through scroll; mobile uses a milder unpinned response.

Reason:
It explains Design, Teknologi and Synlighet as one system while preserving readable server-rendered copy. The final title hierarchy no longer competes with the following Tjenester heading.

## 2026-07-12 — Effekt approved with temporary assets

Decision:
Keep the complete 2x2 result matrix for Funnet, Forstått, Valgt and Målt. The two current mockup strips are layout placeholders and must later be replaced by final user-supplied mockups.

Reason:
All four outcomes remain visible and measurable without a selector, sticky stack or decorative illustration. The temporary visuals add material weight without pretending to be final assets.

Superseded on 2026-07-13 by the approved asymmetric result chain below. The semantic content and temporary-asset rule remain valid; the equal 2x2 visual arrangement does not.

## 2026-07-13 — Effekt asymmetric result chain and Proof Lock approved

Decision:
Replace the equal 2x2 visual arrangement with one continuous asymmetric editorial chain for Funnet, Forstått, Valgt and Målt. Keep all four outcomes in server-rendered order and attach each large result word directly to its measurement signal, proof surface, explanation and tools. Use only the section-scoped `Proof Lock` motion, where the visible word, proof surface and description converge into the approved static overlap.

Reason:
The equal matrix read as four well-made boxes rather than Tigon's connected result system. The approved composition creates one authored reading rhythm without hiding content, adding a rail or introducing another pinned sequence. Desktop, tablet, mobile, reduced-motion, no-JS, keyboard/touch integration and production build all passed the final G6 gate.

## 2026-07-13 — Reject literal three-colour discipline poster direction

Decision:
Do not revive the broad white/olive/mauve section coding or the three-column Design/Teknologi/Synlighet poster treatment as Tigon's homepage system.

Reason:
The direction flattened the page into a strategy presentation, repeated ideas already communicated in copy and made the design more generic rather than more authored. Colour may still create chapter contrast, but it must follow section role and page rhythm rather than label disciplines literally.

## 2026-07-12 — Reject decorative Arbeid card fan

Decision:
Fully roll back the attempted static fan/collage of six tilted capability cards and preserve the existing `WorkProof` zig-zag catalogue.

Reason:
The fan created uncontrolled overlap and cropping, made capability labels harder to read and turned a useful capability section into decoration. Arbeid must explain what Tigon can create, not behave like a poster wall or portfolio collage.

## 2026-07-13 — Prosess preserved with fallback fixes

Decision:
Keep the existing three-phase system map and make only two implementation corrections: accessible spacing in the closing statement and preservation of authored card transforms in reduced-motion mode.

Reason:
The section was already one of the strongest parts of the page. A redesign would add effect density without improving comprehension; the focused fixes make its fallback behavior match the approved static composition.

## 2026-07-13 — Manifest reviewed and preserved

Decision:
Keep `SystemManifesto` unchanged as the quiet conclusion after Prosess. Keep Kontakt/footer unchanged as well.

Reason:
The dark-gray system layer, mark, statement and restrained reveal already create the correct final cadence. Another redesign or showpiece would weaken the transition into conversion.

## 2026-07-13 — Header deferred, Hero preserved

Decision:
Do not adjust the current Header/navigation during section work. Treat it as a separate future full-redesign task. Keep Hero as-is for now.

Reason:
The user explicitly separated the upcoming Header redesign from the approved body-section sequence.

## 2026-07-13 — Repository source-of-truth cleanup

Decision:
Remove superseded reports, old QA output, rejected drafts, the unmounted `WorkShowcase` implementation and assets with no active code references. Replace outdated section contracts with concise contracts that mirror the mounted homepage.

Reason:
The repository still contained multiple historical descriptions of Tjenester, Effekt, Arbeid and Prosess that contradicted the approved implementation. Git history preserves the removed tracked material; active agents now have one current documentation path instead of competing truths.

## 2026-07-13 — Dynamic Text Cursor is limited to functional Arbeid triggers

Decision:
Use the regular Dynamic Text Cursor only on the six clickable capability surfaces in `04 / Arbeid`. Keep the native cursor everywhere else. Scramble Text Cursor is not approved.

Reason:
The cursor gives large image-led surfaces a precise `Les mer / [capability]` affordance without turning the entire site into an effect system. Touch/mobile receives a visible `Les mer` action, reduced motion disables the custom cursor, and real buttons plus keyboard-accessible dialogs remain the underlying interaction.
