const steps = [
  {
    n: "01",
    tag: "Retning",
    heading: "Vi finner retningen",
    body: "Behovet presses ned til scope. Vi avklarer hva som faktisk skal bygges, hvorfor det trengs og hva som må velges bort — før uttrykket låses.",
    output: "Definert retning",
    stageWord: "Retning",
  },
  {
    n: "02",
    tag: "Bygg",
    heading: "Vi bygger løsningen",
    body: "Design og kode utvikles som ett materiale. UI, komponenter, ytelse og integrasjoner formes sammen, med raske beslutninger og tydelig prioritering.",
    output: "Levende løsning",
    stageWord: "Bygg",
  },
  {
    n: "03",
    tag: "Live",
    heading: "Vi sender det ut i verden",
    body: "Løsningen går live med teknisk kontroll og måling fra dag én. Hver kontakt kobles til en tydelig neste beslutning.",
    output: "Målbar kontaktvei",
    stageWord: "Live",
  },
];

const material = ["Behov", "Mål", "Innhold", "Flyt", "Teknologi", "Måling"];

/* 05 / Prosess — én produksjonslinje. Teksten er alltid server-rendered og
   lesbar. På desktop følger ett typografisk materiale de tre stegene og endrer
   tilstand fra uordnet til strukturert til live; på mobil blir stegene en ren,
   tydelig redaksjonell sekvens. */
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
            Tre beslutninger — én produksjonslinje
          </p>
        </header>

        <div className="process-journey__sequence" data-process-root>
          <ol className="process-journey__steps">
            {steps.map((step, index) => (
              <li className="process-journey__row" data-process-step={index} key={step.n}>
                <div className="process-journey__stepmeta">
                  <span>Steg {step.n}</span>
                  <span>{step.tag}</span>
                </div>

                <h3 className="process-journey__heading">{step.heading}</h3>
                <p className="process-journey__body">{step.body}</p>
                <p className="process-journey__out">Ut — {step.output} →</p>
                <p className="process-journey__mobile-word" aria-hidden="true">{step.stageWord}</p>
              </li>
            ))}
          </ol>

          <figure className="process-journey__stage" data-process-stage data-state="0" aria-hidden="true">
            <div className="process-journey__stage-head">
              <span>TGN / Produksjonslinje</span>
              <span data-process-stage-count>01 — 03</span>
            </div>

            <div className="process-journey__material">
              {material.map((item) => (
                <span className="process-journey__material-item" key={item}>{item}</span>
              ))}
            </div>

            <div className="process-journey__stage-words">
              {steps.map((step, index) => (
                <span data-stage-word={index} key={step.n}>{step.stageWord}</span>
              ))}
            </div>

            <div className="process-journey__stage-foot">
              <span className="process-journey__stage-signal" />
              <span>Uklart behov</span>
              <span>→</span>
              <span>Målbart system</span>
            </div>
          </figure>
        </div>

        <div className="process-journey__closer">
          <p className="process-journey__closer-title">Fra et uklart behov til et målbart system.</p>
          <a className="process-journey__closer-cta" href="/kontakt?ref=prosess">Start et prosjekt →</a>
        </div>
      </div>
    </section>
  );
}
