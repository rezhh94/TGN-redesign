const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling.",
    meta: "Next.js / SEO / CWV",
    capabilities: ["Teknisk SEO", "Core Web Vitals", "Innholdsstruktur", "Konvertering"],
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/tgn-nettsider-editorial.webp",
    layout: "feature",
  },
  {
    id: "webapper",
    number: "02",
    title: "Webapper",
    description: "Digitale verktøy formet rundt virksomhetens faktiske arbeidsflyt.",
    meta: "Portaler / Systemer",
    capabilities: ["Innlogging", "Roller", "Integrasjoner", "Datamodell"],
    href: "/tjenester/custom-software",
    image: "/services/tgn-webapper-workflow.webp",
    layout: "pair",
  },
  {
    id: "apper",
    number: "03",
    title: "Apper",
    description: "Mobil- og webprodukter for behov som går utover en nettside.",
    meta: "Mobil / Web",
    capabilities: ["Mobil", "Web", "Push", "Publisering"],
    href: "/tjenester/app-utvikling",
    image: "/services/tgn-apper-field.webp",
    layout: "pair",
  },
  {
    id: "ai-systemer",
    number: "04",
    title: "AI-systemer",
    description: "AI-verktøy koblet til virksomhetens egne data og arbeidsflyter.",
    meta: "Automasjon / Søk / Data",
    capabilities: ["Automasjon", "Søk", "Assistenter", "Interne verktøy"],
    href: "/tjenester/ai-implementering",
    image: "/services/tgn-ai-knowledge.webp",
    layout: "wide",
  },
  {
    id: "seo-ai-sok",
    number: "05",
    title: "SEO & AI-søk",
    description: "Struktur og innhold som gjør løsningen synlig og lettere å velge.",
    meta: "Innhold / Struktur",
    capabilities: ["Teknisk SEO", "AI-synlighet", "Lokal synlighet", "Måling"],
    href: "/tjenester/seo-optimalisering",
    image: "/services/tgn-seo-query-map.webp",
    layout: "finale",
  },
] as const;

const register = [
  ["Bygg", "Nettsider", "Webapper", "Apper", "E-handel", "Headless CMS", "UX/UI-design"],
  ["System", "AI-systemer", "Digital infrastruktur", "Integrasjoner", "Vedlikehold & sikkerhet"],
  ["Synlighet", "Teknisk SEO", "AI-søk", "Innholdsstruktur", "Lokal synlighet", "Måling"],
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
      <header className="what-build__intro">
        <p className="what-build__label">02 / Tjenester</p>
        <h2 className="what-build__title" id="what-build-title">
          <span>Dette</span>
          <span>bygger vi.</span>
        </h2>
        <div className="what-build__intro-copy">
          <p>
            Fem fagområder bygget som én sammenhengende leveranse — fra første
            valg til en løsning som kan finnes, forstås og måles.
          </p>
          <span>TGN / service disciplines / 01—05</span>
        </div>
      </header>

      <ol className="service-ledger">
        {services.map((service, index) => (
          <li
            className={`service-chapter service-chapter--${service.layout}${index % 2 ? " service-chapter--reverse" : ""}`}
            data-service-chapter
            key={service.id}
          >
            <header className="service-chapter__head">
              <span className="service-chapter__number">{service.number} / 05</span>
              <h3><a href={service.href}>{service.title}</a></h3>
              <span className="service-chapter__meta">{service.meta}</span>
            </header>

            <div className="service-chapter__body">
              <div className="service-chapter__copy" data-service-copy>
                <p>{service.description}</p>
                <ul aria-label={`${service.title} inkluderer`}>
                  {service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
                <a href={service.href}>Se tjenesten <span aria-hidden="true">↗</span></a>
              </div>

              <figure className="service-chapter__visual" data-service-chapter-visual>
                <img src={service.image} alt="" loading={index < 2 ? "eager" : "lazy"} />
                <figcaption><span>TGN / Tjeneste {service.number}</span></figcaption>
              </figure>
            </div>
          </li>
        ))}
      </ol>

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
