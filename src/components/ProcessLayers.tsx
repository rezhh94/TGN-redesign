const processSlides = [
  {
    number: "01",
    title: "Avklaring",
    label: "05 / Prosess / Scope",
    body: "Før noe tegnes, avklarer vi hva som faktisk skal bygges, hvorfor det trengs og hva som må velges bort.",
    statement: "Behovet presses ned til scope.",
    output: "Definert retning.",
  },
  {
    number: "02",
    title: "Struktur",
    label: "05 / Prosess / Arkitektur",
    body: "Sider, flyt, internlenker, søkbarhet og målepunkter legges som system før uttrykket låses.",
    statement: "Innholdet får en teknisk rekkefølge.",
    output: "Søkbar arkitektur.",
  },
  {
    number: "03",
    title: "Produksjon",
    label: "05 / Prosess / Bygg",
    body: "UI, komponenter, ytelse og integrasjoner utvikles sammen, med rask feedback og ryddig prioritering.",
    statement: "Design og kode bygges som ett materiale.",
    output: "Levende løsning.",
  },
  {
    number: "04",
    title: "Lansering",
    label: "05 / Prosess / Live",
    body: "Publisering, teknisk sjekk, skjema, telefon, e-post og hendelser kobles til en tydelig neste beslutning.",
    statement: "Siden går live med måling fra dag én.",
    output: "Målbar kontaktvei.",
  },
];

function TigonMark() {
  return (
    <svg className="process-slide__mark" viewBox="0 0 81 82" aria-hidden="true" focusable="false">
      <path
        d="M52.9696 64.5854C51.6459 63.2617 49.6094 63.2617 48.2857 64.5854L42.7872 70.0839C41.4635 71.4076 39.4271 71.4076 38.1034 70.0839L32.4013 64.3818C31.0776 63.0581 31.0775 61.0216 32.4013 59.6979L80.971 11.1282L70.585 0.742188L22.0153 49.3119C20.6916 50.6356 18.6551 50.6356 17.3314 49.3119L11.6293 43.6098C10.3056 42.2861 10.3056 40.2497 11.6293 38.926L17.1277 33.4275C18.4515 32.1038 18.4515 30.0673 17.1277 28.7436L11.4256 23.0415C10.1019 21.7178 10.1019 19.6813 11.4256 18.3576L16.9241 12.8592C18.2478 11.5355 18.2478 9.499 16.9241 8.17529L11.222 2.47318C9.89828 1.14948 7.86182 1.14948 6.53812 2.47319L1.03965 7.97165C-0.284051 9.29535 -0.284051 11.3318 1.03965 12.6555L6.74177 18.3576C8.06547 19.6813 8.06546 21.7178 6.74176 23.0415L1.2433 28.54C-0.0804043 29.8637 -0.0804005 31.9001 1.2433 33.2238L6.94541 38.9259C8.26912 40.2497 8.26911 42.2861 6.94541 43.6098L1.44694 49.1083C0.123239 50.432 0.123243 52.4685 1.44694 53.7922L7.14905 59.4943C8.47276 60.818 8.47276 62.8545 7.14906 64.1782L1.6506 69.6766C0.326892 71.0003 0.32689 73.0368 1.6506 74.3605L7.3527 80.0626C8.67641 81.3863 10.7129 81.3863 12.0366 80.0626L17.535 74.5641C18.8587 73.2404 20.8952 73.2404 22.2189 74.5641L27.921 80.2662C29.2447 81.5899 31.2812 81.59 32.6049 80.2663L38.1034 74.7678C39.4271 73.4441 41.4635 73.4441 42.7872 74.7678L48.4893 80.4699C49.8131 81.7936 51.8495 81.7936 53.1732 80.4699L58.6717 74.9714C59.9954 73.6477 62.0319 73.6477 63.3556 74.9714L69.0577 80.6735C70.3814 81.9972 72.4178 81.9972 73.7415 80.6735L79.24 75.1751C80.5637 73.8514 80.5637 71.8149 79.24 70.4912L73.5379 64.7891C72.2142 63.4654 70.1777 63.4654 68.854 64.7891L63.3556 70.2876C62.0319 71.6113 59.9954 71.6113 58.6717 70.2876L52.9696 64.5854Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ProcessLayers() {
  return (
    <section className="process-layers" id="prosess" aria-labelledby="process-layers-title">
      <div className="process-layers__intro" data-process-intro>
        <p className="process-layers__intro-label">05 / Prosess</p>
        <h2 className="process-layers__intro-title" id="process-layers-title">
          Uklart inn.
          <span>System ut.</span>
        </h2>
        <p className="process-layers__intro-text">
          Fire kontrollerte steg. Hvert steg tar over skjermen, låses et øyeblikk
          og forsvinner bakover før neste lag tar ansvaret.
        </p>
      </div>
      <div className="process-layers__slides">
        {processSlides.map((slide) => (
          <article className="process-slide" data-process-slide key={slide.number}>
            <div className="process-slide__wrapper" data-process-wrapper>
              <div className="process-slide__content" data-process-content>
                <div className="process-slide__top">
                  <div>
                    <p className="process-slide__label">{slide.label}</p>
                    <h3 className="process-slide__title">{slide.title}</h3>
                  </div>
                  <TigonMark />
                </div>

                <div className="process-slide__bottom">
                  <p className="process-slide__text">{slide.body}</p>
                  <div className="process-slide__visual-group">
                    <p className="process-slide__num">05</p>
                    <div className="process-slide__visual" aria-hidden="true">
                      <span className="process-slide__visual-kicker">TGN / {slide.output}</span>
                      <span className="process-slide__visual-title">{slide.statement}</span>
                      <span className="process-slide__visual-line process-slide__visual-line--a" />
                      <span className="process-slide__visual-line process-slide__visual-line--b" />
                      <span className="process-slide__visual-block process-slide__visual-block--a" />
                      <span className="process-slide__visual-block process-slide__visual-block--b" />
                      <span className="process-slide__visual-block process-slide__visual-block--c" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
