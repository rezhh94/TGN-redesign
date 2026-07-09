# Forside-status — historisk generert review-snapshot

> Denne filen ble generert 2026-07-08 og beskriver ikke endringene fra 2026-07-09. Den beholdes som observasjonshistorikk. Aktiv implementasjonsstatus ligger i `docs/current-homepage-state.md`.

**Dette er en GENERERT historikkfil.** En senere `/forside-review` kan erstatte innholdet. Inntil en ny full review er kjørt, er `docs/current-homepage-state.md` fasit for faktisk kode og validering.

- **Sist oppdatert:** 2026-07-08
- **Scope for siste kjøring:** ideas (kreativt mandat, DEL F — konformitetsfunn under er fra forrige full-kjøring samme dag)
- **Åpne gap:** 4 · **Løst:** 0

---

## De 4 kjente craft-gapene
| # | Gap | Status | Seksjon(er) |
|---|-----|--------|-------------|
| 1 | Hero-panel tom placeholder | 🔴 åpen | Hero |
| 2 | Dødt svart rom | 🔴 åpen | 02 Tjenester, Overlevering |
| 3 | Nav gjørmete over lyse seksjoner | 🔴 åpen | Prosess, System |
| 4 | To type-stemmer | 🔴 åpen | Overlevering, System |

*Observert i ideas-kjøringen (ikke full sjekk, men synlig i screenshots):* Prosess-stegene bruker
**oransje gradient-placeholdere** («PROSESS / SCOPE · 01») — dobbelt-treff: placeholder + synlig
oransje på lys flate. Arbeid/Tjenester-bildene spriker i gradering (blå vann, tulipaner, oransje
plakater) — bryter near-monochrome-signaturen. Tas formelt i neste full-kjøring, men se idé C/G under.

---

## Per seksjon (awwwards-plassering + gap)
| Seksjon | Regel/token | Plassering | Konkret gap → grep |
|---------|-------------|-----------|--------------------|
| **Hero** | ✅ ren | bra byrå | Tomt `hero__visual` → ekte medie/liv i panelet |
| **01 Tilnærming** | ✅ | bra byrå | Statement i humanist-sans (Gap 4) → lås stemme |
| **02 Tjenester** | ✅ (pilarer) | bra byrå | Tomrom under «BYGGER» (Gap 2) → dra pilar-rad opp |
| **Overlevering** | ✅ (ignite ok) | craft-nær | Dødt svart rom + humanist-sans (Gap 2+4) → stram rytme |
| **03 Effekt** | ✅ | **craft** | Sterkest — sticky index + ekte thumbs. Ev. løft bildekvalitet |
| **04 Arbeid** | ✅ (galleri) | craft-nær | Bekreft null «SETT INN BILDE» igjen · bildegradering spriker (se idé C) |
| **05 Prosess** | ⚠️ oransje gradient-placeholdere | bra byrå | Nav-flekk over lyst (Gap 3) → adaptiv nav · placeholdere → artefakt-kort (idé G) |
| **06 System** | ✅ | bra byrå | Humanist-sans (Gap 4) + nav-flekk (Gap 3) |
| **Kontakt** | ✅ | craft-nær | Sterk avslutning, kondensert display ✓ |

---

## Topp 5 grep (effekt-per-innsats)
1. 🔴 **Hero-panel → levende medie** (Gap 1) — størst løft (se idé B)
2. 🔴 **Adaptiv nav over lyse seksjoner** (Gap 3) — fjerner synligste amatør-tell (idé D)
3. 🔴 **Én statement-stemme** i bro/manifest (Gap 4) — billig, høy effekt (idé K)
4. 🔴 **Tett dødt rom** i 02 + bro (Gap 2) — eller gjør rommet til komposisjon (idé E)
5. 🔴 **Asset-sweep** — null placeholdere + én bildegradering (idé C + G)

---

## Awwwards-gap (helhet)
Siden er **craft-nær i eget språk**, men holdt fra SOTD av: (a) tomt hero-øyeblikk, (b) nav-inkonsistens
lys/mørk, (c) delt type-stemme. Ingen av dem krever å bli lamalama — alle lukkes i Tigons restrained språk.
Signatur-motion (bro-ignite) finnes allerede ✓. **Ideas-kjøringen avdekket i tillegg at siden allerede
HAR en konsept-tråd (uklart → valgt) som bare ikke er gjort eksplisitt — se idé A. Det er sannsynligvis
den billigste veien til SOTD-nivå: ikke nye seksjoner, men å binde det som finnes til én fortelling.**

---

## Design / komposisjon (fersk analyse 2026-07-08 — ren layout-linse, alle 9 seksjoner screenshottet + tittel-geometri målt)

### Dommen: layouten er IKKE monoton — den har ekte variasjon og to sterke asymmetrier. Men den har tre presise komposisjonssvakheter, og den mangler sidens ene modige layout-beslutning.

Målt geometri (display-størrelse / forankring): hero 203px venstre + panel-bleed → bro01 97px venstre
→ 02 97px innrykket (~kol 3) → bro02 ~72px SENTRERT → 03 sticky-split (34px lead) → 04 68px venstre
→ 05 124px venstre → 06 ~60px SENTRERT → kontakt 165px høyrelent (eneste på siden) + watermark-bokend.

### Komposisjonsmønster per seksjon
| Seksjon | Mønster | Samme som naboen? | Vurdering |
|---|---|---|---|
| **Hero** | Asymmetrisk to-celle: trappet display venstre + panel som blør av høyre kant; stram bunnstripe | — | Ekte komposisjon. Sidens beste åpning |
| **Bro 01** | Venstre display m/ trappe-innrykk + lead under | Ja — heroens typografiske halvdel, samme 97px-stemme som 02 | De tre første mørke skjermene leser som ÉN lang seksjon; grensen bro01→02 har null spenning |
| **02 Tjenester** | Innrykket tittel (fint avvik) → symmetrisk 3-kol pilarrad → radliste → symmetrisk 3-kol lenkeliste | Delvis | Katalog-symmetri innvendig; pilarraden er sidens nærmeste «3 like kort»; død band nederst (kjent Gap 2) |
| **Bro 02** | ~~Sentrert void~~ → ✅ komponert void: statement oppe-venstre (trappet) + støttelinje m/ hairline nede-høyre | — | Rommet spent diagonalt; ingen duplisering av 03 |
| **03 Effekt** | Sticky venstre-skinne + 4 nummererte rader høyre | Nei | **Sidens beste arbeidslayout.** Asymmetri med funksjon |
| **04 Arbeid** | Intro + 6 case-rader i sikksakk (tekst/bilder alternerer side) | Nei | God rytme, men jevnhøye rader × 6 med identisk 3-thumb-stripe = metronom; intro-display (68px) er sidens minste uten grunn |
| **05 Prosess** | Monumental tittel → 3 IDENTISKE steg-rader (label/tekst/bilde-høyre × 3) | Radmønster igjen | Ingen alternering på sidens ene lyse arbeidsseksjon; svakeste arbeidslayout |
| **06 System** | ~~Tvilling av bro02~~ → ✅ urørt monumental, men nå sidens ENESTE sentrerte statement (bro02 ble asymmetrisk) | Nei | Hvisken-inversjon forkastet av bruker (brøt tittelstigen); unntaket sentrert brukt én gang |
| **Kontakt** | Høyrelent trappet display (eneste på siden) → gigantisk e-post venstre/CTA høyre → indeks → watermark | Nei | Sterk lukking; watermarken er et ekte bokend-grep |

### De tre komposisjonssvakhetene (der siden er visuelt kjedelig uansett copy)
1. **Tvilling-statementene (bro02 + 06).** Samme mal brukt to ganger — sentrert label, sentrert
   to-linjes statement, jevnt rom rundt — én mørk, én lys. Sentrert symmetri er sidens unntak, og
   unntaket er brukt på de to seksjonene som skulle bære mest følelse. Voidet i bro02 er **stort,
   ikke komponert**: rommet er jevnt fordelt rundt aksen, uten motvekt — det leser som seksjonspadding
   skrudd til maks, ikke som negativ komposisjon. (Komponert tomhet krever at noe lite står skjevt og
   spenner rommet — jf. heroens panel-mikrotype.)
2. **Rad-metronomen i bakre halvdel.** 02-akkordeon → 03-rader → 04-caserader → 05-stegrader →
   footer-indeks: fem seksjoner på rad er «hairline-adskilte horisontale rader». Raden ER Tigons
   system-signatur og skal ikke vekk — men fem på rad uten ett brudd gjør at siste tredjedel scroller
   som et regneark. 05 er verst: tre identiske rader med bilde høyre, på sidens ene lyse flate.
3. **Null grid-brudd på hele siden.** Alt innhold ligger innenfor gutterne (unntatt hero-panelets
   høyre-bleed). Ingen full-bleed, ingen overlapp, ingen kollisjon mellom elementer. 8 av 9 seksjoner
   henger på venstre gutter. Siden holder systemet perfekt — og det er problemet: et system som aldri
   brytes én gang, bevisst, oppleves ikke som disiplin men som forsiktighet.

### Skala-rytmen (hvor den er flat)
203 → **97 → 97** → 72 → 34 → **68** → 124 → 60 → 165. To flater: (a) bro01 og 02 deler størrelse,
stemme, forankring OG bakgrunn — grensen mellom dem er usynlig i thumbnail-test; (b) 04-introen er
sidens minste display uten kompositorisk grunn — «bevis»-seksjonen har spakest tittel. Det som FINNES
og fungerer: dykket inn i 03/04 (arbeidssonen) og stigningen 124→165 mot slutten. Det som MANGLER:
ett ekte skala-brudd nedover — siden går aldri fra monumental til hvisken.

### De 2–3 grepene, rangert etter visuell effekt (ikke letthet)

**1. ✅ GJENNOMFØRT 2026-07-08 (justert etter bruker-feedback) — Splitt tvillingene.**
   *Endelig form: bro02-statementet står oppe-venstre med trappe-innrykk (samme steg som bro01), og
   støttelinjen «Etter lansering begynner målingen.» står som motvekt nede-høyre med hairline over.
   Første versjon brukte målepunkt-indeksen 01–04 som motvekt — FORKASTET av bruker: duplisering av
   03s eget innhold rett før 03. Hvisken-inversjonen av 06 også FORKASTET av bruker: lead-skala på
   et statement bryter tittelstigen (DEL C) — 06 er revertert til monumental skala + mask-rise.
   Tvillingene er likevel splittet: bro02 er nå asymmetrisk, så 06 står som sidens ENESTE sentrerte
   statement. Pin + ignite beholdt; no-JS/PRM statisk lesbar. Lærdom: skala-inversjon av statements
   krever eksplisitt godkjenning før implementering — det er en DEL F-utfordring av reglene, ikke
   et fritt komposisjonsgrep.*
   - *Bro02:* behold mørket og størrelsen, men flytt statementet ut av senter — opp og til venstre
     (samme trappe-logikk som resten av siden). I nedre høyre kvadrant: én liten motvekt i mono
     (de fire målepunkt-linjene stablet som innholdsfortegnelse for 03, eller bare koordinat +
     hairline). Rommet blir da SPENT mellom to ulike vekter — komponert tomhet, ikke padding. Null
     nye assets, null loudness.
   - *06 System:* inverter skalaen — sidens minste øyeblikk. Statementet i liten størrelse (lead- eller
     mono-nivå), alene på den lyse flaten, med rått rom rundt. Etter 15 000px monumental type er en
     hvisken det mest dramatiske siden kan gjøre — og det gir sidens manglende skala-brudd nedover.
   - Effekt: fikser begge de svakeste komposisjonene, dreper tvilling-malen, skaper det manglende
     skala-bruddet — i ren restrained-editorial-språkdrakt. Dette ER den manglende layout-beslutningen,
     og den hører hjemme akkurat der siden i dag er svakest.

**2. Ett grid-brudd i Arbeid.** Én av de seks case-radene (nr. 3 eller 4, midt i listen) bryter
   gutteren: bildestripen går full-bleed kant til kant og tittelen overlapper stripen. Én gang på hele
   siden. I Tigons språk er det ikke cinematikk — det er *grid-systemet som brytes én gang, med vilje*,
   og det er den typen enkeltbeslutning juryer husker. Avhenger av at ekte mockups er på plass først
   (bildene bærer bruddet), derfor rangert under 1.

**3. Prosess-rader som strammer seg.** Behold de tre radene, men la layouten UTFØRE prosessen:
   steg 01 luftig (høy rad, mye rom), steg 02 tettere, steg 03 kompakt og presis — synkende radhøyde
   og padding, ev. bilde-side som alternerer. Klargjøring som romlig kompresjon. Fikser metronomen på
   den svakeste arbeidsseksjonen og er det eneste av grepene som gjør raden selv til argument.

### Ærlig helhetsvurdering
Komposisjon er sidens nest sterkeste kort etter informasjonsdesignet — hero, 03 og kontakt er ekte
craft, og sikksakken i 04 fungerer. Siden er ikke komposisjonelt monoton; den er komposisjonelt
**forsiktig**: den holder sitt eget system 100 % og bryter det aldri. Grep 1 koster minst og flytter
mest; grep 2 er det som ville blitt husket. Begge kan gjøres uten å røre reglene i DEL B/C.

---

## Redaksjonell kjerne (fersk analyse 2026-07-08 — idé/copy/struktur-linsen, full copy lest fra live)

### Dommen: konseptet er påstått i overskriftene og GJENNOMFØRT i underlaget — men overskriftslaget selv er splittet i to akser og tre foreldreløse aforismer. Det er der det brister.

Lest ord for ord fra live-siden. Det som faktisk står der:

**Siden kjører TO gode akser parallelt uten å koble dem:**
- **Akse 1 — klargjøring (inn):** «UKLART BLIR BYGGBART.» → «UKLART INN. SYSTEM UT.» → «SEND OSS
  NOE UKLART.» + heroens «Scope først. Ingen ferdig brief nødvendig.»
- **Akse 2 — utfallsstigen (ut):** funnet → forstått → valgt → målt. Ligger i hero-ingressen,
  02-ingressen, Synlighet-pilaren, og er HELE strukturen i 03 Effekt (fire målepunkter).

**Og TRE display-statements som ikke sitter på noen av aksene:**
1. «Ferdig bygget er ikke ferdig.» (Overlevering) — tidsakse, fungerer som hengsel til måling, ok.
2. «VISUELT STERKT. TEKNISK RIKTIG.» (Arbeid) — **generisk byrå-copy.** Hvilket som helst studio
   kunne signert den. Sidens svakeste redaksjonelle beslutning, plassert på bevis-seksjonen der
   argumentet skulle lande. (Mikrotypen under — «INGEN NAVN, BARE NIVÅ» — er mer distinkt enn
   tittelen den står under.)
3. «Design kan lånes. System må bygges.» (System) — eierskaps-akse. Best av de tre, men enda en ny
   påstand i stedet for en betaling av de forrige.

**Konsekvens:** overskrifts-ryggraden leser som fem separat skrevne aforismer, ikke én tekst.
Klargjøringsaksen sies TO ganger i display («UKLART BLIR BYGGBART» / «UKLART INN. SYSTEM UT.»),
mens utfallsstigen — sidens sterkeste setning — **aldri får display-stemmen**. Den bor i ingress og
mono-mikrotype. Siden roper altså inngangen to ganger og hvisker betalingen.

**Der fortellingen ellers holder** (og dette skal sies like hardt): informasjonsdesignet i
underlaget er allerede award-nivå. 03 Effekt (fire målepunkter med MÅLEPUNKT-kvitteringer) og
05 Prosess (tre steg med «UT — DEFINERT RETNING / LEVENDE LØSNING / MÅLBAR KONTAKTVEI») er ekte
redaksjonell disiplin — påstand med kvittering. Kontakt-lukkingen («SEND OSS NOE UKLART» + «hva som
bør gjøres først») ringer perfekt tilbake til heroens «Scope først». Problemet er IKKE konseptet,
IKKE strukturen (rekkefølgen er forsvarlig klassisk: løfte → tro → hva → hengsel → utfall → bevis →
hvordan → hvorfor-det-holder → invitasjon), og IKKE kroppsteksten. Det er display-laget.

**Detaljbrister funnet i lesningen:**
- Stige-brudd: 02-ingressen sier «funnet, forstått og **brukt**» — alle andre steder «valgt».
  Stigens makt er den faste rekkefølgen; ett avvik og den slutter å være liturgi.
- Casene i Arbeid har god copy, men bare 2 av 6 betaler med måling («målt fra dag én», «målbar
  effekt»). Kvitterings-formatet fra Prosess (UT —) finnes ikke der bevisene bor.
- **Sidens tese står allerede i chromen og blir aldri innløst:** header-taglinen «BYGD FOR Å BLI
  VALGT» ER sveisen mellom aksene (bygging-inn → valgt-ut). Den står på hver skjerm — og ingen
  seksjon på siden gjør krav på den.

### De redaksjonelle grepene som mangler (2–3)

1. **Skriv overskriftslaget som ÉN tekst.** De fem display-statements må være stadier i samme
   argument, ikke fem plakater. Sekvensen som allerede nesten finnes:
   uklart → byggbart → bygget → *funnet/forstått/valgt/målt* → bevist → (send oss noe uklart).
2. **Gi stigen display-stemmen ett sted.** «FUNNET. FORSTÅTT. VALGT. MÅLT.» som monumental tittel i
   03 Effekt (i dag humanist-ingress). Det er sidens betalingsøyeblikk — nå står det i brødtekst.
3. **Innløs chrome-taglinen på bevis-seksjonen.** Erstatt «VISUELT STERKT. TEKNISK RIKTIG.» med
   «BYGD FOR Å BLI VALGT.» — taglinen som har fulgt brukeren i headeren hele veien lander idet
   bevisene vises. Det er øyeblikket juryen opplever som uunngåelighet: siden har sagt det hele
   tiden. (+ hygiene i samme slag: «brukt» → «valgt» i 02; UT-/målings-kvittering på alle 6 caser.)

### Den ENE endringen (hvis bare én)

**Erstatt Arbeid-tittelen «VISUELT STERKT. TEKNISK RIKTIG.» med «BYGD FOR Å BLI VALGT.»**
Én tittel, tre effekter: (a) sidens eneste generiske display-linje dør; (b) header-taglinen — som
er tesen — blir innløst på bevisene, og hele siden knytter seg sammen bakover; (c) VALGT flyttes
fra påstand til display-nivå akkurat der casene skal bevise den. Ingen struktur endres, ingen
seksjon flyttes, én linje. Det er den høyeste avkastningen per ord på hele siden.

### Svar på det harde spørsmålet: fortjener siden en award på redaksjonell kjerne?

Ikke ennå — men den er nærmere enn motion-analysen antydet. Kvitterings-systemet (MÅLEPUNKT / UT —)
er en genuin redaksjonell signatur ingen WebGL-side har, og «SEND OSS NOE UKLART» er en avslutning
på award-nivå. Det som mangler er ikke en ny idé, men **disiplinen til å la fem overskrifter tjene
én tese**. Premisset ditt holder: veien går gjennom redaksjonell uunngåelighet, ikke spektakkel —
og «SETTES»-grammatikken (se Signatur-seksjonen) blir da riktig dimensjonert som *krydder på* denne
ryggraden, ikke som bærebjelke. Motion-anbefalingen nedjusteres tilsvarende: gjør copy-ryggraden
først; den koster én skriveøkt og flytter mer enn noen tween.

---

## Signatur (fersk analyse 2026-07-08 — «uklart→valgt som mekanikk»-linsen, live preview)

### Dommen: siden har et proto-signatur-øyeblikk, ikke en signatur.

Kandidaten er scatter→assemble i bro 01 («UKLART BLIR BYGGBART.» — bokstaver spredt, låser seg på
scrub; observert live med mellomtilstander der BYGGBART låser før første linje). Fire grunner til at
det ikke holder til SOTD i dag:

1. **Det skjer én gang, på feil sted.** Grepet brukes opp på en transisjonsseksjon midt i siden og
   kommer aldri tilbake. Et engangs-grep leser som triks; et gjentatt grep leser som identitet.
2. **Hero motsier konseptet.** Siden som handler om klargjøring *starter ferdig klargjort* —
   TIGON STUDIO står knivskarpt fra første frame (verifisert ved reload). Det ene stedet «uklart»
   burde eksistere, finnes det ikke.
3. **Utførelsen er sjanger-generisk.** Spredningen er tilfeldige posisjoner/rotasjoner — en
   SplitText-øvelse enhver jury har sett. Ingenting i selve spredningen er *Tigon* (ingen
   grid-logikk, intet system).
4. **Resten av siden PÅSTÅR uklart→valgt, men UTFØRER det aldri.** Overlevering-broen lyser ord fra
   grå→hvit (scrub), Arbeid- og System-titlene står i statisk to-tone (dimmet/lys). Det er samme
   semantikk — uoppløst/valgt — men som *fargetilstand*, ikke *adferd*. Verifisert live: «er ikke
   ferdig.» går hvit mens «Ferdig bygget» blir stående dim; «VISUELT ~STERKT.~ TEKNISK RIKTIG.»
   veksler dim/lys statisk.

**Hypotesen din er riktig**, med én presisering: mekanikken må være en *grammatikk* (hvordan alt på
siden ankommer), ikke enda et øyeblikk. Ett øyeblikk til ville bare gitt to triks. Råvaren er uvanlig
god fordi siden allerede har hele det semantiske systemet (scatter-broen + to-tone-dimming) — det er
bare aldri koblet til én adferd.

### Anbefalt retning: «SETTES» — grid-kvantisert skarpstilling som sidens grammatikk

**Idéen:** Alt display-materiale på siden *settes på plass* — som løs sats som låses i en
settekasse. Ikke fly-inn, ikke blur, ikke scramble: bokstaver står 1–2 grid-steg ute av posisjon i
dimmet tone (greige/`--on-dark-54`), og ved terskel **snapper alle samtidig** til posisjon + løftes
til bone. Låsingen er øyeblikket — et mekanisk «klikk», ikke en glidning. Kvantiseringen (offsets i
faste steg, ingen tilfeldighet, ingen rotasjon) er det som gjør den *Tigon*: den ser konstruert ut,
ikke dekorert.

**Tre amplituder av samme adferd (dette er strukturen som gjør det til signatur):**
- **Ambient** — alle kondenserte seksjonstitler (BYGGER, VISUELT STERKT…, UKLART INN SYSTEM UT.,
  SEND OSS NOE UKLART.) settes med liten amplitude (subtilt, 1 grid-steg, ~120ms snap, 8ms stagger).
  Etter snap fylles en ▪ / «LÅST»-tick i seksjonens mono-label — kobler til fase-ticker-idéen (A).
- **Monumental** — bro 01 beholdes som grammatikkens fullskala-instans, men re-kvantiseres: samme
  steg-logikk med stor amplitude i stedet for tilfeldig scatter. Da blir broen retroaktivt
  «statementet» av samme språk, ikke et løsrevet triks.
- **Tilbakeholdt** — i kontakt står ordet **UKLART** som det ENESTE på siden som aldri settes helt
  (ett grid-steg ute, dimmet) — til hover/fokus, da låser det. Sidens eneste uløste element er
  invitasjonen. Det er detaljen juryen forteller videre.

**Teknisk:** SplitText (chars) per display-tittel; FROM-only transforms (translate + opacity — null
CLS); ScrollTrigger scrub frem til terskel (~40 % inn i viewport), deretter hard tween til null;
farge greige→bone i snap-frame; `will-change: transform` kun under aktiv trigger; reduced-motion/no-JS
= SSR-ferdigsatt tekst. Ingen nye avhengigheter — GSAP + SplitText finnes i stacken.

**Hvorfor signatur og ikke pynt:** (a) én adferd, tre amplituder, gjennomført med disiplin — juryer
husker *adferd som matcher tesen*, og tesen står ordrett i copyen tre steder; (b) kvantiseringen gjør
den gjenkjennelig som system — den kan beskrives i én setning («alt på siden settes som sats»);
(c) den løser samtidig at heroen motsier konseptet.

**Krever godkjenning:** hero-tittelen bør gjøre fullversjonen én gang on-load (~600ms settling).
Hero-regelen freder struktur/innhold; dette er entrance-motion, men flagges likevel. Uten hero-biten
står grammatikken fortsatt, men mister åpningsslaget. NB: «maks 1–2 signatur-øyeblikk» — grammatikk
er ikke et øyeblikk, men bro 01 + tilbakeholdt UKLART bør regnes som de to øyeblikkene; ingen flere.

### Forkastede retninger (vurdert, ikke anbefalt)
- **«Siden bygger seg selv»** — én persistent hairline som tegner neste seksjons grid før du når den.
  Sterk idé, men krever koordinering på tvers av alle seksjoner for ikke å lese som strek-pynt, og
  konkurrerer med innholdet i stedet for å bære det. Dyrere, høyere gimmick-risiko.
- **«Uklart-materie»** — et felt av mono-fragmenter som konsumeres gjennom siden (fragmenter blir
  chips, blir kontakt-tittel). Mest minneverdig på papiret, men flørter med particles-forbudet,
  er dyr, og ville dratt siden mot lamalama-loudness. Feil språk for Tigon.

### Hva som IKKE skal gjøres
Ikke spre scramble på flere elementer (scramble er sjanger-tapet 2024–26, og den utvannede versjonen
av settingen). Ikke blur-reveals (samme grunn). To-tone-dimmingen beholdes som *hviletilstand* —
den blir grammatikkens statiske spor, ikke en konkurrent.

---

## Ideer / retninger (fra `/forside-review ideas` — kreativt mandat, DEL F)
*Fri utforskning utover sjekklista. Merk «innenfor systemet» vs. «krever godkjenning».*
*Kjørt 2026-07-08 mot live preview (alle 9 seksjoner screenshottet).*

### A. Gjør konsept-tråden eksplisitt: «Uklart → Valgt» *(innenfor systemet — størst konseptuelt løft)*
Siden har allerede en rød tråd den ikke vet om: **«UKLART BLIR BYGGBART.»** (bro 01) →
**«UKLART INN. SYSTEM UT.»** (prosess) → **«SEND OSS NOE UKLART.»** (kontakt). Det er en komplett
dramaturgi — siden ER en klargjøringsprosess. I dag leser det som tre separate overskrifter; en jury
skal oppleve det som ÉN idé. Konkret:
- La scatter→assemble-bokstavene i bro 01 være **det formelle signaturspråket** for «uklart blir klart»,
  og ekko det i miniatyr der tråden dukker opp igjen (scramble-resolve finnes alt i registeret).
- En diskret mono-mikrotype-markør i den flytende høyre-stacken som ticker gjennom sidens «faser»
  (`SIGNAL 01/04 — UKLART` → `… — VALGT`) mens man scroller. Liten, systemtro, jury-synlig.
- Copy-pass: la hver seksjonsingress peke mot samme akse (uklart/valgt) med ett ord.

### B. Hero-panelet som «system som kompilerer» *(innenfor systemet — lukker Gap 1 med konsept, ikke stock)*
Ikke video, ikke stock: la panelet være et **blueprint som tegner seg selv** — 1px hairlines i bone på
`--ink-surface` som bygger en abstrahert side-wireframe (header → grid → moduler), med mono-labels som
ticker inn (`STRUKTUR` / `FART` / `MÅLING` / `INDEKSERT ✓`). Panelet har allerede riktig mikrotype
(«TILGJENGELIG FOR PROSJEKTER», koordinater) — dette gjør det til et levende prosjektbord i stedet for
en tom flate. FROM-only, reduced-motion = ferdig tegnet tilstand. Alternativ hvis ekte medie skaffes:
én monokrom, hardt gradert prosjektopptak — men blueprint-varianten krever null assets og er mer Tigon.

### C. Én bildegradering som signatur: gråtone → farge ved valg *(innenfor systemet — løser oransje-problemet gratis)*
Bildene spriker i dag (blått vann, tulipaner, oransje gradienter/plakater) og bryter near-monochrome.
Grep: **alle bilder duotone/gråtone (blekk/bone) i hvilestand; full farge kun ved hover/åpen rad/aktivt
steg.** Det gjør tre ting samtidig: (1) selv stock ser art-directed ut, (2) synlig oransje forsvinner
fra hvilestanden uten å bytte assets, (3) fargeavsløringen ER konseptet — uklart (grått) → valgt (farge).
Ren CSS-filter, én linje per medieklasse. Dette er sannsynligvis sidens billigste craft-multiplikator.

### D. Adaptiv nav-chip *(innenfor systemet — Gap 3, synligste amatør-tell)*
Scroll-drevet tema-flagg per seksjon: mørk glass-chip over mørke flater, bone/paper-glass over lyse
(Prosess/System). Logo/tekst er allerede currentColor. I dag kolliderer mørk chip direkte med
«UKLART INN»-tittelen på lys bakgrunn — det er det første en jury trekker for.

### E. Gi igniten payoff: hairline gjennom mørket *(innenfor systemet — gjør Gap 2 til komposisjon)*
Overlevering-broen har stort dødt svart rom ETTER statementet. I stedet for å tette det: **bruk det.**
Når «Ferdig bygget er ikke ferdig.» er ferdig avdekket, tegnes én 1px hairline fra statementet ned
gjennom mørket og inn i første målepunkt i 03 Effekt — bygging kobles bokstavelig til måling. Tomrommet
blir da nødvendig for linjen (komposisjon, ikke uferdighet). Scrub, FROM-only, ett element.

### F. Detalj-tetthet: levende status-mikrotype som system *(innenfor systemet)*
Kontakt/footer har allerede koordinater + klokke — gjør det til et gjennomført system i stedet for et
enkelttilfelle: sanntidsklokke i header-stacken, `TGN—CASE / ÅR / STACK`-mono-meta på hver Arbeid-rad,
`UT →`-artefaktlinjene i Prosess beholdes. Det er denne tettheten av «noen bryr seg»-detaljer juryer
leser som craft. Billig, spres utover eksisterende flater.

### G. Prosess-steg: artefakt-kort i stedet for foto *(innenfor systemet — erstatter oransje placeholdere)*
Stegene viser i dag oransje gradient-placeholdere. Ikke erstatt med stock: Prosess er en LYS seksjon,
og det mest Tigon-ske ville være **typografiske artefakt-kort** — scope-dokumentet, wireframen,
måleplanen satt som mono-dokumenter i paper/bone med hairline-rammer (à la «dokument på bordet»).
Leveransene VISES i stedet for å illustreres. Krever null foto-assets og matcher «UT — definert retning →»-
linjene som allerede finnes.

### H. Kontakt-mikroøyeblikk: «UKLART» løser seg opp *(innenfor systemet — hele konseptet i én detalj)*
«SEND OSS NOE UKLART.» ber om det: la ordet **UKLART** stå svakt scramblet/uskarpt og løse seg til
skarp tekst on-hover (eller ved inn-scroll, én gang). Alternativt/i tillegg: hello@tigon.no
scramble-resolver ved «kopier adresse». Registeret finnes; dette er 30 minutter arbeid og den typen
detalj som blir husket i en SOTD-vurdering.

### I. Type-stemme: formaliser eller forén *(beslutning — Gap 4, bruker bestemmer)*
De humanistiske manifestene («Ferdig bygget er ikke ferdig.» / «Design kan lånes. System må bygges.» /
hello@tigon.no) mot kondensert display er i dag Gap 4. To ærlige veier: **(1) Forén** — sett manifestene
i kondensert display, én stemme, ferdig. **(2) Formaliser** — behold humanist som bevisst
«refleksjons-stemme» (manifest + e-post, ingenting annet), men da må de to manifestene være identiske i
grad/vekt/case seg imellom, ellers leser det som uhell. Anbefaler (1) for strammest uttrykk; (2) er
forsvarlig hvis kontrasten dyrkes konsekvent.

### J. Cursor-craft på media *(krever godkjenning — DEL B forbyr cursor-follow)*
Sjangerstandarden har cursor-behandling; Tigon har det kun i mockup-rammen (pixel-cursor). Forslag med
begrunnelse: **ingen follower-blob**, men en minimal cursor-state på interaktiv media — `SE CASE →`-chip
eller crosshair over Arbeid-bilder/akkordeon-rader. Det er tilstands-cursor, ikke cursor-follow, men
ligger nær nok regelen til at bruker må godkjenne. Effekt: interaktivitet annonseres uten ett ekstra
UI-element.

### Prioritering (hvis alt ikke kan gjøres)
**C → D → B → A → H** gir mest per time: C+D fjerner de to synligste tellene, B lukker hero-gapet uten
assets, A binder siden til én fortelling, H gir minneverdigheten. E/F/G er sterke nummer to-bølge.
