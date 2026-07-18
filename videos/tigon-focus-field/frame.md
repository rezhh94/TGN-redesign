---
background: "#070707"
surface_deep: "#030303"
surface_raised: "#0d0f0f"
surface_focus: "#171a19"
light_primary: "rgba(181, 201, 194, 0.88)"
light_secondary: "rgba(88, 119, 108, 0.60)"
aspect: "16:9"
duration_seconds: 10
audio: false
text: false
---

# Tigon Focus Field

A seamless, pre-rendered background loop for the existing Intro-through-Arbeid
homepage atmosphere.

## Concept angle

Three diffuse optical surfaces move from ambiguity into one precise off-axis
focus field, hold through alignment, and release back to their exact opening
state. The motion expresses selection, focus and distinction without literal
selection UI, text, particles or a copied wave.

## Homepage fit

- Match the mounted `surface-base`, `surface-deep`, `surface-raised` and
  `surface-focus` values exactly.
- Keep the existing muted blue-green-grey light family.
- Place luminosity off-axis so homepage typography retains clean dark zones.
- Supply atmosphere only. Existing CSS remains responsible for spotlight,
  veil, vignette, grain and named state changes.
- No baked grain, noise, tracking UI, logo, typography or orange.
- No external imagery, fonts, code or media.
- One deterministic 10-second loop whose final frame returns to its opening
  geometry.

## Motion

- Slow optical convergence for 5 seconds.
- Slow release over the remaining 5 seconds.
- `sine.inOut`, transform and opacity only.
- No independent runtime clocks, random values or infinite repeats.
