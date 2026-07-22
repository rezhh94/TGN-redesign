const outcomes = [
  {
    key: "funnet",
    title: "FUNNET",
    description:
      "Struktur og innhold som gjør løsningen lettere å finne i Google og AI-søk.",
  },
  {
    key: "forstatt",
    title: "FORSTÅTT",
    description:
      "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
  },
  {
    key: "valgt",
    title: "VALGT",
    description:
      "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig og enklere å ta.",
  },
  {
    key: "malt",
    title: "MÅLT",
    description:
      "Skjema, telefon, e-post og viktige hendelser som kan spores fra start.",
  },
] as const;

const headingWords = ["Effekt", "som", "kan", "måles."] as const;

function EffectRule() {
  return (
    <div className="what-improve__rule" aria-hidden="true">
      <span />
      <svg viewBox="0 0 13 13" fill="none">
        <path d="M6.5 0v13M0 6.5h13" />
      </svg>
    </div>
  );
}

function EffectOpening() {
  const title = (
    <>
      {headingWords.map((word) => (
        <span className="what-improve__title-word" aria-hidden="true" key={word}>
          {Array.from(word).map((character, index) => (
            <span className="what-improve__title-char" key={`${word}-${index}`}>
              {character}
            </span>
          ))}
        </span>
      ))}
    </>
  );

  return (
    <header className="what-improve__intro">
      <div
        className="what-improve__heading"
        data-effect-heading-pin
      >
        <p className="what-improve__eyebrow">03 / Effekt</p>
        <h2
          className="what-improve__title"
          id="what-improve-title"
          aria-label="Effekt som kan måles."
          data-effect-title
        >
          {title}
        </h2>
      </div>

      <p className="what-improve__summary" data-effect-summary>
        Design, teknologi og synlighet bygget for å bli funnet, forstått, valgt
        og målt.
      </p>
    </header>
  );
}

export function WhatWeImprove() {
  return (
    <section
      className="what-improve"
      aria-labelledby="what-improve-title"
      data-effect-section
      data-theme-section="light"
      data-bg-section="light"
    >
      <div className="what-improve__container">
        <EffectRule />

        <div className="what-improve__value-block" data-effect-value-block>
          <EffectOpening />

          <div className="what-improve__content-grid">
            <div className="what-improve__stack-wrap">
              <ol className="what-improve__stack" data-effect-stack>
                {outcomes.map((outcome) => (
                  <li
                    className="what-improve__card"
                    data-effect-fold-card
                    key={outcome.key}
                  >
                    <div className="what-improve__card-inner" data-effect-fold-inner>
                      <h3>{outcome.title}</h3>
                      <p>{outcome.description}</p>
                    </div>
                    <span className="what-improve__card-shadow" data-effect-fold-shadow />
                  </li>
                ))}
              </ol>

              <p className="what-improve__tagline" data-effect-tagline>
                ✦ Resultatet skal kunne sees – og måles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
