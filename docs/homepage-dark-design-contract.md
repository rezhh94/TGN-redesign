# Tigon homepage — dark design contract

Last reconciled: 2026-07-18.

This contract governs the mounted body journey from Intro through 06/System.
Header/Hero and Kontakt/footer are protected boundaries. `design.md` is the
canonical design entry point; this file records the detailed dark-homepage
surface and motion recipes. Appendix A in `design.md` owns the approved
Intro-specific composition.

## Principle

The homepage is one dark editorial environment with changing focus, not a
series of identical black sections. Intro through Arbeid use one physical
global atmosphere. Continuity comes from that persistent field plus type,
gutters, grid, line roles and controlled motion. Variation comes from density,
composition, media and light states.

## Typography

- TGS Perfect: brand/display moments.
- JUST Sans: editorial statements and body copy.
- Caleb Mono: labels, numbering and metadata.
- Semantic roles: `display-2xl`, `display-xl`, `display-lg`, `display-md`,
  `lead-*`, `body-*` and `meta-*`.
- Visible `meta-sm` never computes below 10 px.
- Preserve Tigon tracking and line-height tokens; do not copy another site's
  typography values into the shared system.

Intro alone uses the scoped Typekit kit `upd0woi` because that is part of its
approved section contract. It must not spread to other sections.

## Surface roles

| Role | Value | Use |
|---|---:|---|
| `surface-deep` | `#030303` | maximum depth and negative space |
| `surface-base` | `#070707` | base under the global Intro-through-Arbeid continuum |
| `surface-raised` | `#0d0f0f` | media or readable layer above base |
| `surface-focus` | `#171a19` | temporary light lift around chosen content |

`focus` is a state, not a new chapter colour. Do not introduce light section
backgrounds or new decorative accent colours.

## Text and line roles

- `text-strong`: primary heading/action.
- `text-medium`: explanation.
- `text-quiet`: labels and secondary information.
- `text-faint`: decorative/system metadata with verified contrast.
- `line-subtle`: atmospheric grid/construction.
- `line-default`: section and row separation.
- `line-strong`: focus, hover or important boundary.

Lines organize editorial surfaces; they must not create a generic card system.

## Grid and rhythm

- One content limit: `--page-max`.
- One shared body gutter: `--homepage-gutter` / `--gutter`.
- Desktop: 12 columns. Compact/mobile: 6 columns where applicable.
- Shared rhythm roles: section intro, content block and section exit.
- Sticky heights belong to the component that owns the transition. Ordinary
  section content remains in document flow.

Intro is a documented exception: its Codrops composition uses local
`--page-padding` and `pos-*` placement under `.approach-bridge` only.

## Media and atmosphere

- Media uses restrained corners, near-monochrome treatment and a dark raised
  surface when edge definition is needed.
- Clip and scale reveals are limited to media introduction, not every element.
- One persistent owner supplies wave, spotlight, vignette and veil from Intro
  through Arbeid. Sections above it do not mount duplicate backdrops.
- Restrained grain belongs to the one global desktop atmosphere; sections do
  not create or tune separate grain layers.
- Mobile, touch and reduced motion avoid unnecessary video/canvas work and use
  lightweight or static CSS light.
- No new external media, shader or canvas without a separate decision.

## Journey

1. Hero remains unchanged and hands into the Intro's first viewport.
2. Intro keeps stable foreground copy while decorative terms move behind it,
   then resolves through `01 → 02 / Én helhet. Fem fag.`.
3. Tjenester changes the global light/focus state while remaining in the same
   visual field as Intro.
4. `OutcomeTensionBridge` moves from launch to understanding to action.
5. Effekt and Arbeid continue the named global atmosphere journey.
6. Work darkens and shifts while the real Prosess section rises into view.
7. Prosess resolves into the quieter System composition.
8. System releases into the protected footer without a new wipe or loader.

## Motion ownership

| Owner | Mechanic | Fallback |
|---|---|---|
| Global atmosphere | persistent Intro→Arbeid light/media states | one continuous static CSS field |
| Intro | Flip/scramble term stream with collision clearance | stable foreground and readable handoff |
| Tjenester | small opposing settles and mild image parallax | normal flow |
| 02→03 | three statements on one typographic stage | complete statement list |
| Effekt | result/media reveal and atmosphere focus | complete static results |
| 03→04 | scoped atmosphere handoff | static light and normal flow |
| Arbeid | desktop archive/media choreography | normal flow with visible actions |
| 04→05 | outgoing depth/overlap | clean section boundary |
| Prosess | one-shot phase settle | complete static map |
| System | one-shot assembly | complete static conclusion |
| Footer | existing footer parallax | normal flow |

Every mechanic has one owner and cleanup. The global atmosphere owns only
background lifecycle; content mechanics remain section-scoped. No master pin,
global trigger kill, captured scrolling or animation-dependent critical
content.

## Scroll decision

Native scroll is canonical. The mounted checkpoint still includes global Lenis
and dormant homepage initializers. Their removal is a separate lifecycle task
and must not be folded into the atmosphere implementation.

## Accessibility and performance

- Important text and links are server-rendered.
- Reduced motion, touch, keyboard and no-JS remain complete.
- Video/canvas activation is scoped and reversible.
- Compact CSS and JS geometry use the same breakpoints.
- Test reverse scroll, refresh, resize and deep links.
- No horizontal overflow, hidden focus or text below the documented size floor.

## Verification matrix

- Widths: 1440, 1024, 900, 768 and 390 px.
- Input: mouse/wheel, touch and keyboard.
- States: standard, reduced motion and no-JS.
- Lifecycle: reverse, refresh mid-page, deep link and resize.
- Technical: typecheck, production build and `git diff --check`.
