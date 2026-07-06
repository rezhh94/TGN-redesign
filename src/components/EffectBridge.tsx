import { Fragment } from "react";

const lineOut = ["Ferdig", "bygget"];
const lineIn = ["er", "ikke", "ferdig."];

/* 02→03 / Overlevering — dominant «ignite» pin. The statement holds the
   center of the viewport while pinned; the first line stays dim and the
   second line ("er ikke ferdig.") burns from muted grey to full white,
   word by word, as the scroll scrubs through. No duplicate copies — the
   text is plain and fully server-rendered. Without JS / with reduced motion
   the statement simply shows, statically: dim first line, readable second. */
export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__inner" data-bridge-inner>
        <p className="effect-bridge__label">Overlevering</p>

        <h2 className="effect-bridge__statement" id="effect-bridge-title">
          <span className="effect-bridge__line effect-bridge__line--muted">
            {lineOut.map((word, index) => (
              <Fragment key={word}>
                {index > 0 ? " " : null}
                <span className="effect-bridge__word">{word}</span>
              </Fragment>
            ))}
          </span>
          <span className="effect-bridge__line">
            {lineIn.map((word, index) => (
              <Fragment key={word}>
                {index > 0 ? " " : null}
                <span className="effect-bridge__word" data-bridge-ignite>
                  {word}
                </span>
              </Fragment>
            ))}
          </span>
        </h2>

        <p className="effect-bridge__support">Etter lansering begynner målingen.</p>
      </div>
    </section>
  );
}
