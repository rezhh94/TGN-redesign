# 07 / Contact Footer / Kontakt

Before coding this section, this contract must be approved.

## Section name

07 / Contact Footer / Kontakt

Visible label:
06 / Kontakt

Internal order:
This is the final main page block after 05 / Prosess. The visible section numbering on the page is 06 / Kontakt.

## Role in page journey

This section is the closing CTA and premium footer index.

It should end the journey with a clear contact path while preserving important SEO/CRO links in a compact, intentional way.

It must not become a large SEO section or generic SaaS footer.

## One idea

Hvis prosjektet er uklart, starter vi med å gjøre neste steg tydelig.

## Focal point

The first thing the user should notice is a calm closing statement with a clear primary contact action.

The footer index should support the close, not compete with it.

## Tone

Dark, calm, premium, editorial and safe.

The section should echo the Hero as a closing moment, but feel quieter and more action-oriented.

## Layout archetype

Dark closing statement + footer index.

Suggested static layout:
- near-black background
- large calm JUSTSans closing statement
- short lead
- one clear primary CTA
- smaller secondary CTA
- compact footer index at the bottom
- services, work, resources, places and contact/NAP links
- no cards
- no icons
- no contact form in first build
- no orange

## Why this layout is different from the previous section

Prosess is an operational production-flow section with layered workflow surfaces.

Kontakt should close the page:
- less workflow-led
- more direct and conversion-led
- footer-index instead of stacked surfaces
- contact/NAP and key links without turning into an SEO link farm
- calmer than Hero, but with a clear final action

## Content

Visible label:
06 / Kontakt

Hovedstatement:
Har du et prosjekt
som må bli tydeligere?

Lead:
Fortell kort hva du vurderer å bygge. Så svarer vi med hva som bør gjøres først.

CTA:

Primary:
Få gratis analyse -> /kontakt

Secondary:
Book 15 min -> /kontakt?emne=Rask gjennomgang (15 min)

Footer index:

Tjenester:
- Nettsider -> /tjenester/webutvikling-nextjs
- Webapper -> /tjenester/custom-software
- Apper -> /tjenester/app-utvikling
- AI-systemer -> /tjenester/ai-implementering
- SEO & AI-søk -> /tjenester/seo-optimalisering

Arbeid:
- Arkiv -> /arkiv
- VVSvakt.no -> /arkiv/vvsvakt-no
- Minhud.no -> /arkiv/minhud-no
- Saneringsvakt.no -> /arkiv/saneringsvakt-no

Ressurser:
- Ressurser -> /ressurser
- Hva koster en nettside? -> /hva-koster-nettside
- Nettside eller webapp? -> /nettside-eller-webapp
- Next.js vs WordPress -> /nextjs-vs-wordpress
- Hvorfor får nettsiden ingen leads? -> /hvorfor-far-nettsiden-ingen-leads

Steder:
- Steder -> /steder
- Webutvikling Oslo -> /tjenester/webutvikling-nextjs/oslo/oslo
- Webutvikling Bergen -> /tjenester/webutvikling-nextjs/vestland/bergen
- Webutvikling Trondheim -> /tjenester/webutvikling-nextjs/trondelag/trondheim
- Webutvikling Stavanger -> /tjenester/webutvikling-nextjs/rogaland/stavanger

Kontakt/NAP:
- Tigon Studio AS
- Lindeberg Næringsvei 20
- 1067 Oslo, NO
- hello@tigon.no -> mailto:hello@tigon.no
- +47 41 76 01 49 -> tel:+4741760149
- © 2026 Tigon Studio AS

## Must include

- A visible label: 06 / Kontakt.
- The approved statement and lead.
- One primary CTA to /kontakt.
- One secondary CTA to /kontakt?emne=Rask gjennomgang (15 min).
- Footer-index groups for Tjenester, Arbeid, Ressurser, Steder and Kontakt/NAP.
- Real HTML text and server-rendered links in implementation.
- NAP details:
  - Tigon Studio AS
  - Lindeberg Næringsvei 20
  - 1067 Oslo, NO
  - hello@tigon.no
  - +47 41 76 01 49
  - © 2026 Tigon Studio AS
- Layout that works without JavaScript.
- Clear differentiation from Prosess, Arbeid, Effekt and Tjenester.

## Must not include

- generic SaaS footer
- giant SEO link farm
- cards
- contact form in first build
- icons
- orange
- GSAP or motion in first build
- old prototype imports
- imported old styles.css
- imported old signature.css
- imported old main.js

## Motion plan

No motion in the first build.

Future motion idea:
- closing statement line-mask reveal
- CTA hover microinteraction
- footer links subtle underline reveal
- possible oversized wordmark / exhale later
- no pin

## Static acceptance criteria

- Avslutter siden tydelig.
- Har premium closing-feeling, ikke vanlig footer.
- Bevarer kontaktvei og NAP.
- Bevarer viktige tjeneste-, case-, ressurs- og stedlenker i en kompakt footer-index.
- Fungerer uten JS.
- Ser premium ut statisk.
- Ingen cards.
- Ingen orange.

## Files expected to change

For this contract pass:
- docs/sections/07-contact-footer.md

For later static implementation:
- src/app/page.tsx
- src/app/layout.tsx if new CSS import is needed
- src/components/ContactFooter.tsx
- src/styles/contact-footer.css

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
