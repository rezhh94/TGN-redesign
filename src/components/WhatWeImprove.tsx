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

/* 03 / Effekt — én kausal resultatkjede, ikke fire scrollscener. Hele kjeden er
   serverrendret og leses som én setning: funnet → forstått → valgt → målt. */
export function WhatWeImprove() {
  return (
    <section className="what-improve" aria-labelledby="what-improve-title">
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

        <ol className="what-improve__chain" aria-label="Resultatkjede">
          {outcomes.map((outcome) => (
            <li className="what-improve__outcome" key={outcome.key}>
              <div className="what-improve__step">
                <span className="what-improve__num">{outcome.number}</span>
                <span className="what-improve__node" aria-hidden="true" />
              </div>
              <h3 className="what-improve__title">{outcome.title}</h3>
              <p className="what-improve__text">{outcome.description}</p>
              <p className="what-improve__tools">{outcome.tools}</p>
            </li>
          ))}
        </ol>

        <p className="what-improve__closing">
          <span>Synlighet inn</span>
          <span aria-hidden="true">→</span>
          <span>målbar kontakt ut</span>
        </p>
      </div>
    </section>
  );
}
