import type { CSSProperties } from "react";

const capabilities = [
  {
    n: "01",
    name: "Webapp",
    meta: "Produkt / Next.js",
    blurb: "Et digitalt produkt bygget for daglig bruk, tydelig prioritet og stabil drift.",
  },
  {
    n: "02",
    name: "Nettsted",
    meta: "SEO / Struktur",
    blurb: "En rask, tydelig flate som blir funnet, forstått og målt fra første dag.",
  },
  {
    n: "03",
    name: "Plattform",
    meta: "Portal / System",
    blurb: "Data, roller og arbeidsflyt samlet i én lesbar digital struktur.",
  },
  {
    n: "04",
    name: "E-handel",
    meta: "Konvertering / Flyt",
    blurb: "En kjøpsreise som prioriterer riktige valg og fjerner unødvendig friksjon.",
  },
  {
    n: "05",
    name: "AI",
    meta: "Integrasjon / Automasjon",
    blurb: "AI koblet til faktiske systemer, data og handlinger — ikke som pynt.",
  },
  {
    n: "06",
    name: "App",
    meta: "UI / Interaksjon",
    blurb: "Et presist grensesnitt formet for mobil bruk, fart og tydelig respons.",
  },
];

const radialCapabilities = [
  { ...capabilities[0], src: "/work/capability-stage/laptop-rocks.png", tone: "paper", muted: true },
  { ...capabilities[1], src: "/work/capability-stage/laptop-chair.png", tone: "olive", muted: false },
  { ...capabilities[2], src: "/work/capability-stage/ipad-hand.png", tone: "mauve", muted: false },
  { ...capabilities[3], src: "/work/capability-stage/phone-hand.png", tone: "ink", muted: false },
  { ...capabilities[4], src: "/work/capability-stage/laptop-rocks.png", tone: "olive", muted: true },
  { ...capabilities[5], src: "/work/capability-stage/phone-rock.jpg", tone: "paper", muted: false },
];

const radialItems = [...radialCapabilities, ...radialCapabilities];

/* 04 / Arbeid — én capability-komposisjon i normal flow. Mockupene er
   konseptpresentasjon og aldri påstått som levert kundearbeid. Under scenen
   ligger en kompakt, serverrendret indeks med alle seks leveransemulighetene. */
export function WorkProof() {
  return (
    <section className="work-proof" aria-labelledby="work-proof-title">
      <header className="work-proof__intro">
        <p className="work-proof__label">04 / Arbeid</p>
        <h2 className="work-proof__title" id="work-proof-title">
          <span>Dette kan</span>
          <span>Tigon lage.</span>
        </h2>
        <div className="work-proof__intro-copy">
          <p>
            Nettsider, apper og digitale systemer hvor design, teknologi og synlighet virker som én helhet.
          </p>
          <span>TGN / capability assembly / 01—06</span>
        </div>
      </header>

      <div className="radial-capabilities" aria-hidden="true">
        <div className="radial-capabilities__collection">
          <div className="radial-capabilities__list" data-radial-cards-marquee-list="">
            {radialItems.map((capability, index) => (
              <div
                className="radial-capabilities__item"
                key={`${capability.n}-${index}`}
                style={{ "--card": index + 1 } as CSSProperties}
              >
                <figure className={`radial-card radial-card--${capability.tone}`}>
                  <div className={`radial-card__media${capability.muted ? " radial-card__media--muted" : ""}`}>
                    <img src={capability.src} alt="" loading="lazy" />
                  </div>
                  <figcaption>
                    <span>{capability.n} / 06</span>
                    <strong>{capability.name}</strong>
                    <span>{capability.meta}</span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="radial-capabilities__legend">
          <span>TGN / capability orbit / 01—06</span>
          <strong>Dette kan Tigon lage</strong>
          <span>Konseptflater — ikke kundecaser</span>
        </div>
      </div>

      <div className="work-proof__index-head">
        <p>Mulige leveranser</p>
        <p>Én produksjon — seks uttrykk</p>
      </div>

      <ol className="work-proof__index" data-work-index>
        {capabilities.map((capability) => (
          <li className="work-proof__capability" key={capability.n}>
            <span className="work-proof__capability-number">{capability.n}</span>
            <div>
              <h3>{capability.name}</h3>
              <p>{capability.blurb}</p>
            </div>
            <span className="work-proof__capability-meta">{capability.meta}</span>
          </li>
        ))}
      </ol>

      <p className="work-proof__disclaimer">
        Capability-demonstrasjon / konseptflater / ikke presentert som kundecaser
      </p>
    </section>
  );
}
