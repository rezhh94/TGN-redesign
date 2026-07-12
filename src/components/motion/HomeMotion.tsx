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
  initShutterScrollTransition,
} from "@/lib/osmo-motion";

gsap.registerPlugin(ScrollTrigger);

// Mobile address-bar show/hide fires resize; refreshing mid-pin makes
// pinned scenes jump. Dimension changes from real rotation still refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

// 02 / Tjenester — five complete editorial chapters in ordinary document flow.
// Copy and media settle from small opposing offsets; service names, descriptions
// and links remain visible, server-rendered content without JavaScript.
function servicesScene() {
  const section = document.querySelector<HTMLElement>("[data-build-section]");
  if (!section) return () => {};

  const chapters = gsap.utils.toArray<HTMLElement>("[data-service-chapter]", section);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const ctx = gsap.context(() => {
    const compact = window.matchMedia("(max-width: 900px)").matches;

    chapters.forEach((chapter, index) => {
      const visual = chapter.querySelector<HTMLElement>("[data-service-chapter-visual]");
      const image = visual?.querySelector<HTMLElement>("img");
      const copy = chapter.querySelector<HTMLElement>("[data-service-copy]");
      if (!visual || !image || !copy) return;

      const direction = index % 2 ? -1 : 1;
      const settle = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "top 92%",
          end: compact ? "top 38%" : "top 32%",
          scrub: compact ? 0.14 : 0.18,
          invalidateOnRefresh: true,
        },
      });

      settle
        .fromTo(
          visual,
          { xPercent: direction * (compact ? 3 : 6), y: compact ? 12 : 20, scale: 0.985, autoAlpha: 0.76 },
          { xPercent: 0, y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          copy,
          { xPercent: direction * (compact ? -2 : -3), y: compact ? 10 : 16, autoAlpha: 0.68 },
          { xPercent: 0, y: 0, autoAlpha: 1, duration: 0.82, ease: "none" },
          0.12,
        );

      gsap.fromTo(image, { yPercent: -6 }, {
        yPercent: 2,
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "top bottom",
          end: "bottom top",
          scrub: compact ? 0.22 : 0.32,
        },
      });
    });
  }, section);

  return () => ctx.revert();
}

// 03 / Effekt — one complete 2x2 outcome field in ordinary document flow.
// Motion only settles the already-visible cells; the result chain stays fully
// readable in server-rendered HTML on every device and without JavaScript.
function effectScene() {
  const section = document.querySelector<HTMLElement>("[data-effect-section]");
  if (!section) return () => {};

  const outcomes = gsap.utils.toArray<HTMLElement>("[data-effect-outcome]", section);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const compact = window.matchMedia("(max-width: 900px)").matches;
  const ctx = gsap.context(() => {
    outcomes.forEach((outcome, index) => {
      const direction = index % 2 ? 1 : -1;
      gsap.fromTo(
        outcome,
        {
          xPercent: direction * (compact ? 2 : 3.5),
          y: compact ? 14 : 24,
          autoAlpha: 0.7,
        },
        {
          xPercent: 0,
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: outcome,
            start: "top 92%",
            end: compact ? "top 52%" : "top 46%",
            scrub: compact ? 0.12 : 0.18,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }, section);

  return () => ctx.revert();
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

// 01 / Tilnærming — three disciplines settle into one precise composition.
// The assembly reacts while it moves through ordinary document flow; the same
// argument remains fully readable without JavaScript.
function introStoryScene() {
  const section = document.querySelector<HTMLElement>("[data-intro-story]");
  const identity = section?.querySelector<HTMLElement>("[data-intro-identity]");
  const assembly = section?.querySelector<HTMLElement>("[data-intro-assembly]");
  const stage = section?.querySelector<HTMLElement>("[data-intro-assembly-stage]");
  const materials = gsap.utils.toArray<HTMLElement>("[data-intro-material]", section);
  const lock = section?.querySelector<HTMLElement>("[data-intro-lock]");
  const rule = section?.querySelector<HTMLElement>("[data-intro-rule]");
  const resolution = section?.querySelector<HTMLElement>("[data-intro-resolution]");
  if (!section) return () => {};

  const ctx = gsap.context(() => {
    if (identity) {
      const identityItems = gsap.utils.toArray<HTMLElement>(":scope > *", identity);
      gsap.from(identityItems, {
        y: 34,
        autoAlpha: 0,
        duration: 0.82,
        stagger: 0.075,
        ease: "power3.out",
        scrollTrigger: { trigger: identity, start: "top 74%", once: true },
      });
    }

    if (
      assembly &&
      stage &&
      materials.length === 3 &&
      lock &&
      rule
    ) {
      const isDesktop = window.matchMedia("(min-width: 901px)").matches;
      const assemblyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: isDesktop ? "top 88%" : "top 92%",
          end: isDesktop ? "top 18%" : "top 32%",
          scrub: isDesktop ? 0.18 : 0.14,
          invalidateOnRefresh: true,
        },
      });

      if (isDesktop) {
        assemblyTimeline
          .fromTo(materials[0], { xPercent: -18, yPercent: 11, rotation: -5 }, { xPercent: 0, yPercent: 0, rotation: 0, duration: 1, ease: "none" }, 0)
          .fromTo(materials[1], { yPercent: -14, scale: 0.91 }, { yPercent: 0, scale: 1, duration: 1, ease: "none" }, 0)
          .fromTo(materials[2], { xPercent: 18, yPercent: 11, rotation: 5 }, { xPercent: 0, yPercent: 0, rotation: 0, duration: 1, ease: "none" }, 0)
          .fromTo(lock, { yPercent: 26, autoAlpha: 0.22 }, { yPercent: 0, autoAlpha: 1, duration: 0.68, ease: "none" }, 0.18)
          .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.48, ease: "none" }, 0.38);
      } else {
        assemblyTimeline
          .fromTo(materials[0], { xPercent: -7 }, { xPercent: 0, duration: 1, ease: "none" }, 0)
          .fromTo(materials[1], { yPercent: -5, scale: 0.985 }, { yPercent: 0, scale: 1, duration: 1, ease: "none" }, 0)
          .fromTo(materials[2], { xPercent: 7 }, { xPercent: 0, duration: 1, ease: "none" }, 0)
          .fromTo(lock, { yPercent: 12, autoAlpha: 0.62 }, { yPercent: 0, autoAlpha: 1, duration: 0.72, ease: "none" }, 0.14)
          .fromTo(rule, { scaleX: 0.45 }, { scaleX: 1, duration: 0.5, ease: "none" }, 0.34);
      }
    }

    if (resolution) {
      gsap.from(resolution.children, {
        y: 38,
        autoAlpha: 0,
        duration: 0.82,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: resolution, start: "top 72%", once: true },
      });
    }
  }, section);

  return () => {
    ctx.revert();
  };
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

// Osmo: Check Section Theme on Scroll. The active section tells the floating
// header whether it sits over a light or dark surface. This changes chrome
// contrast only; it does not animate or recolor page content.
function sectionThemeScene() {
  const header = document.querySelector<HTMLElement>(".site-header");
  const bar = header?.querySelector<HTMLElement>(".site-header__bar");
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme-section]"));
  if (!header || !sections.length) return () => {};

  let frame = 0;
  let currentTheme = "";
  let currentBg = "";

  const check = () => {
    frame = 0;
    const offset = (bar?.offsetHeight ?? 0) / 2 + 12;
    const active = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= offset && rect.bottom >= offset;
    });
    if (!active) return;

    const theme = active.dataset.themeSection ?? "dark";
    const bg = active.dataset.bgSection ?? theme;
    if (theme !== currentTheme) {
      header.dataset.themeNav = theme;
      currentTheme = theme;
    }
    if (bg !== currentBg) {
      header.dataset.bgNav = bg;
      currentBg = bg;
    }
  };

  const requestCheck = () => {
    if (!frame) frame = window.requestAnimationFrame(check);
  };

  window.addEventListener("scroll", requestCheck, { passive: true });
  window.addEventListener("resize", requestCheck);
  check();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", requestCheck);
    window.removeEventListener("resize", requestCheck);
    delete header.dataset.themeNav;
    delete header.dataset.bgNav;
  };
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
    const teardownSectionTheme = sectionThemeScene();
    const lenis = initLenis({ lerp: 0.12 });
    lenis?.lenis.on("scroll", ScrollTrigger.update);
    const teardownOsmoReveal = initContentRevealScroll();
    const teardownOsmoParallax = initGlobalParallax();
    const teardownServices = servicesScene();
    const teardownEffect = effectScene();
    let teardownShutter = () => {};
    let teardownFooterParallax = () => {};
    let teardownApproachPath = () => {};
    let footerInitFrame = 0;
    let effectCancelled = false;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = introStoryScene();
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
      const teardownIntro = introStoryScene();
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
      teardownEffect();
      teardownShutter();
      teardownApproachPath();
      teardownSectionTheme();
      teardownUtilities();
    };
  }, []);

  return null;
}
