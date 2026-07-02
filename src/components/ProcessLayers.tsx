const phases = [
  {
    code: "ST—01",
    verb: "Avklar",
    line: "Uklart behov presses ned til definert scope: hva som bygges, hvorfor, i hvilken rekkefølge.",
    ref: "L1 / Scope",
  },
  {
    code: "ST—02",
    verb: "Strukturér",
    line: "Innhold, flyt og søkbarhet legges som struktur — før designet låses.",
    ref: "L2 / Struktur",
  },
  {
    code: "ST—03",
    verb: "Bygg",
    line: "UI og kode på samme grunnmur, bygget for fart og grønn Core Web Vitals.",
    ref: "L3 / UI + kode",
  },
  {
    code: "ST—04",
    verb: "Lanser",
    line: "Live med sporing av skjema, telefon og hendelser fra dag én.",
    ref: "L4 / Måling",
  },
];

/* 05 / Prosess — layer assembly. One dark stage: four production plates in
   shallow 3D lie scattered under a giant ghost "UKLART"; scroll assembles
   them into one system stack while the phases take the floor one by one and
   the title completes itself ("System ut."). Default DOM/CSS is the calm,
   fully-assembled state — the scene mode is a JS/desktop enhancement. */
export function ProcessLayers() {
  return (
    <section className="process-stage" id="prosess" aria-labelledby="process-layers-title">
      <div className="process-stage__inner">
        <header className="process-stage__head">
          <p className="process-stage__label">05 / Prosess</p>
          <h2 className="process-stage__title" id="process-layers-title">
            <span className="process-stage__title-line">Uklart inn.</span>
            <span className="process-stage__title-line" data-stage-title-out>
              System ut.
            </span>
          </h2>
          <p className="process-stage__lead">
            Fire faser, én produksjonslinje. Struktur, fart, søkbarhet og måling monteres som
            lag — ikke lagt på til slutt.
          </p>
        </header>

        {/* The object — a four-plate system stack in shallow 3D */}
        <div className="process-stage__object" data-stage-object aria-hidden="true">
          <p className="process-stage__ghost" data-stage-ghost>
            Uklart
          </p>

          <p className="process-stage__io process-stage__io--in" data-stage-io-in>
            Inn — uklart behov
          </p>

          <div className="process-stage__scene3d">
            <div className="process-stage__stack">
              <div className="process-stage__plate process-stage__plate--scope" data-stage-plate>
                <span className="process-stage__plate-index">L1</span>
                <span className="process-stage__plate-label">Scope</span>
                <span className="process-stage__corner process-stage__corner--tl" />
                <span className="process-stage__corner process-stage__corner--tr" />
                <span className="process-stage__corner process-stage__corner--bl" />
                <span className="process-stage__corner process-stage__corner--br" />
                <span className="process-stage__scope-frame" />
              </div>

              <div className="process-stage__plate process-stage__plate--struktur" data-stage-plate>
                <span className="process-stage__plate-index">L2</span>
                <span className="process-stage__plate-label">Struktur</span>
                <svg className="process-stage__tree" viewBox="0 0 200 120" fill="none">
                  <path d="M100 16 V46 M42 46 H158 M42 46 V76 M100 46 V76 M158 46 V76" />
                  <rect x="86" y="4" width="28" height="13" />
                  <rect x="28" y="76" width="28" height="13" />
                  <rect x="86" y="76" width="28" height="13" />
                  <rect x="144" y="76" width="28" height="13" />
                </svg>
              </div>

              <div className="process-stage__plate process-stage__plate--kode" data-stage-plate>
                <span className="process-stage__plate-index">L3</span>
                <span className="process-stage__plate-label">UI + kode</span>
                <span className="process-stage__ui-block" />
                <span className="process-stage__ui-line process-stage__ui-line--wide" />
                <span className="process-stage__ui-line" />
                <span className="process-stage__code-bar" style={{ width: "58%" }} />
                <span className="process-stage__code-bar" style={{ width: "40%" }} />
                <span className="process-stage__code-bar" style={{ width: "50%" }} />
              </div>

              <div className="process-stage__plate process-stage__plate--maling" data-stage-plate>
                <span className="process-stage__plate-index">L4</span>
                <span className="process-stage__plate-label">Måling</span>
                <svg className="process-stage__spark" viewBox="0 0 200 120" fill="none">
                  <line x1="14" y1="100" x2="186" y2="100" />
                  <path d="M14 88 L54 74 L94 80 L134 50 L186 30" />
                  <circle cx="134" cy="50" r="3" />
                  <circle cx="186" cy="30" r="3" />
                </svg>
              </div>
            </div>
          </div>

          <p className="process-stage__io process-stage__io--out" data-stage-io-out>
            Ut — live, målt fra dag én
          </p>
        </div>

        {/* The floor — one phase holds it at a time in scene mode */}
        <div className="process-stage__phases">
          <ol className="process-stage__ticks" aria-hidden="true">
            {phases.map((phase, index) => (
              <li className="process-stage__tick" data-stage-tick key={phase.code}>
                0{index + 1}
              </li>
            ))}
          </ol>

          <ol className="process-stage__list">
            {phases.map((phase) => (
              <li className="process-stage__phase" data-stage-phase key={phase.code}>
                <p className="process-stage__phase-code">{phase.code}</p>
                <h3 className="process-stage__phase-verb">{phase.verb}</h3>
                <p className="process-stage__phase-line">{phase.line}</p>
                <p className="process-stage__phase-ref">
                  <span aria-hidden="true">→ </span>
                  {phase.ref}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
