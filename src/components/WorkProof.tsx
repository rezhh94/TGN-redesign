const mockups = Array.from({ length: 16 }, (_, index) =>
  String(index + 1).padStart(2, "0")
);

/* 04 / Arbeid — MWG 082 architecture: an intro band (statement, arkiv link)
   followed by a tall pin-height wrapper whose 100vh stage centers every
   mockup in the same slot. JS adds .work-proof--stage; the scrub then pops
   each mockup in with an elastic reveal, recedes it into depth with a
   random tilt and sends it upward out of frame. Without JS the images are
   a plain visible grid.

   NB: bildene er MWG-demoens placeholders (kopiert på eksplisitt ordre fra
   bruker) — byttes ut med Envato-mockups med Tigon-logo. */
export function WorkProof() {
  return (
    <section className="work-proof" aria-labelledby="work-proof-title">
      <div className="work-proof__intro">
        <p className="work-proof__label">04 / Arbeid</p>

        <h2 className="work-proof__title" id="work-proof-title">
          <span className="work-proof__word work-proof__word--dim">Visuelt</span>{" "}
          <span className="work-proof__word">sterkt.</span>{" "}
          <span className="work-proof__word work-proof__word--dim">Teknisk</span>{" "}
          <span className="work-proof__word">riktig.</span>
        </h2>

        <div className="work-proof__meta">
          <p className="work-proof__lead">Standarden under alt vi leverer —</p>
          <a className="work-proof__link" href="/arkiv">
            Se arkivet
          </a>
          <p className="work-proof__foot">TGN — proof / ingen navn, bare nivå</p>
        </div>
      </div>

      <div className="work-proof__pin" data-work-pin>
        <div className="work-proof__stage" data-work-stage>
          {mockups.map((number) => (
            <img
              className="work-proof__media"
              data-work-media
              key={number}
              src={`/work/mockups/${number}.png`}
              alt=""
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
