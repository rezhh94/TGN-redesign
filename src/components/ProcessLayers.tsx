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

        <div className="process-system" data-process-system>
          <div className="process-system__head">
            <span>TGN / Systemflyt</span>
            <span>Input → resultat</span>
          </div>

          <div className="process-system__path">
            <span>Uklart behov</span>
            <span aria-hidden="true">→</span>
            <span>Målbar kontaktvei</span>
          </div>

          <ol className="process-system__phases">
            {phases.map((phase) => (
              <li className="process-system__phase" data-process-step key={phase.n}>
                <div className="process-system__phase-meta">
                  <span>{phase.n} / 03</span>
                  <span>{phase.tag}</span>
                </div>

                <p className="process-system__phase-word" aria-hidden="true">{phase.tag}</p>
                <h3>{phase.heading}</h3>
                <p className="process-system__phase-body">{phase.body}</p>

                <ul className="process-system__materials" aria-label={`Materiale i ${phase.tag.toLowerCase()}`}>
                  {phase.materials.map((material) => (
                    <li data-process-token key={material}>
                      <span>{material}</span>
                      <span aria-hidden="true">→</span>
                    </li>
                  ))}
                </ul>

                <p className="process-system__output">Ut — {phase.output}</p>
              </li>
            ))}
          </ol>

          <div className="process-system__rail" aria-hidden="true">
            <span className="process-system__rail-base" />
            <span className="process-system__rail-progress" data-process-progress />
            <div className="process-system__checkpoints">
              {phases.map((phase) => <span key={phase.n}>{phase.n}</span>)}
            </div>
          </div>

          <div className="process-system__foot">
            <span className="process-system__signal" aria-hidden="true" />
            <span>Behov strukturert</span>
            <span>System bygget</span>
            <span>Resultat målt</span>
          </div>
        </div>

        <div className="process-journey__closer">
          <p className="process-journey__closer-title">Fra et uklart behov til et målbart system.</p>
          <a className="process-journey__closer-cta" href="/kontakt?ref=prosess">Start et prosjekt →</a>
        </div>
      </div>
    </section>
  );
}
