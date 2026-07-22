# Current project rules

Last reconciled: 2026-07-22.

Read `docs/project-continuation-context.md`, `docs/current-homepage-state.md`,
`design.md`, the relevant section contract and `docs/remaining-work.md` before
changing a section.

## Direction and token authority

Tigon is editorial, restrained, typographic, confident, near-monochrome and
custom. It must not become SaaS, dashboard, SEO portal, generic agency template
or an effects demo.

`design.md` defines the design logic. `src/styles/tokens.css` is the executable
token source. Components consume semantic type, spacing, surface, line, button
and layer roles; section-local design systems are not allowed.

The source-matched mapping is authoritative: Familjen Grotesk owns H1-H4,
large display, title labels, menu and marquee; PP Neue Montreal is the legal
Neue Haas substitute for reading copy; Martian Mono Standard Light owns button
text and explicitly technical microcopy; PP Editorial New Ultralight is
reserved for explicit serif accents. All faces load locally through
`next/font/local`.

Trionn is the principal construction reference. Approach its composition,
rhythm, responsive strategy and motion craft as closely as useful. Verified
Trionn-authored public code, shader logic and exact values may be copied or
adapted when they materially fit; use only first-party modules identified by
the local evidence README and never import a whole bundle or its co-located
third-party/runtime code. The source-verified Trionn type sizes, leading,
tracking and responsive `--size` breakpoints are approved 1:1 through the
isolated `--trionn-type-size` token system. This must not change the document
root or non-type rem spacing. Use the Tigon font roles unless the exact source
family is legally available. Exact Familjen Grotesk Regular and Medium, and
Martian Mono Standard Light files come only from their official open-source
repositories;
PP Neue Montreal and PP Editorial New come only from the user's licensed
Pangram library. No font binary may be copied from the reference mirror. Do not
copy its images, video, audio, logos, content or
identity-bearing combinations. The approved neutral paper-text calibration
(`#434343` and `#272727`) remains isolated in semantic `--paper-text-*` tokens.

## Full visual redesign freedom

No homepage section is visually protected, safe, frozen or permanently
approved. Header, Hero, Intro, Tjenester, handoffs, Effekt, Arbeid, Prosess,
System and Footer may all be redesigned. Mounted components and section docs
describe the current state only; they are not instructions to preserve layout,
styling or motion.

An individual task remains scoped to what the user asks. Full-page freedom does
not mean unrelated sections should change opportunistically.

## Non-visual and semantic boundaries

Do not change without explicit scope:

- SEO metadata, schema, sitemap, robots, canonical, URLs or slugs;
- factual NAP values;
- established link destinations or routes;
- unrelated uncommitted work.

Important text and links remain server-rendered and accessible. `04 / Arbeid`
permanently stays future-facing capability rather than a portfolio or list of
websites Tigon has built. Its layout, component architecture, interaction and
motion are nevertheless fully redesignable.

Do not import legacy project CSS/JS, reference-only fonts/media/assets or
third-party/runtime code found inside a reference bundle. The verified
Trionn-first-party code exception above does not allow its font binaries or
identity assets. The approved font sources above are the only allowed font
binary sources.
Do not introduce visible orange. Do not commit or push unless asked.

## Mounted section state, not preservation targets

- Intro currently uses an editorial statement, character fill and line/plus,
  followed by a three-card Key Facts-calibrated system prelude, continuous Tigon-word
  marquee and responsive paper shutter into Tjenester. The prelude adds no
  transition labels. Its mobile card row uses Trionn's verified pinned,
  vertical-scroll-driven horizontal branch.
- Tjenester currently uses five complete service links in a bounded pinned
  desktop panel sequence with a permanent paper information field, alternating
  media fields, one five-band handoff, a pinned tablet branch from 768px and
  normal-flow phone, reduced-motion and no-JS fallbacks.
- Effekt currently follows Tjenester through the connected paper-plane exit.
  It adapts Trionn `/about`'s verified `Our values` Paperfold construction to
  Tigon's result system. The light editorial field holds the semantic heading
  and four folding cards for `FUNNET`, `FORSTÅTT`, `VALGT` and `MÅLT`. It uses
  no image, video, particles, Three.js, icon drawing or decorative object.
- Arbeid currently uses six future-facing capability links in `WorkProof`.
- Prosess currently presents Retning, Bygg and Live.
- System currently closes into Footer.

Any of these visual or motion constructions may be replaced in a redesign. The
brand meaning, factual claims, accessibility and verified routes remain the
acceptance criteria. The permanent capability-only rule for 04 / Arbeid cannot
be reinterpreted as past-work portfolio framing during redesign.

## Motion and access

- Important text and links remain server-rendered and readable without JS.
- Respect reduced motion, touch, keyboard and mobile use.
- Scope GSAP to one section or handoff owner; avoid global kills, duplicate
  triggers and captured scrolling.
- Global Lenis is the sole scroll transport on non-reduced desktop and touch.
  Reduced motion uses native scroll. Tjenester keeps a structural phone branch
  below 768px even while Lenis and ScrollTrigger share the same clock.
- Motion never compensates for weak composition or hides critical content.

## Git discipline

Preserve unrelated worktree changes and stage exact files only. Never
reconstruct deleted directions from Git history unless the user explicitly
requests a rollback. Commit or push only after explicit instruction.
