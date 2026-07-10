# 02 / Tjenester — aktiv seksjonskontrakt

Last reconciled with the implementation: 2026-07-10.

## Role

Make Tigons services concrete, readable and navigable after Tilnærming.

This is a primary offer, conversion and internal-linking section. Visual exploration is allowed around the information, but service meaning, crawlable text and navigation must remain more important than imagery or motion.

## Active structure

1. Large `BYGGER` heading and two-line introduction.
2. Three pillars: Bygg, System and Synlighet.
3. Five server-rendered accordion rows: Nettsider, Webapper, Apper, AI-systemer and SEO & AI-søk.
4. Supporting grayscale image pairs inside each service row.
5. Full three-column service register and link to `/tjenester`.

The accordion is progressively enhanced. Without JavaScript or with reduced motion, the service content remains available and readable.

## Static design phase 1 — completed 2026-07-10

- The three pillars now read as one numbered progression with a shared rail and small technical signals.
- Desktop accordion rows use the section's 12-column grid: index, service, metadata, thumbnails and toggle have fixed editorial roles.
- Service metadata is plain mono text with separators, not black chips or cards.
- The open row uses one restrained pine edge signal and keeps description plus direct link visually primary.
- The full service register aligns with the masthead content axis while remaining normal, crawlable HTML.
- Mobile falls back to a direct vertical reading order; no service content or link is removed.

## Motion

- Existing grouped row reveal.
- Existing accordion open/close behavior.
- The open row composes its two images as one primary surface and one clipped detail surface.
- Row changes reuse the previous primary surface position and apply the MWG 105 focus response locally.
- Register remains stable text.
- No pin and no sticky image-led journey.
- Touch uses the accordion state; mouse and keyboard can replay the preview focus without changing navigation.

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

## SEO and information contract

- All five main service names and descriptions remain server-rendered.
- The accordion is progressive enhancement; critical content must not depend on JavaScript.
- Every main service receives a direct, verified destination when an approved service URL exists.
- `/tjenester` remains the service hub, not a silent fallback for unresolved landing-page decisions.
- The full service register remains visible HTML and acts as a calm internal-link index.
- Existing homepage service links are compared against `docs/homepage-seo-contract.md` before integration.
- No URL, slug, metadata, schema, sitemap, robots or canonical change belongs to this section task.
- Images support the text and must never become the only way to discover or understand a service.
- Keyboard, touch, reduced motion and no-JS states must expose the same service information.

## Current landing gap

The two main rows that previously pointed only to `/tjenester` (`Webapper` and `SEO & AI-søk`) are now aligned with the verified footer/live mapping. Exact existing links were also added for Headless CMS, UX/UI-design, Vedlikehold & sikkerhet and Teknisk SEO.

Several support labels remain intentionally unlinked until their offer/copy mapping is approved. Do not invent routes inside this checkout; it only contains the homepage route.

The verified mapping and preservation coverage are documented in `_design-input/services-truth-table-2026-07-10.md`. It also records one invalid `seo-ai-sok` service ID in the protected Hero; that must be handled as a separate explicit link-only patch.

## Controlled layout freedom

Allowed:

- refine the three-pillar progression
- strengthen hierarchy inside each accordion row
- use asymmetry, spacing and editorial grid changes
- add local image crossfade/clip treatment inside the active row
- reduce visual repetition without removing service information

Not allowed:

- sticky image-led service navigation
- horizontal or auto-rotating service discovery
- tabs that hide the primary offer by default
- cursor-dependent understanding
- pinning, scroll traps or card-grid conversion

## Active files

- `src/components/WhatWeBuild.tsx`
- `src/styles/what-we-build.css`
- `src/components/motion/HomeMotion.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Desktop and mobile browser review
