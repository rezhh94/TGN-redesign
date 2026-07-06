export function SystemManifesto() {
  return (
    <section className="system-manifesto" aria-labelledby="system-manifesto-title">
      <div className="system-manifesto__inner">
        <p className="system-manifesto__label">System</p>

        <h2 className="system-manifesto__statement" id="system-manifesto-title">
          <span className="system-manifesto__line" data-manifesto-line>
            <span className="system-manifesto__line-inner system-manifesto__line-inner--muted">
              Design kan lånes.
            </span>
          </span>
          <span className="system-manifesto__line" data-manifesto-line>
            <span className="system-manifesto__line-inner">System må bygges.</span>
          </span>
        </h2>

        <p className="system-manifesto__support" data-manifesto-support>
          Struktur, innhold, fart og måling henger sammen i alt vi leverer. Det er systemet
          under overflaten som gjør at en løsning blir funnet — og tåler å endres.
        </p>

        <span className="system-manifesto__corner system-manifesto__corner--tl" aria-hidden="true">
          T
        </span>
        <span className="system-manifesto__corner system-manifesto__corner--tr" aria-hidden="true">
          G
        </span>
        <span className="system-manifesto__corner system-manifesto__corner--bl" aria-hidden="true">
          N
        </span>
        <span className="system-manifesto__corner system-manifesto__corner--br" aria-hidden="true">
          SYS—06
        </span>
      </div>
    </section>
  );
}
