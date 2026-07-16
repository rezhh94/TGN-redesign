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
const capabilityPairs = [
  capabilities.slice(0, 2),
  capabilities.slice(2, 4),
  capabilities.slice(4, 6),
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

/* 04 / Arbeid — en lys, asymmetrisk capability-vegg i normal dokumentflyt.
   Hver flate peker direkte til den relevante undersiden. */
export function WorkProof() {
  return (
    <section
      id="arbeid"
      className="work-proof"
      aria-labelledby="work-proof-title"
      data-theme-section="light"
      data-bg-section="mauve"
    >
      <div className="work-proof__catalogue" data-work-catalogue>
        <header className="work-proof__lead">
          <p>Seks mulige leveranser. Utviklet som demonstrasjoner, systemer og konsepter.</p>
          <span>TGN / capability field / 01—06</span>
        </header>

        <div className="work-wall" data-work-wall>
          {capabilityPairs.map((pair, index) => (
            <div
              className={`work-wall__pair work-wall__pair--0${index + 1}`}
              data-work-pair
              key={pair[0].n}
            >
              {pair.map((capability) => (
                <CapabilityTile capability={capability} key={capability.n} />
              ))}
            </div>
          ))}
        </div>

        <footer className="work-proof__disclaimer">
          <span>Capability-demonstrasjoner / ikke kundecaser</span>
        </footer>
      </div>

      <div className="work-proof__cover" data-work-cover>
        {/* Replikk til 05: grensen omorganiserer mulighetene til en metode. */}
        <footer className="work-proof__handoff" data-work-handoff>
          <p>04 → 05</p>
          <div>
            <h3>
              <span>Slik blir</span> <span>det til.</span>
            </h3>
            <p className="work-proof__handoff-copy">Seks muligheter. Én metode.</p>
          </div>
          <div className="work-proof__handoff-index">
            <span>01 / Retning</span>
            <span>02 / Bygg</span>
            <span>03 / Live</span>
          </div>
        </footer>

        {/* Osmo Shutter Scroll Transition: én sammenhengende, generert radstabel.
            De data-styrte posisjonene starter scenen idet 05 nærmer seg og
            fullfører kuttet før prosessinnholdet tar over. */}
        <div
          className="work-proof__shutter"
          data-shutter-scroll-transition=""
          data-mode="cover"
          data-rows="3"
          data-rows-tablet="3"
          data-rows-landscape="3"
          data-rows-mobile="3"
          data-scroll-start="bottom 92%"
          data-scroll-end="bottom 64%"
          aria-hidden="true"
        />
      </div>

      <div className="work-cursor" data-cursor="" aria-hidden="true">
        <div className="work-cursor__bubble">
          <span className="work-cursor__text" data-cursor-text-target="">Utforsk</span>
          <span className="work-cursor__arrow">↗</span>
        </div>
      </div>
    </section>
  );
}
