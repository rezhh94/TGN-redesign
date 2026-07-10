# 02 / Approach Statement Bridge

> Brand clarification, 2026-07-10: `Uklart blir byggbart` is current section copy and process language. It is not the canonical Tigon brand idea. The brand promise is `BYGD FOR Å BLI VALGT`, defined in `docs/tigon-brand-platform.md`. A future copy/design pass may replace this framing when explicitly opened.

Before coding this section, this contract must be approved.

## Section name

02 / Approach Statement Bridge

## Role in page journey

This section is a short editorial bridge between the cinematic Hero and the more concrete Services section that follows.

It should slow the page down after the Hero, clarify Tigon's working posture, and prepare the visitor for service choices without turning into a method section.

## One idea

Tigon gjør uklare prosjekter tydelige nok til å bygges riktig.

## Focal point

The first thing the user should notice is one large typographic display statement:

"UKLART
blir byggbart."

## Tone

Dark charcoal / controlled tonal shift from Hero.

Quiet, spacious, restrained and editorial.

The section should feel calmer than the Hero, not like a second hero and not like a services module.

## Layout archetype

Centered editorial statement.

Suggested static layout:
- small CalebMono label
- large typographic display statement
- compact supporting paragraph
- generous vertical whitespace
- no visual object

## Why this layout is different from the previous section

Hero is cinematic, brand-heavy and display-type driven with a large visual field.

This bridge should be quieter and more text-led:
- shortened display copy treated as a typographic moment
- JUSTSans reserved for supporting text
- no large visual
- no CTA
- no service links
- no card structure
- more negative space and editorial pacing

## Content

Visible label:
01 / Tilnærming

Internal order:
This is the second page block after Hero, but the visible section numbering starts after Hero.

Main statement:
UKLART
blir byggbart.

Supporting text:
Før design, kode og animasjon kommer struktur:
hva som skal bygges, hvem det skal treffe,
og hvordan resultatet skal måles.

Links:
None.

CTA:
None.

## Must include

- The section must appear after Hero and before Services when implemented.
- The main statement may use TGSPerfect for "UKLART" if it is treated as a typographic moment.
- "blir byggbart." should use JUSTSans.
- JUSTSans should remain the body/supporting font.
- Do not recreate the old "STRUKTUR / FØR / PYNT" section.
- The label should use CalebMono.
- Important text must be server-rendered HTML.
- The section must preserve Header + Hero exactly unless explicitly approved otherwise.

## Must not include

- old "STRUKTUR / FØR / PYNT" framing
- 4 rows
- method rail
- cards
- image
- CTA
- grid
- visible orange
- guide/article/resource module
- Veivalg
- Før du bygger
- GSAP
- ScrollTrigger
- motion implementation
- imported old styles.css
- imported old signature.css
- imported old main.js

## Motion plan

No motion in the first build.

Future motion idea:
- text-fill from muted gray to off-white on scroll

Do not implement this motion until the static layout is approved.

## Static acceptance criteria

- The section reads as a short editorial bridge, not a full method section.
- Header + Hero remain unchanged.
- No component, style or layout from the old prototype is imported.
- No visible orange appears.
- No cards, grid, image, CTA or method rail appears.
- The main statement is the focal point.
- The supporting text is secondary and does not compete with the statement.
- The section is visually distinct from Hero and from the future Services section.
- The section works without JavaScript.

## Files expected to change

For this contract pass:
- docs/sections/02-approach-statement-bridge.md

For a later static implementation, after approval:
- src/app/page.tsx
- src/app/layout.tsx
- src/components/ApproachStatementBridge.tsx
- src/styles/approach-statement-bridge.css

Do not touch Header/Hero files unless explicitly approved.

## Validation

For this contract pass:
- git diff --check
- git status --short

For a later static implementation:
- npm run build
- npx tsc --noEmit
- git diff --check

Report:
- files changed
- what section was touched
- whether Header/Hero changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
