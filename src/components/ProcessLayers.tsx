const phases = [
  {
    id: "1",
    title: "Retning",
    body: "Vi avklarer hva som skal bygges, hvem det skal treffe og hva som velges bort.",
  },
  {
    id: "2",
    title: "Bygg",
    body: "Design, kode, ytelse og integrasjoner formes som én prioritert løsning.",
  },
  {
    id: "3",
    title: "Live",
    body: "Løsningen lanseres med teknisk kontroll, måling og en tydelig neste handling.",
  },
] as const;

function ProcessPlus({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 0V12M0 6H12" stroke="currentColor" />
    </svg>
  );
}

export function ProcessLayers() {
  return (
    <section
      className="process-journey"
      id="prosess"
      aria-labelledby="process-journey-title"
      data-process-section
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="process-journey__stage" data-process-stage>
        <div className="process-journey__frame">
          <header className="process-journey__intro">
            <span className="process-journey__eyebrow">05 / Prosess</span>
            <h2 className="process-journey__title" id="process-journey-title">
              Fra retning til live.
            </h2>
          </header>

          <ol className="process-ledger">
            {phases.map((phase, index) => (
              <li className="process-phase" key={phase.id} data-process-phase>
                <div className="process-phase__grid">
                  <span className="process-phase__step" data-process-step>
                    Steg — {phase.id}
                  </span>
                  <div className="process-phase__copy">
                    <h3 data-process-title>{phase.title}</h3>
                    <p data-process-content>{phase.body}</p>
                  </div>
                </div>

                <div className="process-phase__axis" aria-hidden="true">
                  <span className="process-phase__line" data-process-line />
                  <ProcessPlus className="process-phase__plus" />
                  <ProcessPlus className="process-phase__plus-follow" />
                </div>

                {index < phases.length - 1 ? (
                  <span className="process-phase__divider" data-process-divider aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>

          <div className="process-journey__closer">
            <a href="/kontakt?ref=prosess">
              Start et prosjekt <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
