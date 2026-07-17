type ScrollTextItem = {
  text: string;
  pos: number;
  alt: number;
  ease?: string;
};

const groups: ScrollTextItem[][] = [
  [
    { text: "Webutvikling", pos: 4, alt: 2 },
    { text: "Apputvikling", pos: 4, alt: 2 },
    { text: "Digitale systemer", pos: 4, alt: 2 },
  ],
  [
    { text: "UX-strategi", pos: 1, alt: 3 },
    { text: "UI-design", pos: 1, alt: 3 },
    { text: "Produktdesign", pos: 1, alt: 3 },
    { text: "Prototyping", pos: 1, alt: 3 },
  ],
  [{ text: "Designsystem", pos: 1, alt: 2 }],
  [
    { text: "Teknisk SEO", pos: 1, alt: 3 },
    { text: "Innholdsstruktur", pos: 1, alt: 3 },
  ],
  [
    { text: "Merkevare", pos: 2, alt: 5 },
    { text: "Visuell identitet", pos: 2, alt: 5 },
    { text: "Art direction", pos: 2, alt: 5 },
  ],
  [{ text: "Frontend", pos: 3, alt: 9 }],
  [
    { text: "Interaksjonsdesign", pos: 3, alt: 2 },
    { text: "Mikroanimasjon", pos: 3, alt: 2 },
    { text: "Motion design", pos: 3, alt: 2 },
    { text: "Scrollopplevelser", pos: 3, alt: 2 },
  ],
  [
    { text: "Tilgjengelighet", pos: 1, alt: 3 },
    { text: "Universell utforming", pos: 1, alt: 3 },
  ],
  [
    { text: "Backend", pos: 2, alt: 4 },
    { text: "API-utvikling", pos: 2, alt: 4 },
    { text: "Integrasjoner", pos: 2, alt: 4 },
    { text: "Datamodellering", pos: 2, alt: 4 },
    { text: "Automatisering", pos: 2, alt: 4 },
  ],
  [{ text: "Analyse", pos: 1, alt: 3 }],
  [
    { text: "Søkesynlighet", pos: 2, alt: 9 },
    { text: "Innholdsstrategi", pos: 2, alt: 9 },
    { text: "Informasjonsarkitektur", pos: 2, alt: 9 },
    { text: "Konvertering", pos: 2, alt: 9 },
    { text: "Måling", pos: 2, alt: 9 },
  ],
  [{ text: "Netthandel", pos: 3, alt: 10, ease: "expo.in" }],
  [
    { text: "Publiseringsløsning", pos: 4, alt: 3 },
    { text: "Headless CMS", pos: 4, alt: 3 },
    { text: "Redaktørflyt", pos: 4, alt: 3 },
    { text: "Innholdsmodell", pos: 4, alt: 3 },
  ],
  [
    { text: "Teknisk kvalitet", pos: 1, alt: 3 },
    { text: "Sikkerhet", pos: 1, alt: 3 },
  ],
  [
    { text: "Ytelse", pos: 3, alt: 5 },
    { text: "Responstid", pos: 3, alt: 5 },
    { text: "Stabilitet", pos: 3, alt: 5 },
    { text: "Skalering", pos: 3, alt: 5 },
  ],
  [{ text: "Digital strategi", pos: 2, alt: 3 }],
  [
    { text: "Produktutvikling", pos: 3, alt: 6 },
    { text: "Tjenestedesign", pos: 3, alt: 6 },
    { text: "Brukerinnsikt", pos: 3, alt: 6 },
    { text: "Konseptutvikling", pos: 3, alt: 6 },
  ],
  [
    { text: "Webapplikasjoner", pos: 2, alt: 7 },
    { text: "Mobilapper", pos: 2, alt: 7 },
    { text: "Kundeportaler", pos: 2, alt: 7 },
    { text: "Interne verktøy", pos: 2, alt: 7 },
  ],
  [
    { text: "Kampanjesider", pos: 3, alt: 8 },
    { text: "Landingssider", pos: 3, alt: 8 },
    { text: "Merkevarenettsteder", pos: 3, alt: 8 },
    { text: "Nettbutikker", pos: 3, alt: 8 },
    { text: "Digitale tjenester", pos: 3, alt: 8 },
    { text: "Designbibliotek", pos: 3, alt: 8 },
    { text: "Komponentsystemer", pos: 3, alt: 8 },
    { text: "Prototyper", pos: 3, alt: 8 },
  ],
  [
    { text: "Forvaltning", pos: 1, alt: 1 },
    { text: "Videreutvikling", pos: 1, alt: 2 },
    { text: "Optimalisering", pos: 1, alt: 4 },
    { text: "Innsikt", pos: 1, alt: 5 },
    { text: "Rapportering", pos: 1, alt: 6 },
    { text: "Rådgivning", pos: 1, alt: 4 },
  ],
  [
    { text: "Funnet", pos: 4, alt: 1 },
    { text: "Forstått", pos: 4, alt: 2 },
    { text: "Valgt", pos: 4, alt: 3 },
    { text: "Målt", pos: 4, alt: 1 },
  ],
];

export function ApproachStatementBridge() {
  return (
    <section
      className="approach-bridge"
      aria-labelledby="approach-bridge-title"
      data-intro-story
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <h2 className="approach-intro__semantic" id="approach-bridge-title">
        Hver for seg blir det lansert. Bygd sammen blir det valgt.
      </h2>

      <div className="approach-atmosphere" aria-hidden="true">
        <video
          className="approach-atmosphere__video"
          muted
          playsInline
          loop
          preload="none"
          data-intro-wave
        >
          <source data-src="/video/work-wave-loop.mp4" type="video/mp4" />
        </video>
        <div className="approach-atmosphere__spotlight" />
        <div className="approach-atmosphere__vignette" />
        <div className="approach-atmosphere__veil" />
      </div>

      <div className="logo fixed">
        <div className="logo__block">
          <span className="logo__title">Bygd sammen</span>
          <p className="logo__statement">
            Design uten synlighet blir ikke funnet. Synlighet uten substans blir
            ikke valgt. Derfor utvikler Tigon design, teknologi og synlighet som
            én løsning — fra første beslutning.
          </p>
          <span className="logo__meta">TGN / integrated practice</span>
        </div>
      </div>

      <div className="content" aria-hidden="true">
        {groups.map((group, groupIndex) => (
          <div className="group" key={groupIndex}>
            {group.map((item, itemIndex) => (
              <div
                className={`el pos-${item.pos}`}
                data-alt-pos={`pos-${item.alt}`}
                data-flip-ease={item.ease}
                key={`${groupIndex}-${itemIndex}`}
              >
                <span className="el__text">{item.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="approach-intro__preserved">
        <p data-intro-handoff>01 → 02 / Én helhet. Fem fag.</p>
      </div>
    </section>
  );
}
