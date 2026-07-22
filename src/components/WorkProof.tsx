import { WordShiftLink } from "@/components/WordShiftLink";
import { WorkFlagWaveGate } from "@/components/WorkFlagWaveGate";

const capabilities = [
  {
    n: "01",
    name: "Webapp",
    blurb: "Et konsentrert arbeidsrom der komplekse oppgaver kjennes enkle.",
    src: "/work/capability-stage/tgn-product-os-laptop.webp",
    href: "/tjenester/custom-software",
    linkLabel: "Se tjenesten",
    position: "left",
    size: "large",
    muted: false,
  },
  {
    n: "02",
    name: "Nettsted",
    blurb: "En tydelig digital front som gjør virksomheten enkel å forstå og naturlig å velge.",
    src: "/work/capability-stage/laptop-chair.png",
    href: "/tjenester/webutvikling-nextjs",
    linkLabel: "Se tjenesten",
    position: "right",
    size: "medium",
    muted: false,
  },
  {
    n: "03",
    name: "Plattform",
    blurb: "Et sammenhengende økosystem der mennesker, data og tjenester møtes.",
    src: "/work/capability-stage/ipad-hand.png",
    href: "/hva-koster-digital-plattform",
    linkLabel: "Se plattformguiden",
    position: "left",
    size: "large",
    muted: false,
  },
  {
    n: "04",
    name: "E-handel",
    blurb: "En kjøpsopplevelse som gjør valget enkelt og fremdriften friksjonsfri.",
    src: "/work/capability-stage/tgn-ehandel-ipad.webp",
    href: "/tjenester/e-handel-losninger",
    linkLabel: "Se tjenesten",
    position: "center",
    size: "xlarge",
    muted: false,
  },
  {
    n: "05",
    name: "AI",
    blurb: "Et presist verktøy som gjør kunnskap søkbar og neste handling tydelig.",
    src: "/work/capability-stage/laptop-rocks.png",
    href: "/tjenester/ai-implementering",
    linkLabel: "Se tjenesten",
    position: "right",
    size: "large",
    muted: true,
  },
  {
    n: "06",
    name: "App",
    blurb: "En nær, responsiv opplevelse for korte og naturlige handlinger.",
    src: "/work/capability-stage/tgn-brand-phone.webp",
    href: "/tjenester/app-utvikling",
    linkLabel: "Se tjenesten",
    position: "left",
    size: "medium",
    muted: false,
  },
] as const;

export function WorkProof() {
  return (
    <section
      id="arbeid"
      className="work-proof"
      aria-labelledby="work-proof-title"
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="work-route" data-work-route>
        <div className="work-route__header" data-work-route-header>
          <div className="work-route__header-pin" data-work-route-pin>
            <p className="work-route__section-label">04 / Arbeid</p>

            <div className="work-route__header-content">
              <h2 id="work-proof-title">Dette kan Tigon lage</h2>
              <p className="work-route__header-copy">
                Konsepter, prototyper og digitale systemer utviklet for nye behov,
                mål og markeder.
              </p>
              <span
                className="work-route__origin"
                data-work-route-origin
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <canvas className="work-route__lines" data-work-route-lines aria-hidden="true" />

        <ol className="work-route__gallery" data-work-route-gallery>
          {capabilities.map((capability) => (
            <li
              className="work-route__card"
              data-work-route-card
              data-position={capability.position}
              data-size={capability.size}
              key={capability.n}
            >
              <article>
                <a
                  className="work-route__media"
                  data-work-wave-thumb
                  href={capability.href}
                  aria-label={`${capability.name} — ${capability.linkLabel}`}
                >
                  <img
                    className={capability.muted ? "work-route__image--muted" : undefined}
                    src={capability.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </a>

                <div className="work-route__card-info">
                  <div className="work-route__card-title">
                    <h3>{capability.name}</h3>
                  </div>
                  <div className="work-route__card-meta">
                    <p>{capability.blurb}</p>
                    <WordShiftLink href={capability.href} text={capability.linkLabel} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <WorkFlagWaveGate />

        <footer className="work-route__closing" data-work-route-closing>
          <p>Konsepter, systemer, prototyper og mulige leveranser.</p>
          <a href="/kontakt?ref=arbeid" data-work-route-contact>
            Start et prosjekt <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
