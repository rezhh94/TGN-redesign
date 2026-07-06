const pieces = [
  { n: "01", kind: "Webapp", note: "Produkt · Next.js", img: "/work/carousel/01.png" },
  { n: "02", kind: "Nettsted", note: "SEO · struktur", img: "/work/carousel/02.png" },
  { n: "03", kind: "Identitet", note: "Profil · system", img: "/work/carousel/03.png" },
  { n: "04", kind: "E-handel", note: "Konvertering", img: "/work/carousel/04.png" },
  { n: "05", kind: "Kampanje", note: "Landing · måling", img: "/work/carousel/05.png" },
  { n: "06", kind: "Redaksjonelt", note: "Innhold · flyt", img: "/work/carousel/06.png" },
  { n: "07", kind: "App", note: "UI · interaksjon", img: "/work/carousel/07.png" },
];

/* 04 / Arbeid — "Stort proof". Mørkt galleri-rom (--ink-deep) der arbeidet
   vises stort, ett verk om gangen, loddrett nedover — som et monografi, ikke en
   karusell. Hvert stykke stiger inn og går fra gråtone til full farge når det
   entrer (JS-only glød). Default (no-JS / PRM) er en enkel loddrett liste med
   alt synlig i full farge — ingen bevegelse kreves for lesbarhet.

   Bildene er midlertidige carousel-assets til Tigon-mockups m/ logo finnes. */
export function WorkProof() {
  return (
    <section className="work-proof" aria-labelledby="work-proof-title">
      <div className="work-proof__intro">
        <p className="work-proof__label">Arbeid</p>

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

      <div className="work-proof__gallery" data-work-gallery>
        {pieces.map((piece) => (
          <figure className="work-proof__piece" data-work-piece key={piece.n}>
            <figcaption className="work-proof__piece-head">
              <span className="work-proof__piece-index">Arbeid / {piece.n}</span>
              <span className="work-proof__piece-kind">{piece.kind}</span>
              <span className="work-proof__piece-note">{piece.note}</span>
            </figcaption>
            <div className="work-proof__frame">
              <img src={piece.img} alt="" loading="lazy" />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
