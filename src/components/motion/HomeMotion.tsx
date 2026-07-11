"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destroyLenis, initLenis } from "@/lib/motion";
import {
  initApproachPathJourney,
  initContentRevealScroll,
  initFooterParallax,
  initGlobalParallax,
  initLoopingWordsWithSelector,
  initShutterScrollTransition,
} from "@/lib/osmo-motion";

gsap.registerPlugin(ScrollTrigger);

// Mobile address-bar show/hide fires resize; refreshing mid-pin makes
// pinned scenes jump. Dimension changes from real rotation still refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

// 02 / Tjenester — readable accordion with a supporting active visual.
// All service names, descriptions and links remain SSR and readable without JS.
function servicesScene() {
  const section = document.querySelector<HTMLElement>("[data-build-section]");
  if (!section) return () => {};

  const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]", section);
  const visuals = gsap.utils.toArray<HTMLElement>("[data-service-visual-item]", section);
  const cleanups: Array<() => void> = [];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = -1;
  section.classList.add("what-build--enhanced");

  const activate = (index: number, animate = true) => {
    if (index === activeIndex && animate) return;
    activeIndex = index;
    animate = animate && !reduced;
    rows.forEach((row, rowIndex) => {
      const active = rowIndex === index;
      const panel = row.querySelector<HTMLElement>("[data-service-panel]");
      const button = row.querySelector<HTMLElement>("[data-service-toggle]");
      row.dataset.active = String(active);
      button?.setAttribute("aria-expanded", String(active));
      if (!panel) return;
      panel.inert = !active;
      panel.setAttribute("aria-hidden", String(!active));
      if (!animate) {
        gsap.set(panel, { height: active ? "auto" : 0 });
        return;
      }
      gsap.killTweensOf(panel);
      if (active) {
        gsap.set(panel, { height: "auto" });
        const height = panel.offsetHeight;
        gsap.fromTo(panel, { height: 0 }, {
          height,
          duration: 0.52,
          ease: "power3.inOut",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        });
      } else {
        gsap.to(panel, { height: 0, duration: 0.42, ease: "power3.inOut" });
      }
    });
    visuals.forEach((visual, visualIndex) => {
      visual.dataset.active = String(visualIndex === index);
    });
  };

  activate(0, false);
  rows.forEach((row, index) => {
    const button = row.querySelector<HTMLElement>("[data-service-toggle]");
    if (!button) return;
    const onActivate = () => activate(index);
    button.addEventListener("click", onActivate);
    button.addEventListener("pointerenter", onActivate);
    cleanups.push(() => {
      button.removeEventListener("click", onActivate);
      button.removeEventListener("pointerenter", onActivate);
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    section.classList.remove("what-build--enhanced");
    rows.forEach((row, index) => {
      row.dataset.active = String(index === 0);
      row.querySelector<HTMLElement>("[data-service-toggle]")?.setAttribute("aria-expanded", String(index === 0));
      const panel = row.querySelector<HTMLElement>("[data-service-panel]");
      if (panel) {
        panel.inert = false;
        panel.removeAttribute("aria-hidden");
        gsap.set(panel, { clearProps: "height" });
      }
    });
  };
}
// One-time opening scene: title lines rise, then the film and interface settle.
// FROM-tweens only — without JS everything is simply visible (no CLS).
function heroEntrance(full: boolean) {
  const titleLines = gsap.utils.toArray<HTMLElement>(".hero__title span");
  if (!titleLines.length) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(titleLines, { yPercent: 26, autoAlpha: 0, duration: 0.8, stagger: 0.09 });

  if (full) {
    tl.from(".hero__visual", { autoAlpha: 0, scale: 1.025, duration: 0.9 }, "-=0.7");
    tl.from(
      ".hero__axis, .hero__meta, .hero__scene",
      { autoAlpha: 0, y: 10, duration: 0.45, stagger: 0.05 },
      "-=0.48",
    );
  }
  tl.from(".hero__bar", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.4");
}

// 01 / Tilnærming, beat 1 — «Oppsett». The title rises in once, then the
// structure paragraph fills word by word from dim to bright as the section
// scrolls past (Monolog «fill» text — no pin, pure scrub). Words are wrapped at
// runtime; teardown restores the original markup. No-JS / PRM keep the static,
// already-filled (bright) paragraph.
function introParallaxScene() {
  const section = document.querySelector<HTMLElement>("[data-intro-parallax]");
  const surface = section?.querySelector<HTMLElement>("[data-intro-surface]");
  const heroVisual = document.querySelector<HTMLElement>(".hero__visual");
  const lines = surface
    ? gsap.utils.toArray<HTMLElement>("[data-intro-title] > span", surface)
    : [];
  if (!section || !surface) return () => {};

  const ctx = gsap.context(() => {
    if (heroVisual) {
      gsap.to(heroVisual, {
        yPercent: 14,
        scale: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
        },
      });
    }
    if (lines.length) {
      gsap.from(lines, {
        yPercent: 28,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: surface, start: "top 72%", once: true },
      });
    }
  }, section);

  return () => ctx.revert();
}

// 02→03 / Overlevering — Jack & AI-adaptert lagdeling without another pin.
// The two oversized decorative tracks cross in opposite directions while the
// readable lockup and image settle once. All continuous work is transform-only
// and scoped to the section's viewport pass.
function bridgeScene() {
  const section = document.querySelector<HTMLElement>(".effect-bridge");
  if (!section) return () => {};

  const stage = section.querySelector<HTMLElement>("[data-bridge-stage]");
  const windowEl = section.querySelector<HTMLElement>("[data-bridge-window]");

  const ctx = gsap.context(() => {
    if (stage && windowEl && window.matchMedia("(min-width: 761px)").matches) {
      gsap.fromTo(windowEl, { scale: 0.68 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: stage, start: "top 76%", end: "bottom bottom", scrub: 0.65 },
      });
      gsap.fromTo(windowEl.querySelector("img"), { scale: 1.12 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: stage, start: "top 76%", end: "bottom bottom", scrub: 0.65 },
      });
    }
  }, section);

  return () => ctx.revert();
}

// 04 / Arbeid — én koordinert montering. Fem mockupflater samles til den
// statiske capability-komposisjonen; den kompakte indeksen kommer etterpå.
// Ingen pin, per-rad-gjentakelse eller kontinuerlig parallax.
function workProof(cinematic: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};

  const stage = section.querySelector<HTMLElement>("[data-work-stage]");
  const media = gsap.utils.toArray<HTMLElement>("[data-work-media]", section);
  const lock = section.querySelector<HTMLElement>("[data-work-lock]");
  const indexItems = gsap.utils.toArray<HTMLElement>("[data-work-index] > li", section);
  if (!stage || !media.length || !cinematic) return () => {};

  const arm = (trigger: HTMLElement, play: () => void, start: string) => {
    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      play();
    };
    ScrollTrigger.create({
      trigger,
      start,
      onEnter: fire,
      onRefresh: (self) => {
        if (self.progress > 0) fire();
      },
    });
  };

  const ctx = gsap.context(() => {
    const starts = [
      { x: -72, y: 34, rotation: -2.2, scale: 0.95 },
      { x: 70, y: -26, rotation: 2.4, scale: 0.93 },
      { x: 58, y: 62, rotation: 1.5, scale: 0.94 },
      { x: -54, y: 56, rotation: -1.6, scale: 0.94 },
      { x: 14, y: -58, rotation: 2.8, scale: 0.9 },
    ];

    media.forEach((item, index) => {
      gsap.set(item, { autoAlpha: 0, ...starts[index % starts.length] });
    });
    if (lock) gsap.set(lock, { scaleX: 0, transformOrigin: "left center" });

    const stageTimeline = gsap.timeline({ paused: true });
    stageTimeline.to(media, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.085,
    });
    if (lock) {
      stageTimeline.to(lock, { scaleX: 1, duration: 0.75, ease: "power2.inOut" }, 0.42);
    }
    arm(stage, () => stageTimeline.play(), "top 76%");

    if (indexItems.length) {
      const index = section.querySelector<HTMLElement>("[data-work-index]");
      if (index) {
        gsap.set(indexItems, { autoAlpha: 0, y: 18 });
        arm(index, () => gsap.to(indexItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          ease: "power3.out",
          stagger: 0.055,
        }), "top 82%");
      }
    }
  }, section);

  return () => ctx.revert();
}

// 05 / Prosess — same compositional grammar as 04 / Arbeid. Three process
// surfaces settle into one assembly once; the readable phase index remains in
// ordinary document flow below. No pin or scroll-switched content.
function processTransformation() {
  const stage = document.querySelector<HTMLElement>("[data-process-stage]");
  if (!stage) return () => {};

  const surfaces = gsap.utils.toArray<HTMLElement>("[data-process-surface]", stage);
  const legend = stage.querySelector<HTMLElement>(".process-assembly__legend strong");

  const ctx = gsap.context(() => {
    if (surfaces.length) {
      gsap.from(surfaces, {
        x: (index) => [-110, 0, 110][index] ?? 0,
        y: (index) => [54, -76, 68][index] ?? 0,
        scale: (index) => [0.92, 0.88, 0.92][index] ?? 0.92,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.11,
        ease: "power3.out",
        scrollTrigger: { trigger: stage, start: "top 68%", once: true },
      });
    }

    if (legend) {
      gsap.from(legend, {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: stage, start: "top 68%", once: true },
      });
    }
  }, stage);

  return () => ctx.revert();
}

// 06 / System — manifesto lines rise out of their masks once; support and
// corner marks settle after. The page's quietest reveal.
function manifestoReveal() {
  const section = document.querySelector<HTMLElement>(".system-manifesto");
  if (!section) return;

  const lines = gsap.utils.toArray<HTMLElement>(
    ".system-manifesto__line-inner",
    section
  );
  const support = section.querySelector("[data-manifesto-support]");
  const gridColumns = section.querySelectorAll(".system-manifesto__grid span");
  const pieces = gsap.utils.toArray<HTMLElement>("[data-system-piece]", section);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: "top 64%", once: true },
    defaults: { ease: "power3.out" },
  });

  if (lines.length) {
    tl.from(lines, { yPercent: 108, duration: 0.8, stagger: 0.12 });
  }
  if (pieces.length) {
    tl.from(pieces, {
      x: (index) => [-90, 86, -62, 70][index] ?? 0,
      y: (index) => [-56, -72, 70, 58][index] ?? 0,
      rotation: (index) => [-8, 7, 5, -6][index] ?? 0,
      autoAlpha: 0,
      duration: 0.95,
      stagger: 0.08,
      ease: "power3.inOut",
    }, 0.1);
  }
  if (support) {
    tl.from(support, { autoAlpha: 0, y: 16, duration: 0.55 }, "-=0.35");
  }
  if (gridColumns.length) {
    tl.from(gridColumns, { autoAlpha: 0, yPercent: 10, duration: 0.6, stagger: 0.025 }, "-=0.4");
  }
}

function footerReveals() {
  const wordmark = document.querySelector<HTMLElement>(".contact-footer__wordmark");
  if (wordmark) {
    gsap.from(wordmark, {
      yPercent: 22,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: wordmark, start: "top 96%", once: true },
    });
  }
}

// Utility enhancements — run whenever JS is available (not motion-gated):
// live Oslo clock in the footer status line and copy-to-clipboard for email.
function setupFooterUtilities() {
  const cleanups: Array<() => void> = [];

  const clockEl = document.querySelector<HTMLElement>("[data-local-time]");
  if (clockEl) {
    const format = new Intl.DateTimeFormat("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Europe/Oslo",
    });
    const tick = () => {
      clockEl.textContent = format.format(new Date());
    };
    tick();
    const id = window.setInterval(tick, 1000);
    cleanups.push(() => window.clearInterval(id));
  }

  const copyButton = document.querySelector<HTMLButtonElement>("[data-copy-email]");
  if (copyButton) {
    const idleLabel = copyButton.textContent;
    let resetTimer = 0;
    copyButton.hidden = false;

    const legacyCopy = (text: string) => {
      const scratch = document.createElement("textarea");
      scratch.value = text;
      scratch.setAttribute("readonly", "");
      scratch.style.position = "fixed";
      scratch.style.opacity = "0";
      document.body.appendChild(scratch);
      scratch.select();
      const ok = document.execCommand("copy");
      scratch.remove();
      return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
    };

    const confirmCopied = () => {
      copyButton.setAttribute("data-copied", "");
      copyButton.textContent = "Kopiert ✓";
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        copyButton.removeAttribute("data-copied");
        copyButton.textContent = idleLabel;
      }, 2000);
    };

    const onClick = () => {
      const email = copyButton.getAttribute("data-copy-email") ?? "";
      const write = navigator.clipboard?.writeText
        ? navigator.clipboard.writeText(email).catch(() => legacyCopy(email))
        : legacyCopy(email);
      write.then(confirmCopied).catch(() => {});
    };

    copyButton.addEventListener("click", onClick);
    cleanups.push(() => {
      copyButton.removeEventListener("click", onClick);
      window.clearTimeout(resetTimer);
      copyButton.removeAttribute("data-copied");
      copyButton.textContent = idleLabel;
    });
  }

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

export function HomeMotion() {
  useEffect(() => {
    const teardownUtilities = setupFooterUtilities();
    const lenis = initLenis({ lerp: 0.12 });
    lenis?.lenis.on("scroll", ScrollTrigger.update);
    const teardownOsmoReveal = initContentRevealScroll();
    const teardownOsmoParallax = initGlobalParallax();
    const teardownServices = servicesScene();
    let teardownLoopingWords = () => {};
    let teardownShutter = () => {};
    let teardownFooterParallax = () => {};
    let teardownApproachPath = () => {};
    let footerInitFrame = 0;
    let effectCancelled = false;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = introParallaxScene();
      const teardownBridge = bridgeScene();
      const teardownWork = workProof(window.matchMedia("(min-width: 901px)").matches);
      const teardownProcess = processTransformation();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownBridge();
        teardownWork();
        teardownProcess();
      };
    });

    // Mobile keeps the same static content order. Only small one-shot reveals
    // run; the cinematic Work stage remains disabled below tablet width.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownIntro = introParallaxScene();
      const teardownBridge = bridgeScene();
      const teardownWork = workProof(false);
      const teardownProcess = processTransformation();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownBridge();
        teardownWork();
        teardownProcess();
      };
    });

    const layoutReady = document.fonts?.ready ?? Promise.resolve();
    layoutReady.then(() => {
      if (effectCancelled) return;
      footerInitFrame = window.requestAnimationFrame(() => {
        if (effectCancelled) return;
        teardownLoopingWords = initLoopingWordsWithSelector();
        teardownShutter = initShutterScrollTransition();
        teardownFooterParallax = initFooterParallax();
        teardownApproachPath = initApproachPathJourney();
        ScrollTrigger.refresh();
      });
    });

    return () => {
      effectCancelled = true;
      window.cancelAnimationFrame(footerInitFrame);
      mm.revert();
      lenis?.lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
      teardownFooterParallax();
      teardownOsmoParallax();
      teardownServices();
      teardownOsmoReveal();
      teardownLoopingWords();
      teardownShutter();
      teardownApproachPath();
      teardownUtilities();
    };
  }, []);

  return null;
}
