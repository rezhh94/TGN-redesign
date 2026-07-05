# Forside — inkonsistens-rapport + effekt-anbefalinger

Dato: 2026-07-05 · Gren: `experiment/fable5-homepage-review`
Grunnlag: gjennomlest all seksjons-CSS + `HomeMotion.tsx` + `tokens.css`, og visuelt kontrollert den kjørende forsiden (localhost:3000). Ingen kode endret.

Seksjonsrekkefølge (fra `page.tsx`):
`01 Hero → 01 Approach (Tilnærming) → 02 Tjenester → 02→03 Bro → 03 Effekt → 04 Arbeid → 05 Prosess → 06 System → 07 Footer`

---

## DEL 1 — Inkonsistenser

Rangert etter hvor mye de brekker systemet. Alt er verifiserbart i koden.

### A. Farger: mørke flater går utenom token-systemet  ⚠️ størst

De **lyse** nøytralene er en dokumentert token-stige (`--paper / --off-white / --bone / --stein / --greige / --blekk`). De **mørke** flatene er derimot ad-hoc hex uten stige:

| Seksjon | Bakgrunn |
|---|---|
| 02 Tjenester | `#1a1c1c` |
| 02→03 Bro | `#0b0c0b` |
| 03 Effekt | `#0d0e0c` |
| 05 Prosess (dark / deep) | `#12120f` / `#060706` |
| 07 Footer | `#070807` · `#11120e` · `#050605` |
| 01 Approach | `rgba(18,18,15)` · `(21,22,18)` · `(16,17,14)` |

→ **6–7 forskjellige «nesten-svart».** Ingen `--ink-900…-600`-stige tilsvarende den lyse. Anbefaling: tokeniser den mørke stigen på samme måte, og la seksjonene referere den.

Relatert:
- **All on-dark tekst er hardkodet `rgba(242,241,235, α)`** i ~8 filer i stedet for `--color-on-dark`. Token `--color-on-dark-muted` (#b6b4aa) finnes, men brukes **kun** i hero-services ([hero.css:296](src/styles/hero.css)) — alle andre «dempet on-dark» er ad-hoc alfa.
- **Broen (#0b0c0b) er mørkere enn begge naboene** (02 #1a1c1c → bro #0b0c0b → 03 #0d0e0c). «Innpustet» dipper altså ned i nær-svart i stedet for å være et tonalt brudd. (Se Del 2.)
- `--color-signal` (oransje #c44414) ligger fortsatt i `tokens.css` selv om oransje er bannlyst. Bevisst-ubrukt iflg. notatet, men bør ryddes/kommenteres tydelig.

### B. Tekst-opasitet har ingen reell stige (selv om notatet påstår det)

Design-notatet sier «primær ~.80, sekundær ~.58». Faktisk i koden:

- **Primær brødtekst:** `.92` (03 text), `.82` (02 description), `.78` (05 text-soft) → spenn .78–.92
- **Lead / ingress:** `.85` (03 kicker), `.84` (02 intro-primary), `.68` (01 support), `.68` (07 lead), `.58` (bro support) → spenn .58–.85
- **Sekundær/dempet:** `.40 / .42 / .50 / .52 / .55 / .56 / .58` — sju verdier for samme rolle

`--fz-lead-l/m/s` finnes, men **opasiteten settes ad-hoc per element**. Lås 3–4 opasitetstrinn (f.eks. .92 / .70 / .55 / .42) og bruk dem konsekvent.

### C. Mono / eyebrow: størrelser og tracking driver

- **Mono font-størrelser på tvers av siden:** `10.5, 11, 11.5, 12, 12.5, 13 px` — seks størrelser, ingen token-stige (`--fz-small:13px` er nesten ubrukt). Kapittel-eyebrow er stabilt 12px (bra), men støtte-mono er spredt.
- **Eyebrow letter-spacing** for *samme* rolle: `.03em` (bro/03/02/06), `.035em` (07), `.04em` (02-metaer), `.06em` (05). Bør være én verdi.

### D. Layout: to konkurrerende container-systemer

- **Horisontal gutter:** nesten alle seksjoner bruker `clamp(24px,5vw,150px)` (maks 150). **05 Prosess bruker `var(--gutter)` = `clamp(20px,5vw,80px)`** (maks 80). → På brede skjermer starter Prosess-innholdet på en **annen venstrekant** enn alle andre seksjoner. Ekte venstre-skinne-forskyvning.
- **Maks bredde:** seksjonene hardkoder `min(100%, 2560px)`; token `--page-max:1600px` er ubrukt; 07-tittel hardkoder `max-width:1600px`. To maks-bredde-begreper.
- **Brytpunkter** varierer per seksjon: `640 / 768 / 900 / 1040 / 1080px` om hverandre (02 bruker 1080+640, hero 1040+640, 07 bruker 1080+900+640). Ingen delte brytpunkt-tokens → naboer reflower på ulike bredder.

### E. Spacing: seksjonstopp-rytmen «jitrer»

Topp-padding (min / vh / maks):

| Seksjon | Verdi |
|---|---|
| 02 | 104 / 15vh / 186 |
| 03 | 110 / 15vh / 190 |
| 04 | 104 / 14vh / 184 |
| 06 | 120 / 16vh / 200 |
| 07 | 118 / 14vh / 190 |
| Bro | 120 / 20vh / 260 |

→ Min 104↔120, maks 184↔200 (broen 260). Ingen delt `--section-pad`-token → subtil vertikal rytmedrift kapittel for kapittel. (Broens 260/20vh er delvis bevisst, men bør være et *valgt* tall, ikke et fjerde tilfeldig.)

### F. Detaljspråk: radier og piler blandet

- **Border-radius:** hero-visual `16px`, work-kort `7px`, pills `999px`, brikker/rammer `0`. Tre radius-språk.
- **To CTA-pil-motiver:** prikkekjede (hero/02/07-primær, 11×15) og en `8px` chevron (foot-lenker). To «fremover»-signaler på samme side.

### G. Nummerering i nøstede scopes (mindre)

«0X /» brukes for kapitler (01/02/03…). Inne i **03** bruker utfallene «01 — Funnet … 04 — Målt», og **05** har kjempenumeralene 01–04. Skråstrek vs. tankestrek skiller dem, men tre «01–0X»-system på én side kan leses tvetydig.

### Kort oppsummert (foreslått rekkefølge å fikse)
1. Tokeniser mørk nøytral-stige + bind on-dark-tekst til tokens (A)
2. Lås opasitets-trinn (B)
3. Én gutter (fjern `--gutter`-avviket i 05) + én maks-bredde (D)
4. Mono-størrelse/tracking-stige (C)
5. `--section-pad`-token (E)
6. Radius/pil-opprydding (F)

---

## DEL 2 — Gjøre broen «02 → 03 / Overlevering» mer DOMINERENDE

**Slik den er nå:** ikke pinnet, sentrert JUST Sans ≤96px, dempet ord-maske-rull (MWG 015), bakgrunn `#0b0c0b`. Seksjonen er bare 657px høy — teksten sitter i midten med mye dødt mørkt rom over/under.

**Hvorfor den leser svakt (bekreftet visuelt):**
1. **Ingen pin** → statementet scroller forbi som brødtekst, får aldri «hold».
2. **Skala** er sans ≤96, mens kapitlene treffer 170 display (01/02). Broen er *mindre* enn det den binder sammen.
3. **Ingen tonalt brudd** — #0b0c0b ligger mellom naboenes #1a1c1c og #0d0e0c; steget er nesten usynlig (og faktisk *mørkere* enn begge).
4. **Maske-rullen er en mikro-bevegelse** — den registreres knapt.

### Anbefaling (kombiner 3 spaker)

**A. Pinn den + scrub avsløringen.** Gi seksjonen ~150vh, pin statementet, driv reveal på scroll så leseren holdes. NB: **01 bruker allerede pinnet scrub (MWG 049, bokstav-montering)** og **05 bruker pinnet horisontal (MWG 073)** — så broen må ikke kopiere de motion-mønstrene, ellers blir siden repetitiv.

**B. Skaler opp + vurder display-font.** Løft til Tier-2 (match BYGGER, ~120–170), eller behold sans men langt større. Gi «er ikke ferdig.» tydelig overvekt over «Ferdigbygget».

**C. Ekte tonalt brudd.** Gjør broen til et faktisk event: enten **helsvart #000 med én hårstrek** (topp/bunn-linje), eller **flip til lyst (paper)** — ikke en usynlig dip. Dette alene gir mest «dominans» per krone.

### Motion-arkitektur som passer (fra galleriet)

Galleriet er 106 **unavngitte, nummererte** effekter, hver tagget `Scroll / Mouse Move / Drag`. De relevante her er **Scroll**-familiene (broen skal fortsatt være et scroll-øyeblikk, ikke hover/drag). Kandidat-arkitekturer, i prioritert rekkefølge:

1. **Kontrast-fyll på ord (anbefalt, mest on-brand for near-monochrome):** SplitText på linje 2, scrub opasitet/farge så «Ferdig bygget» står dempet og «er ikke ferdig.» **tenner til full hvit** idet seksjonen låser midt i viewport. Billig (dere har SplitText + ScrollTrigger registrert), og «tenningen» leser som en påstand.
2. **Full-linje clip/maske-wipe (utvidelse av dagens 015):** i stedet for subtil ord-rull, la en maske sveipe hele linjen inn mens den er pinnet — samme «title mask»-familie dere allerede mappet til **015**, men med pin + full clip = vekt.
3. **Skala-gjennom-pin:** statementet starter lite og scrubber opp til å fylle viewporten (eller motsatt) mens det er pinnet — ren `scale`/`fontSize`-scrub.

**Ærlig forbehold:** dette miljøet blokkerer galleriets video-CDN (og fryser på avspilling), så jeg fikk **ikke spilt av hver klipp** enkeltvis. Jeg bekreftet strukturen/tag-kartet for alle 106, og lener meg på de effekt-numrene kodebasen allerede har verifisert (015 maske, 049 montering, 073 horisontal). Se på **015** + de Scroll-taggede reveal-/maske-effektene i båndet ~040–070 for å velge den endelige — men motion-arkitekturen over er det som betyr noe (jf. AGENTS.md: eksterne effekter er *kun* motion-arkitektur).

**Min ene anbefaling:** pin ~150vh + SplitText-kontrastfyll på «er ikke ferdig.» + løft skala til display-tier + gjør grunnen til et ekte tonalt brudd (helsvart eller paper). Det gjør en forbi-glidende linje til et holdt statement, uten å kopiere 01 eller 05.

---

## DEL 3 — Gjøre «03 Effekt» mer VISUELL

**Slik den er nå:** mørk, ren tekstkolonne, 4 utfall (Funnet / Forstått / Valgt / Målt) med «tightening lines» (MWG 097) + liten pine-tick. **Bekreftet visuelt: dette er den flateste seksjonen** — og den er klemt mellom to *visuelle* naboer (02 har bilderammer + kategori-brikker, 04 er en dragbar kort-karusell med bilder). Brukerens instinkt stemmer.

**Nøkkelinnsikt:** seksjonens *substans* er 4 **målbare** utfall, hver med et «Målepunkt». Det er i seg selv visualiserbart — en trakt / måle-historie — men får i dag *null* visuell behandling (ingen tall, diagram, bilde eller anker).

### Rammer å unngå
- **Ikke** kort-grid/SaaS (bannlyst i reglene).
- **Ikke** dupliser 04s dragbare karusell, og **ikke** horisontal pin (05 eier den, MWG 073).

### Anbefaling (kombiner 2)

1. **Sticky index + skiftende media (best passform):** pin en venstre kolonne som lister 01–04 Funnet→Målt; når du scroller highlightes aktivt utfall og et **høyre media-panel** bytter (bilde / mini-diagram / metrikk). Klassisk «sticky liste + byttende visual»-scroll — editorielt, ikke kort-grid. Gir bildene et hjem (dere har allerede tomme bilderammer i 02 å matche mot), og gir endelig utfalls-numrene en grafisk rolle.
2. **Tellende metrikk per utfall:** siden hvert utfall *er* et «Målepunkt», animer et tall som teller opp (synlighet ↑, konvertering ↑) når utfallet entrer — gjør abstrakt tekst til data. Kan scrubbes eller kjøre én gang. Par gjerne med én tynn strek/graf-linje.

**Alternativ visuell spak (hvis dere vil ha noe mer signaturtungt):**
- **SVG line/path-draw:** én måle-linje (trakt eller stigende kurve) som tegnes gjennom de 4 utfallene mens du scroller — bokstavelig «alt bygges for å bli funnet → målt». (Bruk `strokeDashoffset`; DrawSVGPlugin er club-plugin.)
- **Vertikal stacked-pin:** 4 utfalls-slabs der hver pinner og neste sklir over — skiller seg fra både 04 (drag) og 05 (horisontal). Kodebasen kjenner **031 = card stack** som referanse; hold det som *slabs*, ikke kort, for å ikke bryte kort-grid-regelen.

### Motion-arkitektur fra galleriet
Relevante familier er igjen **Scroll**-taggede: «sticky liste / pinnet index med byttende media» og «counter/number». **073** (horisontal) er tatt; se på de *vertikale* sticky-media Scroll-effektene og teller-effektene. Samme forbehold som i Del 2 — jeg fikk ikke spilt av enkeltklippene her, så bekreft det endelige valget visuelt i galleriet.

**Min ene anbefaling:** sticky-index (01–04) + byttende media-panel + én tellende metrikk per utfall. Hold near-monochrome — «det visuelle» er *struktur + ett dataelement + bilde-slot*, ikke pynt. Det bruker endelig utfalls-nummereringen som grafikk og gir «Målepunkt»-linjene en grunn til å eksistere.

---

### Fotnote om metode
- Design-audit: lest hver seksjons-CSS + `HomeMotion.tsx` + `tokens.css`, og visuelt kontrollert bro og 03 på kjørende forside.
- Effekt-gjennomgang: navigerte `madewithgsap.com/effects`, bekreftet at det er 106 nummererte, unavngitte effekter tagget Scroll / Mouse Move / Drag, og hentet tag-kartet. Video-previews (R2-CDN `…/video_OPTIM/NNN.mp4`) lot seg **ikke** spille av i dette miljøet (domenet blokkeres for navigasjon, og siden frøs på fleravspilling). Anbefalingene er derfor motion-arkitektur + de effekt-numrene kodebasen allerede har verifisert, som AGENTS.md foreskriver.
