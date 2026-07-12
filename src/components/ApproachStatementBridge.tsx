const disciplines = ["Design", "Teknologi", "Synlighet"] as const;

export function ApproachStatementBridge() {
  return (
    <section
      className="approach-bridge"
      aria-labelledby="approach-bridge-title"
      data-intro-story
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="approach-intro" data-intro-identity>
        <header className="approach-intro__head">
          <p>01 / Introduksjon</p>
          <p>TGN / Digitalt studio</p>
        </header>

        <div className="approach-intro__identity">
          <p className="approach-intro__eyebrow">Dette er Tigon.</p>
          <h2 className="approach-intro__title" id="approach-bridge-title">
            <span>Et digitalt studio</span>
            <span>for nettsider, apper</span>
            <span>og systemer.</span>
          </h2>
          <p className="approach-intro__copy">
            Vi samler design, teknologi og synlighet i én leveranse — fra den
            første ideen til en løsning som virker i markedet.
          </p>
        </div>
      </div>

      <div className="approach-gap" data-intro-gap-journey>
        <div className="approach-gap__stage" data-intro-gap-stage>
          <header className="approach-gap__head">
            <p>Fra idé til løsning</p>
            <p>Tre fag. Ett system.</p>
          </header>

          <div className="approach-gap__composition">
            <p className="approach-gap__lead">En idé er ikke en løsning.</p>
            <h3 className="approach-gap__statement" aria-label="Idé til løsning">
              <span data-intro-gap-left>IDÉ</span>
              <span className="approach-gap__field" data-intro-gap-field aria-hidden="true">
                <span className="approach-gap__disciplines" data-intro-gap-disciplines>
                  {disciplines.map((discipline, index) => (
                    <span key={discipline}>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      {discipline}
                    </span>
                  ))}
                </span>
              </span>
              <span data-intro-gap-right>LØSNING</span>
            </h3>
            <p className="approach-gap__copy">
              Avstanden lukkes når uttrykk, produkt og synlighet blir utviklet
              som deler av det samme systemet.
            </p>
          </div>
        </div>
      </div>

      <div className="approach-resolution" data-intro-resolution>
        <p className="approach-resolution__label">Design · Teknologi · Synlighet</p>
        <h3>Bygd som én helhet.</h3>
        <div className="approach-resolution__footer">
          <p>
            Ikke tre separate leveranser som må sys sammen til slutt. Én tydelig
            retning, bygget for å bli funnet, forstått, valgt og målt.
          </p>
          <p>TGN / Integrert leveranse</p>
        </div>
      </div>
    </section>
  );
}
