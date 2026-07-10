const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "Funnet",
    signal: "Synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne når behovet faktisk oppstår.",
    tools: "Teknisk SEO · Sitemap · Schema · AI-lesbar struktur",
  },
  {
    key: "forstatt",
    number: "02",
    title: "Forstått",
    signal: "Klarhet / budskap",
    description: "Et tydelig hierarki som gjør tilbudet enklere å forstå og lettere å stole på.",
    tools: "Posisjonering · Budskapshierarki · Innhold",
  },
  {
    key: "valgt",
    number: "03",
    title: "Valgt",
    signal: "Konvertering / neste steg",
    description: "Flyt og kontaktpunkter som fjerner friksjon og gjør den neste handlingen tydelig.",
    tools: "CTA-er · Kontaktflyt · Skjema",
  },
  {
    key: "malt",
    number: "04",
    title: "Målt",
    signal: "Sporing / hendelser",
    description: "Måling som viser hva som virker, hvor kontakten kommer fra og hva som bør forbedres.",
    tools: "Hendelser · Skjema · Telefon · E-post",
  },
];

/* 03 / Effekt — en typografisk signalreise. Venstre kolonne holder seksjonens
   premiss, mens fire redaksjonelle bånd viser progresjonen fra synlighet til
   måling. Ingen kort, ingen bilder og ingen asset-avhengighet. */
export function WhatWeImprove() {
  return (
    <section className="what-improve" id="effekt" aria-labelledby="what-improve-title">
      <div className="what-improve__inner">
        <div className="what-improve__layout" data-improve-root>
          <header className="what-improve__aside">
            <p className="what-improve__label">03 / Effekt</p>
            <h2 className="what-improve__kicker" id="what-improve-title">
              Fra signal
              <span>til handling.</span>
            </h2>
            <p className="what-improve__desc">
              Alt vi bygger skal gjøre én sammenhengende jobb: bli funnet, forstått, valgt og målt.
            </p>

            <div className="what-improve__status" aria-hidden="true">
              <span className="what-improve__status-current" data-improve-count>01</span>
              <span className="what-improve__status-total">/ 04</span>
              <span className="what-improve__status-line" />
            </div>
          </header>

          <div className="what-improve__stream-stage">
            <span className="what-improve__signal-rail" aria-hidden="true">
              <span data-improve-signal />
            </span>

            <ol className="what-improve__stream">
              {outcomes.map((outcome, index) => (
                <li
                  className="what-improve__outcome"
                  data-improve-block={index}
                  key={outcome.key}
                >
                  <div className="what-improve__meta">
                    <span aria-hidden="true">{outcome.number}</span>
                    <span>{outcome.signal}</span>
                  </div>

                  <h3 className="what-improve__title">{outcome.title}</h3>

                  <div className="what-improve__body">
                    <p className="what-improve__text">{outcome.description}</p>
                    <p className="what-improve__tools">{outcome.tools}</p>
                  </div>

                  <span className="what-improve__trace" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
