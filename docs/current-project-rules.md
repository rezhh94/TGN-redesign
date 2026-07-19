# Current project rules

Last reconciled: 2026-07-19.

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

Trionn is the principal construction reference. Approach its composition,
rhythm, responsive strategy and motion craft as closely as useful through a
clean-room Tigon implementation. Do not copy its code, fonts, assets, shaders,
content or identity-bearing combinations.

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

Do not import legacy project CSS/JS, third-party reference code, fonts, media or
assets. Do not introduce visible orange. Do not commit or push unless asked.

## Mounted section state, not preservation targets

- Intro currently uses an editorial statement, character fill and line/plus.
- Tjenester currently uses five complete service links in a bounded pinned
  desktop panel sequence with a permanent paper information field, alternating
  media fields, one five-band handoff and normal-flow touch, reduced-motion and
  no-JS fallbacks.
- `OutcomeTensionBridge` currently connects Tjenester and Effekt.
- Effekt currently presents `FUNNET / FORSTÅTT / VALGT / MÅLT`.
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
- Global Lenis is the sole desktop scroll transport. Touch, through 768px and
  reduced motion use native scroll unless a later architecture decision
  explicitly replaces it.
- Motion never compensates for weak composition or hides critical content.

## Git discipline

Preserve unrelated worktree changes and stage exact files only. Never
reconstruct deleted directions from Git history unless the user explicitly
requests a rollback. Commit or push only after explicit instruction.
