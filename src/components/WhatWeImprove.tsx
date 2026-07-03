import { Fragment } from "react";

const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "FUNNET",
    signal: "Målepunkt — synlighet / søk + AI-søk",
    meter: "Synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
  },
  {
    key: "forstatt",
    number: "02",
    title: "FORSTÅTT",
    signal: "Målepunkt — klarhet / budskap",
    meter: "Klarhet / budskap",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
  },
  {
    key: "valgt",
    number: "03",
    title: "VALGT",
    signal: "Målepunkt — konvertering / neste steg",
    meter: "Konvertering / neste steg",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
  },
  {
    key: "malt",
    number: "04",
    title: "MÅLT",
    signal: "Målepunkt — sporing / hendelser",
    meter: "Sporing / hendelser",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
  },
];

/* Every word pre-wrapped in a mask span (server-rendered — no JS innerHTML
   splitting). Words sit at rest by default; only the stage timeline moves
   the inner spans, so no-JS/PRM/mobile always read plain, sharp text. */
function MaskedWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          <span className="what-improve__mw">
            <span className="what-improve__mw-inner">{word}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

export function WhatWeImprove() {
  return (
    <section className="what-improve" aria-labelledby="what-improve-title">
      {/* MWG 006 architecture: tall pin-height wrapper drives the scrub,
          the frame inside is the pinned 100vh scene. Both are plain divs
          until JS adds .what-improve--stage. */}
      <div className="what-improve__pin" data-effect-pin>
        <div className="what-improve__frame" data-effect-frame>
          <div className="what-improve__grid" aria-hidden="true" />

          <div className="what-improve__inner">
            <header className="what-improve__top">
              <p className="what-improve__label">03 / Effekt</p>
              <h2 className="what-improve__kicker" id="what-improve-title">
                Alt vi bygger, bygges for å bli —
              </h2>
            </header>

            <div className="what-improve__scene">
              {/* Left: the outcome stack. In stage mode all four occupy the
                  same cell; scroll swaps them word by word. */}
              <div className="what-improve__copy">
                {outcomes.map((outcome) => (
                  <article
                    className="what-improve__outcome"
                    data-outcome-block={outcome.key}
                    key={outcome.key}
                  >
                    <p className="what-improve__number">
                      <MaskedWords text={`${outcome.number} / 04`} />
                    </p>
                    <h3 className="what-improve__word">
                      <MaskedWords text={outcome.title} />
                    </h3>
                    <p className="what-improve__signal">
                      <MaskedWords text={outcome.signal} />
                    </p>
                    <p className="what-improve__description">
                      <MaskedWords text={outcome.description} />
                    </p>
                  </article>
                ))}
              </div>

              {/* Right: the måleflate — one dark instrumented surface that
                  reads the active outcome. Ghost numeral and readout swap
                  with the copy; rail and scan track the scrub. Decorative,
                  stage mode only. */}
              <div className="what-improve__plate" aria-hidden="true">
                <span className="what-improve__plate-corner what-improve__plate-corner--tl">+</span>
                <span className="what-improve__plate-corner what-improve__plate-corner--tr">+</span>
                <span className="what-improve__plate-corner what-improve__plate-corner--bl">+</span>
                <span className="what-improve__plate-corner what-improve__plate-corner--br">+</span>

                <p className="what-improve__plate-id">Måleflate</p>
                <p className="what-improve__plate-range">01–04</p>

                <div className="what-improve__plate-index">
                  {outcomes.map((outcome) => (
                    <span data-plate-numeral={outcome.key} key={outcome.key}>
                      {outcome.number}
                    </span>
                  ))}
                </div>

                <span className="what-improve__plate-scan" data-plate-scan />

                <span className="what-improve__plate-rail">
                  <span className="what-improve__plate-rail-fill" data-plate-rail-fill />
                </span>

                <div className="what-improve__plate-readout">
                  {outcomes.map((outcome) => (
                    <span data-plate-readout={outcome.key} key={outcome.key}>
                      {outcome.meter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
