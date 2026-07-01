const processLayers = [
  {
    number: "01",
    title: "Avklar",
    description: "Hva skal bygges, hvorfor, og hva må det løse?",
  },
  {
    number: "02",
    title: "Strukturér",
    description: "Innhold, flyt, søkbarhet og måling settes før designet låses.",
  },
  {
    number: "03",
    title: "Bygg",
    description: "Design, kode og integrasjoner utvikles med rask feedback.",
  },
  {
    number: "04",
    title: "Lanser",
    description: "Siden publiseres med måling, teknisk sjekk og tydelig neste steg.",
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

        <div className="process-layers__stack" aria-label="Produksjonsflyt">
          {processLayers.map((layer, index) => (
            <article
              className="process-layers__layer"
              data-process-layer
              data-process-index={index + 1}
              key={layer.number}
            >
              <p className="process-layers__number">{layer.number}</p>
              <div className="process-layers__layer-copy">
                <h3 className="process-layers__layer-title">{layer.title}</h3>
                <p className="process-layers__description">{layer.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
