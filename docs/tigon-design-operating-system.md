# Tigon Design Operating System

## Purpose

This document defines how Tigon Studio redesign work should be approached.

It is not a rigid template.
It is a set of principles for building a premium digital studio website without repeating the old chaos.

## Core idea

Awwwards feeling is not "more effects".
It is authored pacing.

Each section must feel like a designed moment:
- one idea
- one focal point
- deliberate contrast
- motion that supports the narrative

## What went wrong before

The previous prototype became chaotic because:
- too many sections were designed at once
- too many effects were added before layout was approved
- old CSS and JS layers kept accumulating
- sections began to feel similar
- "premium" became confused with "more animation"
- content modules started feeling like SEO landing pages

## Design direction

Tigon should feel:

- premium
- editorial
- restrained
- typographic
- dark/near-monochrome
- spacious
- specific
- confident
- custom-built

Tigon should not feel:

- SaaS-template
- SEO portal
- dashboard
- generic AI agency
- component library demo
- Framer template clone
- over-animated
- orange-heavy
- wireframe/blueprint

## Palette

Default direction:
- near-black
- charcoal
- off-white
- warm gray
- muted gray

Orange is not part of the current visible design direction.
It may exist as a token, but should not be visible unless explicitly approved.

## Typography

Use:
- TGSPerfect / display font for brand-level or major display moments
- JUSTSans for large editorial statements and body
- CalebMono for labels, numbering and metadata

Avoid using TGSPerfect for every big statement.
Hero already owns the condensed display type.

If every section uses the same big condensed type, the page becomes repetitive.

## Spacing

Use generous spacing.
Whitespace is not empty space. It frames the focal point.

Avoid identical padding everywhere.
Different sections should have different pacing:
- Hero: cinematic, full-screen
- Statement bridge: sparse, quiet, spacious
- Services: denser, more interactive
- Philosophy: biggest emotional peak
- Footer: exhale

## Section rule

No two adjacent sections should share the same combination of:

- layout archetype
- tonal value
- motion role

If two neighboring sections feel similar, change one of those three.

## Motion doctrine

Static layout first.
Motion second.

Motion should:
- reveal
- guide
- clarify
- support the section idea

Motion should not:
- decorate
- distract
- hide critical content
- compensate for weak layout

Use:
- line reveal
- text fill
- mask reveal
- subtle parallax
- row highlight
- hover microinteractions

Avoid:
- random cursor effects
- particles
- 3D tunnel
- global pixel shaders
- unnecessary WebGL
- heavy pinned sections everywhere

Pinned/scrubbed moments should be rare.
At most one or two true showpieces on the whole page.

## SEO and accessibility

Important text and links must be server-rendered HTML.
Do not hide critical text behind JS.
Do not replace links with onClick navigation.
Respect prefers-reduced-motion.
Do not damage Core Web Vitals for visual tricks.

## Build rule

Every section starts with a section contract.

No contract = no coding.
