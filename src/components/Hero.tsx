const serviceLinks = [
  {
    href: "/tjenester/webutvikling-nextjs/oslo/oslo",
    label: "Webutvikling",
  },
  {
    href: "/tjenester/app-utvikling/oslo/oslo",
    label: "Apputvikling",
  },
  {
    href: "/tjenester/seo-optimalisering",
    label: "SEO / AI-søk",
  },
  {
    href: "/tjenester/digital-infrastruktur",
    label: "Digitale systemer",
  },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__stage">
          <div className="hero__copy">
            <div className="hero__title" aria-hidden="true">
              <span>TIGON</span>
              <span>STUDIO</span>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true" />
        </div>

        <div className="hero__bar">
          <div className="hero__bar-main">
            <h1 className="hero__support" id="hero-title">
              Nettsider og apper som blir funnet, forstått og valgt.
            </h1>

            <nav className="hero__services" aria-label="Tjenester">
              {serviceLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hero__actions">
            <a className="hero__cta" href="/kontakt?ref=hero">
              Få prosjekt vurdert
              <span className="hero__cta-arrow" aria-hidden="true" />
            </a>
            <span className="hero__note">Scope først. Ingen ferdig brief nødvendig.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
