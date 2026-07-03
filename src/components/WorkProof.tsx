/* 04 / Arbeid — FINAL: Split Proof / System Slab (variant C + B's material).
   Hard split scene: the darkness of 03 persists as a charcoal proof monolith
   on the left (it stops short of the floor — the stone room shows under it),
   while a cast system slab leans through the stone canvas on the right,
   cropped by the chapter's right and bottom edge. Three technical cuts read
   as the delivery standards — contrast, structure, speed. Anonymous proof:
   no named cases, no grid, no table. */
export function WorkProof() {
  return (
    <section className="work-proof" aria-labelledby="work-proof-title">
      <div className="work-proof__split">
        <div className="work-proof__panel">
          <p className="work-proof__label">04 / Arbeid</p>

          <h2 className="work-proof__title" id="work-proof-title">
            <span className="work-proof__word work-proof__word--dim">Visuelt</span>
            <span className="work-proof__word">sterkt.</span>
            <span className="work-proof__word work-proof__word--dim">Teknisk</span>
            <span className="work-proof__word">riktig.</span>
          </h2>

          <p className="work-proof__lead">Standarden under alt vi leverer —</p>

          <a className="work-proof__link" href="/arkiv">
            Se arkivet
          </a>

          <p className="work-proof__foot">TGN — proof / ingen navn, bare nivå</p>
        </div>

        <div className="work-proof__surface" aria-hidden="true">
          {/* The slab — one cast system surface leaning out of the frame */}
          <div className="work-proof__slab">
            <span className="work-proof__slab-back" />
            <div className="work-proof__slab-face">
              <span className="work-proof__slab-kicker">Systemflate — støpt / NO</span>
              <span className="work-proof__slab-block" />
              <span className="work-proof__slab-line" />
              <span className="work-proof__engrave">TGN</span>
            </div>
          </div>

          {/* Technical cuts — the standards, sampled off the slab */}
          <div className="work-proof__cut work-proof__cut--contrast">
            <span className="work-proof__cut-tag">Snitt 01 — kontrast</span>
            <span className="work-proof__cut-glyph">Aa</span>
            <span className="work-proof__cut-value">WCAG AA</span>
          </div>

          <div className="work-proof__cut work-proof__cut--struktur">
            <span className="work-proof__cut-tag">Snitt 02 — struktur</span>
            <span className="work-proof__cut-grid" />
            <span className="work-proof__cut-value">Indeksert dag én</span>
          </div>

          <div className="work-proof__cut work-proof__cut--fart">
            <span className="work-proof__cut-tag">Snitt 03 — fart / LCP</span>
            <span className="work-proof__cut-figure">&lt; 2,0 s</span>
            <span className="work-proof__cut-scale" />
          </div>
        </div>
      </div>
    </section>
  );
}
