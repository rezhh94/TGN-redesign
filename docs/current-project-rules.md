# Current Project Rules

## Current Design Direction

Tigon should feel like a premium digital studio:
- editorial
- restrained
- typographic
- confident
- near-monochrome
- spacious
- custom, not template-like

The homepage should feel like an authored journey, not a SaaS page, dashboard, SEO portal or card-grid system.

## Hard Rules

Do not, unless explicitly requested:
- change SEO metadata, schema, sitemap, robots or canonical
- change URLs or slugs
- change Header or Hero
- change footer/NAP/important links
- import old `styles.css`, `signature.css` or `main.js`
- import MadeWithGSAP CSS, JS, fonts or assets directly
- use visible orange
- make the design SaaS, card-grid or dashboard-like
- commit or push

## Flexible Rules

Prefer focused tasks, but multi-section work is allowed when the user asks for a connected journey, transition or effects sequence.

Static-first is preferred, but not absolute. If the user asks for GSAP, MadeWithGSAP or an effect implementation, structure and motion may be implemented together.

Use a section contract when helpful, but do not over-plan when the task is clear.

Reports should be short unless the user asks for an audit.

## Effects / MWG Rule

MadeWithGSAP and external effects are references for motion architecture only.

Do not recreate the external visual style; adapt the motion to Tigon's own visual system.

Do not import their CSS, JS, fonts or assets directly.

When the task says effect, implement the effect. Do not stop at audit unless the user asked for audit.

Motion must respect reduced motion, mobile/touch behavior and no-JS readability. Important text and links must remain server-rendered and available without JavaScript.

## Task Language

If the task says redesign, visible layout or structure change is expected.

If the task says polish, small improvements are okay.

If the task says effect or motion implementation, GSAP is allowed.

If the task says audit, do not implement.

## Rejected Directions

Rejected old directions should not control new work unless the user explicitly reopens them.

Do not recreate:
- the old `STRUKTUR / FØR / PYNT + 4 rows` intro
- Veivalg
- Før du bygger
- guide/article/resource modules in the main flow

## Design-System Test (2026-07-04)

Static system pass from `forside-audit.md`, to be validated visually before commit:

- **Aksent:** dempet furugrønn `--pine #33453b` / `--pine-tint #dbe2dc`. Kun mikro-elementer (statusprikk, hover/focus, nummer, tynne linjer). Aldri stor flate. Ingen oransje (`--color-signal` forblir ubrukt).
- **Varm nøytral-stige:** `--paper #faf9f5`, `--off-white #f6f5f1`, `--bone #eeece5`, `--stein #e4e2da`, `--greige #cfccc2`, `--blekk #12120f`.
- **Mørk nøytral-stige (2026-07-05) — 3 trinn, kjølig grønn-undertone:** `--ink-deep #040404` (drama/tomrom: broen, dypeste paneler), `--ink-base #0e0f0f` (standard mørk: 01, 03, Prosess mørk), `--ink-surface #1a1c1c` (det løftede rommet = 02/Tjenester, **uendret**). Base ligger bevisst tydelig mørkere enn surface så services leser som løftet. Aldri flere trinn — kontrast på mørkt skal komme fra typografi + hårstrek, ikke nye gråtoner. De gamle nøytrale gråtonene 1D1D1D/1F1F1F ble forkastet (dupliserer surface + feil undertone). Hero og footer er token-rullet (etter eksplisitt ok 2026-07-05): deres gradienter bygges nå av `--ink-base`/`--ink-deep` (lys-glødene beholdt), så hele siden deler samme kjølige undertone. Kun bakgrunn endret — struktur/innhold/lenker urørt.
- **Lyse rom:** 02/Tjenester → Bone (mørke slabs, ikke card-grid), 04/Arbeid → Stein (galleri/proof). 03/Effekt løftet fra `#060706` til `#0d0e0c`. Resten mørk/veksling som før.
- **Tittelstige (fast trapp — velg alltid et trinn, aldri en px imellom):** Tier 1 monumental (Hero ~360, 07-closing ~308/480), Tier 2 kapittel-stor ~170 (01, 02/BYGGER, **02→03-broen**), Tier 3 kapittel-mid ~112–120 (04, 05, 06). Hero forblir alltid størst. 03 får pine-tick-anker + løftet kicker uten stor «Effekt»-tittel.
- **02→03-broen (Overlevering) — dominant «ignite»-pin (2026-07-05):** helsvart `#000` tonalt brudd mellom 02 og 03, statementet pinnet i viewport-senter, tittel på **Tier 2 (~170)**. «er ikke ferdig.» brenner fra grått til hvit (scrub-opplysning, ord for ord) mens «Ferdigbygget» står dempet. Dominans skal komme fra pin + svart + opplysning — **ikke** fra en oppfunnet mellomstørrelse. Erstatter den gamle ~96 sans-broen med MWG 015-rull.
- **03/Effekt — «måletråd» (2026-07-05):** tokolonne på `#0d0e0c`. Venstre: sticky index-skinne (01 Funnet → 04 Målt) med en vertikal tråd (`--pine-tint`) som fylles på scroll; aktivt målepunkt lyser opp. Høyre: fire outcome-blokker med kjempenumeral (Tier 3 ghost) + gjenbrukt arbeidsbilde (`/work/carousel/01–04.png`) i editoriell ramme (skarpe hjørner + hårstrek, **ikke** kort som 04) som spretter fra gråtone til full farge når punktet er aktivt. Ingen oppdiktede tall — tråden *er* «målingen». Erstatter MWG 097 tightening-lines. Bytt til Tigon-mockups når de finnes. Ingen kort-grid, ingen horisontal pin (05 eier den).
- **Lead-skala:** `--fz-lead-l/m/s` (~27/20/17).
- **Tekst-styrke (2026-07-05) — 4 faste trinn per grunn:** overskrifter bruker full `--color-on-dark`/`--color-ink` (1.0); alt annet snapper til `--on-dark-strong/medium/quiet/faint` (.90/.68/.54/.40) eller `--on-light-*` (.84/.66/.50/.38). Erstatter ~30 spredte on-dark α + 7 on-light. Velg et trinn, aldri en α imellom. Bevisste unntak beholder egne verdier: wordmark-ekko (.06/.028), ignite-dim (bro .32), ghost-numeral/aktiv-tilstand (03 .14/.30), dimmet display-ord (04 .40). **Ekskludert:** `work-showcase.css` (død kode — ubrukt 04-variant, fortsatt importert i layout.tsx). Nav/Header ble token-rullet 2026-07-05 (eksplisitt ok): kjølig header-gradient + mobilmeny-bg fra `--ink-*`, `.mobile-menu__foot` → quiet/`--fz-mono-s`, nav-links → `--fz-mono`.
- **Mono-stige (2026-07-05) — 3 trinn:** `--fz-mono-l 13px` (CTA/knapp), `--fz-mono 12px` (eyebrow/label/meta-workhorse), `--fz-mono-s 11px` (mikro: noter/signal/tiny meta). Samler de 6 spredte størrelsene (10.5–13px → 11/12/13). Eyebrow-tracking var 0.03em title-case (footer .035 rettet) — **senere gjort VERSAL + 0.08em i G** (se under). Uppercase-meta 0.08em. Nav-links → `--fz-mono`, mobilmeny-foot → `--fz-mono-s`. Kun `work-showcase.css` (død kode) står utenfor.
- **Gutter + innholdsbredde (2026-07-05) — én kilde:** `--gutter clamp(24px, 5vw, 150px)` (var maks 80 kun i Prosess → Prosess startet lenger til venstre på skjermer >1600px; nå flukter alle) og `--page-max 2560px` (var 1600 og helt ubrukt). Alle seksjoner: `padding … var(--gutter)` + `width: min(100%, var(--page-max))`. Bekreftet: Prosess-lead 100px = naboer ved pin-start på 2000px. Kun `work-showcase.css` (død) har literaler igjen.
- **Seksjons-rytme (2026-07-05):** `--section-pad-y clamp(128px, 16vh, 216px)` — felles topp/slutt-luft for de vanlige seksjonene (02/03/04/06/07), litt sjenerøs (premium) ende av det gamle spennet (var 104–120 / 14–16vh / 184–212, ulikt hver). vh-delen vokser med skjermhøyden. Broen (helskjerms pin) og 05/Prosess (horisontale paneler) beholder egen struktur. Bekreftet 144px topp uniformt @1440×900.
- **F: skarp-editorial / lamalama-oversatt (2026-07-05):** `--radius 6px` på alle avrundede rektangler + CTA-knapper (hvite piller → rektangler). Beholdt bevisst: nav-pille + runde toggle-knapper (flytende chrome, 999px), prikker (50%), skarpe rammer/brikker (0). Ett fremover-motiv `--arrow-ne` (diagonal ↗) erstatter prikkekjede + chevron overalt (9 pil-spans). Footer-CTA-par lamalama-stil: fylt primær + omriset sekundær, begge 6px + ↗, full-bredde på mobil. Ref: `_design-input/references/lamalama_*`. Kun `work-showcase.css` (død) urørt.
- **Lamalama-kalibrering (2026-07-05):** hentet lamalama.com sine faktiske computed-verdier (Suisse + Sometype-mono; mono-labels 10px/-0.02em/500; knapper 50px/10px/radius 4px/asymmetrisk padding; ↗ 7×8). Tigon-tilpasning (Tigon kjører større + andre fonter): `--radius` 6→**4px**; mono `--fz-mono-l/mono/-s` → **12/11/10** (var 13/12/11); ↗-pil-span 13→**9×10px** + faktisk lamalama-SVG i `--arrow-ne`. **Tracking beholdt positiv** (ikke lamalamas −0.02em — for stramt på Caleb Mono/versaler; bevisst avvik). Knapp-høyde 56px beholdt.
- **Body-nivå tonet ned (2026-07-05):** etter mono/CTA-krympingen ble brødtekst-nivået senket for balanse (tre-trinns kaskade: monumental tittel → rolig body → liten mono). Lead-tokens `--fz-lead / -l / -m / -s` → maks 18 / 23 / 19 / 16px (var 20/27/20/17). Beskrivelser: 02 →maks 22 (var 30), 03-text →20 (var 26), 03-kicker →22 (var 30), 07-lead →22 (var 28), 02-intro-primær 25→20. **Titler/display urørt** (service-titler 58, BYGGER 170, hero 360) — den monumentale identiteten beholdes bevisst.
- **G: Nummerering (2026-07-05):** dekorative kapittel-tall («01/02/03… /» på seksjoner) FJERNET — eyebrows nå rene navn i VERSALER (Tilnærming, Tjenester, Effekt, Arbeid, Prosess, System, Kontakt, Overlevering) via `text-transform:uppercase` + tracking 0.08em (matcher øvrige versal-mono). BEHOLDT der tallet betyr en ekte sekvens: 03-trakten `01–04` (Funnet→Målt) + Prosess-stegene `01–04` (kjempe-numeraler). Prinsipp: **tall kun ved reell sekvens** — unngår AI-tell (dekorativ seksjons-nummerering). Bridge-label → «Overlevering», Prosess-labels → «Prosess / Scope|Arkitektur|Bygg|Live».
