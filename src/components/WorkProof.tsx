const cards = ["01", "02", "03", "04", "05", "06", "07"];

/* 04 / Arbeid — MWG 008-architecture: a draggable, auto-scrolling, infinitely
   looping carousel of work cards under the intro band. The track holds every
   card twice; JS wraps its x over half the width for a seamless loop, adds a
   gsap.ticker auto-scroll and an Observer that lets the user drag it (with a
   small tilt/scale "wow" while pressed).

   Default (no JS / PRM) is a plain horizontally scrollable strip — every card
   is visible and reachable without JavaScript.

   NB: kortene er MWG-demoens placeholders (kopiert på eksplisitt ordre fra
   bruker) — byttes ut med Tigon-mockups m/ logo. */
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

        <p className="work-proof__caption">
          En digital flate skal ikke bare se bra ut. Den må være rask, forståelig og bygget for å bli valgt.
        </p>

        <div className="work-proof__meta">
          <p className="work-proof__lead">Standarden under alt vi leverer —</p>
          <p className="work-proof__spec">Webutvikling — Next.js / SEO / Måling / Struktur</p>
          <a className="work-proof__link" href="/arkiv">
            Se arkivet
          </a>
          <p className="work-proof__foot">TGN — proof / ingen navn, bare nivå</p>
        </div>
      </div>

      <div className="work-proof__carousel" data-work-carousel>
        <div className="work-proof__track" data-work-track>
          {cards.map((number) => (
            <div className="work-proof__card" key={number}>
              <img src={`/work/carousel/${number}.png`} alt="" loading="lazy" />
            </div>
          ))}

          {/* Duplicate for the infinite loop */}
          {cards.map((number) => (
            <div className="work-proof__card" key={`dup-${number}`} aria-hidden="true">
              <img src={`/work/carousel/${number}.png`} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
