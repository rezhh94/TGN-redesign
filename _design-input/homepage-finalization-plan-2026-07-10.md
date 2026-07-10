# Tigon homepage finalization plan

Dato: 2026-07-10
Status: aktiv trinnvis landingsplan
Mål: lande en særpreget, forståelig og produksjonsklar forside uten redesign-drift

## Hovedbeslutning

Forsiden skal ikke få flere parallelle eksperimenter.

Arbeidet utføres i denne rekkefølgen:

1. Tjenester: innhold, SEO og internlenker låses.
2. Tjenester: statisk layout og lesbarhet ferdigstilles.
3. Tjenester: kun nødvendig progressiv interaksjon og polish.
4. Arbeid: endelige assets eller tydelig asset-beslutning.
5. Arbeid: ett avgrenset showpiece-forsøk.
6. Prosess: innholdsdrevet transformasjon dersom Arbeid godkjennes.
7. Effekt: vurderes først etter en helhetlig rytmeaudit.
8. Mobil, reduced motion, ytelse og integrasjon valideres samlet.

Header, Hero, SEO-metadata, schema, sitemap, robots, canonical, URL-er, footer/NAP og viktige kontaktlenker er utenfor scope med mindre en separat oppgave åpner dem.

SEO-arbeid er utsatt mens designfasene kjøres. Før go-live er `docs/pre-live-seo-gate.md` obligatorisk og må bestås som en separat kontroll.

## Fremdrift 2026-07-10

- Trinn 0 er gjennomført: Fable, hovedrepo og TGN-Next er kontrollert.
- Trinn 1 er gjennomført og dokumentert i `_design-input/services-truth-table-2026-07-10.md`.
- To generiske hovedradmål, tre sikre registerlenker, to offerbeslutninger og én ugyldig Hero-service-ID er identifisert.
- Den sikre link-/registerpatchen i `WhatWeBuild.tsx` er gjennomført uten layout-, CSS-, copy- eller motion-endring.
- Patchen har bestått typecheck, produksjonsbuild og server-rendered href-kontroll.
- Statisk Tjenester-designfase er gjennomført: nummerert pilarprogresjon, 12-kolonners tjenestehierarki, ren metadata og et roligere register.
- Eksisterende accordion-motion er beholdt fordi den allerede løser progressiv interaksjon; ingen ny motion ble lagt til i Tjenester.
- Work-showpiece bygges med dagens seks mockups. Assetbytte eller komplettering er en senere innholdsfase og blokkerer ikke motionimplementeringen.
- SEO- og linkarbeid er utsatt til den separate pre-live-gaten i `docs/pre-live-seo-gate.md`.

## Hva som mangler før forsiden er landet

### P0 — Tjenester må få en komplett leveranse- og lenkekontrakt

Seksjonen er lesbar og har riktig grunnstruktur, men redesignkopien er ikke ferdig som SEO-/internlenkesystem:

- `Webapper` peker foreløpig bare til `/tjenester`.
- `SEO & AI-søk` peker foreløpig bare til `/tjenester`.
- Flere punkter i tjenesteregisteret er tekst uten lenke.
- Redesignkopien inneholder bare homepage-ruten, så alle service-URL-er må valideres mot hoved-/integrasjonsrepoet før publisering.
- Ingen ny URL eller slug skal oppfinnes i redesignarbeidet.

Dette må løses før visuell nytenkning i seksjonen.

### P0 — Arbeid mangler endelige capability-assets

De aktive bildene har en fin editorial fargefamilie, men viser ikke tydelig nok digitale capabilities alene.

Før endelig showpiece må det avgjøres om:

- dagens seks bilder er endelige, eller
- de skal erstattes/kompletteres med ekte grensesnitt, systemflater, produktfragmenter eller korte loops.

Motion skal ikke brukes til å skjule et uklart assetgrunnlag.

### P1 — Seksjonene trenger tydeligere rollefordeling

Siden har allerede mye motion. Mangelen er ikke antall effekter, men tydelig rolle:

- Tjenester = forståelse og navigasjon.
- Overlevering = temposkifte.
- Effekt = kausal resultatkjede.
- Arbeid = fremoverlent capability-showpiece: dette kan Tigon lage.
- Prosess = transformasjon og metode.
- Manifest/Kontakt = rolig avslutning.

### P1 — Prosess-motion må vise transformasjon

Dagens decode er teknisk, men viser ikke tydelig nok hvordan `Uklart inn.` blir `System ut.`.

Dette forbedres først etter at Arbeid er landet.

### P2 — Effekt kan trenge én fysisk forbindelse

FUNNET / FORSTÅTT / VALGT / MÅLT er sterke enkeltord. En sammenhengende signallinje kan gjøre rekkefølgen tydeligere, men skal bare bygges hvis fullsidegjennomgangen viser at forbindelsen fortsatt mangler.

## Trinn 0 — opprett en kontrollert baseline

### Oppgave

Før hver implementeringsrunde:

- kontroller `git status --short`
- dokumenter eksakt filscope
- ta desktop- og mobilreferanse av seksjonen
- kontroller aktiv seksjonskontrakt
- bekreft at ingen SEO-/URL-/footer-/Header-/Hero-fil ligger i diffen

### Godkjent når

- eksisterende brukerendringer er identifisert og bevart
- bare eksplisitt seksjon er åpnet
- rollback kan gjøres uten å berøre andre seksjoner

## Trinn 1 — lag en Tjenester truth table

Dette er første faktiske arbeidssteg.

### Leveranse

Lag én kontrolltabell med alle synlige tjenesteord på forsiden:

- synlig navn
- rolle: hovedtjeneste eller støtteområde
- kort forklaring
- eksisterende godkjent URL
- om URL-en finnes i hoved-/integrasjonsrepoet
- hvor lenken vises: accordion, register eller begge
- om lenken må bevares fra homepage SEO-kontrakten

### Nåværende hovedrader

1. Nettsider
2. Webapper
3. Apper
4. AI-systemer
5. SEO & AI-søk

### Nåværende register

Bygg:

- Nettsider
- Webapper
- Apper
- E-handel
- Headless CMS
- UX/UI-design

System:

- AI-systemer
- Digital infrastruktur
- Integrasjoner
- Vedlikehold & sikkerhet

Synlighet:

- Teknisk SEO
- AI-søk
- Innholdsstruktur
- Lokal synlighet
- Måling

### Regler

- Bruk bare eksisterende, verifiserte URL-er.
- En hovedtjeneste skal ha en direkte landingsside når en godkjent side finnes.
- `/tjenester` brukes som hub, ikke som automatisk erstatning for manglende beslutning.
- Hvis et registerpunkt ikke skal lenkes, dokumenteres hvorfor.
- Ingen PSEO- eller lokasjonsside opprettes fra denne oppgaven.

### Stop-kriterium

Stopp visuell implementering hvis URL-kartet ikke er avklart.

## Trinn 2 — lås Tjenester-informasjonsarkitekturen

### Struktur som beholdes

1. Stor `BYGGER`-åpning.
2. Tre pilarer: Bygg, System og Synlighet.
3. Fem hovedtjenester i lesbar accordion.
4. Alltid synlig tjenesteregister.
5. Tydelig vei til full tjenestehub.

Dette er en god og spesifikk struktur. Den skal raffineres, ikke erstattes av et nytt konsept.

### Hver hovedrad må svare på fire ting

1. Hva leverer Tigon?
2. Hvem eller hvilket behov passer det for?
3. Hva inngår eller hva blir resultatet?
4. Hvor kan brukeren lese mer?

### Innholdsregler

- Serviceordet skal være konkret, ikke kreativt omskrevet.
- Første setning skal forklare leveransen uten buzzwords.
- Metadata skal støtte forståelsen, ikke bli en sky av tekniske tags.
- Beskrivelse og lenke skal være synlig i server-rendered HTML.
- Teksten skal fortsatt være forståelig uten bilder og JavaScript.

### Godkjent når

- en ny besøkende kan forklare hva Tigon leverer etter fem–ti sekunder
- alle fem hovedtjenester kan skannes uten å åpne tilfeldige scener
- SEO & AI-søk fremstår som en faktisk leveranse, ikke et løst signalord
- servicehub og relevante landingssider er tydelige

## Trinn 3 — ferdigstill statisk Tjenester-layout

### Designmål

Seksjonen skal være unik gjennom editorial hierarki, ikke gjennom eksperimentell navigasjon.

### Behold

- stor `BYGGER`
- liste fremfor card grid
- near-monokrom palett
- accordion som hovedinteraksjon
- bilder som støtte
- full serviceindeks nederst

### Utforsk kontrollert

- gjør de tre pilarene til én tydelig horisontal progresjon: Bygg → System → Synlighet
- bruk asymmetrisk grid og luft til å skille pilarene, ikke kortbakgrunner
- gi hovedtjenester sterkere forskjell mellom navn, forklaring, metadata og CTA
- reduser visuell repetisjon mellom pilarer, accordion og register uten å fjerne informasjon
- la aktiv rad få mer rom, men ikke flytte øvrige tjenestenavn ut av synsfeltet
- behold full registerstruktur som rolig, crawlbar indeks

### Ikke utforsk

- sticky mediareise
- bilde som eneste navigasjon
- horisontal scroll for tjenestenavn
- tabs som skjuler hovedinnhold
- auto-roterende tjenester
- card grid eller dashboard
- cursor som kreves for å forstå innholdet

### Desktop-godkjenning

- alle tjenestenavn kan skannes raskt
- aktiv rad føles tydelig uten å bli et stort kort
- bilder konkurrerer ikke med tekst eller CTA
- registeret er visuelt rolig, men ikke gjemt

### Mobil-godkjenning

- alle fem navn er synlige i naturlig scroll
- åpning/lukking flytter innhold forutsigbart
- ingen fast høyde klipper beskrivelse eller lenke
- servicebilder kan skjules eller nedprioriteres uten informasjonstap
- trykkmål og fokusrekkefølge er tydelig

## Trinn 4 — legg kun nødvendig interaksjon på Tjenester

Dette er progressiv forbedring etter at statisk layout er godkjent.

### Tillatt

- kontrollert accordion open/close
- ett tydelig aktivt fokus
- lokal clip-reveal eller crossfade av radens eksisterende bildepar
- små hover/focus-signaler i tekst, pil og hairline
- kort one-shot entry for seksjonsgrupper

### Ikke tillatt

- pin
- global scrolltilstand
- cursor-following media
- parallax som flytter teksten
- tjenestenavn som blir utilgjengelige under motion
- kritisk innhold som opprettes client-side

### Reduced motion og no-JS

- alle paneler skal være lesbare
- alle lenker skal være tilgjengelige
- ingen høyde eller opacity skal skjule innhold permanent
- bilder skal være dekorative støtteflater

### Godkjent når

- interaksjonen gjør seksjonen raskere å forstå
- keyboard, touch og mouse gir samme informasjonsresultat
- motion kan fjernes uten at layouten kollapser

## Trinn 5 — gjennomfør SEO- og internlenkegate for Tjenester

Før seksjonen kan regnes som ferdig:

- sammenlign truth table mot `docs/homepage-seo-contract.md`
- sammenlign alle href-er mot hoved-/integrasjonsrepoet
- kontroller at ingen viktig tidligere homepage-lenke er fjernet uten dokumentert erstatning
- kontroller at lenketekst er beskrivende
- kontroller at alle lenker finnes i server-rendered output
- kontroller at hub-lenken `/tjenester` fortsatt finnes
- kontroller at ingen URL eller slug er endret

### Viktig

Redesignkopien har ikke service-rutene lokalt. En vellykket lokal build beviser derfor ikke at service-URL-ene er riktige. URL-verifikasjon må gjøres mot integrasjonsmålet før port eller publisering.

## Trinn 6 — lås Work-assetretningen

Før GSAP-showpiece:

- vurder de seks aktive bildene opp mot capability-teksten
- avgjør hvilke som faktisk viser en digital leveranse
- identifiser manglende systemflater, grensesnitt eller korte loops
- ikke generer placeholder-assets
- ikke fremstille konseptflater som tidligere leverte kundecaser
- ikke bruk case- eller arkiv-lenker som argument; seksjonen skal vise fremtidige leveransemuligheter

### Go

Fortsett hvis assetfamilien viser nivå, bredde og anvendelighet.

### Stop

Stopp motion hvis bildene fortsatt hovedsakelig leses som tilfeldig editorial photography.

## Trinn 7 — bygg ett capability-showpiece i WorkProof

### Scope

- `src/components/WorkProof.tsx` kun hvis markup må få hooks
- `src/styles/work-proof.css`
- `workProof()` i `src/components/motion/HomeMotion.tsx`

### Retning

- behold normal flow
- behold lesbar capability-indeks
- la de seks assetene ankomme som én koordinert komposisjon
- la dem lande i endelig, statisk layout
- ingen pin, orbit, cursor-following eller aktiv kortmaskin

### Godkjent når

- Arbeid er sidens mest minneverdige visuelle kapittel
- hver capability fortsatt kan forstås uten å vente på scroll
- rask scrolling gir ingen aggressiv bildeinnflyging
- mobile og reduced motion viser stabil sluttlayout

## Trinn 8 — forbedre Prosess som en faktisk transformasjon

Start først når Work er godkjent.

### Retning

- erstatt tilfeldig title-decode med en romlig `Uklart inn. → System ut.`-transformasjon
- bruk typografiske fragmenter til å vise organisering gjennom Retning, Bygg og Live
- behold alle tre faser synlige i normal flow
- tegn prosesslinjen etter at tittelen har landet
- ingen pin eller kortstabel

### Godkjent når

- motion forklarer prosessen bedre enn statisk tekst alene
- tittelen er fortsatt stor
- fasene er lesbare uten motion

## Trinn 9 — vurder Effekt, ikke anta at den må endres

Gjør en fullsidegjennomgang etter Tjenester, Work og Prosess.

Spør:

- forstår brukeren at FUNNET → FORSTÅTT → VALGT → MÅLT er én kjede?
- føles Effekt for statisk mellom Overlevering og Work?
- vil en sammenhengende signalrail forbedre forståelsen eller bare legge på mer motion?

Bygg kun signalforbindelsen hvis svaret er tydelig ja.

## Trinn 10 — fullside rytme- og Awwwards-audit

### Design

- hvert kapittel har en tydelig rolle
- Tjenester er lettest å forstå
- Work er sterkest visuelt
- Manifest og Kontakt gir ro
- mørk/lys rytme føles bevisst

### Usability

- ingen nødvendig informasjon krever spesifikk scrollhastighet
- keyboard og touch fungerer
- ingen hover-only informasjon
- ingen gjentatte pins
- ingen scroll traps

### Creativity

- Work har én gjenkjennelig Tigon-mekanikk
- Prosess-motion viser faktisk transformasjon
- effektene kan forklares med innhold, ikke bare stil

### Content

- tjenestene er konkrete
- CTA-er og internlenker gir logiske neste steg
- Work viser capabilities, ikke falske kundecaser
- Prosess og Effekt bygger videre på tilbudet

## Trinn 11 — teknisk sluttkontroll

Kjør etter hver implementeringsrunde, og samlet til slutt:

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- desktop review ved 1440 × 900 eller større
- mobil review ved 390 × 844
- reduced-motion review
- no-JS/SSR-lesbarhet for kritisk tekst og lenker
- rask og sakte scroll
- keyboard/fokusgjennomgang
- bilde- og fontlast
- ingen horisontal overflow
- ingen dupliserte ScrollTriggers
- ingen globale GSAP-kills

## Trinn 12 — integrasjon og publisering holdes separat

Når designkopien er godkjent:

1. kontroller hovedrepoets status før port
2. sammenlign SEO-/URL-/footer-/Header-/Hero-kontraktene
3. porter bare godkjente kildefiler
4. valider servicehref-er mot ekte ruter
5. kjør build og typecheck i integrasjonsrepoet
6. review server-rendered output og internlenker
7. commit eller push kun etter eksplisitt bestilling

## Anbefalt neste oppgave

Neste gjennomføringsrunde bør være:

> Tjenester P0.1: godkjenn anbefalt registerstruktur i `_design-input/services-truth-table-2026-07-10.md`, og utfør deretter én link-/register-only patch i `WhatWeBuild.tsx`. Ingen layout-, CSS- eller motion-endring i samme runde.

Den sikre delen av P0.1 er nå implementert. Gjenstående beslutninger er listet i truth table og skal ikke antas automatisk.

Når URL- og innholdskontrakten er godkjent, kan Tjenester-layouten raffineres kontrollert uten å risikere SEO eller forståelighet.
