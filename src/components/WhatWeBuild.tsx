const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
    meta: "Next.js / SEO / CWV",
    capabilities: ["Teknisk SEO", "Core Web Vitals", "Innholdsstruktur", "Konvertering"],
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/tgn-nettsider-editorial.webp",
  },
  {
    id: "webapper",
    number: "02",
    title: "Webapper",
    description: "Portaler og digitale verktøy bygget rundt en reell arbeidsflyt – ikke et generisk dashboard.",
    meta: "Portaler / Systemer",
    capabilities: ["Innlogging", "Roller", "Integrasjoner", "Datamodell"],
    href: "/tjenester/custom-software",
    image: "/services/tgn-webapper-workflow.webp",
  },
  {
    id: "apper",
    number: "03",
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
    meta: "Mobil / Web",
    capabilities: ["Mobil", "Web", "Push", "Publisering"],
    href: "/tjenester/app-utvikling",
    image: "/services/tgn-apper-field.webp",
  },
  {
    id: "ai-systemer",
    number: "04",
    title: "AI-systemer",
    description: "Automatisering, søk og interne arbeidsflyter koblet til virksomhetens ekte data.",
    meta: "Automasjon / Søk / Data",
    capabilities: ["Automasjon", "Søk", "Assistenter", "Interne verktøy"],
    href: "/tjenester/ai-implementering",
    image: "/services/tgn-ai-knowledge.webp",
  },
  {
    id: "seo-ai-sok",
    number: "05",
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
    meta: "Innhold / Struktur",
    capabilities: ["Teknisk SEO", "AI-synlighet", "Lokal synlighet", "Måling"],
    href: "/tjenester/seo-optimalisering",
    image: "/services/tgn-seo-query-map.webp",
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
        <h2 className="what-build__title" id="what-build-title">Dette bygger vi.</h2>
        <p className="what-build__intro-copy">
          Fem fagområder bygget som én sammenhengende leveranse – fra første valg til
          en løsning som kan finnes, forstås og måles.
        </p>
      </header>

      <div className="service-ledger sticky-tab-group">
        <div className="sticky-tab-group__nav-bg" aria-hidden="true" />
        {services.map((service, index) => (
          <article className="service-chapter sticky-tab" data-service-chapter key={service.id}>
            <header className="service-chapter__head sticky-tab__sticky">
              <div className="sticky-tab__inner">
                <span className="service-chapter__number">{service.number}</span>
                <h3><a href={service.href}>{service.title}</a></h3>
                <span className="service-chapter__meta">{service.meta}</span>
              </div>
            </header>

            <div className="service-chapter__body sticky-tab__placeholder-content">
              <div className="service-chapter__copy">
                <p>{service.description}</p>
                <p>{service.capabilities.join(" / ")}</p>
              </div>

              <figure className="service-chapter__visual" data-service-chapter-visual>
                <img src={service.image} alt="" loading={index < 2 ? "eager" : "lazy"} />
                <figcaption><span>TGN / Tjeneste {service.number}</span><span>{service.meta}</span></figcaption>
              </figure>
            </div>
          </article>
        ))}
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
