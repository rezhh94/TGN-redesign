# 05 / Proof Ledger / Bevis

Before coding this section, this contract must be approved.

## Section name

05 / Proof Ledger / Bevis

Visible label:
04 / Bevis

Internal order:
This is the next visible page block after What We Improve / Effekt. The internal file number is 05, but the visible section numbering on the page is 04 / Bevis.

## Role in page journey

This section comes after the first four dark typographic sections.

It should create a controlled rhythm break: a light / off-white proof sheet that explains why Tigon's promises are credible.

The section should show that Tigon builds with a technical foundation, searchable structure and measurable contact paths.

## One idea

Tigon selger ikke bare løfter. Tigon bygger systemer som kan forklares, finnes og måles.

## Focal point

The first thing the user should notice is a calm editorial proof statement:

Ikke løfter.
Systemer.

The proof ledger should support that statement with three concrete proof lines.

## Tone

Light / off-white, controlled, editorial and proof-led.

The section should feel calm, precise and systematic. It should be a tonal shift from the dark Effect section without becoming generic, corporate or SaaS-like.

## Layout archetype

Light editorial proof sheet / proof ledger.

Suggested static layout:
- off-white / light warm background
- dark charcoal text
- asymmetrical split
- large, calm JUSTSans statement
- proof ledger with thin lines
- label and numbering in CalebMono
- proof text in JUSTSans
- generous spacing
- no cards
- no icons
- no images

## Why this layout is different from the previous section

Effect is a dark typographic outcome map.

This section should break the rhythm with a light proof sheet:
- light tonal value instead of dark
- system proof instead of outcome words
- ledger structure instead of canvas composition
- quieter statement typography instead of large TGSPerfect outcome words

It must not become another service section, process section or benefits grid.

## Content

Visible label:
04 / Bevis

Hovedstatement:
Ikke løfter.
Systemer.

Lead:
Alt vi bygger må kunne forklares, finnes og måles — før det får bevegelse.

Proof ledger:

01 Teknisk grunnmur
Rask struktur, ryddig kodebase, server-rendered innhold og et fundament som tåler videre utvikling.

02 Søkbar struktur
Tjenester, innhold og internlenker bygget slik at siden kan forstås av Google, AI-søk og mennesker.

03 Målbar kontaktvei
Skjema, telefon, e-post og hendelser satt opp slik at trafikk kan kobles til faktiske leads.

## Must include

- A visible label: 04 / Bevis.
- Hovedstatement: Ikke løfter. Systemer.
- The lead copy exactly as approved.
- The three proof ledger items and their descriptions.
- Real HTML text in the later build.
- A controlled light / off-white tonal shift.
- Dark charcoal primary text.
- A large, calm JUSTSans statement.
- A proof ledger with thin lines.
- A layout that works without images.
- A layout that works without JavaScript.
- Clear differentiation from Effect and Services.

## Must not include

- cards
- card grid
- icons
- image gallery
- AI-generated images
- mockup images
- fake metrics
- testimonials
- case logos
- CTA block
- pricing
- process rail
- orange
- GSAP or motion in first build
- old prototype imports
- imported old styles.css
- imported old signature.css
- imported old main.js

## Motion plan

No motion in the first build.

Future motion ideas:
- light sheet handoff from the dark Effect section
- line-mask reveal on statement
- ledger lines draw in
- active proof-row highlight

No pin in the first motion pass.

## Static acceptance criteria

- Den gir et tydelig rytmebrudd etter de mørke seksjonene.
- Den føles som bevis/system, ikke services/prosess.
- Den bruker stor rolig typografi og god spacing.
- Den fungerer uten bilder.
- Den fungerer uten JS.
- Den bruker ekte HTML text.
- Den ser premium ut statisk.
- Ingen cards.
- Ingen orange.
- Ingen mockups.
- Ingen fake metrics.
- Ingen testimonials.
- Ingen CTA block.

## Files expected to change

For this contract pass:
- docs/sections/05-proof-ledger.md

For a later static implementation, after approval:
- src/app/page.tsx
- src/app/layout.tsx if new CSS import is needed
- src/components/ProofLedger.tsx
- src/styles/proof-ledger.css

Do not touch Header, Hero, Approach, What We Build or What We Improve files unless explicitly approved.

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
- whether existing sections changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
