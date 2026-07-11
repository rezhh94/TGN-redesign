const services = [
  {
    id: "nettsider",
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
    meta: "Next.js / SEO / CWV",
    capabilities: ["Teknisk SEO", "Core Web Vitals", "Innholdsstruktur", "Konvertering"],
    href: "/tjenester/webutvikling-nextjs",
  },
  {
    id: "webapper",
    number: "02",
    title: "Webapper",
    description: "Portaler, dashboards og digitale verktøy bygget for reell arbeidsflyt.",
    meta: "Portaler / Systemer",
    capabilities: ["Innlogging", "Roller", "Integrasjoner", "Datamodell"],
    href: "/tjenester/custom-software",
  },
  {
    id: "apper",
    number: "03",
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
    meta: "Mobil / Web",
    capabilities: ["Mobil", "Web", "Push", "Publisering"],
    href: "/tjenester/app-utvikling",
  },
  {
    id: "ai-systemer",
    number: "04",
    title: "AI-systemer",
    description: "Automatisering, søk, assistenter og interne arbeidsflyter koblet til ekte data.",
    meta: "Automasjon / Søk / Data",
    capabilities: ["Automasjon", "Søk", "Assistenter", "Interne verktøy"],
    href: "/tjenester/ai-implementering",
  },
  {
    id: "seo-ai-sok",
    number: "05",
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
    meta: "Innhold / Struktur",
    capabilities: ["Teknisk SEO", "AI-synlighet", "Lokal synlighet", "Måling"],
    href: "/tjenester/seo-optimalisering",
  },
] as const;

const register = [
  {
    tag: "Bygg",
    items: [
      { name: "Nettsider", href: "/tjenester/webutvikling-nextjs" },
      { name: "Webapper", href: "/tjenester/custom-software" },
      { name: "Apper", href: "/tjenester/app-utvikling" },
      { name: "E-handel", href: "/tjenester/e-handel-losninger" },
      { name: "Headless CMS", href: "/tjenester/headless-cms" },
      { name: "UX/UI-design", href: "/tjenester/ux-ui-design" },
    ],
  },
  {
    tag: "System",
    items: [
      { name: "AI-systemer", href: "/tjenester/ai-implementering" },
      { name: "Digital infrastruktur", href: "/tjenester/digital-infrastruktur" },
      { name: "Integrasjoner" },
      { name: "Vedlikehold & sikkerhet", href: "/tjenester/vedlikehold-sikkerhet" },
    ],
  },
  {
    tag: "Synlighet",
    items: [
      { name: "Teknisk SEO", href: "/tjenester/seo-optimalisering" },
      { name: "AI-søk" },
      { name: "Innholdsstruktur" },
      { name: "Lokal synlighet" },
      { name: "Måling" },
    ],
  },
] as const;

export function WhatWeBuild() {
  return (
    <section className="what-build" aria-labelledby="what-build-title">
      <header className="what-build__intro">
        <p className="what-build__label">02 / Tjenester</p>
        <h2 className="what-build__title" id="what-build-title">
          Dette bygger vi.
        </h2>
        <div className="what-build__intro-copy">
          <p>Nettsider, apper og digitale systemer bygget som én helhet.</p>
          <p>Design, teknologi, synlighet og måling deler samme grunnmur fra start.</p>
        </div>
      </header>

      <div className="service-index">
        <nav className="service-index__tabs" aria-label="Tjenester på denne siden">
          <p>Velg område</p>
          <ol>
            {services.map((service) => (
              <li key={service.id}>
                <a href={`#service-${service.id}`}>
                  <span>{service.number}</span>
                  {service.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="service-index__chapters">
          {services.map((service) => (
            <article className="service-chapter" id={`service-${service.id}`} key={service.id}>
              <div className="service-chapter__head">
                <p>{service.number} / 05 — {service.meta}</p>
                <h3>{service.title}</h3>
              </div>

              <div className="service-chapter__body">
                <p className="service-chapter__description">{service.description}</p>
                <ul aria-label={`Dette inngår i ${service.title}`}>
                  {service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
                <a href={service.href}>Les om {service.title.toLowerCase()} <span aria-hidden="true">↗</span></a>
              </div>

              <div className="service-chapter__signal" aria-hidden="true">
                <span>TGN / {service.number}</span>
                <i />
                <strong>{service.number}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="what-build__register">
        <p className="what-build__register-label">Hele leveransen</p>
        <div className="what-build__register-cols">
          {register.map((column) => (
            <div className="what-build__register-col" key={column.tag}>
              <p>{column.tag}</p>
              <ul>
                {column.items.map((item) => (
                  <li key={item.name}>
                    {"href" in item && item.href ? <a href={item.href}>{item.name}</a> : <span>{item.name}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <footer className="what-build__foot">
          <p>Én produksjon — samme grunnmur</p>
          <a href="/tjenester">Alle tjenester <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </section>
  );
}
