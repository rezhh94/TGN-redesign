const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling.",
    capabilities: ["Teknisk SEO", "Core Web Vitals", "Innholdsstruktur", "Konvertering"],
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/tgn-nettsider-editorial.webp",
    cubeFace: "front",
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
    cubeFace: "right",
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
    cubeFace: "back",
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
    cubeFace: "left",
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
    cubeFace: "top",
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
      <div className="what-build__shell">
        <header className="what-build__prelude">
          <div className="what-build__prelude-copy">
            <p className="what-build__label">02 / Tjenester</p>
            <h2 className="what-build__title" id="what-build-title">
              Hva vi bygger
            </h2>

            <p className="what-build__statement">
              Fem fagområder. Én sammenhengende leveranse fra første valg til
              en løsning som kan finnes, forstås og måles.
            </p>
          </div>
        </header>

        <div className="what-build__anchor" data-service-anchor>
          <div className="what-build__anchor-copy" aria-hidden="true">
            <figure className="what-build__cube-stage" aria-hidden="true">
              <div className="what-build__cube" data-service-cube>
                {services.map((service, index) => (
                  <div
                    className="what-build__cube-face"
                    data-cube-face={service.cubeFace}
                    data-service-cube-face
                    data-service-cube-face-active={index === 0 ? "" : undefined}
                    key={service.id}
                  >
                    <img
                      alt=""
                      decoding="async"
                      loading="lazy"
                      src={service.image}
                      style={{ objectPosition: service.visualPosition }}
                    />
                    <span className="what-build__cube-shade" />
                  </div>
                ))}

                <div
                  className="what-build__cube-face"
                  data-cube-face="bottom"
                >
                  <img
                    alt=""
                    decoding="async"
                    loading="lazy"
                    src="/services/tgn-nettsider-editorial.webp"
                  />
                  <span className="what-build__cube-shade" />
                </div>
              </div>
            </figure>
          </div>
        </div>

        <ol
          className="service-wave"
          data-service-wave
          data-wave-number="1.42"
          data-wave-speed="0.92"
        >
          {services.map((service) => (
            <li className="service-wave__row" data-service-row key={service.id}>
              <a className="service-wave__link" href={service.href}>
                <div
                  className="service-wave__lane service-wave__lane--left"
                  data-service-wave-lane="left"
                >
                  <div
                    className="service-wave__panel service-wave__panel--left"
                    data-service-wave-panel="left"
                  >
                    <div className="service-wave__meta">
                      <span>Service {service.number}</span>
                      <span>{service.number} / 05</span>
                    </div>
                    <h3>{service.title}</h3>
                    <span className="service-wave__action">
                      Utforsk tjenesten <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>

                <div
                  className="service-wave__lane service-wave__lane--right"
                  data-service-wave-lane="right"
                >
                  <div
                    className="service-wave__panel service-wave__panel--right"
                    data-service-wave-panel="right"
                  >
                    <p className="service-wave__description">{service.description}</p>
                    <ul aria-label={`${service.title} inkluderer`}>
                      {service.capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
