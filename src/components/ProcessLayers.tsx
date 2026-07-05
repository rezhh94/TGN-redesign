const processPanels = [
  {
    number: "01",
    eyebrow: "Prosess / Scope",
    image: "/work/mockups/15.png",
    phase: "Avklaring",
    statement: "Behovet presses ned til scope.",
    body: "Før noe tegnes, avklarer vi hva som faktisk skal bygges, hvorfor det trengs og hva som må velges bort.",
    output: "Definert retning",
  },
  {
    number: "02",
    eyebrow: "Prosess / Arkitektur",
    image: "/work/mockups/09.png",
    phase: "Struktur",
    statement: "Innholdet får en teknisk rekkefølge.",
    body: "Sider, flyt, internlenker, søkbarhet og målepunkter legges som system før uttrykket låses.",
    output: "Søkbar arkitektur",
  },
  {
    number: "03",
    eyebrow: "Prosess / Bygg",
    image: "/work/mockups/12.png",
    phase: "Produksjon",
    statement: "Design og kode bygges som ett materiale.",
    body: "UI, komponenter, ytelse og integrasjoner utvikles sammen, med rask feedback og ryddig prioritering.",
    output: "Levende løsning",
  },
  {
    number: "04",
    eyebrow: "Prosess / Live",
    image: "/work/mockups/05.png",
    phase: "Lansering",
    statement: "Siden går live med måling fra dag én.",
    body: "Publisering, teknisk sjekk, skjema, telefon, e-post og hendelser kobles til en tydelig neste beslutning.",
    output: "Målbar kontaktvei",
  },
];

/* 05 / Prosess — TRIONN-oversatt: lyst, horisontalt kort-galleri. Et grått rom
   med løftede bilde-kort. Tittel-beat ("Uklart inn. System ut.") dekoder inn,
   så glir fire steg-kort sideveis og setter seg opp mot senter, før et
   avslutnings-panel lander mot kontakt. Bildene er midlertidige assets (mockup-
   settet) til ekte steg-bilder finnes — bytt `image`-stiene da. Default
   (no-JS / PRM / mobil uten stage) er en vertikal liste; JS legger på
   .process-layers--stage og først da finnes pin, rail og animasjonene. */
export function ProcessLayers() {
  return (
    <section className="process-layers" id="prosess" aria-labelledby="process-layers-title">
      <div className="process-layers__pin" data-process-pin>
        <div className="process-layers__rail" data-process-rail>
          <div className="process-layers__intro">
            <h2
              className="process-layers__title"
              id="process-layers-title"
              data-process-decode
              aria-label="Uklart inn. System ut."
            >
              <span className="process-layers__line1" aria-hidden="true">
                Uklart inn.
              </span>
              <span className="process-layers__line2" aria-hidden="true">
                System ut.
              </span>
            </h2>
            <p className="process-layers__note">
              <span className="process-layers__note-mark" aria-hidden="true" />
              Fire steg — én produksjonslinje
            </p>
            <span className="process-layers__cue" data-process-cue aria-hidden="true">
              Scroll →
            </span>
          </div>

          {processPanels.map((panel) => (
            <article className="process-layers__card" data-process-card key={panel.number}>
              <div className="process-layers__media-wrap" data-process-media>
                <figure className="process-layers__media">
                  <img src={panel.image} alt="" />
                  <span className="process-layers__eyebrow">
                    {panel.eyebrow} · {panel.number}
                  </span>
                </figure>
              </div>

              <div className="process-layers__meta">
                <div className="process-layers__meta-text">
                  <h3 className="process-layers__phase">{panel.phase}</h3>
                  <p className="process-layers__statement">{panel.statement}</p>
                </div>
                <p className="process-layers__output">Ut — {panel.output} →</p>
              </div>
            </article>
          ))}

          <div className="process-layers__closer">
            <p className="process-layers__closer-eyebrow">Fra uklart til system</p>
            <p className="process-layers__closer-title">
              Fire steg, én produksjonslinje — fra et uklart behov til et målbart system.
            </p>
            <a className="process-layers__closer-cta" href="/kontakt?ref=prosess">
              Start et prosjekt →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
