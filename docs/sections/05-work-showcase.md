# 05 / Work Showcase / Arbeid

Before coding this section, this contract must be approved.

## Section name

05 / Work Showcase / Arbeid

Visible label:
04 / Arbeid

Internal order:
This replaces the rejected Proof Ledger direction as the next planned visible section after What We Improve / Effekt. The visible section numbering on the page is 04 / Arbeid.

## Role in page journey

This section comes after 03 / Effekt.

After the first dark typographic sections, it should make Tigon's creative and technical capability tangible. It should show what Tigon can create, without becoming a history of previous client work.

## One idea

Tigon bygger digitale flater som både ser sterke ut og fungerer teknisk.

## Focal point

The first thing the user should notice is a dark editorial work showcase:
- a strong visual field
- one main visual / mockup
- one smaller detail visual / crop
- concise metadata and caption

The section should feel like a capability showcase, not a portfolio index or case-study section.

## Tone

Dark / near-black, editorial, premium and visual.

The section should feel more image-led and studio-like than Effekt, while staying restrained and not becoming a template portfolio grid.

## Layout archetype

Dark editorial work showcase.

Suggested static layout:
- dark / near-black background
- large calm editorial statement
- one large main visual / mockup
- one smaller detail visual / crop
- short metadata / caption
- generous spacing
- asymmetrical composition
- no portfolio grid
- no cards
- no icons

## Why this layout is different from the previous section

Effekt is a dark typographic outcome map.

This section should introduce visual capability:
- image / mockup presence instead of pure typography
- one editorial work moment instead of a list, ledger or grid
- visual quality and craft instead of outcome explanation
- darker studio-showcase pacing instead of proof-sheet or process structure

It must not become another services section, proof ledger, case grid, client list or generic portfolio block.

It must not depend on named previous projects or on matching a visitor's industry to an earlier Tigon customer. The content should help a visitor imagine the quality and range Tigon can create for them.

## Content

Visible label:
04 / Arbeid

Hovedstatement:
Visuelt sterkt.
Teknisk riktig.

Lead:
Nettsider, apper og digitale flater bygget med struktur, fart og tydelig retning.

Possible metadata:
01 / Webutvikling
Next.js / SEO / Måling / Struktur

Caption:
En digital flate skal ikke bare se bra ut. Den må være rask, forståelig og bygget for å bli valgt.

## Must include

- A visible label: 04 / Arbeid.
- Hovedstatement: Visuelt sterkt. Teknisk riktig.
- The lead copy exactly as approved.
- One large main visual / mockup in the later static build.
- One smaller detail visual / crop in the later static build.
- Short metadata / caption.
- Dark / near-black background.
- Premium editorial composition.
- A layout that works without motion.
- Real HTML text for all copy.
- Clear differentiation from Effekt.

## Must not include

- light / off-white background in the first build
- portfolio grid
- card grid
- cards
- fake case study KPI boxes
- fake metrics
- testimonials
- customer logos
- named previous projects or clients
- a list of websites Tigon has built
- industry-by-industry portfolio examples
- concepts presented as delivered client work
- demo image concepts, image generation or asset sourcing before the user explicitly opens the asset pass
- icons
- orange
- GSAP or motion in first build
- random AI images as a permanent solution
- old prototype imports
- imported old styles.css
- imported old signature.css
- imported old main.js

## Asset direction

The user is working on mockups and images for this section. Until those assets are supplied or the asset pass is explicitly reopened:

- reserve deliberate visual space without inventing its content
- do not propose or generate demo/placeholder imagery
- do not source mockups or define a new image concept
- do not present any concept surface as previous client work

## Motion plan

No motion in the first build.

Future motion ideas:
- headline line-mask reveal
- main visual clip reveal
- subtle image parallax
- metadata stagger

No pin in the first motion pass.

## Static acceptance criteria

- Seksjonen føles tydelig annerledes enn Effekt.
- Den viser Tigons capability uten å bli portfolio-grid eller caseoversikt.
- Den fungerer uten motion.
- Den føles premium, ikke template.
- Den bruker ekte HTML text.
- Den har ingen random images som permanent løsning.
- Ingen cards.
- Ingen orange.
- Ingen fake metrics.
- Ingen testimonials.
- Ingen kundelogoer.
- Ingen navngitte tidligere prosjekter eller kundelister.
- Ingen demo-/placeholder-bildekonsepter før brukeren åpner asset-passet.

## Files expected to change

For this contract pass:
- docs/sections/05-work-showcase.md

For a later static implementation, after approval:
- src/app/page.tsx
- src/app/layout.tsx if new CSS import is needed
- src/components/WorkShowcase.tsx
- src/styles/work-showcase.css

Do not touch Header, Hero, Approach, What We Build or What We Improve files unless explicitly approved.

## Validation

For this contract pass:
- git diff --check
- git status --short

For a later static implementation:
- npm run build
- npx tsc --noEmit
- git diff --check

Report:
- files changed
- what section was touched
- whether existing sections changed
- whether motion was added
- whether old CSS/JS was imported
- whether orange appears
