# Project Cleanup Audit

Dato: 2026-07-03
Scope: `/Users/reezy/Konsepter/TGN-redesign-fable5`
Modus: audit/oppryddingsrapport. Ingen sletting, ingen kodeendringer, ingen commit, ingen push. Hovedrepoet `/Users/reezy/Konsepter/TGN-redesign` er ikke brukt.

Validering som ble kjørt:
- `git status --short`
- `git ls-files`

Det ble ikke kjørt build eller typecheck.

## 1. Kort konklusjon

Hovedårsaken til at agents blir for forsiktige eller går feil er ikke primært kode. Det er at prosjektet har flere konkurrerende sannheter samtidig:

- Root-reglene sier fortsatt "one section at a time", "static first" og "do not add GSAP before static approval".
- Faktisk kodebase har allerede en full homepage-reise med aktiv GSAP/Lenis-motion i `src/components/motion/HomeMotion.tsx`.
- Storyboard og flere seksjonskontrakter beskriver tidligere statiske faser som om de fortsatt er aktive.
- Det finnes gamle/rejected retninger side om side med nyere retninger: `05-proof-ledger`, `05-work-showcase`, `WorkShowcase`, `WorkProof`, `SystemManifesto`, `EffectBridge`.
- `outputs/fable-design-review.md` er trolig den mest presise strategiske retningen, men den ligger som review-output, ikke som aktiv styringsdokumentasjon.

Problemet er mest docs + guardrails + gamle filer, ikke prompt alene. Prompten prøver å bygge effects-lab, mens repoets aktive instrukser fortsatt beskytter mot den typen arbeid. Resultatet er at Codex/Fable lett velger små polish-endringer, fordi store motion- eller journey-grep ser ut som regelbrudd.

Kort anbefaling: lag en aktiv source-of-truth-pakke før mer GSAP:

- `docs/current-design-decisions.md`
- `docs/active-section-map.md`
- `docs/motion-implementation-rules.md`
- `docs/effects-lab-override.md`
- `docs/rejected-directions.md`

## 2. Behold

Dette bør beholdes som harde eller nesten harde regler:

- Ikke rør Header/Hero uten eksplisitt godkjenning. De er fortsatt approved foundation.
- Ikke commit, push eller stage uten eksplisitt beskjed.
- Ikke importer gammel `styles.css`, `signature.css` eller `main.js`.
- Ikke importer MWG CSS, JS, fonts eller media direkte. Effektene skal adapteres til Tigon.
- Ikke rør metadata, schema, sitemap, robots, canonical, URL-er eller slugs fra redesignarbeid.
- Ikke gjør siden mer SaaS, dashboard, SEO-portal eller card-grid.
- Ikke bruk synlig orange. `--color-signal` finnes i `src/styles/tokens.css`, men bør behandles som dormant token, ikke aktiv designretning.
- Behold near-monochrome, editorial, typografisk og premium retning.
- Behold "one idea / one focal point / different layout archetype from neighbor" som designregel.
- Behold krav om server-rendered viktig tekst og lenker.
- Behold reduced-motion, mobile fallback og no-JS lesbarhet som absolutte motion-krav.
- Behold "ikke bygg hele homepage i én vanlig seksjonsoppgave" som default. Den bør bare overstyres i eksplisitte journey/effects-lab tasks.
- Behold `_design-input/` som research/reference-område. Det er riktig sted for PDF-er og referansebilder.
- Behold `docs/homepage-seo-contract.md`, men merk den tydeligere som live-site preservation contract, ikke aktiv redesign-storyboard.
- Behold `src/lib/motion.ts` som base for Lenis/reduced-motion checks, men stram bruken rundt den.

## 3. Juster

### `AGENTS.md`

Friksjon:
Reglene er riktige for vanlige seksjonspass, men de mangler en eksplisitt escape hatch for MadeWithGSAP/effects-lab. Dermed kan en motion-oppgave se ut som brudd på root-instruksene.

Foreslått ny tekst:

```md
## Working principle

Default mode: build one approved section at a time.

Exception: when the user explicitly says Effects Lab, MadeWithGSAP, MWG, GSAP effect implementation, journey pass, or 03-05 as one motion sequence, the task may touch the named connected sections and motion files needed for that effect. The exception must still preserve Header/Hero, SEO files, URL structure, no-orange, no-old-imports, reduced-motion and mobile fallback.
```

Foreslått justering av GSAP-regel:

```md
Do not add GSAP/ScrollTrigger before static layout is approved, unless the task explicitly invokes the Effects Lab override or asks for a specific MadeWithGSAP effect implementation.
```

Foreslått rapportkrav:

```md
When motion is added, report:
- section(s) touched
- whether this was a default section pass or Effects Lab override
- desktop behavior
- mobile/touch fallback
- prefers-reduced-motion fallback
- cleanup strategy
- whether any pinned ScrollTrigger was added
```

### `CLAUDE.md`

Friksjon:
Den peker kun til AGENTS og statisk-first-doktrinen. Den bør også peke til active direction og effects override.

Foreslått ny tekst:

```md
Use AGENTS.md as the source of truth.

Also read:
- docs/current-design-decisions.md
- docs/active-section-map.md
- docs/motion-implementation-rules.md

If the user explicitly requests MadeWithGSAP/MWG/Effects Lab work, also read:
- docs/effects-lab-override.md
```

### `docs/section-storyboard.md`

Friksjon:
Den sier `02 Approach` har status "Next section to design", men appen har allerede Approach, Services, EffectBridge, Effect, WorkProof, Process, SystemManifesto og ContactFooter mountet i `src/app/page.tsx`.

Foreslått ny tekst:

```md
Status: historical storyboard. Do not use this file alone as the active homepage map.

Current active order lives in docs/active-section-map.md.
This document may be used for original journey intent only.
```

Eller skriv den om til faktisk aktiv rekkefølge:

```md
00 Header
01 Hero
02 Approach / Tilnærming
03 Services / Tjenester
03b EffectBridge / Overlevering
04 Effect / Effekt
05 WorkProof / Arbeid
06 Process / Prosess
06b SystemManifesto / System
07 ContactFooter / Kontakt
```

### `docs/motion-and-assets-roadmap.md`

Friksjon:
Den sier static statuses og priority order som ikke lenger matcher koden. Den nevner "Approach motion exists as WIP stash", men motion er allerede implementert i `HomeMotion.tsx`. Den sier Prosess er "Next section", men Prosess er bygget og animert.

Foreslått ny tekst:

```md
Status: replace with docs/motion-implementation-rules.md.

Current motion implementation lives in src/components/motion/HomeMotion.tsx.
Before adding new effects, split section motion into section-specific modules and confirm the active section map.
```

### `docs/decision-log.md`

Friksjon:
Den stopper ved 2026-07-01 og sier "Static first" som siste beslutning. Den mangler senere beslutninger: Effect as showpiece, WorkProof vs WorkShowcase, MWG 031 Prosess, SystemManifesto, active motion.

Foreslått tillegg:

```md
## 2026-07-03 — Effects Lab allowed by explicit request

Decision:
Static-first remains default, but explicit MadeWithGSAP/MWG/effects-lab tasks may implement motion against approved or named sections.

Reason:
The project now needs motion architecture experiments without re-opening old prototype imports or global redesign drift.
```

### `docs/sections/05-proof-ledger.md`

Friksjon:
Dokumentet beskriver en direction som `05-work-showcase.md` selv sier er rejected. Når filen fortsatt ligger aktivt under `docs/sections/`, kan agents hente feil 04/05-retning.

Foreslått topptekst hvis den beholdes:

```md
Status: REJECTED / archived direction.
Do not implement unless the user explicitly reopens Proof Ledger.
Current 04 / Arbeid direction is WorkProof or the active section map.
```

### `docs/sections/05-work-showcase.md`

Friksjon:
Den peker mot `WorkShowcase.tsx` og `work-showcase.css`, men aktiv side bruker `WorkProof.tsx` og `work-proof.css`. Det skaper feil når agenten skal jobbe med 04 / Arbeid.

Foreslått ny tekst:

```md
Status: superseded by active WorkProof implementation unless reopened.
If 04 / Arbeid continues as WorkProof, create docs/sections/04-work-proof.md and archive this file.
```

### `docs/assets/work-showcase-art-direction.md`

Friksjon:
Den er detaljert og nyttig for assets, men bundet til `WorkShowcase.tsx`. Hvis `WorkProof` er godkjent retning, gir dokumentet feil komposisjonsinstruks.

Foreslått justering:

```md
Status: asset reference for old WorkShowcase direction.
Before using this document, confirm whether current 04 / Arbeid is WorkShowcase or WorkProof.
```

### `outputs/fable-design-review.md`

Friksjon:
Dette er strategisk sterkt, men ligger i `outputs/`. Agents kan enten overse det eller lese det som en gammel rapport uten authority.

Foreslått handling:
Promoter de aktive beslutningene til `docs/current-design-decisions.md`, og arkiver selve output-filen.

### `src/app/page.tsx`

Friksjon:
Dette er ikke feil kode, men aktiv rekkefølge avviker fra docs. Den inneholder `EffectBridge`, `WorkProof` og `SystemManifesto` uten tilsvarende aktive kontrakter.

Foreslått dokumentasjon:

```md
docs/active-section-map.md must mirror src/app/page.tsx.
If a section is mounted, it must have one current contract or be marked experimental.
```

## 4. Fjern/arkiver

Ikke slett nå. Dette er kandidater for senere trygg opprydding.

### Høy trygghet å arkivere etter godkjenning

- `outputs/qa-05-layer-assembly/`
  - Hvorfor friksjon: QA-bilder/videoer er tracked i produksjonsrepoet. De hjelper review, men gjør repoet tungt og blander testbevis med aktiv kildekode.
  - Foreslått: flytt til `outputs/archive/2026-07-02-qa-05-layer-assembly/` eller ut av repoet. Legg fremtidige QA-output i ignored mappe.

- `outputs/fable-design-review.md`
  - Hvorfor friksjon: nyttig, men feil authority-nivå. Det bør ikke være permanent styringsfil under `outputs`.
  - Foreslått: promoter beslutningene til docs, arkiver originalen.

- `docs/sections/05-proof-ledger.md`
  - Hvorfor friksjon: eksplisitt superseded/rejected retning som fortsatt ligger blant aktive contracts.
  - Foreslått: flytt til `docs/archive/rejected/05-proof-ledger.md`.

### Trolig trygt, men krever en ja/nei før arkivering

- `src/components/WorkShowcase.tsx`
  - Hvorfor friksjon: tracked component, men ikke mountet i `src/app/page.tsx`. Den konkurrerer med aktiv `WorkProof.tsx`.
  - Foreslått: arkiver hvis `WorkProof` er godkjent 04 / Arbeid.

- `src/styles/work-showcase.css`
  - Hvorfor friksjon: importeres globalt i `src/app/layout.tsx`, men tilhører en komponent som ikke er mountet. Dette er teknisk og kognitiv støy.
  - Foreslått: fjern global import og arkiver CSS sammen med `WorkShowcase.tsx` hvis retningen er droppet.

- `docs/sections/05-work-showcase.md`
  - Hvorfor friksjon: peker på WorkShowcase, ikke WorkProof.
  - Foreslått: arkiver eller omskriv til `docs/sections/04-work-proof.md`.

- `docs/assets/work-showcase-art-direction.md`
  - Hvorfor friksjon: asset-retning for en mulig gammel 04-retning.
  - Foreslått: behold bare hvis WorkShowcase gjenåpnes; ellers flytt til archive eller omskriv for WorkProof.

### Bør ikke ligge aktivt uten contract

- `src/components/EffectBridge.tsx` + `src/styles/effect-bridge.css`
  - Hvorfor friksjon: mountet og animert, men ikke i storyboard/section contracts.
  - Foreslått: enten formaliser som `03b / Overlevering` i active map, eller arkiver hvis den er rejected.

- `src/components/SystemManifesto.tsx` + `src/styles/system-manifesto.css`
  - Hvorfor friksjon: ekstra hovedseksjon mellom Prosess og Kontakt som root-instruksene ville forbudt i en vanlig task. Den må enten være godkjent eller merkes som experiment.
  - Foreslått: formaliser eller arkiver.

## 5. Uavklart

Dette bør spørres om før sletting/arkivering:

- Er `WorkProof` den godkjente 04 / Arbeid-retningen, eller skal `WorkShowcase` tilbake?
- Skal `EffectBridge` være en permanent 02→03 transition, eller var det et experiment?
- Skal `SystemManifesto` være en permanent hovedseksjon, eller bryter den regelen om ikke å legge til nye hovedseksjoner?
- Skal `05 / Prosess` fortsatt være MWG 031 pinned card sequence, eller var det et effects-lab testspor?
- Skal `outputs/qa-05-layer-assembly/` bevares som review-evidence i repoet, eller flyttes ut/arkiveres?
- Skal `outputs/fable-design-review.md` bli aktiv doktrine, eller er den bare et innspill?
- Skal `docs/homepage-seo-contract.md` ligge i dette redesignrepoet som aktiv guardrail, eller bør det merkes som live-site migration contract?
- Skal `_design-input/references/` bli værende tracked, eller skal det lages en lett `references-index.md` slik at agents ikke må tolke alle bilder hver gang?

## 6. Motion cleanup

### Dagens situasjon

`src/components/motion/HomeMotion.tsx` er ca. 695 linjer og gjør alt:

- service accordion state
- footer clock/copy utility
- Lenis init
- GSAP matchMedia
- Hero entrance
- Approach fill
- service reveals
- EffectBridge handoff
- pinned 03 / Effekt
- WorkProof reveal/parallax
- MWG-style Process pinning
- SystemManifesto reveal
- footer reveal

Dette er for monolittisk for neste fase. Det fungerer som prototype, men det gjør det vanskelig å:

- reviewe én section motion isolert
- vite hvilke ScrollTriggers som finnes
- gjenbruke MadeWithGSAP patterns trygt
- unngå duplicate triggers ved remount/endring
- dokumentere mobile/reduced fallback per section
- skille utility enhancement fra motion

### Anbefalt organisering

Behold én client entrypoint, men flytt section motion ut:

```text
src/components/motion/HomeMotion.tsx
src/components/motion/sections/heroMotion.ts
src/components/motion/sections/approachMotion.ts
src/components/motion/sections/servicesMotion.ts
src/components/motion/sections/effectBridgeMotion.ts
src/components/motion/sections/effectMotion.ts
src/components/motion/sections/workProofMotion.ts
src/components/motion/sections/processMotion.ts
src/components/motion/sections/systemManifestoMotion.ts
src/components/motion/sections/footerMotion.ts
src/components/motion/utilities/footerUtilities.ts
src/components/motion/utilities/serviceAccordion.ts
```

`HomeMotion.tsx` bør bare:

- registere `ScrollTrigger`
- initialisere Lenis når allowed
- sette opp `gsap.matchMedia()`
- kalle section-specific setup functions
- samle teardown
- refresh etter fonts/images ved behov

### GSAP context og matchMedia

Hver section function bør følge samme pattern:

```ts
export function setupEffectMotion(root: ParentNode, mode: MotionMode) {
  const section = root.querySelector<HTMLElement>(".what-improve");
  if (!section) return () => {};

  const ctx = gsap.context(() => {
    // section-only tweens and ScrollTriggers
  }, section);

  return () => ctx.revert();
}
```

Regel:
- Ingen section module bør gjøre globale `document.querySelector` uten root.
- Ingen module bør opprette ScrollTrigger uten teardown via `ctx.revert()` eller eksplisitt cleanup.
- Alle pinned triggers må dokumenteres i `docs/motion-implementation-rules.md`.

### Section-specific motion

Anbefalt rollefordeling:

- Hero: one-time entrance, eventuelt subtil parallax senere. Ingen pin.
- 01 Approach: rolig text-fill eller reveal. Ingen pin.
- 02 Services: hover/accordion + row reveal. Ikke scroll-showpiece.
- 02→03 EffectBridge: behold bare hvis active map godkjenner den som overgang.
- 03 Effekt: hoved-showpiece. Maks én pinned/scrubbed sequence på desktop.
- 04 Arbeid/WorkProof: reveal/parallax, ikke pin.
- 05 Prosess: enten sekundær stack-motion uten pin, eller MWG 031-pinning hvis effects-lab override eksplisitt ber om det.
- 06/SystemManifesto: avklar om permanent. Hvis ja: reveal only.
- 07 Kontakt: micro only, wordmark/email; footeren skal være utpust.

### Lenis

`src/lib/motion.ts` er et godt startpunkt:

- `canUseSmoothMotion()` stopper på reduced motion, touch og mobile.
- `initLenis()` har active controller og destroy.
- ticker integration er samlet.

Rydding:

- Dokumenter at Lenis bare brukes desktop/no-preference.
- Ikke la section modules starte Lenis.
- Vurder å legge `ScrollTrigger.refresh()` etter store accordion-state changes og etter fonts/images.
- Ikke bruk Lenis som global scroll-jacking. Det skal være smoothing, ikke styring.

### Reduced motion

Krav:

- CSS default må være full lesbar slutt-tilstand.
- GSAP skal animere `from`, ikke skjule innhold i CSS som bare JS viser igjen.
- `prefers-reduced-motion` skal ikke opprette pins, scrub timelines eller Lenis.
- Utility enhancements kan kjøre, men må ikke skjule viktig content utilgjengelig.

Obs:
`setupServiceAccordion()` kjører utenfor motion-gating. Det er praktisk, men bør dokumenteres som UI enhancement, ikke motion. Sjekk at collapsed service descriptions fortsatt er tilgjengelige via button/aria og at no-JS viser innholdet.

### Mobile/touch

Krav:

- Ingen pin på mobil/touch.
- Ingen horizontal overflow.
- Ingen ScrollTrigger-effekter som krever presis scrub.
- Stacks skal lese naturlig som dokument.
- MadeWithGSAP-effekter må ha en mobil-adapter, ikke bare desktop CSS skalert ned.

### Duplicate trigger-risk

Risikopunkter:

- Stor `HomeMotion.tsx` gjør det vanskelig å se hvilke triggers som ryddes.
- `effectStage()` legger til global `ScrollTrigger` refresh listener og rydder den, bra, men dette bør bli standard pattern.
- `processStage()` bruker `gsap.context`, bra. Flere andre setup-funksjoner bør få samme struktur.
- Ved fremtidig routing/remount bør `mm.revert()` + section teardowns være nok, men det blir tryggere når hver section eier sine triggers.

### Blurry text-risk

Risikopunkter:

- Process bruker `rotationX`, `rotationZ`, `scale` og pin. Dette kan gjøre tekst blurry, spesielt i Safari.
- Store typografiske ord med clip-path/scrub bør holdes på integer-ish transforms og unngå langvarig subpixel-scaling.
- Ikke legg `filter: blur()` eller tunge backdrop effects på store tekstflater.
- For MWG-adaptasjoner: bruk transform på decorative surfaces når mulig, ikke på primær lesetekst.

## 7. Effects Lab Override

Foreslått innhold for `docs/effects-lab-override.md`:

```md
# Effects Lab Override

Status: Active only when explicitly invoked.

This override applies when the user explicitly says:
- Effects Lab
- MadeWithGSAP
- MWG
- GSAP effect implementation
- motion experiment
- implement this effect
- 03-05 as one motion journey

## Purpose

The default Tigon workflow is section-by-section and static-first.
Effects Lab is the exception for controlled motion architecture work.

The goal is to adapt selected MadeWithGSAP-style effects into Tigon's own
premium editorial system without importing old code, old prototype files or
third-party visual language wholesale.

## What this override allows

When explicitly invoked, the task may:

- add or change GSAP/ScrollTrigger code
- touch the named connected sections needed for the effect
- work across 03-05 if the effect is a journey/transition
- create section-specific motion modules
- use pin/scrub on desktop if the effect contract calls for it
- adjust static structure only where required to make the effect safe

## What this override does not allow

Do not:

- touch Header/Hero unless explicitly named
- touch SEO, metadata, schema, sitemap, robots, canonical, URL structure or slugs
- import old styles.css, signature.css or main.js
- import MWG CSS, JS, fonts or media directly
- add visible orange
- make the page SaaS/card/dashboard
- add component-library effects
- add random images
- hide important content behind JS
- create motion without reduced-motion and mobile fallbacks
- commit or push unless explicitly requested

## Required motion contract

Before or during implementation, define:

- section(s) affected
- effect source/reference
- desktop behavior
- mobile/touch fallback
- prefers-reduced-motion fallback
- no-JS/default state
- whether pin is used
- cleanup strategy
- expected files

## Implementation rules

- Scope every GSAP setup to a section root with gsap.context().
- Use gsap.matchMedia() for desktop/mobile/reduced modes.
- CSS default must be readable and complete.
- Prefer FROM animations so no-JS content remains visible.
- Use one pinned showpiece at a time unless the user explicitly approves more.
- Keep Lenis global and desktop-only; section modules must not start Lenis.
- Do not animate primary reading text with long 3D transforms if it causes blur.
- Kill or revert every ScrollTrigger on cleanup.

## Reporting

Report:

- files changed
- sections touched
- whether Header/Hero changed
- whether motion was added
- whether pin/scrub was added
- mobile fallback
- reduced-motion fallback
- whether old CSS/JS/MWG files were imported
- whether orange appears
```

## 8. Active Design Direction

Foreslått kort source of truth:

```md
# Current Tigon Homepage Direction

Tigon should feel like a premium digital studio:

- editorial
- restrained
- typographic
- confident
- near-monochrome
- spacious
- authored
- custom, not template-like

The homepage is a designed journey, not a stack of generic sections.
Each section needs one idea, one focal point and a distinct pacing role.

Current direction:

- Header/Hero are approved foundation and should not be changed without explicit approval.
- Large typography is allowed, but not every section should use the same display mode.
- 03 / Effekt is the natural main motion showpiece when approved.
- GSAP effects are allowed when explicitly requested, especially in Effects Lab / MadeWithGSAP tasks.
- Motion must support narrative, not decorate weak layout.
- Mobile and prefers-reduced-motion states must remain calm, readable and complete.
- Important text and links must be server-rendered and visible without JS.

Never drift toward:

- SaaS dashboard
- card grid
- SEO portal
- generic agency template
- old STRUKTUR / FØR / PYNT intro
- Veivalg
- Før du bygger
- guide/article/resource modules in the main flow
- visible orange
- random component-library effects
- imported old CSS/JS
- random AI images as final assets

If a direction is rejected, move it to docs/rejected-directions.md or docs/archive.
Do not leave rejected contracts among active section contracts.
```

## 9. Safe cleanup plan

### P0: må ryddes før mer GSAP

1. Opprett `docs/active-section-map.md` som speiler `src/app/page.tsx`.
   - Hvorfor: agents trenger én aktiv rekkefølge. Akkurat nå sier docs og kode forskjellige ting.

2. Opprett `docs/effects-lab-override.md`.
   - Hvorfor: ellers vil GSAP/MWG-oppgaver stadig kollidere med static-first-reglene.

3. Opprett `docs/motion-implementation-rules.md`.
   - Hvorfor: `HomeMotion.tsx` er for stor til å være eneste motion-contract.

4. Marker `docs/sections/05-proof-ledger.md` som rejected eller flytt den til archive.
   - Hvorfor: den er eksplisitt erstattet og kan få agents til å bygge feil 04/05.

5. Avklar `WorkShowcase` vs `WorkProof`.
   - Hvorfor: to 04 / Arbeid-retninger er den største kilde-/kodefriksjonen.

6. Splitt `HomeMotion.tsx` før neste store MWG-pass.
   - Hvorfor: ny GSAP oppå 695-linjers monolitt øker duplicate-trigger og cleanup-risiko.

### P1: bør ryddes snart

1. Promoter `outputs/fable-design-review.md` til `docs/current-design-decisions.md`.
   - Behold kun beslutningene, ikke hele review-formatet.

2. Omskriv `docs/section-storyboard.md` fra gammel plan til historisk storyboard eller aktiv map.

3. Omskriv `docs/motion-and-assets-roadmap.md` til faktisk nåtilstand.

4. Opprett `docs/rejected-directions.md`.
   - Legg inn rejected Proof Ledger, gammel WorkShowcase hvis droppet, gamle Process variants, "ikke større redesign" hvis den ikke lenger gjelder.

5. Formaliser eller arkiver `EffectBridge` og `SystemManifesto`.
   - De er mountet og animert, men mangler aktive kontrakter.

6. Flytt QA-media ut av aktiv `outputs/`-rot.
   - `outputs/qa-05-layer-assembly/` bør ikke være noe agents tolker som source.

### P2: kan vente

1. Lag `_design-input/references-index.md`.
   - Kort forklaring av hvilke references som gjelder for hero, intro, work, footer, motion.

2. Vurder om `--color-signal` skal beholdes som dormant token eller fjernes.
   - Ikke P0 fordi det ikke ser ut til å være brukt i source utenfor tokens.

3. Rydd README hvis prosjektet trenger menneskelig onboarding.
   - Ingen README ble funnet via filoversikten, men det er ikke kritisk.

4. Vurder ignored struktur for fremtidig QA-output.
   - Eksempel: `outputs/local-qa/` ignored, `outputs/archive/` tracked bare ved eksplisitt beslutning.

## 10. Ingen endringer gjort

Denne audit-passen har ikke slettet filer, ikke endret kodefiler, ikke committet og ikke pushet.

Det eneste som er opprettet er denne rapportfilen:

- `PROJECT_CLEANUP_AUDIT.md`

Kodefiler i `src/`, docs under `docs/`, assets under `_design-input/`, package-filer og git-historikk er ikke endret av denne audit-passen.

Pre-audit status var clean ved `git status --short`. Etter rapportopprettelsen skal repoet kun vise denne nye rapportfilen som endring, med mindre andre prosesser har skrevet samtidig.
