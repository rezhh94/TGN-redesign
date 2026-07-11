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

const disciplines = ["Design og retning", "Utvikling", "Synlighet", "Digitale systemer"];
const outcomes = ["Funnet", "Forstått", "Valgt", "Målt"];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" data-theme-section="dark" data-bg-section="dark">
      <div className="hero__visual" aria-hidden="true">
        <video
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/tigon-mockup-glitch-poster.jpg"
          tabIndex={-1}
        >
          <source src="/video/tigon-mockup-glitch.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero__inner">
        <div className="hero__masthead">
          <h1 className="hero__title" id="hero-title">
            <span>TIGON</span>
            <span>STUDIO</span>
          </h1>

          <div className="hero__axis" aria-hidden="true">
            <img src="/brand/tigon-mark-ink.svg" alt="" />
            <span>(Digital studio)</span>
          </div>
        </div>

        <div className="hero__meta hero__meta--disciplines" aria-label="Fagområder">
          {disciplines.map((discipline) => (
            <span key={discipline}>{discipline}</span>
          ))}
        </div>

        <div className="hero__meta hero__meta--outcomes" aria-label="Resultater">
          {outcomes.map((outcome) => (
            <span key={outcome}>{outcome}</span>
          ))}
        </div>

        <div className="hero__scene" aria-hidden="true">
          <span>01 / 04</span>
          <strong>Tigon digital studio</strong>
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
