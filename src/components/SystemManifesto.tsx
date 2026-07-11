export function SystemManifesto() {
  return (
    <section className="system-manifesto" aria-labelledby="system-manifesto-title" data-theme-section="dark" data-bg-section="dark">
      <div className="system-manifesto__inner">
        <div className="system-manifesto__grid" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
        </div>

        <header className="system-manifesto__head">
          <p>06 / System</p>
          <p>TGN / Under overflaten</p>
        </header>

        <div className="system-manifesto__frame">
          <p className="system-manifesto__kicker">Det synlige er bare starten.</p>

          <div className="system-manifesto__mark" data-system-mark aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <span data-system-piece={index + 1} key={index} />
            ))}
            <i>TGN / ASSEMBLY</i>
          </div>

          <h2 className="system-manifesto__statement" id="system-manifesto-title">
            <span><span className="system-manifesto__line-inner">Designet</span></span>
            <span><span className="system-manifesto__line-inner">blir valgt.</span></span>
            <span><span className="system-manifesto__line-inner">Systemet gjør</span></span>
            <span><span className="system-manifesto__line-inner">at det varer.</span></span>
          </h2>

          <div className="system-manifesto__argument">
            <p className="system-manifesto__support" data-manifesto-support>
              Under ligger struktur, innhold, fart og måling. Det er helheten som gjør løsningen lettere å finne, forstå, velge og forbedre.
            </p>
            <p>Design / Teknologi / Synlighet</p>
          </div>

          <div className="system-manifesto__frame-meta" aria-hidden="true">
            <span>TGN / SYSTEM</span>
            <span>06 — 001A1A</span>
          </div>
        </div>

        <p className="system-manifesto__seal" aria-hidden="true">TGN — SYS/06</p>
      </div>
    </section>
  );
}
