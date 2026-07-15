# Homepage SEO/CRO Contract

Status: preservation contract from 2026-06-30; current redesign link surface reconciled 2026-07-15
Scope: Forsiden `/` i Tigon-prosjektet. Dette er en bevaringskontrakt, ikke et designforslag. Ingen kode, metadata, schema, sitemap, robots, canonical, URL-er eller slugs skal endres med denne kontrakten som eneste mandat.

> Brand relationship, 2026-07-10: dette dokumentet beskytter SEO-/CRO-semantikk og eksisterende lenker. Det definerer ikke Tigons merkevareidé. Kanonisk branding ligger i `docs/tigon-brand-platform.md`.

## Kildegrunnlag lest

- `app/page.tsx`
- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `lib/url.ts`
- `lib/schema/entityContact.ts`
- `components/HomeClient.tsx`
- `components/Header.tsx`
- `components/MainFooter.tsx`
- `components/StickyCTA.tsx`
- `components/sections/HeroSkeleton.tsx`
- `components/sections/TerminalHero.tsx`
- `components/sections/IntroSection.tsx`
- `components/sections/ServicesSection.tsx`
- `components/sections/DecisionSection.tsx`
- `components/sections/PhilosophySection.tsx`
- `components/sections/WorkSection.tsx`
- `components/sections/ProcessSection.tsx`
- `components/sections/AktuelleProsjekterSection.tsx`
- `data/services.json`
- `data/projects.json`
- `docs/tigon-control-log-2026-06.md`

## H1 og hovedbudskap

Forsidens H1 er server-rendered i `HeroSkeleton` og gjentas i hydrert hero:

```text
Systemarkitektur for
nettsider, apper
og vekst.
```

Hovedbudskapet som må bevares:

```text
Tigon Studio bygger raske nettsider, webapper, mobilapper og digitale løsninger med tydelig struktur, teknisk SEO og måling fra start. Målet er enklere drift, bedre brukeropplevelse og flere relevante henvendelser.
```

Støttesignaler i første viewport:

- Eyebrow: `/// STRUKTUR // HASTIGHET // MÅLING`
- Primær CTA: `FÅ GRATIS ANALYSE →` til `/kontakt`
- Sekundær CTA: `Book en rask gjennomgang (15 min)` til `/kontakt?emne=Rask gjennomgang (15 min)`
- Statuslinje: `ANALYSE: KLAR // OSLO_READY`

Kontrakt:

- Det skal fortsatt finnes nøyaktig én tydelig H1 for forsiden.
- H1-intent skal fortsatt dekke nettsider, apper og vekst/systemarkitektur.
- Viktig H1/hero-intent skal ikke gjøres client-only.
- Kontaktvei fra første viewport skal bevares.

## Metadata, canonical og schema som ikke må røres

Root metadata i `app/layout.tsx` er global sidekontrakt og skal ikke endres av homepage-arbeid:

- Default title: `Tigon Studio | Digital infrastruktur i Oslo`
- Template: `%s | Tigon Studio`
- Description: `Tigon Studio er et spesialisert digitalt byrå i Oslo som bygger teknisk infrastruktur og AI-optimaliserte nettsider. Vi eier dataene – du eier markedet.`
- Keywords inkluderer blant annet `webutvikling`, `Oslo`, `Next.js 16`, `React 19`, `pSEO`, `AEO`, `Entity SEO`, `VVS markedsføring`
- OpenGraph: website, `nb_NO`, `Tigon Studio`, URL `/`, bilde `/og-image.jpg`
- Robots: `index: true`, `follow: true`, `max-video-preview: -1`, `max-image-preview: large`, `max-snippet: -1`
- Twitter card: `summary_large_image`
- Icons: `/favicon.webp`, `/favicon.ico`
- `metadataBase`: `NEXT_PUBLIC_SITE_URL` eller `https://www.tigon.no`

Forsidens metadata i `app/page.tsx`:

- `dynamic = "force-static"`
- Canonical: `alternates: { canonical: absoluteUrl("/") }`
- Canonical base kommer fra `lib/url.ts`, default `https://www.tigon.no`

Schema/JSON-LD som må bevares eller bevisst flyttes uten å bryte grafen:

- Root `ProfessionalService` i `app/layout.tsx`
  - `@id`: `https://www.tigon.no/#organization`
  - `name`: `Tigon Studio`
  - `alternateName`: `Tigon Digital Systems`
  - `url`: site root
  - `logo`: `/logo.png`
  - `image`: `/images/kontoret.webp`
  - `telephone`: `+47 417 60 149`
  - `priceRange`: `$$$`
  - `address`: `Lindeberg Næringsvei 20`, `1067`, `Oslo`, `NO`
  - `geo`: `59.932`, `10.869`
  - `sameAs`: `https://vvsvakt.no`, GitHub, LinkedIn, Instagram
  - `hasOfferCatalog`: `Next.js 16 Infrastruktur`, `Entity SEO & AEO`, `Digital Infrastruktur Audit Oslo`
- Homepage `VideoObject` array i `app/page.tsx`
  - `Tigon Studio – Digital vekstinfrastruktur`
  - `Tigon Studio – No Bullshit, Just Code: Vår Filosofi`
  - Video URLs peker mot `/videos/tigon-studio.webm`
  - Embed targets: `/#hero-video` og `/#philosophy-pin-wrapper`
  - Kommentar i koden sier at Organization/NAP skal ligge i root layout, ikke dupliseres på forsiden
- `ServicesSection` schema: `Service`, `serviceType: Web Development & pSEO`, provider `@id` til organisasjonsnoden
- `PhilosophySection` schema: `WebPageElement` med `ServiceChannel`
- `WorkSection` schema: `ItemList` for case studies
- `AktuelleProsjekterSection` schema: `ItemList` for regional/nasjonal struktur med publisher `@id` til organisasjonsnoden
- `AGGREGATE_REVIEW_COUNT = 127` i `lib/schema/entityContact.ts` brukes både i homepage JSON-LD/rating og proof-tekst; ikke desynk dette tallet uten egen målegrunn

Ikke rør i homepage-arbeid:

- `app/sitemap.ts`
- `app/robots.ts`
- `src/lib/seo/index-policy`
- canonical helpers i `lib/url.ts`
- organisasjonsfelt i `lib/schema/entityContact.ts`
- schema-`@id` for `/#organization`

## Nåværende seksjoner

Forsiden rendres via `HomeClient` i denne rekkefølgen:

1. `Header`
2. Hero: `HeroSlotClient` med `HeroSkeleton`, hydrert til `TerminalHero`
3. `IntroSection`
   - ID: `intro-pin-wrapper`
   - Semantikk: digitalt byrå Oslo, Next.js, teknisk SEO, moderne digital infrastruktur
4. `ServicesSection`
   - ID: `services-section`
   - Semantikk: hovedtjenester, tjenesteinternlenker, Service JSON-LD
5. `DecisionSection`
   - ID: `decision-section`
   - Semantikk: guider, pris, valg, problem/lead-intent, kontakt
6. `PhilosophySection`
   - ID: `philosophy-pin-wrapper`
   - Semantikk: metode/filosofi, WebPageElement JSON-LD, VideoObject embed-target
7. `WorkSection`
   - ID: `work-section`
   - Semantikk: case/proof, arkivlenker, ItemList JSON-LD
8. `ProcessSection`
   - ID: `process-pin-wrapper`
   - Semantikk: metode/prosess, audit-CTA
9. `AktuelleProsjekterSection`
   - ID: `national-regional-structure`
   - Semantikk: regionale lenker, Oslo-cluster, nasjonal/regional synlighet, ItemList JSON-LD
10. `MainFooter`
11. Globalt i layout: `StickyCTA`, `BackToTopButton`, `CookieConsent`, `NavigationTracker`

Merk:

- `StickyCTA` vises ikke på forsiden i dagens kode. Den returnerer kun innhold på regionale service-sider under `/tjenester/.../.../...`.
- `/#work-pin-wrapper` finnes som eldre arkivlenke i `app/arkiv/[slug]/ProjectTemplateClient.tsx`, mens aktiv homepage-ID er `work-section`. Ved senere homepage-endring må dette håndteres som ankerkompatibilitet, ikke ignoreres.

## Header og hovednavigasjon

Header-logo:

- Label: `Tigon Studio`
- URL: `/`
- Aria-label: `Tigon Studio – Next.js eksperter for raske digitale løsninger`

Hovedmeny-lenker:

- `Tjenester` -> `/tjenester`
- `Arkiv` -> `/arkiv`
- `Ressurser` -> `/ressurser`
- `Steder` -> `/steder`
- `Om oss` -> `/om-oss`
- `Kontakt` -> `/kontakt`

Meny-footer signaler:

- `Studio_Location`: `Oslo, Norway`
- `Current_Status`: `Available_for_Projects`
- Copyright: `© Tigon Studio {currentYear}`

## Alle service-lenker

Synlige service-/tjenestelenker fra forsiden:

- `/tjenester`
- `/tjenester/webutvikling-nextjs`
- `/tjenester/app-utvikling`
- `/tjenester/ai-implementering`
- `/tjenester/webutvikling-nextjs/oslo/oslo`
- `/tjenester/digital-infrastruktur`
- `/tjenester/ux-ui-design`
- `/tjenester/e-handel-losninger`
- `/tjenester/branding-identitet`
- `/tjenester/headless-cms`
- `/tjenester/some-markedsforing`
- `/tjenester/vedlikehold-sikkerhet`
- `/tjenester/seo-optimalisering`

Servicekort i `ServicesSection`:

- `Next.js Utvikling` -> `/tjenester/webutvikling-nextjs`
- `App-utvikling` -> `/tjenester/app-utvikling`
- `AI-Implementering` -> `/tjenester/ai-implementering`
- `Programmatic SEO` -> `/tjenester/webutvikling-nextjs/oslo/oslo`
- `Infrastruktur` -> `/tjenester/digital-infrastruktur`
- `Salgsdrevet Design` -> `/tjenester/webutvikling-nextjs`

Direkte capability-lenker i `04 / Arbeid` / `WorkProof`:

- `Webapp` -> `/tjenester/custom-software`
- `Nettsted` -> `/tjenester/webutvikling-nextjs`
- `Plattform` -> `/hva-koster-digital-plattform`
- `E-handel` -> `/tjenester/e-handel-losninger`
- `AI` -> `/tjenester/ai-implementering`
- `App` -> `/tjenester/app-utvikling`

Hele capability-flaten er den ene tilgjengelige lenken. Ikke legg en dialog, ekstra CTA-lenke eller nestet lenke over samme flate. Redesign-checkouten monterer bare forsiden; mål-rutene eies av den komplette TGN-applikasjonen og skal ikke omdøpes her.

Utvidet tjenesteoversikt:

- `UX/UI Design` -> `/tjenester/ux-ui-design`
- `E-handel` -> `/tjenester/e-handel-losninger`
- `Branding` -> `/tjenester/branding-identitet`
- `Headless CMS` -> `/tjenester/headless-cms`
- `Algoritmisk Vekst` -> `/tjenester/some-markedsforing`
- `Vedlikehold` -> `/tjenester/vedlikehold-sikkerhet`

Footer-tjenester:

- `Webutvikling Next.js` -> `/tjenester/webutvikling-nextjs`
- `App-utvikling` -> `/tjenester/app-utvikling`
- `E-handel` -> `/tjenester/e-handel-losninger`
- `Teknisk SEO` -> `/tjenester/seo-optimalisering`

Aktive service-slugs fra `data/services.json` og sitemap-generering. Ikke rename uten egen URL-migrering:

- `/tjenester/some-markedsforing`
- `/tjenester/webutvikling-nextjs`
- `/tjenester/app-utvikling`
- `/tjenester/ux-ui-design`
- `/tjenester/seo-optimalisering`
- `/tjenester/e-handel-losninger`
- `/tjenester/branding-identitet`
- `/tjenester/digital-strategi`
- `/tjenester/konverteringsoptimalisering`
- `/tjenester/vedlikehold-sikkerhet`
- `/tjenester/ai-integrasjon`
- `/tjenester/ai-implementering`
- `/tjenester/digital-infrastruktur`
- `/tjenester/pseo-dominans`
- `/tjenester/headless-cms`
- `/tjenester/custom-software`

## Alle case-/arkivlenker

Synlige homepage case-/arkivlenker:

- `VVSvakt.no` -> `/arkiv/vvsvakt-no`
- `Minhud.no` -> `/arkiv/minhud-no`
- `Saneringsvakt.no` -> `/arkiv/saneringsvakt-no`
- `Utforsk_Rapporter` / `Prosjektarkiv` / `Arkiv` -> `/arkiv`

Prosjekt-slugs fra `data/projects.json` og sitemap-generering. Ikke rename uten egen URL-migrering:

- `/arkiv/vvsvakt-no`
- `/arkiv/minhud-no`
- `/arkiv/saneringsvakt-no`
- `/arkiv/oslo-infra-mapping`
- `/arkiv/fintech-dominance`
- `/arkiv/lokalpriser-no`

## Alle lokale og regionale lenker

Steds-/regionhub:

- `/steder`

Regionale webutvikling-lenker fra regionalseksjon og footer:

- `Oslo` / `Webutvikling Oslo` -> `/tjenester/webutvikling-nextjs/oslo/oslo`
- `Bergen` / `Webutvikling Bergen` -> `/tjenester/webutvikling-nextjs/vestland/bergen`
- `Trondheim` / `Webutvikling Trondheim` -> `/tjenester/webutvikling-nextjs/trondelag/trondheim`
- `Stavanger` / `Webutvikling Stavanger` -> `/tjenester/webutvikling-nextjs/rogaland/stavanger`

Oslo-cluster, SEO visibility:

- `SEO i Oslo` -> `/tjenester/seo-optimalisering/oslo/oslo`
- `SEO i Frogner` -> `/tjenester/seo-optimalisering/oslo/frogner`
- `SEO i Majorstuen` -> `/tjenester/seo-optimalisering/oslo/majorstuen`
- `SEO i Bærum` -> `/tjenester/seo-optimalisering/akershus/baerum`
- `SEO i Asker` -> `/tjenester/seo-optimalisering/akershus/asker`

Oslo-cluster, dev architecture:

- `Webutvikling i Oslo` -> `/tjenester/webutvikling-nextjs/oslo/oslo`
- `Webutvikling i Frogner` -> `/tjenester/webutvikling-nextjs/oslo/frogner`
- `Webutvikling i Majorstuen` -> `/tjenester/webutvikling-nextjs/oslo/majorstuen`
- `App-utvikling i Oslo` -> `/tjenester/app-utvikling/oslo/oslo`
- `App-utvikling i Bærum` -> `/tjenester/app-utvikling/akershus/baerum`

Kontrakt:

- Regionale lenker skal bevares eller få dokumentert erstatning før de flyttes.
- Ikke innfør nye regionale/PSEO-sider fra homepage-arbeid.
- Ikke endre regional URL-struktur `/tjenester/[service]/[county]/[city]`.

## Alle ressurslenker

Synlige resource-/guide-lenker fra forsiden:

- `Ressurser` / `Se alle guider` -> `/ressurser`
- `Hva koster en nettside?` -> `/hva-koster-nettside`
- `Nettside eller webapp?` -> `/nettside-eller-webapp`
- `Hvorfor får nettsiden ingen leads?` -> `/hvorfor-far-nettsiden-ingen-leads`
- `Hva koster digital plattform?` -> `/hva-koster-digital-plattform`
- `Mobilapp eller webapp?` -> `/mobilapp-eller-webapp`
- `Next.js vs WordPress` -> `/nextjs-vs-wordpress`

Ressurs-URL-er fra ressursindeksen og sitemap som også må regnes som URL-kontrakt:

- `/hva-koster-app-utvikling`
- `/hva-koster-webapp`
- `/hva-koster-nettside`
- `/hva-koster-digital-plattform`
- `/hva-koster-app-utvikling-oslo`
- `/hva-koster-nettside-oslo`
- `/hva-koster-nettbutikk`
- `/hva-koster-cro`
- `/hva-koster-seo`
- `/hva-koster-ai-integrasjon`
- `/mobilapp-eller-webapp`
- `/nettside-eller-webapp`
- `/nextjs-vs-wordpress`
- `/hvorfor-far-nettsiden-ingen-leads`
- `/webutvikling-oslo-sjekkliste`
- `/hvor-lang-tid-tar-det-a-lage-app`
- `/hva-bor-vaere-klart-for-apputvikling`
- `/mvp-app-utvikling`
- `/bankid-vipps-integrasjon-kostnad`
- `/woocommerce-vs-custom-nettbutikk`

## CTA-er

Homepage CTA-er som må bevares:

- Hero primær: `FÅ GRATIS ANALYSE →` -> `/kontakt`
- Hero sekundær: `Book en rask gjennomgang (15 min)` -> `/kontakt?emne=Rask gjennomgang (15 min)`
- Servicekort: `AKSJONSPLAN` -> servicekortets URL
- Decisionkort: `ÅPNE_GUIDE` -> guidekortets URL
- Decision footer: `Se alle guider →` -> `/ressurser`
- Decision footer: `Eller hopp over → snakk med oss direkte` -> `/kontakt?ref=decision_framework`
- Philosophy: `Se hvordan vi jobber` -> `/tjenester`
- Casekort: `OPEN_DOSSIER` -> casekortets arkiv-URL
- Work CTA: `Utforsk_Rapporter` -> `/arkiv`
- Process CTA: `Bestill_Teknisk_Audit >>>` -> `/kontakt?ref=process_methodology`
- Regionalkort: `Åpne oversikt` -> regional URL
- Footer CTA: `Få gratis analyse` -> `/kontakt`

Global CTA som ikke er aktiv på forsiden:

- `StickyCTA`: `Start →` -> `#analyze`, men kun på regionale service-sider. Ikke bruk den som dokumentasjon på en aktiv homepage CTA.

## Footer, kontakt og org-info

Footer CTA:

- Heading: `Klar for en konkret vurdering?`
- CTA: `Få gratis analyse` -> `/kontakt`

Footer navigasjon:

- `Prosjektarkiv` -> `/arkiv`
- `Tjenester` -> `/tjenester`
- `Om oss` -> `/om-oss`
- `Steder` -> `/steder`
- `Kontakt` -> `/kontakt`
- `Vilkår` -> `/vilkar`
- `Juridisk` -> `/vilkar`

Kontaktinfo synlig i footer:

- `Tigon Studio AS`
- `Lindeberg Næringsvei 20`
- `1067 Oslo, NO`
- Telefon: `+47 41 76 01 49`
- Telefonlink: `tel:+4741760149`
- E-post: `hello@tigon.no`
- E-postlink: `mailto:hello@tigon.no`
- Copyright: `© 2026 Tigon Studio AS`

Org-info i schema source of truth:

- `ORG_NAME`: `Tigon Studio`
- `TELEPHONE`: `+47 417 60 149`
- `STREET_ADDRESS`: `Lindeberg Næringsvei 20`
- `POSTAL_CODE`: `1067`
- `ADDRESS_LOCALITY`: `Oslo`
- `ADDRESS_COUNTRY`: `NO`
- `PRICE_RANGE`: `$$$`
- `getOrgId()`: `https://www.tigon.no/#organization`

Kontrakt:

- Footer NAP, telefon og e-post skal bevares.
- Synlig footer-NAP og schema-NAP skal ikke splittes til ulike sannheter uten egen NAP-review.
- Ikke dupliser Organization/NAP-node på forsiden; bruk root `ProfessionalService`/`@id`.

## URL-er som ikke må endres

Core:

- `/`
- `/tjenester`
- `/arkiv`
- `/ressurser`
- `/steder`
- `/om-oss`
- `/kontakt`
- `/vilkar`

Kontakt/query-URL-er:

- `/kontakt`
- `/kontakt?emne=Rask gjennomgang (15 min)`
- `/kontakt?ref=decision_framework`
- `/kontakt?ref=process_methodology`

Ankere:

- `#hero-video`
- `#philosophy-pin-wrapper`
- `#work-section`
- `#work-pin-wrapper` må håndteres som eldre inbound anchor fra arkivmalen selv om seksjonen i dag heter `work-section`
- `#analyze` er regionalt analyseanker, ikke aktiv homepage-seksjon

Service, case, regionale og ressurs-URL-er:

- Alle URL-er listet i seksjonene `Alle service-lenker`, `Alle case-/arkivlenker`, `Alle lokale og regionale lenker` og `Alle ressurslenker`.

Tekniske URL-kontrakter:

- Sitemap skal fortsatt publiseres på `/sitemap.xml`
- Video sitemap skal fortsatt publiseres på `/sitemap-video.xml`
- Robots skal fortsatt peke til begge sitemap-URL-er
- AI-data allow i robots: `/api/ai-data`
- Ikke endre technical disallow-list i robots fra homepage-arbeid

## Minimum QA ved senere homepage-endring

- `git diff -- app/page.tsx app/layout.tsx app/sitemap.ts app/robots.ts lib/url.ts lib/schema/entityContact.ts` skal vise ingen utilsiktede endringer.
- Bekreft én H1 på `/`, og at H1 ikke bare finnes etter klient-hydrering.
- Bekreft canonical for `/` er `https://www.tigon.no/` via `absoluteUrl("/")`.
- Bekreft `ProfessionalService` `@id` fortsatt er `https://www.tigon.no/#organization`.
- Bekreft `VideoObject`, `Service`, `WebPageElement` og begge `ItemList`-schemaene enten finnes eller er eksplisitt rehomed uten URL-/`@id`-brudd.
- Bekreft alle lenker i denne kontrakten fortsatt finnes, eller at flytting er dokumentert før endring.
- Bekreft footer NAP, telefon og e-post fortsatt er synlig.
- Bekreft `app/sitemap.ts`, `app/robots.ts`, index-policy og regionale templates ikke er rørt.
