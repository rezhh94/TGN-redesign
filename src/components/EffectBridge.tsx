import { Fragment } from "react";

const lineOut = ["Ferdig", "bygget"];
const lineIn = ["er", "ikke", "ferdig."];

/* 02→03 / Overlevering — dominant «ignite» pin, komponert void: statementet
   står i øvre venstre kvadrant (trappet, som hero/bro01/kontakt), og støtte-
   linjen står som motvekt i nedre høyre kvadrant med hairline over. Rommet
   spennes diagonalt mellom de to vektene — ingen nye elementer, ingen
   duplisering av 03s innhold. Pin + ignite som før: linje 1 dempet, linje 2
   brenner ord for ord. Uten JS / med reduced motion står komposisjonen
   statisk og lesbar. */
export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__inner" data-bridge-inner>
        <div className="effect-bridge__statement-block">
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
            <span className="effect-bridge__line effect-bridge__line--indent">
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
        </div>

        <p className="effect-bridge__support">Etter lansering begynner målingen.</p>
      </div>
    </section>
  );
}
