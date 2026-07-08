type WorkItem = {
  id: string;
  etikett: "TGN—DEMO" | "TGN—KONSEPT" | "TGN—LAB" | "TGN—PROTOTYPE" | "TGN—SYSTEM" | "TGN—SHOWCASE";
  title: string;
  category: string;
  stack: string[];
  demonstrerer: string;
  caption: string;
  weight: "lead" | "feature" | "archive";
  mediaKey: "product" | "search" | "platform" | "commerce" | "app" | "system";
  assetSlot: string;
  href?: string;
  frames?: string[];
};

const workItems: WorkItem[] = [
  {
    id: "TGN—DEMO/01",
    etikett: "TGN—DEMO",
    title: "Product OS-demo",
    category: "PRODUCT OS",
    stack: ["Webapp", "Grensesnitt", "Systemflyt"],
    demonstrerer: "STRUKTUR",
    caption:
      "Demonstrerer hvordan en produktflate kan samle oversikt, prioritet og handling i ett arbeidsrom.",
    weight: "lead",
    mediaKey: "product",
    assetSlot: "product-os",
    frames: ["Oversikt", "Detalj", "Handling", "Kvittering"],
  },
  {
    id: "TGN—KONSEPT/02",
    etikett: "TGN—KONSEPT",
    title: "Nettside + AI-søk-demo",
    category: "SEO / AI-SØK",
    stack: ["Nettside", "SEO", "AI-søk"],
    demonstrerer: "SYNLIGHET",
    caption:
      "Demonstrerer hvordan struktur, søkeintensjon og svarflater kan bygges inn i samme nettsted.",
    weight: "feature",
    mediaKey: "search",
    assetSlot: "search-visibility",
  },
  {
    id: "TGN—SYSTEM/03",
    etikett: "TGN—SYSTEM",
    title: "Plattform-demo",
    category: "PLATTFORM",
    stack: ["Portal", "Rolleflyt"],
    demonstrerer: "OVERSIKT",
    caption: "Demonstrerer hvordan flere brukerflyter kan samles i en rolig plattformflate.",
    weight: "archive",
    mediaKey: "platform",
    assetSlot: "platform-flow",
  },
  {
    id: "TGN—KONSEPT/04",
    etikett: "TGN—KONSEPT",
    title: "E-handel-demo",
    category: "E-HANDEL",
    stack: ["Produkt", "Kjøpsflyt"],
    demonstrerer: "VALG",
    caption: "Demonstrerer hvordan en kjøpsflyt kan prioriteres uten visuell støy.",
    weight: "archive",
    mediaKey: "commerce",
    assetSlot: "commerce-flow",
  },
  {
    id: "TGN—PROTOTYPE/05",
    etikett: "TGN—PROTOTYPE",
    title: "App-demo",
    category: "APP",
    stack: ["Mobil", "Interaksjon", "Flyt"],
    demonstrerer: "FLYT",
    caption:
      "Demonstrerer hvordan en mobil arbeidsflyt kan føles direkte, lesbar og håndlaget.",
    weight: "feature",
    mediaKey: "app",
    assetSlot: "mobile-flow",
  },
  {
    id: "TGN—LAB/06",
    etikett: "TGN—LAB",
    title: "AI-system-demo",
    category: "AI-SYSTEM",
    stack: ["AI-system", "Signal"],
    demonstrerer: "BESLUTNING",
    caption: "Demonstrerer hvordan signaler, kø og handling kan ligge i samme systemflate.",
    weight: "archive",
    mediaKey: "system",
    assetSlot: "signal-system",
  },
];

function WorkMedia({ item, compact = false }: { item: WorkItem; compact?: boolean }) {
  return (
    <div
      className={`work-media work-media--${item.mediaKey}${compact ? " work-media--compact" : ""}`}
      data-asset-slot={item.assetSlot}
    >
      <div className="work-media__bar">
        <span>{item.id}</span>
        <span>{item.category}</span>
      </div>
      <div className="work-slot" aria-hidden="true">
        <span className="work-slot__meta">ASSET SLOT</span>
        <span className="work-slot__crop work-slot__crop--primary" />
        <span className="work-slot__crop work-slot__crop--secondary" />
        <span className="work-slot__line work-slot__line--wide" />
        <span className="work-slot__line" />
      </div>
      <p className="work-media__mark" aria-hidden="true">
        {item.demonstrerer}
      </p>
    </div>
  );
}

function WorkCaption({ item, compact = false }: { item: WorkItem; compact?: boolean }) {
  return (
    <div className={compact ? "work-caption work-caption--compact" : "work-caption"}>
      <p className="work-caption__line">
        {item.id} · {item.category} · DEMONSTRERER — {item.demonstrerer}
      </p>
      <div className="work-caption__chips" aria-label={`${item.title} spesifikasjon`}>
        {item.stack.map((chip) => (
          <span className="work-caption__chip" key={chip}>
            {chip}
          </span>
        ))}
      </div>
      <p className="work-caption__text">{item.caption}</p>
    </div>
  );
}

function WorkReelLead({ item }: { item: WorkItem }) {
  return (
    <article className="work-reel-lead" aria-labelledby="work-reel-lead-title">
      <figure className="work-reel-lead__media" aria-hidden="true">
        <div className="work-reel-lead__frames">
          {item.frames?.map((frame, index) => (
            <div
              className="work-reel-lead__frame"
              data-active={index === 0 ? "true" : undefined}
              key={frame}
            >
              <WorkMedia item={{ ...item, demonstrerer: frame }} />
            </div>
          ))}
        </div>
      </figure>

      <div className="work-reel-lead__copy">
        <h3 className="work-reel-lead__title" id="work-reel-lead-title">
          {item.title}
        </h3>
        <WorkCaption item={item} />
      </div>
    </article>
  );
}

function WorkFeature({ item, reverse = false }: { item: WorkItem; reverse?: boolean }) {
  return (
    <article
      className={reverse ? "work-feature work-feature--reverse" : "work-feature"}
      aria-labelledby={`work-${item.id}-title`}
    >
      <figure className="work-feature__media" aria-hidden="true">
        <WorkMedia item={item} />
      </figure>

      <div className="work-feature__caption">
        <h3 className="work-feature__title" id={`work-${item.id}-title`}>
          {item.title}
        </h3>
        <WorkCaption item={item} />
      </div>
    </article>
  );
}

function WorkArchiveRow({ item }: { item: WorkItem }) {
  return (
    <article className="work-archive" aria-labelledby={`work-${item.id}-title`}>
      <div className="work-archive__copy">
        <h3 className="work-archive__title" id={`work-${item.id}-title`}>
          {item.title}
        </h3>
        <WorkCaption item={item} compact />
      </div>

      <figure className="work-archive__media" aria-hidden="true">
        <WorkMedia item={item} compact />
      </figure>
    </article>
  );
}

export function WorkProof() {
  return (
    <section className="work-proof" aria-labelledby="work-proof-title">
      <div className="work-proof__intro">
        <p className="work-proof__label">04 / Arbeid</p>

        <h2 className="work-proof__title" id="work-proof-title">
          <span className="work-proof__word work-proof__word--dim">Bygd</span>{" "}
          <span className="work-proof__word">for</span>{" "}
          <span className="work-proof__word work-proof__word--dim">å bli</span>{" "}
          <span className="work-proof__word">valgt.</span>
        </h2>

        <p className="work-proof__caption">
          Seks egenproduserte demoer viser hvordan Tigon former webapper, søkeflater,
          apper og systemer som digitale arbeidsrom.
        </p>

        <p className="work-proof__foot">TGN—SHOWCASE / DEMOER UTEN NAVN</p>
      </div>

      <div className="work-proof__reel">
        {workItems.map((item) => {
          if (item.weight === "lead") {
            return <WorkReelLead item={item} key={item.id} />;
          }

          if (item.weight === "feature") {
            return <WorkFeature item={item} key={item.id} reverse={item.mediaKey === "app"} />;
          }

          return <WorkArchiveRow item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
}
