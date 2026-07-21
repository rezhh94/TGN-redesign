const phases = [
  {
    title: "Retning",
    body: "Vi avklarer hva som skal bygges, hvem det skal treffe og hva som velges bort.",
  },
  {
    title: "Bygg",
    body: "Design, kode, ytelse og integrasjoner formes som én prioritert løsning.",
  },
  {
    title: "Live",
    body: "Løsningen lanseres med teknisk kontroll, måling og en tydelig neste handling.",
  },
] as const;

export function ProcessLayers() {
  return (
    <section className="process-journey" id="prosess" aria-labelledby="process-journey-title" data-theme-section="dark" data-bg-section="dark">
      <div className="process-journey__stage" data-process-stage>
        <header className="process-journey__intro">
          <h2 className="process-journey__title" id="process-journey-title">
            Prosessen
          </h2>
          <p className="process-journey__intro-copy">
            Fra retning til live.
          </p>
        </header>

        <div className="process-deck">
          <div
            className="process-deck__viewport"
            data-process-viewport
            role="region"
            aria-label="Prosessfaser. Bla horisontalt for å lese alle fasene."
            tabIndex={0}
          >
            <ol className="process-deck__track" data-process-track>
              {phases.map((phase) => (
                <li className="process-phase" key={phase.title} data-process-surface>
                  <div className="process-phase__copy">
                    <h3>{phase.title}</h3>
                    <p>{phase.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <footer className="process-journey__closer">
        <a href="/kontakt?ref=prosess">Start et prosjekt <span aria-hidden="true">↗</span></a>
      </footer>
    </section>
  );
}
