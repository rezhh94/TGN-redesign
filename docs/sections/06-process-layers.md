# 05 / Prosess — aktiv systemflyt-kontrakt

> Brand clarification, 2026-07-10: `Uklart inn. System ut.` belongs to Prosess because it explains risk reduction and transformation. It must not be treated as the overall Tigon identity. See `docs/tigon-brand-platform.md`.

Last reconciled with the implementation: 2026-07-10.

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

- `Uklart inn.` is split into characters, loses its baseline and distributes toward Retning, Bygg and Live.
- The characters use the MWG 067 `rotateX` depth treatment and random stagger while moving to the three phase lanes.
- Material tokens settle as `System ut.` locks sharply to the grid.
- The connection rail draws only after the output title has resolved.
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
