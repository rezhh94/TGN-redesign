const capabilities = [
  {
    n: "01",
    name: "Webapp",
    meta: "Produkt / Next.js",
    blurb: "Et konsentrert arbeidsrom der komplekse oppgaver kjennes enkle.",
    src: "/work/capability-stage/tgn-product-os-laptop.webp",
    href: "/tjenester/custom-software",
    linkLabel: "Se tjenesten",
    layout: "hero",
  },
  {
    n: "02",
    name: "Nettsted",
    meta: "SEO / Struktur",
    blurb: "En tydelig digital front som gjør virksomheten enkel å forstå og naturlig å velge.",
    src: "/work/capability-stage/laptop-chair.png",
    href: "/tjenester/webutvikling-nextjs",
    linkLabel: "Se tjenesten",
    layout: "portrait",
  },
  {
    n: "03",
    name: "Plattform",
    meta: "Portal / System",
    blurb: "Et sammenhengende økosystem der mennesker, data og tjenester møtes.",
    src: "/work/capability-stage/ipad-hand.png",
    href: "/hva-koster-digital-plattform",
    linkLabel: "Se plattformguiden",
    layout: "square",
  },
  {
    n: "04",
    name: "E-handel",
    meta: "Konvertering / Flyt",
    blurb: "En kjøpsopplevelse som gjør valget enkelt og fremdriften friksjonsfri.",
    src: "/work/capability-stage/tgn-ehandel-ipad.webp",
    href: "/tjenester/e-handel-losninger",
    linkLabel: "Se tjenesten",
    layout: "landscape",
  },
  {
    n: "05",
    name: "AI",
    meta: "Integrasjon / Automasjon",
    blurb: "Et presist verktøy som gjør kunnskap søkbar og neste handling tydelig.",
    src: "/work/capability-stage/laptop-rocks.png",
    href: "/tjenester/ai-implementering",
    linkLabel: "Se tjenesten",
    layout: "narrow",
    muted: true,
  },
  {
    n: "06",
    name: "App",
    meta: "UI / Interaksjon",
    blurb: "En nær, responsiv opplevelse for korte og naturlige handlinger.",
    src: "/work/capability-stage/tgn-brand-phone.webp",
    href: "/tjenester/app-utvikling",
    linkLabel: "Se tjenesten",
    layout: "offset",
  },
] as const;

type Capability = (typeof capabilities)[number];

/* Tittellinjene er ferdig ord-splittet i server-HTML slik at maske-entré og
   scrubbet exit kan animere inner-spans uten DOM-manipulasjon. Uten JS står
   ordene helt vanlig. Samme utsagn som broen flipper frem — arkivflaten er
   den monumentale versjonen av det, ikke et portefølje-arkiv. */
const archiveTitleLines = [
  ["DETTE", "KAN"],
  ["TIGON", "LAGE"],
] as const;

function CapabilityTile({ capability }: { capability: Capability }) {
  return (
    <article
      className={`work-tile work-tile--${capability.layout}`}
      data-work-tile
    >
      <a
        className="work-tile__trigger"
        href={capability.href}
        aria-label={`Utforsk ${capability.name}`}
        data-cursor-hover=""
        data-cursor-text={`Utforsk / ${capability.name}`}
      >
        <span className="work-tile__tap-label" aria-hidden="true">
          Utforsk <span>↗</span>
        </span>
      </a>

      <header className="work-tile__head">
        <div>
          <span>{capability.n} / 06</span>
          <h3>{capability.name}</h3>
        </div>
        <p>{capability.meta}</p>
      </header>

      <figure
        className="work-tile__visual"
        data-tile-visual={capability.n}
      >
        <img
          className={"muted" in capability && capability.muted ? "work-tile__image--muted" : undefined}
          src={capability.src}
          alt=""
          loading="lazy"
        />
      </figure>

      <footer className="work-tile__foot">
        <p>{capability.blurb}</p>
        <div className="work-tile__foot-meta">
          <span>Capability / konseptflate</span>
          <span className="work-tile__cta" aria-hidden="true">
            {capability.linkLabel} <span>↗</span>
          </span>
        </div>
      </footer>
    </article>
  );
}

/* 04 / Arbeid — en mørk, asymmetrisk capability-vegg i normal dokumentflyt.
   Hver flate peker direkte til den relevante undersiden. */
export function WorkProof() {
  return (
    <section
      id="arbeid"
      className="work-proof"
      aria-labelledby="work-proof-title"
      data-theme-section="dark"
      data-bg-section="dark"
      data-work-process-transition
    >
      <div className="work-proof__catalogue" data-work-catalogue>
        {/* Sticky arkivflate: veggen under ruller over og «begraver» tittelen.
            Ren visuell reprise av seksjonens semantiske tittel (#work-proof-title
            ligger i broen), derfor p/span og ikke en ny heading. */}
        <div className="work-archive" data-work-archive>
          <p className="work-archive__label" data-archive-fade>
            ( Demonstrasjoner — ikke kundecaser )
          </p>
          <p className="work-archive__title" id="work-proof-title">
            {archiveTitleLines.map((line) => (
              <span className="work-archive__line" key={line.join("-")}>
                {line.map((word) => (
                  <span className="work-archive__word" key={word}>
                    <span className="work-archive__word-inner" data-archive-word>
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </p>
          <p className="work-archive__sub" data-archive-fade>
            Seks flater som viser hva vi kan bygge for deg — utviklet som
            demonstrasjoner, systemer og konsepter.
          </p>
          <span className="work-archive__meta" data-archive-fade>
            TGN / capability field / 01—06
          </span>
        </div>

        <div className="work-wall" data-work-wall>
          {capabilities.map((capability) => (
            <CapabilityTile capability={capability} key={capability.n} />
          ))}
        </div>

        <footer className="work-proof__disclaimer">
          <span>Capability-demonstrasjoner / ikke kundecaser</span>
        </footer>
      </div>

      <div className="work-proof__exit-shade" data-work-exit-shade aria-hidden="true" />

      <div className="work-cursor" data-cursor="" aria-hidden="true">
        <div className="work-cursor__bubble">
          <span className="work-cursor__text" data-cursor-text-target="">Utforsk</span>
          <span className="work-cursor__arrow">↗</span>
        </div>
      </div>
    </section>
  );
}
