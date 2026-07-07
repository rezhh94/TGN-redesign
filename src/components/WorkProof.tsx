const cases = [
  {
    n: "01",
    name: "Webapp",
    tags: ["Produkt", "Next.js"],
    blurb:
      "Et produkt bygget for daglig bruk — raskt, forutsigbart og enkelt å drifte. Grensesnittet holder seg unna veien så arbeidet flyter.",
  },
  {
    n: "02",
    name: "Nettsted",
    tags: ["SEO", "Struktur"],
    blurb:
      "En flate som blir funnet og forstått. Tydelig struktur og teknisk SEO fra første linje, målt fra dag én.",
  },
  {
    n: "03",
    name: "Plattform",
    tags: ["Portal", "Dashboard"],
    blurb:
      "Portaler og dashboards der data blir til beslutninger. Bygget for daglig drift, ikke for demo.",
  },
  {
    n: "04",
    name: "E-handel",
    tags: ["Konvertering", "Flyt"],
    blurb:
      "Kjøpsreisen strammet inn til det som selger. Færre steg, tydeligere valg, målbar effekt.",
  },
  {
    n: "05",
    name: "AI",
    tags: ["Integrasjon", "Automasjon"],
    blurb:
      "AI satt i system — integrasjoner og automasjon som fjerner manuelt arbeid, ikke bare imponerer.",
  },
  {
    n: "06",
    name: "App",
    tags: ["UI", "Interaksjon"],
    blurb:
      "Interaksjon som føles håndlaget. Bevegelse med mening, ikke pynt.",
  },
];

/* 04 / Arbeid — utvalg som alltid-åpen katalog (ingen akkordeon). Hver rad er en
   fullt utfoldet plakat: tekstblokk (index / navn / brikker / beskrivelse /
   case-lenke) på den ene siden, tre mockup-rammer på den andre. Annenhver rad
   speiles (tekst ↔ mockups bytter side) via :nth-child(even) — sikk-sakk nedover.
   Ingen JS driver layouten; radene er lesbare uten JavaScript. Reveal-staggeren
   i HomeMotion løfter dem inn på scroll. (Scroll-stabling à la 03/Effekt kan
   legges på senere — bevisst utelatt i denne runden.) */
export function WorkProof() {
  return (
    <section className="work-proof" aria-labelledby="work-proof-title">
      <div className="work-proof__intro">
        <p className="work-proof__label">Arbeid</p>

        <h2 className="work-proof__title" id="work-proof-title">
          <span className="work-proof__word work-proof__word--dim">Visuelt</span>{" "}
          <span className="work-proof__word">sterkt.</span>{" "}
          <span className="work-proof__word work-proof__word--dim">Teknisk</span>{" "}
          <span className="work-proof__word">riktig.</span>
        </h2>

        <p className="work-proof__caption">
          En digital flate skal ikke bare se bra ut. Den må være rask, forståelig og bygget for å bli valgt.
        </p>

        <div className="work-proof__meta">
          <p className="work-proof__lead">Standarden under alt vi leverer —</p>
          <p className="work-proof__spec">Webutvikling — Next.js / SEO / Måling / Struktur</p>
          <a className="work-proof__link" href="/arkiv">
            Se arkivet
          </a>
          <p className="work-proof__foot">TGN — proof / ingen navn, bare nivå</p>
        </div>
      </div>

      <div className="work-proof__cases" data-work-cases>
        {cases.map((piece) => (
          <article className="wp-case" data-work-case key={piece.n}>
            <div className="wp-case__copy">
              <span className="wp-case__index">Arbeid / {piece.n}</span>
              <h3 className="wp-case__name">{piece.name}</h3>
              <span className="wp-case__tags">
                {piece.tags.map((tag) => (
                  <span className="wp-case__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
              <p className="wp-case__blurb">{piece.blurb}</p>
              <a className="wp-case__link" href="/arkiv">
                Se case →
              </a>
            </div>

            <div className="wp-case__posters" aria-hidden="true">
              <span className="wp-case__poster">
                <span className="wp-case__poster-tag">Mockup</span>
              </span>
              <span className="wp-case__poster">
                <span className="wp-case__poster-tag">Mockup</span>
              </span>
              <span className="wp-case__poster">
                <span className="wp-case__poster-tag">Mockup</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
