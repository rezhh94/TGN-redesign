# Tigon Intro — ScrollTextMotion med Tigon-innhold

## Omfang

Kun `01 / Tilnærming`. Header/Hero, `03 / Effekt`, `04 / Arbeid` og øvrige
seksjoner skal ikke påvirkes.

## Referansekontrakt

Introen bruker bevegelsesarkitekturen fra Codrops-demoen i `01 / Tilnærming`:

- originalens `logo`, `content`, `group` og `el`-struktur;
- korte Tigon-begreper om design, teknologi, synlighet og digitale produkter;
- originalens Typekit-kit `upd0woi`;
- originalens posisjonsklasser `pos-1` til `pos-10`;
- originalens opacity, blur, spacing og sticky/fixed-komposisjon;
- samme GSAP Flip-tilstander, ScrollTrigger-start/slutt, scrub og easing;
- samme ScrambleText-konfigurasjon;
- ingen XL-pikselbokstaver eller abstrakt demo-tekst.

## Stabil Tigon-tekst

Originalens sentrerte `Mens Absens`-logo er erstattet av ett stabilt forgrunnslag:

- tittel: `BYGD SAMMEN`;
- eksisterende Intro-beskrivelse, uendret;
- `TGN / integrated practice`;
- ingen scramble, Flip, fade eller scroll-transformasjon på hovedbudskapet;
- Codrops-elementene beholder original bevegelse og scramble i laget bak;
- ingen ramme, bakgrunnsflate, kortform eller backdrop-blur;
- hvert bakgrunnsord måles mot hovedbudskapets rektangel og fades individuelt
  før kollisjon, slik at atmosfæren fortsetter ubrutt uten en synlig maske;
- en myk tekstskygge gir ekstra lesbarhet uten å endre flaten.

## Atmosfære fra 04 / Arbeid

Introen gjenbruker 04s visuelle atmosfæresystem uten å endre 04:

- samme `/video/work-wave-loop.mp4`;
- samme grayscale, kontrast, lysstyrke og video-opacity;
- samme spotlight-gradienter og vignett;
- egen Intro-namespacing og seksjonsavgrenset avspilling;
- video er av på mobil og ved reduced motion.

Demoens synlige `frame`-linje er fjernet. Hovedbudskapet bruker seksjonens eget
sticky-lag og er synlig fra første Intro-viewport, uten et separat JS-styrt
aktiveringspunkt eller en tom svart venteflate. Bakgrunnsstrømmen starter i den
samme første viewporten med `72vh` topprom, i stedet for demoens fulle `100vh`.

CSS er kun namespacet under `.approach-bridge` for å hindre at demoens globale
regler påvirker resten av Tigon-siden. Introens høyere stacking-lag dekker den
vanlige Tigon-headeren mens demoen er i viewporten, uten å endre Header-koden.

## Tilgjengelighet

- Det komplette Tigon-hovedutsagnet ligger som et server-rendret `h2`.
- Tigon-ordstrømmen er dekorativ for skjermlesere.
- Opprinnelig Tigon-prosatekst er flyttet til det stabile senterlaget, mens
  handoff er bevart etter demo-strømmen.
- Reduced motion beholder alle tekster uten transformasjon.

## Referanse og lisens

Basert på [`codrops/ScrollTextMotion`](https://github.com/codrops/ScrollTextMotion).

MIT License

Copyright (c) 2009 - 2025 [Codrops](https://codrops.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
