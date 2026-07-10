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

const stageAssets = [
  {
    key: "laptop",
    src: "/work/capability-stage/laptop-rocks.png",
    label: "Produktflate / webapp",
  },
  {
    key: "phone",
    src: "/work/capability-stage/phone-hand.png",
    label: "Mobilflyt / app",
  },
  {
    key: "tablet",
    src: "/work/capability-stage/ipad-hand.png",
    label: "Grensesnitt / plattform",
  },
  {
    key: "system",
    src: "/work/capability-stage/laptop-chair.png",
    label: "Systemflate / portal",
  },
  {
    key: "mobile",
    src: "/work/capability-stage/phone-rock.jpg",
    label: "Interaksjon / mobil",
  },
];

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

      <div
        className="work-stage"
        data-work-stage
        role="img"
        aria-label="Konseptkomposisjon som viser digitale produkt-, mobil- og systemflater Tigon kan skape"
      >
        <p className="work-stage__axis" aria-hidden="true">
          <span>Design</span>
          <span>Teknologi</span>
          <span>Synlighet</span>
        </p>

        {stageAssets.map((asset, index) => (
          <figure
            className={`work-stage__media work-stage__media--${asset.key}`}
            data-work-media
            key={asset.key}
          >
            <img src={asset.src} alt="" loading={index === 0 ? "eager" : "lazy"} />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{asset.label}</span>
            </figcaption>
          </figure>
        ))}

        <div className="work-stage__lock" data-work-lock aria-hidden="true">
          <span>TGN / valgt</span>
          <span>Systemet er samlet</span>
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
