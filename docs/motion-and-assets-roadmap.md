# Tigon Motion and Asset Roadmap

Last reconciled with the implementation: 2026-07-09.

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
- No visible orange, particles, cursor-follow gimmicks or horizontal scroll.

## Active motion map

### Hero

- One-time entrance and existing restrained movement.
- No pin.
- Header and Hero are preserved unless explicitly reopened.

### 01 / Tilnærming

- Existing intro/text treatment remains approved.
- The existing desktop showpiece is the homepage's only active pin.
- Mobile does not pin.

### 02 / Tjenester

- Pre-sticky accordion is active.
- Rows, panels and register remain real HTML.
- JS enhances the accordion; no-JS keeps content readable.
- No sticky service-image sequence.

### Overlevering

- Foreground statement and image settle once.
- Two decorative background words drift in opposite directions.
- No pin.
- Continuous work is section-scoped and transform-only.

### 03 / Effekt

- Existing measured outcome interaction remains.
- Do not add a second adjacent pin without a new explicit decision.

### 04 / Arbeid

- Normal-flow editorial capability index.
- One-shot item and image settling.
- Mild desktop image parallax, approximately four percent travel.
- No pin, orbit, active-card state or scroll-jacked count/progress.

### 05 / Prosess

- Static three-phase system map is the base state.
- One-shot phase/material settling, title decode and decorative line draw.
- No pin and no scroll-driven stage switching.

### Manifest and Kontakt

- Quiet closing sections.
- Existing restrained reveals only; no new showpiece.

## Rejected motion experiments

Do not restore unless the user explicitly reopens them:

- sticky image-led Tjenester journey
- pinned Overlevering ignite
- `Selected systems` pinned/orbital Work stage
- fast, scroll-sensitive Work image fly-ins
- MWG 031 pinned/receding Process cards
- Process stage whose visual state changed aggressively with scroll
- repeated pinning across consecutive sections

## Asset state

- Current service and Work imagery uses repository assets under `public/work/mockups/`.
- Images are treated near-monochrome.
- Work items are explicitly presented as Tigon demonstrations/concepts, not delivered customer cases.
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
