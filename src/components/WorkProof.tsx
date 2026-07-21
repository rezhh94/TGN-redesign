const capabilities = [
  {
    n: "01",
    name: "Webapp",
    blurb: "Et konsentrert arbeidsrom der komplekse oppgaver kjennes enkle.",
    src: "/work/capability-stage/tgn-product-os-laptop.webp",
    href: "/tjenester/custom-software",
    linkLabel: "Se tjenesten",
    muted: false,
  },
  {
    n: "02",
    name: "Nettsted",
    blurb: "En tydelig digital front som gjør virksomheten enkel å forstå og naturlig å velge.",
    src: "/work/capability-stage/laptop-chair.png",
    href: "/tjenester/webutvikling-nextjs",
    linkLabel: "Se tjenesten",
    muted: false,
  },
  {
    n: "03",
    name: "Plattform",
    blurb: "Et sammenhengende økosystem der mennesker, data og tjenester møtes.",
    src: "/work/capability-stage/ipad-hand.png",
    href: "/hva-koster-digital-plattform",
    linkLabel: "Se plattformguiden",
    muted: false,
  },
  {
    n: "04",
    name: "E-handel",
    blurb: "En kjøpsopplevelse som gjør valget enkelt og fremdriften friksjonsfri.",
    src: "/work/capability-stage/tgn-ehandel-ipad.webp",
    href: "/tjenester/e-handel-losninger",
    linkLabel: "Se tjenesten",
    muted: false,
  },
  {
    n: "05",
    name: "AI",
    blurb: "Et presist verktøy som gjør kunnskap søkbar og neste handling tydelig.",
    src: "/work/capability-stage/laptop-rocks.png",
    href: "/tjenester/ai-implementering",
    linkLabel: "Se tjenesten",
    muted: true,
  },
  {
    n: "06",
    name: "App",
    blurb: "En nær, responsiv opplevelse for korte og naturlige handlinger.",
    src: "/work/capability-stage/tgn-brand-phone.webp",
    href: "/tjenester/app-utvikling",
    linkLabel: "Se tjenesten",
    muted: false,
  },
] as const;

type Capability = (typeof capabilities)[number];

function CapabilityImage({ capability }: { capability: Capability }) {
  return (
    <img
      className={capability.muted ? "work-focus__image--muted" : undefined}
      src={capability.src}
      alt=""
      loading="lazy"
    />
  );
}

function CapabilityPanel({ capability, index }: { capability: Capability; index: number }) {
  return (
    <li
      className="work-focus__panel"
      data-work-panel
      data-work-index={index}
      data-orbit-tiles-item
    >
      <a
        className="work-focus__link"
        href={capability.href}
        data-orbit-tiles-content
      >
        <figure className="work-focus__media" aria-hidden="true">
          <CapabilityImage capability={capability} />
        </figure>

        <div className="work-focus__copy">
          <span className="work-focus__number">{capability.n} / 06</span>
          <h3>{capability.name}</h3>
          <p>{capability.blurb}</p>
          <span className="work-focus__action">
            {capability.linkLabel}
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </a>
    </li>
  );
}

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
      <div
        className="work-focus"
        data-work-focus-stage
        data-orbit-tiles-init
      >
        <header className="work-focus__head">
          <p>04 / Arbeid</p>
          <p data-work-active-count>01 / 06</p>
        </header>

        <div className="work-focus__opening" data-work-opening>
          <h2 id="work-proof-title" className="work-focus__title">
            <span data-work-title-top>Dette kan</span>
            <span data-work-title-bottom>Tigon lage.</span>
          </h2>

          <p className="work-focus__intro-copy" data-work-opening-copy>
            Seks mulige leveranser — vist som konsepter, systemer,
            prototyper og demonstrasjoner.
          </p>
        </div>

        <div className="work-focus__orbit" data-orbit-tiles-collection>
          <ol
            className="work-focus__panels"
            aria-label="Dette kan Tigon lage"
            data-orbit-tiles-list
          >
            {capabilities.map((capability, index) => (
              <CapabilityPanel capability={capability} index={index} key={capability.n} />
            ))}
          </ol>
        </div>

        <footer className="work-focus__foot">
          <p data-work-active-name>Webapp</p>
          <p>Muligheter for nye prosjekter</p>
        </footer>
      </div>

      <div className="work-proof__exit-shade" data-work-exit-shade aria-hidden="true" />
    </section>
  );
}
