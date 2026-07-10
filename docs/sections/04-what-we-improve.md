# 04 / What We Improve / Hva vi forbedrer

Last reconciled with the implementation: 2026-07-10.

The active implementation is the light, typographic `03 / Effekt` signal journey in `WhatWeImprove`.

## Section name

04 / What We Improve / Hva vi forbedrer

Visible label:
03 / Effekt

## Role in page journey

This section comes after Services / What We Build.

It should shift the page from what Tigon builds to what improves for the client after the work is done.

It is not another service list. It is an outcome section that explains why the work matters.

## One idea

Tigon bygger ikke bare løsninger. Tigon forbedrer hvordan kunden blir funnet, forstått, valgt og målt.

## Focal point

The first thing the user should notice is a large typographic outcome sequence:

FUNNET
FORSTÅTT
VALGT
MÅLT

The words should feel like proof outcomes, not service categories.

## Tone

Dark, premium, typographic and outcome-led.

The section should feel more like proof and effect than services. It should remain restrained, confident and spacious.

## Layout archetype

Outcome board / large typographic proof list.

Suggested static layout:
- dark / near-black background, or a controlled dark tonal shift from Services
- large outcome words as the main visual rhythm
- concise explanatory text per outcome
- numbering in CalebMono
- off-white primary text
- muted gray supporting text
- thin separators or structural lines if needed
- no images
- no cards

## Why this layout is different from the previous section

Services is a dark accordion/index with one featured service row and collapsed service rows.

This section should not repeat that accordion logic. It should feel more like an outcome board:
- fewer concepts, larger proof words
- less navigational, more declarative
- focused on client effect, not deliverable categories
- typographic proof list rather than service index

## Content

Visible label:
03 / Effekt

Working title:
What We Improve / Hva vi forbedrer

Possible display:
FUNNET
FORSTÅTT
VALGT
MÅLT

Outcome list:

01 FUNNET
Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.

02 FORSTÅTT
Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.

03 VALGT
CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.

04 MÅLT
Skjema, telefon, e-post og hendelser som kan spores fra start.

## Must include

- A visible label: 03 / Effekt.
- The four outcomes: FUNNET, FORSTÅTT, VALGT, MÅLT.
- The exact explanatory copy for each outcome.
- Real HTML text in the later build.
- Dark, premium visual tone.
- Large typography as the main focal point.
- A layout that works without images.
- A layout that works without JavaScript.
- Clear differentiation from Services / What We Build.

## Must not include

- cards
- card grid
- image gallery
- AI-generated images
- mockup images
- fake metrics
- testimonials
- case logos
- CTA block
- pricing
- service accordion repetition
- orange
- old prototype imports
- imported old styles.css
- imported old signature.css
- imported old main.js

## Motion

- One continuous pine signal rail connects all four outcomes.
- Each outcome becomes fully contrasted when the signal reaches it.
- SplitText measures the existing metadata words and distributes them across the row before gathering them into their final columns, adapted from MWG 097.
- All outcome text remains normal server-rendered HTML.
- No pin, image layer or horizontal section scroll.
- Reduced motion and no-JS keep the complete final layout.

## Static acceptance criteria

- Den føles tydelig annerledes enn Services.
- Den forklarer effekten av det Tigon bygger.
- Den bruker stor typografi og god spacing.
- Den fungerer uten bilder.
- Den fungerer uten JS.
- Den bruker ekte HTML text.
- Den ser premium ut uten motion.
- Ingen cards.
- Ingen orange.
- Ingen fake metrics.
- Ingen testimonials.
- Ingen case logos.
- Ingen CTA block.

## Files expected to change

For this contract pass:
- docs/sections/04-what-we-improve.md

For a later static implementation, after approval:
- src/app/page.tsx
- src/app/layout.tsx if new CSS import is needed
- src/components/WhatWeImprove.tsx
- src/styles/what-we-improve.css

Do not touch Header, Hero, Approach or What We Build files unless explicitly approved.

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
- whether Header/Hero/Approach/What We Build changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
