const phases = [
  {
    n: "01",
    tag: "Retning",
    heading: "Vi finner retningen",
    body: "Behovet presses ned til scope. Vi avklarer hva som faktisk skal bygges, hvorfor det trengs og hva som må velges bort — før uttrykket låses.",
    materials: ["Behov", "Mål", "Innhold"],
    output: "Definert retning",
  },
  {
    n: "02",
    tag: "Bygg",
    heading: "Vi bygger løsningen",
    body: "Design og kode utvikles som ett materiale. UI, komponenter, ytelse og integrasjoner formes sammen, med raske beslutninger og tydelig prioritering.",
    materials: ["Flyt", "Teknologi", "Integrasjon"],
    output: "Levende løsning",
  },
  {
    n: "03",
    tag: "Live",
    heading: "Vi sender det ut i verden",
    body: "Løsningen går live med teknisk kontroll og måling fra dag én. Hver kontakt kobles til en tydelig neste beslutning.",
    materials: ["Måling", "Kontaktvei", "Resultat"],
    output: "Målbar kontaktvei",
  },
];

/* 05 / Prosess — et lesbart input → system → resultat-kart. Hele strukturen er
   serverrendret og står statisk; GSAP får kun organisere materialene inn én
   gang og tegne den dekorative forbindelseslinjen. */
export function ProcessLayers() {
  return (
    <section className="process-journey" id="prosess" aria-labelledby="process-journey-title">
      <div className="process-journey__inner">
        <header className="process-journey__head">
          <p className="process-journey__eyebrow">05 / Prosess</p>
          <h2
            className="process-journey__title"
            id="process-journey-title"
            data-process-decode
            aria-label="Uklart inn. System ut."
          >
            <span className="process-journey__line1" aria-hidden="true">Uklart inn.</span>
            <span className="process-journey__line2" aria-hidden="true">System ut.</span>
          </h2>
          <p className="process-journey__note">
            <span className="process-journey__note-mark" aria-hidden="true" />
            Tre beslutninger — ett sammenhengende system
          </p>
        </header>

        <div className="process-flow" data-process-system>
          <div className="process-flow__head">
            <span>TGN / Systemflyt</span>
            <span>Uklart behov</span>
            <span aria-hidden="true">→</span>
            <span>Målbar kontaktvei</span>
          </div>

          <ol className="process-flow__phases">
            {phases.map((phase) => (
              <li className="process-flow__phase" data-process-step key={phase.n}>
                <p className="process-flow__number">{phase.n} / 03</p>
                <p className="process-flow__word" aria-hidden="true">{phase.tag}</p>

                <div className="process-flow__copy">
                  <span>{phase.tag}</span>
                  <h3>{phase.heading}</h3>
                  <p>{phase.body}</p>
                </div>

                <ul className="process-flow__materials" aria-label={`Materiale i ${phase.tag.toLowerCase()}`}>
                  {phase.materials.map((material) => <li data-process-token key={material}>{material}</li>)}
                </ul>

                <p className="process-flow__output">
                  <span>Ut</span>
                  <strong>{phase.output}</strong>
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="process-journey__closer">
          <p className="process-journey__closer-title">Fra et uklart behov til et målbart system.</p>
          <a className="process-journey__closer-cta" href="/kontakt?ref=prosess">Start et prosjekt →</a>
        </div>
      </div>
    </section>
  );
}
