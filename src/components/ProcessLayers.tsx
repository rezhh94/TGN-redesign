const processPanels = [
  {
    number: "01",
    tone: "stone",
    title: "Avklaring",
    label: "05 / Prosess / Scope",
    statement: "Behovet presses ned til scope.",
    body: "Før noe tegnes, avklarer vi hva som faktisk skal bygges, hvorfor det trengs og hva som må velges bort.",
    output: "Definert retning.",
  },
  {
    number: "02",
    tone: "dark",
    title: "Struktur",
    label: "05 / Prosess / Arkitektur",
    statement: "Innholdet får en teknisk rekkefølge.",
    body: "Sider, flyt, internlenker, søkbarhet og målepunkter legges som system før uttrykket låses.",
    output: "Søkbar arkitektur.",
  },
  {
    number: "03",
    tone: "stone2",
    title: "Produksjon",
    label: "05 / Prosess / Bygg",
    statement: "Design og kode bygges som ett materiale.",
    body: "UI, komponenter, ytelse og integrasjoner utvikles sammen, med rask feedback og ryddig prioritering.",
    output: "Levende løsning.",
  },
  {
    number: "04",
    tone: "deep",
    title: "Lansering",
    label: "05 / Prosess / Live",
    statement: "Siden går live med måling fra dag én.",
    body: "Publisering, teknisk sjekk, skjema, telefon, e-post og hendelser kobles til en tydelig neste beslutning.",
    output: "Målbar kontaktvei.",
  },
];

/* MWG 073 architecture: a tall pin-height wrapper provides the scroll
   runway; the rail inside is the pinned horizontal strip of full-viewport
   panels. Both are plain stacked divs until JS adds .process-layers--stage,
   so no-JS/PRM/mobile read a normal vertical document. */
export function ProcessLayers() {
  return (
    <section className="process-layers" id="prosess" aria-labelledby="process-layers-title">
      <div className="process-layers__pin" data-process-pin>
        <div className="process-layers__rail" data-process-rail>
          {processPanels.map((panel, index) => (
            <article
              className={`process-layers__panel process-layers__panel--${panel.tone}`}
              data-process-panel
              key={panel.number}
            >
              {index === 0 ? (
                <div className="process-layers__lead">
                  <h2 className="process-layers__title" id="process-layers-title">
                    Uklart inn.
                    <span>System ut.</span>
                  </h2>
                  <p className="process-layers__lead-note">
                    <span className="process-layers__lead-mark" aria-hidden="true" />
                    Fire steg — én produksjonslinje
                  </p>
                </div>
              ) : null}

              <div className="process-layers__body">
                <p className="process-layers__label">{panel.label}</p>
                <h3 className="process-layers__phase">{panel.title}</h3>
                <p className="process-layers__statement">{panel.statement}</p>
                <p className="process-layers__text">{panel.body}</p>
                <p className="process-layers__output">Ut — {panel.output}</p>
              </div>

              <p className="process-layers__index" data-process-index aria-hidden="true">
                {panel.number}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
