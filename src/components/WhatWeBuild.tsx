const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling.",
    capabilities: ["Teknisk SEO", "Core Web Vitals", "Innholdsstruktur", "Konvertering"],
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/tgn-nettsider-editorial.webp",
    visualPosition: "50% 50%",
  },
  {
    id: "webapper",
    number: "02",
    title: "Webapper",
    description: "Digitale verktøy formet rundt virksomhetens faktiske arbeidsflyt.",
    capabilities: ["Innlogging", "Roller", "Integrasjoner", "Datamodell"],
    href: "/tjenester/custom-software",
    image: "/services/tgn-webapper-workflow.webp",
    visualPosition: "50% 45%",
  },
  {
    id: "apper",
    number: "03",
    title: "Apper",
    description: "Mobil- og webprodukter for behov som går utover en nettside.",
    capabilities: ["Mobil", "Web", "Push", "Publisering"],
    href: "/tjenester/app-utvikling",
    image: "/services/tgn-apper-field.webp",
    visualPosition: "50% 44%",
  },
  {
    id: "ai-systemer",
    number: "04",
    title: "AI-systemer",
    description: "AI-verktøy koblet til virksomhetens egne data og arbeidsflyter.",
    capabilities: ["Automasjon", "Søk", "Assistenter", "Interne verktøy"],
    href: "/tjenester/ai-implementering",
    image: "/services/tgn-ai-knowledge.webp",
    visualPosition: "50% 45%",
  },
  {
    id: "seo-ai-sok",
    number: "05",
    title: "SEO & AI-søk",
    description: "Struktur og innhold som gjør løsningen synlig og lettere å velge.",
    capabilities: ["Teknisk SEO", "AI-synlighet", "Lokal synlighet", "Måling"],
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
      <header className="what-build__prelude" data-service-prelude>
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
      </header>

      <div className="service-journey" data-service-story>
        <div className="service-journey__stage" data-service-stage>
          <div className="service-journey__stage-grid">
            <div className="service-journey__stage-head" aria-hidden="true">
              <span>Velg fag</span>
              <span data-service-counter>01 / 05</span>
            </div>

            <figure className="service-journey__visual" aria-hidden="true">
              <span className="service-journey__corner service-journey__corner--tl" />
              <span className="service-journey__corner service-journey__corner--tr" />
              <span className="service-journey__corner service-journey__corner--bl" />
              <span className="service-journey__corner service-journey__corner--br" />
              <div className="service-journey__visual-frame">
                {services.map((service, index) => (
                  <img
                    alt=""
                    className="service-journey__stage-image"
                    data-service-stage-image
                    data-service-stage-image-active={index === 0 ? "" : undefined}
                    decoding="async"
                    key={service.id}
                    loading="lazy"
                    src={service.image}
                    style={{ objectPosition: service.visualPosition }}
                  />
                ))}
              </div>
            </figure>

            <ol className="service-journey__index" aria-hidden="true">
              {services.map((service) => (
                <li key={service.id}>
                  <span>{service.number}</span> {service.title}
                </li>
              ))}
            </ol>

            <div className="service-journey__progress" aria-hidden="true">
              <span data-service-progress />
            </div>
          </div>
        </div>

        <ol className="service-journey__chapters" data-service-chapters>
          {services.map((service, index) => (
            <li
              className="service-chapter"
              data-service-chapter
              data-service-active={index === 0 ? "" : undefined}
              key={service.id}
            >
              <div className="service-chapter__inner">
                <figure className="service-chapter__mobile-visual" aria-hidden="true">
                  <img
                    alt=""
                    decoding="async"
                    loading="lazy"
                    src={service.image}
                    style={{ objectPosition: service.visualPosition }}
                  />
                </figure>

                <article className="service-chapter__content">
                  <div className="service-chapter__primary">
                    <div className="service-chapter__meta">
                      <span>Service {service.number}</span>
                      <span>{service.number} / 05</span>
                    </div>
                    <h3>{service.title}</h3>
                    <a
                      className="service-chapter__action"
                      data-service-link
                      href={service.href}
                    >
                      Utforsk tjenesten <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <div className="service-chapter__details">
                    <p>{service.description}</p>
                    <ul aria-label={`${service.title} inkluderer`}>
                      {service.capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
