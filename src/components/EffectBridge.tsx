export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__stage" data-bridge-stage>
        <div className="effect-bridge__window" data-bridge-window data-theme-section="dark" data-bg-section="dark">
          <img src="/services/05.png" alt="" loading="lazy" />
          <div className="effect-bridge__veil" />

          <header className="effect-bridge__head">
            <p>02→03 / Overlevering</p>
            <p>TGN / Måling aktiv</p>
          </header>

          <div className="effect-bridge__fragments" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="effect-bridge__statement">
            <p>En lansering er et startpunkt.</p>
            <h2 id="effect-bridge-title">
              Lansert er <span>ikke ferdig.</span>
            </h2>
          </div>

          <footer className="effect-bridge__handoff">
            <p>Det som er live kan måles, forstås og forbedres.</p>
            <p>Neste / Effekt</p>
          </footer>

          <div
            className="effect-bridge__shutter"
            data-shutter-scroll-transition=""
            data-rows="8"
            data-rows-tablet="6"
            data-rows-mobile="4"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
