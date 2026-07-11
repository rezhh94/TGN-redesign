export function ApproachStatementBridge() {
  return (
    <section
      className="approach-bridge"
      aria-labelledby="approach-bridge-title"
      data-intro-parallax
    >
      <div className="approach-intro" data-intro-surface>
        <header className="approach-intro__head">
          <p>01 / Tilnærming</p>
          <p>TGN / Bygd for å bli valgt</p>
        </header>

        <div className="approach-intro__composition">
          <h2 className="approach-intro__title" id="approach-bridge-title" data-intro-title>
            <span>Synlig er</span>
            <span>ikke det samme</span>
            <span>som valgt.</span>
          </h2>

          <div className="approach-intro__argument">
            <p>
              Tigon bygger design, teknologi og synlighet som én helhet – så løsningen
              blir funnet, forstått og valgt.
            </p>
            <p>Retning før uttrykk. System før støy.</p>
          </div>

          <div className="approach-intro__focus" aria-hidden="true">
            <span className="approach-intro__focus-mark" />
            <span>Fokus / 01</span>
            <i />
          </div>
        </div>

        <footer className="approach-intro__foot">
          <p>Design / Teknologi / Synlighet</p>
          <p>Scroll for tjenester</p>
        </footer>
      </div>
    </section>
  );
}
