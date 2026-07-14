const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "Funnet",
    signal: "Målepunkt — synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
    tools: "Teknisk SEO · Sitemap · Schema · AI-lesbar struktur",
    placeholder: "/work/capability-stage/tgn-product-os-laptop.webp",
  },
  {
    key: "forstatt",
    number: "02",
    title: "Forstått",
    signal: "Målepunkt — klarhet / budskap",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
    tools: "Posisjonering · Budskapshierarki · Innhold",
    placeholder: "/work/capability-stage/tgn-product-os-laptop.webp",
  },
  {
    key: "valgt",
    number: "03",
    title: "Valgt",
    signal: "Målepunkt — konvertering / neste steg",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
    tools: "CTA-er · Kontaktflyt · Skjema",
    placeholder: "/work/capability-stage/phone-hand.png",
  },
  {
    key: "malt",
    number: "04",
    title: "Målt",
    signal: "Målepunkt — sporing / hendelser",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
    tools: "Hendelser · Skjema · Telefon · E-post",
    placeholder: "/work/capability-stage/phone-hand.png",
  },
];

export function WhatWeImprove() {
  return (
    <section
      className="what-improve"
      aria-labelledby="what-improve-title"
      data-effect-section
      data-theme-section="light"
      data-bg-section="mauve"
    >
      <div className="what-improve__inner">
        <header className="what-improve__intro">
          <p className="what-improve__label">03 / Effekt</p>
          <h2 className="what-improve__kicker" id="what-improve-title">
            <span>Effekt som{" "}</span>
            <span>kan måles.</span>
          </h2>
          <div className="what-improve__desc">
            <p>
              Design, teknologi og synlighet skal føre samme vei — fra
              oppmerksomhet til dokumentert handling.
            </p>
            <span>TGN / outcome system / 01—04</span>
          </div>
        </header>

        <div className="what-improve__field" data-effect-field>
          <figure className="what-improve__visual">
            <img src={outcomes[0].placeholder} alt="" loading="lazy" />
            <figcaption>Midlertidig mockupflate / erstattes</figcaption>
          </figure>

          <div className="what-improve__cuts" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
          </div>

          <ol className="what-improve__matrix" aria-label="Resultatkjede">
            {outcomes.map((outcome) => (
              <li
                className={`what-improve__outcome what-improve__outcome--${outcome.key}`}
                data-effect-outcome
                key={outcome.key}
              >
                <header>
                  <span>{outcome.number} / 04</span>
                  <span>{outcome.signal}</span>
                </header>
                <h3>{outcome.title}</h3>
                <div className="what-improve__outcome-copy">
                  <p>{outcome.description}</p>
                  <p>{outcome.tools}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="what-improve__closing">
            <span>Synlighet inn</span>
            <span aria-hidden="true">→</span>
            <span>Målbar kontakt ut</span>
          </p>
        </div>
      </div>
    </section>
  );
}
