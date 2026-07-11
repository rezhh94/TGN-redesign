const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "Funnet",
    signal: "Målepunkt — synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
    tools: "Teknisk SEO · Sitemap · Schema · AI-lesbar struktur",
  },
  {
    key: "forstatt",
    number: "02",
    title: "Forstått",
    signal: "Målepunkt — klarhet / budskap",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
    tools: "Posisjonering · Budskapshierarki · Innhold",
  },
  {
    key: "valgt",
    number: "03",
    title: "Valgt",
    signal: "Målepunkt — konvertering / neste steg",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
    tools: "CTA-er · Kontaktflyt · Skjema",
  },
  {
    key: "malt",
    number: "04",
    title: "Målt",
    signal: "Målepunkt — sporing / hendelser",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
    tools: "Hendelser · Skjema · Telefon · E-post",
  },
];

export function WhatWeImprove() {
  return (
    <section className="what-improve" aria-labelledby="what-improve-title" data-theme-section="light" data-bg-section="mauve">
      <div className="what-improve__inner">
        <header className="what-improve__intro">
          <p className="what-improve__label">03 / Effekt</p>
          <h2 className="what-improve__kicker" id="what-improve-title">
            Én løsning. Fire målbare utslag.
          </h2>
          <p className="what-improve__desc">
            Design, teknologi og synlighet skal ikke levere hver sin effekt. De skal føre samme vei fra oppmerksomhet til dokumentert handling.
          </p>
        </header>

        <div className="what-improve__word-stage looping-words" aria-hidden="true">
          <div className="looping-words__containers">
            <ul className="looping-words__list" data-looping-words-list="">
              {outcomes.map((outcome) => (
                <li className="looping-words__item" data-looping-key={outcome.key} key={outcome.key}>
                  <p className="looping-words__word">{outcome.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="looping-words__fade" />
          <div className="looping-words__selector" data-looping-words-selector="">
            <span className="looping-words__edge" />
            <span className="looping-words__edge looping-words__edge--2" />
            <span className="looping-words__edge looping-words__edge--3" />
            <span className="looping-words__edge looping-words__edge--4" />
          </div>
        </div>

        <div className="what-improve__detail-stage">
          <ol className="what-improve__index" aria-label="Resultatkjede">
            {outcomes.map((outcome) => (
              <li
                data-looping-index={outcome.key}
                data-active={outcome.key === "forstatt" ? "" : undefined}
                key={outcome.key}
              >
                <span>{outcome.number}</span>
                <strong>{outcome.title}</strong>
              </li>
            ))}
          </ol>

          <div className="what-improve__details">
            {outcomes.map((outcome) => (
              <article
                className="what-improve__detail"
                data-looping-detail={outcome.key}
                data-active={outcome.key === "forstatt" ? "" : undefined}
                key={outcome.key}
              >
                <header>
                  <span>{outcome.number} / 04</span>
                  <h3>{outcome.title}</h3>
                </header>
                <p className="what-improve__text">{outcome.description}</p>
                <div className="what-improve__detail-meta">
                  <p className="what-improve__signal">{outcome.signal}</p>
                  <p className="what-improve__tools">{outcome.tools}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="what-improve__closing">
          <span>Synlighet inn</span>
          <span aria-hidden="true">→</span>
          <span>Målbar kontakt ut</span>
        </p>
      </div>
    </section>
  );
}
