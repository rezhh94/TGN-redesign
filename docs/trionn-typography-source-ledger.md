# Trionn typography source ledger

Status: source-matched implementation, 2026-07-21.

This register is the no-guessing authority for the homepage type pass. The
values come from the local deployed Trionn mirror, not screenshot estimates.

## Evidence

- responsive root basis: `outputs/qa-trionn-animation-audit/evidence/homepage.pretty.css:4416-4452`
- root calculation and global text: `homepage.pretty.css:4538-4568`
- H1–H4 and body roles: `homepage.pretty.css:4570-4655`
- small, title, menu and button roles: `homepage.pretty.css:4656-4740`
- number and marquee roles: `homepage.pretty.css:4741-4768`
- actual source font faces: `homepage.pretty.css:5705-5790`
- Work opening class values: `outputs/qa-trionn-animation-audit/evidence/work-services.mixed.pretty.js:252`
- live services HTML verified 2026-07-21: `https://trionn.com/services`
- live CSS verified 2026-07-21:
  `https://trionn.com/_next/static/chunks/0sc3z3ff25230.css`

## Font sources and verified metadata

No reference font binary is copied from the Trionn mirror. The open-source
files were downloaded from the official project sources and preserved under
`/Users/reezy/Fonts/Approved Open Source/` before being copied into the repo.

| Tigon role | Exact source file | Internal family / style | OS/2 weight / width | Kind |
| --- | --- | --- | --- | --- |
| `--font-display` | `/Users/reezy/Fonts/Pangram Font Starter kite/PPF Fonts - v7.72/Neue Montreal v3.0 NEWLY ADDED/web/PPNeueMontreal-Regular.woff2` | PP Neue Montreal / Regular | `400` / normal `5` | static, no axes |
| `--font-display` | `/Users/reezy/Fonts/Pangram Font Starter kite/PPF Fonts - v7.72/Neue Montreal v3.0 NEWLY ADDED/web/PPNeueMontreal-Medium.woff2` | PP Neue Montreal / Medium | `500` / normal `5` | static, no axes |
| `--font-body` | `/Users/reezy/Fonts/Approved Open Source/Familjen Grotesk/FamiljenGrotesk-Regular.woff2` | Familjen Grotesk / Regular | `400` / normal `5` | static, no axes |
| `--font-body` | `/Users/reezy/Fonts/Approved Open Source/Familjen Grotesk/FamiljenGrotesk-Medium.woff2` | Familjen Grotesk / Medium | `500` / normal `5` | static, no axes |
| `--font-mono` | `/Users/reezy/Fonts/Approved Open Source/Martian Mono/MartianMono-StdLt.woff2` | Martian Mono / Std Lt | `300` / normal `5` | static, no axes |
| `--font-editorial` | `/Users/reezy/Fonts/Pangram Font Starter kite/PPF Fonts - v7.72/Editorial New/PPEditorialNew-Ultralight.woff2` | PP Editorial New / Ultralight | `200` / normal `5` | static, no axes |

Familjen Grotesk came from the official repository archive
`https://github.com/Familjen-Sthlm/Familjen-Grotesk/archive/refs/heads/master.zip`;
the selected paths are `fonts/webfonts/FamiljenGrotesk-Regular.woff2`,
`fonts/webfonts/FamiljenGrotesk-Medium.woff2` and `OFL.txt`. The official
Glyphs source declares the Medium instance as `weightClass = 500`; the chosen
webfont is static. Martian Mono came from the official latest release `v1.1.0` asset
`https://github.com/evilmartians/mono/releases/download/v1.1.0/martian-mono-1.1.0-woff2.zip`;
the selected static standard-width file is `MartianMono-StdLt.woff2`, and its
license came from
`https://raw.githubusercontent.com/evilmartians/mono/v1.1.0/OFL.txt`.

The repository contains only the six used WOFF2 files plus the two OFL files.
`OT Neue Montreal Squeezed`, Neue Montreal Mono, Hanken Grotesk and Azeret Mono
are excluded.

## Exact responsive basis

`--trionn-type-size` is `320` by default, then `360` at `440px`, `480` at
`640px`, `750` at `768px`, `850` at `1024px`, `1000` at `1280px`, `1180` at
`1441px` and `1280` at `1536px`.

Trionn changes the document root with `calc(1000vw / var(--size))`. Tigon uses
the mathematically equivalent `calc(Nvw / var(--trionn-type-size))` inside type
tokens only. Therefore a source value such as `3.75rem` becomes
`calc(3750vw / var(--trionn-type-size))`. Font pixels match the source while
all unrelated rem spacing remains unchanged.

## Exact roles

| Role | Size | Leading | Tracking |
| --- | --- | --- | --- |
| H1 | `clamp(3.75rem, 6.614vw, 6.25rem)` | `clamp(3.5rem, 5.952vw, 5.625rem)` | `-.06em` |
| H2 | `clamp(2.5rem, 6.283vw, 5.938rem)` | `clamp(2.2rem, 5.952vw, 5.625rem)` | `-.06em` |
| H2 big | `clamp(3.5rem, 6.349vw, 6rem)` | `clamp(3.25rem, 5.82vw, 5.5rem)` | `-.06em` |
| H3 | `1.75rem`; `2.25rem` at `1280px` | `1` | `-.04em` |
| H4 | `1.125rem` | `1.25rem` | `-.02em` |
| Document body | `1.25rem`; `1rem` at `1024px` | normal throughout | normal |
| Paragraph | `1.25rem`; `1.125rem` at `1024px`; `1.25rem` at `1536px` | normal throughout | normal |
| Small | `1.25rem`; `1.125rem` at `1024px`; `1rem` at `2000px` | normal throughout | normal |
| Title | `1.125rem`; `1.063rem` at `1024px`; `1.125rem` at `1536px`; `1rem` at `2000px` | `1` throughout | `-.02em` |
| Button | `1rem`; `.875rem` at `1024px` | normal throughout | `-.06em` |
| Menu | `3rem`; `1.25rem` at `768px` | `1.375rem` throughout | `-.04em` |
| Number small | `3.5rem` | `3.125rem` | `-.06em` |
| Numbers | `5.375rem` | `6.125rem` | `-.06em` |
| Marquee | `clamp(5rem, 9.164vw, 10rem)` | `.672` | `-.08em` |
| Work opening | `2.5rem`; `3rem` at `768px` | `1.1` | `-.025em` |

## Screenshot-to-source map

The eight supplied screenshots were matched to live or mirrored source
elements; no size was inferred from screenshot pixels:

1. About: `h2` = Familjen H2; `span.title` = Familjen Title; mission `p` =
   Neue Haas/PP Neue Montreal Paragraph.
2. Selected work: `h2.text-[2.5rem].md:text-5xl.font-medium.tracking-tight`
   = Familjen `2.5rem -> 3rem`, `1.1`, `500`, `-.025em`; CTA = Martian Button.
3. MyWorker AI: project title uses `.h3` Familjen; description uses `.small`
   Neue Haas/PP Neue Montreal; CTA uses Martian Button.
4. Services marquee: center words use `.mrquee-text` Familjen; upper and lower
   labels use Familjen Title; CTA uses Martian Button.
5. Website & Mobile Design card: title uses H3 Familjen; description uses
   Small Neue Haas/PP Neue Montreal.
6. Area of expertise: eyebrow uses Familjen Title; heading uses H1 Familjen.
7. Focused disciplines: heading uses H2 Familjen; both CTAs use Martian Button.
8. Service information panel: title overrides H2 with `2.5rem`, then `2.25rem`
   from `1280px`, `1`, `-.04em`; description uses Small Neue Haas/PP Neue
   Montreal; label uses Familjen Title; capability rows use Paragraph Neue
   Haas/PP Neue Montreal.

## Mounted Tigon mapping

- Trionn's real CSS maps H1-H4, Title, Menu, Number small and Marquee to
  Familjen Grotesk. Tigon uses the same family: Regular `400` generally and
  the real Medium `500` only for Work opening.
- Trionn maps document, paragraph and Small to Neue Haas Display Roman. Tigon
  maps those roles to licensed PP Neue Montreal Regular `400`.
- Trionn maps Button to Martian Mono Light and Numbers to PP Editorial New
  Ultralight. Tigon uses the exact approved equivalents.
- Hero uses H1 Familjen; supporting copy uses PP Neue Montreal; title labels
  use Familjen and text actions use Martian Mono.
- Intro, Effekt, Prosess and System chapter statements use H2. Tjenester uses
  the exact source Marquee role; panel and capability headings use H3;
  explanatory copy uses Paragraph or Small.
- Arbeid's opening statement uses the source Work opening role; its six
  capability names use H3.
- Prosess numerals use the exact Numbers role and the exact locally owned PP
  Editorial New Ultralight face.
- The open navigation uses the exact Menu role with Familjen Grotesk. Header
  controls use the source Title role with Familjen; true text actions use the
  Button role with Martian Mono Standard Light. Large
  Footer links use H2/H3 roles.

Section CSS may set measure, alignment and layout geometry. It may not replace
these font sizes, line heights, tracking values or responsive breakpoints with
local guesses.
