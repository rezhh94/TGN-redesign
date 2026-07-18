const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling.",
    capabilities: ["Teknisk SEO", "Core Web Vitals", "Innholdsstruktur", "Konvertering"],
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/tgn-nettsider-editorial.webp",
    placement: "lead",
  },
  {
    id: "webapper",
    number: "02",
    title: "Webapper",
    description: "Digitale verktøy formet rundt virksomhetens faktiske arbeidsflyt.",
    capabilities: ["Innlogging", "Roller", "Integrasjoner", "Datamodell"],
    href: "/tjenester/custom-software",
    image: "/services/tgn-webapper-workflow.webp",
    placement: "media",
  },
  {
    id: "apper",
    number: "03",
    title: "Apper",
    description: "Mobil- og webprodukter for behov som går utover en nettside.",
    capabilities: ["Mobil", "Web", "Push", "Publisering"],
    href: "/tjenester/app-utvikling",
    image: null,
    placement: "compact-right",
  },
  {
    id: "ai-systemer",
    number: "04",
    title: "AI-systemer",
    description: "AI-verktøy koblet til virksomhetens egne data og arbeidsflyter.",
    capabilities: ["Automasjon", "Søk", "Assistenter", "Interne verktøy"],
    href: "/tjenester/ai-implementering",
    image: null,
    placement: "compact-left",
  },
  {
    id: "seo-ai-sok",
    number: "05",
    title: "SEO & AI-søk",
    description: "Struktur og innhold som gjør løsningen synlig og lettere å velge.",
    capabilities: ["Teknisk SEO", "AI-synlighet", "Lokal synlighet", "Måling"],
    href: "/tjenester/seo-optimalisering",
    image: null,
    placement: "compact-end",
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
        <header className="what-build__rail">
          <p className="what-build__label">02 / Tjenester</p>
          <div className="what-build__rail-copy">
            <h2 className="what-build__title" id="what-build-title">
              Hva vi bygger
            </h2>
            <p>
              Fem fagområder. Én sammenhengende leveranse fra første valg til
              en løsning som kan finnes, forstås og måles.
            </p>
          </div>
          <span className="what-build__count">TGN / service disciplines / 01—05</span>
        </header>

        <ol className="service-mosaic">
          {services.map((service, index) => (
            <li
              className={`service-module service-module--${service.placement}`}
              data-service-module
              key={service.id}
            >
              <a className="service-module__link" href={service.href}>
                {service.image ? (
                  <figure className="service-module__visual" data-service-visual>
                    <img
                      src={service.image}
                      alt=""
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </figure>
                ) : null}

                <div className="service-module__content">
                  <div className="service-module__meta">
                    <span>Service {service.number}</span>
                    <span>{service.number} / 05</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p className="service-module__description">{service.description}</p>
                  <ul aria-label={`${service.title} inkluderer`}>
                    {service.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                  <span className="service-module__action">
                    Utforsk tjenesten <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
