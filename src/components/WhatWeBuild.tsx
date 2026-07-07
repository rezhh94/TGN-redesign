/* 02 / Tjenester — tredelt kapittel, adaptert fra en award-referanse men holdt
   i Tigons editorielle, near-monokrome system:

     1) Tre pilarer (Bygg → System → Synlighet): reisen fra produkt til drift til
        vekst. Stor tittel + mono-tag + kort beskrivelse per pilar.
     2) Tjeneste-akkordeon: de fem hovedtjenestene som åpne/lukk-rader (uten
        bilder inni). SSR-default = alle åpne (no-JS / reduced-motion lesbart);
        JS legger til .what-build--enhanced, kollapser og lar én være åpen.
     3) Scramble-register: alle tjenestene i tre mono-kolonner. Etikettene
        dekodes inn på scroll (samme motor som Prosess-tittelen).

   Et bilde-/mockup-felt ligger som ramme øverst (placeholder — ekte Tigon-
   mockup settes inn senere). En seksjons-scopet pixel-cursor lever på desktop.
   All tekst og alle lenker er server-rendret. */

const pillars = [
  {
    id: "bygg",
    tag: "Produkt",
    title: "Bygg",
    body: "Nettsider, apper og grensesnitt bygget for fart, struktur og konvertering fra første linje.",
  },
  {
    id: "system",
    tag: "Drift",
    title: "System",
    body: "Infrastruktur, integrasjoner og AI som holder løsningen i drift — og lar den vokse videre.",
  },
  {
    id: "synlighet",
    tag: "Vekst",
    title: "Synlighet",
    body: "Teknisk SEO, innhold og måling som gjør at løsningen blir funnet, forstått og valgt.",
  },
] as const;

const services = [
  {
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
    meta: "NEXT.JS / SEO / CWV",
    tagline: "Teknisk SEO / Core Web Vitals / Struktur / Måling / Konvertering / Next.js",
    href: "/tjenester/webutvikling-nextjs",
    posters: ["/work/mockups/03.png", "/work/mockups/04.png"],
  },
  {
    title: "Webapper",
    description: "Portaler, dashboards og digitale verktøy bygget for reell arbeidsflyt.",
    meta: "PORTALER / DASHBOARDS",
    tagline: "Innlogging / Roller / Integrasjoner / Datamodell / Drift",
    href: "/tjenester",
    posters: ["/work/mockups/05.png", "/work/mockups/06.png"],
  },
  {
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
    meta: "MOBIL / WEB",
    tagline: "Mobil / Web / Push / Innlogging / Publisering",
    href: "/tjenester/app-utvikling",
    posters: ["/work/mockups/07.png", "/work/mockups/08.png"],
  },
  {
    title: "AI-systemer",
    description: "Automatisering, søk, assistenter og interne workflows koblet til ekte data.",
    meta: "AUTOMASJON / SØK / DATA",
    tagline: "Automasjon / Søk / Assistenter / Interne verktøy / Ekte data",
    href: "/tjenester/ai-implementering",
    posters: ["/work/mockups/09.png", "/work/mockups/10.png"],
  },
  {
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
    meta: "INNHOLD / STRUKTUR",
    tagline: "Teknisk SEO / Innholdsstruktur / AI-synlighet / Lokal synlighet / Måling",
    href: "/tjenester",
    posters: ["/work/mockups/11.png", "/work/mockups/13.png"],
  },
];

/* Fullt tjeneste-register — gruppert etter pilar. Bunn-listen scrambles inn.
   Slugs fylles inn etter hvert som sidene finnes. */
const register = [
  {
    id: "bygg",
    tag: "Bygg",
    items: [
      { name: "Nettsider", href: "/tjenester/webutvikling-nextjs" },
      { name: "Webapper", href: "/tjenester" },
      { name: "Apper", href: "/tjenester/app-utvikling" },
      { name: "E-handel", href: "/tjenester/e-handel-losninger" },
      { name: "Headless CMS" },
      { name: "UX/UI-design" },
    ],
  },
  {
    id: "system",
    tag: "System",
    items: [
      { name: "AI-systemer", href: "/tjenester/ai-implementering" },
      { name: "Digital infrastruktur", href: "/tjenester/digital-infrastruktur" },
      { name: "Integrasjoner" },
      { name: "Vedlikehold & sikkerhet" },
    ],
  },
  {
    id: "synlighet",
    tag: "Synlighet",
    items: [
      { name: "Teknisk SEO" },
      { name: "AI-søk" },
      { name: "Innholdsstruktur" },
      { name: "Lokal synlighet" },
      { name: "Måling" },
    ],
  },
] as const;

export function WhatWeBuild() {
  return (
    <section className="what-build" aria-labelledby="what-build-title" data-build-section>
      <div className="what-build__inner what-build__inner--head">
        <header className="what-build__top">
          <p className="what-build__label">Tjenester</p>
          <div className="what-build__top-copy">
            <h2 className="what-build__title" id="what-build-title">
              BYGGER
            </h2>
            <div className="what-build__intro-stack">
              <p className="what-build__intro what-build__intro--primary">
                Digitale løsninger som blir funnet, forstått og brukt.
              </p>
              <p className="what-build__intro what-build__intro--secondary">
                Fra produkt til drift til vekst — struktur, fart, søkbarhet og måling fra start.
              </p>
            </div>
          </div>
        </header>
      </div>

      {/* 1) Tre pilarer — Bygg → System → Synlighet */}
      <div className="what-build__inner what-build__inner--pillars">
        <ol className="what-build__pillars" data-build-list aria-label="Slik jobber vi">
          {pillars.map((pillar, i) => (
            <li className="what-build__pillar" data-build-row key={pillar.id}>
              <div className="what-build__pillar-top">
                <h3 className="what-build__pillar-title">{pillar.title}</h3>
                {i < pillars.length - 1 ? (
                  <span className="what-build__pillar-arrow" aria-hidden="true" />
                ) : null}
              </div>
              <p className="what-build__pillar-tag">{pillar.tag}</p>
              <p className="what-build__pillar-body">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* 2) Tjeneste-akkordeon — uten bilder */}
      <ol className="what-build__list" aria-label="Tjenester" data-build-accordion>
        {services.map((service, i) => {
          const tags = service.meta.split(" / ");
          const panelId = `wb-panel-${i}`;
          return (
            <li className="what-build__row" data-build-row key={service.title}>
              <button
                type="button"
                className="what-build__row-head"
                data-build-toggle
                aria-expanded="true"
                aria-controls={panelId}
              >
                <span className="what-build__service-title">{service.title}</span>
                <span className="what-build__row-tags">
                  {tags.map((tag) => (
                    <span className="what-build__row-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="what-build__row-strip" aria-hidden="true">
                  {service.posters.map((src) => (
                    <span className="what-build__row-thumb" key={src}>
                      <img className="what-build__row-thumb-img" src={src} alt="" loading="lazy" />
                    </span>
                  ))}
                </span>
                <span className="what-build__row-toggle" aria-hidden="true" />
              </button>

              <div className="what-build__body" id={panelId} data-build-panel>
                <div className="what-build__body-inner">
                  <div className="what-build__body-grid">
                    <div className="what-build__body-copy">
                      <p className="what-build__description">{service.description}</p>
                      <a className="what-build__row-link" href={service.href}>
                        Les mer
                        <span className="what-build__cta-arrow" aria-hidden="true" />
                      </a>
                    </div>
                    <div className="what-build__posters" aria-hidden="true">
                      {service.posters.map((src) => (
                        <span className="what-build__poster" key={src}>
                          <img className="what-build__poster-img" src={src} alt="" loading="lazy" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* 3) Scramble-register — alle tjenestene */}
      <div className="what-build__inner what-build__inner--foot">
        <div className="what-build__register" data-build-register>
          <p className="what-build__register-label">Alle tjenester</p>
          <div className="what-build__register-cols">
            {register.map((col) => (
              <div className="what-build__register-col" key={col.id}>
                <p className="what-build__register-tag">{col.tag}</p>
                <ul className="what-build__register-list">
                  {col.items.map((item) => (
                    <li className="what-build__register-item" key={item.name}>
                      {"href" in item && item.href ? (
                        <a href={item.href} data-scramble>
                          {item.name}
                        </a>
                      ) : (
                        <span data-scramble>{item.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <footer className="what-build__foot">
          <p className="what-build__foot-note">Én produksjon — samme grunnmur</p>
          <a className="what-build__foot-link" href="/tjenester">
            Alle tjenester
            <span className="what-build__foot-arrow" aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
