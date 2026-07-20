const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "FUNNET",
    signal: "Synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
  },
  {
    key: "forstatt",
    number: "02",
    title: "FORSTÅTT",
    signal: "Klarhet / budskap",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
  },
  {
    key: "valgt",
    number: "03",
    title: "VALGT",
    signal: "Konvertering / neste steg",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
  },
  {
    key: "malt",
    number: "04",
    title: "MÅLT",
    signal: "Sporing / hendelser",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
  },
] as const;

export function WhatWeImprove() {
  return (
    <section
      className="what-improve"
      aria-labelledby="what-improve-title"
      data-effect-section
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="what-improve__stage" data-effect-stage>
        <header className="what-improve__rail">
          <p>03 / Effekt</p>
          <p>Funnet / Forstått / Valgt / Målt</p>
        </header>

        <div className="what-improve__center" data-effect-center>
          <div className="what-improve__prelude" data-effect-prelude>
            <p className="what-improve__eyebrow">Fra tjenester til resultat</p>
            <h2 id="what-improve-title">
              <span>Effekt som</span>
              <span>kan måles.</span>
            </h2>
            <p className="what-improve__lead">
              Design, teknologi og synlighet bygget for å bli funnet,
              forstått, valgt og målt.
            </p>
          </div>

        </div>

        <ol className="what-improve__cards" aria-label="Resultatkjede">
          {outcomes.map((outcome) => (
            <li
              className={`what-improve__card what-improve__card--${outcome.key}`}
              data-effect-card
              data-effect-card-key={outcome.key}
              key={outcome.key}
            >
              <header>
                <span>{outcome.number} / 04</span>
                <span>Resultat</span>
              </header>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
              <footer>
                <span>Målepunkt</span>
                <span>{outcome.signal}</span>
              </footer>
            </li>
          ))}
        </ol>

        <footer className="what-improve__scene-footer">
          <p>Funnet / Forstått / Valgt / Målt</p>
          <p>Neste / Dette kan Tigon lage</p>
        </footer>
      </div>
    </section>
  );
}
