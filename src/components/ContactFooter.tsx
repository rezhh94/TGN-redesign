const serviceLinks = [
  { label: "Nettsider", href: "/tjenester/webutvikling-nextjs" },
  { label: "Webapper", href: "/tjenester/custom-software" },
  { label: "Apper", href: "/tjenester/app-utvikling" },
  { label: "AI-systemer", href: "/tjenester/ai-implementering" },
  { label: "SEO & AI-søk", href: "/tjenester/seo-optimalisering" },
];

const archiveLinks = [
  { label: "VVSvakt.no", href: "/arkiv/vvsvakt-no" },
  { label: "Minhud.no", href: "/arkiv/minhud-no" },
  { label: "Saneringsvakt.no", href: "/arkiv/saneringsvakt-no" },
];

const resourceLinks = [
  { label: "Hva koster en nettside?", href: "/hva-koster-nettside" },
  { label: "Nettside eller webapp?", href: "/nettside-eller-webapp" },
  { label: "Next.js vs WordPress", href: "/nextjs-vs-wordpress" },
  { label: "Hvorfor får nettsiden ingen leads?", href: "/hvorfor-far-nettsiden-ingen-leads" },
];

const exploreLinks = [
  { label: "Arkiv", href: "/arkiv" },
  { label: "Ressurser", href: "/ressurser" },
];

const placeLinks = [
  { label: "Steder", href: "/steder" },
  { label: "Webutvikling Oslo", href: "/tjenester/webutvikling-nextjs/oslo/oslo" },
  { label: "Webutvikling Bergen", href: "/tjenester/webutvikling-nextjs/vestland/bergen" },
  {
    label: "Webutvikling Trondheim",
    href: "/tjenester/webutvikling-nextjs/trondelag/trondheim",
  },
  {
    label: "Webutvikling Stavanger",
    href: "/tjenester/webutvikling-nextjs/rogaland/stavanger",
  },
];

type FooterLink = (typeof serviceLinks)[number] | (typeof exploreLinks)[number];

function FooterLinkList({ links }: { links: readonly FooterLink[] }) {
  return (
    <ul className="contact-footer__links">
      {links.map((link) => (
        <li key={link.href}>
          <a className="contact-footer__link" href={link.href}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterRegister({
  label,
  links,
}: {
  label: string;
  links: readonly FooterLink[];
}) {
  return (
    <div className="contact-footer__register-group">
      <p className="contact-footer__register-label">{label}</p>
      <ul className="contact-footer__register-list">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContactFooter() {
  return (
    <div className="contact-footer-parallax" data-footer-parallax>
      <footer
        className="contact-footer"
        data-footer-parallax-inner
        aria-labelledby="contact-footer-title"
      >
        <div className="contact-footer__inner">
          <h2 className="contact-footer__sr-only" id="contact-footer-title">
            Kontakt Tigon Studio
          </h2>

          <div className="contact-footer__links-row">
            <section className="contact-footer__column" aria-labelledby="footer-services-title">
              <p className="contact-footer__eyebrow" id="footer-services-title">
                ( Tjenester )
              </p>
              <nav aria-label="Tjenester">
                <FooterLinkList links={serviceLinks} />
              </nav>
            </section>

            <section className="contact-footer__column" aria-labelledby="footer-explore-title">
              <p className="contact-footer__eyebrow" id="footer-explore-title">
                ( Arbeid / ressurser )
              </p>
              <nav aria-label="Arbeid og ressurser">
                <FooterLinkList links={exploreLinks} />
              </nav>
              <div className="contact-footer__register">
                <FooterRegister label="Fra arkivet" links={archiveLinks} />
                <FooterRegister label="Les også" links={resourceLinks} />
              </div>
            </section>

            <section
              className="contact-footer__column contact-footer__column--contact"
              aria-labelledby="footer-contact-title"
            >
              <p className="contact-footer__eyebrow" id="footer-contact-title">
                ( Kontakt )
              </p>

              <div className="contact-footer__direct">
                <a className="contact-footer__email" href="mailto:hello@tigon.no">
                  hello@tigon.no
                </a>
                <button
                  className="contact-footer__copy"
                  type="button"
                  data-copy-email="hello@tigon.no"
                  aria-label="Kopier e-postadressen hello@tigon.no"
                >
                  Kopier adresse
                </button>
                <div className="contact-footer__direct-row">
                  <a className="contact-footer__phone" href="tel:+4741760149">
                    +47 41 76 01 49
                  </a>
                </div>
              </div>

              <div className="contact-footer__actions" aria-label="Kontaktvalg">
                <a className="contact-footer__action" href="/kontakt">
                  Få gratis analyse ↗
                </a>
                <a
                  className="contact-footer__action"
                  href="/kontakt?emne=Rask%20gjennomgang%20%2815%20min%29"
                >
                  Book 15 min ↗
                </a>
              </div>

              <address className="contact-footer__address">
                <span>Tigon Studio AS</span>
                <span>Lindeberg Næringsvei 20</span>
                <span>1067 Oslo, NO</span>
                <span className="contact-footer__status" aria-hidden="true">
                  OSLO 59.91°N / 10.75°Ø — <span data-local-time>––:––:––</span>
                </span>
              </address>
            </section>
          </div>

          <div className="contact-footer__places">
            <p className="contact-footer__eyebrow">( Tilstede )</p>
            <nav aria-label="Steder">
              <ul className="contact-footer__places-list">
                {placeLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="contact-footer__logo-row">
            <div className="contact-footer__signature">
              <p>Send oss noe uklart.</p>
              <p>Bygd for å bli valgt.</p>
              <p>© 2026 Tigon Studio AS</p>
            </div>

            <p className="contact-footer__wordmark" aria-hidden="true">
              <span>TIGON</span> <span>STUDIO</span>
            </p>
          </div>
        </div>
      </footer>
      <div className="contact-footer-parallax__dark" data-footer-parallax-dark aria-hidden="true" />
    </div>
  );
}
