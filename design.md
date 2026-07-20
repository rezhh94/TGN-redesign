# Tigon design system

Status: canonical design and token authority for the mounted homepage.

`src/styles/tokens.css` is the executable source. This document explains the
roles, boundaries and reasons behind those values. Section CSS consumes roles;
it must not introduce a competing local scale.

## Direction

Tigon is editorial, restrained, typographic, confident and near-monochrome.
The hierarchy should feel constructed rather than decorated: strong type,
precise grids, deliberate negative space and a small number of motion ideas.

The Trionn analysis is used as construction calibration only. Its useful,
generic principles are role-based typography, 12-column composition, tight
display leading, real HTML above optional visual layers and structural mobile
branches. Its fonts, site-wide root scaling, colour signature, assets, shaders,
preloader and dense pin architecture are reference identity and are rejected.

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
| ADAPT | Tight, near-equal display levels | Use TGS Perfect with Tigon-specific clamps and less extreme compression. |
| ADAPT | Mono system labels and buttons | Use Caleb Mono with readable tracking and 13–14px labels. |
| ADAPT | 24/40px reference gutters | Use a fluid 24–48px Tigon gutter and a 16–24px grid gap. |
| REJECT | Reference fonts, assets and site-wide root scaling | Never import them or let paper calibration alter the rest of Tigon. |
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
| `--font-display` | TGS Perfect | short display titles and monumental words | Condensed weight creates scale without consuming excessive width. |
| `--font-editorial` / `--font-sans` | JUST Sans | statements, headings and body | Neutral, humane reading voice balances the display face. |
| `--font-meta` / `--font-mono` | Caleb Mono | labels, metadata and actions | Creates a precise system register distinct from editorial copy. |
| `--font-paper` | Switzer | titles, explanations, labels and rows on light information fields | A user-approved neutral neo-grotesk with proportions closer to the intended paper hierarchy; it is deliberately not the site-wide editorial voice. |

Use weights `400`, `500`, `600` and `700` only. Sentence-case editorial and
paper information text normally use `400`; display uses `700`; Caleb Mono
controls use its real `400` face. Never synthesize a weight that is not
supplied by a real font file.

### Scale logic

This is deliberately not a 1.25 or 1.333 modular scale. Like strong editorial
sites, it uses optical roles. The fluid display variants sit close together;
their hierarchy comes from context, family and composition. At maximum size,
`display-2xl / display-xl = 100 / 88 = 1.136`, while `heading-lg / body-md =
36 / 18 = 2`. This preserves useful differentiation without creating a ladder
of nearly redundant tokens.

| Role | Executable value | Why | Boundary |
| --- | --- | --- | --- |
| Display hero | `clamp(72px, 8.4vw, 144px)` / `.84` / `-.02em` | Wide brand statements need stronger scale but a less extreme ceiling than the earlier oversized system. | Tigon identity value; calibrate per composition. |
| Display 2XL | `clamp(60px, 6.6vw, 100px)` / `.88` / `-.018em` | Covers primary chapter titles in the same visual league as the reference without copying its formula. | Tigon identity value. |
| Display XL | `clamp(48px, 6.1vw, 88px)` / `.9` / `-.016em` | A near-peer optical variant for secondary monumental titles. | Tigon identity value. |
| Display LG | `clamp(32px, 2.5vw, 40px)` / `.96` | Compact display for panels and capability names. | Generic role, Tigon calibration. |
| Display MD | `clamp(24px, 2vw, 32px)` / `1` | Lowest display level before editorial headings take over. | Generic. |
| Statement | `clamp(36px, 4.45vw, 88px)` / `1.02` / `-.035em` | Long editorial sentences need a larger minimum leading and controlled width; this is not a short display title. | Tigon Intro identity value. |
| Heading LG | `clamp(28px, 2.5vw, 36px)` / `1.08` | Clear section subhead without competing with display. | Generic. |
| Heading MD | `clamp(22px, 1.8vw, 28px)` / `1.12` | Stable content-heading role. | Generic. |
| Heading SM | `18px` / `1.2` | Smallest true heading; below this use meta. | Generic. |
| Lead LG | `clamp(18px, 1.35vw, 22px)` / `1.42` | Large explanatory copy with comfortable measure. | Generic. |
| Lead MD | `clamp(17px, 1.2vw, 20px)` / `1.45` | Default section lead. | Generic. |
| Lead SM | `clamp(15px, 1vw, 17px)` / `1.5` | Compact supporting prose. | Generic. |
| Body LG | `clamp(18px, 1.25vw, 20px)` / `1.55` | Long-form emphasis. | Generic. |
| Body MD | `clamp(16px, 1.1vw, 18px)` / `1.55` | Default body; never below 16px at standard zoom. | Generic accessibility baseline. |
| Body SM | `clamp(14px, 1vw, 16px)` / `1.5` | Secondary copy, not dense paragraphs. | Generic. |
| Body XS | `clamp(12px, .9vw, 14px)` / `1.4` | Captions and legal copy only. | Generic. |
| Paper heading | verified paper scale / `1` / `-.04em` / `400` | Calm sentence-case information title, calibrated as a complete role rather than enlarged with a generic heading clamp. | Shared light-surface role. |
| Paper copy | verified paper scale / `1.22` / normal tracking / `400` | Short explanatory copy on a light information field. | Shared light-surface role. |
| Paper row | verified paper scale / `1.2` / normal tracking / `400` | Scan-friendly capability or specification rows with a neutral Roman texture. | Shared light-surface role. |
| Paper label | verified paper scale / `1` / `-.02em` / `400` | Uppercase grouping label without switching to a decorative mono register. | Shared light-surface role. |
| Meta LG | `clamp(14px, 1.1vw, 16px)` / `1.25` | Prominent system label. | Generic. |
| Meta MD | `clamp(12px, .95vw, 14px)` / `1.3` | Default eyebrow and metadata. | Generic. |
| Meta SM | `clamp(10px, .8vw, 12px)` / `1.35` | Microcopy only; avoid for important actions. | Generic. |

The tuple in each row is size / line-height / optional tracking. Display and
statement tracking are identity-bearing; use them only through tokens. Meta
tracking is `0.04em` because Caleb Mono remains clearer than the reference's
strong negative tracking.

The four `type-paper-*` roles are one complete information hierarchy, not a
Tjenester-only scale. All four use Switzer Regular from Fontshare's official
web-font endpoint. Switzer is a user-approved Tigon paper voice, not a Trionn
font or a new site-wide default. The roles are consumed through
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
`--paper-text-*`; family remains Tigon's approved Switzer. This isolation is
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
| Label | `clamp(13px, .95vw, 14px)`, line `1`, tracking `-.04em`, weight `400` | Uses Caleb Mono's real face and remains more legible than the reference's `-.06em`. |
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
3. Consume semantic roles in section CSS; do not paste reference values.
4. Preserve no-JS reading, reduced motion, keyboard focus and touch targets.
5. Validate at 390, 768, 1024 and 1440px before accepting a new role.
6. New background art, fonts or third-party assets require explicit approval.

The current Intro is the first complete consumer of the statement, meta, lead,
grid, spacing and text-action roles. New sections should reuse those roles or
justify a genuinely new one.
