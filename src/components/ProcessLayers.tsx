const processLayers = [
  {
    number: "01",
    title: "Avklar",
    description: "Hva skal bygges, hvorfor, og hva må det løse?",
    input: "Uklart behov",
    output: "Definert scope",
  },
  {
    number: "02",
    title: "Strukturér",
    description: "Innhold, flyt, søkbarhet og måling settes før designet låses.",
    input: "Definert scope",
    output: "Struktur og målplan",
  },
  {
    number: "03",
    title: "Bygg",
    description: "Design, kode og integrasjoner utvikles med rask feedback.",
    input: "Struktur og målplan",
    output: "Fungerende løsning",
  },
  {
    number: "04",
    title: "Lanser",
    description: "Siden publiseres med måling, teknisk sjekk og tydelig neste steg.",
    input: "Fungerende løsning",
    output: "Live løsning, målt fra dag én",
  },
];

export function ProcessLayers() {
  return (
    <section className="process-layers" aria-labelledby="process-layers-title">
      <div className="process-layers__inner">
        <header className="process-layers__header">
          <p className="process-layers__label">05 / Prosess</p>
          <div className="process-layers__copy">
            <h2 className="process-layers__title" id="process-layers-title">
              Fra første samtale
              <br />
              til ferdig løsning.
            </h2>
            <p className="process-layers__lead">
              Ikke et langt byråløp. En kontrollert produksjon fra avklaring til lansering.
            </p>
          </div>
        </header>

        <div className="process-layers__map" aria-label="Produksjonsflyt" data-process-map>
          <span className="process-layers__line" aria-hidden="true" data-process-line />

          {processLayers.map((layer, index) => (
            <article
              className="process-layers__step"
              data-process-layer
              data-process-index={index + 1}
              key={layer.number}
            >
              <span className="process-layers__node" aria-hidden="true" />
              <p className="process-layers__number">{layer.number}</p>
              <div className="process-layers__step-copy">
                <h3 className="process-layers__layer-title">{layer.title}</h3>
                <p className="process-layers__description">{layer.description}</p>
              </div>
              <dl className="process-layers__io">
                <div className="process-layers__io-row">
                  <dt>Inn</dt>
                  <dd>{layer.input}</dd>
                </div>
                <div className="process-layers__io-row">
                  <dt>Ut</dt>
                  <dd>{layer.output}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
