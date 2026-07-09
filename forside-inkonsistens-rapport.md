# Forside — inkonsistens-rapport + Lama Lama-designsystem

> Historisk analysesnapshot. Den beskriver ikke lenger aktiv WorkProof-, EffectBridge- eller Prosess-implementasjon. Bruk `docs/current-homepage-state.md` som nåværende fasit.

Dato: **2026-07-07** · Gren: `experiment/fable5-homepage-review`
Grunnlag: alt er **verifisert i dag** via computed styles på både live-siden (lamalama.com) og
den kjørende forsiden (localhost:3000), pluss kildekode-grep. Ingen gjetting — hver påstand er
målt eller sitert med `fil:linje`. Konsoliderer og erstatter de tidligere løse audit-filene
(`forside-audit.md`, `forside-audit.html` — fjernet, utdatert fra 5.–6. juli).

Seksjonsrekkefølge (fra `src/app/page.tsx`):
`Hero → Approach (bro) → 02 Tjenester → Effect (bro) → 03 Effekt → 04 Arbeid → 05 Prosess → 06 System (manifest) → 07 Kontakt/Footer`

---

## DEL 1 — Lama Lama sitt designsystem (ekte ekstrakt)

> Målt på 1710px-viewport der deres rot-font = **19px**. Siden skalerer hele UI-et med bredden,
> så verdier normaliseres til **1440/16px-base** (delt på 1,1875) for sammenligning.

### Fonter — kun **2 familier**
| Rolle | Font | Vekter |
|---|---|---|
| Display **+** brødtekst | `SuisseBPIntl` (bred grotesk, ikke kondensert) | 300 / 400 / 500 / **700** |
| Mono / UI / labels / knapper | `Sometype Mono` | variabel 400–700 |

Én grotesk til både titler og brødtekst; én mono reservert for meta/tags/knapper.

### Typo-skala (live → normalisert)
| Element | Live @19px | Norm. 16 | Vekt | Transform | line-height | tracking |
|---|---|---|---|---|---|---|
| H1 hero | 85,5 | **72** | 700 | UPPERCASE | 0,80 | **−0,02em** |
| H2 seksjon-display | 95 | **80** | 700 | UPPERCASE | 0,80 | −0,02em |
| H2 intro-statement | 57 | **48** | **400** | mixed | 0,90 | −0,02em |
| H3 mono-label | 14,3 | **12** | 500 | UPPERCASE | — | −0,02em |
| H4 kort-tittel | 21,3 | **18** | 400 | none | 1,4 | −0,02em |
| Lead | 23,8 | **20** | 400 | none | 1,2 | −0,02em |
| Brødtekst | 19 | **16** | 400 | none | 1,2 | −0,02em |
| Knapp/CTA | 11,9 | **10** | 500 | UPPERCASE | — | −0,02em |

**Kjerneregler hos dem:**
1. `letter-spacing: −0,02em` på **alt** — display, brødtekst, mono, knapper. Alltid stram, alltid negativ.
2. Seksjonstitler i **vekt 400** (lette). Hierarki via størrelse, ikke fett.
3. Display line-height låst til **0,80**.

### Knapper
Høyde ~50px · radius **4px** · Sometype mono **10px / 500 / UPPERCASE** · tracking −0,02em ·
fylt = cream `#F9F4EB` + mørk tekst · outline = 1px hårlinje 20% · ghost = 10% hvit.

### Farger
BG `#1A1C1C` · off-white `#F9F4EB` (varm) · `--signal` = off-white (ingen dominant merkefarge) ·
4 pastell-aksenter brukt sparsomt: pink `#FFC6DA`, red `#E75D60`, blue `#DCF2F4`, green `#D0FF7E`.

### Spacing & grid
12 kol desktop / 6 mobil · gutter 24→10px · margin 40→16px · fluid navngitt skala
(`--spacing-xs…2xl` = 8→64, `--section-3xs…4xl` = 10→320) der hver verdi er `max(rem, vw)` ·
faktiske seksjons­paddinger 190–380px topp (mye luft).

---

## DEL 2 — Inkonsistenser i forsiden (rangert)

### 🔴 A. Seksjonstitler mangler ett system (vekt · familie · tracking)
Live-målte titler:

| Seksjon | Familie | Vekt | tracking |
|---|---|---|---|
| approach-bridge | TGS Perfect | 700 | +0,01em |
| what-build "BYGGER" | TGS Perfect | 700 | 0 |
| work-proof | TGS Perfect | 700 | +0,01em |
| process-journey | TGS Perfect | 700 | +0,01em |
| **contact-footer** | TGS Perfect | **800** ⚠ | −0,012em |
| effect-bridge | **JUST Sans** | **600** | — |
| what-improve | **JUST Sans** | **500** | −0,02em |
| system-manifesto | **JUST Sans** | **400** | −0,037em |

- Display-caps er 700 overalt **unntatt** `contact-footer.css:56` = **800** (enslig avvik).
- Sans-statement finnes i **tre** vekter: 400 (manifesto) / 500 (what-improve) / 600 (effect-bridge) — samme rolle.
- Tracking-**tegnet** veksler: noen display-titler +0,01em, andre negativ. Lama Lama = −0,02em uten unntak.

### 🔴 B. Mono/eyebrow-tracking er ikke standardisert
`tokens.css:145` hevder «standardisert til 0.03/0.08em». Faktisk i bruk på uppercase-mono:
**0,08 (23×) · 0,1 (6×) · 0,14 (5×) · 0,05 (5×) · 0,06 (3×) · 0,04 (3×) · 0,12 (2×)** — ≥7 verdier.
Eks: `nav.css:167` og `work-proof.css:272` = 0,14em; `hero.css:173` = 0,1em.
(Positiv tracking er en OK konvensjon for bittesmå caps — problemet er at det ikke er **én** verdi.)

### 🟠 C. Fire radius-verdier — `2px` er ikke et token
Tokens: `--radius: 4px`, `--radius-chrome: 10px`. Hardkodet `border-radius: 2px` i
`nav.css:195`, `work-proof.css:203`, `what-we-build.css:240` — fjerde radius utenfor systemet.

### 🟠 D. Farge-sprawl utenfor nøytral-stigen
**Korrigert etter presis skann:** de tilsynelatende dublettene (`#1a1c1c` 3×, `#12120f` 2×,
`#f6f5f1` 2×) viste seg å være token-**definisjonene** selv + kommentarer + gradient-stopp —
ikke hardkodet i levende deklarasjoner. Levende hardkodede solid-farger er kun: to `#000000` +
to `#ffffff` (bevisste rene svart/hvit tag-brikker, dokumentert) og `#f7f6f0` ×2 (CTA-hover-cream,
ikke eksakt token-verdi). Ekte engangsgråtoner utenfor stigen (`#6b6b63`, `#92928a`, `#bbbab3`,
`#4a4a44`, `#2e2e2a`, `#33332e`, `#e9e8e4`, `#dcdbd5`, `#141412`, `#161712`) finnes i gradient-
stopp/kommentarer. Konklusjon: fargebruken er strammere enn førsteinntrykket — reell sprawl er liten.

### 🟡 E. Død token: «bannlyst oransje» lever
`tokens.css:13` definerer `--color-signal: #c44414` (samme fil, linje 50, kaller den bannlyst).
Brukes ingen steder — bør fjernes.

### 🟡 F. Vertikal rytme delvis ad hoc
Fin navngitt fluid-skala (`--section-xs…3xl`) finnes, men seksjoner bruker egne clamps:
hero `clamp(110,14vh,178)`, effect-bridge `clamp(80,12vh,160)`, approach-bunn `clamp(96,14vh,180)`,
work-proof-bunn `clamp(96,14vh,200)`. Nære-men-ulike heller enn å snappe til skalaen.
(Broene har bevisst egen struktur — OK.)

---

## DEL 3 — Allerede konsistent ✅
Delt venstrekant 86px på alle hovedseksjoner · hero-CTA matcher lamalama-resepten eksakt
(52px, radius 4, cream+mørk, mono 11, gap 18) · Caleb Mono 11px uppercase gjennomgående på labels ·
dark surface `#1A1C1C` identisk · mørk nøytral-stige tokenisert (`--ink-deep/base/surface`).

## DEL 4 — Bevisste avvik fra Lama Lama (retningsvalg, ikke feil)
Kondensert display-caps (de: bred Suisse) · positiv mono-tracking (de: −0,02em) ·
én pine-aksent (de: 4 pastell) · 3 fontfamilier (de: 2). Greie **så lenge de er konsekvente** —
poeng A/B er nettopp at de ikke er det ennå.

---

## DEL 5 — Fikseplan
1. **A (display-caps)** ✅ **GJORT** — nytt token `--display-track: 0.01em`; alle 8 display-titler
   (approach, what-build title + pillar, work-proof, wp-case, process title + heading, contact ×2)
   samlet til **TGS Perfect 700 + 0,01em**. Contact-avviket 800/−0,012em rettet. Verifisert live.
   *Åpent:* sans-statement-vektene (400/500/600) er beholdt — de sporer ulike størrelser/roller
   (manifest 106px / effekt-bro 154px / what-improve 48px), så neppe ekte avvik. Vurderes egen omgang.
2. **B** ✅ **GJORT** — nytt token `--mono-track: 0.08em`; alle 19 uppercase-mono-labels på tvers
   av seksjonene samlet til 0,08em (var ≥7 verdier). `--cta-tracking` (−0,02em) beholdt bevisst.
   Verifisert live: uniqueEm = [0,080].
3. **C** ✅ **GJORT** — nytt token `--radius-fine: 2px`; nav-hamburger + begge tag-brikker refererer det.
4. **D** ✅ **AVKLART, ingen endring** — «eksakte duplikater»-skann viste at de flaggede near-dupes
   lå i kommentarer / gradient-stopp / selve token-definisjonene, ikke i levende deklarasjoner.
   Eneste levende hardkodede token-match er to `color: #ffffff` på de svarte tag-brikkene — bevisst
   ren svart/hvit (dokumentert), skal IKKE tokeniseres. Ekte engangsgråtoner (#6b6b63 osv.) beholdt
   per valg. Rapportens opprinnelige D-punkt overdrev omfanget; korrigert her.
5. **E** ✅ **GJORT** — `--color-signal` (#c44414, bannlyst oransje) slettet. Ubrukt, trygt.
6. **F** — åpen: broene har bevisst egen struktur; kun små clamp-avvik igjen. Lav prioritet.
