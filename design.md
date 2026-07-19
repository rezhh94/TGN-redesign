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

No compatible license for NuDot's production code or general asset library was
verified. The site states all rights reserved. Therefore:

- transfer principles and independently implement useful mechanics;
- keep Tigon copy, fonts, tokens, links and assets;
- do not import NuDot CSS, JavaScript, fonts, images, models or tracking;
- do not claim a fitted Tigon value is NuDot's original implementation.

Historical asset exception, 2026-07-18: the user explicitly supplied
`wavebg.mp4` for the global homepage atmosphere. Its video-only fast-start
remux remains retained as `/video/work-wave-loop.mp4` for rollback, but is no
longer mounted. On 2026-07-19 it was superseded by the independently authored
Tigon focus-field loop at `/video/tigon-focus-field.mp4`, with reproducible
HyperFrames source under `videos/tigon-focus-field/`.

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
| User-supplied `wavebg.mp4` | `SUPERSEDED` | Retained rollback source; active atmosphere is Tigon-owned |
| Tigon focus-field loop | `KEEP` | Independently authored selection/focus/distinction atmosphere |
| Other NuDot fonts, code and assets | `REJECT` | Rights and brand conflict |

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

Atmosphere uses the Tigon focus-field loop, asymmetric light, deep vignette, dark
material texture, continuity veil and a two-scale film-grain field. From
`01 / Intro` through `04 / Arbeid`,
these are states of one global background owner, not separate section
backgrounds that happen to use the same recipe.

### Global homepage atmosphere — non-negotiable

The visual journey from `01 / Intro` through `02 / Tjenester`, `03 / Effekt`
and `04 / Arbeid` must read as one uninterrupted environment. NuDot is the
flow reference: chapters may change composition and focal point, but the page
must not reveal a flat black reset, empty background hold or hard canvas seam
between them.

- One persistent atmosphere owner spans Intro through Arbeid and owns the
  shared wave, poster, spotlight, vignette, material, veil and film grain.
- Intro, Tjenester, Effekt and Arbeid own content and local choreography. Their
  root section surfaces remain transparent above the global atmosphere.
- The atmosphere changes through named states such as `intro-focus`,
  `intro-services-handoff`, `services-focus`, `services-effect-handoff`,
  `effect-focus`, `work-focus` and `exit`; it does not restart at section
  boundaries.
- Background continuity does not mean a frozen image. Light position,
  intensity, veil, media visibility and depth may evolve to support the active
  content while remaining recognizably the same visual field.
- Whitespace is allowed, but it must contain visible atmospheric life and must
  never be produced by stacked section exit/intro padding that reads as an
  accidental black gap.
- Full-section `surface-base`, video, spotlight or veil duplicates are not
  allowed inside these four sections after the global owner is mounted.
  `surface-raised` and `surface-focus` remain valid for local media and focus
  objects.
- Global atmosphere state values use shared semantic custom properties or one
  named configuration. Do not create unrelated per-section colour recipes.
- Desktop and compact/touch use the same 644×360 Tigon focus-field source. The
  small source and CSS texture tiles keep this to one inexpensive decoder and
  no animated canvas. Reduced motion and no-JS use the focus-field's static
  poster, the same vignette/light field and static grain without hiding or
  delaying important content.
- The global owner controls background lifecycle only. Flip, scramble,
  parallax, archive and content reveals remain scoped to their owning section
  with independent cleanup.
- The atmosphere releases after Arbeid into the established `04 → 05` depth
  transition; Header/Hero and the protected footer are outside this owner.

The global owner exposes one canonical state interface. These variables are
scoped to that owner and are implemented there rather than copied into section
styles:

| Role | Canonical custom property |
|---|---|
| base canvas | `--home-atmosphere-surface` |
| wave visibility | `--home-atmosphere-wave-opacity` |
| light position | `--home-atmosphere-light-x`, `--home-atmosphere-light-y` |
| light scale/intensity | `--home-atmosphere-light-scale`, `--home-atmosphere-light-opacity` |
| continuity veil | `--home-atmosphere-veil-opacity` |
| edge depth | `--home-atmosphere-vignette-opacity` |
| dark material texture | `--home-atmosphere-material-opacity` |
| shared film grain | `--home-atmosphere-grain-opacity` |

Named atmosphere states set this interface. Individual section styles may
request a named state, but may not set independent background colours, video
opacity or spotlight recipes.

### Global atmosphere material contract

The background is a material stack, not a gradient preset:

1. `surface-base` supplies the near-black canvas.
2. `/video/tigon-focus-field.mp4` supplies the slow blue-grey moving light.
3. The asymmetric spotlight adds only controlled off-axis lift.
4. The vignette creates deep edges and irregular black pockets.
5. A multiply-blended texture binds the wave and shadows into one surface.
6. The veil controls continuity and state handoff without resetting the canvas.
7. Two restrained tiled grain scales remain inside the background stack and
   below every chapter's text and media. Content must stay optically clean.

The mounted grain asset is `/atmosphere/film-grain.webp`. It is a small deterministic
local tile, not a viewport-sized JavaScript canvas. Both texture scales are
static across desktop, compact and reduced-motion states. Grain may texture the background light,
but must never render above text, links, navigation or local media. Do not
restore the former per-pixel 25 FPS canvas or multiply the effect inside
individual sections.

Mounted-source status: compliant. `HomeAtmosphere` is the single physical owner
from Intro through Arbeid. All four section roots are transparent; local Intro
and Tjenester backdrop/video copies remain removed. Desktop and mobile use one
wave/material field; reduced motion and no-JS retain its static poster and
grain material.

### Typography

- TGS Perfect: brand and display moments.
- JUST Sans: editorial statement, lead and body copy.
- Caleb Mono: labels, numbering, system notes and metadata.
- Shared roles: `display-*`, `lead-*`, `body-*` and `meta-*`.
- Visible `meta-sm` never computes below 10 px.

Scale contrast matters more than copying another site's font sizes. Avoid
using the same condensed display composition in adjacent sections. Intro uses
the same local TGS Perfect and Caleb Mono roles as the rest of the homepage;
the former render-blocking Typekit import is removed.

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
| 01 / Intro | `docs/sections/01-approach.md` and Appendix A below | Flip/scramble term stream with stable foreground above the global atmosphere |
| 02 / Tjenester | `docs/sections/02-services.md` | concise service prelude followed by a scroll-driven cube axis and responsive service chapters |
| 02 → 03 | mounted `OutcomeTensionBridge` contract | typographic handoff |
| 03 / Effekt | `docs/sections/03-effect.md` | measurable result system and focus |
| 04 / Arbeid | `docs/sections/04-work-proof.md` | future-facing capability archive |
| 05 / Prosess | `docs/sections/05-process.md` | dark three-phase system map |
| 06 / System | `docs/sections/06-manifest.md` | quiet assembly and conclusion |
| Kontakt/footer | protected contact/footer contract | factual commercial close |

The Tjenester composition below records the active implementation in the
current worktree. Future proposals must be evaluated against this handbook and
the narrower section contract before source changes begin.

### 02 / Tjenester composition contract

The active Tjenester direction combines Tigon's restrained NuDot-derived
language with a clean-room adaptation of the dual-wave motion architecture in
ValentinDBS' Codrops tutorial. It is a Tigon composition, not an imported demo:
the title stays moderate, the global atmosphere remains continuous and the
five real services become the moving material.

- one concise normal-flow prelude contains `Hva vi bygger` and the approved
  explanatory paragraph; it does not remain inside the scroll scene;
- desktop and 801–900 px place two opposing service streams around a sticky
  scroll-driven cube axis, with title/action left and details right;
- one global Tigon atmosphere physically shared with Intro, Effekt and Arbeid;
- JUST Sans service hierarchy, Caleb Mono metadata and no new font family;
- five complete server-rendered links with established content and hrefs;
- one section-scoped ScrollTrigger calculates sine-wave horizontal offsets,
  opposing lane direction and closest-to-center focus;
- one large CSS-3D cube maps the five existing Tigon service images to five
  faces; each face has a front-on rest around an extended centred 90-degree
  turn so adjacent image faces remain visible, without an artificial scale pulse;
- the cube uses a verified `5 × face size` perspective ratio and a centred
  perspective origin, preserving physical depth without the earlier aggressive
  tumble;
- the cube stage begins at one CSS-pixel scale but is optically hidden at the
  exact pre-scroll rest; it fades in across the first three percent of the
  entrance while cubic size growth and X/Y/Z rotation remain live from zero;
- the first three side-face transitions use controlled X pitch arcs
  (`-58deg / +48deg / -58deg` on wide desktop) so the full journey reveals
  top, bottom and side planes; a restrained alternating Z roll stays within
  `5–7deg`, and every added angle returns to zero at each front-on stop;
- compact/mobile reduce the compound-turn amplitude, while the final top-face
  transition keeps its required combined X/Y endpoint;
- the sixth/bottom face reuses an existing local service image so no empty face
  appears during the tumble and no new network asset is introduced;
- no cube-level counter is mounted; the service panels provide orientation;
- wide desktop draws faint active-panel focus registers toward the cube and
  moves both lanes one grid column inward without adding a backdrop or UI grid;
- no ScrollSmoother, external assets, separate image trigger or captured
  scrolling;
- through 800 px, the horizontal wave resolves to zero and each service becomes
  one complete full-width chapter beneath the sticky cube;
- the global `services-focus` state supplies stronger asymmetric light, wave,
  material/grain and reduced veil without creating a local section background;
- reduced-motion and no-JS use the prelude, first static image and a complete
  normal-flow ledger.

The reference repository was audited in full at source commit
`90dfeb2eec89dd6879cabf2e76f4e7096e515a8a`. Its reusable motion principles are
documented in `docs/sections/02-services.md`; its CSS, JS, fonts and assets are
not imported.

The exact local geometry and scroll distances belong to
`docs/sections/02-services.md` and `what-we-build.css`; they are not global
tokens.

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
- the original reference's display/mono role split, rebuilt with local Tigon
  fonts; its Typekit kit is not mounted;
- the original position classes `pos-1` through `pos-10`;
- the original opacity, blur, spacing and sticky/fixed composition;
- the same GSAP Flip states, ScrollTrigger start/end, scrub and easing;
- the same ScrambleText configuration;
- no XL pixel letters or abstract demo copy.

### Stable Tigon foreground

- title: `BYGD SAMMEN`;
- the existing integrated-practice description, unchanged;
- `TGN / integrated practice`;
- no scramble or Flip on the main message; only the complete foreground block
  owns a final scrubbed fade and 12 px lift during the 01→02 handoff;
- Codrops elements retain their movement and scramble in the background;
- no frame, background surface, card or backdrop blur;
- every background word is measured against the foreground rectangle and fades
  before collision, without a visible mask;
- a soft text shadow may improve readability without changing the surface.

### Global atmosphere

- reuse `/video/tigon-focus-field.mp4`;
- preserve the Tigon focus-field's blue-grey tone and its global contrast/brightness
  treatment;
- use the same asymmetric spotlight, deep vignette, material and veil;
- keep Intro content/motion namespacing while playback and background lifecycle
  belong to the global Intro-through-Arbeid atmosphere owner;
- mobile uses the same low-resolution wave with a compact crop;
- reduced motion and no-JS use the wave poster and static texture layers;
- use the shared global grain already owned by `HomeAtmosphere`; Intro does not
  create or tune its own grain layer.

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
