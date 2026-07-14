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

      <div className="process-system" data-process-stage>
        <header className="process-system__rail">
          <p>TGN / Systemflyt</p>
          <p>Fra behov til live</p>
          <p><span aria-hidden="true" /> 00—03 / Klar linje</p>
        </header>

        <ol className="process-system__sequence">
          {phases.map((phase) => (
            <li className={`process-phase process-phase--${phase.n}`} key={phase.n} data-process-surface>
              <header className="process-phase__head">
                <span>{phase.n} / 03</span>
                <strong>{phase.tag}</strong>
              </header>

              <div className="process-phase__signal" aria-hidden="true">
                <span className="process-phase__numeral">{phase.n}</span>
                <span className="process-phase__glyph">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>

              <div className="process-phase__copy">
                <h3>{phase.heading}</h3>
                <p>{phase.body}</p>
              </div>

              <p className="process-phase__materials">
                <span>Arbeidsflate</span>
                <small>{phase.materials.join(" / ")}</small>
              </p>

              <footer className="process-phase__output">
                <span>Ut / {phase.n}</span>
                <strong>{phase.output}</strong>
              </footer>
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
