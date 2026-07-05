const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "Funnet",
    signal: "Målepunkt — synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
    image: "/work/carousel/01.png",
  },
  {
    key: "forstatt",
    number: "02",
    title: "Forstått",
    signal: "Målepunkt — klarhet / budskap",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
    image: "/work/carousel/02.png",
  },
  {
    key: "valgt",
    number: "03",
    title: "Valgt",
    signal: "Målepunkt — konvertering / neste steg",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
    image: "/work/carousel/03.png",
  },
  {
    key: "malt",
    number: "04",
    title: "Målt",
    signal: "Målepunkt — sporing / hendelser",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
    image: "/work/carousel/04.png",
  },
];

/* 03 / Effekt — «måletråd». Venstre: en sticky index-skinne (01–04) med en
   vertikal tråd som fylles mens du scroller; det aktive målepunktet lyser opp.
   Høyre: fire outcome-blokker med kjempenumeral som grafisk anker. Tråden er
   den ærlige «måling»-visualiseringen (punkter på en linje fra funnet → målt) —
   ingen oppdiktede tall.

   Default (no JS / PRM): tokolonne, alt synlig og lesbart, ingen sporing.
   JS legger på .what-improve--tracked og aktiverer fyll + aktiv-tilstand. */
export function WhatWeImprove() {
  return (
    <section className="what-improve" aria-labelledby="what-improve-title">
      <div className="what-improve__inner">
        <header className="what-improve__top">
          <p className="what-improve__label">03 / Effekt</p>
          <h2 className="what-improve__kicker" id="what-improve-title">
            Alt vi bygger, bygges for å bli —
          </h2>
        </header>

        <div className="what-improve__layout" data-improve-root>
          {/* Sticky index-skinne — visuell oversikt, skjult for skjermlesere
              (innholdet bor i strømmen til høyre). */}
          <aside className="what-improve__rail" aria-hidden="true">
            <ol className="what-improve__index">
              <span className="what-improve__thread">
                <span className="what-improve__thread-fill" data-improve-progress />
              </span>
              {outcomes.map((outcome, index) => (
                <li className="what-improve__index-item" data-improve-dot={index} key={outcome.key}>
                  <span className="what-improve__index-num">{outcome.number}</span>
                  <span className="what-improve__index-name">{outcome.title}</span>
                </li>
              ))}
            </ol>
            <p className="what-improve__rail-note">
              Fire målepunkter — fra funnet til målt.
            </p>
          </aside>

          {/* Outcome-strøm */}
          <div className="what-improve__stream">
            {outcomes.map((outcome, index) => (
              <article
                className="what-improve__outcome"
                data-improve-block={index}
                key={outcome.key}
              >
                <p className="what-improve__num" aria-hidden="true">
                  {outcome.number}
                </p>
                <div className="what-improve__outcome-body">
                  <h3 className="what-improve__title">{outcome.title}</h3>
                  <p className="what-improve__text">{outcome.description}</p>
                  <p className="what-improve__signal">{outcome.signal}</p>
                </div>
                <figure className="what-improve__media">
                  <img src={outcome.image} alt="" loading="lazy" />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
