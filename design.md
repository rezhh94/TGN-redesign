# Tigon design system

Status: canonical design and token authority for the mounted homepage.

`src/styles/tokens.css` is the executable source. This document explains the
roles, boundaries and reasons behind those values. Section CSS consumes roles;
it must not introduce a competing local scale.

## Direction

Tigon is editorial, restrained, typographic, confident and near-monochrome.
The hierarchy should feel constructed rather than decorated: strong type,
precise grids, deliberate negative space and a small number of motion ideas.

The Trionn analysis is used as construction calibration. Its useful principles
are role-based typography, 12-column composition, tight display leading, real
HTML above optional visual layers and structural mobile branches. Verified
Trionn-authored public code, shader logic and exact values may be copied
or adapted from the first-party modules identified in the local evidence
README when they genuinely fit. Whole bundles, co-located third-party/runtime
code, reference font binaries, site-wide root scaling, colour signature,
media, logos, content and identity-bearing combinations remain rejected. The
source type metrics and responsive root basis are reproduced through isolated
type tokens; they do not alter `html` or non-type rem layout.

One narrow calibration is explicitly approved: light information typography
uses the neutral `#434343` heading/body and `#272727` row tones plus the
computed role sizes verified in the local services snapshot. They are stored
as isolated semantic paper roles. The document root, surrounding composition,
font family and content remain Tigon's own.

Every homepage region is visually redesignable: Header, Hero, all body
chapters, handoffs, 04 / Arbeid and Footer. Values and compositions documented
here are shared tools and current calibration, not protected section layouts.
Individual tasks still remain limited to the scope the user requests.

Visual freedom does not change the permanent meaning of 04 / Arbeid: it shows
what Tigon can create, never a portfolio, customer parade or list of websites
Tigon has previously built.

### KEEP / ADAPT / REJECT

| Decision | Pattern | Tigon rule |
| --- | --- | --- |
| KEEP | 12-column editorial grid | Use one shared grid and asymmetric spans. |
| KEEP | Semantic HTML remains complete without JS | Motion enhances readable final states. |
| KEEP | Role-based type instead of a forced modular scale | Size, leading and tracking are calibrated together per role. |
| KEEP | Structural mobile alternative | Change composition when the interaction model changes. |
| COPY | Source type metrics and responsive basis | Preserve exact size, leading, tracking and breakpoints through isolated type tokens. |
| COPY / ADAPT | Approved source families | Use exact official Familjen Grotesk and Martian Mono files; map Neue Haas Display to the locally licensed PP Neue Montreal. Never use binaries from the Trionn mirror. |
| ADAPT | 24/40px reference gutters | Use a fluid 24–48px Tigon gutter and a 16–24px grid gap. |
| COPY | Editorial New Ultralight | Use the locally owned exact face for the source's selected serif-number role. |
| REJECT | Reference font binaries, assets and global root mutation | Never import them from the mirror or let type calibration alter non-type rem layout. |
| REJECT | Orange energy signature and shader language | Tigon remains neutral with pine/green only as a micro-signal. |
| REJECT | Long preloader and effect density as identity | Motion must serve hierarchy and reading. |

## Current canvas rule

Homepage chapters use solid semantic surfaces only. Tjenester uses the pure
white `--tigon-paper` as one continuous information surface while only the left
media field alternates paper and the dark body surface. This is content
hierarchy, not page-wide background art. No decorative background video,
poster, texture, grain, canvas, spotlight or vignette is part of the current
system. Section roots own their explicit solid surface. A future visual field
requires a separate, Tigon-authored design task and may not be inferred from
this document.

## Brand assets

The sole logo authority is the user's final export under
`/Users/reezy/Tigon Logo ferdig/Final FIles`. Web-normalized copies live in
`public/brand/` with semantic names:

- `tigon-lockup-*` is the official horizontal mark plus TIGON STUDIO lockup;
- `tigon-wordmark-*` is the official stacked TIGON STUDIO wordmark;
- `tigon-mark-*` is the final geometric Tigon symbol;
- `favicon-16.png`, `favicon-32.png` and `favicon-512.png` are the supplied
  final favicon masters.

Use the horizontal lockup for primary navigation identity, the wordmark for a
large editorial signature and the standalone mark only where the context
already names Tigon or where the mark is intentionally symbolic. CSS masks may
use the ink SVG as shape authority and inherit semantic `currentColor`; do not
redraw the mark, typeset a substitute lockup or reintroduce the obsolete inline
symbol.

## Typography

### Font roles

| Token | Family | Role | Why |
| --- | --- | --- | --- |
| `--font-display` | PP Neue Montreal | Trionn's Neue Haas reading-copy role | Regular `400` is the legal local substitute for paragraphs, supporting copy and list rows. The variable name is retained from the approved stack even though the source does not use Neue Haas for its large headings. |
| `--font-body` | Familjen Grotesk | H1-H4, large display, title labels, menu and marquee | Official Regular `400`; official Medium `500` only for the source's selected-work opening. |
| `--font-mono` | Martian Mono | button text, text actions and explicitly technical microcopy | The exact static Standard Light `300` face creates the source's narrow action register. |
| `--font-editorial` | PP Editorial New | selected serif accents and editorial phrases only | Ultralight `200` adds controlled contrast without becoming the site-wide reading face. |
| `--font-primary` / `--font-sans` / `--font-paper` | PP Neue Montreal aliases | compatibility aliases for reading-copy roles | Existing prose consumers resolve to the legal Neue Haas substitute. |

Use PP Neue Montreal Regular (`400`) for reading copy. Familjen Grotesk uses
Regular (`400`) for the source's heading/title system and its real Medium
(`500`) file only for the documented work-opening emphasis. Martian Mono uses
Standard Light (`300`). PP Editorial New uses Ultralight (`200`) only through
explicit editorial accent roles. Never synthesize a weight that is not
supplied by a real font file.

### Scale logic

The source uses `html { font-size: calc(1000vw / var(--size)) }`. Tigon keeps
the exact arithmetic but applies it only inside type tokens with
`calc(Nvw / var(--trionn-type-size))`. This gives the same computed type size
at every viewport without changing the document root or any spacing expressed
in `rem`.

| Minimum viewport | Exact source basis |
| ---: | ---: |
| default | `320` |
| `440px` | `360` |
| `640px` | `480` |
| `768px` | `750` |
| `1024px` | `850` |
| `1280px` | `1000` |
| `1441px` | `1180` |
| `1536px` | `1280` |

| Source role | Exact size / leading / tracking | Tigon family mapping |
| --- | --- | --- |
| H1 | `clamp(3.75rem, 6.614vw, 6.25rem)` / `clamp(3.5rem, 5.952vw, 5.625rem)` / `-.06em` | Familjen Grotesk Regular |
| H2 | `clamp(2.5rem, 6.283vw, 5.938rem)` / `clamp(2.2rem, 5.952vw, 5.625rem)` / `-.06em` | Familjen Grotesk Regular |
| H2 big | `clamp(3.5rem, 6.349vw, 6rem)` / `clamp(3.25rem, 5.82vw, 5.5rem)` / `-.06em` | Familjen Grotesk Regular |
| H3 | `1.75rem`; `2.25rem` from `1280px` / `1` / `-.04em` | Familjen Grotesk Regular |
| H4 | `1.125rem` / `1.25rem` / `-.02em` | Familjen Grotesk Regular |
| Document body | `1.25rem`; `1rem` from `1024px` / normal throughout | PP Neue Montreal Regular |
| Paragraph | `1.25rem`; `1.125rem` from `1024px`; `1.25rem` from `1536px` / normal throughout | PP Neue Montreal Regular |
| Small | `1.25rem`; `1.125rem` from `1024px`; `1rem` from `2000px` / normal throughout | PP Neue Montreal Regular |
| Title/meta | `1.125rem`; `1.063rem` from `1024px`; `1.125rem` from `1536px`; `1rem` from `2000px` / `1` throughout / `-.02em` | Familjen Grotesk Regular |
| Button | `1rem`; `.875rem` from `1024px` / normal throughout / `-.06em` | Martian Mono Standard Light |
| Menu | `3rem`; `1.25rem` from `768px` / `1.375rem` throughout / `-.04em` | Familjen Grotesk Regular |
| Number small | `3.5rem` / `3.125rem` / `-.06em` | Familjen Grotesk Regular |
| Numbers | `5.375rem` / `6.125rem` / `-.06em` | PP Editorial New Ultralight |
| Marquee | `clamp(5rem, 9.164vw, 10rem)` / `.672` / `-.08em` | Familjen Grotesk Regular |
| Work opening | `2.5rem`; `3rem` from `768px` / `1.1` / `-.025em` / `500` | Familjen Grotesk Medium |

The legacy `display-*`, `heading-*`, `lead-*`, `body-*`, `meta-*` and `fz-*`
names remain compatibility aliases only. They resolve to these exact source
roles and may not regain section-local clamps. Section CSS controls measure,
alignment and spacing, not font metrics.

The four `type-paper-*` roles continue to express the source's light
information hierarchy and use the same responsive basis. They are not a
separate scale.

The four `type-paper-*` roles are one complete information hierarchy, not a
Tjenester-only scale. Heading and label use Familjen Grotesk Regular; copy and
rows use PP Neue Montreal Regular. The
roles are consumed through
`src/styles/typography.css`; components may control measure and spacing, but
may not replace their font metrics or colours locally.

#### Verified paper calibration

The local `2026-07-19` services snapshot was rendered with its real HTML, CSS
and fonts. The values below are computed CSS pixels, not estimates from a
screenshot:

| Viewport | Heading | Copy | Label | Row |
| ---: | ---: | ---: | ---: | ---: |
| 390 | 30.47 | 15.23 | 13.71 | 15.23 |
| 768 | 25.60 | 12.80 | 11.52 | 12.80 |
| 1024 | 30.12 | 13.55 | 12.81 | 13.55 |
| 1440 | 32.40 | 16.20 | 15.31 | 16.20 |
| 1536 | 27.00 | 13.50 | 13.50 | 15.00 |
| 1663 | 29.23 | 14.62 | 14.62 | 16.24 |

The executable `--type-paper-scale-basis` and `--type-paper-*-size` tokens
reproduce this responsive size logic inside the paper hierarchy only. Do not
replace them with a section-local `clamp()`, and do not apply the basis to
`html`, `body` or another type family. Colour remains fixed through
`--paper-text-*`; families remain the approved body and mono roles. This isolation is
the clean-room boundary.

## Spacing and grid

The primitive scale is a fixed 4px base: `4, 8, 12, 16, 20, 24, 32, 40, 48,
64, 80, 96, 128`. A 4px base is a generic industry standard; the selection of
larger steps is Tigon's rhythm. Components choose a named token, never an
unexplained number.

| Role | Token and value | Why |
| --- | --- | --- |
| Page width | `--page-max: 2560px` | Allows wide editorial composition while grid spans control line length. |
| Homepage gutter | `clamp(24px, 2.78vw, 48px)` | Matches the reference's useful 24/40 logic but grows smoothly and caps before wasting space. |
| Grid gap | `clamp(16px, 1.67vw, 24px)` | 16px preserves mobile width; 24px gives desktop columns air. |
| Section intro | `clamp(104px, 13vh, 176px)` | Establishes chapter separation, tied partly to viewport height. |
| Section block | `clamp(52px, 7vh, 88px)` | Groups related content inside a chapter. |
| Section exit | `clamp(88px, 11vh, 148px)` | Slightly shorter than entry to keep forward momentum. |

Desktop uses 12 columns. At `640px` and below the same semantic content uses 6
columns or a single-column branch. Use column span to create hierarchy; do not
fake it with arbitrary left margins. Reading copy should normally stay within
`34–62ch` depending on role.

## Buttons and text actions

Buttons use pill geometry because the control should read separately from the
editorial canvas. This is an adapted generic pattern, not a copy of any
reference control.

| Role | Value | Why |
| --- | --- | --- |
| Small height | `40px` | Compact navigation or utility action; still a usable target. |
| Medium height | `48px` | Default control height. |
| Large height | `56px` | Hero or primary conversion action. |
| Label | exact Button role: `1rem`, `.875rem` from `1024px`, normal leading, `-.06em`, weight `300` | Uses Martian Mono Standard Light while preserving the source metrics. |
| Horizontal padding | `20 / 24 / 28px` | Scales with height and supports short Norwegian labels. |
| Radius | `999px` | Gives one unambiguous action silhouette. |
| Primary | light fill `#f2f1eb`, dark text `#10100f` | Maximum conversion contrast. |
| Secondary | transparent, `--line-strong`, light text | Preserves hierarchy without becoming invisible. |
| Focus | `2px solid --focus-ring`, offset `4px` | Keyboard state must be clearer than hover. |
| Motion | `300ms --ease-standard` | Enough polish for fill/arrow movement without slowing response. |

Text actions such as Intro's underlined handoff use the same label typography,
but keep square geometry and a hairline rather than pretending to be a button.
All primary actions require at least `44px` effective hit height.

## Colour roles

| Role | Token | Value | Why |
| --- | --- | --- | --- |
| Deep surface | `--surface-deep` | `#030303` | Highest-depth chapter. |
| Base surface | `--surface-base` | `#070707` | Default homepage body. |
| Raised surface | `--surface-raised` | `#0d0f0f` | Local separation without a new hue. |
| Focus surface | `--surface-focus` | `#171a19` | Highest neutral elevation. |
| Paper surface | `--tigon-paper` | `#ffffff` | Pure white information surface and transition field in Tjenester. |
| Paper heading/body | `--paper-text-heading/body` | `#434343` | Shared calm primary tone for titles and short explanations on paper. |
| Paper rows | `--paper-text-row` | `#272727` | Stronger scan tone for capability or specification rows. |
| Paper labels | `--paper-text-label` | `rgba(67,67,67,.6)` | Damped grouping level; not suitable for essential long-form copy. |
| Strong text | `--text-strong` | `#f2f1eb` | Warm high contrast, avoiding optical glare from pure white. |
| Medium text | `--text-medium` | `rgba(242,241,235,.68)` | Supporting copy. |
| Quiet text | `--text-quiet` | `rgba(242,241,235,.54)` | Labels and secondary metadata only. |
| Lines | `--line-subtle/default/strong` | `.08/.16/.30` alpha | Three repeatable boundaries; no arbitrary alpha. |
| Micro signal | `--pine` | `#33453b` | Small focus/status detail only; never a large field. |

Strong text on the base surface is well above WCAG AAA. Medium and quiet roles
must not carry essential small text without a contrast check. Visible orange
is prohibited.

## Layers

Use named z-index bands:

- `--z-base: 0` for section surface;
- `--z-content: 2` for ordinary section content;
- `--z-local-overlay: 5` for a section-owned transition or pointer;
- `--z-chrome: 100` for Header and global controls;
- `--z-menu: 200` for navigation overlay;
- `--z-modal: 1000` for true dialogs.

Never solve a local collision with an arbitrary four- or five-digit value.
`isolation: isolate` should keep section scenes inside the local band.

## Responsive strategy

- Below `640px`: six-column/single-column composition, 20–24px physical edge,
  shorter labels, ordinary flow whenever a pinned scene would harm reading.
- `641–900px`: tablet reflow; type continues fluidly and large asymmetric
  spans may collapse.
- `901–1100px`: compact desktop; keep desktop semantics but reduce stage size.
- Above `1100px`: full 12-column composition.

Breakpoints are selected when structure changes. Size-only adjustments should
normally be expressed through `clamp()`. Desktop and mobile must expose the
same text, links and order even when their motion implementation differs.

## Motion vocabulary

Use `--ease-standard: cubic-bezier(.22,1,.36,1)` for normal settling and
`--ease-out-expo: cubic-bezier(.16,1,.3,1)` for decisive entrances. Durations
are `200ms`, `300ms` and `500ms`; editorial GSAP reveals may extend to
`0.8–1.2s` when the scroll trigger supplies the pace. These are generic motion
primitives. Exact stagger, scrub and section timing are local choreography and
must be documented in the relevant section contract.

Reduced motion exposes the final layout immediately. No important text or link
may depend on JavaScript, SplitText or a canvas. Smooth scrolling may coordinate
with ScrollTrigger, but it is infrastructure rather than visual identity.

## Implementation contract

1. Add or change a role in `src/styles/tokens.css` first.
2. Explain identity-bearing changes here.
3. Consume the source-matched semantic roles in section CSS; do not create a
   second local type scale.
4. Preserve no-JS reading, reduced motion, keyboard focus and touch targets.
5. Validate at 390, 768, 1024 and 1440px before accepting a new role.
6. New background art, fonts or third-party assets require explicit approval.

The current Intro is the first complete consumer of the statement, meta, lead,
grid, spacing and text-action roles. New sections should reuse those roles or
justify a genuinely new one.
