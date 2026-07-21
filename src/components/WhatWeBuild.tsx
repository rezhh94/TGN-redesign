import { WordShiftLink } from "@/components/WordShiftLink";

const services = [
  {
    id: "nettsider",
    title: "Nettsider",
    description: "Raske nettsider med tydelig struktur, teknisk SEO og måling.",
    href: "/tjenester/webutvikling-nextjs",
    image: "/services/tgn-nettsider-editorial.webp",
    visualPosition: "50% 50%",
  },
  {
    id: "webapper",
    title: "Webapper",
    description: "Digitale verktøy formet rundt virksomhetens faktiske arbeidsflyt.",
    href: "/tjenester/custom-software",
    image: "/services/tgn-webapper-workflow.webp",
    visualPosition: "50% 45%",
  },
  {
    id: "apper",
    title: "Apper",
    description: "Mobil- og webprodukter for behov som går utover en nettside.",
    href: "/tjenester/app-utvikling",
    image: "/services/tgn-apper-field.webp",
    visualPosition: "50% 44%",
  },
  {
    id: "ai-systemer",
    title: "AI-systemer",
    description: "AI-verktøy koblet til virksomhetens egne data og arbeidsflyter.",
    href: "/tjenester/ai-implementering",
    image: "/services/tgn-ai-knowledge.webp",
    visualPosition: "50% 45%",
  },
  {
    id: "seo-ai-sok",
    title: "SEO & AI-søk",
    description: "Struktur og innhold som gjør løsningen synlig og lettere å velge.",
    href: "/tjenester/seo-optimalisering",
    image: "/services/tgn-seo-query-map.webp",
    visualPosition: "48% 50%",
  },
] as const;

export function WhatWeBuild() {
  return (
    <section
      className="what-build"
      aria-labelledby="what-build-title"
      data-build-section
      data-service-story
      data-theme-section="light"
      data-bg-section="light"
    >
      <div className="service-work__viewport" data-service-viewport>
        <div
          className="service-work__effect-underlay"
          data-service-underlay
          aria-hidden="true"
        >
          <div className="service-work__effect-stage">
            <div className="service-work__effect-rail">
              <p>03 / Effekt</p>
              <p>Funnet / Forstått / Valgt / Målt</p>
            </div>

            <div className="service-work__effect-center">
              <p className="service-work__effect-eyebrow">
                Fra tjenester til resultat
              </p>
              <div className="service-work__effect-title">
                <span>Effekt som</span>
                <span>kan måles.</span>
              </div>
              <p className="service-work__effect-lead">
                Design, teknologi og synlighet bygget for å bli funnet,
                forstått, valgt og målt.
              </p>
            </div>
          </div>
        </div>

        <div className="service-work__layer" data-service-layer>
          <div className="service-work__track" data-service-track>
            <header className="service-work__intro">
              <div className="service-work__intro-block">
                <h2 id="what-build-title">
                  Hva vi bygger
                  <br />
                  &amp; utvikler
                </h2>
                <div className="service-work__intro-action">
                  <WordShiftLink href="/tjenester" text="Se alle tjenester" />
                </div>
              </div>
            </header>

            {services.map((service, index) => (
              <div
                className="service-work__panel"
                data-service-card
                key={service.id}
              >
                <span className="service-work__divider" data-service-card-line />
                <span
                  className="service-work__divider-mobile"
                  data-service-card-line-horizontal
                />

                <div className="service-work__panel-inner" data-service-card-inner>
                  <article className="service-work__card">
                    <a
                      className="service-work__image-link"
                      href={service.href}
                      aria-label={`Utforsk ${service.title}`}
                    >
                      <img
                        alt=""
                        decoding="async"
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 90vw, 45vw"
                        src={service.image}
                        style={{ objectPosition: service.visualPosition }}
                      />
                    </a>

                    <div className="service-work__content">
                      <h3 data-service-card-title>{service.title}</h3>
                      <div className="service-work__meta-row">
                        <p data-service-card-copy>{service.description}</p>
                        <div data-service-card-action>
                          <WordShiftLink
                            href={service.href}
                            text="Utforsk tjenesten"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}

            <aside className="service-work__panel service-work__panel--final" data-service-card>
              <span className="service-work__divider" data-service-card-line />
              <div className="service-work__panel-inner" data-service-card-inner>
                <div className="service-work__final-content">
                  <h3 data-service-card-title>
                    Se hele bredden av tjenester vi bygger som én samlet leveranse.
                  </h3>
                  <div data-service-card-action>
                    <WordShiftLink href="/tjenester" text="Se alle tjenester" />
                  </div>
                </div>
              </div>

              <div className="service-work__end-axis" aria-hidden="true">
                <span data-service-end-line />
                <svg
                  data-service-end-plus
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="6.5" y1="0" x2="6.5" y2="13" />
                  <line x1="0" y1="6.5" x2="13" y2="6.5" />
                </svg>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
