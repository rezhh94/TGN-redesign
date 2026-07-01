# 03 / What We Build / Hva vi bygger

Before coding this section, this contract must be approved.

## Section name

03 / What We Build / Hva vi bygger

## Role in page journey

This is the first concrete service section after Hero and Approach.

It should show what Tigon actually builds, without becoming a generic services grid or a SaaS-style module.

## One idea

Tigon bygger digitale løsninger som blir funnet, forstått og brukt.

## Focal point

The first thing the user should notice is a structured dark service index:
- a clear section label
- a concise heading
- large service rows
- thin separators
- enough detail to make the services concrete

## Tone

Dark, premium, structured and concrete.

The section should feel more navigable and content-rich than Approach, but still restrained and editorial.

## Layout archetype

Dark service-index / structured service list.

Suggested static layout:
- dark graphite / near-black background
- off-white text
- muted gray supporting text
- thin separator lines
- large service rows
- numbering in CalebMono
- service titles in large, clean typography
- supporting text in JUSTSans

## Why this layout is different from the previous section

Approach is a sparse typographic bridge with one short idea.

This section should introduce concrete paths and make the page more useful:
- more rows and information density
- clearer scan structure
- service names and descriptions
- navigational affordance later, without becoming a card grid

It must still preserve the dark, restrained Tigon tone.

## Content

Visible label:
02 / Hva vi bygger

H2:
Hva vi bygger

Optional display phrase:
Digitale løsninger

Intro:
Nettsider, apper og systemer med struktur, fart, søkbarhet og måling fra start.

Service rows:

01 Nettsider
Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.

02 Webapper
Portaler, dashboards og digitale verktøy bygget for reell arbeidsflyt.

03 Apper
App-løsninger for mobil og web når produktet må være mer enn en nettside.

04 AI-systemer
Automatisering, søk, assistenter og interne workflows koblet til ekte data.

05 SEO & AI-søk
Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.

Links:
Service rows should later become real server-rendered `<a>` links to relevant service URLs when the URL structure is clarified.

In the first static test, href values may be placeholders or links may wait until final URLs are decided.

## Must include

- Real HTML text for all service names and descriptions.
- A visible label: 02 / Hva vi bygger.
- H2: Hva vi bygger.
- The five service rows listed in this contract.
- Dark graphite / near-black background in the first test.
- Off-white primary text and muted gray supporting text.
- Thin separator lines.
- CalebMono numbering.
- JUSTSans supporting text.
- Server-rendered links later when service URLs are clarified.
- A layout that works without images.
- A layout that works without JavaScript.

## Must not include

- card grid
- 4 equal cards
- image gallery
- AI-generated images
- mockup images
- cursor-follow image
- stacking cards in first build
- CTA block
- pricing
- method rail
- orange
- GSAP or motion in first build
- old prototype imports
- imported old styles.css
- imported old signature.css
- imported old main.js

## Motion plan

No motion in the first build.

Future motion ideas:
- row reveal
- separator lines draw in
- active row dim/highlight
- possible hover state
- possible preview panel later, but not image-based in the first build

No pin in the first motion pass.

## Static acceptance criteria

- Seksjonen er tydelig annerledes enn Approach.
- Den føles mer konkret og navigerbar.
- Den fungerer uten bilder.
- Den bruker ekte HTML text.
- Den fungerer uten JS.
- Den ser premium ut uten motion.
- Ingen cards.
- Ingen orange.
- Ingen image assets.
- Ingen service mockups.
- Ingen CTA block.
- Ingen method rail.

## Files expected to change

For this contract pass:
- docs/sections/03-what-we-build.md

For a later static implementation, after approval:
- src/app/page.tsx
- src/app/layout.tsx if new CSS import is needed
- src/components/WhatWeBuild.tsx
- src/styles/what-we-build.css

Do not touch Header, Hero or Approach files unless explicitly approved.

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
- whether Header/Hero/Approach changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
