const workMeta = ["Next.js", "SEO", "Måling", "Struktur"];

export function WorkShowcase() {
  return (
    <section className="work-showcase" aria-labelledby="work-showcase-title">
      <div className="work-showcase__inner">
        <div className="work-showcase__intro">
          <p className="work-showcase__label">04 / Arbeid</p>

          <div className="work-showcase__copy">
            <h2 className="work-showcase__title" id="work-showcase-title">
              Visuelt sterkt.
              <br />
              Teknisk riktig.
            </h2>
            <p className="work-showcase__lead">
              Nettsider, apper og digitale flater bygget med struktur, fart og tydelig retning.
            </p>
          </div>
        </div>

        <div className="work-showcase__layout">
          <div className="work-showcase__meta">
            <p className="work-showcase__meta-label">01 / Webutvikling</p>
            <p className="work-showcase__meta-stack">{workMeta.join(" / ")}</p>
            <p className="work-showcase__caption">
              En digital flate skal ikke bare se bra ut. Den må være rask, forståelig og bygget
              for å bli valgt.
            </p>
          </div>

          <div className="work-showcase__visuals" aria-hidden="true">
            <div className="work-showcase__visual work-showcase__visual--main" data-work-visual="main">
              <div className="work-showcase__surface">
                <span className="work-showcase__surface-line work-showcase__surface-line--wide" />
                <span className="work-showcase__surface-line" />
                <span className="work-showcase__surface-line work-showcase__surface-line--short" />
                <span className="work-showcase__surface-word">TIGON</span>
              </div>
            </div>

            <div
              className="work-showcase__visual work-showcase__visual--detail"
              data-work-visual="detail"
            >
              <div className="work-showcase__detail-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
