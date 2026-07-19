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

      // Lenis er første dempingslag (lerp 0.095); quickTo her er andre og
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

// Intro → 02 / Tjenester — one clean-room journey owner. The bridge and
// desktop service stage share one lifecycle, while CSS keeps the complete
// content readable before hydration. Desktop uses a sticky stage without a
// JS pin; compact/touch stays in ordinary flow.
function servicesScene() {
  const journey = document.querySelector<HTMLElement>("[data-intro-services-journey]");
  const bridge = journey?.querySelector<HTMLElement>("[data-intro-services-bridge]");
  const section = journey?.querySelector<HTMLElement>("[data-build-section]");
  const prelude = section?.querySelector<HTMLElement>("[data-service-prelude]");
  const story = section?.querySelector<HTMLElement>("[data-service-story]");
  const rows = gsap.utils.toArray<HTMLElement>("[data-service-chapter]", section);
  const stageImages = gsap.utils.toArray<HTMLElement>(
    "[data-service-stage-image]",
    section,
  );
  const capabilityRules = gsap.utils.toArray<HTMLElement>(
    "[data-service-rule]",
    section,
  );
  const counter = section?.querySelector<HTMLElement>("[data-service-counter]");
  const progressBar = section?.querySelector<HTMLElement>("[data-service-progress]");

  // The restored dual-stream composition keeps the connected 01→02 bridge,
  // but delegates service progression to the original section-scoped owner.
  if (!story) {
    const waveCleanup = legacyServicesScene();
    if (!journey || !bridge || !section || !prelude) return waveCleanup;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return waveCleanup;

    const journeyContext = gsap.context(() => {
      const axis = bridge.querySelector<HTMLElement>(".intro-services-journey__axis");
      const bridgeProgress = bridge.querySelector<HTMLElement>("[data-journey-progress]");
      const bridgeMarker = bridge.querySelector<HTMLElement>("[data-journey-marker]");
      const fromLabel = bridge.querySelector<HTMLElement>("[data-journey-from]");
      const toLabel = bridge.querySelector<HTMLElement>("[data-journey-to]");

      if (axis && bridgeProgress && bridgeMarker && fromLabel && toLabel) {
        journey.setAttribute("data-journey-ready", "");
        gsap.timeline({
          scrollTrigger: {
            trigger: bridge,
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        })
          .fromTo(bridgeProgress, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
          .fromTo(
            bridgeMarker,
            { y: 0, rotate: 0 },
            {
              y: () => Math.max(0, axis.offsetHeight - bridgeMarker.offsetHeight),
              rotate: 180,
              duration: 1,
            },
            0,
          )
          .fromTo(fromLabel, { autoAlpha: 1 }, { autoAlpha: 0.34, duration: 0.46 }, 0)
          .fromTo(toLabel, { autoAlpha: 0.34 }, { autoAlpha: 1, duration: 0.5 }, 0.5);
      }

      const preludeLines = gsap.utils.toArray<HTMLElement>(
        "[data-service-prelude-line]",
        prelude,
      );
      const preludeCopy = gsap.utils.toArray<HTMLElement>(
        "[data-service-prelude-copy]",
        prelude,
      );
      maskedRise(preludeLines, prelude, {
        yPercent: 108,
        duration: 0.9,
        stagger: 0.08,
        start: "top 80%",
      });
      if (prelude.getBoundingClientRect().top > window.innerHeight * 0.86) {
        gsap.from(preludeCopy, {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: prelude, start: "top 74%", once: true },
        });
      }
    }, journey);

    return () => {
      journeyContext.revert();
      journey.removeAttribute("data-journey-ready");
      waveCleanup();
    };
  }

  if (
    !journey
    || !bridge
    || !section
    || !prelude
    || !story
    || rows.length !== 5
    || stageImages.length !== rows.length
  ) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
    const axis = bridge.querySelector<HTMLElement>(".intro-services-journey__axis");
    const bridgeProgress = bridge.querySelector<HTMLElement>("[data-journey-progress]");
    const bridgeMarker = bridge.querySelector<HTMLElement>("[data-journey-marker]");
    const fromLabel = bridge.querySelector<HTMLElement>("[data-journey-from]");
    const toLabel = bridge.querySelector<HTMLElement>("[data-journey-to]");

    if (axis && bridgeProgress && bridgeMarker && fromLabel && toLabel) {
      journey.setAttribute("data-journey-ready", "");
      gsap.timeline({
        scrollTrigger: {
          trigger: bridge,
          start: "top 85%",
          end: "bottom 35%",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      })
        .fromTo(bridgeProgress, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
        .fromTo(
          bridgeMarker,
          { y: 0, rotate: 0 },
          {
            y: () => Math.max(0, axis.offsetHeight - bridgeMarker.offsetHeight),
            rotate: 180,
            duration: 1,
          },
          0,
        )
        .fromTo(fromLabel, { autoAlpha: 1 }, { autoAlpha: 0.34, duration: 0.46 }, 0)
        .fromTo(toLabel, { autoAlpha: 0.34 }, { autoAlpha: 1, duration: 0.5 }, 0.5);
    }

    const preludeLines = gsap.utils.toArray<HTMLElement>(
      "[data-service-prelude-line]",
      prelude,
    );
    const preludeCopy = gsap.utils.toArray<HTMLElement>(
      "[data-service-prelude-copy]",
      prelude,
    );
    maskedRise(preludeLines, prelude, {
      yPercent: 108,
      duration: 1.05,
      stagger: 0.1,
      start: "top 78%",
    });
    if (prelude.getBoundingClientRect().top > window.innerHeight * 0.86) {
      gsap.from(preludeCopy, {
        autoAlpha: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: prelude, start: "top 72%", once: true },
      });
    }

    mm.add("(min-width: 901px) and (hover: hover) and (pointer: fine)", () => {
      let activeIndex = -1;
      let rowCenters: number[] = [];
      let resizeFrame = 0;
      const focusCleanups: Array<() => void> = [];
      const setProgress = progressBar
        ? gsap.quickSetter(progressBar, "scaleX")
        : null;

      const setActive = (nextIndex: number, immediate = false) => {
        const index = gsap.utils.clamp(0, rows.length - 1, nextIndex);
        if (index === activeIndex && !immediate) return;
        const previousIndex = activeIndex;
        const direction = previousIndex < 0 || index >= previousIndex ? 1 : -1;
        activeIndex = index;

        rows.forEach((row, rowIndex) => {
          if (rowIndex === index) row.setAttribute("data-service-active", "");
          else row.removeAttribute("data-service-active");
        });

        stageImages.forEach((image, imageIndex) => {
          const isActive = imageIndex === index;
          if (isActive) image.setAttribute("data-service-stage-image-active", "");
          else image.removeAttribute("data-service-stage-image-active");
          const vars = isActive
            ? { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }
            : { autoAlpha: 0, scale: 1.025, clipPath: "inset(3% 0% 3% 0%)" };
          if (immediate) gsap.set(image, vars);
          else gsap.to(image, {
            ...vars,
            duration: isActive ? 0.62 : 0.34,
            ease: isActive ? "power3.out" : "power2.in",
            overwrite: "auto",
          });
        });

        if (counter) {
          counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(rows.length).padStart(2, "0")}`;
        }

        const activeRow = rows[index];
        const content = activeRow.querySelector<HTMLElement>(".service-chapter__content");
        const rules = gsap.utils.toArray<HTMLElement>("[data-service-rule]", activeRow);
        if (content) {
          if (immediate) {
            gsap.set(content, { autoAlpha: 1, y: 0 });
            if (rules.length) {
              gsap.set(rules, { scaleX: 1, transformOrigin: "left center" });
            }
          } else {
            gsap.fromTo(
              content,
              { autoAlpha: 0, y: 22 * direction },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.58,
                ease: "power3.out",
                overwrite: "auto",
              },
            );
            if (rules.length) {
              gsap.fromTo(
                rules,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 0.46,
                  stagger: 0.08,
                  ease: "power2.out",
                  overwrite: "auto",
                },
              );
            }
          }
        }
      };

      const measure = () => {
        rowCenters = rows.map((row) => {
          const rect = row.getBoundingClientRect();
          return window.scrollY + rect.top + rect.height / 2;
        });
      };

      const update = (self: ReturnType<typeof ScrollTrigger.create>, immediate = false) => {
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;
        rowCenters.forEach((center, index) => {
          const distance = Math.abs(center - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        setActive(closestIndex, immediate);
        setProgress?.(self.progress);
      };

      measure();
      section.setAttribute("data-service-ready", "");
      if (progressBar) {
        gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });
      }
      gsap.set(stageImages, {
        autoAlpha: 0,
        scale: 1.025,
        clipPath: "inset(3% 0% 3% 0%)",
      });
      if (capabilityRules.length) {
        gsap.set(capabilityRules, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      const trigger = ScrollTrigger.create({
        trigger: story,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        onRefresh: (self) => update(self, true),
        onUpdate: (self) => update(self),
      });
      update(trigger, true);

      rows.forEach((row, index) => {
        const link = row.querySelector<HTMLElement>("[data-service-link]");
        if (!link) return;
        const onFocus = () => setActive(index);
        link.addEventListener("focus", onFocus);
        focusCleanups.push(() => link.removeEventListener("focus", onFocus));
      });

      const requestMeasure = () => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
          measure();
          update(trigger, true);
        });
      };
      window.addEventListener("resize", requestMeasure, { passive: true });

      return () => {
        window.cancelAnimationFrame(resizeFrame);
        window.removeEventListener("resize", requestMeasure);
        focusCleanups.forEach((cleanup) => cleanup());
        trigger.kill();
        section.removeAttribute("data-service-ready");
        journey.removeAttribute("data-journey-ready");
        rows.forEach((row, index) => {
          if (index === 0) row.setAttribute("data-service-active", "");
          else row.removeAttribute("data-service-active");
        });
        stageImages.forEach((image, index) => {
          if (index === 0) image.setAttribute("data-service-stage-image-active", "");
          else image.removeAttribute("data-service-stage-image-active");
        });
        gsap.set(stageImages, { clearProps: "all" });
        if (capabilityRules.length) {
          gsap.set(capabilityRules, { clearProps: "all" });
        }
        rows.forEach((row) => {
          const content = row.querySelector<HTMLElement>(".service-chapter__content");
          if (content) gsap.set(content, { clearProps: "all" });
        });
        if (progressBar) gsap.set(progressBar, { clearProps: "all" });
      };
    });

    mm.add("(max-width: 900px), (hover: none), (pointer: coarse)", () => {
      rows.forEach((row) => {
        const targets = [
          row.querySelector<HTMLElement>(".service-chapter__mobile-visual"),
          row.querySelector<HTMLElement>(".service-chapter__content"),
        ].filter((target): target is HTMLElement => Boolean(target));
        if (!targets.length || row.getBoundingClientRect().top <= window.innerHeight * 0.9) return;
        gsap.from(targets, {
          autoAlpha: 0,
          y: 20,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 82%", once: true },
        });
      });
    });
  }, journey);

  return () => {
    mm.revert();
    ctx.revert();
    journey.removeAttribute("data-journey-ready");
    section.removeAttribute("data-service-ready");
  };
}

// 02 → 03 — Osmo Sticky Title Scroll adapted as an unnumbered tension bridge.
// Desktop and mobile keep one typographic stage sticky while three complete,
// server-rendered statements replace one another over the same solid dark
// surface as 03 and 04. Reduced motion and no-JS remain readable in flow.
function outcomeTensionBridge() {
  const section = document.querySelector<HTMLElement>("[data-outcome-tension]");
  if (!section) return () => {};

  const titles = gsap.utils.toArray<HTMLElement>("[data-outcome-tension-title]", section);
  const titleList = section.querySelector<HTMLElement>(".outcome-tension__titles");
  if (titles.length < 3 || !titleList) return () => {};

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
      .to(titles[2], { autoAlpha: 1, duration: 0.5 }, 1.7);
  }, section);

  return () => {
    section.removeAttribute("data-tension-ready");
    ctx.revert();
  };
}

function effectScene() {
  const section = document.querySelector<HTMLElement>("[data-effect-section]");
  const field = section?.querySelector<HTMLElement>("[data-effect-field]");
  const visual = section?.querySelector<HTMLElement>("[data-effect-visual]");
  const image = visual?.querySelector<HTMLElement>("img");
  if (!section || !field || !visual || !image) {
    return () => {};
  }

  const outcomes = gsap.utils.toArray<HTMLElement>("[data-effect-outcome]", section);
  const markers = gsap.utils.toArray<HTMLElement>("[data-effect-marker]", section);
  const closing = section.querySelector<HTMLElement>("[data-effect-closing]");
  if (!markers.length || outcomes.length < 4) return () => {};

  const matchMedia = gsap.matchMedia();

  matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
    const compact = window.matchMedia("(max-width: 900px)").matches;
    const ctx = gsap.context(() => {
      // Samme maske- og zoominngang som 04-flatene.
      gsap.set(visual, { clipPath: "inset(100% 0% 0% 0%)" });
      const visualEnter = gsap.timeline({
        scrollTrigger: {
          trigger: field,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });
      visualEnter
        .to(visual, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.7,
          ease: "expo.out",
        }, 0)
        .fromTo(image, { scale: 1.3 }, {
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }, 0);

      if (!compact) {
        gsap.fromTo(image, { yPercent: -10 }, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: field,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Resultatordene avdekkes i én kontrollert kjede når sticky-scenen
      // kommer inn; markøren er fortsatt synlighetsprinsippet fra 03.
      gsap.set(markers, { scaleX: 1, transformOrigin: "100% 50%" });
      gsap.to(markers, {
        scaleX: 0,
        duration: 0.5,
        stagger: 0.14,
        ease: "power3.inOut",
        scrollTrigger: { trigger: field, start: "top 78%", once: true },
      });

      if (!compact) {
        const exitTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: field,
            start: "bottom 72%",
            end: "bottom 18%",
            scrub: 1.2,
          },
        });
        exitTimeline
          .to(outcomes, {
            autoAlpha: 0,
            y: -18,
            stagger: 0.035,
            ease: "power2.in",
          }, 0)
          .to(closing, { autoAlpha: 0, y: -12, ease: "power2.in" }, 0)
          .to(visual, {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "power2.inOut",
          }, 0.08);
      }
    }, section);

    return () => {
      ctx.revert();
    };
  });

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

// 04 / Arbeid — arkiv-scene i tre lag. En sticky tittelflate med dempet
// bølgevideo blir liggende mens capability-veggen ruller over og begraver
// den. Hver flate klippes opp nedenfra og får utakts-parallax; tittelordene
// maskeres inn én gang og scrubbes ut når veggen nærmer seg slutten.
// Alt innhold er server-rendret og komplett uten JavaScript.
function workArchiveScene(compact: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  const archive = section?.querySelector<HTMLElement>("[data-work-archive]");
  if (!section || !archive) return () => {};

  const ctx = gsap.context(() => {
    const words = gsap.utils.toArray<HTMLElement>("[data-archive-word]", archive);
    const fades = gsap.utils.toArray<HTMLElement>("[data-archive-fade]", archive);
    const tiles = gsap.utils.toArray<HTMLElement>("[data-work-tile]", section);

    // Entré: maskede ord stiger opp én gang når arkivflaten kommer inn.
    // Ved dyp-lasting midt i seksjonen står alt ferdig uten animasjon.
    maskedRise(words, archive, { yPercent: 130, duration: 1.2, stagger: 0.08 });
    const alreadyPast =
      archive.getBoundingClientRect().top <= window.innerHeight * 0.85;
    if (fades.length && !alreadyPast) {
      gsap.from(fades, {
        autoAlpha: 0,
        y: 24,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
        scrollTrigger: { trigger: archive, start: "top 85%", once: true },
      });
    }

    // Flatene: klipp-reveal nedenfra + zoom-settle, deretter kontinuerlig
    // utakts-parallax i bildets 140 %-rom.
    tiles.forEach((tile, index) => {
      const visual = tile.querySelector<HTMLElement>(".work-tile__visual");
      const image = visual?.querySelector<HTMLElement>("img");
      if (!visual || !image) return;

      const tileVisible =
        tile.getBoundingClientRect().top < window.innerHeight * 0.9;
      gsap.set(visual, {
        clipPath: tileVisible ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      });

      if (!tileVisible) {
        const enter = gsap.timeline({
          scrollTrigger: {
            trigger: tile,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
        enter
          .to(visual, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "expo.out",
          }, 0)
          .fromTo(
            image,
            { scale: 1.3 },
            { scale: 1, duration: 1, ease: "power3.out" },
            0,
          );
      }

      if (!compact) {
        const speed = [12, 18, 10, 20, 15, 22][index % 6];
        gsap.fromTo(
          image,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: tile,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }
    });

    // Exit: når nest siste flate passerer, scrubbes tittelordene opp og ut
    // av maskene sine mens label/undertekst faller stille bort. Kun desktop —
    // på mobil er flaten i vanlig flyt og forlater viewporten selv.
    if (!compact && words.length && tiles.length >= 2) {
      const exitTrigger = tiles[tiles.length - 2];
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: exitTrigger,
          start: "bottom 65%",
          end: "bottom 5%",
          scrub: 1.2,
        },
      });
      exitTl.to(words, {
        yPercent: -130,
        ease: "power2.in",
        stagger: { each: 0.04, from: "start" },
      }, 0);
      if (fades.length) {
        exitTl.to(fades, { autoAlpha: 0, y: -15, ease: "power2.in" }, 0);
      }
    }
  }, section);

  return () => ctx.revert();
}

// 04 → 05 — Osmo Overlapping Parallax tilpasset én sammenhengende side.
// Prosess er den faktiske innkommende flaten. Arbeid trekker seg bare et kort
// stykke tilbake og mørklegges mens Prosess dekker det nedenfra.
function workProcessJourney(compact: boolean) {
  const journey = document.querySelector<HTMLElement>("[data-work-process-journey]");
  const work = document.querySelector<HTMLElement>("[data-work-process-transition]");
  const process = journey?.querySelector<HTMLElement>(".process-journey");
  const shade = work?.querySelector<HTMLElement>("[data-work-exit-shade]");
  if (!journey || !work || !process || !shade) return () => {};

  const ctx = gsap.context(() => {
    gsap.set(shade, { autoAlpha: 0 });
    journey.setAttribute("data-work-process-ready", "");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: work,
        start: "bottom bottom",
        end: "+=100%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(work, {
        y: compact ? "-16svh" : "-24svh",
        duration: 1,
        ease: "power3.in",
      }, 0)
      .to(shade, {
        autoAlpha: compact ? 0.58 : 0.68,
        duration: 0.84,
        ease: "power2.in",
      }, 0);
  }, journey);

  return () => {
    journey.removeAttribute("data-work-process-ready");
    ctx.revert();
  };
}

// 06 / System — manifesto lines rise out of their masks once; support and
// corner marks settle after. The page's quietest reveal.
function manifestoReveal() {
  const section = document.querySelector<HTMLElement>(".system-manifesto");
  if (!section) return;
  // Allerede-synlig-garde: ved dyp-lasting forbi seksjonen beholdes server-
  // tilstanden (sluttilstand) — from-tweens skal ikke spille entré på nytt.
  if (section.getBoundingClientRect().top <= window.innerHeight * 0.64) return;

  const lines = gsap.utils.toArray<HTMLElement>(
    ".system-manifesto__line-inner",
    section
  );
  const support = section.querySelector("[data-manifesto-support]");
  const gridColumns = section.querySelectorAll(".system-manifesto__grid span");
  const pieces = gsap.utils.toArray<HTMLElement>("[data-system-piece]", section);

  maskedRise(lines, section, {
    yPercent: 108,
    duration: 0.8,
    stagger: 0.12,
    start: "top 64%",
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: "top 64%", once: true },
    defaults: { ease: "power3.out" },
  });

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

// Osmo Dynamic Text Cursor, adapted only in styling and lifecycle for Tigon.
// The original data attributes and GSAP quickTo movement are preserved.
function setupDynamicTextCursor() {
  const cursor = document.querySelector<HTMLElement>("[data-cursor]");
  const cursorTextTarget = document.querySelector<HTMLElement>("[data-cursor-text-target]");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!cursor || !cursorTextTarget || !finePointer || reducedMotion) return () => {};

  // WorkProof is translated during the 04→05 handoff. A fixed element inside
  // that transformed section would use the section as its containing block and
  // be clipped by its overflow. Keep the cursor at the viewport root instead.
  const cursorParent = cursor.parentNode;
  const cursorNextSibling = cursor.nextSibling;
  document.body.appendChild(cursor);

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
    if (cursorParent) {
      const nextSibling = cursorNextSibling?.parentNode === cursorParent
        ? cursorNextSibling
        : null;
      cursorParent.insertBefore(cursor, nextSibling);
    }
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
    const lenis = initLenis({
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenis?.lenis.on("scroll", ScrollTrigger.update);
    // Dev-verktøy: gir konsoll/verifisering tilgang til å styre scroll via
    // Lenis i stedet for å kjempe mot lerp-loopen. Fjernes av prod-bundling.
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis?.lenis;
    }
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

    // Tension init-es umiddelbart (den omplasserer innhold og påvirker
    // layout); 01 er nå statisk tekstfyll og lazy-init-es sammen med scenene
    // fra 03→04 og ned (runWhenNear, 1600px forvarsel).
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = runWhenNear("[data-intro-story]", introFillScene);
      const teardownTension = outcomeTensionBridge();
      const teardownWorkArchive = runWhenNear(".work-proof", () =>
        workArchiveScene(window.matchMedia("(max-width: 1000px)").matches));
      const teardownWorkProcess = runWhenNear("[data-work-process-journey]", () =>
        workProcessJourney(window.matchMedia("(max-width: 1100px)").matches));
      const teardownProcess = runWhenNear("[data-process-stage]", () =>
        processScene(false));
      const teardownManifesto = runWhenNear(".system-manifesto", manifestoReveal);
      const teardownFooter = runWhenNear(".contact-footer", footerReveals);
      return () => {
        teardownIntro();
        teardownTension();
        teardownWorkArchive();
        teardownWorkProcess();
        teardownProcess();
        teardownManifesto();
        teardownFooter();
      };
    });

    // Mobile keeps the same 03→04 typographic page turn, while the capability
    // wall itself stays in ordinary document flow with small one-shot reveals.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownIntro = runWhenNear("[data-intro-story]", introFillScene);
      const teardownTension = outcomeTensionBridge();
      const teardownWorkArchive = runWhenNear(".work-proof", () =>
        workArchiveScene(true));
      const teardownWorkProcess = runWhenNear("[data-work-process-journey]", () =>
        workProcessJourney(true));
      const teardownProcess = runWhenNear("[data-process-stage]", () =>
        processScene(true));
      const teardownManifesto = runWhenNear(".system-manifesto", manifestoReveal);
      const teardownFooter = runWhenNear(".contact-footer", footerReveals);
      return () => {
        teardownIntro();
        teardownTension();
        teardownWorkArchive();
        teardownWorkProcess();
        teardownProcess();
        teardownManifesto();
        teardownFooter();
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
