const footerIndex = [
  {
    title: "Tjenester",
    links: [
      { label: "Nettsider", href: "/tjenester/webutvikling-nextjs" },
      { label: "Webapper", href: "/tjenester/custom-software" },
      { label: "Apper", href: "/tjenester/app-utvikling" },
      { label: "AI-systemer", href: "/tjenester/ai-implementering" },
      { label: "SEO & AI-søk", href: "/tjenester/seo-optimalisering" },
    ],
  },
  {
    title: "Arbeid",
    links: [
      { label: "Arkiv", href: "/arkiv" },
      { label: "VVSvakt.no", href: "/arkiv/vvsvakt-no" },
      { label: "Minhud.no", href: "/arkiv/minhud-no" },
      { label: "Saneringsvakt.no", href: "/arkiv/saneringsvakt-no" },
    ],
  },
  {
    title: "Ressurser",
    links: [
      { label: "Ressurser", href: "/ressurser" },
      { label: "Hva koster en nettside?", href: "/hva-koster-nettside" },
      { label: "Nettside eller webapp?", href: "/nettside-eller-webapp" },
      { label: "Next.js vs WordPress", href: "/nextjs-vs-wordpress" },
      { label: "Hvorfor får nettsiden ingen leads?", href: "/hvorfor-far-nettsiden-ingen-leads" },
    ],
  },
  {
    title: "Steder",
    subdued: true,
    links: [
      { label: "Steder", href: "/steder" },
      { label: "Webutvikling Oslo", href: "/tjenester/webutvikling-nextjs/oslo/oslo" },
      { label: "Webutvikling Bergen", href: "/tjenester/webutvikling-nextjs/vestland/bergen" },
      { label: "Webutvikling Trondheim", href: "/tjenester/webutvikling-nextjs/trondelag/trondheim" },
      { label: "Webutvikling Stavanger", href: "/tjenester/webutvikling-nextjs/rogaland/stavanger" },
    ],
  },
];

export function ContactFooter() {
  return (
    <section className="contact-footer" aria-labelledby="contact-footer-title">
      <div className="contact-footer__inner">
        <div className="contact-footer__closing">
          <p className="contact-footer__label">07 / Kontakt</p>

          <div className="contact-footer__statement">
            <h2 className="contact-footer__title" id="contact-footer-title">
              <span>SEND OSS</span>
              <span>NOE UKLART.</span>
            </h2>
            <p className="contact-footer__lead">
              Vi gjør det tydeligere. Fortell kort hva du vurderer å bygge, så svarer vi med hva som bør gjøres først.
            </p>
          </div>
        </div>

        <div className="contact-footer__contact">
          <div className="contact-footer__direct" aria-label="Direkte kontakt">
            <p className="contact-footer__direct-label">Direkte</p>
            <a className="contact-footer__email" href="mailto:hello@tigon.no">
              hello@tigon.no
            </a>
            <div className="contact-footer__direct-row">
              <a className="contact-footer__phone" href="tel:+4741760149">
                +47 41 76 01 49
              </a>
              <button
                className="contact-footer__copy"
                type="button"
                data-copy-email="hello@tigon.no"
                hidden
              >
                Kopier adresse
              </button>
            </div>
            <p className="contact-footer__status" aria-hidden="true">
              OSLO 59.91°N / 10.75°Ø — <span data-local-time>––:––:––</span>
            </p>
          </div>

          <div className="contact-footer__actions" aria-label="Kontaktvalg">
            <a className="contact-footer__action contact-footer__action--primary" href="/kontakt">
              Få gratis analyse
              <span className="contact-footer__action-arrow" aria-hidden="true" />
            </a>
            <a
              className="contact-footer__action contact-footer__action--secondary"
              href="/kontakt?emne=Rask%20gjennomgang%20%2815%20min%29"
            >
              Book 15 min
              <span className="contact-footer__action-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>

        <footer className="contact-footer__index" aria-label="Tigon footer">
          {footerIndex.map((group) => (
            <nav
              className={`contact-footer__row${group.subdued ? " contact-footer__row--subdued" : ""}`}
              aria-label={group.title}
              key={group.title}
            >
              <p className="contact-footer__row-label">{group.title}</p>
              <ul className="contact-footer__row-links">
                {group.links.map((link) => (
                  <li className="contact-footer__item" key={link.href}>
                    <a className="contact-footer__link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="contact-footer__row contact-footer__row--nap" aria-label="Kontaktinformasjon">
            <p className="contact-footer__row-label">Kontakt</p>
            <address className="contact-footer__address">
              <span>Tigon Studio AS</span>
              <span>Lindeberg Næringsvei 20</span>
              <span>1067 Oslo, NO</span>
              <a href="mailto:hello@tigon.no">hello@tigon.no</a>
              <a href="tel:+4741760149">+47 41 76 01 49</a>
              <span className="contact-footer__copyright">© 2026 Tigon Studio AS</span>
            </address>
          </div>
        </footer>

        <div className="contact-footer__wordmark" aria-hidden="true">
          <p className="contact-footer__wordmark-echo contact-footer__wordmark-echo--far">
            <span>TIGON</span> <span>STUDIO</span>
          </p>
          <p className="contact-footer__wordmark-echo">
            <span>TIGON</span> <span>STUDIO</span>
          </p>
          <p className="contact-footer__wordmark-face">
            <span>TIGON</span> <span>STUDIO</span>
          </p>
        </div>
      </div>
    </section>
  );
}
