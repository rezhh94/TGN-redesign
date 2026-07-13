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
    <section className="hero" aria-labelledby="hero-title" data-theme-section="dark" data-bg-section="dark">
      <div className="hero__grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
      </div>

      <div className="hero__inner">
        <header className="hero__head">
          <p className="hero__eyebrow">TGN / Digital studio</p>
          <p className="hero__status">Oslo / Norway — tilgjengelig for prosjekter</p>
        </header>

        <div className="hero__masthead">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line"><span className="hero__title-line-inner">TIGON</span></span>
            <span className="hero__title-line"><span className="hero__title-line-inner">STUDIO</span></span>
          </h1>

          <div className="hero__offer">
            <p>Nettsider, apper og digitale systemer der design, teknologi og synlighet bygges som én helhet.</p>
            <span>Design / Teknologi / Synlighet</span>
          </div>
        </div>

        <div className="hero__bar">
          <div className="hero__bar-main">
            <p className="hero__support">Nettsider og apper som blir funnet, forstått og valgt.</p>

            <nav className="hero__services" aria-label="Tjenester">
              {serviceLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hero__actions">
            <a className="tgn-action tgn-action--primary tgn-action--hero" href="/kontakt?ref=hero">
              Få prosjekt vurdert
              <span className="tgn-action__arrow" aria-hidden="true" />
            </a>
            <span className="hero__note">Scope først. Ingen ferdig brief nødvendig.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
