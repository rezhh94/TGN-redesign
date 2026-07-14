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
      <header className="approach-intro" data-intro-identity>
        <p className="approach-intro__label">01 / Tilnærming</p>
        <h2 className="approach-intro__title" id="approach-bridge-title">
          <span>Tre fag.</span>
          <span>Én helhet.</span>
        </h2>
        <div className="approach-intro__copy">
          <p>
            Design, teknologi og synlighet utviklet sammen fra første
            beslutning — så løsningen både treffer, virker og blir funnet.
          </p>
          <span>TGN / integrated practice / 01—03</span>
        </div>
      </header>

      <ol className="approach-disciplines" aria-label="Tigons tre fag">
        {disciplines.map((discipline, index) => (
          <li key={discipline}>
            <span>0{index + 1}</span>
            <strong>{discipline}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
