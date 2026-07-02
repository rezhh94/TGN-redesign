const standards = [
  {
    index: "K—01",
    value: "< 2,0 s",
    name: "Ytelse",
    description: "LCP under to sekunder på ekte enheter, ikke bare i test.",
  },
  {
    index: "K—02",
    value: "Dag én",
    name: "Synlighet",
    description: "Indekserbar struktur, ren HTML og måling fra lansering.",
  },
  {
    index: "K—03",
    value: "WCAG AA",
    name: "Tilgjengelighet",
    description: "Kontrast, navigasjon og semantikk som grunnlinje, ikke tillegg.",
  },
  {
    index: "K—04",
    value: "0 maler",
    name: "Eierskap",
    description: "Egen kode uten temaer og lisenslås. Alt kan endres senere.",
  },
];

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

        <div className="work-showcase__ledger" data-work-ledger>
          <p className="work-showcase__ledger-kicker">Bygget etter faste krav — uansett prosjekt</p>
          <ol className="work-showcase__ledger-list" aria-label="Leveransekrav">
            {standards.map((standard) => (
              <li className="work-showcase__ledger-row" data-ledger-row key={standard.index}>
                <span className="work-showcase__ledger-index" aria-hidden="true">
                  {standard.index}
                </span>
                <span className="work-showcase__ledger-value">{standard.value}</span>
                <span className="work-showcase__ledger-name">{standard.name}</span>
                <p className="work-showcase__ledger-desc">{standard.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="work-showcase__layout">
          <div className="work-showcase__meta">
            <p className="work-showcase__meta-label">01 / Systemflate</p>
            <p className="work-showcase__meta-stack">Next.js / SEO / Måling / Struktur</p>
            <p className="work-showcase__caption">
              En digital flate skal ikke bare se bra ut. Den må være rask, forståelig og bygget
              for å bli valgt.
            </p>
            <p className="work-showcase__sectors">
              <span className="work-showcase__sectors-label">Levert innen</span>
              VVS · Hudklinikk · Sanering · B2B-tjenester
            </p>
            <a className="work-showcase__case-link" href="/arkiv">
              Se arkivet
              <span className="work-showcase__archive-arrow" aria-hidden="true" />
            </a>
          </div>

          <div className="work-showcase__visuals" aria-hidden="true">
            <div className="work-showcase__visual work-showcase__visual--main" data-work-visual="main">
              <div className="work-showcase__chrome">
                <span className="work-showcase__chrome-dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="work-showcase__chrome-url">prosjektflate_01</span>
                <span className="work-showcase__chrome-status">SYSTEMFLATE — NO</span>
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

            <div
              className="work-showcase__visual work-showcase__visual--detail"
              data-work-visual="detail"
            >
              <p className="work-showcase__fig work-showcase__fig--detail">
                FIG. 02 — DETALJ / KOMPONENT
              </p>
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
