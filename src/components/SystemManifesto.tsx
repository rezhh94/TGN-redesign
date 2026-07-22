export function SystemManifesto() {
  return (
    <section
      className="system-manifesto"
      aria-labelledby="system-manifesto-title"
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="system-manifesto__inner">
        <div className="system-manifesto__composition">
          <h2 className="system-manifesto__statement" id="system-manifesto-title">
            <span className="system-manifesto__line system-manifesto__line--one">
              <span className="system-manifesto__line-inner">Det du ser.</span>
            </span>
            <span className="system-manifesto__line system-manifesto__line--two">
              <span className="system-manifesto__line-inner">Det som virker.</span>
            </span>
            <span className="system-manifesto__line system-manifesto__line--three">
              <span className="system-manifesto__line-inner">Ett system.</span>
            </span>
          </h2>

          <p className="system-manifesto__support">
            Bygges sammen fra start.
          </p>
        </div>
      </div>
    </section>
  );
}
