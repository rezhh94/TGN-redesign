# Tigon Motion and Asset Roadmap

Last reconciled with the implementation: 2026-07-13.

## Purpose

This file records the active motion architecture. It is not a backlog of old effect experiments. See `docs/current-homepage-state.md` for the full section map and `docs/decision-log.md` for rejected directions.

## Global guardrails

- Important text and links stay server-rendered and visible without JavaScript.
- Respect `prefers-reduced-motion` and mobile/touch behavior.
- Scope GSAP and ScrollTrigger to their section.
- Avoid duplicate triggers and global kills.
- Prefer transform/opacity for continuous movement.
- Do not add a pin merely to create visual novelty.
- Do not import MadeWithGSAP CSS, JS, fonts or assets.
- No visible orange, particles, decorative cursor-follow gimmicks or horizontal scroll.
- The only approved cursor exception is the functional Dynamic Text Cursor on clickable `04 / Arbeid` capability surfaces, governed by `docs/current-project-rules.md`.

## Active motion map

### Hero

- One-time entrance and existing restrained movement.
- No pin.
- Header and Hero are preserved unless explicitly reopened.

### 01 / Tilnærming

- The `Tre fag. Én helhet.` intro and three-discipline index remain normal document flow.
- On desktop, three material fields react as the stage enters the viewport and settle from separate offsets into one aligned composition in ordinary document flow.
- The material stage is decorative; important copy remains server-rendered outside it.
- Mobile uses a short unpinned scrub: the stacked fields enter from small opposing offsets while the `Én helhet` lockup settles into place.
- Reduced motion and no-JS show the final static composition.

### 02 / Tjenester

- Five editorial chapters remain in ordinary document flow, with varied scale rather than five repeated full-size scenes.
- Names, descriptions, capability lists, images and service links remain real server-rendered HTML.
- Copy and media settle from small opposing offsets while each chapter enters; images use mild section-scoped parallax.
- Mobile keeps the same complete content order with smaller offsets.
- Reduced motion and no-JS show the final static layout; there is no pin or sticky service-image sequence.

### Overlevering

- Foreground statement and image settle once.
- Two decorative background words drift in opposite directions.
- No pin.
- Continuous work is section-scoped and transform-only.

### 03 / Effekt

- One complete 2x2 result matrix remains visible in ordinary document flow.
- Each outcome settles from a small opposing offset as it enters.
- Mobile stacks the same complete fields with smaller offsets.
- Reduced motion and no-JS show the final static result matrix; there is no selector, active-card state, sticky stack or pin.

### 04 / Arbeid

- Light, asymmetric capability wall in normal document flow.
- Six complete, server-rendered capability surfaces remain visible without interaction.
- Small one-shot tile settling only; no pin, orbit, parallax stage or scroll-jacked progress.
- Fine-pointer hover uses the approved regular Dynamic Text Cursor with an action-and-target label.
- Click or keyboard activation opens a native detail dialog. Mobile/touch uses a visible `Les mer` action and a bottom-sheet presentation.
- Reduced motion and no-JS preserve the readable capability content; the custom cursor is disabled.

### 05 / Prosess

- Static three-phase system map is the base state.
- One-shot phase/material settling, title decode and decorative line draw.
- No pin and no scroll-driven stage switching.
- Reduced motion preserves the authored static card transforms; critical copy remains correctly spaced for assistive technology.

### Manifest and Kontakt

- Quiet closing sections.
- Existing restrained reveals only; no new showpiece.

## Rejected motion experiments

Do not restore unless the user explicitly reopens them:

- sticky image-led Tjenester journey
- pinned Overlevering ignite
- `Selected systems` pinned/orbital Work stage
- fast, scroll-sensitive Work image fly-ins
- static tilted Work card fan/collage with overlapping capability cards
- MWG 031 pinned/receding Process cards
- Process stage whose visual state changed aggressively with scroll
- repeated pinning across consecutive sections

## Asset state

- Current service imagery uses `public/services/tgn-*.webp`; Work and temporary Effekt imagery use the active files under `public/work/capability-stage/`.
- Effekt currently uses two existing Tigon mockup strips as explicit layout placeholders; replace them with final user-supplied mockups without changing the approved result matrix.
- Images are treated near-monochrome.
- Work items are explicitly presented as Tigon demonstrations/concepts, not delivered customer cases.
- 04 / Arbeid does not use case or archive links to point at previously built websites; it stays focused on future capabilities.
- No external MadeWithGSAP assets were imported.
- Future asset replacement must preserve truthful labelling and existing readability.

## Validation gate

For every motion change:

1. Confirm the static layout and copy remain readable.
2. Verify reduced-motion and mobile fallbacks.
3. Run `npm run typecheck`.
4. Run `npm run build`.
5. Run `git diff --check`.
6. Review desktop and mobile rendering before commit.
7. For cursor-enabled surfaces, verify visible mobile action, keyboard focus, dialog close/Escape and that the cursor is not the sole affordance.
