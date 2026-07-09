# Forside-plan — aktiv retning

Sist avstemt mot implementasjonen: 2026-07-09.

Faktisk seksjonsstatus finnes i `docs/current-homepage-state.md`. Prøvde og forkastede retninger finnes i `docs/decision-log.md`.

## Nåværende dom

Forsiden har nå en tydeligere rytme uten å gjenta samme pinned-scroll-effekt:

- Tjenester prioriterer lesbarhet og reelle tjenestelenker.
- Overlevering gir et kort, visuelt avbrekk uten pinning.
- Effekt beholder det typografiske hovedøyeblikket.
- Arbeid viser leveransebredde i vanlig dokumentflyt.
- Prosess forklarer systemet visuelt uten scroll-jacking.
- Manifest og Kontakt avslutter rolig.

## Gjennomført 2026-07-09

1. Tjenester ble tilbakeført til den lesbare pre-sticky accordion-retningen.
2. Tjeneste- og arbeidsbilder fikk en samlet monokrom behandling.
3. Overlevering ble bygget om fra pinned ignite til et lagdelt, ikke-pinnet handoff.
4. `Selected systems` ble fjernet fra Arbeid.
5. Arbeid ble bygget som en asymmetrisk capability-indeks med tydelig leveranse per eksempel.
6. Prosess ble bygget som `TGN / Systemflyt` fra uklart behov til målbar kontaktvei.
7. Rask og sensitiv bildeinnflyging ble erstattet av rolig engangs-settling og svak desktop-parallax.
8. Manifest og Kontakt ble beholdt som rolige avslutninger.

## Ikke gjenåpne uten eksplisitt beskjed

- sticky tjenestereise der bildene tar oppmerksomheten fra tjenestenavnene
- flere like pinned-scroll-seksjoner etter hverandre
- `Selected systems` som pinned/orbital scene
- MWG 031-lignende pinned/receding Prosess-kort
- scroll-styrt Prosess-stage med raske tilstandsskifter
- falske kundecaser, metrics eller bransjematching i Arbeid

## Neste fornuftige vurdering

Neste runde bør være en observasjon av helheten, ikke en ny effektjakt:

1. Test om besøkende forstår Tjenester og Arbeid uten forklaring.
2. Vurder ekte/oppdaterte mockups når brukeren åpner et nytt asset-pass.
3. Kontroller ytelse og scrollfølelse på faktisk iPhone/Safari.
4. Endre bare én større motion-idé av gangen.

## Fast kvalitetsport

- Header/Hero, SEO, URL-er, footer/NAP og viktige lenker røres ikke uten eksplisitt mandat.
- Viktig innhold skal være server-rendered og lesbart uten JavaScript.
- Reduced motion og mobil skal ikke pinne.
- Ingen synlig oransje.
- Ingen direkte import av MadeWithGSAP- eller gammel prototypekode.
- Hver endring avsluttes med typekontroll, produksjonsbygg, diff-sjekk og browser-review.
