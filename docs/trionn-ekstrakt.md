# Trionn-ekstrakt — KEEP / ADAPT / REJECT

Oppdatert 2026-07-21. Teknisk analyse:
`TRIONN-HOMEPAGE-ANIMATION-BREAKDOWN.md`. Konstruksjonsanalyse:
`DESIGN-TRIONN.md`.

Tabellen bestemmer hva Trionn-studien kan påvirke. Den overstyrer aldri
Tigons brandplattform, eksisterende tokens eller aktive seksjonskontrakter.

| Trionn-prinsipp | Beslutning | Tigon-konsekvens |
| --- | --- | --- |
| Viktig tekst i ekte HTML over canvas/motion | **KEEP** | Server-renderte overskrifter, forklaringer og lenker forblir lesbare uten JS |
| Én scrolltransport koblet til GSAP-tickeren | **KEEP** | Desktop bruker den vedtatte globale Lenis-instansen; touch, ≤768px og reduced motion bruker native scroll |
| Én eier og ett progresskart per lang scene | **KEEP** | Seksjonskontrakten dokumenterer trigger, faser, cleanup og fallback |
| IntersectionObserver/CanvasManager-lignende søvn | **KEEP** | Kontinuerlige systemer initieres nær viewport og har eksplisitt av-tilstand |
| 12-kolonners asymmetrisk komposisjon | **ADAPT** | Bruk Tigons eksisterende 12/6-grid, `--page-max` og `--homepage-gutter` |
| Strukturelt ulik desktop/mobil-koreografi | **ADAPT** | Samme innhold og semantikk; enklere kompakt scene når desktopmekanikken ikke skalerer |
| CSS rigger geometri, JS eier tid/progress | **KEEP** | Statisk layout fungerer først; GSAP må ikke skape kritisk innhold |
| Smalt easing-vokabular og størrelsesstyrt stagger | **ADAPT** | Følg Animation Charter; velg Tigon-verdier per rolle |
| Wipe som lar neste seksjon ligge klar under | **ADAPT** (sjeldent) | Bare en navngitt handoff kan eie overlap; ikke gjenta mellom alle kapitler |
| Stor kontrast mellom display og liten metadata | **ADAPT** | Følg kildekoblingen: Familjen for display/title, PP Neue Montreal for Neue Haas-copy, Martian for actions og PP Editorial New for avgrenset serif |
| Trionns fluid-root-formel og breakpoint-resets | **COPY for type only** | Bruk de eksakte `--size`-verdiene i isolerte typografiformler; ikke sett `html`-størrelsen eller endre rem-basert layout |
| Kunstig preloader og lang førstegangsintro | **REJECT** | Ingen tvungen ventetid; LCP og tilgang til innhold prioriteres |
| Global route wipe som standard | **REJECT** foreløpig | Krever egen navigasjonsoppgave og må bevise nytte |
| WebGL i Hero, galleri og Footer samtidig | **REJECT som standard** | Alle tre er redesignbare, men hver canvasscene må begrunnes og samlet ytelsesbudsjett må verifiseres |
| 371-frame bildeanimasjon som standardmønster | **REJECT** | Bruk bare når motivet krever frame-presisjon og budsjettet er dokumentert |
| Trionns lyse grå/hvite kapittelpalett | **REJECT** | Tigon beholder sin mørke semantiske overflatestige |
| Orange/røde energilys | **REJECT** | Synlig orange er utenfor Tigon-retningen |
| Global dekorativ cursor | **REJECT som standard** | Pointer-systemet kan redesignes, men må ha funksjon, touch/keyboard-fallback og tydelig scope |
| ScrollSmoother i tillegg til Lenis | **REJECT** | Aldri to scrollmotorer; bundlet, ubrukt kode er ikke et mønster |
| Trionn-fontene | **COPY fra godkjent kilde, ellers ADAPT** | Bruk eksakt offisiell Familjen Grotesk og Martian Mono, lokal PP Editorial New og PP Neue Montreal som lovlig Neue Haas-erstatning; ingen fontbinær hentes fra speilet |
| Trionn-assets, identitet og innhold | **REJECT** | Bruk kun Tigon-materiale; ingen fontbinærer eller andre identitetsressurser hentes fra speilet |

## Praktisk test

Et forslag inspirert av studien kan gå videre bare hvis det:

1. styrker Tigons tydelighet, selection/focus/distinction og seksjonens rolle;
2. er komplett på desktop, touch, mobil, reduced motion og uten JS;
3. bruker Tigons innhold, typografi, tokens, assets og etablerte hrefs;
4. har én eier, dokumentert ytelsesbudsjett og full cleanup;
5. fortsatt fungerer som statisk komposisjon når motion fjernes.
