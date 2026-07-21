const marqueeWords = ["Tydelighet", "Kvalitet", "Synlighet", "Effekt"] as const;

function MarqueePlus() {
  return (
    <svg
      className="service-prelude__marquee-plus"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="20" y1="0" x2="20" y2="40" />
      <line x1="40" y1="20" x2="0" y2="20" />
    </svg>
  );
}

export function ServicePrelude() {
  return (
    <section
      className="service-prelude"
      aria-labelledby="service-prelude-title"
      data-service-prelude
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="service-prelude__inner">
        <div className="service-prelude__facts" data-service-prelude-facts>
          <header className="service-prelude__heading">
            <h2 id="service-prelude-title">Bygget som én helhet.</h2>
            <p className="service-prelude__lead">
              Fagene og leveransene møtes før løsningen tar form. Det gir én retning,
              ett ansvar og et bedre grunnlag for det som skal bygges.
            </p>
          </header>

          <div className="service-prelude__cards" data-service-prelude-cards>
            <article className="service-prelude__card service-prelude__card--discipline" data-service-prelude-card>
              <h3>Tre fag. Én helhet.</h3>
              <p>Design, teknologi og synlighet bygges sammen fra første beslutning.</p>
            </article>

            <article className="service-prelude__card service-prelude__card--delivery" data-service-prelude-card>
              <h3>Fem leveranser. Ett ansvar.</h3>
              <p>Fra nettsider og apper til AI-systemer, SEO og AI-søk.</p>
            </article>

            <article className="service-prelude__card service-prelude__card--outcome" data-service-prelude-card>
              <h3>Fire utfall. Samme mål.</h3>
              <p>Funnet. Forstått. Valgt. Målt.</p>
            </article>
          </div>
        </div>

        <div
          className="service-prelude__marquee"
          data-source-marquee
          data-source-marquee-speed="0.8"
          data-source-marquee-gap="0"
          aria-label="Tydelighet, kvalitet, synlighet og effekt"
        >
          <div className="service-prelude__marquee-track" data-source-marquee-track aria-hidden="true">
            <div className="service-prelude__marquee-group" data-source-marquee-group>
              {marqueeWords.map((word) => (
                <span className="service-prelude__marquee-item" key={word}>
                  <span>{word}</span>
                  <MarqueePlus />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="service-prelude__shutter"
        data-shutter-scroll-transition=""
        data-mode="cover"
        data-rows="16"
        data-rows-tablet="10"
        data-rows-mobile="6"
        data-scroll-start="bottom bottom"
        data-scroll-end="bottom top"
        data-scroll-offset-mobile="[data-service-prelude-facts]"
        aria-hidden="true"
      />
    </section>
  );
}
