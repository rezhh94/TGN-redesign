const steps = [
  {
    n: "01",
    tag: "Prosess / Scope",
    heading: "Vi finner retningen",
    body: "Behovet presses ned til scope. Vi avklarer hva som faktisk skal bygges, hvorfor det trengs og hva som må velges bort — så innholdet får en teknisk rekkefølge før uttrykket låses.",
    output: "Definert retning",
    image: "/work/mockups/15.png",
  },
  {
    n: "02",
    tag: "Prosess / Bygg",
    heading: "Vi bygger løsningen",
    body: "Design og kode bygges som ett materiale. UI, komponenter, ytelse og integrasjoner utvikles sammen, med rask feedback og ryddig prioritering.",
    output: "Levende løsning",
    image: "/work/mockups/12.png",
  },
  {
    n: "03",
    tag: "Prosess / Live",
    heading: "Vi sender det ut i verden",
    body: "Siden går live med måling fra dag én. Publisering, teknisk sjekk, skjema, telefon og hendelser kobles til én tydelig neste beslutning.",
    output: "Målbar kontaktvei",
    image: "/work/mockups/05.png",
  },
];

/* 05 / Prosess — "Prosjektreisen". Monumental tittel, så tre steg-rader stablet
   loddrett: STEG · 0X + overskrift/tekst til venstre, stort media-panel til
   høyre, hårstrek mellom radene. Ren vertikal scroll (ingen pin) → samme layout
   på desktop og mobil; radene stiger inn på scroll og tittelen dekoder fra støy.
   Default (no-JS / PRM) er alt synlig og lesbart uten JavaScript.

   Bildene er midlertidige mockup-assets til ekte steg-bilder finnes. */
export function ProcessLayers() {
  return (
    <section className="process-journey" id="prosess" aria-labelledby="process-journey-title">
      <div className="process-journey__inner">
        <header className="process-journey__head">
          <p className="process-journey__eyebrow">Prosess</p>
          <h2
            className="process-journey__title"
            id="process-journey-title"
            data-process-decode
            aria-label="Uklart inn. System ut."
          >
            <span className="process-journey__line1" aria-hidden="true">
              Uklart inn.
            </span>
            <span className="process-journey__line2" aria-hidden="true">
              System ut.
            </span>
          </h2>
          <p className="process-journey__note">
            <span className="process-journey__note-mark" aria-hidden="true" />
            Tre steg — én produksjonslinje
          </p>
        </header>

        <ol className="process-journey__steps">
          {steps.map((step) => (
            <li className="process-journey__row" data-journey-row key={step.n}>
              <p className="process-journey__step">Steg · {step.n}</p>

              <div className="process-journey__text">
                <h3 className="process-journey__heading">{step.heading}</h3>
                <p className="process-journey__body">{step.body}</p>
                <p className="process-journey__out">Ut — {step.output} →</p>
              </div>

              <figure className="process-journey__media" data-journey-media>
                <img src={step.image} alt="" loading="lazy" />
                <figcaption className="process-journey__media-tag">
                  {step.tag} · {step.n}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>

        <div className="process-journey__closer">
          <p className="process-journey__closer-title">
            Fra et uklart behov til et målbart system.
          </p>
          <a className="process-journey__closer-cta" href="/kontakt?ref=prosess">
            Start et prosjekt →
          </a>
        </div>
      </div>
    </section>
  );
}
