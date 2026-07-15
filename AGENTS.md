# Tigon Redesign — Agent Instructions

## Goal

Build Tigon as a premium digital studio homepage:
- editorial
- restrained
- typographic
- confident
- near-monochrome
- custom, not template-like
- not SaaS, SEO-portal or AI slop

## Work Mode

Follow the user's current task.
Do not over-plan.

Prefer focused tasks, but multi-section work is allowed when the user asks for a connected journey, transition or effects sequence.

Use a section contract when helpful, but do not over-plan when the task is clear.

## Brand Direction

The canonical brand platform is `docs/tigon-brand-platform.md`.

- Brand promise: `BYGD FOR Å BLI VALGT.`
- Positioning: high-end websites, apps and digital systems where design, technology and visibility are built as one whole.
- Result system: `FUNNET. FORSTÅTT. VALGT. MÅLT.`
- Visual concept: selection, focus and distinction.
- `Uklart` may explain the process, but must not define the overall Tigon brand.
- Do not repeat `VALGT` as decoration; demonstrate the promise through hierarchy, clarity, visibility and quality.

## Hard Preservation Rules

Do not, unless explicitly requested:
- change SEO metadata, schema, sitemap, robots or canonical
- change URLs or slugs
- change Header or Hero
- change footer/NAP/important links
- import old `styles.css`, `signature.css` or `main.js`
- import MadeWithGSAP CSS, JS, fonts or assets directly
- use visible orange
- make the design SaaS, card-grid or dashboard-like
- turn 04 / Arbeid into a portfolio, case list, client list or showcase of previously built websites
- commit or push

## 04 / Arbeid — Capability Only

04 / Arbeid must show what Tigon can create, not what Tigon has created before.

- Frame every item as a possible Tigon capability or deliverable.
- Do not use previous websites, customer names, project references, case-study links or archive links as the section's argument.
- Do not call the active items cases, portfolio work or proof of past experience.
- Concept surfaces must never be presented as delivered customer work.
- Use capability, demonstration, concept, system, prototype or lab language when a label is needed.
- `WorkProof` is the active implementation and the only content model for 04 / Arbeid.
- Each capability surface is a direct, accessible link to its established service/guide URL. Do not restore the removed detail dialog, bottom sheet, capability switcher or card-opening interaction unless explicitly requested.
- The functional Dynamic Text Cursor may label these large links as `Utforsk / [capability]`; touch/mobile keeps a visible on-surface `Utforsk` action.
- `Dette kan Tigon lage` is the capability framing. `BYGD FOR Å BLI VALGT` is the global brand promise. Do not confuse either with a past-work portfolio claim.

## Design Freedom

Layout and structure may change when the user asks for redesign.

Static-first is preferred, but GSAP/MadeWithGSAP/effects tasks may implement structure and motion together when explicitly requested.

GSAP is allowed when the user explicitly asks for an effect or motion implementation.

External effects are motion architecture only. The visual design must stay Tigon: premium, editorial, typographic and near-monochrome.

Rejected old directions should not control new work unless the user reopens them.

## Motion Rules

Respect:
- reduced motion
- mobile/touch UX
- no-JS readability
- server-rendered important text and links

Scope GSAP to the relevant section or journey.
Avoid global kills.
Avoid duplicate triggers.
Avoid blurry text from heavy transforms.
Do not hide critical content behind JavaScript.

## Reporting

Keep reports short unless the user asks for an audit.

After changes, report:
- files changed
- what scope was touched
- whether Header/Hero changed
- whether motion was added
- whether old CSS/JS/MWG files were imported
- whether orange appears
