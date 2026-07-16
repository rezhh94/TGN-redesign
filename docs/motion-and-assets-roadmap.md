# Tigon Motion and Asset Roadmap

Last reconciled with the implementation: 2026-07-16.

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

- The four-line thesis `Hver for seg / blir det lansert. / Bygd sammen / blir det valgt.` remains in normal document flow with its supporting paragraph and `01 → 02 / Én helhet. Fem fag.` handoff.
- Osmo Masked Text Reveal uses the original GSAP SplitText line-mask mechanism on the authored intro lines.
- The two `Hver for seg` lines arrive independently; the two `Bygd sammen` lines land together, followed by the support and handoff copy.
- The reveal is one-shot and unpinned. Important copy remains complete and server-rendered before JavaScript enhances it.
- Reduced motion and no-JS show the final static composition.

### 02 / Tjenester

- Five editorial chapters remain in ordinary document flow, with varied scale rather than five repeated full-size scenes.
- Names, descriptions, capability lists, images and service links remain real server-rendered HTML.
- Copy and media settle from small opposing offsets while each chapter enters; images use mild section-scoped parallax.
- Mobile keeps the same complete content order with smaller offsets.
- Reduced motion and no-JS show the final static layout; there is no pin or sticky service-image sequence.

### 02 → 03 / Tjenester → Effekt

- The former separate `EffectBridge`/Overlevering scene is not mounted.
- Tjenester ends with the server-rendered `Lansert er ikke ferdig.` reply.
- Osmo Pixelated Scroll Transition generates a responsive decorative grid that covers the dark service surface with the mauve Effect colour.
- The grid is section-scoped, unpinned and absent in reduced motion; the static handoff remains readable without JavaScript.

### 03 / Effekt

- One continuous asymmetric result chain remains visible in ordinary document flow; the equal 2x2 visual arrangement is superseded.
- Osmo Highlight Marker is the active Effect mechanism: dark covers withdraw from FUNNET, FORSTÅTT, VALGT and MÅLT in two visible rows with a short stagger.
- Copy, measurement UI and proof surfaces remain stationary. The reveal is one-shot and section-scoped; there is no pin, scrubbed Proof Lock, blur, parallax, selector or active-card state inside Effekt.
- Reduced motion and no-JS show the final static result chain. Refresh preserves the correct scroll-linked state.

### 03 → 04 / Effekt → Arbeid

- A server-rendered bridge uses two complete statements on the same mauve surface: `Effekt må bygges inn.` and `Dette kan Tigon lage.`.
- Desktop uses an MWG 053-inspired pinned 3D line flip so the handoff does not repeat the 02→03 sticky-title rhythm. The first statement rotates out as the second rotates in; no image or colour transition participates.
- The bridge and Work catalogue share one wrapper and one semantic `Dette kan Tigon lage.` node. That same title contracts and fades into a restrained centre watermark behind three 2–2 capability chapters, then is clipped at the end of the wrapper.
- Tablet/mobile, reduced motion and no-JS skip the pinned enhancement and preserve ordinary document flow.

### 04 / Arbeid

- Continuous mauve introduction and asymmetric capability wall.
- Six complete, server-rendered capability surfaces remain visible without interaction.
- MWG 051-inspired foreground-over-message principle across three authored pairs: Webapp/Nettsted, Plattform/E-handel and AI/App. Each pair approaches the centre with small deterministic scrubbed settling over one shared title. No random image loop, Observer, orbit, parallax stage or scroll-jacked progress.
- Fine-pointer hover uses the approved regular Dynamic Text Cursor with an action-and-target label.
- Every surface is one real link to its established service/guide URL. There is no dialog, bottom sheet, shared-element Flip, opening Pixelate or next/previous capability switcher.
- Mobile/touch uses a visible `Utforsk` action. Reduced motion and no-JS preserve the same direct links; the custom cursor is disabled.

### 04 → 05 / Arbeid → Prosess

- A shared wrapper places the actual Process section one viewport underneath the scoped mauve cover.
- `Slik blir det til.` is the only handoff statement and remains still long enough to read.
- An Overlapping Parallax adaptation moves the outgoing Work surface a short distance upward and applies a restrained dark veil while the real Process section rises over it.
- A wide elliptical leading edge adapted from Curved Wipe enters ahead of the Process rectangle. The same dark surface continues through the real Process intro and system; there is no separate transition panel or repeated 05 label.
- The pass provides roughly 140svh of real scroll on desktop and 125svh on mobile. Delayed scrub affects the outgoing parallax, veil and small curve expansion, while the incoming section keeps natural scroll continuity.
- The earlier MWG 052 line, three dark fields, repeated process panels and long black hold are removed.
- No external code, CSS, Barba runtime, fonts, media or Lenis instance is imported from the Osmo references.
- Reduced motion and no-JS preserve the single typographic statement and normal non-overlapping section flow.

### 05 / Prosess

- Static three-phase system map is the base state.
- One-shot panel settling runs in phase order 01→02→03; copy/material/output arrives before the oversized numeral in each panel.
- No pin and no scroll-driven stage switching.
- Reduced motion preserves the authored static card transforms; critical copy remains correctly spaced for assistive technology.

### Manifest and Kontakt

- Quiet closing sections.
- Manifest keeps its restrained one-shot assembly reveal.
- Kontakt uses the existing desktop Osmo Footer Parallax wrapper and one-shot wordmark reveal; mobile, reduced motion and no-JS keep normal document flow.
- No new showpiece.

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
- equal 2x2 Effect matrix as the final visual composition
- generic whole-outcome Effect slide-in
- literal white/olive/mauve discipline colour coding or a three-column Design/Teknologi/Synlighet poster system

## Asset state

- Current service imagery uses `public/services/tgn-*.webp`; Work and temporary Effekt imagery use the active files under `public/work/capability-stage/`.
- Effekt currently uses existing Tigon mockup surfaces as explicit proof placeholders; replace them with final user-supplied mockups without changing the approved asymmetric result chain.
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
7. For cursor-enabled surfaces, verify the visible mobile action, the six real hrefs, keyboard focus, absence of nested links/dialog markup and that the cursor is not the sole affordance.
