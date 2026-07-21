# Pre-live SEO gate

Status: obligatorisk før redesignen kan gå live. Ikke del av aktive designfaser.

Før integrasjon eller publisering skal en egen SEO-/URL-kontroll bekrefte:

- metadata og én tydelig homepage-H1
- canonical, robots og sitemap
- schema/JSON-LD og stabile `@id`-referanser
- alle service-, ressurs-, arkiv-, sted- og kontaktlenker
- eksisterende URL-er, slugs, redirects og regionale ruter
- server-rendered viktig tekst og lenker
- footer/NAP og organisasjonsinformasjon
- indexability og 404-kontroll for alle homepage-href-er
- parity mot `docs/homepage-seo-contract.md`
- build, live sanity og GSC-kontroll etter integrasjon

Ingen designgodkjenning erstatter denne kontrollen. Commit, port og publisering holdes separat til gaten er bestått.
