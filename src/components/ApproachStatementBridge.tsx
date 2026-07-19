// 01 / Tilnærming — statisk statement-seksjon. Teksten server-rendres
// komplett (SEO/no-JS); HomeMotion splitter ord og scrubber tekstfyllet.
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
        <div className="approach-statement__support">
          <p className="approach-statement__support-meta">
            Design / tydelighet
            <br />
            Teknologi / kvalitet
            <br />
            Synlighet / effekt
          </p>
          <p className="approach-statement__support-copy" data-intro-fill="support">
            Én samlet leveranse fra første beslutning til lansering, måling og
            videreutvikling — med retning, kvalitet og synlighet bygget inn fra
            start.
          </p>
        </div>
        <p className="approach-statement__handoff">
          01 → 02 / Én helhet. Fem fag.
        </p>
      </div>
    </section>
  );
}
