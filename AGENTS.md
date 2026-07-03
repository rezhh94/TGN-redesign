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
- commit or push

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
