# Tigon homepage — canonical design handbook

Status: active design authority, reconciled 2026-07-18.

This is the first design document to read for every homepage design task. It
defines the shared visual language, token authority, reference boundaries,
motion vocabulary and change discipline from 01 / Intro through 06 / System.
It does not replace current-state, Git-boundary or section-specific contracts.

## Source-of-truth hierarchy

Use the narrowest applicable source. When two documents disagree, mounted
source wins for what exists, while the hierarchy below governs the next change:

1. `AGENTS.md` and the user's current instruction — scope and preservation.
2. `docs/project-continuation-context.md` — Git and dirty-worktree boundary.
3. `docs/current-homepage-state.md` and `docs/current-project-rules.md` — what
   is mounted and which execution boundaries are active.
4. `docs/tigon-brand-platform.md` — canonical brand meaning and copy test.
5. This file — shared visual language and design decisions.
6. `src/styles/tokens.css` — actual implemented token values.
7. `docs/sections/*.md` — local composition, content and motion contract.
8. `docs/homepage-dark-design-contract.md` — detailed dark-homepage recipes.

Do not duplicate token values in a component or section document when a
semantic role already exists in `tokens.css`. Documentation describes intent;
the stylesheet remains the value authority.

## Design objective

Tigon is a premium digital studio. The homepage should feel editorial,
restrained, typographic, confident, spacious, near-monochrome and authored.

The page is one dark environment with changing focus, not a stack of identical
black sections and not a collection of unrelated effect demos. Continuity
comes from typography, semantic surfaces, gutters, grid, line roles and motion
grammar. Variation comes from composition, density, media, light and pacing.

The brand promise is `BYGD FOR Å BLI VALGT.` The visual concept is
`SELECTION / FOCUS / DISTINCTION`. Demonstrate both through hierarchy,
precision and clarity; do not repeat `VALGT` as decoration.

## Reference translation: NuDot to Tigon

NuDot is a measured reference for connected page flow, near-black depth,
typographic scale, asymmetry, media focus and transition handoffs. It is not a
template, dependency or source of Tigon identity.

Evidence captured from `https://nudot.com.tw/` on 2026-07-18:

- `SOURCE`: desktop and mobile screenshots, scroll states, DOM/computed styles,
  37 root CSS variables and public runtime signals.
- `SOURCE`: GSAP, ScrollTrigger, Lenis, Three.js, Flip, ScrambleText, video,
  canvas, sticky and clip-path mechanics are present on the live homepage.
- `SOURCE`: desktop and mobile use materially different choreography.
- `GUESS`: why a visual choice works and how it should be fitted to Tigon.

No compatible license for NuDot's production code or assets was verified. The
site states all rights reserved. Therefore:

- transfer principles and independently implement useful mechanics;
- keep Tigon copy, fonts, tokens, links and assets;
- do not import NuDot CSS, JavaScript, fonts, images, video, models or tracking;
- do not claim a fitted Tigon value is NuDot's original implementation.

### Transfer decisions

| Reference behavior | Decision | Tigon translation |
|---|---|---|
| Near-black depth with focused light | `KEEP` | Use semantic Tigon surface and atmosphere roles |
| Large display type against small metadata | `KEEP` | Use TGS Perfect / JUST Sans / Caleb Mono roles |
| One clear focal object per phase | `KEEP` | Give each section one dominant idea |
| Asymmetric editorial media placement | `ADAPT` | Use Tigon's 12/6-column grid and real content |
| Clip, reveal, settle, focus and handoff motion | `ADAPT` | Reimplement through section-scoped CSS/GSAP |
| Distinct compact/mobile choreography | `ADAPT` | Simplify motion while preserving the same content |
| Global Lenis and captured scroll | `REJECT` | Native scroll remains canonical |
| WebGL, canvas or video in every chapter | `REJECT` | Add only through a separate performance decision |
| Global decorative cursor and loader | `REJECT` | Keep the one functional Work cursor only |
| NuDot fonts, code and assets | `REJECT` | Rights and brand conflict |

## Shared design grammar

### Surfaces and colour

The canonical shared roles are:

- `surface-deep`: maximum depth and negative space;
- `surface-base`: standard dark chapter and continuous atmosphere;
- `surface-raised`: media or readable layer above base;
- `surface-focus`: temporary lift around selected content;
- `text-strong`, `text-medium`, `text-quiet`, `text-faint`;
- `line-subtle`, `line-default`, `line-strong`.

Use the corresponding `--surface-*`, `--text-*` and `--line-*` variables from
`tokens.css`. A focus surface is a state, not a new chapter colour. Visible
orange, decorative accent palettes and light SaaS cards are outside the active
direction.

Atmosphere may use restrained spotlight, vignette, veil, existing media and
the approved 03/04 grain layer. Same system does not mean the same background
recipe in every section.

### Typography

- TGS Perfect: brand and display moments.
- JUST Sans: editorial statement, lead and body copy.
- Caleb Mono: labels, numbering, system notes and metadata.
- Shared roles: `display-*`, `lead-*`, `body-*` and `meta-*`.
- Visible `meta-sm` never computes below 10 px.

Scale contrast matters more than copying another site's font sizes. Avoid
using the same condensed display composition in adjacent sections. Intro's
scoped Typekit kit `upd0woi` is the sole documented font exception and must not
spread beyond `.approach-bridge`.

### Grid and rhythm

- One shared content limit: `--page-max`.
- One shared body gutter: `--homepage-gutter` / `--gutter`.
- Desktop uses 12 columns; compact/mobile uses 6 where appropriate.
- Shared rhythm roles: section intro, content block and section exit.
- Use whitespace to establish hierarchy, not identical padding everywhere.
- Ordinary content remains in document flow. Sticky height belongs to the
  component or transition that owns it.

Intro's local `--page-padding` and `pos-*` placement are a namespaced exception,
not global grid tokens.

### Lines, media and shape

- Lines organize editorial reading and focus; they must not form a card grid.
- Media is near-monochrome unless meaning requires colour.
- Use restrained corners and `surface-raised` where edge definition is needed.
- Clip and scale reveals introduce media; they are not applied to every image.
- Avoid decorative browser mockups, dashboards and generic device-card walls.
- No new external media, shader or canvas without an explicit asset decision.

### Interaction

- Hover and focus may change line strength, contrast, crop or a small offset.
- Keyboard focus must remain visible.
- Touch retains visible actions and never depends on hover.
- Important links remain real anchors with established hrefs.
- The Dynamic Text Cursor is restricted to the six clickable Work surfaces.

## Motion vocabulary

Use a small shared vocabulary. The words describe a role, not one universal
timeline:

| Role | Meaning | Typical implementation |
|---|---|---|
| `reveal` | Introduce information | line/word mask, opacity or clip |
| `settle` | Move into a precise final position | small x/y offset and fade |
| `focus` | Prioritise one object | light, contrast, crop or restrained scale |
| `handoff` | Transfer atmosphere to the next chapter | veil, surface or media state |
| `exit` | Reduce outgoing emphasis | fade, clip or small depth shift |

Rules:

- static composition must work before motion;
- important text and links remain server-rendered and readable without JS;
- each mechanic has one section or journey owner and explicit cleanup;
- scope GSAP and ScrollTrigger to that owner;
- native scroll is canonical;
- avoid master pins, global trigger kills, duplicate triggers and blurry text;
- desktop, compact/touch, reduced-motion and no-JS states are defined together;
- motion must clarify hierarchy and never compensate for weak layout.

Do not create a global duration/easing token merely to make unrelated motion
identical. Repeated CSS motion values may become tokens only after two real
consumers share the same semantic role. GSAP scrub distances remain local to
the owning journey and are documented in its section contract.

## Token governance

### Canonical vocabulary for new work

New or redesigned homepage code should prefer:

- `--surface-*` over `--ink-*` or section-specific canvas names;
- `--text-*` over `--on-dark-*` or one-off text opacity;
- `--line-*` over one-off white `rgba()` borders;
- `--type-*` over local display/lead/meta clamps;
- `--homepage-gutter` and named section rhythm over repeated padding values;
- `--radius`, `--radius-fine` and `--radius-chrome` by semantic shape role.

### Legacy aliases

`--ink-*`, `--on-dark-*`, `--color-on-dark`, `--tigon-canvas-*` and older
`--fz-*` primitives still support mounted code. They are not authorization for
a global cleanup. When a section is explicitly opened:

1. preserve its composition and fallback states;
2. replace a legacy alias only where the active task already touches it;
3. verify the rendered value remains intentional;
4. leave unrelated consumers unchanged.

Do not create a second semantic token with the same meaning. If a reusable role
is genuinely missing, define it once in `tokens.css`, document its purpose here
and migrate only the approved scope.

### Exceptions

Reference-specific layout variables, effect parameters and asset controls stay
namespaced to their owner. An exception must record:

- owner and scope;
- why the shared token cannot express it;
- desktop, mobile/touch, reduced-motion and no-JS behavior;
- cleanup and rights boundary when external inspiration is involved.

## Homepage journey and section roles

1. Protected Header/Hero establishes the offer.
2. Intro explains integrated practice through stable foreground and a
   decorative term stream.
3. Tjenester makes five deliverables concrete and scannable through an
   editorial service journey.
4. `OutcomeTensionBridge` connects launch to understanding and action.
5. Effekt owns `FUNNET / FORSTÅTT / VALGT / MÅLT`.
6. Arbeid shows future-facing capability, never previous-client portfolio.
7. Prosess explains Retning, Bygg and Live.
8. System closes the body journey quietly.
9. The protected Kontakt/footer closes commercially and factually.

Adjacent sections should not share the same combination of layout archetype,
tonal value and motion role. A new section must strengthen the connected
journey rather than add an isolated showpiece.

## Section authority

| Scope | Active contract | Current design role |
|---|---|---|
| Header/Hero | protected source and project rules | establish offer; unchanged |
| 01 / Intro | `docs/sections/01-approach.md` and Appendix A below | Flip/scramble term stream with stable foreground |
| 02 / Tjenester | `docs/sections/02-services.md` | editorial service chapters; next design gate |
| 02 → 03 | mounted `OutcomeTensionBridge` contract | typographic handoff |
| 03 / Effekt | `docs/sections/03-effect.md` | measurable result system and focus |
| 04 / Arbeid | `docs/sections/04-work-proof.md` | future-facing capability archive |
| 05 / Prosess | `docs/sections/05-process.md` | dark three-phase system map |
| 06 / System | `docs/sections/06-manifest.md` | quiet assembly and conclusion |
| Kontakt/footer | protected contact/footer contract | factual commercial close |

The Tjenester composition is not redesigned by this documentation pass. User
proposals must be evaluated against this handbook and its active section
contract before source changes begin.

## Change protocol

For every future section task:

1. Read the continuity/state/rules documents, then this handbook and the
   relevant section contract.
2. Inspect mounted source and the exact dirty diff.
3. Describe the static composition and the section's place in the journey.
4. Map every new style decision to an existing semantic token or document a
   scoped exception.
5. Define desktop, compact/touch, reduced-motion and no-JS states.
6. Implement only the named section and minimum handoff it owns.
7. Verify at 1440, 1024, 900, 768 and 390 px as relevant, including reverse,
   resize, keyboard, refresh and deep-link behavior.
8. Run typecheck, production build and `git diff --check` for source changes.
9. Reconcile mounted-state and section documentation after approval.
10. Commit or push only when the user explicitly requests it.

Decision test:

- Does it support found, understood, chosen or measured?
- Does it express integrated design, technology and visibility?
- Is the hierarchy clear without motion?
- Does it reuse the canonical design vocabulary?
- Does it remain premium, editorial, restrained and near-monochrome?
- Is it complete on mobile, touch, reduced motion and without JS?
- Does it avoid rights, performance and repetition risks?

If not, the idea is not ready to enter the system.

---

## Appendix A — approved 01 / Intro contract

Status: active and approved, reconciled 2026-07-18.

Implemented in commit `e4dbba7` on `codex/work-services-accordion`. Active
owners are `ApproachStatementBridge.tsx`, `approach-statement-bridge.css` and
`introStoryScene` in `HomeMotion.tsx`.

### Scope

Only `01 / Tilnærming`. Header/Hero, `03 / Effekt`, `04 / Arbeid` and all other
sections remain outside the Intro contract.

### Reference contract

Intro uses the motion architecture from Codrops `ScrollTextMotion`:

- the original `logo`, `content`, `group` and `el` structure;
- short Tigon terms about design, technology, visibility and digital products;
- the original Typekit kit `upd0woi`;
- the original position classes `pos-1` through `pos-10`;
- the original opacity, blur, spacing and sticky/fixed composition;
- the same GSAP Flip states, ScrollTrigger start/end, scrub and easing;
- the same ScrambleText configuration;
- no XL pixel letters or abstract demo copy.

### Stable Tigon foreground

- title: `BYGD SAMMEN`;
- the existing integrated-practice description, unchanged;
- `TGN / integrated practice`;
- no scramble, Flip, fade or scroll transformation on the main message;
- Codrops elements retain their movement and scramble in the background;
- no frame, background surface, card or backdrop blur;
- every background word is measured against the foreground rectangle and fades
  before collision, without a visible mask;
- a soft text shadow may improve readability without changing the surface.

### Atmosphere from 04 / Arbeid

- reuse `/video/work-wave-loop.mp4`;
- use the approved grayscale, contrast, brightness and video opacity recipe;
- use the same spotlight gradients and vignette;
- keep Intro namespacing and section-scoped playback;
- disable video on mobile and with reduced motion;
- do not add the 03/04 grain layer to Intro.

The demo's visible frame line is removed. The main message is visible from the
first Intro viewport without a separate JS activation point or empty waiting
surface. The background stream starts in that viewport with `72vh` top space,
not the demo's full `100vh`.

CSS stays under `.approach-bridge` so reference rules cannot leak into the
homepage. Intro's higher stacking layer may cover the ordinary Tigon header
while the section is in view without changing Header code.

### Accessibility

- The complete Tigon statement is a server-rendered `h2`.
- The term stream is decorative for screen readers.
- Existing prose lives in the stable centre layer.
- The server-rendered handoff remains after the stream.
- Reduced motion keeps all important text without transformation.

### Reference and licence

Based on [`codrops/ScrollTextMotion`](https://github.com/codrops/ScrollTextMotion).

MIT License

Copyright (c) 2009 - 2025 [Codrops](https://codrops.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
