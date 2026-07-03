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

The homepage should feel like an authored journey, not a SaaS page, dashboard, SEO portal or card-grid system.

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
- commit or push

## Flexible Rules

Prefer focused tasks, but multi-section work is allowed when the user asks for a connected journey, transition or effects sequence.

Static-first is preferred, but not absolute. If the user asks for GSAP, MadeWithGSAP or an effect implementation, structure and motion may be implemented together.

Use a section contract when helpful, but do not over-plan when the task is clear.

Reports should be short unless the user asks for an audit.

## Effects / MWG Rule

MadeWithGSAP and external effects are references for motion architecture only.

Do not recreate the external visual style; adapt the motion to Tigon's own visual system.

Do not import their CSS, JS, fonts or assets directly.

When the task says effect, implement the effect. Do not stop at audit unless the user asked for audit.

Motion must respect reduced motion, mobile/touch behavior and no-JS readability. Important text and links must remain server-rendered and available without JavaScript.

## Task Language

If the task says redesign, visible layout or structure change is expected.

If the task says polish, small improvements are okay.

If the task says effect or motion implementation, GSAP is allowed.

If the task says audit, do not implement.

## Rejected Directions

Rejected old directions should not control new work unless the user explicitly reopens them.

Do not recreate:
- the old `STRUKTUR / FØR / PYNT + 4 rows` intro
- Veivalg
- Før du bygger
- guide/article/resource modules in the main flow
