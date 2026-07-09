# Tigon forside — Design Director + Motion Director review (Fable 5)

> Historical review snapshot, not an active implementation contract. The 2026-07-09 decisions supersede its Work and Process proposals; see `docs/current-homepage-state.md` and `docs/decision-log.md`.

Dato: 2026-07-02
Scope: Review av hele forsiden. Ingen implementering. Ingen commit.
Input: `_design-input/notes.md`, `tigon-design-doctrine.pdf`, `tigon-current-homepage.pdf`, `_design-input/references/`, kodebasen i `src/`.

---

## Hovedfunn (les dette først)

**tokens.css definerer en lys canvas (`--color-bg: #f6f5f1`) som aldri brukes.** Alle syv seksjoner maler seg selv i samme near-black gradient (#05–#15-området). Mørk/lys-rytmen finnes i tokensystemet, men ikke på siden. Det er hovedårsaken til at seksjonene føles like.

---

# OPPGAVE A — Brutal design review

## Header
1. **Fungerer:** Kompakt, mono-nav, DotEnvelope-ikonet er en ekte custom detalj — den beste "presisjons-detaljen" på siden.
2. **Uferdig:** Ingen definert scrolled state. Brand-mark "T" er anonym mot resten av identiteten.
3. **Mangler for premium:** En holdning ved scroll (mørkere/blur, eller at nav-en trekker seg sammen). Eventuelt en diskret indikasjon på hvilket kapittel (01–06) du er i — det ville koblet headeren til den nummererte ryggraden.
4. **Beholdes:** Kompaktheten, mono-typografien, DotEnvelope.
5. **Før motion:** Definér scrolled state statisk (to tilstander, ikke animasjon).
6. **Vente på assets:** Ingenting.
7. **Overdesign-risiko:** Sticky-triks, mega-meny, morphende nav. Headeren skal være ramme, ikke attraksjon.

## Hero
1. **Fungerer:** TIGON/STUDIO-trappen er sterk, baren nederst (support + tjenestelenker + CTA) er en voksen, komponert avslutning på scenen. Skalaen er riktig.
2. **Uferdig:** Høyre visual-panel er en tom gradient-blob. Den leser ikke som "authored emptiness" — den leser som manglende asset. Det er heroens eneste svakhet.
3. **Mangler for premium:** Én mono/ascii-detalj med jobb (f.eks. `OSLO 59.9°N / AVAILABLE_FOR_PROJECTS` — teksten finnes allerede i mobilmenyen, den hører hjemme i hero). Og en regissert entrance.
4. **Beholdes:** Alt typografisk. Baren. CTA-formuleringen "Scope først. Ingen ferdig brief nødvendig." er gull.
5. **Før motion:** Bestem hva panelet ER (retning, ikke endelig asset). Motion på et tomt panel er sminke på et hull.
6. **Vente på assets:** Panel-innholdet (mockup/logo-flate per roadmap).
7. **Overdesign-risiko:** Parallax og glow for å kompensere for tomt panel. Heroen er sterk fordi den er rolig — ikke rør balansen.

## 01 / Tilnærming
1. **Fungerer:** «UKLART blir byggbart.» er sidens beste linje. Rollen (pust/bro) er riktig.
2. **Uferdig — hovedproblemet:** Seksjonen er en mini-hero. Samme arketype som hero (stort condensed ord venstre + støttetekst) og samme arketype som BYGGER rett etter. Det gir **tre display-slag på rad: TIGON STUDIO → UKLART → BYGGER.** Doctrine sier eksplisitt: ikke bruk display-fonten på hvert store statement — hero eier den. Dette er sidens tydeligste brudd på egen regel.
3. **Mangler for premium:** Editorial statement-modus à la Lesse/Ethan Suero: stor JUSTSans-setning med mixed weight/farge, der ett ord (UKLART) kan stå igjen som eneste display-aksent — eller droppe display helt her.
4. **Beholdes:** Copyen. Stillheten. At det ikke er kort, rail eller metode-diagram.
5. **Før motion:** Typografisk modusskifte + enda mer luft. Dette er en statisk endring, og den gjør at BYGGER treffer dobbelt så hardt etterpå.
6. **Vente på assets:** Ingenting. Ren typografi.
7. **Overdesign-risiko:** Å gi pust-seksjonen pynt. Jobben dens er å være stille — gjør den stillere, ikke rikere.

## 02 / Tjenester
1. **Fungerer:** BYGGER i den skalaen er et statement. Liste-ikke-grid er riktig (Lesse-prinsippet). Featured row med beskrivelse skaper hierarki: "one thing at a time".
2. **Uferdig:** De fire kollapsede radene er en død accordion — `+`-ikoner uten oppførsel, ingen hover-anatomi, fire typografisk identiske rader. Halen av seksjonen mister energi. Tags-ene er pill-chips — det nærmeste siden kommer SaaS.
3. **Mangler for premium:** Rad-anatomi: hover-highlight, pil, mono-metadata høyrestilt, tydelig åpen/lukket-tilstand. Interaksjonen ER premium-følelsen her (jf. Lesse services list-as-interaction).
4. **Beholdes:** BYGGER-størrelsen (fredet). Listeformatet. Nummereringen 01–05.
5. **Før motion:** Definér rad-tilstandene statisk (åpen/lukket/hover). Vurder tags → inline mono-liste (`TEKNISK SEO / CWV / NEXT.JS`) i stedet for chips.
6. **Vente på assets:** Eventuelt preview-panel med visuals (roadmapen nevner det — hold det til etter assets).
7. **Overdesign-risiko:** Hover-bilder à la Lamalama (kopiering), eller at radene blir kort. Radene skal føles som et presist instrument, ikke en komponent-demo.

## 03 / Effekt
1. **Fungerer:** Sidens sterkeste idé. FUNNET / FORSTÅTT / VALGT / MÅLT i den skalaen med annotasjoner er både tese og typografisk peak. Graderingen (FUNNET lys, resten dempet) antyder allerede en sekvens.
2. **Uferdig:** Den statiske graderingen er tvetydig — FORSTÅTT/VALGT/MÅLT kan leses som "disabled" i stedet for "kommer". Ordblokkene sitter i et ganske jevnt 2×2-mønster; det grid-aktige svekker følelsen av rekkefølge.
3. **Mangler for premium:** Sekvensen som *opplevelse*: dette er sidens naturlige pinned/scrubbed moment, der scroll driver FUNNET → FORSTÅTT → VALGT → MÅLT. Motion har genuin narrativ grunn her — rekkefølgen ER budskapet (man må bli funnet før man blir forstått, osv.).
4. **Beholdes:** Ordskalaen, retningen, annotasjonene. Ikke demp noe.
5. **Før motion:** Definér statisk slutt-tilstand (alle ord fylt) — det er dette mobil og prefers-reduced-motion skal vise. Vurder lett asymmetri i ordplasseringen så det leser som sekvens, ikke grid.
6. **Vente på assets:** Ingenting — seksjonen er asset-fri med vilje. Det gjør den til riktig showpiece nå.
7. **Overdesign-risiko:** For lang pin (folk skal ikke sitte fast i 5 viewports), eller annotasjons-koreografi som skjuler tekst. Sekvens, ikke sirkus.

## 04 / Arbeid
1. **Fungerer:** «Visuelt sterkt. Teknisk riktig.» er god copy. Meta/caption-strukturen (01 / Webutvikling, stack-liste) er riktig skjelett for kuratert arbeid.
2. **Uferdig — sidens svakeste punkt:** Placeholder-flatene er nesten usynlige — mørke flater på mørk bakgrunn. Seksjonen som skal være *proof* er den eneste uten noe å vise. Reisen dipper nøyaktig der den skulle peake. I tillegg deler den headline-arketype med 05 (to-linjers JUSTSans-setning + lead) — to naboer med samme hode.
3. **Mangler for premium:** **Lys tonal flip.** Dette er Fabrica/Lesse-grepet: galleri-hvit canvas der arbeidet er fargen. Off-white-tokenen finnes allerede og brukes aldri. En lys 04 gir siden sitt tonale event, gjør 03 og 05 mørkere i kontrast, og løser proof-problemet halvveis før assets i det hele tatt kommer.
4. **Beholdes:** Kuratert enkelt-case-fokus, ingen portfolio-grid, meta-systemet.
5. **Før motion:** Lys flip + komposisjon (hovedflate + detalj-crop med overlapp) — art-directed slik at ekte mockups kan slippes rett inn senere.
6. **Vente på assets:** Selve innholdet i flatene (Envato/Tigon-mockups per roadmap). Ikke komposisjonen, ikke flippen.
7. **Overdesign-risiko:** At man bygger en fake portefølje eller komponerer så stramt at ekte assets ikke passer. Bygg rammen, ikke bildet.

## 05 / Prosess
1. **Fungerer:** Stacked layers med trappe-offset er allerede den mest særegne layouten på siden. Tittelen er fredet og skal være det. Copyen er stram og selger trygghet.
2. **Uferdig:** Alle fire lag har lik visuell vekt — stabelen leser som fire tilfeldig forskjøvne flater, ikke som progresjon. Numrene er for svake til å bære spine-rollen. Header-arketypen er identisk med 04.
3. **Mangler for premium:** Statisk dybdehierarki: aktivt lag lyst og frontet, de andre dempet og bakover. Da blir stacking-motion senere en *forsterkning* av noe som allerede leses, ikke en redning.
4. **Beholdes:** Tittel-størrelsen (fredet). Stack-konseptet. Ingen timeline, ingen ikoner.
5. **Før motion:** Dybde/demping statisk + tydeligere nummer-kobling til resten av spinen.
6. **Vente på assets:** Ingenting.
7. **Overdesign-risiko:** Scroll-jacking som gjør prosessen til en SaaS product-tour. Prosess skal roe kjøperen, ikke vise muskler — den er sekundær, ikke hoved.

## 06 / Kontakt / Footer
1. **Fungerer:** «SEND OSS NOE UKLART.» er en perfekt closing som ringer tilbake til UKLART i 01 — sidens beste narrative rim. Stor e-post, wordmark-bookend mot hero, ryddig index.
2. **Uferdig:** Rytmen mellom closing-statement → e-postblokk → index er jevn og litt flat; CTA-knappene drukner litt ved siden av statement-skalaen. Wordmarken kuttes i bunn — hvis det er intensjonen (rise-effekt senere), er det riktig; statisk ser det litt tilfeldig ut.
3. **Mangler for premium:** E-posten som *interaksjonsmoment* (hover-state, evt. copy-to-clipboard med mono-bekreftelse). Gustaf Furusten-ro i partiet før wordmarken.
4. **Beholdes:** Alt strukturelt: index-lenkene (SEO — ikke rør), NAP, statement, bookend-ideen.
5. **Før motion:** E-post-skala og rytme mellom blokkene.
6. **Vente på assets:** Ingenting.
7. **Overdesign-risiko:** Å animere footeren. Den er utpust — ett wordmark-rise og én hover er nok.

---

# OPPGAVE B — Journey / break-up audit

1. **Mest repetitivt:** (a) Tonalt — alle syv seksjoner er samme near-black gradient; det finnes ingen lys/mørk-rytme i det hele tatt. (b) Typografisk — tre condensed display-slag på rad i åpningen (TIGON STUDIO → UKLART → BYGGER). (c) Arketype — 04 og 05 deler identisk header-oppsett.
2. **Reisen mister energi:** Midt i 04 (proof-punktet er tomt) og i halen av 02 (fire like, døde rader).
3. **Tydeligst behov for break-up:** Inn i 04 (hard cut mørk→lys) og ut av 04 (lys→mørk inn i Prosess). Ett lyst kapittel gir hele siden puls.
4. **Mer pust:** 01 (gjør den sparere, ikke rikere) og partiet før wordmarken i 06.
5. **Mer visuell proof:** 04 først og fremst; hero-panelet sekundært. Ingen andre steder — resten av siden skal være typografisk.
6. **Mer interaksjon:** 02 (service-rader er sidens naturlige interaksjonsflate) og e-posten i 06. Ikke flere steder.
7. **Hoved-showpiece:** 03 / Effekt. Emosjonelt toppunkt per storyboardet, asset-fritt (kan bygges nå), og motion har ekte narrativ grunn: rekkefølgen er budskapet.
8. **Sekundær-showpiece:** 05 / Prosess — stacking-reveals, men uten pin i første omgang.
9. **Rolige seksjoner:** Header, 01, 06. Disse skal nesten ikke bevege seg.
10. **Motion-fordeling:** 03 = pin+scrub (sidens ene pinned moment). 05 = ScrollTrigger stack-reveals uten pin. 02 = interaksjon (hover/accordion), ikke scroll-motion. 04 = én clip-reveal + svak parallax. Hero = engangs entrance. 01 = kun text-fill scrub. Header + 06 = tilnærmet statiske (kun micro).

---

# OPPGAVE C — Seksjonsrolle / art direction map

| Seksjon | Rolle | Tonal verdi | Focal point | Layout-arketype | Break-up inn | Break-up ut | Motion role | Statisk | Beveger seg |
|---|---|---|---|---|---|---|---|---|---|
| Header | Ramme/anker | Mørk, kompakt | Wordmark | Bar | — | — | Ingen | Alt | Kun micro (underline, meny) |
| Hero | Åpningsscene | Mørk, kinematisk | TIGON STUDIO | Fullskjerm stage + bar | — | Baren = terskel, skarp linje mot 01 | Engangs entrance | Bar, lenker, CTA | Tittel-reveal én gang; svak panel-parallax |
| 01 Tilnærming | Pust / tese-bro | Mørk, varmere charcoal, spars | Statement-setningen | Sentrert/asymmetrisk editorial statement | Stillhet etter hero-baren | Kontrast: stillhet → BYGGER-slaget | Scrub text-fill, ingen pin | Layout, label | Kun tekstfyll grå→off-white |
| 02 Tjenester | Katalog / densitet | Mørk, tettere | BYGGER + åpen rad 01 | Display-ord + interaktiv liste | Skala-sjokk (BYGGER) | Siste rad-linje → mørkeste flate (03) | Interaksjon (hover/accordion) | Header, intro | Rad-reveals én gang; hover 150ms; åpne/lukke |
| 03 Effekt | **Emosjonelt toppunkt / HOVED-SHOWPIECE** | Mørkest på siden | Ordsekvensen | Typografisk canvas m/ annotasjoner | Tonal senkning, mer rom | **Hard cut mørk→lys** | Pin + scrub sekvens (desktop) | Slutt-tilstand: alle ord fylt | Ordfylling + annotasjonsbytte i sekvens |
| 04 Arbeid | Proof / galleri | **LYS (off-white) — sidens tonale event** | Hovedvisual | Editorial case-oppslag, overlappende plan | Hard cut fra 03 | Visual overlapper grensen ned i 05 | Reveal only | Alt unntatt reveal | Clip-reveal av visual; ±3–4 % parallax |
| 05 Prosess | Trygghet / sekundær-showpiece | Tilbake til mørk, tung | Lagstabelen | Stacked surfaces | Lys→mørk cut + overlapp fra 04 | Stabelen «lander» → rolig footer | Stack-reveals, ingen pin (v1) | Header, tittel (fredet) | Lag som stables inn; aktiv/dempet-skifte |
| 06 Kontakt | Utpust + konvertering | Mørkest → wordmark | SEND OSS NOE UKLART → e-posten | Statement + direct + index + bookend | Ro etter prosess-stabelen | Wordmark-rise = siste bilde | Nesten statisk | Index, NAP, lenker | Wordmark-rise én gang; e-post hover |

Merk mønsteret: ingen naboer deler lenger kombinasjonen layout + tone + motion-rolle — det er seksjonsregelen fra operating system-dokumentet, oppfylt.

---

# OPPGAVE D — Break-up plan (uten nye seksjoner)

## D1. Light/dark tonal flip på 04 / Arbeid — *viktigste grepet på hele siden*
- **Endres:** 04 bytter til off-white canvas (`--color-bg` finnes allerede), ink-tekst, lys meta. 03→04 blir hard cut, 04→05 lys→mørk.
- **Hvorfor:** Gir siden den eneste ekte tonale hendelsen; gjør 03 og 05 tyngre i kontrast; lys galleri-canvas er riktig scene for arbeid («let the work be the color»).
- **Filer:** `src/styles/tokens.css` (dark/light-tema på samme token-navn), `src/styles/work-showcase.css`, `src/components/WorkShowcase.tsx` (evt. `data-theme`-attributt).
- **Kompleksitet:** Medium. **Risiko:** Medium — bruk samme varme gråskala (#f6f5f1/#10100f) så det føles som samme hus; test AA-kontrast på meta-tekst.

## D2. Typografisk modusskifte på 01 / Tilnærming
- **Endres:** Sans-ledet statement med mixed weight; display-fonten enten kun på ordet UKLART eller helt ute. Mer luft, asymmetrisk plassering.
- **Hvorfor:** Bryter tre-display-på-rad-problemet; BYGGER får slå alene; 01 blir en ekte pust-seksjon.
- **Filer:** `src/components/ApproachStatementBridge.tsx`, `src/styles/approach-statement-bridge.css`.
- **Kompleksitet:** Lav. **Risiko:** Lav — copy beholdes uendret.

## D3. Overlapping visual plane 04→05
- **Endres:** Hovedvisualen i 04 trekkes med negativ margin over seksjonsgrensen inn i 05s mørke felt.
- **Hvorfor:** «Transitions should feel authored» — den lyse flaten som stikker inn i mørket syr kapitlene sammen og gjør cut-en til en komposisjon, ikke bare et fargebytte.
- **Filer:** `src/styles/work-showcase.css`, evt. `src/styles/process-layers.css` (top-padding).
- **Kompleksitet:** Medium. **Risiko:** Medium — responsive edge cases; dropp overlapp på mobil.

## D4. Service-row-anatomi i 02
- **Endres:** Hover-highlight (rad lysner 4–8 %), pil, mono-meta høyrestilt, tydelig åpen/lukket-tilstand; tags fra chips til inline mono-liste.
- **Hvorfor:** Gir halen av 02 liv og gjør listen til sidens interaksjonsflate uten å bli kort-grid.
- **Filer:** `src/components/WhatWeBuild.tsx`, `src/styles/what-we-build.css`.
- **Kompleksitet:** Lav (statisk anatomi) — accordion-oppførsel kommer i motion-pass. **Risiko:** Lav.

## D5. Statisk stacking-hierarki i 05
- **Endres:** Lag 01 front og lys, 02–04 gradvis dempet/mindre; sterkere numre; antydet forbindelseslinje i spine-aksen.
- **Hvorfor:** Stabelen leser som progresjon i stedet for fire tilfeldige flater; forbereder stack-motion.
- **Filer:** `src/components/ProcessLayers.tsx`, `src/styles/process-layers.css`.
- **Kompleksitet:** Lav-medium. **Risiko:** Lav. Ikke rør tittelen.

## D6. Oversized e-post + wordmark-rise-forberedelse i 06
- **Endres:** `hello@tigon.no` opp i skala (mot section-title-nivå), egen luft rundt; wordmark posisjonert for rise (statisk: delvis synlig fra bunn er OK når det ser intendert ut — gi den en tydelig baseline-linje).
- **Hvorfor:** Closing trenger ett fokuspunkt etter statementet; e-posten er konverteringen.
- **Filer:** `src/components/ContactFooter.tsx`, `src/styles/contact-footer.css`.
- **Kompleksitet:** Lav. **Risiko:** Lav. Ikke rør index/NAP/lenker (SEO).

## D7. Effekt: definert statisk slutt-tilstand + sekvens-asymmetri
- **Endres:** Alle fire ord fylt som default (dette blir PRM/mobil-tilstanden); lett vertikal forskyvning mellom ordblokkene så det leser som rekkefølge, ikke 2×2-grid.
- **Hvorfor:** Fjerner «disabled»-tvetydigheten og gjør at pinned-versjonen senere har en ren fallback.
- **Filer:** `src/styles/what-we-improve.css`.
- **Kompleksitet:** Lav. **Risiko:** Lav.

## D8 (valgfri, lavest prioritet). Dot-motif som delt element
- **Endres:** DotEnvelope-punktmønsteret fra headeren brukes som diskret kapittel-divider maks to steder (hero→01, 05→06).
- **Hvorfor:** Delt element som binder reisen til identiteten — men kun hvis den får en jobb (terskel-markør). Uten jobb er det pynt: dropp den heller.
- **Filer:** `src/styles/base.css` + liten komponent.
- **Kompleksitet:** Lav. **Risiko:** Medium — forslaget med høyest pynt-fare. Skal kunne kuttes uten tap.

---

# OPPGAVE E — Motion / GSAP blueprint

Fundament: `src/lib/motion.ts` er allerede riktig (Lenis kun desktop, av på touch/mobil/PRM, GSAP-ticker-integrasjon). Bygg videre på den + `gsap.matchMedia()` for breakpoints og reduced motion. Tokens finnes (`--motion-fast/base/medium`, `--ease-standard`); legg til easeOutExpo for reveals.

| Seksjon | Hva skjer | CSS/GSAP | ScrollTrigger | Pin | Scrub | Desktop | Mobil | PRM | Kompl. | Risiko |
|---|---|---|---|---|---|---|---|---|---|---|
| Header | Underline 150ms, meny 300ms, scrolled state | CSS (+1 IO-klasse) | Nei | Nei | Nei | Full | Samme | Ingen transitions | Lav | Ingen |
| Hero | Engangs entrance: tittel-linjer maske-reveal 500ms, stagger 0.06; bar fade 300ms; deretter svak panel-parallax | GSAP timeline; parallax m/ ST | Kun parallax | Nei | Kun parallax | Entrance + parallax | Kun entrance (forenklet) | Alt synlig, ingen motion | Medium | CLS hvis tekst skjules før JS — animer FROM med klasse satt av JS, aldri skjult i CSS |
| 01 | Statement fylles grå→off-white mens man scroller forbi | GSAP + ST | Ja | **Nei** | Ja (myk) | Scrub-fill | Engangs-reveal ved 30 % viewport | Full farge statisk | Lav-medium | Lav |
| 02 | Rad-reveals én gang (300ms, stagger 0.04), linje-draw 400ms; hover 150ms (CSS); accordion åpne/lukke 300–400ms | Hover: CSS. Reveals/accordion: GSAP | Ja (batch, once) | Nei | Nei | Alt | Samme, uten linje-draw | Rader synlige, kun hover-farge | Medium | Accordion må ikke skjule SEO-tekst — innhold i DOM, kun høyde animeres |
| 03 | **Showpiece:** pin, scrub gjennom 4 tilstander — ord fylles i rekkefølge, forrige dempes lett, annotasjon aktiveres (300ms) | GSAP + ST | Ja | **Ja (sidens eneste)** | Ja | Pin ~2–2.5 viewports, 4 steg | **Ingen pin** — ord + annotasjoner reveales sekvensielt on-scroll | Statisk: alle ord fylt, alle annotasjoner synlige | Høy | For lang pin dreper flyt; hold total pin < 250vh; tekst alltid i DOM |
| 04 | Clip-path-reveal på hovedvisual 600ms én gang; meta-stagger 0.05; ±3–4 % parallax på visual | GSAP + ST | Ja | Nei | Kun parallax | Alt | Kun reveal, ingen parallax | Visual synlig statisk | Medium | Reveal må ikke gjelde tekst/lenker — kun den dekorative flaten |
| 05 | Lag stables inn: hvert lag glir på plass (400–500ms), forrige dempes/skalerer 0.98; aktiv-tilstand følger scroll | GSAP + ST (per lag) | Ja | **Nei (v1)** — evt. pin-oppgradering etter live | Delvis (dempings-interpolasjon) | Stack-koreografi | Statisk stabel, enkel fade per lag | Statisk stabel m/ hierarki fra D5 | Medium-høy | Må ikke bli product-tour; ingen scroll-jack |
| 06 | Wordmark rise 600ms én gang; index-rader 300ms stagger 0.03; e-post hover underline-clip 150ms | Hover: CSS. Resten: GSAP once | Ja (once) | Nei | Nei | Alt | Samme | Statisk, hover beholdes | Lav | Footer skal være utpust — ikke mer enn dette |

Regler overholdt: maks 1 pinned moment (03), ingen pin på mobil, micro 150ms, reveals 300ms, store overganger 400–600ms, stagger 0.02–0.08, all viktig tekst server-rendret og synlig uten JS.

---

# OPPGAVE F — Codex-sprinter

*(Alle sprinter respekterer AGENTS.md: én seksjon per task — sprint = ordnet sekvens av seksjonsscopede tasks, hver med egen validering.)*

## SPRINT 1 — Static art-direction / break-ups
- **Hva (i rekkefølge):**
  1. Light-theme-tokens i tokens.css
  2. 04 Arbeid: lys flip + komposisjon + overlapp (D1+D3)
  3. 01 Tilnærming: typografisk modusskifte (D2)
  4. 02: rad-anatomi statisk (D4)
  5. 05: stacking-hierarki (D5)
  6. 03: slutt-tilstand + asymmetri (D7)
  7. 06: e-post-skala + rytme (D6)
- **Hvorfor:** Tonal rytme og arketype-variasjon er statiske problemer. GSAP oppå dagens flate side blir animert flathet.
- **Filer:** `tokens.css`, `work-showcase.css`+`WorkShowcase.tsx`, `approach-statement-bridge.css`+`ApproachStatementBridge.tsx`, `what-we-build.css`+`WhatWeBuild.tsx`, `process-layers.css`+`ProcessLayers.tsx`, `what-we-improve.css`, `contact-footer.css`+`ContactFooter.tsx`.
- **Må ikke røres:** Hero + Header (fredet foundation), BYGGER- og Prosess-tittel-skala, all copy i 01/06, footer-index/NAP/lenker, metadata/SEO, `src/app/layout.tsx`.
- **Validering:** `npm run build`, `npx tsc --noEmit`, `git diff --check`; visuell squint-test per seksjon (ett fokuspunkt?); AA-kontrast på lys 04; sjekk at ingen naboer deler layout+tone-kombinasjon; ingen orange synlig.

## SPRINT 2 — Motion foundation
- **Stack:** GSAP + ScrollTrigger + eksisterende Lenis-oppsett i `src/lib/motion.ts` (ikke bygg nytt). `gsap.matchMedia()` for mobil + PRM.
- **Motion tokens:** Legg `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` i tokens.css; bruk eksisterende duration-tokens.
- **Innhold:** Hero entrance (engangs), 01 text-fill, 02 rad-reveals + accordion + hover-micro, 04 clip-reveal + meta-stagger, 06 once-reveals + e-post-hover. **Ikke** 03-pinnen ennå.
- **PRM:** Hver effekt bak `canUseSmoothMotion()`/matchMedia; CSS-default = alt synlig.
- **Filer:** `src/lib/motion.ts` (+ evt. `src/lib/reveal.ts`), tynne client-wrappers per seksjon (f.eks. `src/components/motion/*.tsx` slik at seksjonskomponentene forblir server-rendret), seksjons-CSS for hover-states.
- **Validering:** Build/tsc/diff-check; test med JS av (alt innhold synlig); PRM-emulering; ingen CLS (Lighthouse); 60fps-sjekk i devtools.

## SPRINT 3 — Signature motion
- **Showpiece:** 03 / Effekt.
- **Hva:** Pin + scrub, 4 steg: hvert ord fylles til off-white mens forrige dempes ett hakk og tilhørende annotasjon aktiveres. Total pin ~200–250vh. Én gjennomkjøring — ingen looping, ingen ekstra effekter.
- **Desktop:** Full pin+scrub. **Mobil:** Ingen pin — sekvensielle reveals med IntersectionObserver/ST-once. **PRM:** Statisk (alle fylt — allerede bygget i Sprint 1).
- **Deretter (hvis alt sitter):** 05 stack-koreografi uten pin.
- **Filer:** `WhatWeImprove.tsx` + motion-wrapper, `what-we-improve.css`; evt. `ProcessLayers`-tilsvarende.
- **Validering:** Pin-lengde-følelse (be om menneskelig gjennomscroll), 60fps, mobil, PRM, CWV/Lighthouse før/etter, tekst tilgjengelig uten JS.

---

# OPPGAVE G — Hard anbefaling

1. **Trenger siden static pass før GSAP?** Ja, ufravikelig. Sidens problem er tonal og arketypisk flathet — det er statiske feil. Motion oppå dagens tilstand er animert monotoni. Sprint 1 er ikke valgfri.
2. **De 3 viktigste break-upsene:** (1) Lys flip på 04 Arbeid — sidens ene tonale hendelse. (2) Typografisk modusskifte på 01 — dreper tre-display-på-rad-problemet. (3) 03 Effekt som regissert sekvens (statisk forberedt nå, pinned senere).
3. **Hoved-showpiece:** 03 / Effekt. Asset-fri, emosjonelt toppunkt, og motion har ekte narrativ jobb der (rekkefølgen er budskapet). Prosess-stacking er sekundær.
4. **Roligst:** 01 / Tilnærming. Tett fulgt av 06 — footeren skal være utpust, ikke finale-show.
5. **Codex først:** Light-theme-tokens + 04-flippen. Endringen med høyest effekt per linje kode, og alt annet i Sprint 1 kalibreres mot den.
6. **Vente til assets:** Innholdet i 04-flatene (ekte mockups) og hero-panelets innhold. Ikke komposisjonen, ikke flippen — bygg rammen nå.
7. **Vente til etter live:** Pin-oppgradering av 05, preview-panel i 02, dot-motif-divideren (D8), Lenis-finjustering, copy-to-clipboard-detaljer.
8. **Aldri gjøres:** Krympe BYGGER eller Prosess-tittelen. Orange. Kort-grid eller portfolio-grid. WebGL/partikler/cursor-gimmicks. Display-fonten på alle statements. Animere footeren eller «alt litt». Røre SEO/metadata/index-lenker. Gjøre 02 om til chips-og-kort-SaaS.
9. **Er siden nær nok?** Ja — dette er en side som trenger én fokusert statisk revisjonsrunde, ikke en større redesign. Typografien, copyen, spinen og seksjonsskjelettene er på plass og over gjennomsnittet. Det som mangler er én tonal hendelse, én arketype-opprydding i åpningen, og proof i 04. Etter Sprint 1 vil motion løfte den til Awwwards-inspirert nivå; uten Sprint 1 vil motion bare gjøre flatheten synligere.
