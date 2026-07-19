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

## Continuity — Read First

Before changing a section in a new task, read these in order:

1. `docs/project-continuation-context.md` — current branch, commits, dirty
   worktree and the current redesign baseline.
2. `docs/current-homepage-state.md` — what is actually mounted now.
3. `docs/current-project-rules.md` — active execution boundaries.
4. `design.md` — canonical shared design language, token authority and motion
   vocabulary for every homepage section.
5. The relevant file under `docs/sections/`.
6. `docs/remaining-work.md` — open work and recommended continuation order.

Do not use deleted historical reference material or reconstruct removed
directions from Git history unless the user explicitly requests a rollback.

## Brand Direction

The canonical brand platform is `docs/tigon-brand-platform.md`.

- Brand promise: `BYGD FOR Å BLI VALGT.`
- Positioning: high-end websites, apps and digital systems where design, technology and visibility are built as one whole.
- Result system: `FUNNET. FORSTÅTT. VALGT. MÅLT.`
- Visual concept: selection, focus and distinction.
- `Uklart` may explain the process, but must not define the overall Tigon brand.
- Do not repeat `VALGT` as decoration; demonstrate the promise through hierarchy, clarity, visibility and quality.

## Non-visual boundaries

Do not, unless explicitly requested:
- change SEO metadata, schema, sitemap, robots or canonical
- change URLs or slugs
- change factual NAP values or break established important links
- import old `styles.css`, `signature.css` or `main.js`
- import third-party reference CSS, JS, fonts or assets directly
- use visible orange
- make the design SaaS, card-grid or dashboard-like
- commit or push

## 04 / Arbeid — Capability Only

04 / Arbeid must show what Tigon can create, not what Tigon has created before.
This is a permanent project invariant, not a visual-preservation rule and not
an option that reopens during redesign.

- Frame every item as a possible Tigon capability or deliverable.
- Do not use previous websites, customer names, project references, case-study links or archive links as the section's argument.
- Do not call the active items cases, portfolio work or proof of past experience.
- Never turn the section into a list of websites Tigon has built.
- Concept surfaces must never be presented as delivered customer work.
- Use capability, demonstration, concept, system, prototype or lab language when a label is needed.
- `WorkProof` is the currently mounted implementation, not a protected layout
  or exclusive future component. It may be redesigned or replaced.
- Capability surfaces remain accessible and point to verified service/guide
  URLs unless a separate route/content task changes that contract.
- Pointer effects must retain a visible touch/mobile action and keyboard access.
- `Dette kan Tigon lage` is the capability framing. `BYGD FOR Å BLI VALGT` is the global brand promise. Do not confuse either with a past-work portfolio claim.

## Design Freedom

No visual homepage section is protected, safe, frozen or approved as a
permanent baseline. Header, Hero, every body section, handoffs, 04 / Arbeid and
Footer may all be redesigned when the user asks. Existing implementations are
mounted-state evidence, not preservation targets.

The target is to approach Trionn's construction quality, composition, rhythm,
responsive logic and motion architecture as closely as useful without making
a visual clone. Use Tigon content, branding, fonts, tokens and original assets;
never copy Trionn code, assets, shaders or identity-bearing combinations.

Full redesign freedom does not broaden an individual task automatically. Keep
each implementation scoped to what the user asks in that turn.

Static-first is preferred, but explicit effects tasks may implement structure and motion together.

GSAP is allowed when the user explicitly asks for an effect or motion implementation.

External effects are motion architecture only unless a section contract records
a specific approved exception. The visual design must stay Tigon: premium,
editorial, typographic and near-monochrome.

`design.md` is the canonical design entry point. New work uses the semantic
surface, text, line, type, grid and rhythm roles documented there. Do not
create a competing section-local design system or copy reference-site tokens
directly into components.

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
- whether external or legacy CSS/JS/assets were imported
- whether orange appears
