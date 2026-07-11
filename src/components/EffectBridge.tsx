export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__inner">
        <header className="effect-bridge__head">
          <p>02→03 / Overlevering</p>
          <p>TGN / Etter lansering</p>
        </header>

        <div className="effect-bridge__statement" data-bridge-lockup>
          <p>En lansering er et startpunkt.</p>
          <h2 id="effect-bridge-title">
            Lansert er
            <span>ikke ferdig.</span>
          </h2>
        </div>

        <div className="effect-bridge__live" data-bridge-live aria-hidden="true">
          <header>
            <span>TGN / LIVE WINDOW</span>
            <span>STATUS — ONLINE</span>
          </header>
          <div className="effect-bridge__live-screen">
            <p>LIVE</p>
            <div className="effect-bridge__signal" data-bridge-signal>
              {Array.from({ length: 16 }, (_, index) => <i key={index} />)}
            </div>
            <span className="effect-bridge__scan" data-bridge-scan />
          </div>
          <footer>
            <span>Launch / 00:00:01</span>
            <strong>Måling aktiv</strong>
          </footer>
        </div>

        <footer className="effect-bridge__handoff">
          <p>Etter lansering begynner målingen.</p>
          <p>Neste / Effekt</p>
        </footer>
      </div>
      <div
        className="effect-bridge__shutter"
        data-shutter-scroll-transition=""
        data-rows="8"
        data-rows-tablet="6"
        data-rows-mobile="4"
        aria-hidden="true"
      />
    </section>
  );
}
