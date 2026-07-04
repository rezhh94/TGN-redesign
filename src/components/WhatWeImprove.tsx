import { Fragment } from "react";

const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "Funnet",
    signal: "Målepunkt — synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
  },
  {
    key: "forstatt",
    number: "02",
    title: "Forstått",
    signal: "Målepunkt — klarhet / budskap",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
  },
  {
    key: "valgt",
    number: "03",
    title: "Valgt",
    signal: "Målepunkt — konvertering / neste steg",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
  },
  {
    key: "malt",
    number: "04",
    title: "Målt",
    signal: "Målepunkt — sporing / hendelser",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
  },
];

/* MWG 097 architecture: a plain content column of titled paragraphs. All
   text is server-rendered; JS splits it into lines/words at runtime, parks
   every line fully justified across the container width and scrubs each
   line back to natural width as it crosses the viewport. No JS = this
   exact document, untouched. */
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

        <div className="what-improve__container" data-improve-container>
          <div className="what-improve__content" data-improve-content>
            {outcomes.map((outcome) => (
              <Fragment key={outcome.key}>
                <h3 className="what-improve__title">
                  {outcome.number} — {outcome.title}
                </h3>
                <p className="what-improve__text">{outcome.description}</p>
                <p className="what-improve__signal">{outcome.signal}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
