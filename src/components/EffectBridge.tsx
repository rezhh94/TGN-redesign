/* 02→03 / Overlevering — adaptert fra Jack & AI-opptaket som bevegelses-
   arkitektur: et fast, lesbart budskap og bilde i forgrunnen, med to enorme
   ord som passerer i motsatt retning bak. Ingen pin og ingen kritisk tekst
   skjules av JavaScript. */
export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__backdrop" aria-hidden="true">
        <p className="effect-bridge__track effect-bridge__track--top" data-bridge-track="top">
          FERDIG&nbsp;FERDIG&nbsp;FERDIG
        </p>
        <p className="effect-bridge__track effect-bridge__track--bottom" data-bridge-track="bottom">
          BYGGET&nbsp;BYGGET&nbsp;BYGGET
        </p>
      </div>

      <div className="effect-bridge__inner" data-bridge-inner>
        <p className="effect-bridge__label">Overlevering</p>

        <h2 className="effect-bridge__statement" id="effect-bridge-title" data-bridge-lockup>
          <span className="effect-bridge__statement-row">
            <span>Ferdig</span>
            <span className="effect-bridge__media" aria-hidden="true" data-bridge-media>
              <img src="/work/mockups/11.png" alt="" loading="lazy" />
            </span>
            <span>bygget</span>
          </span>
          <span className="effect-bridge__verdict">er ikke ferdig.</span>
        </h2>

        <p className="effect-bridge__support">Etter lansering begynner målingen.</p>
      </div>
    </section>
  );
}
