export function ApproachStatementBridge() {
  return (
    <section
      className="approach-bridge"
      aria-labelledby="approach-bridge-title"
      data-intro-parallax
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="approach-intro" data-intro-surface>
        <header className="approach-intro__head">
          <p>01 / Tilnærming</p>
          <p>TGN / Design · Teknologi · Synlighet</p>
        </header>

        <div className="approach-intro__journey" data-intro-journey>
          <div className="approach-intro__composition">
            <h2
              className="approach-intro__title"
              id="approach-bridge-title"
              data-intro-title
              aria-label="Synlig er ikke valgt."
            >
              <span data-intro-title-left>Synlig er ikke</span>
              <span className="approach-intro__aperture" aria-hidden="true" data-intro-aperture>
                <figure data-intro-aperture-item data-active="true"><img src="/services/01.png" alt="" /></figure>
                <figure data-intro-aperture-item data-active="false"><img src="/services/04.png" alt="" /></figure>
                <figure data-intro-aperture-item data-active="false"><img src="/services/05.png" alt="" /></figure>
              </span>
              <span data-intro-title-right>valgt.</span>
            </h2>

            <div className="approach-intro__argument">
              <p>
                Tigon bygger design, teknologi og synlighet som én helhet. Da blir
                løsningen ikke bare sett, men forstått, valgt og målt.
              </p>
              <p data-intro-discipline>Design / 01</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
