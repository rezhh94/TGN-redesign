// 01 / Tilnærming — normal-flow editorial statement. Teksten server-rendres
// komplett (SEO/no-JS); HomeMotion legger kun til fyll, linje og små entrer.
export function ApproachStatementBridge() {
  return (
    <section
      className="approach-statement"
      aria-labelledby="approach-statement-title"
      data-intro-story
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="approach-statement__inner">
        <p className="approach-statement__label">01 / Tilnærming</p>
        <h2
          className="approach-statement__title"
          id="approach-statement-title"
          data-intro-fill="display"
        >
          High-end nettsider, apper og digitale systemer hvor design, teknologi
          og synlighet bygges som én helhet.
        </h2>

        <div className="approach-statement__rule" data-intro-rule aria-hidden="true">
          <span className="approach-statement__rule-line" data-intro-rule-line />
          <span className="approach-statement__rule-marker" data-intro-rule-marker>
            <span />
            <span />
          </span>
        </div>

        <div className="approach-statement__support">
          <div className="approach-statement__support-register" data-intro-support>
            <p className="approach-statement__support-meta">
              Design / tydelighet
              <br />
              Teknologi / kvalitet
              <br />
              Synlighet / effekt
            </p>
          </div>

          <div className="approach-statement__support-aside" data-intro-support>
            <p className="approach-statement__support-copy">
              Én samlet leveranse fra første beslutning til lansering, måling og
              videreutvikling — med retning, kvalitet og synlighet bygget inn fra
              start.
            </p>
            <a className="approach-statement__link" href="#what-build-title">
              <span>Se hva vi bygger</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
