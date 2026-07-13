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

// 03 / Effekt — Proof Lock replaces the generic whole-outcome slide.
// The visible claim and proof surface converge into the approved static overlap;
// headers and critical content stay readable in ordinary document flow.
function effectScene() {
  const section = document.querySelector<HTMLElement>("[data-effect-section]");
  if (!section) return () => {};

  const outcomes = gsap.utils.toArray<HTMLElement>("[data-effect-outcome]", section);
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      compact: "(max-width: 900px)",
      motion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      if (!context.conditions?.motion) return;

      const compact = Boolean(context.conditions?.compact);
      const ctx = gsap.context(() => {
        outcomes.forEach((outcome, index) => {
          const title = outcome.querySelector<HTMLElement>("h3");
          const proof = outcome.querySelector<HTMLElement>("[data-effect-placeholder]");
          const copy = outcome.querySelector<HTMLElement>(".what-improve__outcome-copy");
          if (!title || !proof || !copy) return;

          const direction = index % 2 ? -1 : 1;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: outcome,
              start: compact ? "top 90%" : "top 88%",
              end: compact ? "top 66%" : "top 50%",
              scrub: compact ? 0.12 : 0.18,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .fromTo(
              title,
              { xPercent: direction * (compact ? 0.5 : 1) },
              { xPercent: 0, duration: 1 },
              0,
            )
            .fromTo(
              proof,
              {
                xPercent: direction * (compact ? 4 : 8),
                autoAlpha: compact ? 0.72 : 0.44,
              },
              { xPercent: 0, autoAlpha: 1, duration: 1 },
              0,
            )
            .fromTo(
              copy,
              { y: compact ? 6 : 10 },
              { y: 0, duration: 1 },
              0,
            );
        });
      }, section);

      return () => ctx.revert();
    },
  );

  return () => matchMedia.revert();
}
// One-time opening scene: the editorial masthead assembles once on load.
// FROM-tweens only — without JS everything is simply visible (no CLS).
function heroEntrance(full: boolean) {
  const hero = document.querySelector<HTMLElement>(".hero");
  const titleLines = gsap.utils.toArray<HTMLElement>(".hero__title-line-inner", hero);
  if (!titleLines.length) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero__head", { autoAlpha: 0, y: -8, duration: 0.45 })
    .from(titleLines, {
      yPercent: 108,
      duration: full ? 0.88 : 0.72,
      stagger: 0.08,
    }, "-=0.2")
    .from(".hero__offer", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.4")
    .from(".hero__bar", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.34");
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

// 04 / Arbeid — den asymmetriske capability-veggen er ferdig uten JS.
// Cinematic mode legger kun på små, uavhengige one-shot-forskyvninger.
// Ingen pin, orbit, scrollstyrt fremdrift eller skjult kritisk innhold.
function workProof(cinematic: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};

  const tiles = gsap.utils.toArray<HTMLElement>("[data-work-tile]", section);
  const statement = section.querySelector<HTMLElement>("[data-work-statement]");
  if (!tiles.length || !cinematic) return () => {};

  const ctx = gsap.context(() => {
    const offsets = [30, 48, 22, 36, 54, 28];

    tiles.forEach((tile, index) => {
      gsap.from(tile, {
        y: offsets[index] ?? 30,
        autoAlpha: 0,
        duration: 0.82,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tile,
          start: "top 86%",
          once: true,
        },
      });
    });

    if (statement) {
      gsap.from(statement, {
        y: 32,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statement,
          start: "top 84%",
          once: true,
        },
      });
    }
  }, section);

  return () => ctx.revert();
}

// 05 / Prosess — the three surfaces use the same scroll-coupled assembly
// behaviour as the cards in 01 / Tilnærming. The readable phase index remains
// in ordinary document flow below. No pin or scroll-switched content.
function processTransformation() {
  const stage = document.querySelector<HTMLElement>("[data-process-stage]");
  if (!stage) return () => {};

  const surfaces = gsap.utils.toArray<HTMLElement>("[data-process-surface]", stage);
  const legend = stage.querySelector<HTMLElement>(".process-assembly__legend strong");

  const ctx = gsap.context(() => {
    if (surfaces.length !== 3) return;

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
        .from(surfaces[0], { xPercent: -18, yPercent: 11, rotation: "-=5", duration: 1, ease: "none" }, 0)
        .from(surfaces[1], { yPercent: -14, scale: 0.91, duration: 1, ease: "none" }, 0)
        .from(surfaces[2], { xPercent: 18, yPercent: 11, rotation: "+=5", duration: 1, ease: "none" }, 0);
    } else {
      assemblyTimeline
        .from(surfaces[0], { xPercent: -7, duration: 1, ease: "none" }, 0)
        .from(surfaces[1], { yPercent: -5, scale: 0.985, duration: 1, ease: "none" }, 0)
        .from(surfaces[2], { xPercent: 7, duration: 1, ease: "none" }, 0);
    }

    if (legend) {
      assemblyTimeline.from(
        legend,
        { yPercent: 26, autoAlpha: 0.22, duration: 0.68, ease: "none" },
        0.18,
      );
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

// Osmo Dynamic Text Cursor, adapted only in styling and lifecycle for Tigon.
// The original data attributes and GSAP quickTo movement are preserved.
function setupDynamicTextCursor() {
  const cursor = document.querySelector<HTMLElement>("[data-cursor]");
  const cursorTextTarget = document.querySelector<HTMLElement>("[data-cursor-text-target]");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!cursor || !cursorTextTarget || !finePointer || reducedMotion) return () => {};

  let mouseX = 0;
  let mouseY = 0;
  let hasMouseMoved = false;
  let frame = 0;

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

  const updateCursor = () => {
    frame = 0;
    const hoverItem = document
      .elementFromPoint(mouseX, mouseY)
      ?.closest<HTMLElement>("[data-cursor-hover]");
    const text = hoverItem?.getAttribute("data-cursor-text");

    if (text) cursorTextTarget.textContent = text;

    const rect = cursor.getBoundingClientRect();
    const isHovering = Boolean(hoverItem);
    const isEdge = rect.right >= window.innerWidth;
    cursor.setAttribute("data-cursor", isHovering ? (isEdge ? "active-edge" : "active") : "");
  };

  const queueUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(updateCursor);
  };

  const onMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    hasMouseMoved = true;
    xTo(mouseX);
    yTo(mouseY);
    queueUpdate();
  };

  const onScroll = () => {
    if (hasMouseMoved) queueUpdate();
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("scroll", onScroll);
    cursor.setAttribute("data-cursor", "");
    gsap.killTweensOf(cursor);
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
    const teardownWorkCursor = setupDynamicTextCursor();
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
      teardownWorkCursor();
      teardownUtilities();
    };
  }, []);

  return null;
}
