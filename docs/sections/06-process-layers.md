# 05 / Prosess — aktiv systemflyt-kontrakt

Last reconciled with the implementation: 2026-07-09.

## Role

Reduce buyer risk by showing how Tigon turns an unclear need into a live, measurable system.

## Active structure

- Label: `05 / Prosess`.
- Preserved large title: `Uklart inn. System ut.`
- Note: `Tre beslutninger — ett sammenhengende system`.
- A dark `TGN / Systemflyt` map inside the light section.
- Visible path from `Uklart behov` to `Målbar kontaktvei`.
- Three phases:
  1. Retning — Behov, Mål, Innhold — output `Definert retning`.
  2. Bygg — Flyt, Teknologi, Integrasjon — output `Levende løsning`.
  3. Live — Måling, Kontaktvei, Resultat — output `Målbar kontaktvei`.
- Closing copy and project CTA remain visible after the map.

Desktop uses three columns. Mobile presents the same content as one vertical, readable sequence.

## Motion

- One-shot phase entry.
- One-shot material/token settle.
- Decorative connection-line draw.
- Existing title decode.
- No pin and no scroll-driven active-stage switching.

## Rejected directions

- MWG 031-style pinned/receding 3D cards.
- Sticky split-screen process presentation.
- Scroll-sensitive visual stage that changed too quickly.
- Repeating the same pinned-scroll mechanism used elsewhere.

These experiments were rejected because normal scrolling did not keep all process content reliably visible and the homepage accumulated too many similar pinned moments.

## Must preserve

- Large Prosess title.
- Real HTML for every phase, material and output.
- Mobile, reduced-motion and no-JS readability.
- No visible orange.
- No SaaS product-tour treatment.

## Active files

- `src/components/ProcessLayers.tsx`
- `src/styles/process-layers.css`
- `src/components/motion/HomeMotion.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Desktop and mobile browser review
