# Nudot-ekstrakt — design.md

Kilde: https://nudot.com.tw/ (核點 Nudot Studio, Taichung — «台中網頁設計 × 品牌視覺升級 × 動態特效»)
Analysert: 2026-07-17. Metode: tigon reference-probe (1440 + 390), full kildekode-lesing (siden er én statisk HTML-fil på 353 KB med all CSS/JS inline — alt under er derfor **SOURCE**-gradert med mindre annet er merket).

Evidensgrader: `SOURCE` = verifisert i kildekode/målt i browser. `PARTIAL` = signal, ikke fullverifisert. `GUESS` = visuell tolkning.

Rå-artefakter (utenfor repo): `/private/tmp/tigon-reference-nudot/` — probe-JSON, 28 scroll-skjermbilder (desktop+mobil), ekstraherte inline-scripts (`inline-script-2-143758.js` = hoved-maskinen) og styles.

---

## 1. Identitet og totalinntrykk

Ett-ords-diagnose: **mørkt kino-monolitt-studio**. Hele siden er én sammenhengende svart flate (`#000` fra topp til fot) der lys — ikke farge — skaper romfølelse: spotlight-gradienter, WebGL-video, filmkorn og sølv-preget metall i footeren. Grammatikk-motivene er «systemet bygger seg selv»: scramble-tekst, fake terminal-statuslinjer («品牌識別系統建構中 █»), dot-matrix-typografi, strekkoder, tellere.

- Sidehøyde desktop: 11 788 px ved 1440×900 ≈ 13,1 viewporter (SOURCE, probe).
- Språk: zh-TW primært, engelsk som stort display-lag (STUDIO / DIGITAL / ARCHIVE OF…).
- Utmerkelse: FWA of the Day-ribbon nede til venstre i hero.

## 2. Teknisk stack (SOURCE)

| Lag | Teknologi |
|---|---|
| Rammeverk | Ingen (ren statisk HTML, alt inline; ikke React/Vue/Next) |
| Scroll | Lenis 1.0.42, `lerp: 0.09`, `wheelMultiplier: 1.0`, `touchMultiplier: 1.5`, koblet til `gsap.ticker`, `lagSmoothing(0)`. Reduced motion → `lerp: 1`, `smoothWheel: false` |
| Animasjon | GSAP 3.12.2 + ScrollTrigger; ScrambleTextPlugin og Flip lastes async **kun på desktop** |
| 3D/WebGL | Three.js r128 — to separate systemer: hero-slideshow (ortografisk plan + shader) og «ring gallery» (+ post-processing) |
| Sidetransisjoner | Egen `transitions.js` (35 KB): pixel-grid-transisjon (PixelTransition demo2-stil) med 00→100-teller, sessionStorage-payload mellom sider, Lenis stop/restart, bfcache-håndtering |
| Korn | `noise.js`: fullskjerms `film-grain-canvas` over alt innhold |
| Fonter | Google: DM Sans (body), Zalando Sans SemiExpanded (display), Bitcount Grid Single (dot-matrix-aksent). Typekit-kit (lores-12, komet, forma-djr-mono) lastes men refereres ikke i sidens CSS (PARTIAL — trolig ubrukt/legacy) |

Ytelses-disiplin i kildekoden (verdt å klone som prinsipp): progress-cache som hopper over hele animasjonspipelinen når delta < 0.0001; hero-render soves når den er ute av bildet; marquee-rAF kjører kun i sin fase; `contain: strict` på WebGL-container; lazy video med `data-lazy-on-scroll`.

## 3. Designtokens (SOURCE — CSS-variabler fra `:root`)

### Farge
Strengt monokrom. `--color-bg: #000`, `--color-text: #fff`, gråstige (#a0a0a0, #888, #666, #ccc, #ddd, #e0e0e0) og hvit-alfa-trinn (0.03 / 0.08 / 0.1 / 0.18 / 0.3 / 0.42 / 0.62 / 0.85 / 0.9 / 0.94). Nesten-svarte flater: #030303–#141414. Eneste avvik: én forekomst #a3ff00 og et par varme toner (#c89a45, #efe6d8) i enkeltdetaljer (badge/mockup — PARTIAL). Fargeskifte finnes i praksis **ikke** — reisen er lys-dramaturgi på konstant svart, pluss sølv-tekstur i footer.

### Typografi
```
--font-family-display: "Zalando Sans SemiExpanded", "DM Sans", …   (hero-ord, galleritittel)
--font-family-body:    "DM Sans", "Helvetica Neue", Arial          (alt løpende)
--font-family-accent:  "Bitcount Grid Single", …                   (dot-matrix marquee/bokstaver)

--type-root:        clamp(13px, 12.4px + 0.2vw, 16px)
--text-display-xl:  clamp(5.5rem, 14vw, 13rem)      (STUDIO / DIGITAL)
--text-display-lg:  clamp(4rem, 15vw, 11.5rem)
--text-display-md:  clamp(3rem, 8vw, 5rem)
--text-display-sm:  clamp(2.8rem, 4.6vw, 4.8rem)
--text-display-xs:  clamp(2rem, 3.5vw, 3.125rem)
--text-watermark:   clamp(10rem, 22vw, 22rem)
--text-lg/md/base/sm/xs/2xs: clamp-stige ned til 0.6875rem

--leading-display: 0.88   --leading-tight: 1   --leading-body: 1.7
--tracking-display: -0.02em   --tracking-tight: -0.04em
--tracking-caps: 0.18em   --tracking-meta: 0.12em   --tracking-label: 0.08em
```
Mønster: ekstremt tett display (0.88/-0.02em) mot luftige sperrede caps-etiketter (0.12–0.18em). Signatur-etikett: **fullbredde-parenteser rundt små merker** — `（ 高階網頁設計 ）`, `( Brand Direction )`, `（ 動態設計 ）`.

## 4. Persistent chrome (alle seksjoner)

1. **Loader**: svart skjerm ~2,7 s forankret i navigasjonsstart (`_loaderTarget = 2700`), klikk-skjold til 3,2 s, teller + logo. Hero-intro-timeline spilles først når loaderen slippes.
2. **Scroll-progress-linje** øverst (tynn hvit).
3. **Flytende pille-nav** (sentrert kapsel: konvolutt-ikon / N-logo / hamburger) — vises etter hero-fasen, mørk kapsel på mørk side. Fullskjerms overlay-meny (`dark-nav`, `display:none` til åpning): 核點創意 / 設計案例 / 核點實驗室 / 核點洞察 / 聯繫我們.
4. **Custom cursor**: `cursor-dot` + `cursor-ring` (desktop). I hero er native cursor tvunget default/pointer per element.
5. **Filmkorn-canvas** over alt (noise.js).
6. **Pixel-grid sidetransisjon** med prosent-teller ved navigasjon.

## 5. Scroll-arkitektur — master-scenen (SOURCE)

Kjernen i sidens følelse: én `.scroll-track { height: 600vh }` med `.sticky-container { position: sticky; top: 0; height: 100vh }`. Ikke ScrollTrigger-pin — ren CSS-sticky, mens en egen tilstandsmaskin leser Lenis-scroll og mapper progress 0→1 over 600vh. Lerp-glatting i to lag (Lenis 0.09 + intern 0.1).

Fasekart (progress-terskler i kildekoden):

```
p_Reveal  = 0.12   p_TextIn = 0.24   p_TextOut = 0.44
p_Tumble  = 0.60   p_Spin   = 0.78   p_PreExit = 0.72   p_Zoom = 1.00
```

| Fase | Hva skjer |
|---|---|
| 0 → 0.12 | **Hero synlig** (WebGL-slideshow, se §6.1). En mørk «dark wrapper» avdekkes over hero via `clip-path: inset(x% 0 0 0)` som skrubbes fra 100→0 (easeInOutCubic) — mørket senker seg som et teppe ovenfra. En CSS-3D-kube (telefon-mockup) roterer kontinuerlig (+0.4°/frame) i senter |
| 0.12 → 0.24 | **Text-in**: intro-panel med dot-bokstav (Bitcount), topp/bunn-titler glir inn fra ±110 yPercent; flytende scramble-etiketter (Brand identity / Motion design / 視覺敘事 …) dukker opp rundt kuben; fake lastelinjer «視覺系統載入中 █» |
| 0.24 → 0.44 | **Text-out** + venstre/høyre tjenestelister med **sinusbølge-x-offset** (`WAVE_NUM=12, WAVE_SPD=1`, `gsap.quickTo x, power4.out 0.6s`) — kolonnene «puster» sidelengs mens de ruller |
| 0.44 → 0.78 | **Dot-matrix-marquee**: gigantiske Bitcount-ord (WEBDESIGN · UI/UX · …) driver horisontalt, scroll-styrt; telefon-mockup-bilder skiftes; kuben **tumbler** (0.44–0.60) og **spinner** en ekstra 360° (0.60–0.78) |
| 0.78 → 1.0 | **Zoom**: kuben skaleres fra 230 px scene til `min(44vw, 72vh) × 0.9` — front-flaten (video) blir scenen og leverer over til neste seksjon |

Kuben (SOURCE): `.scene > .cube > .face front/right/back/left/top/bottom`, front = mp4-video, øvrige = webp; ren CSS `transform: rotateX/rotateY` satt per frame fra JS.

## 6. Seksjoner i rekkefølge

### 6.1 Hero — WebGL-video-slideshow (0–100vh, inne i master-scenen)
- Fullskjerms Three.js-plan (ortografisk kamera) med 5 slides: 3 mp4 + 2 stillbilder (Nudot Creative Studio / Visual Direction / Brand Film / High-End Skincare / METERSEVEN / PERFORMANCE FLUIDS — 5 aktive av 7 definerte, PARTIAL).
- Overgangs-shader (SOURCE): simplex-noise-warp `noiseVal * p * (1-p) * 0.3` + vertikal retningsdytt `uDirection * p * 0.3` + lett zoom mot senter (0.15) + **RGB-kanalsplitt** `0.04 * p * (1-p)`; `uProgress` tweenes 0→1 på **1.4 s expo.inOut**. Autoplay hvert **5 s** (pauser når hero sover). Mus-parallakse: `uv -= uMouse * 0.015`.
- Overlay-UI med `mix-blend-mode: difference`: STUDIO (venstre topp) / DIGITAL (høyre topp) i display-xl; zh-tjenesteliste venstre; EN-tjenesteliste høyre (understreket høyrestilt); tekst-nav-rad (ABOUT WORK LABS BLOG CONTACT); parentes-tag-rad (（ 網頁互動開發 ） ( 動態設計 ) …); teller `01 // 05`; tittel + hvit thumbnail-boks; thumbnails-stripe nederst; kontakt/adresse nederst venstre.
- Hero-intro (etter loader): alle tekstlinjer fra `yPercent: 110/130` → 0, `power4.out 0.85s`, stagger 0.14 (titler) / 0.03–0.05 (småtekst).

### 6.2 «WHO WE ARE» (`mobile-cube-section`)
Kun mobil (desktop: skjult; rect 0 i probe). Statisk kube + «（ 專注本質的數位實踐 ）／WHO WE ARE» + manifestavsnitt om «核點» (kjernepunktet). På mobil erstatter denne hele master-scene-dramaturgien.

### 6.3 Core capabilities (`ccap-section`, ~900px, svart)
- Innhold: caps-linje «THE SECTORS DEFINING THE CORE DNA OF BRAND AESTHETICS», metrikk-mono-linje `14Y_VISUAL_MASTERY / 400+_DEPLOYED_WORKS / ESTABLISHED_2026`, display-tittel «跨領域視覺與數位整合», fire parentes-kapabiliteter: ( 網頁視覺美學 ) ( 高階商業視覺 ) ( 使用體驗與介面 ) ( AI 圖像 · 影像 ).
- WebGL «ring gallery» (SOURCE, eget 23 KB-script): 3 konsentriske ringer med 12/24/36 = 72 bildeplan (25 bilder looper), scroll-drevet rotasjon (`scrub: 1`), post-processing-shader: RGB-shift, korn, vignett (mot `uBgColor`) og sirkulær SDF-avsløring (`sdCircle`-transition).
- Tittel-scramble ved entring: `ScrollTrigger id: stm-scramble`, ScrambleText fra tom streng, `chars: 'upperAndLowerCase'`, 1 s.

### 6.4 Arkiv-galleri (`s3-gallery-section`, ~4700px ≈ 5 viewporter)
Sidens lengste seksjon — og dens mest overførbare mekanikk:
- **Sticky sentrert display-tittel** «( 重新定義品牌的視覺思維 ) / ARCHIVE OF THE SELECTED WORKS BY NUDOT / 數位視覺能量釋放點» ligger i midten med spotlight-gradient bak, mens 6 store arbeids-flater (`pg-item-1…6`, bilder + video, vekslende venstre/høyre, ulike bredder) ruller **over/forbi** tittelen i vanlig flow.
- Inngang per flate: `clip-path inset(100% 0 0 0) → inset(0)` `expo.out 0.7s` + bilde-skala 1.3→1.0 `power3.out 1.0s` (trigger `top 90%`, reverserbar).
- Parallakse per bilde: `yPercent ±[12, 18, 10, 20, 15, 22]`, `scrub: 1.2`.
- Tittel-exit (skrubbet, `bottom 65% → bottom 5%` av siste flate): ord-spans flyr opp `yPercent: -130, power2.in`, stagger 0.04; side-skinner glir ut ±44 px; etikett/undertekst fader.
- Sideelementer: `gh-side-rail` / `gh-side-line` / `gh-side-letter` — vertikale skinner med bokstaver som intro-animeres én gang (`power3.out`, ~1 s).

### 6.5 Footer (`site-footer`, ~780px, svart → sølv)
- Øvre del: tre-kolonners meta (Web Design Studio / Commercial Visual · AI Motion / Est. 2026 · Taichung), beskrivelse, e-post + telefon + adresse (NAP), sosiale lenker, strekkode-motiv.
- Nedre del: **gigantisk sølv-preget «NU'DOT»-wordmark** som foto-tekstur (embossed metall) — sidens eneste materialskifte, fungerer som fysisk «stempel»-avslutning.

## 7. Interaksjons- og motion-grammatikk (oppsummert)

| Motiv | Implementasjon | Følelse |
|---|---|---|
| Scramble-tekst | GSAP ScrambleText, fra tom streng, upperAndLowerCase, ~1 s, kun desktop | «systemet dekoder seg selv» |
| Fake terminal-status | Statisk tekst + `█`-blokk («…載入中 █») | maskin som arbeider |
| Dot-matrix | Bitcount Grid Single som font (ikke grafikk) | pixel/lo-fi-presisjon |
| Parentes-etiketter | `（ … ）` fullbredde-parenteser på alle merker | katalog/spesifikasjon |
| Blend-difference-UI | `mix-blend-mode: difference` på hele overlay | typografi svever over video |
| Linje-reveals | Alt tekstlig inn via `yPercent 110–130 → 0` bak `overflow: hidden`-wrappere | presis maskinell inngang |
| Lys som dramaturgi | Spotlight-gradienter + vignett + korn på konstant svart | kino, ikke fargeskift |
| Kube-gjenbruk | Samme 3D-objekt gjennom alle faser (spin → tumble → zoom → scene) | én kontinuerlig gjenstand binder reisen |

Easing-vokabular: `power3.out`/`power4.out` (innganger), `power2.in` (utganger), `expo.inOut` (shader/slideshow), `expo.out` (clip-reveals), `easeInOutCubic` (fase-mapping). Varigheter 0.25–1.4 s; staggere 0.03–0.14.

## 8. Mobil og reduced motion (SOURCE)

- ≤768 px: master-scenens faser slås helt av. Hero blir statisk (bakgrunnsbilde `load.webp`), kuben auto-roterer (+0.25°/frame) i liten størrelse (`min(56vw, 220px)`), «WHO WE ARE»-seksjonen tar over introen, WebGL rendrer annenhver frame. ScrambleText/Flip lastes ikke. Galleri beholder clip-reveals/parallakse i enklere form.
- `prefers-reduced-motion`: Lenis går til `lerp: 1` + `smoothWheel: false` (native scroll). (Omfanget av øvrige RM-fallbacks: PARTIAL — ikke uttømmende verifisert.)
- No-JS: `<noscript>`-fallbacks + SEO-cloak-nav finnes; innholdet er i HTML, men hele master-dramaturgien er JS-avhengig.

## 9. Sammenligning med Tigon (mot mountet side per `docs/current-homepage-state.md`)

Strukturell likhet er større enn ventet: begge bygger én sammenhengende reise med scroll-styrte handoffs, sticky tittel bak arbeidsflater, pixel-sidetransisjon og scramble som register. Hovedforskjellen er **flate og lys**: Nudot er 100 % svart kino med lys-dramaturgi og WebGL; Tigon er redaksjonell lys/mauve-sone-dramaturgi med typografi som bærer.

| Referanse-atferd | Tigon i dag | Beslutning | Begrunnelse | Lag | Risiko |
|---|---|---|---|---|---|
| 600vh sticky master-scene med fasekart | Avvist mønster: gjentatte pin-effekter; kun scoped sticky i 03→04/04→05 | **REJECT** | Bryter «no repeated pinned-scroll»; Tigons reise er flow-basert | — | lesbarhet, regelbrudd |
| Sticky sentrert tittel bak rullende arbeidsflater | Finnes allerede: `Dette kan Tigon lage.` bak 2–2–2-katalogen i 04 | **KEEP** (bekreftelse) | Nudot validerer Tigons eksisterende valg; ev. finpuss på exit | GSAP | ingen ny |
| Skrubbet ord-for-ord tittel-exit (yPercent -130, stagger) | 04-tittel kontraherer, men har ikke eksplisitt exit-koreografi | **ADAPT** | Kan stramme opp 04→05-grensen uten ny pin | GSAP | repetisjon |
| Clip-inset-reveal + skala 1.3→1 + parallakse ±12–22 % på bilder | Tigon bruker rolige opposing offsets i 02/04 | **ADAPT** (selektivt) | Clip-reveal på 04-flater kan gi presisjon; behold rolig parallakse | CSS+GSAP | uro ved overbruk |
| WebGL-video-slideshow med noise-warp + RGB-splitt | Hero er fredet; ingen WebGL-hero | **REJECT** | Hero-fredning + tung avhengighet; feil identitet (video-kino ≠ typografisk redaksjon) | — | ytelse, fredning |
| WebGL ring-galleri m/ post-shader | Ingenting tilsvarende | **REJECT** | Dekorativ tyngde uten argumentasjonsverdi for Tigon-innholdet | — | ytelse, «effekt for effektens skyld» |
| CSS-3D-kube som kontinuerlig objekt gjennom faser | Ingenting tilsvarende | **REJECT** (som objekt) / prinsippet «én gjenstand binder reisen» er allerede løst typografisk (tittel-noden 03→04) | — | repetisjon |
| Lenis smooth scroll globalt | Native scroll | **REJECT** som global endring nå | Global inngripen; krever egen beslutning og RM-strategi | — | scope |
| Pixel-grid sidetransisjon m/ teller | Osmo-pixel finnes section-scoped (02→03) | **KEEP** (eksisterende) — ikke utvid til sidetransisjoner uten egen oppgave | GSAP | scope |
| Scramble-register (desktop-only, fra tom streng) | Scramble-register finnes i 02; Scramble-cursor ikke godkjent | **KEEP** (eksisterende regel) | Samme grammatikk allerede kanonisert | GSAP | — |
| Parentes-etiketter `（ … ）` som merkesystem | Tigon bruker bar-mono-tags | **ADAPT** (idé, ikke form) | Prinsipp: ett konsekvent etikett-tegnsystem overalt — Tigon har sitt; ikke bytt | CSS | — |
| Filmkorn + spotlight-lys på svart | `WorkAtmosphereCanvas` (uncommitted) dekker atmosfære-behovet i 04 | **ADAPT** forsiktig | Lys-dramaturgi (radial gradient) kan foredle mørke soner uten korn-lag | CSS/Canvas | støy |
| Monokrom #000-total | Tigon: kanonisert mørk fargestige + mauve/lys-soner | **REJECT** | Tigons fargeskifte-dramaturgi er en aktiv beslutning | — | — |
| Loader 2,7 s med teller | Ingen loader | **REJECT** | 2,7 s kunstig ventetid strider mot Tigons nøkternhet | — | UX |
| Dot-matrix-aksentfont | `--display-track`/`--mono-track` er kanonisert | **REJECT** | Tredje font-stemme bryter typografisk system | — | system-drift |

**Konklusjon for Tigon-reisen:** Nudot bekrefter to valg Tigon alt har tatt (sticky tittel bak arbeidsflater; scramble/pixel som register) og tilbyr tre presise, lavrisiko-lån: (1) skrubbet ord-exit på 04-tittelen mot 05-grensen, (2) clip-inset + lett skala-inngang på 04-kapabilitetsflatene, (3) spotlight-lys-dramaturgi i mørke soner i stedet for flere farge-kutt. Resten (master-pin, WebGL, kube, Lenis, korn, loader) står i konflikt med prosjektregler eller identitet og bør ikke overføres.

## 10. Rettigheter / klone-grense

Nudot-koden er proprietær (ingen lisens funnet; FWA-vinner). Denne ekstrakten beskriver **atferd, arkitektur og målte verdier** slik at mekanikkene kan gjenskapes clean-room med eget innhold. Ikke kopier: HTML/CSS/JS-bundler, shaders ordrett, bilder/video, fonter via deres kit, eller «NU'DOT»-merkevareelementer. Bitcount Grid Single og DM Sans er åpne (Google Fonts); Zalando Sans SemiExpanded har egen lisens som må sjekkes før bruk.
