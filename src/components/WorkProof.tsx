"use client";

import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    n: "01",
    name: "Webapp",
    meta: "Produkt / Next.js",
    blurb: "Et digitalt produkt bygget for daglig bruk, tydelig prioritet og stabil drift.",
    src: "/work/capability-stage/tgn-product-os-laptop.webp",
    layout: "hero",
    detail: "En webapp samler oppgaver, data og roller i en arbeidsflate som er laget for gjentatt bruk. Strukturen formes rundt den faktiske arbeidsflyten, ikke rundt et generisk dashboard.",
    deliverables: ["Innlogging og roller", "Integrasjoner og datamodell", "Måling og stabil drift"],
  },
  {
    n: "02",
    name: "Nettsted",
    meta: "SEO / Struktur",
    blurb: "En rask, tydelig flate som blir funnet, forstått og målt fra første dag.",
    src: "/work/capability-stage/laptop-chair.png",
    layout: "portrait",
    detail: "Et nettsted skal gjøre det lett å forstå hva virksomheten tilbyr, hvorfor den er riktig og hva neste steg er. Design, innhold, teknisk SEO og ytelse utvikles som én leveranse.",
    deliverables: ["Innholdsstruktur og UX", "Teknisk SEO og ytelse", "Konvertering og måling"],
  },
  {
    n: "03",
    name: "Plattform",
    meta: "Portal / System",
    blurb: "Data, roller og arbeidsflyt samlet i én lesbar digital struktur.",
    src: "/work/capability-stage/ipad-hand.png",
    layout: "square",
    detail: "En plattform kobler mennesker, innhold og systemer sammen over tid. Tigon kan forme både den synlige tjenesten og strukturen som gjør den mulig å drifte og videreutvikle.",
    deliverables: ["Portaler og arbeidsflater", "Roller og tilgang", "Systemarkitektur og integrasjoner"],
  },
  {
    n: "04",
    name: "E-handel",
    meta: "Konvertering / Flyt",
    blurb: "En kjøpsreise som prioriterer riktige valg og fjerner unødvendig friksjon.",
    src: "/work/capability-stage/tgn-ehandel-ipad.webp",
    layout: "landscape",
    detail: "E-handel handler om mer enn en produktgrid. Sortiment, valg, innhold, søk, betaling og oppfølging må fungere som én tydelig kjøpsreise.",
    deliverables: ["Produkt- og kategoristruktur", "Kjøpsflyt og betaling", "Søk, måling og videreutvikling"],
  },
  {
    n: "05",
    name: "AI",
    meta: "Integrasjon / Automasjon",
    blurb: "AI koblet til faktiske systemer, data og handlinger — ikke som pynt.",
    src: "/work/capability-stage/laptop-rocks.png",
    layout: "narrow",
    muted: true,
    detail: "AI gir verdi når den er koblet til virksomhetens egne data, systemer og beslutninger. Tigon kan utvikle avgrensede verktøy som reduserer manuelt arbeid og gjør kunnskap lettere å bruke.",
    deliverables: ["Søk og kunnskapsflater", "Automatiserte arbeidsflyter", "Integrasjon mot egne systemer"],
  },
  {
    n: "06",
    name: "App",
    meta: "UI / Interaksjon",
    blurb: "Et presist grensesnitt formet for mobil bruk, fart og tydelig respons.",
    src: "/work/capability-stage/tgn-brand-phone.webp",
    layout: "offset",
    detail: "En app formes rundt situasjonen den skal brukes i: korte handlinger, tydelig respons og et grensesnitt som fungerer på små skjermer. Mobil og web kan bygges som ett sammenhengende produkt.",
    deliverables: ["Mobil UX og grensesnitt", "Push, konto og publisering", "API-er og produktmåling"],
  },
] as const;

type Capability = (typeof capabilities)[number];

function CapabilityTile({ capability, onOpen }: { capability: Capability; onOpen: (capability: Capability) => void }) {
  return (
    <article
      className={`work-tile work-tile--${capability.layout}`}
      data-work-tile
    >
      <button
        className="work-tile__trigger"
        type="button"
        aria-label={`Les mer om ${capability.name}`}
        aria-haspopup="dialog"
        aria-controls="work-detail-dialog"
        data-cursor-hover=""
        data-cursor-text={`Les mer / ${capability.name}`}
        onClick={() => onOpen(capability)}
      >
        <span className="work-tile__tap-label" aria-hidden="true">Les mer <span>↗</span></span>
      </button>

      <header className="work-tile__head">
        <div>
          <span>{capability.n} / 06</span>
          <h3>{capability.name}</h3>
        </div>
        <p>{capability.meta}</p>
      </header>

      <figure className="work-tile__visual">
        <img
          className={"muted" in capability && capability.muted ? "work-tile__image--muted" : undefined}
          src={capability.src}
          alt=""
          loading="lazy"
        />
      </figure>

      <footer className="work-tile__foot">
        <p>{capability.blurb}</p>
        <span>Capability / konseptflate</span>
      </footer>
    </article>
  );
}

/* 04 / Arbeid — en lys, asymmetrisk capability-vegg i normal dokumentflyt.
   Flatene viser hva Tigon kan skape og presenteres aldri som kundecaser. */
export function WorkProof() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeCapability, setActiveCapability] = useState<Capability | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeCapability && !dialog.open) dialog.showModal();
    if (!activeCapability && dialog.open) dialog.close();
  }, [activeCapability]);

  const closeDetails = () => dialogRef.current?.close();

  return (
    <section
      id="arbeid"
      className="work-proof"
      aria-labelledby="work-proof-title"
      data-theme-section="light"
      data-bg-section="light"
    >
      <header className="work-proof__intro">
        <p className="work-proof__label">04 / Arbeid</p>
        <h2 className="work-proof__title" id="work-proof-title">
          <span>Dette kan</span>
          <span>Tigon lage.</span>
        </h2>
        <div className="work-proof__intro-copy">
          <p>Seks mulige leveranser. Utviklet som demonstrasjoner, systemer og konsepter.</p>
          <span>TGN / capability field / 01—06</span>
        </div>
      </header>

      <div className="work-wall" data-work-wall>
        <div className="work-wall__row work-wall__row--opening">
          {capabilities.slice(0, 3).map((capability) => (
            <CapabilityTile capability={capability} key={capability.n} onOpen={setActiveCapability} />
          ))}
        </div>

        <p className="work-proof__statement" data-work-statement>
          Nettsider, apper og digitale systemer hvor design, teknologi og
          synlighet virker som én helhet.
        </p>

        <div className="work-wall__row work-wall__row--closing">
          {capabilities.slice(3).map((capability) => (
            <CapabilityTile capability={capability} key={capability.n} onOpen={setActiveCapability} />
          ))}
        </div>
      </div>

      <div className="work-cursor" data-cursor="" aria-hidden="true">
        <div className="work-cursor__bubble">
          <span className="work-cursor__text" data-cursor-text-target="">Les mer</span>
          <span className="work-cursor__arrow">↗</span>
        </div>
      </div>

      <dialog
        id="work-detail-dialog"
        className="work-detail"
        ref={dialogRef}
        aria-labelledby="work-detail-title"
        aria-describedby="work-detail-description"
        onClose={() => setActiveCapability(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
      >
        {activeCapability && (
          <div className="work-detail__inner">
            <header className="work-detail__head">
              <span>{activeCapability.n} / 06 · {activeCapability.meta}</span>
              <button type="button" onClick={closeDetails} autoFocus>
                Lukk <span aria-hidden="true">×</span>
              </button>
            </header>
            <h2 id="work-detail-title">{activeCapability.name}</h2>
            <p id="work-detail-description">{activeCapability.detail}</p>
            <div className="work-detail__deliverables">
              <span>Dette kan inngå</span>
              <ul>
                {activeCapability.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </div>
            <p className="work-detail__note">Capability-demonstrasjon / ikke kundecase</p>
          </div>
        )}
      </dialog>

      <noscript>
        <div className="work-proof__no-js-details">
          {capabilities.map((capability) => (
            <section key={capability.n}>
              <h3>{capability.name}</h3>
              <p>{capability.detail}</p>
            </section>
          ))}
        </div>
      </noscript>

      <footer className="work-proof__disclaimer">
        <span>Dette kan Tigon lage</span>
        <span>Capability-demonstrasjoner / ikke kundecaser</span>
      </footer>
    </section>
  );
}
