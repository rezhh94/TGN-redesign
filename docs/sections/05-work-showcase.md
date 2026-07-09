# 04 / Arbeid — aktiv WorkProof-kontrakt

Last reconciled with the implementation: 2026-07-09.

The filename is retained for link compatibility. The active component is `WorkProof`, not `WorkShowcase`.

## Role

Show what Tigon can create without presenting a customer portfolio, client history or industry list.

## Active structure

- Label: `04 / Arbeid`.
- H2: `Dette bygger vi.`
- A lead demonstration followed by five asymmetric editorial entries.
- Six Tigon-labelled demonstrations covering product platform, search surface, customer portal, purchase flow, mobile flow and signal system.
- Each entry includes an internal Tigon label, category, description and an explicit `Leverer —` line.
- Footer summarises the service range and links to `/tjenester`.

All entries are in ordinary document flow and remain readable without JavaScript.

## Truthfulness rule

- This is a capability index, not a list of delivered customer work.
- Do not add customer names, logos, fake metrics or case claims.
- Keep Tigon demonstration/concept/lab labels visible.

## Motion

- One-shot vertical settling per item.
- One-shot image scale settle.
- Mild desktop image parallax.
- No pin, orbital stage, active-card state, progress counter or scroll-jacked timeline.

## Rejected directions

- Proof Ledger.
- Generic WorkShowcase with one large placeholder surface.
- `Selected systems` pinned/orbital stage.
- Fast image fly-ins that overreact to small scroll input.
- Repetitive pinned-scroll behavior matching adjacent sections.

## Active files

- `src/components/WorkProof.tsx`
- `src/styles/work-proof.css`
- `src/components/motion/HomeMotion.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Desktop review at 1440 x 900
- Mobile review at 390 x 844
