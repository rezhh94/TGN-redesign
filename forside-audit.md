# Tigon Studio — Forside-audit

> Gjennomgang av hele forsiden: tittelhierarki, midtstilling, fargepalett, bakgrunn seksjon for seksjon, og spacing. Alt lest direkte fra koden (`src/components` + `src/styles`). Ingen filer er endret — dette er ren audit. Anbefalinger er markert; åpne merkevare-valg står som spørsmål til slutt.

**Kontekst for gjennomgang:** Tigon skal føles som et premium digitalt studio — redaksjonelt, tilbakeholdent, typografisk, nær-monokromt, romslig, custom (ikke SaaS/dashboard/SEO-portal/AI-slop). Hardt krav i doktrinen: **ingen synlig oransje**, ikke kort-grid/SaaS-uttrykk. Fonter: TGS Perfect (condensed display), JUST Sans (brødtekst), Caleb Mono (etiketter/data). Grunnfarge er varm off-white `#f6f5f1`.

---

## 00 · Kort oppsummert

1. **Tittelstørrelser:** Det finnes en bevisst «typografisk stige», men den har tre display-nivåer som ligger for tett (170 / 120 / 96 px → virker som drift), og **03 / Effekt mangler en ekte tittel** — den åpner rett på en 27 px tynn kicker. Det er trolig den egentlige grunnen til at 02→03 «føles mindre» enn 01.
2. **Midtstilling:** Behold venstrejustering som ryggrad. Det finnes allerede to sentrerte «pusterom» (03 og 06). Å sentrere broen 02→03 er lurt; å sentrere intro/01 svekker koblingen til Hero-wordmarken.
3. **Farge:** «Det svarte» kommer av at **seks seksjoner på rad er mørke** før første lyse rom — ikke av paletten. Løsning: en varm nøytral-stige + **én** nær-nøytral premium-aksent (anbefalt: dempet furugrønn).
4. **Bakgrunn:** Gjør **02 / Tjenester** og **04 / Arbeid** om til lyse rom. Da veksler hele reisen mørk↔lys i stedet for én lang svart tunnel.
5. **Spacing:** Den vertikale luften er rikelig (140–260 px). Problemet er ikke mengde luft, men at nabo-seksjoner har nesten identisk mørk farge, så pausene ikke registreres som «rom».

---

## 01 · Seksjonskart (slik forsiden ligger nå)

Rekkefølge fra `src/app/page.tsx`. Tittelstørrelser er clamp-maks (desktop), i piksler.

| # | Seksjon | Bakgrunn | Tittel | Font · maks | Justering |
|---|---------|----------|--------|-------------|-----------|
| Hero | Tigon Studio | Mørk gradient `#141511→#12120f→#070807` | TIGON STUDIO | Display · **360** | Venstre |
| 01 | Tilnærming | Mørk gradient `~#12120f` | UKLART blir byggbart | Display · **170** | Venstre |
| 02 | Tjenester | Mørk `#10110e→#151611→#0c0d0b`; kort veksler lys `#e9e8e4` / mørk `#191a15` | BYGGER | Display · **170** | Venstre |
| 02→03 | Overlevering *(bro)* | Nær-svart `#0b0c0b` | Ferdig bygget er ikke ferdig. | Sans · **96** | Venstre |
| 03 | Effekt | Mørkest på siden `#060706` | *ingen display-tittel* | Sans · **27** (kicker) | Sentrert |
| 04 | Arbeid | Mørk `#0d0e0c` | Visuelt sterkt. Teknisk riktig. | Display · **120** | Venstre |
| 05 | Prosess | Vekslende `#e9e8e4 / #12120f / #e2e1dc / #060706` | Uklart inn. System ut. | Display · **96** | Venstre |
| 06 | System | **Lyst rom** `#f6f5f1` | Design kan lånes. | Sans · **118** | Sentrert |
| 07 | Kontakt | Mørk gradient `#070807→#11120e→#050605` | SEND OSS NOE UKLART. | Display · **308** | Venstre |

Footer-wordmark «TIGON STUDIO» nederst i 07: Display · **480 px**.

---

## 02 · Tittelstørrelser & hierarki (Spørsmål 1)

Du så riktig: **01 / Tilnærming (170 px)** er større enn **02→03 / Overlevering (96 px)**. Det er ikke en feil — de har ulik *rolle*. Men det er tre reelle problemer.

### Full type-stige (desktop maks)

| Rolle | Seksjon | Tekst | Font | Størrelse |
|-------|---------|-------|------|-----------|
| Wordmark | Hero | TIGON STUDIO | Display 900 | 360 px |
| Wordmark | 07 Kontakt | SEND OSS | Display 800 | 308 px |
| Kapittel | 01 · 02 | UKLART / BYGGER | Display 700 | 170 px |
| Kapittel | 04 Arbeid | VISUELT STERKT | Display 700 | 120 px |
| Manifest | 06 System | Design kan lånes | Sans 400 | 118 px |
| Kapittel | 05 Prosess | UKLART INN | Display 700 | 96 px |
| Bro | 02→03 | Ferdig bygget… | Sans 500 | 96 px |
| Kicker | 03 Effekt | Alt vi bygger… | Sans 300 | 27 px |

### Hva som er bevisst — og bør beholdes
- **01 vs. 02→03 er riktig avstand.** 01 er et *kapittel* i display-fonten (TGS Perfect). 02→03 er en *bro* — en løpende setning i JUST Sans som skal føles lettere. At broen er mindre er hele poenget.
- **01 og 02 deler samme tier (170).** Det binder «UKLART blir byggbart» til «BYGGER» — en villet rim.

### Tre ting som svekker konsistensen
- **Funn A — display-nivåene ligger for tett.** 170 → 120 → 96 er tre kapittel-størrelser som er nære nok til å virke som drift, ikke system. *Anbefaling:* lås **tre rene tier** — Kapittel-stor **160** (01, 02), Kapittel-mid **112** (04, 05), og hold broene på ett sans-nivå **~90**. Da leser hoppene som hierarki.
- **Funn B — 03 / Effekt mangler en tittel.** 03 går fra 12 px etikett rett til en **27 px tynn (weight 300) kicker**. Etter to 170-kapitler og en 96 px bro kollapser skalaen brått. Dette er trolig det du egentlig merker som «inkonsistens». *Anbefaling:* gi 03 enten en ekte display-tittel (samme tier som 04) **eller** løft kickeren til en sans-statement (~90 px, som manifestet), så hvert nummerert kapittel har ett tydelig anker.
- **Funn C — «under-titler» og beskrivelser har ingen felles skala.** Ledetekstene varierer fra 17 til 28 px med opasitet fra .56 til .84, og bruker ikke `--fz-lead`-tokenet konsekvent (én seksjon åpner på 25 px, en annen på 20, en tredje på 27). *Anbefaling:* én **lead-skala i tre trinn** — Lead-L 27 · Lead-M 20 · Lead-S 17, med faste opasiteter (.80 primær / .58 sekundær). Mono-etikettene (12 px) er allerede konsistente.

**Konkrete verdier per seksjon (ledetekst/beskrivelse):**
- 01 support: 21 px sans, opasitet .68
- 02 intro primær 25 px .84 / sekundær 17 px .56
- 02→03 support: 20 px .62
- 03 kicker 27 px weight 300 .60; brødtekst 20 px+ weight 500 .92; signal mono 11.5 px
- 04 lead: ~20 px .72
- 05 brødtekst: 27 px .74
- 06 support: 20 px
- 07 lead: 28 px .68

---

## 03 · Midtstilling — intro & 02→03 (Spørsmål 2)

Spørsmålet: hva gir mest premium, innlevelse og «reise»? Svaret er **rytme**, ikke sentrering i seg selv. Premium-følelsen kommer av at venstrestilte kapitler veksler med noen få sentrerte «pust» — ikke av at alt sentreres.

- **Intro / 01 — behold venstre.** Den venstre ryggraden rimer med Hero-wordmarken, og bokstav-monteringen («UKLART»→«byggbart») leser tydeligere venstre-forankret. Sentrering her ville bryte koblingen til toppen.
- **Broen 02→03 — sentrer den.** En kort, sentrert setning midt i flyten leser som et innpust mellom den pinnede kortstabelen og 03. Dette *øker* reise-følelsen. Trygt å gjøre.
- **03 og 06 er allerede sentrert** — behold. De er «stille rom», der sentrering hører hjemme.

**Regel å styre etter:** Sentrering = «hold pusten». Bruk kun på broer og manifest (02→03, 03, 06). Alle kapitler med innhold/kort (01, 02, 04, 05, 07) forblir venstrestilt. Puls: `venstre → venstre → PUST → venstre …`

---

## 04 · Farge — premium uten å bryte monokromt (Spørsmål 3)

Grunnfargen er faktisk en varm off-white (`#f6f5f1`) — «det svarte» kommer fra seks mørke seksjoner på rad, ikke fra paletten. Namma bruker *kjølige* grå (`#e4e4e4` / `#fafafa`); Tigon er *varm*. Behold det varme, men bygg en tydelig nøytral-stige og legg til nøyaktig **én** aksent.

### 1 · Varm nøytral-stige (samme skala som svart/hvit/grå)

| Navn | Hex | Bruk |
|------|-----|------|
| Papir | `#faf9f5` | Lyseste flate |
| Off-white *(nå)* | `#f6f5f1` | Eksisterende lyst rom |
| Bone | `#eeece5` | Nytt mellom-lyst rom / kort |
| Stein | `#e4e2da` | Ny tonal blokk (varm variant av Nammas #e4e4e4) |
| Greige | `#cfccc2` | Ny tonal blokk / skiller |
| Blekk | `#12120f` | Mørk grunn |

I dag finnes bare «mørk» og «off-white». Med **Bone → Stein → Greige** får du lyse rom som skiller seg fra hverandre uten å bli hvite — den tonale variasjonen Namma har, men i din varme skala.

### 2 · Én premium-aksent — tre retninger (alle nær-nøytrale)

Alle tre er så avmettede at de leser nesten som nøytraler — det gjør dem premium ved siden av grått/svart. Brukes **kun på mikro-elementer** (statusprikk, aktiv prosess-markør, lenke-understrek ved hover, rull-nummer), **aldri** som flate bak innhold. Ingen er oransje — `--color-signal #c44414` ligger i tokens, men er bannlyst; en av disse overtar den rollen.

| | Retning | Hex · tint | Vurdering |
|---|---------|-----------|-----------|
| **A** | **Furugrønn** *(anbefalt)* | `#33453b` · `#dbe2dc` | Dyp dempet skog-/racing-grønn. Nærmest kull i mørke rom, rolig redaksjonell «penger»-tone. Lengst fra oransje; matcher varm grå best. |
| B | Bronse / patina | `#7a6a4f` · `#e8e1d2` | Varm metallisk, smelter inn i varm nøytral-stige, føles luksuriøs. Risiko: nær «gull/oransje» hvis for mettet. |
| C | Skifer-blå / blekk | `#38414d` · `#dbe0e6` | Kjølig, teknisk-premium — nærmest Nammas verden. Trekker litt mot «tech/SaaS», som doktrinen vil unngå. |

*Aksentretningen er en merkevare-beslutning — den bør bekreftes før resten av fargearbeidet gjøres.*

---

## 05 · Bakgrunn — seksjon for seksjon (Spørsmål 4)

I dag er Hero t.o.m. 04 **seks mørke seksjoner på rad** før 05 gir første lyse pust. Det er kilden til «for mye svart». Forslaget veksler mørk↔lys så hver seksjon leser som et eget rom.

### Rytme: nå vs. forslag

| # | Seksjon | Nå | Forslag |
|---|---------|-----|---------|
| Hero | Tigon Studio | mørk | mørk · behold |
| 01 | Tilnærming | mørk | mørk · behold |
| 02 | Tjenester | mørk | **→ LYS (Bone `#eeece5`)** |
| 02→03 | Overlevering | mørk | mørk · tunnel (nå også sentrert) |
| 03 | Effekt | mørkest `#060706` | mørk · **løft til `#0d0e0c`** |
| 04 | Arbeid | mørk | **→ LYS (Stein `#e4e2da`)** |
| 05 | Prosess | veksler | veksler · behold |
| 06 | System | lys | lys · behold |
| 07 | Kontakt | mørk | mørk · behold |

Resultat: `mørk → mørk → LYS → mørk → mørk → LYS → veksler → lys → mørk` — ingen lang svart rekke.

### Begrunnelse + hva innholdet skal ha

| Seksjon | Bakgrunn | Hvorfor | Innhold / kort på flaten |
|---------|----------|---------|--------------------------|
| **Hero** | Mørk · behold | Wordmarken trenger den svarte scenen. Natt-åpning. | Lys tekst; CTA-pille lys på mørk. |
| **01 Tilnærming** | Mørk · behold | Bokstav-monteringen leser på svart; fortsetter natten fra Hero. | Display lys, andrelinje dempet. |
| **02 Tjenester** | **→ Lys (Bone)** | Største enkeltgrep mot «for svart». Lyst katalog-rom = tjenestene føles som et redaksjonelt spec-ark. Bryter mørk rekke tidlig. | Kort blir **mørke på lyst** (`#17180f`) — inverterer dagens veksling; «BYGGER» i blekk. |
| **02→03 bro** | Mørk · behold | Broer er «tunneler» mellom rom — korte og mørke er riktig. Nå også sentrert. | Kun sentrert setning; ingen kort. |
| **03 Effekt** | Mørk, **løft til `#0d0e0c`** | Emosjonell topp («funnet, forstått, valgt, målt»). Kontrast mot lyse 02/04. Dagens `#060706` er unødig tungt. | Gi den en ekte tittel (Funn B). Tekst lys. |
| **04 Arbeid** | **→ Lys (Stein)** | Arbeidsvisning er et galleri — gallerier er lyse. Mockup-ene «popper» som på utstillingsvegg. | Kort/mockups beholder egne farger; lett ramme/skygge; tittel i blekk. |
| **05 Prosess** | Veksler · behold | Har allerede stein→koks→stein→nær-svart. Fungerer — ikke rør. | Paneltekst følger panelets tone (allerede løst). |
| **06 System** | Lys · behold | Manifestets pust — roligste rommet. | Sentrert statement; hjørnemerker mono. |
| **07 Kontakt** | Mørk · behold | Natt-avslutning; store SEND OSS-wordmarken bokender Hero. | Lys tekst; primær CTA lys pille. |

*Å flippe 02 og 04 til lyse rom er retningsendringer (krever at kortene i 02 reinverteres).*

---

## 06 · Spacing, luft & layout (Spørsmål 5)

Målt fra CSS: den vertikale luften er **rikelig** — ingen seksjon er klemt. «Lite pust» handler ikke om avstand, men om at pausene ikke *synes* når nabo-flatene er nesten samme svarte.

| Seksjon | Topp-padding (maks) | Bunn-padding (maks) | Merknad |
|---------|--------------------|--------------------|---------|
| 01 Tilnærming | 100vh + … | 180 px | Statement pinnes i full høyde. |
| 02 Tjenester | 186 px | 96 px | «Flere tjenester»-fot har egen ~100vh topp-luft. |
| 02→03 bro | 260 px | 260 px | Symmetrisk, godt pust ✓ |
| 03 Effekt | 190 px | 210 px | Rikelig. |
| 04 Arbeid | 170 px | 120 px | Karusell egen bunn-luft. |
| 06 System | 200 px | 200 px | min-height 100vh. |
| 07 Kontakt | 190 px | 0 | Wordmark cropes i bunn. |

- **Sømmene er usynlige.** Nabo-seksjoner har hexer som `#12120f`, `#0c0d0b`, `#0b0c0b`, `#060706` — nesten ikke til å skille. To seksjoners padding (~350 px) leser derfor som ett langt svart felt, ikke to rom. **Tonal veksling (Spørsmål 4) løser dette uten å legge til én piksel luft.**
- **Ett reelt spacing-avvik:** bunn-luften varierer mye (96 vs 180 vs 260). Broen 02→03 (260/260) føles romsligere enn 02 (96 bunn). For jevnere puls: sikt mot ~120–160 px bunn på innholdsseksjoner, reserver 240+ for broer.
- **Layout er ellers sunt:** felles `--gutter`, maks 2560 px innhold, konsistente grid-kolonner i footer/tjenester. Ingen strukturendring nødvendig.

---

## 07 · Åpne valg (merkevare-beslutninger)

1. **Aksentfarge:** A furugrønn (anbefalt) · B bronse · C skifer-blå — eller rent monokromt?
2. **Lyse rom:** Flippe 02 og 04 til lyse rom (bryter svart rekke), eller beholde alt mørkt og bare justere tonene?
3. **Tittel-stige:** Låse 3 rene display-tier + gi 03 en ekte tittel, eller se et forslag først?

---

*Kilde: `src/components/*.tsx` + `src/styles/*.css` på branch `experiment/fable5-homepage-review`. Ingen filer endret.*
