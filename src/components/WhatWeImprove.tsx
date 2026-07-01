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
        <p className="what-improve__label">03 / Effekt</p>

        <div className="what-improve__canvas">
          <h2 className="what-improve__title" id="what-improve-title">
            {outcomes.map((outcome) => (
              <span
                className="what-improve__word"
                data-outcome-word
                data-outcome={outcome.key}
                key={outcome.title}
              >
                {outcome.title}
              </span>
            ))}
          </h2>

          {outcomes.map((outcome) => (
            <div
              className={`what-improve__annotation what-improve__annotation--${outcome.key}`}
              data-outcome={outcome.key}
              key={outcome.number}
            >
              <p className="what-improve__number">{outcome.number}</p>
              <p className="what-improve__description">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
