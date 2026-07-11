const phases = [
  {
    n: "01",
    tag: "Retning",
    heading: "Vi finner retningen.",
    body: "Behovet presses ned til scope. Vi avklarer hva som skal bygges, hvem det skal treffe og hva som må velges bort før uttrykket låses.",
    materials: ["Behov", "Mål", "Innhold"],
    output: "Definert retning",
  },
  {
    n: "02",
    tag: "Bygg",
    heading: "Vi bygger løsningen.",
    body: "Design og kode utvikles som ett materiale. UI, komponenter, ytelse og integrasjoner formes sammen med tydelig prioritering.",
    materials: ["Flyt", "Teknologi", "Integrasjon"],
    output: "Levende løsning",
  },
  {
    n: "03",
    tag: "Live",
    heading: "Vi sender den ut.",
    body: "Løsningen går live med teknisk kontroll og måling fra dag én. Hver kontakt kobles til en tydelig neste beslutning.",
    materials: ["Måling", "Kontaktvei", "Resultat"],
    output: "Målbar kontaktvei",
  },
] as const;

export function ProcessLayers() {
  return (
    <section className="process-journey" id="prosess" aria-labelledby="process-journey-title">
      <header className="process-journey__intro">
        <p className="process-journey__eyebrow">05 / Prosess</p>
        <h2 className="process-journey__title" id="process-journey-title">
          Fra uklart behov til målbart system.
        </h2>
        <div className="process-journey__intro-meta">
          <p>Tre beslutninger. Én sammenhengende produksjon.</p>
          <p>Retning / Bygg / Live</p>
        </div>
      </header>

      <div className="process-flow" data-process-path-section>
        <div className="process-flow__rail" aria-hidden="true">
          <svg viewBox="0 0 120 900" preserveAspectRatio="none">
            <path className="process-flow__path-ghost" d="M22 0 C22 170 92 120 92 300 S22 420 22 600 S92 730 92 900" />
            <path data-process-path pathLength="1" d="M22 0 C22 170 92 120 92 300 S22 420 22 600 S92 730 92 900" />
          </svg>
          <div className="process-flow__traveler" data-process-traveler>
            <span />
          </div>
          <span>Uklart behov</span>
          <span>Målbar kontaktvei</span>
        </div>

        <ol className="process-flow__stages">
          {phases.map((phase) => (
            <li className="process-stage" data-process-stage key={phase.n}>
              <header className="process-stage__head">
                <span>{phase.n} / 03</span>
                <p>{phase.tag}</p>
              </header>

              <div className="process-stage__copy">
                <h3>{phase.heading}</h3>
                <p>{phase.body}</p>
              </div>

              <div className="process-stage__system">
                <div className={`process-stage__station process-stage__station--${phase.n}`} aria-hidden="true">
                  <span>TGN / ASSEMBLY {phase.n}</span>
                  <div className="process-stage__station-mark">
                    {Array.from({ length: 4 }, (_, index) => <i key={index} />)}
                  </div>
                  <div className="process-stage__station-lines">
                    {Array.from({ length: 5 }, (_, index) => <i key={index} />)}
                  </div>
                </div>
                <div>
                  <p>Inn / materiale</p>
                  <ul>
                    {phase.materials.map((material) => <li key={material}>{material}</li>)}
                  </ul>
                </div>
                <p className="process-stage__output"><span>Ut</span>{phase.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <footer className="process-journey__closer">
        <p>Scope først. Ingen ferdig brief nødvendig.</p>
        <a href="/kontakt?ref=prosess">Start et prosjekt <span aria-hidden="true">↗</span></a>
      </footer>
    </section>
  );
}
