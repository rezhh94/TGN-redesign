# 06 / Process Layers / Prosess

## Section name

06 / Process Layers / Prosess

Visible label:
05 / Prosess

Internal order:
This is the next visible page block after 04 / Arbeid. The visible section numbering on the page is 05 / Prosess.

## Role in page journey

After visual proof / Arbeid, this section explains how it is to work with Tigon.

It should reduce buyer risk while acting as a controlled scroll-motion signature based on MWG 031.

## One idea

Tigon jobber gjennom fire kontrollerte steg fra uklart behov til lansert, målbart system.

## Focal point

The user should notice a split-screen process system: fixed intro copy on the left, and receding process cards on the right.

Each right-side card pins for one scroll beat, then recedes backward in 3D before the next card takes over.

## Tone

Premium, restrained, editorial and studio-operational.

All four cards use the same dark color as the rest of the section. Text is off-white. No orange.

## Layout archetype

MWG 031-inspired vertical pinned card sequence in a split-screen layout.

Static structure:
- sticky dark intro column on the left
- four right-side process cards
- `slide -> content-wrapper -> content` structure adapted to React
- one process step per slide
- large JUSTSans title
- small CalebMono `05` marker beside the visual surface
- right-side production surface replacing MWG image assets
- CalebMono labels and output metadata
- no imported MWG CSS, JS, fonts or media files

## Why this layout is different from the previous section

Arbeid is a split proof/material composition.

Prosess becomes a vertical editorial sequence:
- dark right-side cards instead of a separate light-card surface
- pinned card handoff instead of static list
- process copy instead of proof standards
- a deliberate tonal break from the preceding dark sections

## Content

Visible label:
05 / Prosess

01 / Avklaring
Behovet presses ned til scope.
Før noe tegnes, avklarer vi hva som faktisk skal bygges, hvorfor det trengs og hva som må velges bort.
Output: Definert retning.

02 / Struktur
Innholdet får en teknisk rekkefølge.
Sider, flyt, internlenker, søkbarhet og målepunkter legges som system før uttrykket låses.
Output: Søkbar arkitektur.

03 / Produksjon
Design og kode bygges som ett materiale.
UI, komponenter, ytelse og integrasjoner utvikles sammen, med rask feedback og ryddig prioritering.
Output: Levende løsning.

04 / Lansering
Siden går live med måling fra dag én.
Publisering, teknisk sjekk, skjema, telefon, e-post og hendelser kobles til en tydelig neste beslutning.
Output: Målbar kontaktvei.

## Must include

- A visible label: 05 / Prosess.
- A sticky left intro with `Uklart inn. System ut.` and the process lead.
- Real HTML text.
- Four right-side process cards.
- Same dark card color as the rest of the section.
- MWG 031-style pinned vertical card recession on desktop.
- Large title, small `05` marker and visual surface per card.
- Layout that remains readable without JavaScript.
- Mobile fallback that stacks cards naturally.
- Clear differentiation from Arbeid, Effekt and Tjenester.

## Must not include

- imported MWG CSS
- imported MWG JS
- imported MWG fonts
- imported MWG media files
- old prototype imports
- imported old styles.css
- imported old signature.css
- imported old main.js
- orange
- fake metrics
- testimonials
- customer logos
- CTA block

## Motion plan

Implemented in this pass because the user explicitly requested matching `mwg_031.zip`.

Desktop:
- each slide is 100vh
- each slide's content-wrapper pins while the card recedes
- card content rotates subtly on Z
- card content scales down
- card content rotates back on X
- card fades after it has moved past the viewport

Mobile/reduced motion:
- no desktop pinning
- cards stack vertically
- reduced motion keeps everything static

## Acceptance criteria

- The section resembles MWG 031's vertical pinned card model, adapted into a two-column screen.
- All four cards use the same dark color as the surrounding section.
- The section is readable without JS.
- Mobile has no broken horizontal overflow.
- The left intro and right card column exit together after the final card.
- The next light section must not appear underneath the final pinned card.
- No orange appears.
- No old CSS/JS or MWG source files are imported.
- Header/Hero, Tjenester and Footer are not changed.

## Files expected to change

For this pass:
- docs/sections/06-process-layers.md
- src/components/ProcessLayers.tsx
- src/styles/process-layers.css
- src/components/motion/HomeMotion.tsx

Do not touch Header, Hero, 01, 02 / Tjenester, 06 / Kontakt/Footer/NAP/lenker, H1, metadata, schema, sitemap, robots, canonical, URL-er or slugs.

## Validation

- npm run build
- npx tsc --noEmit
- git diff --check

Report:
- files changed
- what section was touched
- whether Header/Hero changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
