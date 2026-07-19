# Homepage SEO/CRO contract

Last reconciled: 2026-07-19.

This contract protects technical meaning during redesign. It is not a visual
preservation contract. Header, Hero, every section, handoff, Arbeid and Footer
may all be recomposed, restyled, reanimated or replaced.

## Mounted technical state

The current checkout contains one App Router homepage:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/icon.png`

Root metadata currently declares:

- title: `Tigon Studio | Nettsider og apper som blir funnet`
- description: `Tigon Studio bygger nettsider og apper som blir funnet,
  forstått og valgt.`
- document language: `nb`

The checkout currently has no project-local sitemap, robots implementation,
canonical helper or JSON-LD/schema layer. Do not invent or change those systems
inside a visual task; open a separate technical SEO scope.

## Visual redesign freedom

The following are explicitly open:

- Header and navigation composition;
- Hero layout, typography, copy hierarchy, media and motion;
- section order, section layout and handoff architecture;
- Arbeid's visual/component/interaction model;
- Footer layout, typography and motion;
- responsive structure across the entire homepage.

Existing class names, component names, copy blocks and mounted effects are not
SEO requirements. They may be replaced when the redesign keeps the semantic
and navigation acceptance criteria below.

## Semantic acceptance criteria

- Keep one clear, server-rendered homepage `h1`. Its wording and visual line
  breaks may change, but it must still identify Tigon and the concrete offer.
- Important positioning, service meaning and contact action remain real HTML,
  not canvas-only or client-only content.
- Arbeid remains a future-facing demonstration of what Tigon can create. It
  never becomes a portfolio or list of websites Tigon has previously built.
- Heading order remains coherent after sections are reordered or replaced.
- Contact and conversion actions remain usable by keyboard and touch.
- Image/media replacements receive appropriate loading and alternative-text
  treatment.
- Reduced motion and no-JS retain the essential message and links.

## Route and factual boundaries

Visual work may relabel, reposition and redesign links, but must not silently
invent destinations or change routes. Route changes require explicit link/SEO
scope and verification against `docs/services-link-contract.md`.

Factual contact/NAP values may be visually redesigned and moved, but the facts
must remain accurate. Footer redesign must not create an SEO link farm.

## Current Hero route note

The mounted Hero still links SEO / AI-søk to
`/tjenester/seo-ai-sok/oslo/oslo`, while the verified service mapping documented
elsewhere uses `/tjenester/seo-optimalisering/oslo/oslo`. Hero is not visually
protected; correcting the destination nevertheless requires explicit route and
SEO scope.

## Verification for a full redesign

- exactly one useful server-rendered `h1`;
- logical `h2`/`h3` hierarchy;
- all visible links have verified destinations;
- keyboard, touch, reduced-motion and no-JS paths are complete;
- metadata changes are absent unless explicitly requested;
- TypeScript, production build and `git diff --check` pass.
