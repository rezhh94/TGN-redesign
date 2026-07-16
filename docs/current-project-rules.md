# Current Project Rules

## Current Design Direction

Tigon should feel like a premium digital studio:
- editorial
- restrained
- typographic
- confident
- near-monochrome
- spacious
- custom, not template-like

The homepage should feel authored, but there is no fixed formula for what that journey must look like.

## Canonical Brand Platform

The full brand definition is in `docs/tigon-brand-platform.md`.

- Brand promise: `BYGD FOR Å BLI VALGT.`
- Positioning: high-end websites, apps and digital systems where design, technology and visibility are built as one whole.
- Result system: `FUNNET. FORSTÅTT. VALGT. MÅLT.`
- Visual concept: selection, focus and distinction.
- `Uklart` is allowed as process language, not as the overall brand identity.
- `Valgt` is not a decorative word to repeat across the page; the design must demonstrate the promise.

## Hard Rules

Do not, unless explicitly requested:
- change SEO metadata, schema, sitemap, robots or canonical
- change URLs or slugs
- change Header or Hero
- change footer/NAP/important links
- import old `styles.css`, `signature.css` or `main.js`
- import MadeWithGSAP CSS, JS, fonts or assets directly
- use visible orange
- make the design SaaS, card-grid or dashboard-like
- turn 04 / Arbeid into a portfolio, case list, client list or industry-by-industry history
- replace, generate or source new imagery for 04 / Arbeid unless the user explicitly opens an asset task
- commit or push

## 04 / Arbeid — Capability Rule

04 / Arbeid must communicate what Tigon can create, not catalogue what Tigon has created before.

- Treat it as a capability showcase, not a portfolio or case-study section.
- Frame every item as something Tigon can create for a future project, never as evidence that Tigon has built a similar website before.
- Do not use named previous projects, customer logos, industry lists or a parade of past websites as the concept.
- Do not use case links, archive links or "see what we made" language inside 04 / Arbeid.
- Use capability, demonstration, concept, system, prototype or lab language instead of case or portfolio language in the active implementation.
- Do not imply that a concept surface is a delivered customer project.
- Do not start an asset concept, image-generation pass, placeholder pass or sourcing exercise unless the user explicitly asks for it.
- Preserve the current capability mockups until an explicit asset task replaces them.

Current implementation note, 2026-07-15:
- `WorkProof` is the active component.
- It is an asymmetric capability wall using six Tigon demonstrations, not a customer portfolio. The one `Dette kan Tigon lage.` node introduced by 03→04 may remain sticky behind three authored pairs of real capability links while they move in ordinary scroll.
- The demonstrations must remain labelled so they cannot be mistaken for delivered client projects.
- Every capability surface is one real accessible link to its established service/guide URL. The whole surface is clickable; there is no detail dialog, bottom sheet, card-opening state or next/previous capability switcher.
- Desktop fine-pointer hover may use `Utforsk / [capability]` in the functional Dynamic Text Cursor. Touch/mobile receives a visible `Utforsk` action.
- `Dette kan Tigon lage` is the capability framing for 04 / Arbeid. It does not turn the section into proof of past work and does not replace the global brand promise.
- The rejected `Selected systems` pinned/orbital layout must not be restored unless explicitly reopened.
- The rejected tilted card fan/collage must not be restored unless explicitly reopened.

## Active Homepage Map

The verified section order and current motion decisions are maintained in `docs/current-homepage-state.md`.

Current non-negotiable motion decisions:
- Tilnærming uses the four-line `Hver for seg … / Bygd sammen …` thesis and hands directly to `Dette bygger vi`; its section-scoped SplitText reveal does not replace or hide the server-rendered copy.
- Tjenester uses varied editorial chapters in ordinary flow; no sticky service-image journey.
- Tjenester hands directly to Effekt through a compact server-rendered line and section-scoped pixel cover; no separate Overlevering scene.
- Effekt keeps the asymmetric result chain and uses a one-shot Osmo Highlight Marker on the four result words; the former Proof Lock motion is not active.
- Effekt hands to Arbeid through a two-sided MWG 053-inspired typographic flip: `Effekt må bygges inn.` rotates out line by line while `Dette kan Tigon lage.` rotates in on the same pinned mauve stage. No image participates, and no MWG code, fonts or assets are imported. Mobile/reduced motion remain ordinary flow.
- Arbeid keeps direct links and the narrowly approved functional Dynamic Text Cursor. The shared 03→04→Arbeid wrapper keeps the final title sticky behind a 2–2–2 sequence of all six links; no duplicate title, random placement, infinite media loop, Observer, scroll capture, white paper cut, dialog or parallax stage is used.
- Arbeid hands to Prosess through an opaque viewport-height `Slik blir det til.` cover and the three-row Osmo Shutter Scroll Transition. The wrapper clips the sticky title at the boundary so it cannot leak into 05. Reduced motion keeps a clean static section boundary.
- Prosess is a readable three-phase system map with no pin.
- Manifest remains a calm system conclusion. Kontakt keeps its existing desktop Osmo Footer Parallax and falls back to ordinary flow on mobile and reduced motion.

## Creative Freedom

The current design, section structures and reference sites are starting points, not permanent answers.

Creative decisions may change layout, pacing, hierarchy, typography, visual treatment and motion when the task allows it. Multi-section work is allowed when a connected journey or transition needs it.

No reference site defines Tigon. Borrow principles or behaviors, then make an independent decision for the content and brand.

Static-first is useful, but not mandatory. Structure and motion may be developed together when the effect is central to the idea.

Avoid rigid formulas such as a mandatory section count, visible numbering everywhere, a prescribed number of showpieces, fixed animation durations or a required dark/light pattern.

## Effects / External References

MadeWithGSAP and other external examples are references for behavior and motion architecture.

Do not recreate their visual style or import their CSS, JS, fonts or assets. Translate the useful idea into Tigon's own system.

Motion must respect reduced motion, mobile/touch behavior and no-JS readability. Important text and links must remain server-rendered and available without JavaScript.

## Dynamic Text Cursor — Usage Rule

The native cursor is the default across Tigon. A dynamic text cursor is a functional interaction cue, not a general visual effect.

- Current approved use: the six clickable capability surfaces in `04 / Arbeid` only.
- Use it only when a large editorial surface is genuinely clickable and navigates to meaningful detail content.
- The cursor label must describe both action and target, for example `Utforsk / Webapp`.
- Never use it on Header/navigation, footer, body copy, ordinary inline links, forms, decorative imagery, non-clickable surfaces or motion-only elements.
- Do not mix cursor systems. Tigon uses the regular Dynamic Text Cursor; Scramble Text Cursor is not approved.
- The cursor runs only with a fine pointer and hover support. Touch/mobile must receive a visible on-surface action instead.
- `prefers-reduced-motion` disables the custom cursor.
- A real link, keyboard focus, accessible naming and a non-cursor affordance must remain. The cursor can never be the only indication that something is interactive.
- Do not add the cursor to another section without explicitly reopening this rule and confirming that the new use has the same interaction purpose.

## Task Language

- Redesign means visible layout or structure change is expected.
- Polish allows smaller improvements.
- Effect or motion implementation allows GSAP.
- Audit means inspect and report without implementing.

Follow the user's current task over historical experiments or old documentation.

## Rejected Directions

Rejected old directions should not control new work unless the user explicitly reopens them.

Do not recreate:
- the old `STRUKTUR / FØR / PYNT + 4 rows` intro
- Veivalg
- Før du bygger
- guide/article/resource modules in the main flow
- the sticky service prototype where imagery displaced service readability
- the `Selected systems` pinned/orbital Work concept
- the tilted Work card fan/collage
- the MWG 031 pinned/receding Process cards
- the scroll-sensitive Process stage that changed too quickly
- repeated pinned-scroll effects across adjacent sections

## Creative Direction Reference

The living creative guidance is in `_design-input/tigon-creative-direction.md`. It is a decision aid, not an implementation contract.
