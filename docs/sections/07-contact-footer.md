# 07 / Contact Footer / Kontakt

Before coding this section, this contract must be approved.

## Section name

07 / Contact Footer / Kontakt

Visible label:
06 / Kontakt

Internal order:
This is the final main page block after 05 / Prosess. The visible section numbering on the page is 06 / Kontakt.

## Role in page journey

This section is a closing CTA hero and premium footer index.

It should bookend the Hero and end the journey with a strong, memorable contact section.

It should create a clear contact path while preserving important SEO/CRO links in a compact, intentional way.

It must not become a small normal footer, a large SEO section or a generic SaaS footer.

## One idea

Hvis prosjektet er uklart, starter vi med å gjøre neste steg tydelig.

## Focal point

The first thing the user should notice is a large, memorable closing statement.

The contact action should feel like the natural next step after that statement.

The footer index should support the close, not compete with it.

## Tone

Dark, calm, premium, editorial and safe.

The section should echo the Hero as a closing moment, but feel more direct and action-oriented.

## Layout archetype

Dark closing hero + premium footer index.

Suggested static layout:
- near-black background
- large TGSPerfect closing statement
- JUSTSans lead/body
- CalebMono labels/metadata
- large calm CTA zone
- one clear primary CTA
- smaller secondary CTA
- oversized email/contact may be used as a premium focal element
- compact footer index at the bottom as editorial metadata
- services, work, resources, places and contact/NAP links
- no cards
- no icons
- no contact form in first build
- no orange

## Why this layout is different from the previous section

Prosess is an operational production-flow section with layered workflow surfaces.

Kontakt should close the page:
- less workflow-led
- more direct, memorable and conversion-led
- footer-index instead of stacked surfaces
- contact/NAP and key links without turning into an SEO link farm
- bookends the Hero, but with a clear final action

## Content

Visible label:
06 / Kontakt

Hovedstatement:
SEND OSS
NOE UKLART.

Lead:
Vi gjør det tydeligere. Fortell kort hva du vurderer å bygge, så svarer vi med hva som bør gjøres først.

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
- Closing statement should use TGSPerfect / display type.
- Lead/body/footer links should use JUSTSans.
- Labels and metadata should use CalebMono.
- Footer-index should feel like editorial metadata, not a giant SEO link farm.

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
- footer links underline reveal
- no pin

## Static acceptance criteria

- Avslutter siden tydelig med en sterk closing hero.
- Har premium closing-feeling, ikke vanlig liten footer.
- Bevarer kontaktvei og NAP.
- Bevarer viktige tjeneste-, case-, ressurs- og stedlenker i en kompakt footer-index.
- Footer-index føles som editorial metadata, ikke link farm.
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
