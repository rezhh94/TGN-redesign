const services = [
  {
    number: "01",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling fra start.",
    meta: "NEXT.JS / SEO / CWV",
    tagline: "Teknisk SEO / Core Web Vitals / Struktur / Måling / Konvertering / Next.js",
    href: "/tjenester/webutvikling-nextjs",
  },
  {
    number: "02",
    title: "Webapper",
    description: "Portaler, dashboards og digitale verktøy bygget for reell arbeidsflyt.",
    meta: "PORTALER / DASHBOARDS",
    tagline: "Innlogging / Roller / Integrasjoner / Datamodell / Drift",
    href: "/tjenester",
  },
  {
    number: "03",
    title: "Apper",
    description: "App-løsninger for mobil og web når produktet må være mer enn en nettside.",
    meta: "MOBIL / WEB",
    tagline: "Mobil / Web / Push / Innlogging / Publisering",
    href: "/tjenester/app-utvikling",
  },
  {
    number: "04",
    title: "AI-systemer",
    description: "Automatisering, søk, assistenter og interne workflows koblet til ekte data.",
    meta: "AUTOMASJON / SØK / DATA",
    tagline: "Automasjon / Søk / Assistenter / Interne verktøy / Ekte data",
    href: "/tjenester/ai-implementering",
  },
  {
    number: "05",
    title: "SEO & AI-søk",
    description: "Innhold og struktur som gjør løsningen lettere å finne, forstå og velge.",
    meta: "INNHOLD / STRUKTUR",
    tagline: "Teknisk SEO / Innholdsstruktur / AI-synlighet / Lokal synlighet / Måling",
    href: "/tjenester",
  },
];

/* Tjenester uten eget kort — SEO-teksten og internlenkene bor i et stille
   register etter stabelen. Slugs fylles inn etter hvert som sidene finnes. */
const moreServices: Array<{ title: string; href?: string }> = [
  { title: "UX/UI-design" },
  { title: "E-handel", href: "/tjenester/e-handel-losninger" },
  { title: "Branding & identitet" },
  { title: "Headless CMS" },
  { title: "Digital infrastruktur", href: "/tjenester/digital-infrastruktur" },
  { title: "Vedlikehold & sikkerhet" },
];

/* 02 / Tjenester — MWG 031 architecture: every service is a full inset card;
   each card pins for one viewport while the next scrolls over it and the
   pinned one recedes into perspective (rotationX + random tilt + scale).
   Default (no-JS/PRM) is simply the stacked cards — all text server-rendered.
   The «Les mer»-cursor pill is decorative, JS/pointer-fine only. */
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
      </div>

      <ol className="what-build__stack" aria-label="Tjenester" data-build-stack>
        {services.map((service) => (
          <li className="what-build__slide" data-build-slide key={service.number}>
            <div className="what-build__card-pin" data-build-pin>
              <a className="what-build__card" href={service.href} data-build-card>
                <header className="what-build__card-top">
                  <div>
                    <h3 className="what-build__card-title">{service.title}</h3>
                    <p className="what-build__card-meta">{service.meta}</p>
                  </div>
                  <p className="what-build__card-num">({service.number})</p>
                </header>
                <p className="what-build__card-description">{service.description}</p>
                <div className="what-build__card-bottom">
                  {service.tagline ? (
                    <p className="what-build__card-tags">{service.tagline}</p>
                  ) : null}
                  <img
                    className="what-build__card-media"
                    src={`/services/${service.number}.png`}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </a>
            </div>
          </li>
        ))}
      </ol>

      <div className="what-build__cursor" aria-hidden="true" data-build-cursor>
        Les mer
      </div>

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
