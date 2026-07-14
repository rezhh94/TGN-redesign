const phases = [
  {
    n: "01",
    tag: "Retning",
    heading: "Vi finner retningen.",
    body: "Vi avklarer hva som skal bygges, hvem det skal treffe og hva som velges bort før uttrykket låses.",
    materials: ["Behov", "Mål", "Innhold"],
    output: "Definert retning",
  },
  {
    n: "02",
    tag: "Bygg",
    heading: "Vi bygger løsningen.",
    body: "Design, kode, ytelse og integrasjoner formes som én prioritert løsning.",
    materials: ["Flyt", "Teknologi", "Integrasjon"],
    output: "Levende løsning",
  },
  {
    n: "03",
    tag: "Live",
    heading: "Vi sender den ut.",
    body: "Løsningen lanseres med teknisk kontroll, måling og en tydelig neste handling.",
    materials: ["Måling", "Kontaktvei", "Resultat"],
    output: "Målbar kontaktvei",
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
          <p>Tre beslutninger gjør behovet til en levende, målbar løsning.</p>
          <span>TGN / process assembly / 01—03</span>
        </div>
      </header>

      <div className="process-field" data-process-stage>
        <div className="process-field__materials" aria-hidden="true">
          <i className="process-field__material process-field__material--mauve" data-process-surface />
          <i className="process-field__material process-field__material--olive" data-process-surface />
          <i className="process-field__material process-field__material--paper" data-process-surface />
        </div>

        <p className="process-field__entry">
          <span>Inn / 00</span>
          <strong>Fra behov til live</strong>
        </p>

        <ol className="process-field__phases">
          {phases.map((phase) => (
            <li className={`process-field__phase process-field__phase--${phase.n}`} key={phase.n}>
              <header>
                <span>{phase.n} / 03</span>
                <strong>{phase.tag}</strong>
              </header>
              <h3>{phase.heading}</h3>
              <p>{phase.body}</p>
              <small>{phase.materials.join(" / ")}</small>
              <footer>
                <span>Ut / {phase.n}</span>
                <strong>{phase.output}</strong>
              </footer>
            </li>
          ))}
        </ol>

        <span className="process-field__seal" aria-hidden="true" />
      </div>

      <footer className="process-journey__closer">
        <p>Scope først. Ingen ferdig brief nødvendig.</p>
        <a href="/kontakt?ref=prosess">Start et prosjekt <span aria-hidden="true">↗</span></a>
      </footer>
    </section>
  );
}
