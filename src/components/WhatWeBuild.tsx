const services = [
  {
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
    meta: "NEXT.JS / SEO / CWV",
    tagline: "Teknisk SEO / Core Web Vitals / Struktur / Måling / Konvertering / Next.js",
    open: true,
  },
  {
    number: "02",
    title: "Webapper",
    description: "Portaler, dashboards og digitale verktøy bygget for reell arbeidsflyt.",
    meta: "PORTALER / DASHBOARDS",
  },
  {
    number: "03",
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
    meta: "MOBIL / WEB",
  },
  {
    number: "04",
    title: "AI-systemer",
    description: "Automatisering, søk, assistenter og interne workflows koblet til ekte data.",
    meta: "AUTOMASJON / SØK / DATA",
  },
  {
    number: "05",
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
    meta: "INNHOLD / STRUKTUR",
  },
];

export function WhatWeBuild() {
  return (
    <section className="what-build" aria-labelledby="what-build-title">
      <div className="what-build__inner">
        <header className="what-build__top">
          <p className="what-build__label">02 / Tjenester</p>
          <div className="what-build__top-copy">
            <h2 className="what-build__title" id="what-build-title">
              BYGGER
            </h2>
            <div className="what-build__intro-stack">
              <p className="what-build__intro what-build__intro--primary">
                Digitale løsninger som blir funnet, forstått og brukt.
              </p>
              <p className="what-build__intro what-build__intro--secondary">
                Nettsider, apper og systemer med struktur, fart, søkbarhet og måling fra start.
              </p>
            </div>
          </div>
        </header>

        <ol className="what-build__list" aria-label="Tjenester" data-build-list>
          {services.map((service) => (
            <li
              className="what-build__row"
              data-build-row
              data-open={service.open ? "" : undefined}
              key={service.number}
            >
              <h3 className="what-build__row-heading">
                <button
                  className="what-build__row-trigger"
                  type="button"
                  aria-controls={`service-body-${service.number}`}
                  data-build-trigger
                >
                  <span className="what-build__number">{service.number}</span>
                  <span className="what-build__service-title">{service.title}</span>
                  <span className="what-build__row-meta">{service.meta}</span>
                  <span className="what-build__icon" aria-hidden="true" />
                </button>
              </h3>

              <div
                className="what-build__body"
                id={`service-body-${service.number}`}
                data-build-body
              >
                <div className="what-build__body-inner">
                  <p className="what-build__description">{service.description}</p>
                  {service.tagline ? (
                    <p className="what-build__tagline">{service.tagline}</p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
