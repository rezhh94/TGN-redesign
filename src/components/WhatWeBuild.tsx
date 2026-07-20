const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling.",
    capabilities: [
      "Strategi og informasjonsarkitektur",
      "UX og visuelt design",
      "Next.js-utvikling",
      "Teknisk SEO og måling",
    ],
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/tgn-nettsider-editorial.webp",
    visualPosition: "50% 50%",
  },
  {
    id: "webapper",
    number: "02",
    title: "Webapper",
    description: "Digitale verktøy formet rundt virksomhetens faktiske arbeidsflyt.",
    capabilities: [
      "Produktdesign og prototyper",
      "Innlogging og roller",
      "API-er og integrasjoner",
      "Datamodell og arbeidsflyt",
    ],
    href: "/tjenester/custom-software",
    image: "/services/tgn-webapper-workflow.webp",
    visualPosition: "50% 45%",
  },
  {
    id: "apper",
    number: "03",
    title: "Apper",
    description: "Mobil- og webprodukter for behov som går utover en nettside.",
    capabilities: [
      "Produktstrategi og prototyper",
      "Mobil- og webgrensesnitt",
      "Integrasjoner og varslinger",
      "Publisering og videreutvikling",
    ],
    href: "/tjenester/app-utvikling",
    image: "/services/tgn-apper-field.webp",
    visualPosition: "50% 44%",
  },
  {
    id: "ai-systemer",
    number: "04",
    title: "AI-systemer",
    description: "AI-verktøy koblet til virksomhetens egne data og arbeidsflyter.",
    capabilities: [
      "Kartlegging av arbeidsflyt",
      "Automasjon og integrasjoner",
      "Søk i egne data",
      "Assistenter og interne verktøy",
    ],
    href: "/tjenester/ai-implementering",
    image: "/services/tgn-ai-knowledge.webp",
    visualPosition: "50% 45%",
  },
  {
    id: "seo-ai-sok",
    number: "05",
    title: "SEO & AI-søk",
    description: "Struktur og innhold som gjør løsningen synlig og lettere å velge.",
    capabilities: [
      "Teknisk SEO",
      "Synlighet i AI-søk",
      "Lokal synlighet",
      "Innholdsstruktur og måling",
    ],
    href: "/tjenester/seo-optimalisering",
    image: "/services/tgn-seo-query-map.webp",
    visualPosition: "48% 50%",
  },
] as const;

export function WhatWeBuild() {
  return (
    <section
      className="what-build"
      aria-labelledby="what-build-title"
      data-build-section
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <header
        className="what-build__prelude"
        data-service-handoff
        data-service-prelude
      >
        <div className="what-build__prelude-grid">
          <p className="what-build__label">02 / Tjenester</p>
          <h2 className="what-build__title" id="what-build-title">
            <span data-service-prelude-line>Hva vi bygger</span>
          </h2>
          <p className="what-build__statement" data-service-prelude-copy>
            Fem fagområder. Én sammenhengende leveranse fra første valg til
            en løsning som kan finnes, forstås og måles.
          </p>
        </div>

        <div className="what-build__handoff-bands" data-service-bands aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <span data-service-band key={index} />
          ))}
        </div>
      </header>

      <div
        className="service-deck"
        data-bg-section="light"
        data-service-story
        data-theme-section="light"
      >
        <ol
          className="service-deck__panels"
          aria-label="Tigons tjenester"
          data-service-stage
        >
          {services.map((service, index) => (
            <li
              className="service-panel"
              data-service-active={index === 0 ? "" : undefined}
              data-service-panel
              key={service.id}
            >
              <article className="service-panel__inner">
                <figure className="service-panel__media" aria-hidden="true">
                  <div className="service-panel__image-frame">
                    <img
                      alt=""
                      data-service-panel-image
                      decoding="async"
                      loading={index === 0 ? "eager" : "lazy"}
                      src={service.image}
                      style={{ objectPosition: service.visualPosition }}
                    />
                  </div>
                </figure>

                <div className="service-panel__content" data-service-panel-content>
                  <p className="service-panel__counter">
                    {service.number} / {String(services.length).padStart(2, "0")}
                  </p>

                  <div className="service-panel__summary">
                    <h3 className="type-paper-heading">{service.title}</h3>
                    <p className="type-paper-copy">{service.description}</p>
                  </div>

                  <div className="service-panel__capabilities">
                    <p className="type-paper-label">Dette leverer vi</p>
                    <ul aria-label={`${service.title} inkluderer`}>
                      {service.capabilities.map((capability) => (
                        <li className="type-paper-row" key={capability}>
                          <span>{capability}</span>
                          <span
                            className="service-panel__capability-rule"
                            data-service-panel-rule
                            aria-hidden="true"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    className="service-panel__action"
                    data-service-link
                    href={service.href}
                  >
                    Utforsk tjenesten
                  </a>
                </div>
              </article>

              {index === services.length - 1 ? (
                <div
                  className="service-panel__effect-shutter"
                  data-service-effect-shutter
                  aria-hidden="true"
                >
                  {Array.from({ length: 5 }, (_, bandIndex) => (
                    <span data-service-effect-band key={bandIndex} />
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
