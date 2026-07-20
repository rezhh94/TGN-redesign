# Homepage handoffs — active contract

Last reconciled: 2026-07-20.

## Hero → 01 → 02

- In the mounted baseline, Hero releases into Intro without an empty hold.
  Hero, Intro and this handoff may all be redesigned together.
- `IntroServicesJourney` owns the boundary after Intro without changing Hero.
- A vertical selection axis transfers emphasis from `01 / Én helhet` to
  `02 / Fem fag`; trigger is `top 85%` to `bottom 35%`, scrub `.45`, no pin.
- The axis resolves into the server-rendered Tjenester premise
  `Hva vi bygger` before the five service chapters begin.
- Reduced motion/no-JS show the complete axis and both labels in their final
  state, then continue into the ordinary-flow service ledger.

## 02 → 03

- Tjenester still releases directly into the real Effekt section; no duplicate
  bridge headline or `outcome-effect-journey` wrapper is mounted.
- Five dark bands close over the final Tjenester panel and finish as one dark
  viewport. Effekt is pulled forward by one matching dark viewport so its
  pinned title phase starts as the shutter completes, without a blank hold.
- The Effekt title is a separate fixed-centre layer. It appears only after the
  shutter, animates with opacity and blur only, and never translates, scales or
  gets clipped by a moving band. At the completed handoff, Effekt becomes the
  front scene so the outgoing shutter cannot mask part of the title. The same
  separation applies below 768px.
- Below 768px there is no section overlap: the mobile shutter consumes the
  final service viewport and Effekt starts at its natural end boundary.
- `effectCardsScene` pins at `top top`. The wide end is `4.6 * innerHeight` on
  non-touch and `3.9 * innerHeight` on touch. Card progress uses the
  source-matched `.08` smoothing factor; pin spacing and `anticipatePin: 1`
  remain enabled. Below 768px, a separate five-viewport pin preserves Trionn's
  single-lane card-over-image logic. Widths 768–900px, reduced motion and no-JS
  remain in normal flow.

## 03 → 04

- The four cards traverse the scene continuously and fade at the path edges.
  The central Tigon image remains on the shared axis until the pin releases;
  the opening copy has already faded.
- Effekt then releases directly into the mounted `WorkProof` section, whose
  existing `Dette kan Tigon lage` title rises on the same central axis.

## 04 → 05

- `workProcessJourney` darkens and shifts the outgoing Work surface while the
  real Process section rises over it.
- Reduced motion/no-JS use a clean static section boundary.

## 05 → 06 → footer

- Prosess' structured focus falls into System's quieter radial focus and grid.
- The mounted System releases into the existing footer entry. System, the
  handoff and Footer may all be redesigned; avoid a loader that delays access
  to content without a demonstrated purpose.
