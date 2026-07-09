# 07 / Contact Footer / Kontakt

> Placement update, 2026-07-09: the active Contact/Footer follows `SystemManifesto`, after 05 / Prosess. The section itself remains preserved as a quiet closing section; its NAP and important links were not changed in the latest revision.

Before coding this section, this contract must be approved.

Revision note (2026-07-02):
This contract is revised after the static design audit of the built first version.
The first static build preserved all content requirements but is not approved.
The audit found concrete weaknesses in the CTA zone, the closing composition,
the footer index presentation and the wordmark motif. This revision tightens
the design direction for a second static pass. Content requirements are unchanged.

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

## Audit findings driving this revision

From the static audit of the first build (desktop 1440px):

- The two CTA pills stacked vertically with different widths and read as
  unfinished, not composed. Cause: the actions column was locked to a narrow
  grid track while the pills flex-wrapped.
- The closing block forced height via min-height (up to 92svh) without content
  to fill it, leaving dead vertical air between the lead and the contact zone.
- The footer index used standard four-column footer grammar (mono column title
  + plain vertical link lists). It read as a normal SaaS footer. The Steder
  column with four "Webutvikling X" links in a row read as SEO farm even
  though the links are legitimate.
- The ghost wordmark at the bottom duplicated the ghost "TIGON" motif already
  used in 04 / Arbeid, weakening both.

## Redesign direction (contract clarifications)

### 1. CTA system

- The CTAs must not stack accidentally on desktop.
- Primary and secondary CTA must sit as a deliberate CTA row or a clear
  compositional pair. Their alignment, spacing and relative widths must look
  authored at all desktop widths.
- The primary CTA must visually match the hero/page CTA system.
- The secondary CTA must be calmer than the primary, but must not look like a
  default outline button. It needs its own considered treatment within the
  page's design language.

### 2. Closing composition

- The closing block must not contain dead vertical air. Height must come from
  content and composition, not from a forced min-height.
- Email/phone may be used as a large contact focal element in the closing.
- hello@tigon.no must feel like a premium contact surface — a designed focal
  moment — not just NAP text.

### 3. Footer index

- The footer index must not look like a normal SaaS footer or a link farm.
- All links must be preserved, but presented as editorial index/metadata:
  something that reads as part of the page's editorial language (index,
  ledger, numbered register or similar), not as generic footer columns.
- The Steder links must be typographically subdued/structured so they do not
  read as an SEO farm.
- The footer index must support the closing, not compete with it.

### 4. Wordmark

- Do not reuse the same ghost-wordmark trick as Work Showcase if it makes the
  page expression repetitive.
- Either the footer wordmark is a clear, intentional bookend of the Hero, or
  the ghost wordmark is toned down or removed.

## SEO contract reference

docs/homepage-seo-contract.md (dated 2026-06-30) is a preservation contract for
the live tigon.no homepage. It appeared in the repo after the first build of
this section and is now the reference for which links/NAP the live site
carries. It documents the live site's old component structure, so it maps to
the redesign only at the content/URL level.

Confirmed by that contract and already covered here:
- Footer NAP, phone and email (identical values).
- Primary CTA `Få gratis analyse` -> /kontakt and secondary
  `Book en rask gjennomgang (15 min)` -> /kontakt?emne=Rask gjennomgang (15 min).
- The regional Webutvikling links (Oslo/Bergen/Trondheim/Stavanger), case links
  and the resource links listed in Content below.

Open deltas — live homepage links NOT in this footer index. Decision needed
(re-home to footer index, cover via hub pages like /ressurser and /steder, or
document the omission) before the redesign replaces the live page. Do not add
them unilaterally in the static build:
- `Vilkår`/`Juridisk` -> /vilkar (live footer navigation)
- `Om oss` -> /om-oss and `Kontakt` -> /kontakt (live footer navigation; in the
  redesign these live in the header)
- Resource links visible on live homepage but not here:
  `Hva koster digital plattform?` -> /hva-koster-digital-plattform,
  `Mobilapp eller webapp?` -> /mobilapp-eller-webapp
- The Oslo-cluster SEO/dev/app links (Frogner, Majorstuen, Bærum, Asker) from
  the live regional section — these belong to a homepage-level decision, not
  necessarily the footer.

This section's contract does not change metadata, schema, canonical, sitemap,
robots or URL structure. Those are governed by docs/homepage-seo-contract.md.

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
- CTA row/pair composed per the CTA system clarification above.
- Closing composition without dead vertical air.

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
- accidental CTA stacking on desktop
- forced min-height that creates empty vertical space
- default-looking outline button as secondary CTA
- a ghost wordmark that repeats the Work Showcase motif unchanged

## Motion plan

No motion in the first build.

Future motion idea:
- closing statement line-mask reveal
- CTA hover microinteraction
- footer links underline reveal
- no pin

## Static acceptance criteria

Contact/Footer is not approved until all of the following hold:

- CTA-sonen føles ferdig: primary og secondary ligger som en bevisst rad/pair,
  uten tilfeldig stacking eller ulik bredde på desktop.
- Footer-index føles ikke billig: den leser som editorial index/metadata,
  ikke som vanlig SaaS-footer eller link farm.
- Steder-lenkene er typografisk dempet/strukturert og leser ikke som SEO-farm.
- NAP og samtlige footer-index-lenker er bevart som server-rendrede lenker.
- Closing føles som en premium avslutning: ingen død vertikal luft,
  hello@tigon.no fungerer som premium kontaktflate.
- Wordmark-valget er bevisst: tydelig bookend eller nedtonet/fjernet ghost.
- Avslutter siden tydelig med en sterk closing hero.
- Har premium closing-feeling, ikke vanlig liten footer.
- Fungerer uten JS.
- Ser premium ut statisk.
- Ingen cards.
- Ingen orange.

## Files expected to change

For this contract pass:
- docs/sections/07-contact-footer.md

For later static implementation:
- src/components/ContactFooter.tsx
- src/styles/contact-footer.css

Do not touch existing sections, page.tsx or layout.tsx unless explicitly approved.

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
