/* 01 / Tilnærming — to beats.

   Beat 1 «Oppsett»: UKLART BLIR BYGGBART står som overskrift, og struktur-
   avsnittet fylles ord for ord fra dempet til lyst mens seksjonen scroller forbi
   (Monolog-referansens «fill»-tekst — ingen pin, ren scrub).

   Beat 2 «Tigon lukker gapet»: kjempe-overskriften står i to halvdeler — IDÉ og
   LØSNING — med et bilde i selve gapet. Når blokken pinnes glir halvdelene mot
   hverandre mens bildefeltet krymper til en sliver og sykler gjennom demo-
   bildene: avstanden mellom idé og løsning, lukket for øynene dine.

   Alt er server-rendret og lesbart uten JS: beat 1 står som fylt (lyst) avsnitt,
   beat 2 som et statisk kompositt (fast gap, første bilde). Splitting/scrub
   legges kun på runtime; teardown restaurerer markup og rydder inline. */

// Demo-bildene som sykler i gapet mens det lukkes. Bytt ut med ekte Tigon-
// artefakter senere — samme mekanikk, bare andre kilder.
const GAP_FRAMES = [
  "/work/carousel/01.png",
  "/work/carousel/02.png",
  "/work/carousel/03.png",
  "/work/carousel/04.png",
  "/work/carousel/05.png",
  "/work/carousel/06.png",
  "/work/carousel/07.png",
];

export function ApproachStatementBridge() {
  return (
    <section className="approach-bridge" aria-labelledby="approach-bridge-title">
      {/* Beat 1 — Oppsett: UKLART BLIR BYGGBART + fill-avsnitt */}
      <div className="approach-intro">
        <p className="approach-intro__label">Tilnærming</p>

        <h2 className="approach-intro__title" id="approach-bridge-title" data-intro-title>
          Uklart blir byggbart.
        </h2>

        <p className="approach-intro__fill" data-intro-fill>
          Før design, kode og animasjon kommer struktur: hva som skal bygges, hvem
          det skal treffe, og hvordan resultatet skal måles.
        </p>
      </div>

      {/* Beat 2 — Tigon lukker gapet: IDÉ → LØSNING */}
      <div className="approach-gap" data-gap-container>
        <p className="approach-gap__lead" data-gap-lead>
          Det er her Tigon kommer inn.
        </p>

        <div className="approach-gap__stage">
          <h2
            className="approach-gap__statement"
            id="approach-gap-title"
            data-gap-title
            aria-label="Fra idé til løsning"
          >
            <span className="approach-gap__word">IDÉ</span>

            <span className="approach-gap__media" data-gap-media aria-hidden="true">
              {GAP_FRAMES.map((src, index) => (
                <img
                  className="approach-gap__media-img"
                  src={src}
                  alt=""
                  key={src}
                  data-gap-frame
                  data-active={index === 0 ? "true" : "false"}
                  loading="lazy"
                  draggable={false}
                />
              ))}
            </span>

            <span className="approach-gap__word">LØSNING</span>
          </h2>

          <p className="approach-gap__support" data-gap-support>
            Vi gjør avstanden mellom idé og ferdig løsning konkret — så det som
            bygges faktisk kan bli funnet, forstått, valgt og målt.
          </p>
        </div>
      </div>
    </section>
  );
}
