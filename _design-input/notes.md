# Fable design review brief

Status: arbeidsnotater, ikke en låst designkontrakt. Referansene er innspill til selvstendige Tigon-beslutninger og kan utfordres, kombineres eller erstattes.

## Beslutningsoppdatering 2026-07-09

Aktiv fasit ligger i `docs/current-homepage-state.md`.

Dette ble prøvd og forkastet:
- sticky Tjenester der bilder var synlige, men tjenestene ikke ble pålitelig lesbare i scroll
- pinned Overlevering/ignite som enda et langt scrolløyeblikk
- `Selected systems` som pinned/orbital Arbeid-scene
- for raske og sensitive bildeinnflyginger i Arbeid
- MWG 031-inspirerte pinned/receding Prosess-kort
- scrollstyrt Prosess-stage med raske tilstandsskifter
- flere like pinned-scroll-seksjoner etter hverandre

Dette er aktiv retning:
- Tjenester: tidligere, lesbar accordion
- Tilnærming: beholdt
- Overlevering: ikke-pinnet lagdelt handoff
- Arbeid: normal-flow capability-indeks med tydelig leveranse per demonstrasjon
- Prosess: tre-faset `TGN / Systemflyt`
- Manifest og Kontakt: rolige avslutninger

## Referanseoppdatering 2026-07-10

- Lessestudio og Salo er fjernet fra det aktive referansesettet.
- Jack & AI, Nudot, Nothin' og Trionn er lagt til med nye journey-skjermbilder fra live desktop-gjennomgang.
- Samlet observasjon, asset-kart, GSAP-vurdering og anbefalt vei videre ligger i `_design-input/reference-motion-audit-2026-07-10.md`.
- Aktiv gjennomføringsrekkefølge og godkjenningsporter ligger i `_design-input/homepage-finalization-plan-2026-07-10.md`.
- Tjenester er en prioritert offer-, SEO- og internlenkeseksjon. Innhold og verifiserte service-URL-er skal låses før layout eller motion utforskes videre.
- Verifisert servicekart og bevaringsdekning ligger i `_design-input/services-truth-table-2026-07-10.md`; det er fasit før neste link-/registerpatch.
- Aktive runder er nå design-only. Full SEO-/URL-/schema-/indexability-kontroll er utsatt, men obligatorisk før go-live via `docs/pre-live-seo-gate.md`.
- Statisk Tjenester-fase er gjennomført. Work-motion bygges med de seks eksisterende mockupene nå; et senere assetbytte skal ikke blokkere design- eller motionfasen.
- Referansene brukes som motion- og komposisjonsarkitektur. Ingen ekstern kode, CSS, font eller asset skal kopieres inn i Tigon.

## Målet
Gjør Tigon-forsiden mer premium, mer regissert og mer Awwwards-inspirert uten å gjøre den rotete eller overanimert.

## Dagens problem
Siden har en sterk retning, men seksjonene føles fortsatt litt for like. Vi trenger bedre break-ups, mer visuell reise og tydeligere forskjell mellom seksjonene.

## Dette fungerer
- Hero er sterk
- Stor typografi fungerer
- BYGGER skal beholdes stort
- Effekt-seksjonen har sterk typografisk retning
- Kontakt/Footer fungerer som closing

## Dette mangler
- Tydeligere break-ups mellom kapitlene
- Mer variasjon mellom seksjonene
- En tydelig capability showcase i 04 / Arbeid: hva Tigon kan skape, ikke en oversikt over hva Tigon har laget
- Bedre motion-plan
- Tydelig hoved-showpiece
- Bedre scroll-reise fra Hero til Kontakt

## Må ikke gjøres
- Ikke gjør BYGGER mindre
- Ikke gjør Prosess-title mindre
- Ikke gjør siden mer SaaS
- Ikke lag card grid
- Ikke lag portfolio grid
- Ikke bruk orange
- Ikke legg inn random AI-bilder
- Ikke foreslå eller generer demo-/placeholder-bilder; mockups og bilder kommer fra brukeren senere
- Ikke gjør 04 / Arbeid til en liste over tidligere kundeprosjekter, bransjer eller nettsider
- Ikke bruk Arbeid til å bevise relevans gjennom at Tigon har laget noe lignende før
- Ikke legg til nye hovedseksjoner
- Ikke rør SEO, metadata, schema, sitemap, robots eller canonical

## Hva Fable skal levere
- Brutal design review
- Hvor siden føles for lik
- Hvilke break-ups som trengs
- Hvilken seksjon bør være hoved-showpiece
- Hvilken seksjon bør være rolig
- Motion/GSAP-plan per seksjon
- Hva Codex skal implementere først

# Referanse-notater for Fable

Dette er ikke sider vi skal kopiere eller følge som fasit. Dette er referanser for følelse, pacing, seksjonsvariasjon, break-ups, typografi, motion og visuell reise.

Ingen enkelt referanse definerer Tigon. Nye referanser kan brukes når de løser et konkret problem bedre, og eksisterende referanser kan forkastes når de ikke lenger hjelper.

Målet er å gjøre Tigon mer premium, mer regissert og mer Awwwards-inspirert uten å bli overanimert, SaaS-aktig eller rotete.

## Hva jeg egentlig liker på tvers av referansene

- Sider som føles som en reise, ikke bare seksjoner stablet oppå hverandre.
- Store typografiske øyeblikk mot små labels.
- Seksjoner som har forskjellig rolle: noen er impact, noen er pust, noen er proof, noen er process, noen er closing.
- Mørk/lys eller tung/lett rytme mellom seksjoner.
- Editorial layout, ikke typisk byrå-template.
- Interaksjoner som gir mening: service rows, hover states, scroll reveals, pinned/stacking moments.
- Pinned/stacking moments brukes bare når lesbarheten faktisk blir bedre; de er ikke et mål i seg selv.
- Tech/dev-følelse uten å bli dashboard-klisjé.
- ASCII/mono-detaljer brukt som presisjon, ikke pynt.
- Motion som leder brukeren videre, ikke bare fade-in på alt.

## Fast innholdsprinsipp for 04 / Arbeid

- Seksjonen skal vise **hva Tigon kan lage**, ikke ramse opp **hva Tigon har laget**.
- Den skal være en capability showcase / visuell demonstrasjon, ikke en portefølje, caseoversikt eller kundeliste.
- Relevansen skal komme fra kvaliteten, bredden og anvendeligheten i det Tigon viser at studioet kan skape — ikke fra bransjematching mot tidligere kunder.
- Mockups og bilder kommer fra brukeren i et senere asset-pass. Ikke start bildekonsepter, generering, sourcing eller placeholder-retning uten en ny eksplisitt bestilling.
- Seksjonen kan fortsatt være sidens visuelle showpiece, men den skal ikke fremstille konseptflater som tidligere leverte kundeprosjekter.

## Må ikke kopieres

- Ikke kopier eksakt layout.
- Ikke gjør Tigon til Framer-template.
- Ikke gjør siden SaaS.
- Ikke lag card grid.
- Ikke lag portfolio grid.
- Ikke bruk orange.
- Ikke legg inn random AI-bilder.
- Ikke overanimer.
- Ikke gjør BYGGER mindre.
- Ikke gjør Prosess-title mindre.

# Referanser

## Referanse-lenker

Dette er ikke sider vi skal kopiere. Bruk dem for å forstå pacing, break-ups, layout, typografi, motion og seksjonsvariasjon.

- https://lamalama.com/
  Rolle: primær referanse for pacing, asymmetri og kompositorisk mot — ikke visuell fasit.
  Liker: seksjonsoppsett, custom følelse, cursor/interaksjoner, variasjon mellom seksjoner, sterke break-ups og en tydelig regissert scroll-reise.

- https://jackandai.com/
  Rolle: kontrollert scroll-regi, typografisk lagdeling og canvas/pixel-behandling.
  Liker: harde sceneskifter, motsattgående typografispor og at asset-behandlingen er del av identiteten.

- https://nudot.com.tw/
  Rolle: romlig work-presentasjon og mørk teknisk scenografi.
  Liker: stabil work-heading, sticky gallerier, grå lysrom og prosjektassets som beveger seg gjennom scenen.

- https://www.noth.in/
  Rolle: asset-led art direction og taktil mørk/lys rytme.
  Liker: svart/hvitt UI der fargen kommer fra spesialproduserte objekter, film og work-assets.

- https://trionn.com/
  Rolle: mørk/lys kapittelrytme, 3D/sekvens-bevegelse og tydelig technical craft.
  Liker: røykfylt mørk scene, harde lyse break-ups og motion bygget rundt egne bilde- og videosekvenser.

- https://www.grilledpixels.com/
  Rolle: typografi / premium setup.
  Liker: fontbruk, tung typografisk identitet, visuelt sterk retning.

- https://www.ethansuero.com/
  Rolle: seksjonsvariasjon / break-ups.
  Liker: forskjellige seksjoner, personlig/custom følelse, ikke flat template.

## Lama Lama

Filer:
- lamalama_hero
- lamalama_intro
- lamalama_about
- lamalama_service
- lamalama_work

Hva jeg liker:
- Dette er den viktigste referansen for pacing og kompositorisk mot akkurat nå, men ikke en oppskrift for Tigon.
- Siden føles som en regissert reise, ikke seksjoner stablet oppå hverandre.
- Liker de tydelige break-upsene og at seksjonene har forskjellig visuell rolle.
- Liker kombinasjonen av stor typografi, redaksjonell komposisjon og interaksjon.
- Liker at uttrykket føles custom og energisk uten å bli et vanlig byrå-template.
- Liker hvordan cursor, hover og scroll brukes til å understøtte innholdet.

Hva Tigon bør lære:
- Tydeligere variasjon mellom seksjonenes layout, tempo og visuelle vekt.
- Mer regisserte overganger mellom kapitlene.
- Færre og tydeligere interaksjoner når det gir reisen bedre fokus.
- Mer selvsikker art direction uten å miste lesbarhet eller Tigon-identiteten.

Hva vi ikke skal kopiere:
- Ikke kopiere layout, tekstur, cursor eller motion direkte.
- Ikke gjøre Tigon mer lekent eller kaotisk enn merkevaren tåler.
- Ikke miste den mørke, brutale og presise Tigon-identiteten.

## Jack & AI

Fil:
- `jackandai_journey-2026-07-10.jpg`

Hva jeg liker:
- Heroen er ett tydelig visuelt system: pixelert bilde, brutal rød typografi og svært lite konkurrerende UI.
- Scrollen skifter mellom svarte og lyse scener med tydelig forskjellig tetthet.
- Motsattgående tekst, glitch og canvas brukes som en del av merkevaren, ikke som separate effekter.
- Work-/brand-assets får egne komposisjoner i stedet for å ligge i et standard grid.

Hva Tigon bør lære:
- Ett koordinert motion-system per kapittel er sterkere enn mange små reveals.
- Typografiske bakgrunnsspor kan forsterke en overgang når lesbar tekst forblir stabil i forgrunnen.
- Ikke kopier global fixed-scroller, rødfargen eller glitch som generell stil.

## Nudot

Fil:
- `nudot_journey-2026-07-10.jpg`

Hva jeg liker:
- Samme work-heading holdes som et rolig anker mens ulike prosjektassets overtar scenen.
- Mørke flater får rom gjennom grå lysfelt, tåke og dybde i stedet for flere UI-komponenter.
- Telefoner, nettsideflater, video og WebGL behandles som romlige objekter.
- Prosjektpresentasjonen varierer skala og plassering uten å miste retning.

Hva Tigon bør lære:
- Arbeid kan få én stabil typografisk ryggrad og en koordinert asset-koreografi.
- Pine, off-white og ekte work-assets er nok farge; UI-et trenger ikke en ny signalfarge.
- Ikke kopier WebGL, sticky galleri eller cursor-effekter uten en konkret innholdsrolle.

## Nothin'

Fil:
- `nothin_journey-2026-07-10.jpg`

Hva jeg liker:
- Nesten hele UI-systemet er svart/hvitt; spesialproduserte objekter og film får eie fargen.
- Store tomrom gjør at små objekter oppleves viktige.
- Work, studio og manifesto har forskjellig visuell rolle og tempo.
- Taktilitet kommer fra materialer, video og parallax — ikke glasskort eller dekorativt UI.

Hva Tigon bør lære:
- Arbeid-assets kan være sidens fargeøyeblikk mens resten av systemet forblir near-monokromt.
- Ett sterkt asset-språk er mer verdifullt enn flere generiske scroll-effekter.
- Ikke kopier de lekne 3D-objektene eller filmtyngden uten en egen Tigon-idé.

## Trionn

Fil:
- `trionn_journey-2026-07-10.jpg`

Hva jeg liker:
- Tydelig mørk/lys kapittelrytme gjør at work, services og closing får forskjellige roller.
- En 3D-stein og lange frame-sekvenser fungerer som gjennomgående motiv, ikke tilfeldig pynt.
- Store typografiske statements kombineres med små mono-signaler og tekniske detaljer.
- Prosjektbilder, video og awards-proof er egne assetfamilier med tydelig funksjon.

Hva Tigon bør lære:
- En signaturmekanikk må kobles til ett gjennomgående motiv eller én innholdsidé.
- Hard tonal overgang kan gi mer wow enn enda en pinned sekvens.
- Ikke legg inn 3D bare for prestisje; Tigon trenger først et eget assetmotiv som fortjener bevegelsen.

# Viktigste oppgave for Fable

Ikke foreslå pynt uten en tydelig rolle, men behold rom for uventede og kreative grep når de styrker ideen.

Finn ut:
1. Hvor Tigon-siden fortsatt føles for lik mellom seksjoner.
2. Hvilke 3 break-ups som vil gi mest effekt.
3. Hvilken seksjon som bør bli hoved-showpiece.
4. Hva som bør være static art-direction først.
5. Hva som bør være GSAP/motion etterpå.
6. Hva som må vente til assets.
7. Hva vi aldri må gjøre fordi det ødelegger Tigon-identiteten.
