# Forside-rubrikk — fasit for review

Destillert fra `current-project-rules.md` + `motion-and-assets-roadmap.md` + `tokens.css` + live-ekstrakt
av lamalama.com (2026-07-07). **Dette er ENESTE fasit review-en trenger — ikke les de store docsene.**
Målestokken er *bakt inn her* så review-en måler mot den uten å researche på nytt (det holder kostnaden nede
uten å ofre kvalitet).

**Bruk denne som GULV, ikke tak.** DEL A–E fanger regelbrudd og kjente gap. Men review-en skal ALLTID
også tenke fritt utover lista (DEL F) — foreslå det som faktisk løfter Tigon til awwwards, inkludert ideer
som ikke står her, og utfordre en regel når den holder designet tilbake. Ikke bare kryss av bokser.

---

## DEL A — Awwwards-baren (målestokken review-en sammenligner mot)

Awwwards scorer ~ **Design 40 % · Usability 30 % · Creativity 20 % · Content 10 %**. For hver seksjon,
plassér på skalaen og navngi gapet:
`portfolio/template`  →  `bra byrå-side`  →  `awwwards-craft`.

**Craft-signaler (konkret, sjekkbart):**
- **Type:** ekte skala-hopp (ikke default), én display- + én støtte-stemme konsekvent, stram-men-lesbar tracking, ingen orphan/enkeltord på egen display-linje.
- **Layout:** bevisst grid, asymmetri *med spenning*, negativt rom som leser som **komposisjon** — ikke som tomrom/uferdig.
- **Farge:** stram palett, ETT system på tvers av lyst/mørkt, ingen gjørmete overlapp (nav over feil bakgrunn).
- **Motion:** avdekker/guider, ETT signatur-øyeblikk, 60fps, respekterer reduced-motion, aldri gratis pynt.
- **Media:** ekte, art-directed, konsekvent gradering/behandling, **null placeholder**, ingen generisk stock.
- **Detalj:** hover/aktiv-tilstander, konsekvent radius, optisk innretting av kanter, mikrotype som fortjener plassen.
- **Konsept:** én rød tråd; copy + visuelt forsterker samme idé.
- **UX/ytelse:** rask LCP, ingen CLS, tastatur/a11y, responsiv holder på hvert brekkpunkt.

**Referansemønstre (fra lamalama + sjangeren) — sjekk om Tigon har ekvivalenten i *eget* språk:**
full-bleed art direction · levende status-mikrotype (klokke/koordinat) · flytende glass-chrome ·
kondensert display i monumental skala · mono-mikrotype-system · hover/cursor-craft.

**KRITISK:** Tigon skal IKKE bli lamalama (cinematisk/høylytt). Mål mot awwwards-**craften** i Tigons
near-monochrome, restrained, editorial språk. Å kopiere loudness = pastisj = regelbrudd.

---

## DEL B — Tigon hard-regler (brudd = flag rødt)
- Ingen **synlig oransje** (`--color-signal` slettet; signal = `--pine`).
- Ikke **SaaS / card-grid / dashboard / generisk timeline / 4 like kort / ikoner**.
- **Hero + Header** struktur/innhold urørt uten eksplisitt ok. **SEO-metadata / URLer / slugs / footer-NAP urørt.**
- Ingen **particles, cursor-follow, scroll-jacking** (utover godkjent), **horisontal scroll** (kun Prosess).
- **Reduced-motion + no-JS:** all viktig tekst SSR og lesbar uten JS; motion FROM-only (ingen CLS).
- Maks **1–2 signatur-motion-øyeblikk** totalt (bro-igniten er ett).

## DEL C — Token-disiplin (aldri ad hoc — velg alltid et trinn)
- **Farge:** lys-stige `--paper/--off-white/--bone/--stein/--greige/--blekk`; mørk-stige `--ink-deep/--ink-base/--ink-surface` (**kun 3**); `--pine/--pine-tint` kun mikro.
- **Tekst-opasitet:** snap til `--on-dark-*`/`--on-light-*` (.90/.84 · .68/.66 · .54/.50 · .40/.38). Aldri en α imellom.
- **Radius:** KUN `--radius-fine 2` / `--radius 4` / `--radius-chrome 10` / `999` (rene toggles+prikker).
- **Type:** kondenserte titler = `--font-display`+700+`--display-track`. Uppercase-labels = `--font-mono`+uppercase+`--mono-track`. CTA = `--cta-tracking`. **Én stemme per rolle.**
- **Glass:** kun `--glass-*`-tokens. **Rytme:** `--gutter`/`--page-max`, `--section-pad-y`/`--section-*`, 12-kol grid.
- **Skalaer:** mono kun 3 (12/11/10), lead kun 3 (l/m/s).

## DEL D — De 4 kjente craft-gapene (spor status hver kjøring)
1. **HERO** — er `hero__visual` fortsatt tom gradient-placeholder?
2. **DØDT ROM** — `what-build` (BYGGER) + `effect-bridge`: store tomme svarte partier som leser «uferdig»?
3. **NAV** — mørkt glass-nav over lyse seksjoner (Prosess/Manifest) = gjørmete? kolliderer med titler?
4. **TYPE-STEMME** — bro/manifest-statements i annen font/case enn de kondenserte titlene?

*(Nye gap som dukker opp skal legges til i status-fila, ikke bare de fire.)*

---

## DEL E — Slik reviewes hver seksjon
For hver seksjon i `src/components/`, mot DEL A–D:
1. **Regel-/token-brudd?** (ja/nei + hvilken)
2. **Awwwards-plassering** (`template`/`bra byrå`/`craft`) + det konkrete gapet mot craft.
3. **Ett konkret grep** som lukker gapet.

Vær uttømmende — fang **alle** svakheter, ikke bare de opplagte. Ikke kort-kapp den dype analysen.

---

## DEL F — Kreativt mandat (gulv-over-tak: tenk fritt her)

Sjekklista over sier hva som er *galt*. Denne delen handler om hva som ville gjort siden *awwwards-verdig*.
Her har du frihet — ikke bind deg til DEL A–E:

- **Hva mangler for SOTD?** Ikke bare de 4 kjente gapene — hva ville en awwwards-juryjury savne? Konsept-tråd? Ett minneverdig øyeblikk? En detalj-tetthet siden ikke har ennå?
- **Referanse-tyveri (oversatt):** hva gjør de beste sidene i sjangeren (studio/agency/editorial) som Tigon ikke gjør — og hvordan ville det sett ut *i Tigons stramme språk*? Foreslå konkret, ikke generisk.
- **Utfordre reglene:** hvis en Tigon-regel (DEL B/C) faktisk holder designet tilbake fra craft, si det — som et **forslag med begrunnelse**, ikke et stille brudd. Bruker bestemmer.
- **Nye ideer velkommen:** motion-grep, layout-spenning, mikro-interaksjon, konseptuell vri. Merk hva som er «innenfor systemet» vs. «krever godkjenning».

Vær ambisiøs og konkret. Dette er delen som faktisk flytter siden — ikke hold igjen.
