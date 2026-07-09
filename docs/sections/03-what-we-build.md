# 02 / Tjenester — aktiv seksjonskontrakt

Last reconciled with the implementation: 2026-07-09.

## Role

Make Tigons services concrete, readable and navigable after Tilnærming.

## Active structure

1. Large `BYGGER` heading and two-line introduction.
2. Three pillars: Bygg, System and Synlighet.
3. Five server-rendered accordion rows: Nettsider, Webapper, Apper, AI-systemer and SEO & AI-søk.
4. Supporting grayscale image pairs inside each service row.
5. Full three-column service register and link to `/tjenester`.

The accordion is progressively enhanced. Without JavaScript or with reduced motion, the service content remains available and readable.

## Motion

- Row and separator reveal.
- Accordion open/close behavior.
- Register decode on entry.
- No pin and no sticky image-led journey.

## Rejected direction

The sticky service prototype is rejected. It allowed the media to dominate while service names and explanations became unreliable to discover during normal scroll.

Do not restore it unless the user explicitly reopens that direction.

## Must preserve

- Real HTML service text and links.
- Large `BYGGER` scale.
- Near-monochrome image treatment.
- Mobile and no-JS readability.
- No card-grid or SaaS treatment.
- No visible orange.

## Active files

- `src/components/WhatWeBuild.tsx`
- `src/styles/what-we-build.css`
- `src/components/motion/HomeMotion.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Desktop and mobile browser review
