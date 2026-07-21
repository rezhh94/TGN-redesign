# Tigon Animation Charter

v1 er de etablerte motion-reglene i `docs/current-project-rules.md` og
seksjonskontraktene (`docs/sections/*.md`). Dette dokumentet samler
**v2-tillegget** — fire regler vedtatt 2026-07-19, formulert som Tigons egne
regler og nå kryssjekket mot
`TRIONN-HOMEPAGE-ANIMATION-BREAKDOWN.md`/`DESIGN-TRIONN.md`. Ved konflikt
vinner nyere seksjonskontrakter.

## v2-regler

### 1. Retningsregelen (inn/ut-asymmetri)

Elementer **ankommer** med out-familie (`power2–4.out`, `expo.out`) og
**forlater** med in-familie (`power2–3.in`). Scrubbet bevegelse bruker
symmetrisk inOut eller `none`. Overshoot (`back`, `elastic`) er forbudt som
språk og tillatt som bevisst unntak maks ett sted per side.

### 2. Dempingsstigen

Ett dempingslag per bevegelse, aldri to. Lenis (lerp 0.095, jf.
`docs/adr-global-lenis.md`) er alltid første lag på desktop. Oppå den:

- UI som følger finger/scroll direkte: quickTo-respons ~0.2–0.4 s
- Objekter i scenen (kube o.l.): direkte følge (gsap.set) eller scrub 0.3–0.5
- Store, passive sceneobjekter: scrub 0.7–1.2 når avstanden fra input krever det

Jo lenger fra input, desto mer demping. Stables to lag likevel (f.eks. lang
quickTo oppå Lenis), skal det behandles som feil.

### 3. Stagger følger størrelse

Mono/meta ~0.03 · brød/paneler ~0.06 · display-ord 0.1+. Aldri samme
stagger-verdi på ulike størrelsesnivåer i samme scene.

### 4. Sove-disiplin

Hvert kontinuerlige system (loop, ticker, scroll-listener) skal ha en
eksplisitt av-tilstand: IntersectionObserver, scroll-sone eller delta-gate.
DOM skrives kun ved endring. Scener godt under fold init-es via
`runWhenNear` (se `HomeMotion.tsx`), ikke ved hydrering.

## Delte primitiver

- `maskedRise()` i `HomeMotion.tsx` — standard maskert linje-reveal med
  allerede-synlig-garde. Nye maskerte reveals bruker denne, ikke egne
  varianter.
- `runWhenNear()` i `HomeMotion.tsx` — lazy-init for scener under fold
  (1600 px forvarsel).
