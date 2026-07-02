/* 02→03 / Overlevering — the page's one new break-up. A short handoff band
   between production (02 / BYGGER) and measurement (03 / Effekt): a signal
   line carries the finished surface out of the workshop and into the
   measuring room. Same IO register language as 05 ("inn/ut") so the system
   voice repeats across the page. */
export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__inner">
        <p className="effect-bridge__label">02 → 03 / Overlevering</p>

        <div className="effect-bridge__io" aria-hidden="true">
          <p className="effect-bridge__register effect-bridge__register--out" data-bridge-register>
            <span className="effect-bridge__register-node" />
            Ut — ferdig flate
          </p>
          <p className="effect-bridge__register effect-bridge__register--in" data-bridge-register>
            Inn — måling
            <span className="effect-bridge__register-node" />
          </p>
        </div>

        <div className="effect-bridge__rail" aria-hidden="true">
          <span className="effect-bridge__rail-fill" data-bridge-line />
        </div>

        <h2 className="effect-bridge__statement" id="effect-bridge-title">
          <span className="effect-bridge__statement-line effect-bridge__statement-line--muted" data-bridge-word>
            Ferdig bygget
          </span>
          <span className="effect-bridge__statement-line" data-bridge-word>
            er ikke ferdig.
          </span>
        </h2>
      </div>
    </section>
  );
}
