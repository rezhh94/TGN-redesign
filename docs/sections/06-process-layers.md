# 06 / Process Layers / Prosess

Before coding this section, this contract must be approved.

## Section name

06 / Process Layers / Prosess

Visible label:
05 / Prosess

Internal order:
This is the next visible page block after 04 / Arbeid. The visible section numbering on the page is 05 / Prosess.

## Role in page journey

After visual proof / Arbeid, this section should explain how it is to work with Tigon.

It should reduce buyer risk and show a controlled path from first conversation to launched solution.

It must not become a generic agency process list.

## One idea

Tigon jobber gjennom en kontrollert produksjonsflyt — fra avklaring til lansering.

## Focal point

The first thing the user should notice is a layered production workflow, not a list.

The section should feel like stacked workflow surfaces / production layers.

## Tone

Premium, controlled, studio-operational.

Dark base is preferred for first build, with layered surfaces inside.
Do not use a full light/off-white template section for this first build.

## Layout archetype

Production Layers / stacked workflow surfaces.

Suggested static layout:
- dark / near-black background
- large calm statement
- four process layers
- each layer offset or stacked
- no cards
- no icons
- no generic timeline
- no horizontal scroll in static build
- enough depth to support later GSAP stacking motion

## Why this layout is different from the previous section

Arbeid is a visual showcase with mockup/surface slots.

Prosess should be operational:
- less image-led
- more workflow-led
- layered structure instead of visual mockup
- planned future stacking motion
- not another service index or typographic outcome map

## Content

Visible label:
05 / Prosess

Hovedstatement:
Fra første samtale
til ferdig løsning.

Lead:
Ikke et langt byråløp. En kontrollert produksjon fra avklaring til lansering.

Process layers:

01 Avklar
Hva skal bygges, hvorfor, og hva må det løse?

02 Strukturér
Innhold, flyt, søkbarhet og måling settes før designet låses.

03 Bygg
Design, kode og integrasjoner utvikles med rask feedback.

04 Lanser
Siden publiseres med måling, teknisk sjekk og tydelig neste steg.

## Must include

- A visible label: 05 / Prosess.
- The approved statement and lead.
- Four process layers.
- Real HTML text.
- Layout that works without JavaScript.
- Clear differentiation from Arbeid, Effekt and Tjenester.
- Classes/data attributes may be prepared for later GSAP, but no motion in first build.

## Must not include

- card grid
- 4 equal SaaS cards
- icons
- generic timeline
- orange
- images
- fake metrics
- testimonials
- customer logos
- CTA block
- GSAP or motion in first build
- horizontal scroll in first build
- old prototype imports
- imported old styles.css
- imported old signature.css
- imported old main.js

## Motion plan

No motion in the first build.

Future motion idea:
- candidate signature motion section
- sticky/stacking production layers on desktop
- layers advance with scroll
- active layer highlight
- inactive layers muted
- subtle depth shift
- mobile fallback: no sticky, normal stacked content

No horizontal scroll unless separately approved later.

## Static acceptance criteria

- Seksjonen føles som en produksjonsflyt, ikke en liste.
- Den er tydelig annerledes enn Arbeid.
- Den fungerer uten bilder og JS.
- Den ser premium ut statisk.
- Den har ingen cards.
- Den har ingen icons.
- Den har ingen orange.
- Den gir grunnlag for senere GSAP stacking/layer motion.

## Files expected to change

For this contract pass:
- docs/motion-and-assets-roadmap.md
- docs/sections/06-process-layers.md

For later static implementation:
- src/app/page.tsx
- src/app/layout.tsx if new CSS import is needed
- src/components/ProcessLayers.tsx
- src/styles/process-layers.css

Do not touch existing sections unless explicitly approved.

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
- whether existing sections changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
