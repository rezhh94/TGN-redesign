/* 01 / Tilnærming — MWG 049 architecture: a 100vh container whose statement
   pins at the top while every letter travels its own random distance back
   into place — «UKLART» starts scattered and assembles into «byggbart».
   All text is server-rendered; JS wraps letters at runtime and the
   teardown restores the original markup. */
export function ApproachStatementBridge() {
  return (
    <section className="approach-bridge" aria-labelledby="approach-bridge-title">
      <div className="approach-bridge__inner">
        <div className="approach-bridge__container" data-approach-container>
          <p className="approach-bridge__label">01 / Tilnærming</p>

          <h2 className="approach-bridge__statement" id="approach-bridge-title" data-approach-title>
            <span className="approach-bridge__line">UKLART blir</span>
            <span className="approach-bridge__line approach-bridge__line--indent">byggbart.</span>
          </h2>
        </div>

        <p className="approach-bridge__support" data-approach-support>
          Før design, kode og animasjon kommer struktur:
          <br />
          hva som skal bygges, hvem det skal treffe,
          <br />
          og hvordan resultatet skal måles.
        </p>
      </div>
    </section>
  );
}
