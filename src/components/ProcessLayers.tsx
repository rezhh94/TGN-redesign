const phases = [
  {
    n: "01",
    tag: "Retning",
    heading: "Vi finner retningen.",
    body: "Behovet presses ned til scope. Vi avklarer hva som skal bygges, hvem det skal treffe og hva som må velges bort før uttrykket låses.",
    materials: ["Behov", "Mål", "Innhold"],
    output: "Definert retning",
    tone: "paper",
  },
  {
    n: "02",
    tag: "Bygg",
    heading: "Vi bygger løsningen.",
    body: "Design og kode utvikles som ett materiale. UI, komponenter, ytelse og integrasjoner formes sammen med tydelig prioritering.",
    materials: ["Flyt", "Teknologi", "Integrasjon"],
    output: "Levende løsning",
    tone: "olive",
  },
  {
    n: "03",
    tag: "Live",
    heading: "Vi sender den ut.",
    body: "Løsningen går live med teknisk kontroll og måling fra dag én. Hver kontakt kobles til en tydelig neste beslutning.",
    materials: ["Måling", "Kontaktvei", "Resultat"],
    output: "Målbar kontaktvei",
    tone: "mauve",
  },
] as const;

export function ProcessLayers() {
  return (
    <section className="process-journey" id="prosess" aria-labelledby="process-journey-title" data-theme-section="dark" data-bg-section="dark">
      <header className="process-journey__intro">
        <p className="process-journey__label">05 / Prosess</p>
        <h2 className="process-journey__title" id="process-journey-title">
          <span>Uklart inn.{" "}</span>
          <span>System ut.</span>
        </h2>
        <div className="process-journey__intro-copy">
          <p>Tre beslutninger gjør et uklart behov til en levende, målbar løsning.</p>
          <span>TGN / process assembly / 01—03</span>
        </div>
      </header>

      <div className="process-assembly" data-process-stage aria-hidden="true">
        <div className="process-assembly__cards">
          {phases.map((phase, phaseIndex) => (
            <article
              className={`process-card process-card--${phase.tone} process-card--${phase.n}`}
              data-process-surface
              key={phase.n}
            >
              <header>
                <span>{phase.n} / 03</span>
                <strong>{phase.tag}</strong>
              </header>
              <div className="process-card__mark">
                {Array.from({ length: 4 }, (_, pieceIndex) => (
                  <i data-active={pieceIndex < phaseIndex + 1 ? "true" : "false"} key={pieceIndex} />
                ))}
              </div>
              <div className="process-card__materials">
                {phase.materials.map((material) => <span key={material}>{material}</span>)}
              </div>
              <footer>
                <span>Ut / {phase.n}</span>
                <strong>{phase.output}</strong>
              </footer>
            </article>
          ))}
        </div>

        <div className="process-assembly__legend">
          <span>TGN / material in motion / 01—03</span>
          <strong>System ut.</strong>
          <span>Retning / Bygg / Live</span>
        </div>
      </div>

      <div className="process-journey__index-head">
        <p>Fra behov til live</p>
        <p>Én produksjon — tre beslutninger</p>
      </div>

      <ol
        className="process-journey__index"
        data-reveal-group
        data-distance="1em"
        data-stagger="90"
      >
        {phases.map((phase) => (
          <li className="process-journey__phase" key={phase.n}>
            <span>{phase.n}</span>
            <div>
              <h3>{phase.tag}</h3>
              <p>{phase.body}</p>
              <small>{phase.materials.join(" / ")}</small>
            </div>
            <strong>{phase.output}</strong>
          </li>
        ))}
      </ol>

      <footer className="process-journey__closer">
        <p>Scope først. Ingen ferdig brief nødvendig.</p>
        <a href="/kontakt?ref=prosess">Start et prosjekt <span aria-hidden="true">↗</span></a>
      </footer>
    </section>
  );
}
