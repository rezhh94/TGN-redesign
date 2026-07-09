type WorkItem = {
  id: string;
  title: string;
  category: string;
  signal: string;
  caption: string;
  image: string;
};

const workItems: WorkItem[] = [
  {
    id: "TGN—DEMO/01",
    title: "Produktplattform",
    category: "Webapp / systemflyt",
    signal: "Oversikt og neste handling",
    caption: "Et digitalt arbeidsrom som samler prioritet, status og neste handling.",
    image: "/work/mockups/04.png",
  },
  {
    id: "TGN—KONSEPT/02",
    title: "Søkeflate",
    category: "Nettside / SEO / AI-søk",
    signal: "Synlighet og forståelse",
    caption: "Struktur og innhold bygget for å bli funnet, forstått og valgt.",
    image: "/work/mockups/13.png",
  },
  {
    id: "TGN—SYSTEM/03",
    title: "Kundeportal",
    category: "Portal / rolleflyt",
    signal: "Én lesbar produktflate",
    caption: "Flere brukerreiser samlet i én lesbar og rolig produktflate.",
    image: "/work/mockups/07.png",
  },
  {
    id: "TGN—KONSEPT/04",
    title: "Kjøpsflyt",
    category: "E-handel / konvertering",
    signal: "Fra interesse til valg",
    caption: "En tydelig vei fra interesse til beslutning uten unødvendig friksjon.",
    image: "/work/mockups/14.png",
  },
  {
    id: "TGN—PROTOTYPE/05",
    title: "Mobilflyt",
    category: "App / interaksjon",
    signal: "Raske, presise handlinger",
    caption: "En mobil arbeidsflyt formet for raske, presise handlinger.",
    image: "/work/mockups/12.png",
  },
  {
    id: "TGN—LAB/06",
    title: "Signalsystem",
    category: "AI / automatisering",
    signal: "Data koblet til handling",
    caption: "Signaler, kø og beslutning koblet sammen i ett målbart system.",
    image: "/work/mockups/09.png",
  },
];

function WorkCopy({ item }: { item: WorkItem }) {
  return (
    <div className="work-proof__item-copy">
      <div className="work-proof__item-meta">
        <span>{item.id}</span>
        <span>{item.category}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.caption}</p>
      <span className="work-proof__item-signal">Leverer — {item.signal}</span>
    </div>
  );
}

export function WorkProof() {
  const [lead, ...items] = workItems;

  return (
    <section className="work-proof" aria-labelledby="work-proof-title">
      <header className="work-proof__intro">
        <p className="work-proof__label">04 / Arbeid</p>
        <div className="work-proof__intro-copy">
          <h2 className="work-proof__title" id="work-proof-title">Dette bygger vi.</h2>
          <p className="work-proof__caption">
            Seks egenproduserte demonstrasjoner av nettsider, webapper, apper
            og AI-systemer — med leveransen synlig i hvert eksempel.
          </p>
        </div>
      </header>

      <div className="work-proof__index">
        <article className="work-proof__lead" data-work-item>
          <WorkCopy item={lead} />
          <figure className="work-proof__media work-proof__media--lead">
            <img src={lead.image} alt="" loading="lazy" />
            <figcaption>Hoveddemonstrasjon / {lead.category}</figcaption>
          </figure>
        </article>

        <div className="work-proof__grid">
          {items.map((item, index) => (
            <article className="work-proof__item" data-work-item data-work-index={index} key={item.id}>
              <figure className="work-proof__media">
                <img src={item.image} alt="" loading="lazy" />
                <figcaption>{String(index + 2).padStart(2, "0")} / 06</figcaption>
              </figure>
              <WorkCopy item={item} />
            </article>
          ))}
        </div>

        <footer className="work-proof__closing">
          <p>Nettside · Webapp · App · AI-system · SEO og AI-søk</p>
          <a href="/tjenester">Se alle tjenester →</a>
        </footer>
      </div>
    </section>
  );
}
