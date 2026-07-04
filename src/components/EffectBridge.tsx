import { Fragment } from "react";

const repetitions = [0, 1, 2, 3];

/* 02→03 / Overlevering — MWG 024 architecture: the two statement lines run
   as infinite marquees in opposite directions; while the band is pinned,
   the scrub masks «Ferdig bygget» upward and reveals «er ikke ferdig.».
   The plain h2 is the default (no-JS/PRM) rendering — the marquee DOM is
   decorative, aria-hidden and only displayed in stage mode. */
export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__pin" data-bridge-pin>
        <div className="effect-bridge__container" data-bridge-container>
          <h2 className="effect-bridge__statement" id="effect-bridge-title">
            <span className="effect-bridge__statement-line effect-bridge__statement-line--muted">
              Ferdig bygget
            </span>{" "}
            <span className="effect-bridge__statement-line">er ikke ferdig.</span>
          </h2>

          <div className="effect-bridge__sentences" aria-hidden="true">
            <div className="effect-bridge__sentence effect-bridge__sentence--one">
              <p data-bridge-sentence="1">
                {repetitions.map((index) => (
                  <Fragment key={index}>
                    <span>&nbsp;Ferdig bygget&nbsp;</span>
                    <span className="effect-bridge__glyph" />
                  </Fragment>
                ))}
              </p>
            </div>
            <div className="effect-bridge__sentence effect-bridge__sentence--two">
              <p data-bridge-sentence="2">
                {repetitions.map((index) => (
                  <Fragment key={index}>
                    <span>&nbsp;er ikke ferdig.&nbsp;</span>
                    <span className="effect-bridge__glyph" />
                  </Fragment>
                ))}
              </p>
            </div>
          </div>

          <div className="effect-bridge__meta">
            <p>Ut — ferdig flate</p>
            <p>02 → 03 / Overlevering</p>
            <p>Inn — måling</p>
          </div>
        </div>
      </div>
    </section>
  );
}
