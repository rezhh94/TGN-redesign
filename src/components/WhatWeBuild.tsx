const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
    meta: "Next.js / SEO / CWV",
    capabilities: ["Teknisk SEO", "Core Web Vitals", "Innholdsstruktur", "Konvertering"],
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/01.png",
  },
  {
    id: "webapper",
    number: "02",
    title: "Webapper",
    description: "Portaler og digitale verktøy bygget rundt en reell arbeidsflyt – ikke et generisk dashboard.",
    meta: "Portaler / Systemer",
    capabilities: ["Innlogging", "Roller", "Integrasjoner", "Datamodell"],
    href: "/tjenester/custom-software",
    image: "/services/02.png",
  },
  {
    id: "apper",
    number: "03",
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
    meta: "Mobil / Web",
    capabilities: ["Mobil", "Web", "Push", "Publisering"],
    href: "/tjenester/app-utvikling",
    image: "/services/03.png",
  },
  {
    id: "ai-systemer",
    number: "04",
    title: "AI-systemer",
    description: "Automatisering, søk og interne arbeidsflyter koblet til virksomhetens ekte data.",
    meta: "Automasjon / Søk / Data",
    capabilities: ["Automasjon", "Søk", "Assistenter", "Interne verktøy"],
    href: "/tjenester/ai-implementering",
    image: "/services/04.png",
  },
  {
    id: "seo-ai-sok",
    number: "05",
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
    meta: "Innhold / Struktur",
    capabilities: ["Teknisk SEO", "AI-synlighet", "Lokal synlighet", "Måling"],
    href: "/tjenester/seo-optimalisering",
    image: "/services/05.png",
  },
] as const;

const register = [
  ["Bygg", "Nettsider", "Webapper", "Apper", "E-handel", "Headless CMS", "UX/UI-design"],
  ["System", "AI-systemer", "Digital infrastruktur", "Integrasjoner", "Vedlikehold & sikkerhet"],
  ["Synlighet", "Teknisk SEO", "AI-søk", "Innholdsstruktur", "Lokal synlighet", "Måling"],
] as const;

export function WhatWeBuild() {
  return (
    <section className="what-build" aria-labelledby="what-build-title" data-build-section>
      <header className="what-build__intro">
        <p className="what-build__label">02 / Tjenester</p>
        <h2 className="what-build__title" id="what-build-title">Dette bygger vi.</h2>
        <p className="what-build__intro-copy">
          Fem fagområder. Én sammenhengende leveranse fra første valg til målbar løsning.
        </p>
      </header>

      <div className="service-selector" data-service-selector>
        <div className="service-selector__list" data-service-list>
          {services.map((service, index) => (
            <article className="service-option" data-service-row key={service.id} data-active={index === 0 ? "true" : "false"}>
              <button
                className="service-option__toggle"
                type="button"
                aria-expanded={index === 0}
                aria-controls={`service-panel-${service.id}`}
                data-service-toggle
              >
                <span>{service.number}</span>
                <strong>{service.title}</strong>
                <i aria-hidden="true">↗</i>
              </button>

              <div className="service-option__panel" id={`service-panel-${service.id}`} data-service-panel>
                <div className="service-option__copy">
                  <p>{service.description}</p>
                  <p>{service.meta}</p>
                  <ul aria-label={`Dette inngår i ${service.title}`}>
                    {service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                  </ul>
                  <a href={service.href}>Les om {service.title.toLowerCase()} <span aria-hidden="true">↗</span></a>
                </div>
                <img className="service-option__mobile-image" src={service.image} alt="" loading="lazy" />
              </div>
            </article>
          ))}
        </div>

        <div className="service-selector__visual" data-service-visual aria-hidden="true">
          <p>TGN / Aktiv flate</p>
          {services.map((service, index) => (
            <figure key={service.id} data-service-visual-item data-active={index === 0 ? "true" : "false"}>
              <img src={service.image} alt="" loading={index === 0 ? "eager" : "lazy"} />
              <figcaption><span>{service.number} / 05</span><span>{service.meta}</span></figcaption>
            </figure>
          ))}
          <span className="service-selector__visual-mark" />
        </div>
      </div>

      <div className="what-build__register">
        <p>Hele leveransen</p>
        <div>
          {register.map(([title, ...items]) => (
            <section key={title}>
              <h3>{title}</h3>
              <p>{items.join(" / ")}</p>
            </section>
          ))}
        </div>
        <a href="/tjenester">Se alle tjenester <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
