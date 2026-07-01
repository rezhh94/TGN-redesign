const featuredService = {
  number: "01",
  title: "Nettsider",
  description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
  tags: ["Teknisk SEO", "Core Web Vitals", "Struktur", "Måling", "Konvertering", "Next.js"],
};

const collapsedServices = [
  {
    number: "02",
    title: "Webapper",
    description: "Portaler, dashboards og digitale verktøy bygget for reell arbeidsflyt.",
  },
  {
    number: "03",
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
  },
  {
    number: "04",
    title: "AI-systemer",
    description: "Automatisering, søk, assistenter og interne workflows koblet til ekte data.",
  },
  {
    number: "05",
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
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

        <ol className="what-build__accordion" aria-label="Tjenester">
          <li className="what-build__row what-build__row--open">
            <div className="what-build__row-heading">
              <span className="what-build__number">{featuredService.number}</span>
              <h3 className="what-build__service-title">{featuredService.title}</h3>
            </div>

            <div className="what-build__featured-body">
              <p className="what-build__featured-description">{featuredService.description}</p>
              <ul className="what-build__tags" aria-label="Nettsider inkluderer">
                {featuredService.tags.map((tag) => (
                  <li className="what-build__tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <span className="what-build__icon" aria-hidden="true">
              -
            </span>
          </li>

          {collapsedServices.map((service) => (
            <li className="what-build__row what-build__row--collapsed" key={service.number}>
              <div className="what-build__row-heading">
                <span className="what-build__number">{service.number}</span>
                <h3 className="what-build__service-title">{service.title}</h3>
              </div>

              <p className="what-build__collapsed-description">{service.description}</p>
              <span className="what-build__icon" aria-hidden="true">
                +
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
