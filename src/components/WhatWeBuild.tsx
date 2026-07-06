const services = [
  {
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
    meta: "NEXT.JS / SEO / CWV",
    tagline: "Teknisk SEO / Core Web Vitals / Struktur / Måling / Konvertering / Next.js",
    href: "/tjenester/webutvikling-nextjs",
  },
  {
    title: "Webapper",
    description: "Portaler, dashboards og digitale verktøy bygget for reell arbeidsflyt.",
    meta: "PORTALER / DASHBOARDS",
    tagline: "Innlogging / Roller / Integrasjoner / Datamodell / Drift",
    href: "/tjenester",
  },
  {
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
    meta: "MOBIL / WEB",
    tagline: "Mobil / Web / Push / Innlogging / Publisering",
    href: "/tjenester/app-utvikling",
  },
  {
    title: "AI-systemer",
    description: "Automatisering, søk, assistenter og interne workflows koblet til ekte data.",
    meta: "AUTOMASJON / SØK / DATA",
    tagline: "Automasjon / Søk / Assistenter / Interne verktøy / Ekte data",
    href: "/tjenester/ai-implementering",
  },
  {
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
    meta: "INNHOLD / STRUKTUR",
    tagline: "Teknisk SEO / Innholdsstruktur / AI-synlighet / Lokal synlighet / Måling",
    href: "/tjenester",
  },
];

/* Tjenester uten eget kort — SEO-teksten og internlenkene bor i et stille
   register etter listen. Slugs fylles inn etter hvert som sidene finnes. */
const moreServices: Array<{ title: string; href?: string }> = [
  { title: "UX/UI-design" },
  { title: "E-handel", href: "/tjenester/e-handel-losninger" },
  { title: "Branding & identitet" },
  { title: "Headless CMS" },
  { title: "Digital infrastruktur", href: "/tjenester/digital-infrastruktur" },
  { title: "Vedlikehold & sikkerhet" },
];

/* 02 / Tjenester — statisk tjenesteliste (uten nummer-etiketter): full-bredde
   rader med tittel + mono-meta, alle alltid åpne (ingen toggle/kollaps).
   Hver rad viser beskrivelse + kategori-brikker + «Les mer»-lenke + bilderamme.
   All tekst og alle lenker server-rendret. */
export function WhatWeBuild() {
  return (
    <section className="what-build" aria-labelledby="what-build-title">
      <div className="what-build__inner what-build__inner--head">
        <header className="what-build__top">
          <p className="what-build__label">Tjenester</p>
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
      </div>

      <ol className="what-build__list" aria-label="Tjenester" data-build-list>
          {services.map((service) => {
            const categories = service.tagline.split(" / ");
            return (
              <li className="what-build__row" data-build-row key={service.title}>
                <div className="what-build__row-head">
                  <h3 className="what-build__row-heading">
                    <span className="what-build__service-title">{service.title}</span>
                  </h3>
                  <span className="what-build__row-meta">{service.meta}</span>
                </div>

                <div className="what-build__body">
                  <div className="what-build__body-inner">
                    <div className="what-build__body-grid">
                      <div className="what-build__body-main">
                        <p className="what-build__description">{service.description}</p>
                        <div className="what-build__cats">
                          <p className="what-build__cats-label">Kategorier</p>
                          <ul className="what-build__cat-list">
                            {categories.map((cat) => (
                              <li className="what-build__cat" key={cat}>
                                {cat}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <a className="what-build__row-link" href={service.href}>
                          Les mer
                          <span className="what-build__cta-arrow" aria-hidden="true" />
                        </a>
                      </div>

                      {/* Bilderamme — plassholder klar for ekte bilde per tjeneste */}
                      <figure className="what-build__media">
                        <div className="what-build__media-frame">
                          <span className="what-build__media-hint">Sett inn bilde</span>
                        </div>
                      </figure>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ol>

      <div className="what-build__inner what-build__inner--foot">
        <nav className="what-build__more" aria-label="Flere tjenester">
          <p className="what-build__more-label">Flere tjenester</p>
          <ul className="what-build__more-list">
            {moreServices.map((item) => (
              <li className="what-build__more-item" key={item.title}>
                {item.href ? <a href={item.href}>{item.title}</a> : <span>{item.title}</span>}
              </li>
            ))}
          </ul>
          <a className="what-build__foot-link" href="/tjenester">
            Alle tjenester
            <span className="what-build__foot-arrow" aria-hidden="true" />
          </a>
        </nav>

        <footer className="what-build__foot">
          <p className="what-build__foot-note">05 tjenester — én produksjon</p>
          <p className="what-build__foot-copy">
            Alt bygges på samme grunnmur: struktur, fart, søkbarhet og måling.
          </p>
          <a className="what-build__foot-link" href="#prosess">
            Se hvordan vi produserer
            <span className="what-build__foot-arrow" aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
