export function EffectWorkBridge() {
  return (
    <section
      className="effect-work-bridge"
      aria-label="Overgang fra effekt til arbeid"
      data-effect-work-bridge
      data-theme-section="light"
      data-bg-section="mauve"
    >
      <div className="effect-work-bridge__stage">
        <p className="effect-work-bridge__index">03 → 04 / Fra resultat til form</p>

        <div className="effect-work-bridge__titles">
          <div data-effect-work-title>
            <p>Effekt må bygges inn.</p>
          </div>

          <div data-effect-work-title>
            <p id="work-proof-title">Dette kan Tigon lage.</p>
          </div>
        </div>

        <p className="effect-work-bridge__next">Neste / Seks mulige leveranser</p>
      </div>
    </section>
  );
}
