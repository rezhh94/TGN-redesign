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
    href: "/tjenester/seo-ai-sok/oslo/oslo",
    label: "SEO / AI-søk",
  },
  {
    href: "/tjenester/ai-integrasjon/oslo/oslo",
    label: "Digitale systemer",
  },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__stage">
          <div className="hero__copy">
            <h1 className="hero__title" id="hero-title">
              <span>TIGON</span>
              <span>STUDIO</span>
            </h1>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <span className="hero__visual-grid" />
            <span className="hero__visual-mark" />
            <p className="hero__visual-tag">TGN—STUDIO / OSLO 59.91°N</p>
            <p className="hero__visual-status">
              <span className="hero__visual-status-dot" />
              TILGJENGELIG FOR PROSJEKTER
            </p>
          </div>
        </div>

        <div className="hero__bar">
          <div className="hero__bar-main">
            <p className="hero__support">Nettsider og apper som blir funnet, forstått og valgt.</p>

            <nav className="hero__services" aria-label="Tjenester">
              {/* TODO: Foreløpige href-er til SEO-kontrakt og endelig rutestruktur er bekreftet. */}
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
