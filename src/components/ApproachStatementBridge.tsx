const disciplines = [
  {
    n: "01",
    name: "Design",
    statement: "Gjør tilbudet tydelig.",
    body: "Posisjon, innhold og grensesnitt formes rundt det kunden skal forstå og velge.",
    output: "Forstått / Valgt",
    tone: "paper",
  },
  {
    n: "02",
    name: "Teknologi",
    statement: "Gjør løsningen virkelig.",
    body: "Kode, ytelse og integrasjoner bygges som del av uttrykket — ikke som et lag etterpå.",
    output: "Bygget / Driftet",
    tone: "olive",
  },
  {
    n: "03",
    name: "Synlighet",
    statement: "Gjør arbeidet synlig.",
    body: "Struktur, teknisk SEO og måling kobler løsningen til markedet fra første dag.",
    output: "Funnet / Målt",
    tone: "mauve",
  },
] as const;

export function ApproachStatementBridge() {
  return (
    <section
      className="approach-bridge"
      aria-labelledby="approach-bridge-title"
      data-intro-story
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <header className="approach-intro" data-intro-identity>
        <p className="approach-intro__label">01 / Tilnærming</p>
        <h2 className="approach-intro__title" id="approach-bridge-title">
          <span>Tre fag.</span>
          <span>Én helhet.</span>
        </h2>
        <div className="approach-intro__copy">
          <p>
            Design, teknologi og synlighet utviklet sammen fra første
            beslutning — så løsningen både treffer, virker og blir funnet.
          </p>
          <span>TGN / integrated practice / 01—03</span>
        </div>
      </header>

      <div className="approach-assembly" data-intro-assembly aria-hidden="true">
        <div className="approach-assembly__stage" data-intro-assembly-stage>
          <div className="approach-assembly__frame">
            <div className="approach-assembly__materials">
              {disciplines.map((discipline) => (
                <article
                  className={`approach-material approach-material--${discipline.tone}`}
                  data-intro-material
                  key={discipline.n}
                >
                  <header>
                    <span>{discipline.n} / 03</span>
                    <strong>{discipline.name}</strong>
                  </header>
                  <p>{discipline.statement}</p>
                  <footer>
                    <span>TGN / {discipline.n}</span>
                    <strong>{discipline.output}</strong>
                  </footer>
                </article>
              ))}
            </div>

            <p className="approach-assembly__word" data-intro-lock>
              <span>Én</span>
              <strong>helhet.</strong>
            </p>
            <i className="approach-assembly__rule" data-intro-rule />
          </div>

          <div className="approach-assembly__legend">
            <span>TGN / disciplines aligned / 01—03</span>
            <strong>Samlet fra start.</strong>
            <span>Design / Teknologi / Synlighet</span>
          </div>
        </div>
      </div>

      <div className="approach-index-head">
        <p>Én integrert leveranse</p>
        <p>Tre fag — samme retning</p>
      </div>

      <ol className="approach-index" data-reveal-group data-distance="1em" data-stagger="90">
        {disciplines.map((discipline) => (
          <li className="approach-index__item" key={discipline.n}>
            <span>{discipline.n}</span>
            <div>
              <h3>{discipline.name}</h3>
              <p>{discipline.body}</p>
            </div>
            <strong>{discipline.output}</strong>
          </li>
        ))}
      </ol>

      <footer className="approach-resolution" data-intro-resolution>
        <p>Resultatet</p>
        <h3>
          <span>Én retning.</span>
          <span>Én leveranse.</span>
        </h3>
        <p>
          Ikke tre separate fag som må sys sammen til slutt. Ett system bygget
          for å bli funnet, forstått, valgt og målt.
        </p>
      </footer>
    </section>
  );
}
