const outcomes = [
  {
    key: "funnet",
    number: "01",
    title: "Funnet",
    signal: "Målepunkt — synlighet / søk + AI-søk",
    description: "Struktur og innhold som gjør siden lettere å finne i Google og AI-søk.",
    tools: "Teknisk SEO · Sitemap · Schema · AI-lesbar struktur",
    image: "/work/carousel/01.png",
  },
  {
    key: "forstatt",
    number: "02",
    title: "Forstått",
    signal: "Målepunkt — klarhet / budskap",
    description: "Tydelig posisjonering, budskap og innhold som gjør tilbudet enklere å forstå.",
    tools: "Posisjonering · Budskapshierarki · Innhold",
    image: "/work/carousel/02.png",
  },
  {
    key: "valgt",
    number: "03",
    title: "Valgt",
    signal: "Målepunkt — konvertering / neste steg",
    description: "CTA-er, flyt og kontaktpunkter som gjør neste steg tydelig.",
    tools: "CTA-er · Kontaktflyt · Skjema",
    image: "/work/carousel/03.png",
  },
  {
    key: "malt",
    number: "04",
    title: "Målt",
    signal: "Målepunkt — sporing / hendelser",
    description: "Skjema, telefon, e-post og hendelser som kan spores fra start.",
    tools: "Hendelser · Skjema · Telefon · E-post",
    image: "/work/carousel/04.png",
  },
];

/* 03 / Effekt — stablede utfalls-kort. Venstre: en sticky kolonne (tittel +
   beskrivelse + index 01–04) som blir stående. Høyre: de fire målepunktene som
   kort som legger seg oppå hverandre på scroll (CSS position:sticky med økende
   top → forrige korts header «01 Funnet» stikker opp over det neste). Kun
   høyre-kolonnen stabler; venstre er fast referanse.

   Default (no-JS / PRM): stablingen er ren CSS og virker uansett; JS legger bare
   på aktiv-markering av index + fargeglød på det fremste kortets bilde. */
export function WhatWeImprove() {
  return (
    <section className="what-improve" aria-labelledby="what-improve-title">
      <div className="what-improve__inner">
        <div className="what-improve__layout" data-improve-root>
          {/* Venstre — fast tittel/beskrivelse + index */}
          <aside className="what-improve__aside">
            <p className="what-improve__label">Effekt</p>
            <h2 className="what-improve__kicker" id="what-improve-title">
              Alt vi bygger, bygges for å bli funnet, forstått, valgt og målt.
            </h2>
            <p className="what-improve__desc">
              Fire målepunkter under hver flate — fra du blir funnet i søk til hver kontakt kan spores.
            </p>

            {/* Aktiv-detalj — bytter med det fremste kortet. Sier HVORDAN (spakene)
                mens kortet sier HVA, så venstre ikke bare gjentar de fire navnene. */}
            <div className="what-improve__meter" aria-hidden="true">
              {outcomes.map((outcome, index) => (
                <p className="what-improve__detail" data-improve-dot={index} key={outcome.key}>
                  <span className="what-improve__detail-count">
                    {outcome.number} <span className="what-improve__detail-total">/ 0{outcomes.length}</span>
                  </span>
                  <span className="what-improve__detail-tools">{outcome.tools}</span>
                </p>
              ))}
            </div>
          </aside>

          {/* Høyre — stablede utfalls-kort */}
          <div className="what-improve__stream">
            {outcomes.map((outcome, index) => (
              <article
                className="what-improve__outcome"
                data-improve-block={index}
                key={outcome.key}
              >
                <div className="what-improve__head">
                  <p className="what-improve__num" aria-hidden="true">
                    {outcome.number}
                  </p>
                  <h3 className="what-improve__title">{outcome.title}</h3>
                </div>
                <div className="what-improve__body">
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
