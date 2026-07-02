const standards = [
  { index: "K—01", value: "< 2,0 s", name: "Ytelse / LCP" },
  { index: "K—02", value: "Dag én", name: "Synlig / indeksert" },
  { index: "K—03", value: "WCAG AA", name: "Tilgjengelighet" },
  { index: "K—04", value: "0 maler", name: "Egen kode" },
];

/* 04 / Arbeid — the press proof. The page's light event, reframed from
   "cream document" to stone gallery sheet: the work is presented as a
   proof print pulled off the production line — registration marks, tone
   bar, approval stamp — never a portfolio grid, never named cases. The
   plates are art-directed system surfaces ready to take real assets. */
export function WorkShowcase() {
  return (
    <section className="work-showcase" aria-labelledby="work-showcase-title">
      <div className="work-showcase__inner">
        <header className="work-showcase__intro">
          <p className="work-showcase__label">04 / Arbeid</p>

          <div className="work-showcase__copy">
            <h2 className="work-showcase__title" id="work-showcase-title">
              Visuelt sterkt.
              <br />
              Teknisk riktig.
            </h2>
            <p className="work-showcase__lead">
              Vi pynter ikke referanser. Alt vi leverer trykkes mot samme standard — dette er
              den.
            </p>
          </div>

          <p className="work-showcase__running-head" aria-hidden="true">
            TGN — Prøvetrykk / Proof
          </p>
        </header>

        {/* Standard strip — the four commitments as a colophon row, not a table */}
        <ul className="work-showcase__specs" aria-label="Leveransekrav">
          {standards.map((standard) => (
            <li className="work-showcase__spec" data-spec-item key={standard.index}>
              <span className="work-showcase__spec-index" aria-hidden="true">
                {standard.index}
              </span>
              <span className="work-showcase__spec-value">{standard.value}</span>
              <span className="work-showcase__spec-name">{standard.name}</span>
            </li>
          ))}
        </ul>

        <div className="work-showcase__layout">
          <div className="work-showcase__meta">
            <p className="work-showcase__meta-label">Proof 01 / Systemflate</p>
            <p className="work-showcase__meta-stack">Next.js / SEO / Måling / Struktur</p>
            <p className="work-showcase__caption">
              En digital flate skal ikke bare se bra ut. Den må være rask, forståelig og bygget
              for å bli valgt.
            </p>
            <p className="work-showcase__sectors">
              <span className="work-showcase__sectors-label">Levert innen</span>
              VVS · Hudklinikk · Sanering · B2B-tjenester
            </p>

            <div className="work-showcase__proofline" data-work-proofline>
              <span className="work-showcase__tonebar" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </span>
              <span className="work-showcase__proofline-item">
                Godkjent for produksjon — TGN
              </span>
            </div>

            <a className="work-showcase__case-link" href="/arkiv">
              Se arkivet
              <span className="work-showcase__archive-arrow" aria-hidden="true" />
            </a>
          </div>

          <figure className="work-showcase__proof" aria-hidden="true">
            <div className="work-showcase__frame work-showcase__frame--main">
              <span className="work-showcase__reg work-showcase__reg--tl" />
              <span className="work-showcase__reg work-showcase__reg--tr" />
              <span className="work-showcase__reg work-showcase__reg--bl" />
              <span className="work-showcase__reg work-showcase__reg--br" />

              <div className="work-showcase__plate work-showcase__plate--main" data-work-visual="main">
                <div className="work-showcase__plate-head">
                  <span className="work-showcase__plate-id">tgn — systemflate_01</span>
                  <span className="work-showcase__plate-rev">REV 04 / NO</span>
                </div>
                <div className="work-showcase__surface">
                  <span className="work-showcase__surface-kicker">GRENSESNITT / DESKTOP</span>
                  <span className="work-showcase__surface-block work-showcase__surface-block--wide" />
                  <span className="work-showcase__surface-block" />
                  <span className="work-showcase__surface-cta">
                    <span className="work-showcase__surface-cta-dot" />
                  </span>
                  <span className="work-showcase__surface-line work-showcase__surface-line--wide" />
                  <span className="work-showcase__surface-line" />
                  <span className="work-showcase__surface-word">TIGON</span>
                </div>
                <p className="work-showcase__fig">FIG. 01 — SYSTEMFLATE</p>
              </div>
            </div>

            <div className="work-showcase__frame work-showcase__frame--detail">
              <span className="work-showcase__reg work-showcase__reg--tl" />
              <span className="work-showcase__reg work-showcase__reg--tr" />
              <span className="work-showcase__reg work-showcase__reg--bl" />
              <span className="work-showcase__reg work-showcase__reg--br" />

              <div
                className="work-showcase__plate work-showcase__plate--detail"
                data-work-visual="detail"
              >
                <p className="work-showcase__fig work-showcase__fig--detail">
                  FIG. 02 — MOBILFLATE
                </p>
                <div className="work-showcase__detail-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
