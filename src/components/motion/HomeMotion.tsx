"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { destroyLenis, initLenis } from "@/lib/motion";
import {
  initApproachPathJourney,
  initContentRevealScroll,
  initFooterParallax,
  initGlobalParallax,
  initShutterScrollTransition,
} from "@/lib/osmo-motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
      if (!copy) return;

      // Tekstledede register-rader (03–05) har ingen visual; de settler
      // med én stille one-shot i stedet for det motgående paret.
      if (!visual || !image) {
        gsap.from(chapter, {
          y: 22,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: chapter, start: "top 88%", once: true },
        });
        return;
      }

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

      if (!compact) {
        gsap.fromTo(image, { yPercent: -6 }, {
          yPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: chapter,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.32,
          },
        });
      }
    });
  }, section);

  return () => ctx.revert();
}

// 02 → 03 — Osmo Sticky Title Scroll adapted as an unnumbered tension bridge.
// Desktop and mobile keep one typographic stage sticky while three complete,
// server-rendered statements replace one another. Only the final beat shifts
// the surface into 03's mauve so "Effekt som kan måles" becomes the payoff.
// Reduced motion and no-JS stay in ordinary readable document flow.
function outcomeTensionBridge() {
  const section = document.querySelector<HTMLElement>("[data-outcome-tension]");
  if (!section) return () => {};

  const titles = gsap.utils.toArray<HTMLElement>("[data-outcome-tension-title]", section);
  const titleList = section.querySelector<HTMLElement>(".outcome-tension__titles");
  if (titles.length < 3 || !titleList) return () => {};

  const styles = getComputedStyle(document.documentElement);
  const mauve = styles.getPropertyValue("--mauve-warm").trim() || "#c8bcc1";
  const ink = styles.getPropertyValue("--blekk").trim() || "#10100f";

  const ctx = gsap.context(() => {
    // Place every statement on the same stage only after GSAP is running.
    // Without JS the list remains normal, readable document flow.
    gsap.set(titleList, { position: "relative" });
    gsap.set(titles, {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      autoAlpha: 0,
      yPercent: 14,
    });
    gsap.set(titles[0], { autoAlpha: 1, yPercent: 0 });
    section.setAttribute("data-tension-ready", "");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(titles[0], {
        autoAlpha: 0,
        yPercent: -14,
        duration: 0.34,
        ease: "power2.in",
      }, 0.38)
      .fromTo(titles[1], {
        autoAlpha: 0,
        yPercent: 14,
      }, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out",
      }, 0.52)
      .to(titles[1], {
        autoAlpha: 0,
        yPercent: -14,
        duration: 0.34,
        ease: "power2.in",
      }, 1.16)
      .fromTo(titles[2], {
        autoAlpha: 0,
        yPercent: 14,
      }, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out",
      }, 1.3)
      .to(section, {
        backgroundColor: mauve,
        color: ink,
        duration: 0.28,
        ease: "none",
      }, 1.25)
      .to(titles[2], { autoAlpha: 1, duration: 0.5 }, 1.7);
  }, section);

  return () => {
    section.removeAttribute("data-tension-ready");
    ctx.revert();
  };
}

// 03 / Effekt — Highlight Marker på resultatordene. En mørk flate dekker
// FUNNET/FORSTÅTT/VALGT/MÅLT og trekker seg bort i resultatrekkefølge — én
// one-shot per synlig rad, ingen scrub. Erstatter den tidligere Proof Lock-logikken som
// aldri kjørte (krevde et [data-effect-placeholder] som ikke fantes i DOM).
// Copy og UI ligger i ro; uten JS står ordene vanlig (dekket er scaleX 0).
function effectScene() {
  const section = document.querySelector<HTMLElement>("[data-effect-section]");
  if (!section) return () => {};

  const outcomes = gsap.utils.toArray<HTMLElement>("[data-effect-outcome]", section);
  const markers = gsap.utils.toArray<HTMLElement>("[data-effect-marker]", section);
  if (!markers.length || outcomes.length < 4) return () => {};

  const matchMedia = gsap.matchMedia();

  matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
    const ctx = gsap.context(() => {
      // Armer dekkene ved init. Hver rad avsløres først når den faktisk er
      // synlig, slik at 03/04 ikke spiller ferdig under viewporten.
      gsap.set(markers, { scaleX: 1, transformOrigin: "100% 50%" });

      const revealRow = (row: HTMLElement[]) => {
        const rowMarkers = row
          .map((outcome) => outcome.querySelector<HTMLElement>("[data-effect-marker]"))
          .filter((marker): marker is HTMLElement => Boolean(marker));
        if (!rowMarkers.length) return;

        gsap.to(rowMarkers, {
          scaleX: 0,
          duration: 0.5,
          stagger: 0.14,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: row[0],
            start: "top 82%",
            once: true,
          },
        });
      };

      revealRow(outcomes.slice(0, 2));
      revealRow(outcomes.slice(2, 4));
    }, section);

    return () => ctx.revert();
  });

  return () => matchMedia.revert();
}

// 03 → 04 — MWG 053-inspirert typografisk sidevending. To komplette,
// server-renderte statements deler én mauve 3D-stage. Linjene i Effect-tesen
// roterer ut rundt Y-aksen mens Work-tittelen roterer inn fra baksiden.
// Ingen MWG-kode, fonter eller assets importeres; kun bevegelsesarkitekturen.
function effectWorkJourney() {
  const journey = document.querySelector<HTMLElement>("[data-effect-work-journey]");
  const section = journey?.querySelector<HTMLElement>("[data-effect-work-bridge]");
  if (!journey || !section) return () => {};

  const titles = gsap.utils.toArray<HTMLElement>("[data-effect-work-title]", journey);
  const titleList = journey.querySelector<HTMLElement>(".effect-work-bridge__titles");
  const workCatalogue = journey.querySelector<HTMLElement>("[data-work-catalogue]");
  const bridgeMeta = journey.querySelectorAll<HTMLElement>(
    ".effect-work-bridge__index, .effect-work-bridge__next",
  );
  const paragraphs = titles
    .map((title) => title.querySelector<HTMLElement>("p"))
    .filter((paragraph): paragraph is HTMLElement => Boolean(paragraph));
  if (titles.length < 2 || paragraphs.length < 2 || !titleList) return () => {};

  const splits: SplitText[] = [];
  const ctx = gsap.context(() => {
    gsap.set(titleList, { position: "relative" });
    gsap.set(titles, {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
    });

    const lineGroups = paragraphs.map((paragraph) => {
      const split = SplitText.create(paragraph, {
        type: "lines",
        linesClass: "effect-work-bridge__line",
      });
      splits.push(split);

      split.lines.forEach((line) => {
        const inner = document.createElement("span");
        inner.className = "effect-work-bridge__line-inner";
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
      });

      return split.lines;
    });

    const currentLines = lineGroups[0];
    const nextLines = lineGroups[1];

    gsap.set(currentLines, { rotationY: 0 });
    gsap.set(nextLines, { rotationY: 90 });
    journey.setAttribute("data-effect-work-ready", "");

    const bridgeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
      },
    });

    bridgeTimeline
      .to(currentLines, {
        rotationY: -90,
        duration: 1,
        stagger: 0.075,
        ease: "back.inOut(1.2)",
      }, 0.55)
      .to(nextLines, {
        rotationY: 0,
        duration: 1,
        stagger: 0.075,
        ease: "back.inOut(1.2)",
      }, 0.55)
      .to(nextLines, { rotationY: 0, duration: 0.72 }, 1.55)
      .to(bridgeMeta, {
        autoAlpha: 0,
        duration: 0.28,
        ease: "power2.out",
      }, 1.68);

    if (workCatalogue) {
      gsap.to(titles[1], {
        autoAlpha: 0.26,
        scale: 0.84,
        transformOrigin: "50% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: workCatalogue,
          start: "top bottom",
          end: "top 48%",
          scrub: 0.35,
        },
      });
    }
  }, journey);

  return () => {
    journey.removeAttribute("data-effect-work-ready");
    ctx.revert();
    splits.forEach((split) => split.revert());
  };
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

// 01 / Tilnærming — Osmo Highlight Text on Scroll. Hver autor-linje deles i
// ord og tegn, og tegnene går fra lav til full opasitet i direkte takt med
// scroll. De dempede linjene beholder sin roligere CSS-farge, mens tesens
// resolusjon får full kontrast. Innholdet er komplett uten JavaScript.
function introStoryScene() {
  const section = document.querySelector<HTMLElement>("[data-intro-story]");
  if (!section) return () => {};

  const authoredLines = gsap.utils.toArray<HTMLElement>("[data-highlight-text]", section);
  if (authoredLines.length < 4) return () => {};

  const label = section.querySelector<HTMLElement>(".approach-intro__label");
  const support = section.querySelector<HTMLElement>(".approach-intro__support");
  const handoff = section.querySelector<HTMLElement>("[data-intro-handoff]");

  const splits: SplitText[] = [];

  authoredLines.forEach((line) => {
    const scrollStart = line.getAttribute("data-highlight-scroll-start") || "top 90%";
    const scrollEnd = line.getAttribute("data-highlight-scroll-end") || "center 40%";
    const fadedValue = parseFloat(line.getAttribute("data-highlight-fade") || "") || 0.2;
    const staggerValue = parseFloat(line.getAttribute("data-highlight-stagger") || "") || 0.1;

    splits.push(
      SplitText.create(line, {
        type: "words, chars",
        autoSplit: true,
        onSplit(self) {
          const ctx = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                scrub: true,
                trigger: line,
                start: scrollStart,
                end: scrollEnd,
              },
            });

            tl.from(self.chars, {
              autoAlpha: fadedValue,
              stagger: staggerValue,
              ease: "linear",
            });
          }, line);

          return ctx;
        },
      }),
    );
  });

  const detailTimeline = gsap.timeline({
    scrollTrigger: { trigger: section, start: "clamp(top 70%)", once: true },
    defaults: { ease: "power3.out" },
  });
  if (label) detailTimeline.from(label, { autoAlpha: 0, duration: 0.5 }, 0);
  if (support) detailTimeline.from(support, { autoAlpha: 0, y: 20, duration: 0.6 }, 0.78);
  if (handoff) detailTimeline.from(handoff, { autoAlpha: 0, y: 12, duration: 0.5 }, 1.0);

  return () => {
    detailTimeline.scrollTrigger?.kill();
    detailTimeline.kill();
    splits.forEach((split) => split.revert());
  };
}

// 04 / Arbeid — de seks faktiske capability-lenkene beveger seg i vanlig,
// deterministisk scroll over den ene tittelen som eies av 03→04→Arbeid-wrapperen.
// Ingen kopiert tittel, tilfeldig plassering, medieloop eller scroll-kapring.
function workProof(cinematic: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};

  const pairs = gsap.utils.toArray<HTMLElement>("[data-work-pair]", section);
  const handoff = section.querySelector<HTMLElement>("[data-work-handoff]");
  if (!pairs.length || !cinematic) return () => {};

  const ctx = gsap.context(() => {
    pairs.forEach((pair, pairIndex) => {
      const pairTiles = gsap.utils.toArray<HTMLElement>("[data-work-tile]", pair);
      gsap.fromTo(pairTiles, {
        xPercent: (index) => index === 0 ? -1.8 : 1.8,
        yPercent: (index) => index === 0
          ? 18 + pairIndex * 2
          : 28 - pairIndex * 2,
      }, {
        xPercent: 0,
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: pair,
          start: "top 98%",
          end: "top 18%",
          scrub: 0.38,
          invalidateOnRefresh: true,
        },
      });
    });

    if (handoff) {
      const handoffParts = handoff.querySelectorAll(
        ":scope > p, :scope > div",
      );
      gsap.from(handoffParts, {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: handoff,
          start: "top 72%",
          once: true,
        },
      });
    }
  }, section);

  return () => {
    ctx.revert();
  };
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

// 05 / Prosess — panelene settler én gang i beslutningsrekkefølge 01→02→03;
// kjempenumret ankommer sist og låser hvert panel. FROM-tweens med clearProps,
// så numeralens prosent-sentrering i CSS overlever resize. Ferdig uten JS.
function processScene(compact: boolean) {
  const section = document.querySelector<HTMLElement>("[data-process-stage]");
  if (!section) return () => {};

  const panels = gsap.utils.toArray<HTMLElement>("[data-process-surface]", section);
  if (!panels.length) return () => {};

  const ctx = gsap.context(() => {
    const settlePanel = (
      panel: HTMLElement,
      tl: gsap.core.Timeline,
      position: number,
    ) => {
      const parts = panel.querySelectorAll(
        ".process-phase__head, .process-phase__copy, .process-phase__output",
      );
      const numeral = panel.querySelector<HTMLElement>(".process-phase__numeral");

      tl.from(parts, {
        y: 20,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      }, position);

      if (numeral) {
        tl.from(numeral, {
          y: 56,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }, position + 0.28);
      }
    };

    if (compact) {
      panels.forEach((panel) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: panel, start: "top 82%", once: true },
        });
        settlePanel(panel, tl, 0);
      });
    } else {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
      panels.forEach((panel, index) => settlePanel(panel, tl, index * 0.16));
    }
  }, section);

  return () => ctx.revert();
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
      const teardownTension = outcomeTensionBridge();
      const teardownEffectWork = effectWorkJourney();
      const teardownWork = workProof(window.matchMedia("(min-width: 901px)").matches);
      const teardownProcess = processScene(false);
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownTension();
        teardownEffectWork();
        teardownWork();
        teardownProcess();
      };
    });

    // Mobile keeps the same 03→04 typographic page turn, while the capability
    // wall itself stays in ordinary document flow with small one-shot reveals.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownIntro = introStoryScene();
      const teardownTension = outcomeTensionBridge();
      const teardownEffectWork = effectWorkJourney();
      const teardownWork = workProof(false);
      const teardownProcess = processScene(true);
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownTension();
        teardownEffectWork();
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
