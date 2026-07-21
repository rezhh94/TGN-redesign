# TRIONN.COM — designarkitektur og verdisystem for forsiden

> **Formål:** Søsterdokument til
> `TRIONN-HOMEPAGE-ANIMATION-BREAKDOWN.md`, basert på samme lokale speil fra
> 2026-07-19. Målet er å forstå hvordan en side på dette håndverksnivået
> konstrueres, slik at Tigon kan utvikle en egen visuell identitet — ikke å
> reprodusere Trionns design, innhold, kode, shaders eller assets.
>
> **Evidens:** `[SOURCE]` betyr direkte lest fra speilet. `[BEREGNET]` betyr
> utregnet fra kildeverdier. `[TOLKNING]` betyr en begrunnet designlesning.
> `[USIKKER]` markerer at minifisert/generated kode ikke beviser intensjonen.
>
> **Verdigrense:** `[GENERISK]` er en vanlig metode eller bransjestandard som
> kan brukes fritt. `[TRIONN-ID]` er en konkret kombinasjon eller verdi som
> bærer Trionns uttrykk og bare skal brukes som kalibrering.
>
> **Forrang:** Tigons `design.md`, `src/styles/tokens.css`, aktive
> seksjonskontrakter og `docs/trionn-ekstrakt.md` vinner ved konflikt.

---

# DEL 1 — DESIGNARKITEKTUR

## 1.1 Den overordnede konstruksjonen

Trionn bygger ikke forsiden som én kontinuerlig layoutmodell. Den veksler
mellom tre arketyper:

1. **ordinær dokumentflyt** for tekst som må kunne leses uten JS;
2. **viewport-scener** på `min-height: 100dvh` for tydelige kapitler;
3. **lange progresjonsdomener** der ScrollTrigger pinner ett viewport-lag og
   deler scrollen inn i faser.

Dette er `[GENERISK]` som arkitektur. Den konkrete tettheten av pins, WebGL og
overlapp er `[TRIONN-ID]` og skal ikke kopieres som en sideoppskrift.

| Del | Layout og dimensjonering `[SOURCE]` | Hvorfor konstruksjonen virker | Merking |
| --- | --- | --- | --- |
| Preloader | Fixed viewport-overlay, ti flex-belter, separat sentrert logo-rigg med `perspective: 800px`; systemlag på z `9050–9500` | Hele skjermen kan lukkes/åpnes uten å påvirke dokumentgeometrien | Fixed overlay er `[GENERISK]`; den lange logo-/beltesekvensen er `[TRIONN-ID]` og `REJECT` for Tigon |
| Hero | `min-h-dvh`, vertikal flex med `justify-between`; 12-kolonners topp/bunnblokker; Three-canvas absolutt i full viewport og pin på `300–400%` | Tekst ligger i ekte HTML over et uavhengig visuelt lag. Flex låser topp og bunn uten manuell y-posisjonering | HTML-over-canvas er `[GENERISK]`; det eksploderende symbolet er `[TRIONN-ID]` |
| About | Normal flow, `min-h-dvh`, sentrert flex-kolonne og 12-kolonners innhold | Gir en lesepause etter Hero uten enda en pin. Motion kan fjernes uten layouttap | `[GENERISK]`, relevant `KEEP` |
| Vision | Eksakt `h-dvh/min-h-dvh`; innhold i flex-kolonne, 12-kolonners tekstblokker og absolutt fem-lags stripefelt. Seksjonen pin-es `150–200%` | Ett tydelig fullskjermutsagn får tid, mens stripefeltet håndterer kapittelskiftet | Fullskjermfokus er `[GENERISK]`; eksakt wipe og varighet `[TRIONN-ID]` |
| Key Facts | Lys normal-flow-seksjon med `min-h-dvh`. Desktop: flex/flex-wrap med `perspective: 1400px`. Mobil: horisontal liste i egen pinned gren | Samme innhold får to konstruksjoner: romlig kortvifte på stor skjerm, lesbar sekvens på liten | Strukturell responsiv deling er `[GENERISK]`; kortuttrykket `[TRIONN-ID]` |
| Work | Desktop-roten er `h-dvh`, med Work og Services som to absolutte fullskjermlag (`z-2` over `z-1`) inni én `1350%` pin. Mobil lar Work gå i normal flow | To kapitler kan koreograferes som én reise fordi lagene deler koordinatsystem | Progress-segmentering er `[GENERISK]`; `1350%`-reisen er `[TRIONN-ID]` |
| Services | Fullskjerm scene med 371-frame sekvens, video, tekstlag, 3D-kort og fem exit-striper. Mobil får egen `800%` pin | Ett scene-eierskap samler måling, media og transitions og unngår mange konkurrerende triggere | Én eier er `[GENERISK]`; mediatettheten er `[TRIONN-ID]` og `REJECT` som Tigon-standard |
| Testimonials | Normal-flow `min-h-dvh`, 12-kolonners grid og Swiper i høyre del; ingen seksjonspin | Etter lang Services-reise får brukeren ordinær kontroll og en stabil lesehastighet | `[GENERISK]`, relevant `KEEP` |
| Dribbble | `h-dvh` med absolutt WebGL-canvas, absolutt sentertekst og fem striper. Egen pin på ca. `4.5/6.5` viewport-høyder | Canvas, tekst og footer-handoff kan utvikle seg på samme lokale klokke | Lagdelingen er `[GENERISK]`; orbit/shader og lengde `[TRIONN-ID]` |
| Footer | `min-h-dvh`, flex-kolonne og 12-kolonners innholdsgrid over en absolutt WebGL-bakgrunn. Footer trekkes opp `-100dvh` under Dribbble | Footer finnes allerede under slutt-wipen og oppleves som samme scene uten å miste ekte footer-HTML | Overlappsteknikken er `[GENERISK]`; shader/lyd er `[TRIONN-ID]` |

### Grid- og containermodellen

- `[SOURCE][GENERISK]` Hovedinnhold bruker konsekvent 12 kolonner med
  `gap: 1.5rem` (`gap-6`). Gridet fordeler innhold asymmetrisk, for eksempel
  Hero `8/12`, Footer `7/5` eller `8/4`.
- `[SOURCE]` `.tr__container` bruker `1.5rem` sidepadding og `2.5rem` fra
  `768px`. Det finnes ingen eksplisitt maksbreddelås på denne klassen i det
  analyserte homepage-CSS-et; brede skjermer håndteres i hovedsak gjennom
  kolonnespenn og den dynamiske rotstørrelsen.
- `[TOLKNING]` Dette gjør layouten mer viewport-komposisjonell enn klassisk
  sentrert marketing-container. Prinsippet kan adapteres, men Tigon bør beholde
  sitt eksisterende `--page-max` og `--homepage-gutter`.

## 1.2 Typografisk system

### Roller

Trionn bruker fire tydelige roller:

- Familjen Grotesk som display/titler;
- Neue Haas som brødtekst;
- Martian Mono som knapper/systemtekst;
- PP Editorial som tall/kontrast.

Rollefordeling er `[GENERISK]`. Fontene og kombinasjonen er `[TRIONN-ID]`.
Tigon beholder TGS Perfect, JUST Sans og Caleb Mono.

### Skalaens logikk

Det er **ikke** en klassisk modulær skala på 1.25 eller 1.333.

- `[SOURCE]` H1/H2/H2-big er nesten samme displaynivå med ulike minverdier:
  `6.614vw`, `6.283vw` og `6.349vw`.
- `[BEREGNET]` Forholdet H1/H2 i fluidsonen er `6.614 / 6.283 = 1.053`.
  H2-big/H2 er `1.011`. Dette er optiske varianter av ett nivå, ikke trinn i
  en skala.
- `[SOURCE]` Marquee er et separat superdisplaynivå på `9.164vw`; mot H1 er
  forholdet omtrent `1.386` i fluidsonen og `1.6` ved makstakene.
- `[TOLKNING]` Hierarkiet bygges gjennom rolle, font, tracking og plassering
  mer enn gjennom en ren matematisk størrelsestrapp.

### Den uvanlige flytende roten

`html` bruker `font-size: calc(1000vw / var(--size))`, der `--size` byttes ved
`440/640/768/1024/1280/1441/1536px`.

| Viewport | `--size` | Beregnet rot | Hvorfor dette betyr noe |
| --- | ---: | ---: | --- |
| 390px | 320 | 12.19px | Mobile rem-verdier skalerer med skjermbredden |
| 768px | 750 | 10.24px | Roten resettes ved breakpointet; samme rem blir fysisk mindre |
| 1024px | 850 | 12.05px | Layouten vokser igjen innen neste designsegment |
| 1440px | 1000 | 14.40px | Desktop når et større kompositorisk format |
| 1536px | 1280 | 12.00px | Ny reset for svært brede skjermer |
| 1920px | 1280 | 15.00px | Vokser videre innen siste segment |

`[SOURCE][TRIONN-ID]` Dette ligner skalering mot flere design-canvasbredder.
`[USIKKER]` Generated CSS beviser ikke om diskontinuitetene er tilsiktede eller
et resultat av prosjektets responsivverktøy. Tigon bør ikke kopiere formelen;
bruk eksisterende stabile type- og gutter-clamps.

## 1.3 Spacing og rytme

Grunnenheten er Tailwinds `--spacing: .25rem`. Systemet er derfor formelt en
4px-stige ved 16px rot, men den flytende roten gjør den reelt responsiv.

| Lag | Faktiske mønstre `[SOURCE]` | Hvorfor | Merking |
| --- | --- | --- | --- |
| Mikro | `1–6` enheter: `.25–1.5rem`; linjer 1px; radius 2/4/6/8px | Holder labels, ikonmellomrom og kontrollflater presise | 4px-logikken `[GENERISK]`; eksakt komprimering `[TRIONN-ID]` |
| Innholdsgrid | `gap-6 = 1.5rem`, Footer `gap-10/12 = 2.5/3rem` | Ett kompakt standardgap, større gap bare når gridets rolle endres | `[GENERISK]` |
| Containerkant | `px-6 = 1.5rem`; fra 768px `px-10 = 2.5rem` | Kantsonen byttes i ett strukturelt trinn i stedet for kontinuerlig clamp | `[GENERISK]` |
| Seksjonsinnrykk | `pt-20/25/30/37.5`, `pb-14/20/40` = `5/6.25/7.5/9.375/3.5/5/10rem` | Kapitler får ulik inngang/utgang etter dramaturgisk rolle | Rollen `[GENERISK]`; tallene `[TRIONN-ID]` |
| Makrotid | `150–200%`, `300–400%`, `800%`, `1350%` scrollspor | Vertikal avstand fungerer som tidsbudsjett for pinned scener | Teknikken `[GENERISK]`; eksakte budsjetter `[TRIONN-ID]` |
| Overlapp | `margin-top: -100dvh` ved Services→Testimonials og Dribbble→Footer | Neste scene ligger fysisk klar under wipe-laget | `[GENERISK]`, men bør brukes sjelden |

`[BEREGNET]` Ved 1440px er spacing-enheten `3.6px`, `gap-6` omtrent `21.6px`
og desktopgutteren omtrent `36px`. Ved 390px er enheten ca. `3.05px` og
gutteren ca. `18.3px`. Det er altså et 4px-basert system i koden, men ikke et
fast 4px-grid i rasteret.

## 1.4 Lagdeling og z-index

Verdiene samler seg i tydelige bånd:

| Bånd | Observerte verdier | Rolle og begrunnelse |
| --- | --- | --- |
| Lokal scene | `0–5` | canvas, media, tekst og lokale kontroller. `[GENERISK]` |
| Kapittel/handoff | `10–50` | seksjonsinnhold (`z-20`) og wipe-striper (`z-30/50`). Gir neste scene autoritet uten systemnivå. `[GENERISK]` |
| Global chrome | `99–200` | header, meny og faste grensesnitt. `[GENERISK]` |
| Modal/system | `9999–10001` | modal og andre sideomfattende kontroller. `[GENERISK]` |
| Loader/transition | `9050–9500` | egen navngitt familie for belter, logo og flyvende plusser. `[TRIONN-ID]` i tallvalg |
| Absolutt topp | `99999` | sjeldne globale unntak. Bør unngås i Tigon |

`[TOLKNING]` Den viktigste regelen er ikke tallene, men at hver scene først
løser intern lagdeling i `0–5`, mens overganger og chrome får egne bånd. Dette
reduserer z-index-kappløp.

## 1.5 Responsiv strategi

Breakpoints: `440`, `640`, `768`, `1024`, `1280`, `1441`, `1536` og enkelte
`2000px`-korreksjoner.

- **440px:** kun justering av designroten.
- **640px (`sm`):** mindre komposisjons- og kolonnejusteringer.
- **768px (`md`):** viktigste strukturgrense. Gutter øker, 12-kolonners
  desktoplayout aktiveres, Work går fra normal flow til lagdelt viewport-scene,
  og Key Facts bytter fra mobil pin til desktop 3D-reveal.
- **1024px (`lg`):** større vertikal rytme, bredere kolonnespenn og
  desktoptekststørrelser.
- **1280/1441/1536/2000px:** optiske korreksjoner, root-skalering og finere
  spaltebalanse på brede flater.

`[SOURCE][GENERISK]` Strukturen byttes når interaksjonsmodellen endrer seg;
typografi og spacing skaleres eller korrigeres mellom grensene. `[TRIONN-ID]`
er at mobile og desktop noen steder har helt forskjellige ScrollTriggers og
svært lange spor. For Tigon: behold samme innhold og semantikk, men tillat en
egen kompakt koreografi når desktopmekanikken ikke kan forenkles ærlig.

---

# DEL 2 — FAKTISKE VERDIER, MED BEGRUNNELSE

## 2.1 Typografi

Rem-til-px nedenfor bruker 16px som lesbar referanse. Den faktiske siden
modulerer rem gjennom rotformelen over.

| Rolle | Kildeverdi | Beregnet område | Hvorfor verdien bidrar | Grense |
| --- | --- | --- | --- | --- |
| H1 | `clamp(3.75rem, 6.614vw, 6.25rem)`; leading `clamp(3.5rem,5.952vw,5.625rem)` | 60–100px; leading 56–90px | Ca. `0.9` leading gjør displaytekst til en kompakt grafisk flate | Formel `[TRIONN-ID]`; tight leading `[GENERISK]` |
| H2 | `clamp(2.5rem, 6.283vw, 5.938rem)`; leading `clamp(2.2rem,5.952vw,5.625rem)` | 40–95px; 35.2–90px | Lavere minimum gjør H2 brukbar på mobil, men fluidkoeffisienten holder den nær H1 på desktop | `[TRIONN-ID]` |
| H2 big | `clamp(3.5rem, 6.349vw, 6rem)`; leading `clamp(3.25rem,5.82vw,5.5rem)` | 56–96px; 52–88px | En optisk variant for store avslutningsbudskap, ikke nytt skalatrinn | `[TRIONN-ID]` |
| H3 | `1.75rem`, fra 1280px `2.25rem`; leading `1` | 28/36px | Trinnvis korreksjon unngår at mellomtitler blir uforholdsmessige | Teknikken `[GENERISK]` |
| H4 | `1.125rem`, leading `1.25rem`, tracking `-.02em` | 18/20px | Kompakt liten overskrift med lesbar linjeboks | `[GENERISK]` |
| Body | mobil `1.25rem`; fra 1024px `1rem`; fra 1536px `1.25rem` | 20/16/20px før rootmodulering | Tekst er større på liten skjerm, strammere i tett desktopgrid og løftes igjen på stor desktop | Strategi `[GENERISK]`; trinn `[TRIONN-ID]` |
| Small | `1.25rem -> 1.125rem -> 1rem` ved 1024/2000 | 20→18→16px | Rollen komprimeres når layouten får mer tilgjengelig bredde | `[TRIONN-ID]` |
| Title/meta | `1.125rem`; 17px ved 1024; 18px ved 1536; 16px ved 2000; leading `1`, tracking `-.02em`, uppercase | ca. 16–18px | Tydelig systemlabel uten ekstrem småtekst | Rolle `[GENERISK]` |
| Button mono | `1rem`, fra 1024 `0.875rem`, tracking `-.06em` | 16/14px | Mono får mindre størrelse men høy tetthet; negativ tracking motvirker bred font | Rolle `[GENERISK]`; tracking `[TRIONN-ID]` |
| Marquee | `clamp(5rem, 9.164vw, 10rem)`, leading `.672`, tracking `-.08em` | 80–160px | Ekstrem leading/tracking gjør ordene til sammenhengende bånd | `[TRIONN-ID]`, kalibrering only |
| Tall | `3.5rem` og `5.375rem` | 56/86px | To spesialnivåer gir data visuell vekt uten å konkurrere med H1 | `[TRIONN-ID]` |

Det finnes altså ingen 1.25/1.333-skala. Den eneste tydelige ratioen er
rollebasert: body → display er omtrent `4–6×`, mens H1/H2 bare skiller ca.
`1.05×` i fluidsonen.

## 2.2 Spacing som system

- `[SOURCE][GENERISK]` **Basestige:** `.25rem` og multipler. Den gjør utility-
  spacing forutsigbar og reduserer enkeltverdier.
- `[SOURCE][GENERISK]` **Kant:** `1.5rem` mobil, `2.5rem` fra 768px. Hvorfor:
  mobil beholder nyttig bredde; desktop får sterkere ramme.
- `[SOURCE][GENERISK]` **Grid:** vanlig gap `1.5rem`; Footer bruker opptil
  `3rem` fordi kontaktkolonnene trenger tydeligere gruppering.
- `[SOURCE][TRIONN-ID]` **Kapittelpad:** 5–10rem. Hvorfor: fullskjermscenene
  trenger store interne sikkerhetssoner rundt absolutt/pinnet media.
- `[SOURCE][TRIONN-ID]` **Scrolltid:** 1.5–13.5 viewport-høyder. Dette er ikke
  «spacing» i vanlig forstand; det er tidslinjelengde. Tigon bør velge lengde
  ut fra lesemengde og formål, ikke etter referansetallet.

## 2.3 Fargepalett, roller og kontrast

| Rolle | Verdi | Kontrast `[BEREGNET]` | Hvorfor / grense |
| --- | --- | ---: | --- |
| Global dyp bakgrunn | `#040508` | — | Blåsort, ikke ren svart; gir kalde materialer litt fargedybde. `[TRIONN-ID]` |
| Dyp scene | `#000000` | — | Brukes der WebGL/video skal få maksimal separasjon. Teknikken `[GENERISK]` |
| Lys hovedtekst | `#d8d8d8` | `14.30:1` mot `#040508` | Høy AAA-kontrast uten rent hvitt. Metoden `[GENERISK]`, nyansen `[TRIONN-ID]` |
| Krem | `#e6e4e2` | `16.07:1` mot `#040508` | Varmere tekst/surface-rolle; skal ikke bli Tigons nye aksent. `[TRIONN-ID]` |
| Sekundær grå | `#9c9c9c` | `7.42:1` mot `#040508` | Fortsatt AAA for normal tekst; brukes som sekundær, ikke dekorativ lavkontrast | `[GENERISK]` |
| Mørk tekst | `#434343` | `9.89:1` mot hvit; `5.61:1` mot `#c3c3c3` | Holder lyse kapitler mykere enn svart og består AA | Metoden `[GENERISK]` |
| Lyse kapitler | `#d2d2d2`, `#c3c3c3`, `#ffffff` | avhenger av tekstlaget | Gir hard tonal reset etter mørk Vision/Services. `[TRIONN-ID]`; `REJECT` som ny Tigon-palett |
| Preloaderpanel | `#c8c8c8` | — | Kobler loader til de lyse seksjonene. `[TRIONN-ID]` |
| Hero-energi | punktlys `#ff2200/#ff3300/#ff5500`; enkelte CSS-røde/oransje signaler | `#ff4b2f` gir `6.11:1` mot `#040508` | Bærer eksplosjons-/energisignaturen. `[TRIONN-ID]`; synlig orange er eksplisitt `REJECT` for Tigon |

`[USIKKER]` Den samlede CSS-filen inneholder også rute- og komponentfarger som
ikke nødvendigvis vises på forsiden. Tabellen over prioriterer verdier bekreftet
i homepage-komponentene og scene-JS.

## 2.4 Tallene som skaper motion-følelsen

| System | Faktisk verdi `[SOURCE]` | Hva tallet bidrar med | Grense |
| --- | --- | --- | --- |
| Lenis | `duration: 1.05`, `lerp: .105`, easing `1-(1-t)^3`; wheel `.6/.85`, touch `1.1/1.2` | Rask start og lang, kontrollert hale. Hele siden får én felles treghet før lokale scener | Én scrollmotor `[GENERISK]`; verdiene `[TRIONN-ID]` |
| GSAP/Lenis-bro | `autoRaf:false`; `lenis.raf(time*1000)`; `ScrollTrigger.update`; lag smoothing `500/33` | DOM- og canvasscener deler klokke og ScrollTrigger ser smoothed posisjon | `[GENERISK]`, relevant `KEEP` |
| Standard reveal | blur `12px`, `duration:.8`, `stagger:.05`, `power2.out`; trigger `top 90%` | Nok blur til optisk dybde, men kort nok til at teksten ikke føles låst | Mønster `[GENERISK]`; kombinasjon `[TRIONN-ID]` |
| Display intro | stagger `.08`, delay `1.2s` | Større bokstaver får mer avstand; delay lar loader/scene etablere seg | Størrelsesstyrt stagger `[GENERISK]`; delay `[TRIONN-ID]` |
| Marquee | `speed:.8`, pause-lerp `.5`, IO margin `64px` | Kontinuerlig, men kan sove utenfor viewport. Koden øker per frame, så faktisk fart kan variere med refresh rate | Sleep-prinsipp `[GENERISK]`; fart `[TRIONN-ID][USIKKER]` |
| Vision | `scrub:.6`, pin `150/200%`, stripe `.3s`, kort reverse-stagger + `.1` hold | Moderat scrub filtrerer input; kort stripebevegelse holder wipe presis | Prinsipp `[GENERISK]`; verdier `[TRIONN-ID]` |
| Key Facts desktop | `scrub:2`, `duration:2.65`, stagger `.6`, `rotateX:-92°` | Svært tung demping og stor faseavstand gjør kortene monumentale | `[TRIONN-ID]`; for tregt som Tigon-standard |
| Hero-symbol | pin `300/400%`; parallax `.22`; frame smoothing `.06`; rotation `.0042/frame` | Lang interaksjonstid og treg objektrespons skiller scenen fra DOM-scroll | `[TRIONN-ID]` |
| Work/Services | desktop `1350%`, mobil Services `800%`; frame smoothing `.12`; kort `.45/.3`; DrawSVG `1.5` + `.04` | Ett stort tidsbudsjett lar media, tekst og kort få separate faser uten flere triggere | Segmentering `[GENERISK]`; omfang `[TRIONN-ID]` |
| Testimonials | transition `600ms`; autoplay `5000ms` | Velkjent balanse: rask nok overgang, lang nok lesetid | `[GENERISK]`, men autoplay må vurderes tilgjengelig |
| Dribbble | title scrub `.6`; scene ca. `4.5/6.5vh`; egen dt-smoothing `1-.001^dt` | Skiller scrolltransport fra renderrespons og lar 3D-banen roe seg | Lagdelt timing `[GENERISK]`; konkrete tall `[TRIONN-ID]` |
| Footer-linjer | hover `.9s`, click `1.1s`, `expo.out` | Interaksjonen får impuls og lang rolig retur uten overshoot | Returkurven `[GENERISK]`; audio/shader-kombinasjonen `[TRIONN-ID]` |
| Route wipe | belter `500/420ms`, stagger `38ms`; plusser/label `840/760ms` | Innreisen er litt langsommere enn utgangen; stagger gjør flaten mekanisk og lesbar | Inn/ut-asymmetri `[GENERISK]`; beltet `[TRIONN-ID]` |

### Easing-vokabularet

- `none` brukes når scrollprogress allerede bestemmer tempoet. `[GENERISK]`
- `power2/3.out` brukes for ankomst og `power2.in` for exit. `[GENERISK]`
- `power1.inOut` brukes på rolige kryssfade-løkker. `[GENERISK]`
- `expo.out` brukes på interaksjonsretur og meny. `[GENERISK]`
- Den identitetsbærende delen er ikke én easing, men kombinasjonen av Lenis,
  scrub, store pinned domener og sceneintern smoothing. Ikke stable samme
  demping ukritisk i Tigon.

## 2.5 Hva Tigon faktisk kan lære

Kryssreferanse: `docs/trionn-ekstrakt.md`.

1. Behold ekte HTML og lesbar statisk komposisjon under tunge scener.
2. Gi hvert langt scrollforløp én eier og ett dokumentert progresskart.
3. Bruk samme klokke for scroll, ScrollTrigger og canvas, men bare én aktiv
   smooth-scrollmotor.
4. La desktop og kompakt få egne koreografier når mekanikken faktisk endres.
5. Bruk z-index-bånd og tydelig CSS/JS-ansvarsdeling.
6. Adapter kontrast, presisjon og søvn-disiplin; avvis Trionns loader,
   orange energi, WebGL-tetthet og lange pin-lengder som Tigon-identitet.
