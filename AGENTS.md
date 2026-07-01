# Tigon Redesign — Agent Instructions

This project is a clean redesign of Tigon Studio.

## Working principle

We build one section at a time.

Do not build the whole homepage in one task.
Do not continue to the next section until the current section is approved.

## Current state

The clean base is built.
Header + Hero are built and treated as the current approved foundation.

Next work must preserve Header + Hero unless explicitly told otherwise.

## Design goal

Tigon should feel like a premium digital studio:
- editorial
- restrained
- typographic
- confident
- near-monochrome
- high spacing discipline
- custom, not template-like
- not SaaS
- not SEO-portal
- not AI slop

## Source doctrine

Read and follow:
- docs/tigon-design-operating-system.md
- docs/section-storyboard.md
- docs/section-contract-template.md

The uploaded "Tigon Design Doctrine" PDF is a strategic reference, not a rigid template.

## Hard guardrails

Do not:
- import old styles.css
- import old signature.css
- import old main.js
- recreate the old "STRUKTUR / FØR / PYNT + 4 rows" intro
- create Veivalg
- create Før du bygger
- create guide/article/resource modules in the main flow
- add orange unless explicitly requested
- add random component-library effects
- add cards unless the section contract asks for cards
- build multiple sections in one task
- add GSAP/ScrollTrigger before static layout is approved
- commit unless explicitly requested

## Flexible, not locked

The layout is allowed to change per section.

Each section should have:
- one idea
- one focal point
- a different layout archetype from its neighbor
- a clear tonal or pacing role
- motion only if it supports the section idea

## Build process

For each section:

1. Create a section contract.
2. Build static layout only.
3. Show result.
4. Wait for approval.
5. Add motion in a separate pass.
6. Validate.
7. Then move to next section.

## Validation

After code changes run:

npm run build
npx tsc --noEmit
git diff --check

Report:
- files changed
- what section was touched
- whether Header/Hero changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
