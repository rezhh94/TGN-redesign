# Kladd — Tjenester «BYGGER» med ASCII-tegn-blob

Lagret som kladd før tilbakestilling til siste commit (`f256c77`).
Dette var 02/Tjenester bygget i lamalama-stil med en roterende, kategori-reaktiv
ASCII-tegn-blob (pine), tre tjeneste-kolonner (Bygg/System/Synlighet) og
mobil-forsterkning.

## Filer (lagret som `.txt` så verktøy ikke plukker dem opp)

- `WhatWeBuild.tsx.txt` — seksjonskomponenten
- `what-we-build.css.txt` — stilene
- `CharBlob.tsx.txt` — klient-komponent for tegn-bloben (Canvas 2D, pagespeed-trygg)
- `DitherField.tsx.txt` — generativ/foto Bayer-dither (brukt i en tidligere variant)

## Slik gjenoppretter du

Kopier tilbake med riktige navn:

    cp drafts/tjenester-blob/WhatWeBuild.tsx.txt  src/components/WhatWeBuild.tsx
    cp drafts/tjenester-blob/what-we-build.css.txt src/styles/what-we-build.css
    cp drafts/tjenester-blob/CharBlob.tsx.txt      src/components/CharBlob.tsx
    cp drafts/tjenester-blob/DitherField.tsx.txt   src/components/DitherField.tsx

(DitherField er valgfri — den nyeste varianten brukte kun CharBlob.)
