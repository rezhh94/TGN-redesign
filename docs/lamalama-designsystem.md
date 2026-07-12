# Lama Lama — Design System Extract + sammenligning med TGN

> Reference snapshot, not the current section map. Layout descriptions for Tjenester, Arbeid and Prosess predate the 2026-07-09 implementation. Use `docs/current-homepage-state.md` for active structure.

> Ekstrahert fra live-siden (lamalama.com) 2026-07-07 via computed styles.
>
> **Om tallene:** Lama Lama skalerer hele siden med viewport (rot-font ≈ 19px på 1710px skjerm).
> Verdier vises som **live → normalisert til 1440/16px-base** (delt på 1.1875) for å være
> sammenlignbare med TGNs clamp/px-verdier.

---

## 1. Fonter

| Rolle | Lama Lama | TGN |
|---|---|---|
| Display / titler | `SuisseBPIntl` 300/400/500/**700**. Bred grotesk, ikke kondensert. | `TGS Perfect` Condensed 400–900 (kondensert) |
| Brødtekst / lead | `SuisseBPIntl` 400 (samme familie som titler) | `JUST Sans` 400–800 |
| Mono / UI / tags / knapper | `Sometype Mono` (variabel 400–700) | `Caleb Mono` 400 (+ reverse-italic) |

**Nøkkel:** Lama Lama kjører kun **2 familier** — én grotesk (Suisse) til både display og brødtekst,
pluss én mono (Sometype) reservert for UI/meta/tags. TGN kjører **3 familier**. Deres display er
bred/fet caps; TGNs er smal kondensert. Største visuelle forskjell mellom systemene.

## 2. Typografi-skala (normalisert til 1440/16)

| Element | Lama Lama | TGN |
|---|---|---|
| H1 / hero | 72px, weight 700, UPPERCASE, line-height 0.80, letter-spacing −0.02em | `clamp(76→360px)`, weight 900, uppercase, lh 0.79 |
| H2 / seksjon | 48px, weight **400**, mixed-case, lh 0.90, −0.02em | `--fz-section clamp(38→124px)` |
| H4 / kort-tittel | ~18px, weight 400, −0.02em | — |
| Lead-paragraf | 20px, weight 400, lh 1.2, −0.02em | `--fz-lead-l clamp(19→23px)` |
| Brødtekst | 16px (Suisse) | `--fz-body 16px` |
| Mono-label | 10px, weight 500, uppercase, −0.02em | `--fz-mono-l 12 / 11 / 10` |

Lama Lama holder seksjonstitler i weight 400 (lette) og lener seg på størrelse + stram tracking
(−0.02em overalt) for hierarki. Display line-height ekstremt stram (0.79–0.80) — TGN matcher.

## 3. Knapper

**Lama Lama primærknapp** (normalisert):
- Høyde ~50px (live 59)
- Padding ~11px vertikal / 12px venstre · 24px høyre (asymmetrisk — pil sitter høyre)
- `border-radius` 4px (live 4.75)
- Font: Sometype mono 10px, weight 500, UPPERCASE, letter-spacing −0.02em
- Gap ikon↔tekst 20px (live 23.75)
- Fylt = cream `#F9F4EB` + mørk tekst · Outline = `1px solid rgba(249,244,235,0.2)` · Ghost = `rgba(255,255,255,0.1)`

Varianter: fylt (cream), outline (hårlinje 20%), ghost (10% hvit), kvadratiske ikon-knapper
40×40 / 48×48, små tag-piller 34px høye.

| Spec | Lama Lama (norm.) | TGN `.hero__cta` (før) |
|---|---|---|
| Høyde | ~50px | 56px |
| Radius | 4px | 4px ✅ |
| Font-størrelse | 10px | 12px |
| Padding | 11/12·24 (asymmetrisk) | `0 28px` |
| Gap | 20px | 12px |
| Fylt-stil | cream + mørk tekst | cream + mørk tekst ✅ |
| Uppercase mono | ✅ | ✅ |
| Pil ↗ | filled glyf | mask med deres faktiske ↗-SVG ✅ |

## 4. Ikoner

Bittesmå fylte glyfer: 10px, `viewBox="0 0 10 10"`, `fill` (ikke `stroke`), off-white.
Pikselaktig, geometrisk — ingen line-icons. TGN bruker samme filosofi (arrow som `mask`/`currentColor`).

## 5. Farger

| Rolle | Lama Lama | TGN |
|---|---|---|
| BG primær | `#1A1C1C` | `--ink-surface #1A1C1C` ✅ identisk |
| BG sekundær | `#000` / `#010101` | `--ink-deep #040404` |
| Tekst/off-white | `#F9F4EB` (varm) | `#F2F1EB` (litt kjøligere) |
| Aksenter | pink `#FFC6DA`, red `#E75D60`, blue `#DCF2F4`, green `#D0FF7E` | signal → pine `#33453B` |

Lama Lamas «signal» er egentlig off-white; de har ingen dominant merkefarge, men 4 pastell-aksenter
brukt sparsomt. TGN har konsolidert til én dempet pine-grønn — mer disiplinert, færre lekne aksenter.

## 6. Spacing & grid

Lama Lama har en eksplisitt **fluid token-skala** — hver verdi `max(rem, vw)`:
- Seksjoner: `section-3xs (10/20)` → `section-4xl (160/320)` — ~9 navngitte trinn
- Spacing: `xs 8/12 · sm 12/16 · md 16/24 · lg 24/32 · xl 32/48 · 2xl 48/64`
- Grid: **12 kol desktop / 6 mobil**, gutter 24/10px, margin 40/16px

TGN: ett `--section-pad-y clamp(128→216px)` + `--gutter clamp(24→150px)`, ingen kolonne-grid-token.

Lama Lama er mer granulær/systematisk på spacing — hel navngitt skala + ekte 12-kol grid.

---

## Oppsummering — hvor TGN står

**Matchet ✅:** dark surface `#1A1C1C`, radius 4px, cream fylt-knapp, mono-uppercase-labels,
stram display lh (~0.79), deres faktiske ↗-pil, filled/mask-ikon-filosofi.

**Bevisste avvik (gode):** kondensert display, én pine-aksent i stedet for 4 pastellaksenter,
roligere/større knapper.

**For å komme nærmere Lama Lama:**
1. Knapp: mono 12→10–11px, gap 12→~18px, asymmetrisk padding når pil er med.
2. Titler: weight 400 i stedet for fet — hierarki via størrelse + tracking. *(hoppet over denne omgang)*
3. Tracking: −0.02em konsekvent på all display/mono.
4. Spacing: navngitt fluid seksjon-skala (`section-sm…4xl`) i stedet for én `--section-pad-y`.
5. Grid: eksplisitt 12-kol-token for konsistent venstrekant.

## Endringslogg

- **2026-07-07 (konsistens-pass):** Ferskt live-ekstrakt av lamalama bekreftet deres kjerneregel:
  `letter-spacing −0.02em` på ALT + seksjonstitler i vekt 400. TGN-siden auditert mot dette og
  interne avvik ble samlet i den daværende audit-runden. Tre nye ÉN-kilde-tokens:
  `--display-track 0.01em` (alle 8 display-titler → TGS 700 + 0.01em; contact 800→700),
  `--mono-track 0.08em` (alle 19 mono-labels; var ≥7 verdier), `--radius-fine 2px` (3-trinns
  radius-skala). `--color-signal` (bannlyst oransje) slettet. TGN beholder bevisst positiv
  mono-tracking (ikke lamalamas −0.02em) og kondensert display — dokumentert som retningsvalg.

- **2026-07-07:** Første ekstrakt + implementert #1 (knapp), #3 (mono-tracking, ikke titler),
  #4 (seksjon-skala), #5 (grid-token) i `tokens.css`. #2 (titler) bevisst hoppet over.
- **2026-07-07:** Migrert to seksjoner over på 12-kol grid-tokenene som eksempel:
  - **02 Tjenester** (`what-we-build.css`): masthode (label kol 1–2 / innhold kol 4–12,
    kol 3 = grid-luft) + pilarer (3 × span 4).
  - **04 Arbeid** (`work-proof.css`): sikk-sakk-rader (tekst kol 1–4 / mockups kol 6–12,
    speilet annenhver rad via grid-linjer). Delt venstre/høyre-kant (86/1610px) på tvers av
    begge seksjoner. Begge kollapser rent til 1fr på mobil (grid-linjer nullstilt til auto).
    Konsekvens: gutter er nå fast 24px overalt (var 57–96px ad hoc) — strammere, mer systematisk.
- **2026-07-07:** Migrert *alle* resterende seksjoner over på 12-kol-gridet:
  - **Hero** (`hero.css`): hero-bånd (hovedtekst kol 1–8 / handlinger kol 9–12).
  - **02 Tjenester** (`what-we-build.css`): + register (3 × span 4).
  - **03 Effekt** (`what-we-improve.css`): sticky aside kol 1–4 / kort-strøm kol 6–12.
  - **05 Prosess** (`process-layers.css`): steg-rad (nr kol 1 / tekst kol 2–5 / media kol 7–12).
  - **Kontakt** (`contact-footer.css`): closing + ledger-rader (label kol 1–2 / innhold kol 4–12).
  - Bro-/manifest-seksjonene (Approach, Effect-bridge, System-manifesto) er enkolonne-tekst og
    deler allerede gutter-kanten — ikke migrert (grid gir dem ingenting). Nav er chrome.
  - **Verifisert på store skjermer:** 2560px (QHD 32") → alle 9 seksjoner deler venstrekant 128px,
    høyrekant 2417px, null horisontal overflow. 3840px (4K 32") → innhold cappes på page-max 2560
    sentrert, alle seksjoner deler venstrekant 783px, null overflow. Kollaps til 1fr ren på mobil.
- **2026-07-07 (fix):** To regressjoner fra grid-migreringen funnet + rettet (diagnose via
  bounding-rect på alle 9 grid, ikke gjetting):
  - **Arbeid speilede rader** la mockups på rad 2 (tekst kol 9–12 kom først i DOM, mockups
    kol 1–7 hadde tidligere kolonne → grid sparse-pakking dyttet dem ned). Fix: `grid-row: 1`
    på begge barn (nullstilt til auto på mobil).
  - **Kontakt NAP-rad** brukte `<address>` (`.contact-footer__address`), ikke `__row-links`,
    så adressen auto-plasserte i kol 3 (én kol → wrappet stygt). Fix: la `.contact-footer__address`
    til grid-column-regelen (og mobil-reset). Verifisert visuelt på begge etterpå.
