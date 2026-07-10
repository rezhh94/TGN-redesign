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
- propose, generate or source demo/placeholder imagery for 04 / Arbeid; the user will provide mockups and images later
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
- The user is working on mockups and imagery; design work may reserve deliberate asset space without inventing the assets.

Current implementation note, 2026-07-09:
- `WorkProof` is the active component.
- It is a normal-flow editorial capability index using six Tigon demonstrations, not a customer portfolio.
- The demonstrations must remain labelled so they cannot be mistaken for delivered client projects.
- `WorkShowcase` is a legacy unmounted variant and must not be used as the content model for 04 / Arbeid.
- `Dette kan Tigon lage` is the capability framing for 04 / Arbeid. It does not turn the section into proof of past work and does not replace the global brand promise.
- The rejected `Selected systems` pinned/orbital layout must not be restored unless explicitly reopened.

## Active Homepage Map

The verified section order and current motion decisions are maintained in `docs/current-homepage-state.md`.

Current non-negotiable motion decisions:
- Tjenester uses the pre-sticky accordion; no sticky service-image journey.
- Overlevering uses a non-pinned layered handoff.
- Arbeid is normal flow with mild reveal/parallax only.
- Prosess is a readable three-phase system map with no pin.
- Manifest and contact remain calm closing sections.

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
- the MWG 031 pinned/receding Process cards
- the scroll-sensitive Process stage that changed too quickly
- repeated pinned-scroll effects across adjacent sections

## Creative Direction Reference

The living creative guidance is in `_design-input/tigon-creative-direction.md`. It is a decision aid, not an implementation contract.
