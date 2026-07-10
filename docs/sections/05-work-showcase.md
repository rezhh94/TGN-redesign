# 04 / Arbeid — aktiv sikk-sakk-kontrakt

Last reconciled with the implementation: 2026-07-10.

The filename is retained for compatibility. The active component is `WorkProof`.

Brand reference: `docs/tigon-brand-platform.md`.

`Dette kan Tigon lage` is the section's capability framing. `BYGD FOR Å BLI VALGT` is the global brand promise. The section demonstrates future capability; it is never evidence of previously delivered websites.

## Active direction

The restored implementation comes from historical revision `25b423a`.

- Always-open capability catalogue; no accordion or hidden detail.
- Six complete rows: Webapp, Nettsted, Plattform, E-handel, AI and App.
- Copy and three visual/mockup surfaces alternate sides down the page.
- Every row shows category tags, capability explanation and its visual field together.
- The section demonstrates what Tigon can create. It does not claim delivered customer work.
- Items are future-facing capabilities, not cases or references to previously built websites.
- There are no case CTAs, archive CTAs or "see what we made" language inside the section.

## Motion

- Rows settle once when the catalogue enters.
- Desktop uses restrained counter-phase parallax: the visual column moves slightly more than the copy column.
- Mobile is a static single-column reading sequence.
- No pin, constellation, orbit, accordion or active-card state.

## Must preserve

- Capabilities must be immediately scannable.
- Capability explanation and visual demonstration must remain paired.
- Real HTML and no-JS readability.
- No customer names, fake case claims or fake metrics.
- No case links, archive links or portfolio language.
- No visible orange.

## Active files

- `src/components/WorkProof.tsx`
- `src/styles/work-proof.css`
- `src/components/motion/HomeMotion.tsx`
