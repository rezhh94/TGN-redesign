# Tigon services — link contract

Last reconciled: 2026-07-18.

This contract protects verified routes without introducing layout direction.

## Verified homepage service mappings

- Nettsider → `/tjenester/webutvikling-nextjs`
- Webapper → `/tjenester/custom-software`
- Apper → `/tjenester/app-utvikling`
- AI-systemer → `/tjenester/ai-implementering`
- SEO & AI-søk → `/tjenester/seo-optimalisering`
- E-handel → `/tjenester/e-handel-losninger`
- Headless CMS → `/tjenester/headless-cms`
- UX/UI-design → `/tjenester/ux-ui-design`
- Vedlikehold & sikkerhet → `/tjenester/vedlikehold-sikkerhet`
- Teknisk SEO → `/tjenester/seo-optimalisering`

Do not invent or rename routes during a design task. URL, slug, sitemap and SEO
changes require their own explicit scope.

## Decisions still open

- Whether generic `Integrasjoner` should become `AI-integrasjoner` and link to
  `/tjenester/ai-integrasjon`.
- Whether `Måling` should become `CRO & måling` and link to
  `/tjenester/konverteringsoptimalisering`.
- Whether Branding & identitet remains a homepage-promoted offer.
- Whether algorithmic/social marketing remains a homepage-promoted offer.
- Whether local visibility should receive a regional link in Tjenester.

Until the user decides, keep verified href destinations unchanged. Visual
labels, placement and component structure may change in a redesign as long as
they do not misrepresent the destination.

## Hero link issue

The Hero has historically used `/tjenester/seo-ai-sok/oslo/oslo`, while the
verified service route is `/tjenester/seo-optimalisering/oslo/oslo`. Hero is
visually open to redesign, but changing the route still requires explicit SEO
and link scope.
