# Tigon Tjenester truth table

Dato: 2026-07-10
Status: P0 URL- og innholdskart; sikre href-rettinger implementert
Scope: homepage Tjenester, servicehref-er og bevaringsdekning
Kun verifiserte href-er i `WhatWeBuild.tsx` er rettet. Ingen layout-, CSS-, copy- eller motion-endring er gjort.

## Implementert 2026-07-10

- Webapper: `/tjenester` → `/tjenester/custom-software`
- SEO & AI-søk: `/tjenester` → `/tjenester/seo-optimalisering`
- Webapper i register: `/tjenester` → `/tjenester/custom-software`
- Headless CMS: direkte lenke til `/tjenester/headless-cms`
- UX/UI-design: direkte lenke til `/tjenester/ux-ui-design`
- Vedlikehold & sikkerhet: direkte lenke til `/tjenester/vedlikehold-sikkerhet`
- Teknisk SEO: direkte lenke til `/tjenester/seo-optimalisering`

Fortsatt uavklart og derfor ikke endret:

- `Integrasjoner` versus `AI-integrasjoner`
- `Måling` versus `CRO & måling`
- Branding & identitet på homepage
- Algoritmisk markedsføring på homepage
- separat lokal synlighet-lenke
- AI-systemer-posisjonering mellom implementering og integrasjon
- ugyldig Hero-ID `seo-ai-sok` — beskyttet Hero, separat patch kreves

## Kilder kontrollert

Fable/redesign:

- `src/components/WhatWeBuild.tsx`
- `src/components/Hero.tsx`
- `src/components/ContactFooter.tsx`
- `docs/homepage-seo-contract.md`
- `docs/sections/03-what-we-build.md`

Hovedrepo:

- `/Users/reezy/Konsepter/TGN-redesign`
- branch: `feature/port-fable-homepage-direction`
- status ved kontroll: ren

Live/integrasjonsrepo:

- `/Users/reezy/developer/TGN-Next`
- branch: `chore/gsc-queue-indexing-tools`
- status ved kontroll: ren
- `data/services.json`
- `app/tjenester/[service]/page.tsx`
- `app/tjenester/[service]/[county]/[city]/page.tsx`
- `app/sitemap.ts`
- `components/sections/ServicesSection.tsx`

## Hva som er teknisk bevist

TGN-Next genererer hovedtjenestesider fra nøklene i `data/services.json`. Ukjent service-ID ender i `notFound()`.

Disse hovedrutene finnes og genereres i sitemap:

- `/tjenester/ai-implementering`
- `/tjenester/ai-integrasjon`
- `/tjenester/app-utvikling`
- `/tjenester/branding-identitet`
- `/tjenester/custom-software`
- `/tjenester/digital-infrastruktur`
- `/tjenester/digital-strategi`
- `/tjenester/e-handel-losninger`
- `/tjenester/headless-cms`
- `/tjenester/konverteringsoptimalisering`
- `/tjenester/pseo-dominans`
- `/tjenester/seo-optimalisering`
- `/tjenester/some-markedsforing`
- `/tjenester/ux-ui-design`
- `/tjenester/vedlikehold-sikkerhet`
- `/tjenester/webutvikling-nextjs`

## Hovedrader i Tjenester

| Synlig tjeneste | Nåværende mål i `WhatWeBuild` | Verifisert mål | Status | Beslutning |
|---|---|---|---|---|
| Nettsider | `/tjenester/webutvikling-nextjs` | `/tjenester/webutvikling-nextjs` | Riktig | Behold. Samsvarer med service-data, footer og SEO-kontrakt. |
| Webapper | `/tjenester` | `/tjenester/custom-software` | Generisk mål | Korriger til `custom-software`. Samme synlige navn og mål brukes allerede i aktiv `ContactFooter`; live-ruten heter Skreddersydd Programvareutvikling og matcher portaler, dashboards og digitale verktøy. |
| Apper | `/tjenester/app-utvikling` | `/tjenester/app-utvikling` | Riktig | Behold. |
| AI-systemer | `/tjenester/ai-implementering` | `/tjenester/ai-implementering` | Gyldig, men copy overlapper | Behold som standard fordi footer og SEO-kontrakt bruker samme mål. Radteksten nevner også søk, assistenter og ekte data, som overlapper `ai-integrasjon`; avklar senere om copy skal bli mer strategisk eller målet mer teknisk. Ikke bytt uten innholdsbeslutning. |
| SEO & AI-søk | `/tjenester` | `/tjenester/seo-optimalisering` | Generisk mål | Korriger til `seo-optimalisering`. Samme mapping brukes allerede i aktiv footer og ruten dekker teknisk SEO-/entity-synlighet. |

## Konklusjon for hovedradene

Det finnes allerede en intern fasit i `ContactFooter`:

1. Nettsider → `/tjenester/webutvikling-nextjs`
2. Webapper → `/tjenester/custom-software`
3. Apper → `/tjenester/app-utvikling`
4. AI-systemer → `/tjenester/ai-implementering`
5. SEO & AI-søk → `/tjenester/seo-optimalisering`

`WhatWeBuild` bør senere justeres til denne mappingen. Det er en konsistensretting, ikke ny URL-arkitektur.

## Tjenesteregister — Bygg

| Synlig punkt | Nåværende mål | Verifisert mål | Status | Beslutning |
|---|---|---|---|---|
| Nettsider | `/tjenester/webutvikling-nextjs` | samme | Riktig | Behold. |
| Webapper | `/tjenester` | `/tjenester/custom-software` | Generisk mål | Korriger sammen med hovedraden. |
| Apper | `/tjenester/app-utvikling` | samme | Riktig | Behold. |
| E-handel | `/tjenester/e-handel-losninger` | samme | Riktig | Behold. |
| Headless CMS | ingen lenke | `/tjenester/headless-cms` | Mangler lenke | Legg på eksisterende direkte rute. |
| UX/UI-design | ingen lenke | `/tjenester/ux-ui-design` | Mangler lenke | Legg på eksisterende direkte rute. |
| Branding & identitet | ikke representert | `/tjenester/branding-identitet` | Bevaringsgap | Legg til i registeret dersom dette fortsatt er en reell Tigon-leveranse. Tidligere homepage-kontrakt hadde lenken. Krever offer-beslutning, ikke URL-oppfinnelse. |

## Tjenesteregister — System

| Synlig punkt | Nåværende mål | Verifisert mål | Status | Beslutning |
|---|---|---|---|---|
| AI-systemer | `/tjenester/ai-implementering` | samme | Riktig | Behold som strategisk AI-hovedtjeneste. |
| Digital infrastruktur | `/tjenester/digital-infrastruktur` | samme | Riktig | Behold. |
| Integrasjoner | ingen lenke | `/tjenester/ai-integrasjon` finnes | Navn/mål er ikke helt likt | Ikke lenk generisk `Integrasjoner` til en mer spesifikk side uten copyjustering. Anbefalt løsning er `AI-integrasjoner` → `/tjenester/ai-integrasjon`, dersom dette beskriver tilbudet riktig. Krever innholdsgodkjenning. |
| Vedlikehold & sikkerhet | ingen lenke | `/tjenester/vedlikehold-sikkerhet` | Mangler lenke | Legg på eksisterende direkte rute. |

## Tjenesteregister — Synlighet

| Synlig punkt | Nåværende mål | Verifisert mål | Status | Beslutning |
|---|---|---|---|---|
| Teknisk SEO | ingen lenke | `/tjenester/seo-optimalisering` | Mangler lenke | Kan lenkes direkte. For å unngå to konkurrerende registerlenker kan dette eventuelt slås sammen med `AI-søk` til `SEO & AI-søk`. |
| AI-søk | ingen lenke | ingen separat `ai-søk`-rute | Støtteområde | Behold som underkapabilitet eller slå sammen med den lenkede SEO-raden. Ikke opprett ny slug. |
| Innholdsstruktur | ingen lenke | ingen eksakt hovedrute | Støtteområde | Behold som støtteområde under SEO, ikke tving frem en misvisende lenke. |
| Lokal synlighet | ingen lenke | `/tjenester/seo-optimalisering/oslo/oslo` finnes | Eksisterende regional mulighet | Ikke legg regional PSEO-lenke inn automatisk. Avklar om registeret skal være nasjonalt tjenestekart eller lokalt Oslo-signal. Den eksisterende ruten kan brukes senere uten å opprette noe nytt. |
| Måling | ingen lenke | `/tjenester/konverteringsoptimalisering` finnes | Navn/mål er ikke helt likt | Enten behold som støtteområde, eller endre synlig navn til `CRO & måling` og lenk til eksisterende CRO-rute. Krever innholdsgodkjenning. |
| Algoritmisk markedsføring | ikke representert | `/tjenester/some-markedsforing` | Bevaringsgap | Tidligere homepage-kontrakt hadde lenken. Legg til i registeret dersom dette fortsatt er en reell leveranse; ellers dokumenter at tilbudet er tatt ut av homepage. |

## Bevaring mot homepage SEO-kontrakten

| Tidligere homepage-lenke | Finnes fortsatt på redesign-homepage? | Dekning | Handling |
|---|---|---|---|
| `/tjenester` | Ja | Header, Tjenester-footer og flere hub-lenker | Behold. |
| `/tjenester/webutvikling-nextjs` | Ja | Tjenester og footer | Behold. |
| `/tjenester/app-utvikling` | Ja | Tjenester og footer | Behold. |
| `/tjenester/ai-implementering` | Ja | Tjenester og footer | Behold. |
| `/tjenester/webutvikling-nextjs/oslo/oslo` | Ja | Hero og footer | Behold. |
| `/tjenester/digital-infrastruktur` | Ja | Tjenesteregister | Behold. |
| `/tjenester/ux-ui-design` | Nei, bare synlig tekst | Ikke crawlbar lenke | Legg direkte lenke på eksisterende registerpunkt. |
| `/tjenester/e-handel-losninger` | Ja | Tjenesteregister | Behold. |
| `/tjenester/branding-identitet` | Nei | Mangler helt | Avklar offer. Hvis fortsatt levert, legg til registerlenke. |
| `/tjenester/headless-cms` | Nei, bare synlig tekst | Ikke crawlbar lenke | Legg direkte lenke på eksisterende registerpunkt. |
| `/tjenester/some-markedsforing` | Nei | Mangler helt | Avklar offer. Hvis fortsatt levert, legg til registerlenke. |
| `/tjenester/vedlikehold-sikkerhet` | Nei, bare synlig tekst | Ikke crawlbar lenke | Legg direkte lenke på eksisterende registerpunkt. |
| `/tjenester/seo-optimalisering` | Ja | Footer | Korriger også hovedraden `SEO & AI-søk` til denne ruten. |

## Dokumentert avvik fra gammel homepage

Den tidligere `ServicesSection` brukte teksten `Programmatic SEO`, men lenket den til:

`/tjenester/webutvikling-nextjs/oslo/oslo`

Denne koblingen er semantisk svak og skal ikke blindkopieres. Redesignen kan bevare begge intensjoner på riktige steder:

- SEO-tjenesten dekkes av `/tjenester/seo-optimalisering`.
- regional webutvikling i Oslo dekkes fortsatt av `/tjenester/webutvikling-nextjs/oslo/oslo` i Hero/Footer.

Dette er en dokumentert erstatning, ikke tap av URL-dekning.

## Bevist P0-feil utenfor Tjenester-seksjonen

Aktiv `Hero.tsx` inneholder:

`SEO / AI-søk` → `/tjenester/seo-ai-sok/oslo/oslo`

Service-ID-en `seo-ai-sok` finnes ikke i `data/services.json`, genereres ikke som hovedtjeneste og finnes ikke i sitemap. Den dynamiske service-ruten bruker `notFound()` når service-ID-en mangler.

Verifisert eksisterende regional rute er:

`/tjenester/seo-optimalisering/oslo/oslo`

Dette er en reell integrasjonsblokker, men Hero er en beskyttet seksjon. Rettelsen må bestilles som en separat, eksplisitt link-only Hero-patch. Ingen Hero-fil er endret i denne runden.

## Anbefalt endelig registerstruktur

Dette er den mest presise strukturen basert på eksisterende, verifiserte tilbud. Den beholder fem hovedrader og gjør registeret til den komplette indeksen.

### Bygg

- Nettsider → `/tjenester/webutvikling-nextjs`
- Webapper → `/tjenester/custom-software`
- Apper → `/tjenester/app-utvikling`
- E-handel → `/tjenester/e-handel-losninger`
- Headless CMS → `/tjenester/headless-cms`
- UX/UI-design → `/tjenester/ux-ui-design`
- Branding & identitet → `/tjenester/branding-identitet` hvis tilbudet beholdes

### System

- AI-systemer → `/tjenester/ai-implementering`
- Digital infrastruktur → `/tjenester/digital-infrastruktur`
- AI-integrasjoner → `/tjenester/ai-integrasjon` etter copygodkjenning
- Vedlikehold & sikkerhet → `/tjenester/vedlikehold-sikkerhet`

### Synlighet

- SEO & AI-søk → `/tjenester/seo-optimalisering`
- Innholdsstruktur — støtteområde
- Lokal synlighet — støtteområde eller eksisterende Oslo-rute etter plasseringsbeslutning
- CRO & måling → `/tjenester/konverteringsoptimalisering` etter copygodkjenning
- Algoritmisk markedsføring → `/tjenester/some-markedsforing` hvis tilbudet beholdes

## Beslutninger før en link-only patch

Disse kan rettes uten ny strategisk beslutning fordi samme mapping allerede finnes i aktiv footer eller har eksakt label/rute:

- Webapper → `/tjenester/custom-software`
- SEO & AI-søk → `/tjenester/seo-optimalisering`
- Headless CMS → `/tjenester/headless-cms`
- UX/UI-design → `/tjenester/ux-ui-design`
- Vedlikehold & sikkerhet → `/tjenester/vedlikehold-sikkerhet`
- Teknisk SEO → `/tjenester/seo-optimalisering`, eller slå sammen registerlabelen med AI-søk

Disse krever offer-/copybeslutning:

- om `Integrasjoner` skal bli `AI-integrasjoner`
- om `Måling` skal bli `CRO & måling`
- om Branding & identitet fortsatt skal fremheves på homepage
- om Algoritmisk markedsføring fortsatt skal fremheves på homepage
- om Lokal synlighet skal ha en egen eksisterende Oslo-lenke i Tjenester
- om AI-systemer-copy skal spisses mot `ai-implementering` eller flyttes mot `ai-integrasjon`

## Anbefalt neste handling

1. Godkjenn eller juster de gjenstående offer-/copybeslutningene.
2. Bestill den beviste Hero-lenkefeilen som separat link-only patch.
3. Render og kontroller alle Tjenester-lenker.
4. Begynn først deretter den statiske layoututforskningen.

## Validering etter sikker href-patch

- `npm run typecheck` — bestått
- `npm run build` — bestått
- homepage er fortsatt statisk prerendered
- server-rendered HTML inneholder de nye direkte servicehref-ene
- `git diff --check` — bestått
- automatisk `next-env.d.ts`-drift fra build ble reversert
- CSS, HomeMotion, Header, Hero, footer, metadata og SEO-systemfiler er uendret
- den ugyldige Hero-lenken er fortsatt synlig i server-rendered HTML og står som separat P0-blokker
