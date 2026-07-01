# Tigon Motion and Asset Roadmap

## Purpose

This file documents planned motion, GSAP, interaction and asset usage for the Tigon redesign.

It is not a rigid lock.
It is a coordination map so motion, visuals and images are added deliberately after static sections are approved.

## Core rule

Static first.
Motion second.
Assets only when they improve the section idea.

Motion must reveal, guide or clarify.
Motion must not decorate weak layout.

## Global guardrails

- No global scroll-jacking.
- No random effects.
- No particles.
- No cursor-follow gimmicks.
- No horizontal scroll unless a section contract explicitly approves it.
- No permanent random AI images.
- Respect prefers-reduced-motion.
- Keep important text server-rendered and visible without JavaScript.
- GSAP/ScrollTrigger must be scoped per section.
- Mobile must have simpler fallbacks.
- One or two signature motion moments across the whole homepage is enough.

## Section motion map

### Hero

Static status:
Built.

Future motion:
- subtle intro reveal
- possible visual parallax
- possible handoff into next section

Do not:
- heavy 3D
- constant animation
- visual noise

### 01 / Tilnærming

Static status:
Built.

Future motion:
- text-fill / muted gray to off-white on “UKLART” and “blir byggbart.”
- subtle line-mask reveal
- no pin

Current stash:
Approach motion exists as WIP stash. Do not apply until reviewed.

### 02 / Tjenester

Static status:
Built.

Future motion:
- row reveal
- separator line draw
- active row highlight
- hover/active accordion behavior later
- possible preview panel later

Do not:
- card grid
- random image hover
- fake preview images

### 03 / Effekt

Static status:
Built.

Future motion:
- outcome words fill from muted gray to off-white
- active outcome highlight:
  FUNNET → FORSTÅTT → VALGT → MÅLT
- explanatory text becomes active with outcome
- no pin in first motion pass

### 04 / Arbeid

Static status:
Built as visual placeholder / skeleton.

Future assets:
- replace placeholder with curated Envato/Tigon mockups
- use Tigon logo and real visual direction once logo is ready
- one main visual and one detail crop
- no random AI images as final

Future motion:
- headline line-mask reveal
- main visual clip reveal
- subtle visual parallax
- metadata stagger

Do not:
- portfolio grid
- fake metrics
- generic stock images

### 05 / Prosess

Static status:
Next section.

Planned section type:
Production Layers / stacked workflow surfaces.

Future motion:
This is a candidate signature motion section.

Desktop motion idea:
- section can become sticky in later motion pass
- process layers stack or advance through scroll:
  01 Avklar
  02 Strukturér
  03 Bygg
  04 Lanser
- active layer becomes clearer
- inactive layers stay muted
- subtle connecting line or depth shift

Mobile fallback:
- no sticky
- no scroll-jacking
- layers stack normally as static content

Do not:
- generic timeline
- 4 equal cards
- icons
- orange
- heavy horizontal scroll

## Asset plan

Images should be introduced carefully.

Good asset types:
- Envato mockups
- edited Tigon logo mockups
- dark / neutral device scenes
- premium brand surface crops
- app/website mockup details

Avoid:
- generic stock people
- neon tech
- blue/purple AI dashboard clichés
- cheap SaaS mockups
- permanent AI-generated filler images

## Motion implementation plan

Before adding motion to any section:
1. Confirm static layout is approved.
2. Write a section-specific motion pass.
3. Scope GSAP to that section only.
4. Add prefers-reduced-motion fallback.
5. Validate build/typecheck/diff-check.
6. Review in browser before commit.

## Priority order for future motion

1. Approach text-fill review
2. Effekt active outcome text-fill
3. Arbeid visual reveal after real assets
4. Prosess production-layer stacking
5. Services hover/active behavior

Do not animate everything at once.
