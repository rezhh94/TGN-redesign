# Forside-plan — fra «bra byrå-side» til awwwards-nivå

Grunnlag: live-gjennomgang av forsiden mot lamalama.com (2026-07-07), forankret i
`current-project-rules.md`, `motion-and-assets-roadmap.md` og `tokens.css`.

---

## Del 1 — Svakhetene (målt, ikke gjettet)

Forsiden er i dag en **kompetent, smakfull, restrained editorial-side** — men holdt tilbake fra
awwwards-craft av fire konkrete gap:

1. **Hero-panelet er tomt.** `hero__visual` er en bevisst gradient-placeholder («authored emptiness
   until real assets land»). Referansen har liv der du har et hull. **Størst effekt å fikse.**
2. **Dødt svart rom.** `what-build` (BYGGER) og `effect-bridge` har store tomme partier som leser
   «uferdig» i stedet for «bevisst luft».
3. **Nav-lesbarhet.** Mørkt glass-nav blir en gjørmete flekk over de lyse seksjonene (Prosess,
   Manifest), og kolliderer med overskrifter som scroller bak.
4. **To type-stemmer.** Titler = kondensert TGS-caps; bro/manifest-statements = humanistisk sans i
   normal case. Ikke ett bevisst system — leser som sprik.

Motion finnes allerede rikelig (scramble, bro-ignite, sticky-stack, parallax) — det er **ikke** et gap.

---

## Del 2 — Awwwards-baren (hva som faktisk kreves)

Awwwards Site of the Day belønner typisk:
- **Ett konsept** som gjennomsyrer alt (ikke pene seksjoner løst koblet).
- **Ett signatur-øyeblikk** — teknisk eller interaktivt — folk husker.
- **Feilfri craft:** responsiv, ytelse (60fps, rask LCP), tilgjengelighet, ingen placeholder.
- **Helhet:** type, farge, motion og rytme som ett system.

**Kritisk:** Tigon skal IKKE bli lamalama. lamalama vinner på *loudness* (cinematisk film, glitch).
Tigons regler forbyr det (near-monochrome, restrained, ingen heavy 3D/constant animation i hero).
Baren nås i **Tigons eget stramme språk** — samme finish, motsatt volum. Å kopiere loudness ville
brutt ditt eget system og lest som pastisj.

---

## Del 3 — Stegvis plan (rekkefølge = effekt-per-innsats)

| # | Steg | Hva | Filer | Modell (bygg) |
|---|------|-----|-------|---------------|
| 1 | **Hero blir levende** | Bytt tom placeholder → kuratert medie-veksling (ekte mockups/brand-crops) + subtil parallaks. Reduced-motion: ett statisk bilde. | `Hero.tsx`, `hero.css`, `HomeMotion.tsx`, `public/` | **Claude Opus 4.8** (bygg) + bilde-referanser fra ChatGPT/Claude image-skill |
| 2 | **Drep dødt rom** | Stram komposisjon i 02 (BYGGER) + broen så tomrom forsvinner. Ren layout. | `what-we-build.css`, `effect-bridge.css` | **Fable 5 (high)** eller Opus — mekanisk |
| 3 | **Adaptiv nav** | Nav bytter til lyst glass + mørk tekst over lyse seksjoner (ScrollTrigger-toggle). Tokens finnes. | `SiteHeader.tsx`, `nav.css`, `HomeMotion.tsx` | **Claude Opus 4.8** (logikk + grenser) |
| 4 | **Én type-stemme** | Bestem én stemme for statement-øyeblikkene; gjør bro+manifest konsekvente. | `effect-bridge.css`, `system-manifesto.css`, `typography.css` | **Opus** (bygg) + **GPT-5** som uavhengig smaks-stemme |
| 5 | **Art-direct overganger** | Ett bevisst overgangsmoment per dark↔lys-skifte (tonal wipe / linje-draw). | seksjons-CSS + `HomeMotion.tsx` | **Claude Opus 4.8** (motion) |
| 6 | **Ekte assets** | Erstatt gjenværende placeholdere (hero-reel, «SETT INN BILDE»). Én hovedvisual + ett detalj-crop per case. | `WorkProof.tsx`, `WhatWeBuild.tsx`, `public/work/` | **ChatGPT bildegen** eller **Claude imagegen-frontend-web-skill** |
| 7 | **Verifiser signatur-motion** | Bekreft at bro-igniten leser tydelig; ikke legg til flere. | — | **Fable 5 (low)** review |

**Anbefalt rekkefølge:** 1 → 3 → 4 → 2 → 5 → 6 → 7. Fase 1 alene lukker ~60 % av opplevd gap.

Hver fase: bekreft statisk layout → scoped motion-pass → reduced-motion/no-JS-fallback →
build/typecheck → review i browser. (Fra `motion-and-assets-roadmap.md`.)

---

## Del 4 — Modell-routing (Claude + ChatGPT)

Ruter etter **rolle**, ikke etter vane. Kartlegg navnene til det som er nyest når du kjører.

| Rolle | Beste modell | Hvorfor |
|-------|-------------|---------|
| **Bygge kode** (motion, WebGL, CSS, nav-logikk) | **Claude Opus 4.8** i Claude Code | Har repoet, verktøyene og preview. Hjemmebane. Executor for alt i Del 3. |
| **Billig review / sjekkliste / copy** | **Fable 5 (low)** via `/forside-review` | Billig dømmekraft mot rubrikken. Ikke til bygging. |
| **Uavhengig andre-stemme / smakskritikk** | **GPT-5 (Thinking)** | Verdien er å stå *utenfor* Claude-ekkokammeret — fanger ting jeg overser (særlig type-stemme, Fase 4). |
| **Awwwards-trend-research** («hva vinner nå») | **ChatGPT med browsing** eller Claude web-search | Trenger ferskt web-innsyn — ikke treningsdata. |
| **Bilde-referanser / mockups / hero-medie** | **ChatGPT bildegen (GPT-4o)** *eller* Claude `imagegen-frontend-web`-skill | Sterk bildegenerering. Bruk det du liker best; begge duger. |
| **Tung reasoning-bygg** (hvis Opus står fast) | **Fable 5 (high)** eller GPT-5 Thinking | Ekstra dybde på et vanskelig enkelt-problem. |

**Kjerneprinsipp:** *Claude Opus bygger. Fable-low dømmer billig. GPT-5 gir uavhengig blikk. ChatGPT/Claude-skill lager bilder.*

---

## Bruk
- Billig løpende kontroll under bygging: `/forside-review` (Fable-low, leser `forside-rubrikk.md`).
- Denne fila = strategien. Oppdater Del 1/3 når faser fullføres.
