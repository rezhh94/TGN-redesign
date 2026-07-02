const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "FUNNET",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
  },
  {
    key: "forstatt",
    number: "02",
    title: "FORSTÅTT",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
  },
  {
    key: "valgt",
    number: "03",
    title: "VALGT",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
  },
  {
    key: "malt",
    number: "04",
    title: "MÅLT",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
  },
];

export function WhatWeImprove() {
  return (
    <section className="what-improve" aria-labelledby="what-improve-title">
      <div className="what-improve__inner">
        <div className="what-improve__top">
          <p className="what-improve__label">03 / Effekt</p>
          <p className="what-improve__kicker">Alt vi bygger, bygges for å bli —</p>
        </div>

        <div className="what-improve__stage-area">
          <div className="what-improve__stage">
            <h2 className="what-improve__title" id="what-improve-title">
              {outcomes.map((outcome) => (
                <span
                  className="what-improve__word"
                  data-outcome-word
                  data-outcome={outcome.key}
                  key={outcome.key}
                >
                  {outcome.title}
                </span>
              ))}
            </h2>

            {outcomes.map((outcome) => (
              <div
                className="what-improve__note"
                data-outcome-note={outcome.key}
                data-outcome-pos={outcome.key}
                key={outcome.key}
              >
                <p className="what-improve__number">{outcome.number} / 04</p>
                <p className="what-improve__description">{outcome.description}</p>
              </div>
            ))}
          </div>

          <ol className="what-improve__spine" aria-hidden="true">
            {outcomes.map((outcome) => (
              <li className="what-improve__spine-item" data-spine={outcome.key} key={outcome.key}>
                <span className="what-improve__spine-number">{outcome.number}</span>
                <span className="what-improve__spine-word">{outcome.title}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="what-improve__progress" aria-hidden="true">
          <span className="what-improve__progress-bar" data-effect-progress-bar />
        </div>
      </div>
    </section>
  );
}
