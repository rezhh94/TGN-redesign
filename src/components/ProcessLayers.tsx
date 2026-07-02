const stages = [
  {
    code: "ST—01",
    title: "Avklar",
    description: "Behov, mål og rammer avklares — og prioriteres — før noe designes.",
    output: "Scope",
  },
  {
    code: "ST—02",
    title: "Strukturér",
    description: "Innhold, flyt, søkbarhet og målepunkter settes før designet låses.",
    output: "Struktur",
  },
  {
    code: "ST—03",
    title: "Bygg",
    description: "Design, kode og integrasjoner utvikles på samme grunnmur, med rask feedback.",
    output: "System",
  },
  {
    code: "ST—04",
    title: "Lanser",
    description: "Publisering med teknisk sjekk. Skjema, telefon og hendelser spores fra dag én.",
    output: "Live",
  },
];

const chain = ["Uklart", "Scope", "Struktur", "System", "Live"];

export function ProcessLayers() {
  return (
    <section className="process-layers" id="prosess" aria-labelledby="process-layers-title">
      <div className="process-layers__inner">
        <header className="process-layers__head">
          <p className="process-layers__label">05 / Prosess</p>
          <p className="process-layers__meta" aria-hidden="true">
            TGN — Produksjonslinje / fire lag
          </p>
        </header>

        {/* The scene's input object. "Målbart ut." is printed as the closing
            object below the strata; kept in the heading for AT/SEO. */}
        <h2 className="process-layers__title" id="process-layers-title">
          <span className="process-layers__title-in" data-process-in>
            Uklart inn.
          </span>
          <span className="process-layers__sr">Målbart ut.</span>
        </h2>

        <p className="process-layers__lead" data-process-lead>
          Ikke et byråløp på magefølelse. Ett produksjonssystem: alt som er uklart går inn i
          toppen — og kommer målbart ut i bunnen.
        </p>

        {/* The machine — four full-width strata on one production axis.
            Material solidifies layer by layer; no plate, no boxes. */}
        <div className="process-layers__machine" data-process-machine>
          <span className="process-layers__axis" aria-hidden="true">
            <span className="process-layers__axis-line" data-process-axis />
          </span>

          <ol className="process-layers__stages">
            {stages.map((stage, index) => (
              <li
                className="process-layers__stage"
                data-process-stage
                data-stage-index={index}
                key={stage.code}
              >
                <span className="process-layers__stage-line" aria-hidden="true" data-stage-line />
                <span className="process-layers__node" aria-hidden="true" />

                <p className="process-layers__code">{stage.code}</p>
                <h3 className="process-layers__verb">{stage.title}</h3>
                <p className="process-layers__desc">{stage.description}</p>

                <p className="process-layers__out" data-stage-out>
                  <span className="process-layers__out-arrow" aria-hidden="true">
                    →
                  </span>
                  {stage.output}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* The scene's output object + the compressed system readout */}
        <div className="process-layers__result">
          <span className="process-layers__result-node" aria-hidden="true" />
          <p className="process-layers__result-word" aria-hidden="true">
            <span className="process-layers__result-inner" data-process-out>
              Målbart ut.
            </span>
          </p>

          <p className="process-layers__chain" data-process-chain>
            {chain.map((word, index) => (
              <span className="process-layers__chain-item" key={word}>
                {index > 0 && (
                  <span className="process-layers__chain-arrow" aria-hidden="true">
                    →
                  </span>
                )}
                {word}
              </span>
            ))}
            <span className="process-layers__chain-note">— målt fra dag én</span>
          </p>
        </div>
      </div>
    </section>
  );
}
