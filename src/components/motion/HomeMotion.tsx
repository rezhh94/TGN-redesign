"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destroyLenis, initLenis } from "@/lib/motion";
import { initWorkPageLines } from "@/components/motion/WorkPageLines";
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
ScrollTrigger.config({
  ignoreMobileResize: true,
  limitCallbacks: true,
});

// Lazy-init: scener godt under fold bygger verken triggere eller
// initial-tilstander før brukeren nærmer seg (1600px forvarsel). Uten
// IntersectionObserver init-es alt umiddelbart, som før.
function runWhenNear(
  selector: string,
  init: () => (() => void) | void,
  rootMargin = "1600px 0px",
): () => void {
  const target = document.querySelector(selector);
  if (!target || !("IntersectionObserver" in window)) {
    const teardown = init();
    return () => teardown?.();
  }
  let teardown: (() => void) | void;
  let started = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (started) return;
      started = true;
      teardown = init();
    },
    { rootMargin },
  );
  observer.observe(target);
  return () => {
    observer.disconnect();
    teardown?.();
  };
}

// Delt maskert-reveal: innhold stiger ut av overflow-masken sin én gang.
// Allerede-synlig-garde: står triggeren alt i viewport ved init beholdes
// server-tilstanden (= sluttilstanden) i stedet for å spille entré — unngår
// popp ved refresh eller dyp-lasting midt på siden.
function maskedRise(
  targets: gsap.DOMTarget,
  trigger: HTMLElement,
  vars: {
    yPercent?: number;
    duration?: number;
    stagger?: gsap.TweenVars["stagger"];
    start?: string;
    fade?: boolean;
  } = {},
) {
  const elements = gsap.utils.toArray<HTMLElement>(targets);
  if (!elements.length) return;
  const {
    yPercent = 120,
    duration = 1,
    stagger = 0.08,
    start = "top 85%",
    fade = false,
  } = vars;
  if (trigger.getBoundingClientRect().top <= window.innerHeight * 0.85) return;
  gsap.set(elements, { yPercent, ...(fade ? { autoAlpha: 0 } : {}) });
  gsap.to(elements, {
    yPercent: 0,
    ...(fade ? { autoAlpha: 1 } : {}),
    duration,
    ease: "power4.out",
    stagger,
    scrollTrigger: { trigger, start, once: true },
  });
}

// 02 / Tjenester — Tigon-adaptasjon av Codrops DualWaveAnimation.
// Original mekanikk: Valentin Descombes/Codrops, MIT, commit 90dfeb2.
// Én sticky midtakse, fem lokale kubeflater og komplette lenker i to
// motgående sinusstrømmer. Ingen ScrollSmoother eller fremmed asset-livssyklus.
function legacyServicesScene() {
  const section = document.querySelector<HTMLElement>("[data-build-section]");
  const wave = section?.querySelector<HTMLElement>("[data-service-wave]");
  const anchor = section?.querySelector<HTMLElement>("[data-service-anchor]");
  const anchorCopy = anchor?.querySelector<HTMLElement>(".what-build__anchor-copy");
  if (!section || !wave || !anchorCopy) return () => {};

  const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]", wave);
  const leftLanes = gsap.utils.toArray<HTMLElement>(
    '[data-service-wave-lane="left"]',
    wave,
  );
  const rightLanes = gsap.utils.toArray<HTMLElement>(
    '[data-service-wave-lane="right"]',
    wave,
  );
  const leftPanels = gsap.utils.toArray<HTMLElement>(
    '[data-service-wave-panel="left"]',
    wave,
  );
  const rightPanels = gsap.utils.toArray<HTMLElement>(
    '[data-service-wave-panel="right"]',
    wave,
  );
  const cubeStage = anchorCopy.querySelector<HTMLElement>(".what-build__cube-stage");
  const cube = anchorCopy?.querySelector<HTMLElement>("[data-service-cube]");
  const cubeFaces = gsap.utils.toArray<HTMLElement>(
    "[data-service-cube-face]",
    anchorCopy,
  );
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (
    reduced
    || rows.length !== 5
    || leftLanes.length !== rows.length
    || rightLanes.length !== rows.length
    || leftPanels.length !== rows.length
    || rightPanels.length !== rows.length
    || !cubeStage
    || !cube
    || cubeFaces.length !== rows.length
  ) return () => {};

  const waveNumber = Number.parseFloat(wave.dataset.waveNumber ?? "1.42");
  const waveSpeed = Number.parseFloat(wave.dataset.waveSpeed ?? "0.92");
  const cubeStops = [
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: -90 },
    { rotateX: 0, rotateY: -180 },
    { rotateX: 0, rotateY: -270 },
    // Topplaten krever den kombinerte X/Y-sluttstillingen for å lande
    // kameravendt og rettvendt; en ren X-vending viser feil sideflate.
    { rotateX: -90, rotateY: -360 },
  ] as const;
  const mm = gsap.matchMedia();

  const ctx = gsap.context(() => {
    const createWave = (compact: boolean, mobile = false) => {
      let leftRange = 0;
      let rightRange = 0;
      let rowCenters: number[] = [];
      let minimumCubeScale = 0.96;
      let activeIndex = -1;
      let resizeFrame = 0;
      let lastProgress = -1;
      let lastPosition = -1;
      let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

      // Lenis er første dempingslag (lerp 0.105); quickTo her er andre og
      // holdes derfor kort, ellers ligger panelene merkbart bak fingeren.
      const responseDuration = mobile ? 0.2 : compact ? 0.26 : 0.3;
      const smooth = (value: number) => value * value * (3 - 2 * value);
      const smoother = (value: number) => (
        value * value * value * (value * (value * 6 - 15) + 10)
      );
      const leftSetters = leftPanels.map((panel) =>
        gsap.quickTo(panel, "x", { duration: responseDuration, ease: "power4.out" })
      );
      const rightSetters = rightPanels.map((panel) =>
        gsap.quickTo(panel, "x", { duration: responseDuration, ease: "power4.out" })
      );
      // Retningsregelen: scenen ankommer med out-familie og forlater med
      // in-familie. gsap.to med overwrite (ikke quickTo-par: å kille en
      // quickTo-tween gjør setteren permanent død). Kalles kun ved endring,
      // så tween-churn skjer bare i kantsonene.
      let anchorTarget = 0;
      const setAnchorVisibility = (value: number) => {
        if (Math.abs(value - anchorTarget) < 0.001) return;
        const rising = value > anchorTarget;
        anchorTarget = value;
        gsap.to(anchorCopy, {
          opacity: value,
          duration: rising ? (compact ? 0.28 : 0.42) : compact ? 0.2 : 0.3,
          ease: rising ? "power2.out" : "power2.in",
          overwrite: "auto",
        });
      };

      const calculateRange = (lanes: HTMLElement[], panels: HTMLElement[]) => {
        if (mobile) return 0;
        const laneWidth = Math.min(...lanes.map((lane) => lane.clientWidth));
        const panelWidth = Math.max(
          ...panels.map((panel) => panel.getBoundingClientRect().width),
        );
        const measured = Math.max(0, laneWidth - panelWidth);
        const minimum = compact ? 14 : 18;
        const maximum = compact ? 38 : 96;
        return gsap.utils.clamp(minimum, maximum, Math.max(measured, minimum));
      };

      const calculateGeometry = () => {
        leftRange = calculateRange(leftLanes, leftPanels);
        rightRange = calculateRange(rightLanes, rightPanels);
        rowCenters = rows.map((row) => {
          const rect = row.getBoundingClientRect();
          return window.scrollY + rect.top + rect.height / 2;
        });
        minimumCubeScale = compact ? 0.94 : 0.96;
        // Ny geometri → åpne delta-gaten så neste frame skriver friskt.
        lastProgress = -1;
        lastPosition = -1;
      };

      const calculateWavePosition = (
        index: number,
        progress: number,
        range: number,
      ) => {
        const phase =
          (compact ? 1.12 : waveNumber) * index
          + (compact ? 0.72 : waveSpeed) * progress * Math.PI * 2
          - Math.PI / 2;
        return ((Math.sin(phase) + 1) / 2) * range;
      };

      const setInitialPositions = (
        panels: HTMLElement[],
        range: number,
        multiplier: 1 | -1,
      ) => {
        panels.forEach((panel, index) => {
          const initialX = calculateWavePosition(index, 0, range) * multiplier;
          gsap.set(panel, { x: initialX });
        });
      };

      const setActiveRow = (position: number) => {
        const closestIndex = gsap.utils.clamp(
          0,
          rows.length - 1,
          Math.round(position),
        );
        const fromIndex = Math.min(Math.floor(position), rows.length - 1);
        const toIndex = Math.min(fromIndex + 1, rows.length - 1);
        const localProgress = position - fromIndex;
        let focusOpacity = 1;

        if (mobile && fromIndex !== toIndex) {
          if (localProgress < 0.5) {
            const exitProgress = gsap.utils.clamp(
              0,
              1,
              (localProgress - 0.18) / 0.12,
            );
            focusOpacity = 1 - smooth(exitProgress);
          } else {
            const enterProgress = gsap.utils.clamp(
              0,
              1,
              (localProgress - 0.5) / 0.16,
            );
            focusOpacity = smooth(enterProgress);
          }
        }

        rows.forEach((row, index) => {
          row.style.setProperty(
            "--service-row-focus-opacity",
            index === closestIndex ? focusOpacity.toFixed(3) : "0",
          );
        });

        if (closestIndex === activeIndex) return;
        rows.forEach((row, index) => {
          if (index === closestIndex) row.setAttribute("data-service-active", "");
          else row.removeAttribute("data-service-active");
        });
        cubeFaces.forEach((face, index) => {
          if (index === closestIndex) face.setAttribute("data-service-cube-face-active", "");
          else face.removeAttribute("data-service-cube-face-active");
        });
        activeIndex = closestIndex;
      };

      const getServicePosition = () => {
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let position = 0;

        if (viewportCenter >= rowCenters[rowCenters.length - 1]) {
          position = rowCenters.length - 1;
        } else if (viewportCenter > rowCenters[0]) {
          for (let index = 0; index < rowCenters.length - 1; index += 1) {
            const start = rowCenters[index];
            const end = rowCenters[index + 1];
            if (viewportCenter <= end) {
              position = index + gsap.utils.clamp(
                0,
                1,
                (viewportCenter - start) / Math.max(1, end - start),
              );
              break;
            }
          }
        }

        return position;
      };

      const updateCube = (position: number) => {
        const fromIndex = Math.min(Math.floor(position), cubeStops.length - 1);
        const toIndex = Math.min(fromIndex + 1, cubeStops.length - 1);
        const localProgress = position - fromIndex;
        // Bruk nok scrollavstand til at sideflatene faktisk kan leses under
        // hver 90°-turn, uten å miste de rolige frontvendte stoppene.
        const turnWindow = mobile ? 0.72 : compact ? 0.68 : 0.64;
        const dwell = (1 - turnWindow) / 2;
        const turnProgress = gsap.utils.clamp(
          0,
          1,
          (localProgress - dwell) / turnWindow,
        );
        const easedProgress = smoother(turnProgress);
        const from = cubeStops[fromIndex];
        const to = cubeStops[toIndex];
        gsap.set(cube, {
          rotateX: gsap.utils.interpolate(from.rotateX, to.rotateX, easedProgress),
          rotateY: gsap.utils.interpolate(from.rotateY, to.rotateY, easedProgress),
          rotateZ: 0,
          scale: 1,
        });
      };

      const updateCubeEntrance = () => {
        const firstCenter = rowCenters[0] - window.scrollY;
        const startLine = window.innerHeight * (mobile ? 1.08 : compact ? 1.12 : 1.14);
        const endLine = window.innerHeight * 0.5;
        const progress = gsap.utils.clamp(
          0,
          1,
          (startLine - firstCenter) / Math.max(1, startLine - endLine),
        );
        const entranceVisibility = smoother(progress);

        gsap.set(cubeStage, {
          autoAlpha: entranceVisibility,
          scale: gsap.utils.interpolate(minimumCubeScale, 1, smoother(progress)),
        });

        return progress;
      };

      const updateColumn = (
        setters: Array<(value: number) => gsap.core.Tween>,
        range: number,
        progress: number,
        multiplier: 1 | -1,
      ) => {
        setters.forEach((setter, index) => {
          setter(calculateWavePosition(index, progress, range) * multiplier);
        });
      };

      const handleScroll = (self: ReturnType<typeof ScrollTrigger.create>) => {
        const position = getServicePosition();
        // Delta-gate (sove-disiplin): når scroll står stille i dwell-sonene
        // hoppes hele skrivepipelinen over — null gsap.set/quickTo-trafikk.
        if (
          lastProgress >= 0
          && Math.abs(self.progress - lastProgress) < 0.0004
          && Math.abs(position - lastPosition) < 0.0005
        ) return;
        lastProgress = self.progress;
        lastPosition = position;

        updateColumn(leftSetters, leftRange, self.progress, 1);
        updateColumn(rightSetters, rightRange, self.progress, -1);
        updateCubeEntrance();
        updateCube(position);
        setActiveRow(position);

        const edge = 0.055;
        const visibility = gsap.utils.clamp(
          0,
          1,
          Math.min(self.progress / edge, (1 - self.progress) / edge),
        );
        setAnchorVisibility(visibility);
      };

      const recalculate = () => {
        resizeFrame = 0;
        calculateGeometry();
        if (scrollTrigger) handleScroll(scrollTrigger);
      };

      const requestRecalculate = () => {
        if (!resizeFrame) resizeFrame = window.requestAnimationFrame(recalculate);
      };

      calculateGeometry();
      setInitialPositions(leftPanels, leftRange, 1);
      setInitialPositions(rightPanels, rightRange, -1);
      gsap.set(anchorCopy, { opacity: 0, visibility: "visible" });
      // transformOrigin er konstant — settes én gang her, ikke per frame.
      gsap.set(cubeStage, {
        autoAlpha: 0,
        scale: minimumCubeScale,
        transformOrigin: "50% 50%",
      });
      gsap.set(cube, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transformOrigin: "50% 50%",
      });
      wave.setAttribute("data-service-wave-ready", "");

      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        onRefreshInit: calculateGeometry,
        onRefresh: (self) => handleScroll(self),
        onUpdate: (self) => handleScroll(self),
      });
      handleScroll(scrollTrigger);

      window.addEventListener("resize", requestRecalculate, { passive: true });

      return () => {
        window.cancelAnimationFrame(resizeFrame);
        window.removeEventListener("resize", requestRecalculate);
        scrollTrigger?.kill();
        gsap.killTweensOf([...leftPanels, ...rightPanels, anchorCopy, cubeStage, cube]);
        gsap.set([...leftPanels, ...rightPanels], { clearProps: "transform" });
        gsap.set(anchorCopy, { clearProps: "opacity,visibility" });
        gsap.set(cubeStage, { clearProps: "opacity,visibility,transform,transformOrigin" });
        gsap.set(cube, { clearProps: "transform,transformOrigin" });
        rows.forEach((row) => {
          row.removeAttribute("data-service-active");
          row.style.removeProperty("--service-row-focus-opacity");
        });
        cubeFaces.forEach((face, index) => {
          if (index === 0) face.setAttribute("data-service-cube-face-active", "");
          else face.removeAttribute("data-service-cube-face-active");
        });
        wave.removeAttribute("data-service-wave-ready");
      };
    };

    mm.add(
      "(min-width: 901px) and (hover: hover) and (pointer: fine)",
      () => createWave(false),
    );
    mm.add(
      "(min-width: 801px) and (max-width: 900px) and (hover: hover) and (pointer: fine)",
      () => createWave(true),
    );
  }, section);

  return () => {
    mm.revert();
    ctx.revert();
  };
}

// Intro → 02 / Tjenester — source-port of Trionn's verified marquee motor and
// responsive Key Facts card scene. The marquee keeps the source's measured
// clone count, .8 px ticker step, wrap logic, 64 px IO wake margin and .5 stop
// lerp. Below 768px the source's pinned horizontal deck is preserved.
function servicePreludeScene() {
  const section = document.querySelector<HTMLElement>("[data-service-prelude]");
  const facts = section?.querySelector<HTMLElement>("[data-service-prelude-facts]");
  const cardList = section?.querySelector<HTMLElement>("[data-service-prelude-cards]");
  const cards = gsap.utils.toArray<HTMLElement>("[data-service-prelude-card]", section);
  const marquee = section?.querySelector<HTMLElement>("[data-source-marquee]");
  const track = marquee?.querySelector<HTMLElement>("[data-source-marquee-track]");
  const originalGroup = track?.querySelector<HTMLElement>("[data-source-marquee-group]");

  if (
    !section
    || !facts
    || !cardList
    || cards.length !== 3
    || !marquee
    || !track
    || !originalGroup
  ) return () => {};

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const speed = Number.parseFloat(marquee.dataset.sourceMarqueeSpeed ?? "") || 0.8;
  const gap = Number.parseFloat(marquee.dataset.sourceMarqueeGap ?? "") || 0;
  const stopSpeed = 0.5;
  const clones: HTMLElement[] = [];
  let cycleWidth = 0;
  let position = 0;
  let currentSpeed = 1;
  let paused = false;
  let inView = false;
  let resizeFrame = 0;

  const removeClones = () => {
    clones.splice(0).forEach((clone) => clone.remove());
  };

  const buildTrack = () => {
    removeClones();
    originalGroup.style.marginRight = `${gap}px`;
    cycleWidth = originalGroup.offsetWidth + gap;
    position = 0;
    gsap.set(track, { x: 0 });
    if (cycleWidth <= 0) return;

    const cloneCount = Math.ceil(marquee.offsetWidth / cycleWidth) + 2;
    for (let index = 0; index < cloneCount; index += 1) {
      const clone = originalGroup.cloneNode(true) as HTMLElement;
      clone.removeAttribute("data-source-marquee-group");
      clone.style.marginRight = `${gap}px`;
      track.appendChild(clone);
      clones.push(clone);
    }
  };

  const wrapPosition = () => {
    if (cycleWidth <= 0) return;
    if (position <= -cycleWidth) position += cycleWidth;
    else if (position >= 0) position -= cycleWidth;
  };

  const renderMarquee = () => {
    if (!inView || cycleWidth <= 0) return;
    const targetSpeed = paused ? 0 : 1;
    currentSpeed += (targetSpeed - currentSpeed) * stopSpeed;
    if (Math.abs(currentSpeed) <= 0.001) return;
    position += speed * -1 * currentSpeed;
    wrapPosition();
    gsap.set(track, { x: position });
  };

  buildTrack();
  gsap.ticker.add(renderMarquee);

  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
    },
    { root: null, threshold: 0, rootMargin: "64px 0px" },
  );
  observer.observe(marquee);

  const pauseTrigger = ScrollTrigger.create({
    id: "service-prelude-marquee-pause",
    trigger: section,
    start: "bottom bottom",
    end: "bottom top",
    onUpdate: (self) => {
      paused = self.progress >= 0.5;
    },
  });

  const resizeObserver = new ResizeObserver(() => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(buildTrack);
  });
  resizeObserver.observe(marquee);
  resizeObserver.observe(originalGroup);

  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.5) return;

    gsap.set(cards, {
      autoAlpha: 0,
      rotateX: -92,
      transformOrigin: "center top",
      force3D: true,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: "service-prelude-cards-desktop",
        trigger: section,
        start: "top center",
        end: "top top",
        scrub: 2,
      },
    });

    timeline.to(cards, {
      rotateX: 0,
      autoAlpha: 1,
      stagger: { each: 0.6, from: "start" },
      ease: "none",
      force3D: true,
      duration: 2.65,
      overwrite: true,
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set(cards, { clearProps: "opacity,visibility,transform,transformOrigin" });
    };
  });

  mm.add("(max-width: 767px)", () => {
    section.setAttribute("data-service-prelude-mobile-pin", "");
    gsap.set(cardList, { x: 0 });
    gsap.set(cards, {
      rotateX: 0,
      autoAlpha: 1,
      force3D: true,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: "service-prelude-cards-mobile-pin",
        trigger: facts,
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: "bottom top",
        anticipatePin: 1,
        refreshPriority: 2,
        scrub: 2,
      },
    });

    timeline.to(cards[0], {
      autoAlpha: 1,
      ease: "power2.out",
      force3D: true,
      duration: 0.15,
    }, 0);

    timeline.to(cardList, {
      x: () => {
        const finalCard = cards[cards.length - 1];
        if (!finalCard) return 0;
        const listRect = cardList.getBoundingClientRect();
        const cardRect = finalCard.getBoundingClientRect();
        const finalCenter = cardRect.left - listRect.left + cardRect.width / 2;
        const sourceOffset = 0.04 * window.innerWidth;
        return -(finalCenter - window.innerWidth / 2 + sourceOffset);
      },
      ease: "none",
    }, 0);

    cards.forEach((card, index) => {
      const position = cards.length > 1 ? index / (cards.length - 1) : 0;
      if (index > 0) {
        timeline.to(card, {
          autoAlpha: 1,
          ease: "power2.out",
          force3D: true,
          duration: 0.15,
        }, Math.max(0, position - 0.075));
      }
    });

    // The local pin spacer extends the prelude before its later shutter trigger.
    // Refresh once after GSAP has mounted the spacer so that the shutter keeps
    // its own bottom-bound handoff instead of starting during the card deck.
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      section.removeAttribute("data-service-prelude-mobile-pin");
      gsap.set(cardList, { clearProps: "transform" });
      gsap.set(cards, { clearProps: "opacity,visibility,transform,transformOrigin" });
    };
  });

  return () => {
    mm.revert();
    pauseTrigger.kill();
    observer.disconnect();
    resizeObserver.disconnect();
    window.cancelAnimationFrame(resizeFrame);
    gsap.ticker.remove(renderMarquee);
    gsap.killTweensOf(track);
    removeClones();
    originalGroup.style.removeProperty("margin-right");
    gsap.set(track, { clearProps: "transform" });
  };
}

// 02 / Tjenester — source-port of Trionn's verified Selected Work motor.
// The deployed Trionn phone branch stacks vertically. Tigon deliberately keeps
// the verified x-axis motor, thresholds and 550px orbit on touch too, while
// retaining Trionn's own mobile card width (viewport minus 3rem).
function servicesScene() {
  const section = document.querySelector<HTMLElement>("[data-build-section]");
  const viewport = section?.querySelector<HTMLElement>("[data-service-viewport]");
  const layer = section?.querySelector<HTMLElement>("[data-service-layer]");
  const track = section?.querySelector<HTMLElement>("[data-service-track]");
  const underlay = section?.querySelector<HTMLElement>("[data-service-underlay]");
  const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", section);
  const endLine = section?.querySelector<HTMLElement>("[data-service-end-line]");
  const endPlus = section?.querySelector<SVGElement>("[data-service-end-plus]");

  if (
    !section
    || !viewport
    || !layer
    || !track
    || !underlay
    || cards.length !== 6
    || !endLine
    || !endPlus
  ) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      section.setAttribute("data-service-ready", "");
      const revealedCards = new Set<number>();
      const drawnLines = new Set<number>();
      const revealTimelines = cards.map((card) => {
        const title = card.querySelector<HTMLElement>("[data-service-card-title]");
        const copy = card.querySelector<HTMLElement>("[data-service-card-copy]");
        const action = card.querySelector<HTMLElement>("[data-service-card-action]");
        const targets = [title, copy, action].filter(
          (target): target is HTMLElement => Boolean(target),
        );
        gsap.set(targets, { autoAlpha: 0 });

        const timeline = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });
        if (title) timeline.to(title, { autoAlpha: 1, ease: "sine", duration: 0.7 }, 0);
        if (copy) timeline.to(copy, { autoAlpha: 1, ease: "sine", duration: 0.6 }, "<");
        if (action) timeline.to(action, { autoAlpha: 1, duration: 0.4 }, "<50%");
        return timeline;
      });

      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>("[data-service-card-inner]");
        const lines = gsap.utils.toArray<HTMLElement>("[data-service-card-line]", card);
        if (inner) gsap.set(inner, { y: 550, opacity: 1, force3D: true });
        gsap.set(lines, { scaleY: 0, transformOrigin: "top", force3D: true });
      });
      gsap.set(track, { x: 0, y: 0, force3D: true });
      gsap.set(layer, { x: 0, y: 0, force3D: true });
      gsap.set(endLine, { scaleY: 0, transformOrigin: "center center" });
      gsap.set(endPlus, {
        rotation: 0,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
      });

      let horizontalTravel = 0;
      let horizontalScroll = 0;
      let handoffScroll = 0;
      let totalScroll = 0;
      const measure = () => {
        horizontalTravel = Math.max(0, track.scrollWidth - viewport.clientWidth);
        // Trionn moves 1.5 viewports over 2 viewport-heights (0.75 px/px).
        horizontalScroll = horizontalTravel / 0.75;
        handoffScroll = 1.5 * window.innerHeight;
        totalScroll = horizontalScroll + handoffScroll;
      };
      measure();

      const render = (progress: number) => {
        const consumedScroll = progress * totalScroll;
        const horizontalProgress = gsap.utils.clamp(
          0,
          1,
          horizontalScroll > 0 ? consumedScroll / horizontalScroll : 1,
        );
        const handoffProgress = gsap.utils.clamp(
          0,
          1,
          handoffScroll > 0 ? (consumedScroll - horizontalScroll) / handoffScroll : 0,
        );
        const distance = horizontalTravel * horizontalProgress;

        // Trionn's first-party Selected Work motor deliberately gives the
        // desktop track a short GSAP tail instead of writing every scroll
        // position directly. That tail masks the otherwise binary moment in
        // which ScrollTrigger attaches and releases the pinned scene. Touch
        // keeps the source's duration: 0 path so finger tracking stays exact.
        if (window.innerWidth < 768) {
          gsap.to(track, {
            x: -distance,
            y: 0,
            duration: 0,
            ease: "none",
            overwrite: true,
            force3D: true,
          });
          gsap.to(layer, {
            x: -window.innerWidth * handoffProgress,
            y: 0,
            duration: 0,
            ease: "none",
            overwrite: true,
            force3D: true,
          });
        } else {
          gsap.to(track, { x: -distance, y: 0 });
          gsap.to(layer, {
            x: -window.innerWidth * handoffProgress,
            y: 0,
          });
        }

        cards.forEach((card, index) => {
          const inner = card.querySelector<HTMLElement>("[data-service-card-inner]");
          const normalizedPosition = (
            card.offsetLeft + card.offsetWidth / 2 - distance
          ) / window.innerWidth;
          const y = normalizedPosition > 1.2
            ? 550
            : normalizedPosition > 0.5
              ? 550 * (1 - (1 - Math.pow(1 - (1.2 - normalizedPosition) / 0.7, 3)))
              : 0;

          if (inner) gsap.set(inner, { y, force3D: true });
          if (normalizedPosition < 1.05 && !revealedCards.has(index)) {
            revealedCards.add(index);
            revealTimelines[index]?.play();
          }
          if (normalizedPosition < 1 && !drawnLines.has(index)) {
            drawnLines.add(index);
            const lines = gsap.utils.toArray<HTMLElement>(
              "[data-service-card-line]",
              card,
            );
            gsap.to(lines, {
              scaleY: 1,
              duration: 1.2,
              ease: "power2.out",
              delay: 0.1 * index,
            });
          }
        });

        gsap.set(endLine, {
          scaleY: handoffProgress,
          transformOrigin: "center center",
        });
        gsap.set(endPlus, {
          rotation: 360 * handoffProgress,
          autoAlpha: handoffProgress > 0.01 && handoffProgress < 1 ? 1 : 0,
        });

        section.dataset.themeSection = "light";
        section.dataset.bgSection = "light";
      };

      const trigger = ScrollTrigger.create({
        id: "services-selected-work-track",
        trigger: section,
        start: "top top",
        end: () => {
          measure();
          return `+=${Math.round(totalScroll)}`;
        },
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          measure();
          render(self.progress);
        },
        onUpdate: (self) => render(self.progress),
      });
      render(trigger.progress);

      return () => {
        trigger.kill();
        revealTimelines.forEach((timeline) => timeline.kill());
        gsap.killTweensOf([track, layer]);
        gsap.killTweensOf(cards.flatMap((card) => (
          gsap.utils.toArray<HTMLElement>("[data-service-card-line]", card)
        )));
        gsap.set([track, layer], { clearProps: "transform" });
        cards.forEach((card) => {
          const inner = card.querySelector<HTMLElement>("[data-service-card-inner]");
          const revealTargets = gsap.utils.toArray<HTMLElement>(
            "[data-service-card-title], [data-service-card-copy], [data-service-card-action]",
            card,
          );
          if (inner) gsap.set(inner, { clearProps: "transform,opacity" });
          gsap.set(revealTargets, { clearProps: "opacity,visibility" });
        });
        gsap.set([endLine, endPlus], { clearProps: "transform,opacity,visibility" });
        section.dataset.themeSection = "light";
        section.dataset.bgSection = "light";
        section.removeAttribute("data-service-ready");
      };
    });
  }, section);

  return () => {
    mm.revert();
    ctx.revert();
    section.dataset.themeSection = "light";
    section.dataset.bgSection = "light";
    section.removeAttribute("data-service-ready");
  };
}
// 03 / Effekt — source-led adaptation of Trionn /about's Paperfold section.
// The verified values are preserved here: -90deg cards, 2500px CSS perspective,
// responsive 65/70/80% starts, 180/200/150px per-card scroll distances and the
// 0.5-unit card offsets with .6/.36/.42 fold, content and shadow durations.
function effectCardsScene() {
  const section = document.querySelector<HTMLElement>("[data-effect-section]");
  const valueBlock = section?.querySelector<HTMLElement>("[data-effect-value-block]");
  const heading = section?.querySelector<HTMLElement>("[data-effect-heading-pin]");
  const title = section?.querySelector<HTMLElement>("[data-effect-title]");
  const titleChars = gsap.utils.toArray<HTMLElement>(
    ".what-improve__title-char",
    title,
  );
  const summary = section?.querySelector<HTMLElement>("[data-effect-summary]");
  const stack = section?.querySelector<HTMLElement>("[data-effect-stack]");
  const cards = gsap.utils.toArray<HTMLElement>("[data-effect-fold-card]", section);
  const cardInners = gsap.utils.toArray<HTMLElement>("[data-effect-fold-inner]", section);
  const shadows = gsap.utils.toArray<HTMLElement>("[data-effect-fold-shadow]", section);
  const tagline = section?.querySelector<HTMLElement>("[data-effect-tagline]");

  if (
    !section
    || !valueBlock
    || !heading
    || !title
    || !summary
    || !stack
    || !tagline
    || titleChars.length === 0
    || cards.length !== 4
    || cardInners.length !== cards.length
    || shadows.length !== cards.length
  ) return () => {};

  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      section.setAttribute("data-effect-overlap-ready", "");
      section.setAttribute("data-effect-fold-ready", "");

      gsap.set(cards, {
        rotateX: -90,
        transformOrigin: "top center",
        autoAlpha: 0,
      });
      gsap.set(cardInners, { opacity: 0 });
      gsap.set(shadows, { opacity: 0 });

      const foldTimeline = gsap.timeline({
        scrollTrigger: {
          id: "effect-paperfold-stack",
          trigger: stack,
          start: () => {
            if (window.innerWidth <= 767) return "top 65%";
            if (window.innerWidth <= 1024) return "top 70%";
            return "top 80%";
          },
          end: () => {
            const perCard = window.innerWidth <= 767
              ? 180
              : window.innerWidth <= 1024
                ? 200
                : 150;
            return `+=${perCard * cards.length}`;
          },
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        const offset = 0.5 * index;
        foldTimeline
          .set(card, { autoAlpha: 1 }, offset)
          .to(card, {
            rotateX: 0,
            duration: 0.6,
            ease: "power2.out",
          }, offset)
          .fromTo(cardInners[index], {
            opacity: 0,
          }, {
            opacity: 1,
            duration: 0.36,
            ease: "power1.in",
          }, offset + 0.09)
          .fromTo(shadows[index], {
            opacity: 0.08,
          }, {
            opacity: 0,
            duration: 0.42,
            ease: "power1.out",
          }, offset + 0.18);
      });

      gsap.set([title, ...titleChars], {
        autoAlpha: 0,
        filter: "blur(12px)",
        force3D: true,
        willChange: "filter, opacity",
      });
      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          id: "effect-paperfold-title",
          trigger: title,
          start: "top 90%",
          end: "bottom 10%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
      titleTimeline
        .to(title, {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        }, 0)
        .to(titleChars, {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: { each: 0.05, from: "random" },
          ease: "power2.out",
        }, 0);

      const summaryTween = gsap.fromTo(summary, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          id: "effect-paperfold-summary",
          trigger: summary,
          start: "top 90%",
          once: true,
        },
      });

      const taglineTween = gsap.fromTo(tagline, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          id: "effect-paperfold-tagline",
          trigger: tagline,
          start: "top 90%",
          once: true,
        },
      });

      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        foldTimeline.scrollTrigger?.kill();
        foldTimeline.kill();
        titleTimeline.scrollTrigger?.kill();
        titleTimeline.kill();
        summaryTween.scrollTrigger?.kill();
        summaryTween.kill();
        taglineTween.scrollTrigger?.kill();
        taglineTween.kill();
        gsap.set(cards, { clearProps: "opacity,visibility,transform,transformOrigin" });
        gsap.set(cardInners, { clearProps: "opacity" });
        gsap.set(shadows, { clearProps: "opacity" });
        gsap.set([title, ...titleChars, summary, tagline], {
          clearProps: "opacity,visibility,transform,filter,willChange",
        });
        section.removeAttribute("data-effect-overlap-ready");
        section.removeAttribute("data-effect-fold-ready");
      };
    });

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
      () => {
        const pinTrigger = ScrollTrigger.create({
          id: "effect-paperfold-heading-pin",
          trigger: section,
          start: "top top",
          end: () => {
            const paddingBottom = Number.parseFloat(
              window.getComputedStyle(valueBlock).paddingBottom,
            );
            const headerHeight = document.querySelector<HTMLElement>(".site-header")
              ?.clientHeight ?? 100;
            return `bottom ${headerHeight + tagline.clientHeight + 2 * paddingBottom}px`;
          },
          pin: heading,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        return () => pinTrigger.kill();
      },
    );
  }, section);

  return () => {
    mm.revert();
    ctx.revert();
    section.removeAttribute("data-effect-overlap-ready");
    section.removeAttribute("data-effect-fold-ready");
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

// 01 / Tilnærming — normal-flow editorial scene. Referanseprinsippene er
// scrubbet tegnfyll, én line/plus-akse og små one-shot støtteentrer. CSS eier
// hele sluttkomposisjonen; JS eier bare progresjon og pekerrespons.
function introFillScene() {
  const section = document.querySelector<HTMLElement>("[data-intro-story]");
  if (!section) return () => {};

  const targets = gsap.utils.toArray<HTMLElement>("[data-intro-fill]", section);
  if (!targets.length) return () => {};

  const originals = targets.map((element) => element.textContent ?? "");
  const originalLabels = targets.map((element) => element.getAttribute("aria-label"));
  const splitIntoCharacters = (element: HTMLElement) => {
    const text = (element.textContent ?? "").trim().replace(/\s+/g, " ");
    element.textContent = "";
    element.setAttribute("aria-label", text);
    return Array.from(text).flatMap((character) => {
      if (character === " ") {
        element.append(" ");
        return [];
      }
      const span = document.createElement("span");
      span.className = "intro-fill__char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = character;
      element.append(span);
      return span;
    });
  };

  // Full styrke leses før ready-attributtet demper tegnene. Teksten er fortsatt
  // tilgjengelig som aria-label og står urørt uten JS / med redusert bevegelse.
  const characterSets = targets.map((element) => ({
    characters: splitIntoCharacters(element),
    color: getComputedStyle(element).color,
  }));
  section.setAttribute("data-intro-fill-ready", "");

  const label = section.querySelector<HTMLElement>(".approach-statement__label");
  const rule = section.querySelector<HTMLElement>("[data-intro-rule]");
  const ruleLine = section.querySelector<HTMLElement>("[data-intro-rule-line]");
  const ruleMarker = section.querySelector<HTMLElement>("[data-intro-rule-marker]");
  const support = section.querySelector<HTMLElement>(".approach-statement__support");
  const supportItems = gsap.utils.toArray<HTMLElement>("[data-intro-support]", section);
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let lineComplete = false;

  const moveMarker = (event: PointerEvent) => {
    if (!lineComplete || !rule || !ruleMarker) return;
    const rect = rule.getBoundingClientRect();
    const target = gsap.utils.clamp(0, rect.width, event.clientX - rect.left);
    const resting = ruleMarker.offsetLeft;
    gsap.to(ruleMarker, {
      x: target - resting,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const resetMarker = () => {
    if (!ruleMarker) return;
    gsap.to(ruleMarker, {
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const ctx = gsap.context(() => {
    characterSets.forEach(({ characters, color }, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: targets[index],
          start: "top 80%",
          end: "bottom center",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }).to(characters, {
        color,
        duration: 0.45,
        stagger: 0.03,
        ease: "none",
      });
    });

    if (label && label.getBoundingClientRect().top > window.innerHeight * 0.9) {
      gsap.from(label, {
        autoAlpha: 0,
        y: 10,
        filter: "blur(8px)",
        duration: 0.8,
        ease: "power2.out",
        clearProps: "filter",
        scrollTrigger: { trigger: label, start: "top 90%", once: true },
      });
    }

    if (rule && ruleLine && ruleMarker) {
      section.setAttribute("data-intro-rule-ready", "");
      gsap.timeline({
        scrollTrigger: {
          trigger: rule,
          start: "top bottom",
          end: "top center",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const complete = self.progress >= 0.985;
            if (lineComplete && !complete) resetMarker();
            lineComplete = complete;
          },
        },
      })
        .fromTo(ruleLine, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, 0)
        .fromTo(
          ruleMarker,
          { autoAlpha: 0, rotate: 0 },
          { autoAlpha: 1, rotate: 360, duration: 1, ease: "none" },
          0,
        );
    }

    if (
      support
      && supportItems.length
      && support.getBoundingClientRect().top > window.innerHeight * 0.9
    ) {
      gsap.from(supportItems, {
        autoAlpha: 0,
        y: 18,
        duration: 0.8,
        delay: 0.3,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: support, start: "top 90%", once: true },
      });
    }
  }, section);

  if (finePointer && rule) {
    rule.addEventListener("pointermove", moveMarker);
    rule.addEventListener("pointerleave", resetMarker);
  }

  return () => {
    if (rule) {
      rule.removeEventListener("pointermove", moveMarker);
      rule.removeEventListener("pointerleave", resetMarker);
    }
    if (ruleMarker) gsap.killTweensOf(ruleMarker);
    ctx.revert();
    section.removeAttribute("data-intro-fill-ready");
    section.removeAttribute("data-intro-rule-ready");
    targets.forEach((element, index) => {
      element.textContent = originals[index];
      if (originalLabels[index] === null) element.removeAttribute("aria-label");
      else element.setAttribute("aria-label", originalLabels[index]);
    });
  };
}
// 05 / Prosess → 06 / System — Tigon content inside Trionn's verified
// first-party HowWork motion architecture (module 24498, /about variant).
// No stripes are ported: the process stage pins without spacer while the next
// dark section is raised by one viewport. The complete HTML remains visible
// when JS, motion or a safe mobile viewport does not opt into this enhancement.
function processScene(compact: boolean) {
  const section = document.querySelector<HTMLElement>("[data-process-section]");
  const stage = document.querySelector<HTMLElement>("[data-process-stage]");
  const system = document.querySelector<HTMLElement>(".system-manifesto");
  const systemInner = system?.querySelector<HTMLElement>(".system-manifesto__inner");
  if (!section || !stage || !system || !systemInner) return () => {};

  const phases = gsap.utils.toArray<HTMLElement>("[data-process-phase]", stage);
  if (phases.length !== 3) return () => {};

  // The source's 100dvh pin is not safe when three semantic mobile rows cannot
  // fit inside the viewport. Short landscape screens keep ordinary flow.
  if (compact && window.matchMedia("(max-height: 699px)").matches) return () => {};

  const ctx = gsap.context(() => {
    stage.setAttribute("data-process-motion", compact ? "mobile" : "desktop");
    // Trionn's next /about scene supplies its own long scroll construction.
    // Tigon's System is one static viewport, so its dark canvas must carry the
    // same distance as this pin; the inner panel then arrives exactly on release.
    // Keep the long System canvas transparent above Process and let its real
    // 100svh inner panel become the moving cover. The panel enters during the
    // final viewport of the pin, so foreground ownership changes continuously
    // instead of through an onLeave z-index callback.
    gsap.set(system, {
      marginTop: "-100dvh",
      minHeight: compact ? "250svh" : "350svh",
      zIndex: 4,
      backgroundColor: "transparent",
      pointerEvents: "none",
    });
    gsap.set(systemInner, {
      y: compact ? "150svh" : "250svh",
      backgroundColor: "var(--tigon-canvas)",
      clipPath: "inset(100% 0 0)",
    });

    if (compact) {
      phases.forEach((phase) => {
        const step = phase.querySelector("[data-process-step]");
        const title = phase.querySelector("[data-process-title]");
        const content = phase.querySelector("[data-process-content]");
        gsap.set([step, title, content], { autoAlpha: 0, y: 30 });
      });

      const dividers = gsap.utils.toArray<HTMLElement>("[data-process-divider]", stage);
      gsap.set(dividers, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left",
      });

      const entrance = gsap.timeline({
        scrollTrigger: {
          id: "process-how-work-entrance-mobile",
          trigger: stage,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      });

      phases.forEach((phase, index) => {
        const step = phase.querySelector("[data-process-step]");
        const title = phase.querySelector("[data-process-title]");
        const content = phase.querySelector("[data-process-content]");
        const divider = dividers[index];
        const at = 0.3 * index;

        entrance
          .to(step, { autoAlpha: 1, y: 0, duration: 0.4 }, at)
          .to(title, { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.05)
          .to(content, { autoAlpha: 0.6, y: 0, duration: 0.4 }, at + 0.1);

        if (divider) {
          entrance
            .set(divider, { autoAlpha: 1 }, at)
            .to(divider, { scaleX: 1, duration: 0.5 }, at);
        }
      });

      gsap.timeline({
        scrollTrigger: {
          id: "process-how-work-pin-mobile",
          trigger: stage,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      })
        .to({}, { duration: 1 }, 0)
        .to(systemInner, {
          clipPath: "inset(0% 0 0)",
          duration: 0.45,
        }, 0.55);
      return;
    }

    phases.forEach((phase, index) => {
      const step = phase.querySelector("[data-process-step]");
      const title = phase.querySelector("[data-process-title]");
      const content = phase.querySelector("[data-process-content]");
      const line = phase.querySelector("[data-process-line]");
      const plus = phase.querySelector(".process-phase__plus");
      const follow = phase.querySelector(".process-phase__plus-follow");

      gsap.set([step, title, content], { autoAlpha: 0, y: 20 });
      gsap.set([plus, follow], { autoAlpha: 0 });
      gsap.set(plus, { autoAlpha: Number(index === 0) });
      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
    });

    const entrance = gsap.timeline({
      scrollTrigger: {
        id: "process-how-work-entrance-desktop",
        trigger: stage,
        start: "top 25%",
        end: "top -125%",
        scrub: true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    });

    phases.forEach((phase, index) => {
      const step = phase.querySelector("[data-process-step]");
      const title = phase.querySelector("[data-process-title]");
      const content = phase.querySelector("[data-process-content]");
      const line = phase.querySelector("[data-process-line]");
      const follow = phase.querySelector(".process-phase__plus-follow");
      const label = `phase_${index}_start`;

      entrance.addLabel(label, 0.5 * index);
      entrance.set(follow, { autoAlpha: 1 }, `${label}+=${index === 0 ? 0.01 : 0}`);
      entrance
        .fromTo(follow, { rotation: 0 }, { rotation: 720, right: -6, duration: 0.4 }, label)
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, label)
        .fromTo(step, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.2 }, label)
        .fromTo(title, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.2 }, `${label}+=0.1`)
        .fromTo(content, { autoAlpha: 0, y: 20 }, { autoAlpha: 0.6, y: 0, duration: 0.25 }, `${label}+=0.15`);

      const nextPlus = phases[index + 1]?.querySelector(".process-phase__plus");
      if (nextPlus) {
        entrance.to(nextPlus, { autoAlpha: 1, duration: 0.05 }, `${label}+=0.4`);
      }
    });

    gsap.timeline({
      scrollTrigger: {
        id: "process-how-work-pin-desktop",
        trigger: stage,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "none" },
    })
      .to({}, { duration: 1 }, 0)
      .to(systemInner, {
        clipPath: "inset(0% 0 0)",
        duration: 0.45,
      }, 0.55);
  }, stage);

  return () => {
    ctx.revert();
    stage.removeAttribute("data-process-motion");
  };
}

function footerReveals() {
  const wordmark = document.querySelector<HTMLElement>(".contact-footer__wordmark");
  if (!wordmark) return;
  maskedRise(wordmark, wordmark, {
    yPercent: 22,
    duration: 0.8,
    start: "top 96%",
    fade: true,
  });
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
    const active = sections
      .filter((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= offset && rect.bottom >= offset;
      })
      .at(-1);
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
    const isTouchInput = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isApplePlatform = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    const lenis = initLenis({
      autoRaf: false,
      disabledOnMobile: false,
      disabledOnTouch: false,
      duration: 1.05,
      easing: (progress) => 1 - Math.pow(1 - progress, 3),
      infinite: false,
      lerp: 0.105,
      orientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: isTouchInput ? 1.2 : 1.1,
      wheelMultiplier: isTouchInput ? 0.6 : isApplePlatform ? 0.6 : 0.85,
    });
    lenis?.lenis.on("scroll", ScrollTrigger.update);
    // Dev-verktøy: gir konsoll/verifisering tilgang til å styre scroll via
    // Lenis i stedet for å kjempe mot lerp-loopen. Fjernes av prod-bundling.
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis?.lenis;
    }
    const teardownOsmoReveal = initContentRevealScroll();
    const teardownOsmoParallax = initGlobalParallax();
    const teardownServicePrelude = runWhenNear(
      "[data-service-prelude]",
      servicePreludeScene,
    );
    const teardownServices = servicesScene();
    const teardownOutcomeEffect = effectCardsScene();
    let teardownShutter = () => {};
    let teardownFooterParallax = () => {};
    let teardownApproachPath = () => {};
    let footerInitFrame = 0;
    let hashCorrectionFrame = 0;
    let hashCorrectionTimer = 0;
    let effectCancelled = false;
    const initialHash = window.location.hash;
    const eagerProcessLanding = initialHash === "#prosess";

    const mm = gsap.matchMedia();
    const processMM = gsap.matchMedia();
    const teardownWorkCapability = initWorkPageLines();

    // Effekt init-es over fordi den kan pinne scenen og påvirke layout.
    // De resterende scenene under fold lazy-init-es med 1600px forvarsel.
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = runWhenNear("[data-intro-story]", introFillScene);
      const teardownFooter = runWhenNear(".contact-footer", footerReveals);
      return () => {
        teardownIntro();
        teardownFooter();
      };
    });

    // Mobile keeps Effekt in ordinary document flow, while the
    // capability wall continues with its compact one-shot reveals.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownIntro = runWhenNear("[data-intro-story]", introFillScene);
      const teardownFooter = runWhenNear(".contact-footer", footerReveals);
      return () => {
        teardownIntro();
        teardownFooter();
      };
    });

    // Prosess owns its exact 767/768 construction boundary independently of
    // the older homepage-wide mobile branch. This prevents a one-pixel mixed
    // state where desktop CSS and mobile pinning could otherwise overlap.
    const initProcessMotion = (compact: boolean) => eagerProcessLanding
      ? processScene(compact)
      : runWhenNear("[data-process-stage]", () => processScene(compact));
    processMM.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      () => initProcessMotion(false),
    );
    processMM.add(
      "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
      () => initProcessMotion(true),
    );

    const layoutReady = document.fonts?.ready ?? Promise.resolve();
    layoutReady.then(() => {
      if (effectCancelled) return;
      footerInitFrame = window.requestAnimationFrame(() => {
        if (effectCancelled) return;
        teardownShutter = initShutterScrollTransition();
        teardownFooterParallax = initFooterParallax();
        teardownApproachPath = initApproachPathJourney();
        ScrollTrigger.refresh();

        // Native anchor navigation runs before the pinned scenes have added
        // their measured spacing. Correct the initial hash once, after the
        // shared refresh, so deep links land on the real final document point.
        if (initialHash.length > 1) {
          const target = document.getElementById(
            decodeURIComponent(initialHash.slice(1)),
          );
          if (target) {
            const correctInitialHash = () => {
              const targetY = target.getBoundingClientRect().top + window.scrollY;
              if (lenis) {
                lenis.lenis.resize();
                lenis.lenis.scrollTo(targetY, { immediate: true, force: true });
              } else {
                window.scrollTo(0, targetY);
              }
              ScrollTrigger.update();
            };
            hashCorrectionFrame = window.requestAnimationFrame(() => {
              if (effectCancelled) return;
              correctInitialHash();
              // Lazy assets and pin spacers may settle one frame later than
              // document.fonts. A final local refresh keeps deep links exact
              // without changing ordinary navigation or scroll ownership.
              hashCorrectionTimer = window.setTimeout(() => {
                if (effectCancelled) return;
                ScrollTrigger.refresh();
                correctInitialHash();
              }, 240);
            });
          }
        }
      });
    });

    return () => {
      effectCancelled = true;
      window.cancelAnimationFrame(footerInitFrame);
      window.cancelAnimationFrame(hashCorrectionFrame);
      window.clearTimeout(hashCorrectionTimer);
      processMM.revert();
      mm.revert();
      teardownWorkCapability();
      lenis?.lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
      teardownFooterParallax();
      teardownOsmoParallax();
      teardownServicePrelude();
      teardownServices();
      teardownOsmoReveal();
      teardownOutcomeEffect();
      teardownShutter();
      teardownApproachPath();
      teardownSectionTheme();
      teardownUtilities();
    };
  }, []);

  return null;
}
