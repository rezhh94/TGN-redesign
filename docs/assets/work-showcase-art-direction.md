# 04 / Arbeid — Art direction for ekte visuals

> Asset reference only. The active composition is the `WorkProof` capability index documented in `docs/sections/05-work-showcase.md`; any future asset replacement must fit that structure and retain truthful demonstration labels.

Status: delvis utdatert 2026-07-09; asset-detaljene under skal ikke brukes før brukeren eksplisitt åpner et nytt asset-pass.
Aktivt scope ved et senere asset-pass: `src/components/WorkProof.tsx` / `src/styles/work-proof.css`.
De gamle referansene til `WorkShowcase.tsx` under beholdes bare som historikk og er ikke implementasjonsinstruks.
Brukeren arbeider med å skaffe mockups og bilder. Ikke generer, foreslå eller source demo-/placeholder-bilder med grunnlag i dette dokumentet. Ved neste asset-pass skal brukerens faktiske materiale og den aktive capability-regelen vurderes før resten av dokumentet eventuelt revideres eller brukes.

04 / Arbeid skal vise hva Tigon kan lage. Den skal ikke ramse opp tidligere prosjekter, kunder, bransjer eller nettsider, og konseptflater skal ikke presenteres som levert kundearbeid.

Referanser:
- docs/sections/05-work-showcase.md (seksjonskontrakt)
- docs/motion-and-assets-roadmap.md (motion- og asset-plan)
- docs/tigon-design-operating-system.md (designdoktrine)

## Tidligere asset-hypotese — ikke aktiv før nytt asset-pass

Ett Tigon-bygget capability-eksempel, presentert som et objekt i et mørkt studio:

- **Hovedvisualet viser flaten** (scenen, retningen).
- **Detaljen viser presisjonen** (makro, håndverket).
- **Samme capability-eksempel i begge.** Det gjør seksjonen sammenhengende uten
  å gjøre den til en portefølje eller påstå at flaten er tidligere kundearbeid.

Det konkrete skjerminnholdet og den tonale behandlingen avgjøres først når brukerens mockups og bilder er klare. Ikke velg et reelt kundeprosjekt eller konstruer en demo som midlertidig løsning.

## 1. Hovedmockup-type (Envato)

En stor desktop-skjerm i mørk studioscene:

- iMac / Studio Display / frameless monitor
- rett forfra eller maks 5–10° vinkel
- mørk bakgrunn: grafitt, mørk betong eller mørkt tekstil
- mykt retningsbestemt lys
- skjermen skal fylle rammen (slotens format er liggende, ~3:2) — scene,
  ikke produktfoto med luft rundt

Krav til kjøp:

- PSD med **smart objects**
- **separert bakgrunnslag** eller «scene creator» (UI, bakgrunn og lys må kunne
  styres uavhengig)
- minst 4K

Godt alternativ hvis skjerm-i-scene blir for «kontor»: en ren
browser-/screen-mockup uten device — bare flaten med subtil skygge. Det er mer
editorial og nærmere Tigons språk enn hardware.

## 2. Detail/crop-type

**Mobilversjonen av samme prosjekt**, tett croppet:

- telefon liggende/stående på mørk flate
- skjært av croppen (hele telefonen skal ikke synes)
- makro-følelse med grunn dybdeskarphet

Alternativ: ekstrem typografisk makro av samme UI — navigasjon, tall, knapp —
der fonten synes på pixelnivå.

Detaljens jobb er «Teknisk riktig»: presisjon i typografi og spacing.
Main = hva det er. Detail = hvordan det er bygget.

## 3. Envato-søkeord

- `dark scene mockup` / `dark mockup scene creator`
- `imac mockup dark` / `studio display mockup`
- `browser mockup minimal dark` / `website mockup dark`
- `macbook mockup moody` / `device mockup black background`
- `iphone mockup dark shadow` / `iphone mockup closeup`
- `mockup concrete` / `mockup stone dark` (underlag/tekstur)

Filtrer på: PSD, smart object, 4K+, «editable background».

## 4. Mockups som må unngås

- multi-device collager / isometriske «floating devices» — skriker template
- desk flat-lays med rekvisitter (kaffe, planter, notatbøker, hender) —
  generisk byrå
- lyse/hvite studioscener — dreper seksjonens tone, kan ikke graderes ned
  troverdig
- clay mockups i pastell/farge og glossy 3D-renders
- dashboard-templates med baked-in UI som ikke kan byttes — andres design er
  ikke proof
- alt med neon, blå/lilla tech-glow eller oransje/teal-grading
- papir/stationery/branding-mockups — feil medium

## 5. Styling og cropping for Tigon

- **Varm monokrom grading.** Sidens sorte er varme (#0c0d0b–#161712), aldri ren
  #000; høylys trekker mot off-white #f2f1eb. Desaturer alt; ingen kalde
  blåtoner i skygger.
- **Lys fra øvre venstre.** Eksisterende CSS bygger lys på 118–138° — scenens
  hovedlys skal falle samme vei, så bildet føles født i samme rom som resten
  av siden.
- **Subtil grain** (2–4 %) over hele bildet — limer mockupen til den matte
  bakgrunnen og fjerner render-glatthet.
- **Crop asymmetrisk:** la skjermen bleede ut av bildekanten på én side
  (høyre). Komplett sentrert device = produktfoto; croppet = editorial.
- **Ikke bak inn rammer eller skygger mot seksjonsbakgrunnen.** CSS-en gir
  flatene 1px-border, inner-shadows og løftskygge — den innfatningen skal
  fortsette å gjøre jobben. Ellers blir det dobbel ramme.
- **Skjerminnholdet** skal vise Tigons designspråk: stor kondensert
  display-type, mono-labels, tynne linjer. Flaten i bildet skal ligne siden
  brukeren står på.

## 6. Tigon-logoen

- Logoen bor **inne i artefaktet, ikke oppå bildet**: i headeren på UI-en som
  vises på skjermen, som favicon i browser-chrome, eventuelt som liten
  gravert/embosset mark på mørk flate i scenen.
- Aldri som vannmerke eller hjørnelogo på selve bildet — det er reklame, ikke
  proof.
- Én tydelig forekomst i hovedvisualet er nok. Detaljen kan bære logo på
  makronivå (f.eks. app-ikon på telefonen) hvis det skjer naturlig.
- **Ghost-«TIGON»-ordet i hovedflaten fjernes når ekte bilde kommer.** Det var
  placeholder-utsmykning; med ekte UI blir det dobbelt opp, og footeren eier
  nå wordmark-motivet alene (jf. revisjonen i docs/sections/07-contact-footer.md).

## 7. Plassering i dagens layout

Behold dagens komposisjon:

- Hovedvisual forblir forankret oppe til høyre.
- Detaljen fortsetter å **overlappe** hovedflatens nedre høyre hjørne —
  overlappen gjør det til én komponert scene, ikke to bilder på rad.
- Meta-kolonnen står til venstre; captionen leses som bildetekst til
  *detaljen* (behold den relasjonen).
- Innbyrdes hierarki: main er scenen (rolig, mørk), detail er den skarpeste
  kontrasten (makro, mest lys). Øyet skal gå statement → main → detail →
  caption.

Til vurdering (avgjøres før crop, se pkt. 11): la hovedvisualet bleede helt ut
til viewport-kanten på høyre side. Ingen annen seksjon bryter containeren —
det gir Arbeid et eget kompositorisk signaturtrekk uten nye elementer.

## 8. Eksportformater og størrelser

| Asset | Ratio | Størrelse (2x) | Format | Budsjett |
|---|---|---|---|---|
| Main desktop | ~3:2 | ~2200×1470 | AVIF (+WebP-fallback) | < 300 KB |
| Main mobil-crop | 4:5 el. 1:1 | ~1300×1600 | AVIF (+WebP) | < 250 KB |
| Detail | ~4:3 | ~1000×750 | AVIF (+WebP) | < 120 KB |

- AVIF-kvalitet ~60–65.
- **Egen mobil-crop av main er obligatorisk** — på 640px blir sloten nesten
  kvadratisk, og nedskalert liggende scene blir uleselig. Recrop i Photoshop
  (skjermen tettere), ikke bare resize; leveres via `<picture>`/art direction.
- Eksplisitt bredde/høyde ved implementering (CLS), `loading="lazy"`
  (seksjonen er langt under folden), `decoding="async"`.
- Eksporter med ca. **6 % ekstra bleed på alle kanter** — skala- og
  parallax-motion trenger kjøtt utenfor synlig flate for ikke å vise kanter.
- Behold lagvise PSD-mastere utenfor `/public` (egen kildemappe) — UI skal
  kunne byttes når ny logo/nye prosjekter kommer, uten å kjøpe scenen på nytt.

## 9. Motion-avsløring senere

I tråd med docs/motion-and-assets-roadmap.md. Én gang ved scroll inn, ingen pin:

1. Headline line-mask reveal («Visuelt sterkt.» / «Teknisk riktig.» linje for
   linje).
2. Main visual: clip-reveal nedenfra (inset-mask som åpner), med innvendig
   skala 1.05 → 1.0 i samme bevegelse — bildet «settes» på plass.
3. Detail følger med kort lag (150–250 ms etter main), samme clip-språk —
   forsinkelsen skaper dybden.
4. Metadata/caption stagger i mono til slutt.
5. Deretter kun subtil parallax på main (2–4 %, detail litt mer enn main for
   parallakse-dybde) — ingen loops, ingen hover-gimmicks.
6. `prefers-reduced-motion`: alt rett til sluttilstand, maks en ren
   opacity-fade.

Motion implementeres ikke før statisk versjon med ekte assets er godkjent.

## 10. Layoutjusteringer FØR assets settes inn

Behold arketypen — juster tre ting først:

1. **Lås flatene til faste aspect-ratios.** I dag er main/detail definert som
   prosent-høyder av en min-height-container (76 % / 34 % av
   `clamp(520px, 54vw, 900px)`) — ratioen endrer seg med viewport, og et bilde
   ville blitt croppet uforutsigbart. Slotene må få fast ratio (main ~3:2,
   detail ~4:3) som eksportene skjæres mot. Liten teknisk endring; skal skje
   **før** kjøp/crop slik at det skjæres mot kjente formater.
2. **Fjern ghost-ordet og strek-dekoren** i flatene samtidig som bildene
   settes inn (placeholder-innmat, ikke ramme).
3. **Avgjør høyre-bleed** (pkt. 7) før crop — det påvirker hvor mye bleed
   main-eksporten trenger på høyre side.

Seksjonen har med vilje ingen vei til `/arkiv`. Ikke legg inn «Se arkivet»,
«Se case» eller andre CTA-er som gjør capability-showcasen til en oversikt over
tidligere arbeid. Dette skal ikke gjenåpnes gjennom et asset-pass.

## 11. Hard regel: ingen random AI-bilder

Random AI-genererte bilder skal **ikke** brukes som permanent løsning
(jf. seksjonskontrakt og asset-roadmap). Layouten kan reservere nøytrale,
umerkede visualflater frem til brukerens kuraterte mockups er klare, men skal
ikke vise placeholder-tekst eller finne på midlertidige motiver.

## Anbefalt rekkefølge

1. Lås aspect-ratios (liten teknisk justering, eget pass).
2. Kjøp scene + detail på Envato etter søkeordene over.
3. Grader/crop i Photoshop mot formatene i pkt. 8.
4. Eksporter AVIF/WebP med bleed.
5. Statisk innsetting og godkjenning.
6. Først da: motion-passet (pkt. 9).
