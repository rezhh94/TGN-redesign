"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
    detail: "Tigon kan bygge skreddersydde webapper for arbeidsflyter som hyllevare ikke dekker — med roller, integrasjoner og full kontroll på kode og data.",
    deliverables: ["Arbeidsflyt og grensesnitt", "Innlogging, roller og data", "API-er, testing og videreutvikling"],
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
    detail: "Tigon kan bygge raske Next.js-nettsteder der design, strukturert innhold, teknisk SEO og integrasjoner fungerer som én løsning.",
    deliverables: ["Design og innholdsstruktur", "Next.js, CMS og integrasjoner", "Teknisk SEO og Core Web Vitals"],
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
    detail: "Tigon kan bygge digitale plattformer som samler brukere, roller, data og tjenester i ett system som kan videreutvikles over tid.",
    deliverables: ["Portaler og selvbetjening", "Roller, data og API-er", "Arkitektur, drift og videreutvikling"],
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
    detail: "Tigon kan bygge nettbutikker med skreddersydd design, raske produktsider, norsk betaling og integrasjoner mot lager, ordre og frakt.",
    deliverables: ["Produkt- og kategoristruktur", "Vipps, Klarna og utsjekk", "Lager-, ordre- og fraktintegrasjoner"],
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
    detail: "Tigon kan bygge AI-søk, kunnskapsverktøy og automatiserte arbeidsflyter som bruker virksomhetens egne data med logging og tilgangskontroll.",
    deliverables: ["RAG-søk og kunnskapsbase", "Agenter og automatiserte flyter", "API-er, logging og datakontroll"],
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
    detail: "Tigon kan bygge stabile apper for iOS og Android, fra første kjerneflyt til innlogging, betaling, push og integrasjoner.",
    deliverables: ["Mobil UX og grensesnitt", "React Native eller native", "API, innlogging, betaling og push"],
  },
] as const;

type Capability = (typeof capabilities)[number];

function CapabilityTile({
  capability,
  onOpen,
}: {
  capability: Capability;
  onOpen: (capability: Capability, trigger: HTMLButtonElement, fromKeyboard: boolean) => void;
}) {
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
        onClick={(event) => onOpen(capability, event.currentTarget, event.detail === 0)}
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

      <figure className="work-tile__visual" data-tile-visual={capability.n}>
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
          <a href={capability.href} aria-label={`${capability.linkLabel}: ${capability.name}`}>
            {capability.linkLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </article>
  );
}

/* 04 / Arbeid — en lys, asymmetrisk capability-vegg i normal dokumentflyt.
   Flatene viser hva Tigon kan skape og presenteres aldri som kundecaser. */
/* Delt-element-morph (klikkdrevet): den valgte flatens bilde ekspanderer inn i
   dialogens medieområde og flyr tilbake ved lukking. Geometrien animeres via en
   klone — React-DOM-en reparentes aldri. Under 769px og ved reduced motion
   åpner/lukker dialogen direkte som før. */
const MORPH_OPEN_S = 0.6;
const MORPH_CLOSE_S = 0.45;

function morphEnabled() {
  return (
    window.matchMedia("(min-width: 769px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function makeClone(sourceImg: HTMLImageElement, rect: DOMRect) {
  const clone = document.createElement("div");
  clone.setAttribute("aria-hidden", "true");
  Object.assign(clone.style, {
    position: "fixed",
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    overflow: "hidden",
    zIndex: "60",
    pointerEvents: "none",
  } satisfies Partial<CSSStyleDeclaration>);

  const img = document.createElement("img");
  img.src = sourceImg.currentSrc || sourceImg.src;
  img.alt = "";
  Object.assign(img.style, {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: getComputedStyle(sourceImg).filter,
  } satisfies Partial<CSSStyleDeclaration>);

  clone.appendChild(img);
  return clone;
}

/* Pixelate-render under åpne-morphen: valgt flate går fra grove blokker til
   skarpt bilde mens den ekspanderer — mikro-varianten av pixel-motivet fra
   02→03-broen. Canvas-lag over klonen; fjernes når bildet er skarpt. */
const PIXEL_STAGES = [12, 18, 26, 38, 56, 84];
const PIXEL_RESOLVE_S = 0.42;

function attachPixelStages(
  clone: HTMLElement,
  sourceImg: HTMLImageElement,
  rect: DOMRect,
  tl: gsap.core.Timeline,
) {
  if (!sourceImg.naturalWidth || !sourceImg.naturalHeight) return;

  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    imageRendering: "pixelated",
    // Samme fargebehandling som kildebildet, så muted-flater aldri hopper.
    filter: getComputedStyle(sourceImg).filter,
  } satisfies Partial<CSSStyleDeclaration>);
  canvas.setAttribute("aria-hidden", "true");
  clone.appendChild(canvas);

  const context = canvas.getContext("2d");
  if (!context) {
    canvas.remove();
    return;
  }

  const aspect = rect.height / rect.width;
  const nw = sourceImg.naturalWidth;
  const nh = sourceImg.naturalHeight;

  const drawStage = (cols: number) => {
    const rows = Math.max(2, Math.round(cols * aspect));
    // Cover-beskjæring av kilden, tegnet uten glatting → harde blokker.
    const scale = Math.max(cols / nw, rows / nh);
    const sw = cols / scale;
    const sh = rows / scale;
    canvas.width = cols;
    canvas.height = rows;
    context.imageSmoothingEnabled = false;
    context.drawImage(sourceImg, (nw - sw) / 2, (nh - sh) / 2, sw, sh, 0, 0, cols, rows);
  };

  const stepLength = PIXEL_RESOLVE_S / PIXEL_STAGES.length;
  PIXEL_STAGES.forEach((cols, index) => {
    tl.add(() => drawStage(cols), index * stepLength);
  });
  tl.add(() => canvas.remove(), PIXEL_RESOLVE_S);
}

export function WorkProof() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeCapability, setActiveCapability] = useState<Capability | null>(null);
  const sourceVisualRef = useRef<HTMLElement | null>(null);
  const sourceTriggerRef = useRef<HTMLButtonElement | null>(null);
  const restoreKeyboardFocusRef = useRef(false);
  const morphRef = useRef<{
    phase: "open" | "close";
    clone: HTMLElement;
    timeline?: gsap.core.Timeline;
  } | null>(null);

  const restoreSource = () => {
    if (sourceVisualRef.current) sourceVisualRef.current.style.visibility = "";
    sourceVisualRef.current = null;
  };

  // Fjern alle iscenesettelses-styles fra dialogflaten og innholdet.
  const clearStaging = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    gsap.set(dialog, { clearProps: "backgroundColor,borderColor,boxShadow" });
    const inner = dialog.querySelector<HTMLElement>(".work-detail__inner");
    if (inner) {
      gsap.set(
        Array.from(inner.querySelectorAll<HTMLElement>("[data-detail-reveal], .work-detail__head")),
        { clearProps: "all" },
      );
    }
    const media = dialog.querySelector<HTMLElement>("[data-detail-media]");
    if (media) media.style.opacity = "";
  };

  // Avbryt en pågående morph trygt: drep timeline, fjern klonen, vis flaten.
  const abortMorph = () => {
    const morph = morphRef.current;
    if (!morph) return;
    morph.timeline?.kill();
    gsap.killTweensOf(morph.clone);
    morph.clone.remove();
    morphRef.current = null;
    clearStaging();
    restoreSource();
  };

  const openCapability = (
    capability: Capability,
    trigger: HTMLButtonElement,
    fromKeyboard: boolean,
  ) => {
    sourceVisualRef.current = document.querySelector<HTMLElement>(
      `[data-tile-visual="${capability.n}"]`,
    );
    sourceTriggerRef.current = trigger;
    restoreKeyboardFocusRef.current = fromKeyboard;
    setActiveCapability(capability);
  };

  // Lukking med revers-morph: bildet flyr fra dialogen tilbake til flaten.
  // Kjøres bare når åpne-morphen er ferdig og forholdene er robuste; ellers
  // faller vi tilbake til vanlig dialog-lukking.
  const requestClose = () => {
    const dialog = dialogRef.current;
    const source = sourceVisualRef.current;
    const media = dialog?.querySelector<HTMLElement>("[data-detail-media]");
    const mediaImg = media?.querySelector("img");

    if (!dialog || !source || !media || !mediaImg || !morphEnabled() || morphRef.current) {
      abortMorph();
      restoreSource();
      dialogRef.current?.close();
      return;
    }

    const fromRect = media.getBoundingClientRect();
    const toRect = source.getBoundingClientRect();
    const clone = makeClone(mediaImg, fromRect);
    document.body.appendChild(clone);
    morphRef.current = { phase: "close", clone };
    dialog.close();

    gsap.to(clone, {
      top: toRect.top,
      left: toRect.left,
      width: toRect.width,
      height: toRect.height,
      duration: MORPH_CLOSE_S,
      ease: "power3.inOut",
      onComplete: () => {
        morphRef.current = null;
        restoreSource();
        clone.remove();
      },
    });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeCapability && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;

      const source = sourceVisualRef.current;
      const sourceImg = source?.querySelector("img");
      const media = dialog.querySelector<HTMLElement>("[data-detail-media]");

      if (source && sourceImg && media && morphEnabled()) {
        const fromRect = source.getBoundingClientRect();
        const toRect = media.getBoundingClientRect();
        const clone = makeClone(sourceImg, fromRect);
        dialog.appendChild(clone);
        source.style.visibility = "hidden";
        media.style.opacity = "0";

        // Iscenesettelse: først flyr bildet alene over backdropen, så
        // materialiserer papirflaten seg rundt det, og til slutt ankommer
        // teksten. Flaten og teksten kommer ETTER transformasjonen.
        const surface = getComputedStyle(dialog);
        const surfaceTo = {
          backgroundColor: surface.backgroundColor,
          borderColor: surface.borderColor,
          boxShadow: surface.boxShadow,
        };
        gsap.set(dialog, {
          backgroundColor: "rgba(242, 242, 239, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          boxShadow: "none",
        });
        const inner = dialog.querySelector<HTMLElement>(".work-detail__inner");
        // Headeren (med fokusert Lukk-knapp) holdes tilgjengelig gjennom hele
        // animasjonen: kun opacity, aldri visibility — ellers dropper
        // nettleseren fokus til <body>.
        const head = inner?.querySelector<HTMLElement>(".work-detail__head") ?? null;
        const parts = inner
          ? Array.from(inner.querySelectorAll<HTMLElement>("[data-detail-reveal]"))
          : [];
        gsap.set(parts, { autoAlpha: 0, y: 14 });
        if (head) gsap.set(head, { opacity: 0 });

        const tl = gsap.timeline({
          onComplete: () => {
            morphRef.current = null;
            clearStaging();
          },
        });
        // Pixel-stadiene kjører i første del av flukten: valgt flate går fra
        // oversikt (grov) til fokus (skarp) idet den lander. Kun ved åpning.
        attachPixelStages(clone, sourceImg, fromRect, tl);

        tl.to(clone, {
          top: toRect.top,
          left: toRect.left,
          width: toRect.width,
          height: toRect.height,
          duration: MORPH_OPEN_S,
          ease: "power3.inOut",
        }, 0)
          .to(dialog, {
            ...surfaceTo,
            duration: 0.4,
            ease: "power2.out",
          }, MORPH_OPEN_S - 0.18)
          .add(() => {
            media.style.opacity = "";
            clone.remove();
          }, MORPH_OPEN_S)
          .to(parts, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          }, MORPH_OPEN_S - 0.05);

        if (head) {
          tl.to(head, { opacity: 1, duration: 0.4, ease: "power2.out" }, MORPH_OPEN_S - 0.18);
        }

        morphRef.current = { phase: "open", clone, timeline: tl };
      } else {
        restoreSource();
      }
    }

    if (!activeCapability && dialog.open) dialog.close();
  }, [activeCapability]);

  // Sikkerhetsnett ved unmount: flaten skal aldri bli stående skjult.
  useEffect(() => () => {
    abortMorph();
    restoreSource();
  }, []);

  const closeDetails = () => requestClose();

  const showAdjacentCapability = (direction: -1 | 1) => {
    if (!activeCapability || morphRef.current) return;

    const currentIndex = capabilities.findIndex(({ n }) => n === activeCapability.n);
    const nextIndex = (currentIndex + direction + capabilities.length) % capabilities.length;
    const nextCapability = capabilities[nextIndex];

    // En eventuell skjult kildeflate fra åpne-morphen må tilbake før vi
    // flytter detaljvisningen til neste capability.
    restoreSource();
    const nextVisual = document.querySelector<HTMLElement>(
      `[data-tile-visual="${nextCapability.n}"]`,
    );
    sourceVisualRef.current = nextVisual;
    sourceTriggerRef.current = nextVisual
      ?.closest<HTMLElement>("[data-work-tile]")
      ?.querySelector<HTMLButtonElement>(".work-tile__trigger") ?? null;
    restoreKeyboardFocusRef.current = false;
    setActiveCapability(nextCapability);
    dialogRef.current?.scrollTo({ top: 0 });
  };

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
            <CapabilityTile capability={capability} key={capability.n} onOpen={openCapability} />
          ))}
        </div>

        <p className="work-proof__statement" data-work-statement>
          Nettsider, apper og digitale systemer som gjør komplekse behov
          tydelige, brukbare og målbare.
        </p>

        <div className="work-wall__row work-wall__row--closing">
          {capabilities.slice(3).map((capability) => (
            <CapabilityTile capability={capability} key={capability.n} onOpen={openCapability} />
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
        data-lenis-prevent=""
        aria-labelledby="work-detail-title"
        aria-describedby="work-detail-description"
        onClose={() => {
          const sourceTrigger = sourceTriggerRef.current;
          const shouldRestoreKeyboardFocus = restoreKeyboardFocusRef.current;
          // Lukket midt i åpne-morphen (f.eks. Escape): avbryt trygt.
          if (morphRef.current?.phase === "open") abortMorph();
          // Ved close-morph rydder tweenens onComplete; ellers vis flaten nå.
          if (!morphRef.current) restoreSource();
          setActiveCapability(null);
          sourceTriggerRef.current = null;
          restoreKeyboardFocusRef.current = false;
          if (shouldRestoreKeyboardFocus) {
            requestAnimationFrame(() => sourceTrigger?.focus());
          }
        }}
        onCancel={(event) => {
          // Escape etter ferdig åpning: kjør revers-morphen i stedet.
          if (morphEnabled() && sourceVisualRef.current && !morphRef.current) {
            event.preventDefault();
            requestClose();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
      >
        {activeCapability && (
          <div className="work-detail__inner">
            <figure className="work-detail__media" data-detail-media>
              <img
                className={"muted" in activeCapability && activeCapability.muted ? "work-tile__image--muted" : undefined}
                src={activeCapability.src}
                alt=""
              />
            </figure>

            <div className="work-detail__panel">
              <header className="work-detail__head">
                <span>{activeCapability.n} / 06 · {activeCapability.meta}</span>
                <button type="button" onClick={closeDetails} autoFocus>
                  Lukk <span aria-hidden="true">×</span>
                </button>
              </header>

              <div className="work-detail__body">
                <div className="work-detail__intro" data-detail-reveal>
                  <h2 id="work-detail-title">{activeCapability.name}</h2>
                  <p id="work-detail-description">{activeCapability.detail}</p>
                </div>

                <div className="work-detail__content">
                  <div className="work-detail__deliverables" data-detail-reveal>
                    <span>Dette kan inngå</span>
                    <ol>
                      {activeCapability.deliverables.map((deliverable, index) => (
                        <li key={deliverable}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{deliverable}</strong>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <a className="work-detail__service-link" href={activeCapability.href} data-detail-reveal>
                    <span>{activeCapability.linkLabel}</span>
                    <strong>{activeCapability.name}</strong>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <p className="work-detail__note" data-detail-reveal>
                    Capability-demonstrasjon / ikke kundecase
                  </p>
                </div>
              </div>

              <nav className="work-detail__nav" aria-label="Bytt capability" data-detail-reveal>
                <span>{activeCapability.n} / 06</span>
                <div>
                  <button
                    type="button"
                    onClick={() => showAdjacentCapability(-1)}
                    aria-label="Forrige capability"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => showAdjacentCapability(1)}
                    aria-label="Neste capability"
                  >
                    →
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </dialog>

      <noscript>
        <div className="work-proof__no-js-details">
          {capabilities.map((capability) => (
            <section key={capability.n}>
              <h3>{capability.name}</h3>
              <p>{capability.detail}</p>
              <a href={capability.href}>{capability.linkLabel}: {capability.name}</a>
            </section>
          ))}
        </div>
      </noscript>

      <footer className="work-proof__disclaimer">
        <span>Dette kan Tigon lage</span>
        <span>Capability-demonstrasjoner / ikke kundecaser</span>
      </footer>

      <div
        className="work-proof__shutter"
        data-shutter-scroll-transition=""
        data-rows="6"
        data-rows-tablet="5"
        data-rows-mobile="4"
        aria-hidden="true"
      />
    </section>
  );
}
