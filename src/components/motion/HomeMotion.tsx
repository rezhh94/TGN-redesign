"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destroyLenis, initLenis } from "@/lib/motion";
import {
  initApproachPathJourney,
  initContentRevealScroll,
  initFooterParallax,
  initGlobalParallax,
  initShutterScrollTransition,
} from "@/lib/osmo-motion";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("work-orbit", "M0,0 C0.625,0.05 0,1 1,1");

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

// Intro → 02 / Tjenester — one clean-room journey owner. CSS keeps all
// five panels readable in ordinary flow. GSAP upgrades only fine-pointer
// desktop to one bounded, pinned panel stack.
function servicesScene() {
  const journey = document.querySelector<HTMLElement>("[data-intro-services-journey]");
  const section = journey?.querySelector<HTMLElement>("[data-build-section]");
  const prelude = section?.querySelector<HTMLElement>("[data-service-prelude]");
  const story = section?.querySelector<HTMLElement>("[data-service-story]");
  const stage = section?.querySelector<HTMLElement>("[data-service-stage]");
  const bands = gsap.utils.toArray<HTMLElement>("[data-service-band]", section);
  const effectBands = gsap.utils.toArray<HTMLElement>(
    "[data-service-effect-band]",
    section,
  );
  const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]", section);

  if (
    !journey
    || !section
    || !prelude
    || !story
    || !stage
    || bands.length !== 5
    || effectBands.length !== 5
    || panels.length !== 5
  ) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
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

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      section.setAttribute("data-service-handoff-ready", "");
      gsap.set(bands, {
        scaleY: 0,
        transformOrigin: "bottom center",
      });

      const handoffTimeline = gsap.timeline({ defaults: { ease: "none" } });
      bands.forEach((band, index) => {
        const offset = 0.3 * (bands.length - 1 - index) / (bands.length - 1);
        handoffTimeline.to(band, { scaleY: 1, duration: 0.3 }, offset);
      });
      handoffTimeline.to({}, { duration: 0.1 });

      const handoffTrigger = ScrollTrigger.create({
        id: "services-handoff",
        trigger: prelude,
        start: "top top",
        end: ScrollTrigger.isTouch ? "+=80%" : "+=100%",
        animation: handoffTimeline,
        scrub: 0.6,
        pin: prelude,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      return () => {
        handoffTrigger.kill();
        handoffTimeline.kill();
        section.removeAttribute("data-service-handoff-ready");
      };
    });

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      () => {
        const contents = panels.map((panel) =>
          panel.querySelector<HTMLElement>("[data-service-panel-content]"));
        const rules = panels.map((panel) =>
          gsap.utils.toArray<HTMLElement>("[data-service-panel-rule]", panel));
        const links = panels.map((panel) =>
          panel.querySelector<HTMLAnchorElement>("[data-service-link]"));
        let activeIndex = -1;

        const setActive = (nextIndex: number) => {
          const index = gsap.utils.clamp(0, panels.length - 1, nextIndex);
          if (index === activeIndex) return;
          activeIndex = index;

          panels.forEach((panel, panelIndex) => {
            const isActive = panelIndex === index;
            panel.toggleAttribute("data-service-active", isActive);
            const link = links[panelIndex];
            if (link) link.tabIndex = isActive ? 0 : -1;
          });
        };

        section.setAttribute("data-service-ready", "");
        section.setAttribute("data-service-effect-ready", "");
        gsap.set(panels, { yPercent: 100 });
        gsap.set(panels[0], { yPercent: 0 });
        gsap.set(panels, { zIndex: (index) => index + 1 });
        gsap.set(effectBands, {
          scaleY: 0,
          transformOrigin: "bottom center",
        });
        rules.forEach((panelRules, index) => {
          gsap.set(panelRules, {
            scaleX: index === 0 ? 1 : 0,
            transformOrigin: "left center",
          });
        });
        setActive(0);

        const timeline = gsap.timeline({ defaults: { ease: "none" } });
        const leadHold = 0.5;
        const transitionDuration = 1;
        const panelHold = 0.5;
        timeline.to({}, { duration: leadHold });

        panels.forEach((panel, index) => {
          if (index === 0) return;

          const transitionStart = timeline.duration();
          const previousContent = contents[index - 1];
          timeline.to(
            panel,
            { yPercent: 0, duration: transitionDuration },
            transitionStart,
          );

          if (previousContent) {
            timeline.to(
              previousContent,
              { yPercent: -100, duration: transitionDuration },
              transitionStart,
            );
          }

          if (rules[index].length) {
            timeline.to(
              rules[index],
              {
                scaleX: 1,
                duration: 0.5,
                stagger: 0.08,
              },
              transitionStart + 0.2,
            );
          }

          timeline.to({}, { duration: panelHold });
        });

        // The shutter belongs only to the section handoff. It closes the final
        // paper service into one complete dark viewport before Effekt starts;
        // the fixed title is animated separately and never follows the bands.
        const effectHandoffStart = timeline.duration();
        effectBands.forEach((band, index) => {
          const offset = 0.3 * (effectBands.length - 1 - index)
            / (effectBands.length - 1);
          timeline.to(
            band,
            { scaleY: 1, duration: 0.3 },
            effectHandoffStart + offset,
          );
        });
        timeline.to({}, { duration: 0.14 }, effectHandoffStart + 0.6);

        const updateActive = (self: ReturnType<typeof ScrollTrigger.create>) => {
          const total = timeline.duration();
          let index = 0;
          for (let next = 1; next < panels.length; next += 1) {
            const midpoint = (
              leadHold
              + (next - 1) * (transitionDuration + panelHold)
              + transitionDuration / 2
            ) / total;
            if (self.progress >= midpoint) index = next;
          }
          setActive(index);
        };

        const trigger = ScrollTrigger.create({
          id: "services-panels",
          trigger: story,
          start: "top top",
          end: () => `+=${Math.round(1.2 * window.innerHeight * panels.length)}`,
          animation: timeline,
          scrub: 0.6,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 0.5,
          invalidateOnRefresh: true,
          onRefresh: (self) => updateActive(self),
          onUpdate: (self) => updateActive(self),
        });
        updateActive(trigger);

        return () => {
          trigger.kill();
          timeline.kill();
          section.removeAttribute("data-service-ready");
          section.removeAttribute("data-service-effect-ready");
          panels.forEach((panel, index) => {
            panel.toggleAttribute("data-service-active", index === 0);
          });
          links.forEach((link) => link?.removeAttribute("tabindex"));
        };
      },
    );

    mm.add(
      "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
      () => {
        panels.forEach((panel) => {
          const targets = [
            panel.querySelector<HTMLElement>(".service-panel__image-frame"),
            panel.querySelector<HTMLElement>("[data-service-panel-content]"),
          ].filter((target): target is HTMLElement => Boolean(target));
          if (!targets.length || panel.getBoundingClientRect().top <= window.innerHeight * 0.9) {
            return;
          }
          gsap.from(targets, {
            autoAlpha: 0,
            y: 20,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 82%", once: true },
          });
        });

        section.setAttribute("data-service-effect-ready", "");
        gsap.set(effectBands, {
          scaleY: 0,
          transformOrigin: "bottom center",
        });

        const mobileHandoff = gsap.timeline({ defaults: { ease: "none" } });
        effectBands.forEach((band, index) => {
          const offset = 0.3 * (effectBands.length - 1 - index)
            / (effectBands.length - 1);
          mobileHandoff.to(band, { scaleY: 1, duration: 0.3 }, offset);
        });
        mobileHandoff.to({}, { duration: 0.1 });

        const mobileHandoffTrigger = ScrollTrigger.create({
          id: "services-effect-handoff-mobile",
          trigger: panels.at(-1),
          start: "bottom bottom",
          end: "bottom top",
          animation: mobileHandoff,
          scrub: 0.6,
          invalidateOnRefresh: true,
        });

        return () => {
          mobileHandoffTrigger.kill();
          mobileHandoff.kill();
          section.removeAttribute("data-service-effect-ready");
        };
      },
    );
  }, journey);

  return () => {
    mm.revert();
    ctx.revert();
    section.removeAttribute("data-service-handoff-ready");
    section.removeAttribute("data-service-ready");
    section.removeAttribute("data-service-effect-ready");
  };
}
// 03 / Effekt — the fixed result statement resolves beneath the outgoing
// service plane and remains behind four result cards. Wide screens use two opposing
// currents and a symmetric 2x2 settle; phones use one shared centred vertical
// lane, one card at a time. CSS remains the complete readable fallback.
function effectCardsScene() {
  const section = document.querySelector<HTMLElement>("[data-effect-section]");
  const stage = section?.querySelector<HTMLElement>("[data-effect-stage]");
  const rail = section?.querySelector<HTMLElement>(".what-improve__rail");
  const center = section?.querySelector<HTMLElement>("[data-effect-center]");
  const prelude = section?.querySelector<HTMLElement>("[data-effect-prelude]");
  const cards = gsap.utils.toArray<HTMLElement>("[data-effect-card]", section);

  if (
    !section
    || !stage
    || !rail
    || !center
    || !prelude
    || cards.length !== 4
  ) {
    return () => {};
  }

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    section.setAttribute("data-effect-overlap-ready", "");
    return () => section.removeAttribute("data-effect-overlap-ready");
  });

  mm.add(
    "(prefers-reduced-motion: no-preference) and (min-width: 901px)",
    () => {
      section.setAttribute("data-effect-ready", "");
      let cleanupDesktopMotion = () => {};
      const ctx = gsap.context(() => {
        // The service shutter finishes before this pinned scene starts. The
        // title is therefore already fixed in the viewport when its independent
        // opacity-and-blur sequence begins; no band can clip or carry it.
        const introStart = 0;
        const cardStart = 0.56;
        const cardGutter = 40;
        const cardKeyframeCount = 13;
        const cardDuration = 0.45;
        const pairOffset = 0.2;
        const pairs = [[cards[0], cards[1]], [cards[2], cards[3]]] as const;
        const setDesktopCardGeometry = () => {
          const viewportWidth = stage.clientWidth;
          const viewportHeight = stage.clientHeight;
          const isMidViewport = viewportWidth >= 768 && viewportWidth < 1512;
          const cardWidth = Math.round(
            (isMidViewport ? 0.42 : 0.28) * viewportWidth,
          );
          const cardHeight = Math.round(0.32 * viewportHeight);
          gsap.set(cards, { width: cardWidth, height: cardHeight });
        };

        gsap.set(rail, { autoAlpha: 0, y: 0 });
        gsap.set(prelude, {
          autoAlpha: 0.15,
          y: 0,
          filter: "blur(24px)",
        });
        setDesktopCardGeometry();
        gsap.set(cards, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          force3D: true,
        });

        const introTimeline = gsap.timeline({
          paused: true,
          defaults: { ease: "none" },
        });
        introTimeline
          .to(prelude, {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.32,
          }, 0)
          .to(rail, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.18)
          .to({}, { duration: 1 }, 0);

        const cardsTimeline = gsap.timeline({
          paused: true,
          defaults: { ease: "none" },
        });

        pairs.forEach(([leftCard, rightCard], pairIndex) => {
          const leftKeyframes = [];
          const rightKeyframes = [];

          for (let frame = 0; frame < cardKeyframeCount; frame += 1) {
            const progress = frame / (cardKeyframeCount - 1);
            const bend = progress <= 0.5 ? Math.sin(progress * Math.PI) : 1;
            const opacity = progress < 0.15
              ? progress / 0.15
              : progress > 0.85
                ? 1 - (progress - 0.85) / 0.15
                : 1;

            leftKeyframes.push({
              autoAlpha: opacity,
              x: () => {
                const viewportWidth = stage.clientWidth;
                const cardWidth = leftCard.offsetWidth;
                const isMidViewport = viewportWidth >= 768 && viewportWidth < 1512;
                const startX = -(0.7 * cardWidth);
                const laneX = isMidViewport ? cardGutter : 0.1 * viewportWidth;
                return startX + bend * (laneX - startX);
              },
              y: () => (
                stage.clientHeight
                + progress * (-leftCard.offsetHeight - stage.clientHeight)
              ),
            });
            rightKeyframes.push({
              autoAlpha: opacity,
              x: () => {
                const viewportWidth = stage.clientWidth;
                const cardWidth = rightCard.offsetWidth;
                const isMidViewport = viewportWidth >= 768 && viewportWidth < 1512;
                const startX = viewportWidth - 0.3 * cardWidth;
                const laneX = isMidViewport
                  ? viewportWidth - cardGutter - cardWidth
                  : 0.9 * viewportWidth - cardWidth;
                return startX + bend * (laneX - startX);
              },
              y: () => (
                -rightCard.offsetHeight
                + progress * (stage.clientHeight + rightCard.offsetHeight)
              ),
            });
          }

          cardsTimeline
            .to(leftCard, {
              keyframes: leftKeyframes,
              duration: cardDuration,
            }, pairOffset * pairIndex)
            .to(rightCard, {
              keyframes: rightKeyframes,
              duration: cardDuration,
            }, pairOffset * pairIndex);
        });

        let targetCardsProgress = 0;
        let renderedCardsProgress = 0;
        const renderCards = () => {
          renderedCardsProgress += (targetCardsProgress - renderedCardsProgress) * 0.08;
          if (Math.abs(targetCardsProgress - renderedCardsProgress) < 0.0001) {
            renderedCardsProgress = targetCardsProgress;
          }
          cardsTimeline.progress(renderedCardsProgress);
        };

        gsap.ticker.add(renderCards);

        const desktopTrigger = ScrollTrigger.create({
          id: "effect-cards-scene",
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * (ScrollTrigger.isTouch ? 3.9 : 4.6))}`,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => section.setAttribute("data-effect-front", ""),
          onEnterBack: () => section.setAttribute("data-effect-front", ""),
          onLeave: () => section.removeAttribute("data-effect-front"),
          onLeaveBack: () => section.removeAttribute("data-effect-front"),
          onUpdate: (self) => {
            const sceneProgress = self.progress;
            introTimeline.progress(gsap.utils.clamp(
              0,
              1,
              (sceneProgress - introStart) / (cardStart - introStart),
            ));
            targetCardsProgress = sceneProgress < cardStart
              ? 0
              : Math.min(1, (sceneProgress - cardStart) / (1 - cardStart));

            const outroProgress = gsap.utils.clamp(0, 1, (sceneProgress - 0.92) / 0.08);
            if (sceneProgress >= cardStart) {
              gsap.set(prelude, {
                autoAlpha: 1 - outroProgress,
                filter: `blur(${24 * outroProgress}px)`,
              });
            }
            gsap.set(rail, { autoAlpha: 1 - outroProgress });
          },
          onRefresh: () => {
            setDesktopCardGeometry();
            introTimeline.invalidate();
            cardsTimeline.invalidate().progress(renderedCardsProgress);
          },
        });

        cleanupDesktopMotion = () => {
          desktopTrigger.kill();
          gsap.ticker.remove(renderCards);
          introTimeline.kill();
          cardsTimeline.kill();
        };
      }, section);

      return () => {
        cleanupDesktopMotion();
        section.removeAttribute("data-effect-ready");
        ctx.revert();
      };
    },
  );

  mm.add(
    "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (max-width: 900px)",
    () => {
      const ctx = gsap.context(() => {
        cards.forEach((card) => {
          if (card.getBoundingClientRect().top <= window.innerHeight * 0.88) return;
          gsap.from(card, {
            autoAlpha: 0,
            y: 28,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          });
        });
      }, section);
      return () => ctx.revert();
    },
  );

  mm.add(
    "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
    () => {
      section.setAttribute("data-effect-mobile-ready", "");
      let cleanupMobileMotion = () => {};
      const ctx = gsap.context(() => {
        // The phone shutter also finishes before this scene pins. The title
        // remains fixed and receives only the same opacity-and-blur sequence.
        const introStart = 0;
        const cardStart = 0.66;
        const cardGutter = 24;
        const cardKeyframeCount = 13;
        const cardDuration = 0.3;
        const cardOffset = 0.12;
        const setMobileCardGeometry = () => {
          const cardWidth = stage.clientWidth - 2 * cardGutter;
          gsap.set(cards, {
            width: cardWidth,
            height: Math.round(0.55 * cardWidth),
          });
        };

        gsap.set(rail, { autoAlpha: 0, y: 0 });
        gsap.set(prelude, {
          autoAlpha: 0.15,
          y: 0,
          filter: "blur(24px)",
        });
        setMobileCardGeometry();
        gsap.set(cards, {
          autoAlpha: 0,
          x: (index, card: HTMLElement) => (
            Math.max(cardGutter, (stage.clientWidth - card.offsetWidth) / 2)
          ),
          y: () => stage.clientHeight,
          force3D: true,
        });

        const introTimeline = gsap.timeline({
          paused: true,
          defaults: { ease: "none" },
        });
        introTimeline
          .to(prelude, {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.32,
          }, 0)
          .to(rail, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.18)
          .to({}, { duration: 1 }, 0);

        const cardsTimeline = gsap.timeline({
          paused: true,
          defaults: { ease: "none" },
        });

        cards.forEach((card, index) => {
          const keyframes = Array.from({ length: cardKeyframeCount }, (_, frame) => {
            const progress = frame / (cardKeyframeCount - 1);
            const opacity = progress < 0.15
              ? progress / 0.15
              : progress > 0.85
                ? 1 - (progress - 0.85) / 0.15
                : 1;

            return {
              autoAlpha: opacity,
              x: () => Math.max(cardGutter, (stage.clientWidth - card.offsetWidth) / 2),
              y: () => (
                stage.clientHeight
                + progress * (-card.offsetHeight - stage.clientHeight)
              ),
            };
          });

          cardsTimeline.to(card, {
            keyframes,
            duration: cardDuration,
          }, cardOffset * index);
        });

        let targetCardsProgress = 0;
        let renderedCardsProgress = 0;
        const renderCards = () => {
          renderedCardsProgress += (targetCardsProgress - renderedCardsProgress) * 0.08;
          if (Math.abs(targetCardsProgress - renderedCardsProgress) < 0.0001) {
            renderedCardsProgress = targetCardsProgress;
          }
          cardsTimeline.progress(renderedCardsProgress);
        };

        gsap.ticker.add(renderCards);

        const mobileTrigger = ScrollTrigger.create({
          id: "effect-cards-scene-mobile",
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 5)}`,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => section.setAttribute("data-effect-front", ""),
          onEnterBack: () => section.setAttribute("data-effect-front", ""),
          onLeave: () => section.removeAttribute("data-effect-front"),
          onLeaveBack: () => section.removeAttribute("data-effect-front"),
          onUpdate: (self) => {
            const sceneProgress = self.progress;
            introTimeline.progress(gsap.utils.clamp(
              0,
              1,
              (sceneProgress - introStart) / (cardStart - introStart),
            ));
            targetCardsProgress = sceneProgress < cardStart
              ? 0
              : Math.min(1, (sceneProgress - cardStart) / (1 - cardStart));

            const outroProgress = gsap.utils.clamp(0, 1, (sceneProgress - 0.92) / 0.08);
            if (sceneProgress >= cardStart) {
              gsap.set(prelude, {
                autoAlpha: 1 - outroProgress,
                filter: `blur(${24 * outroProgress}px)`,
              });
            }
            gsap.set(rail, { autoAlpha: 1 - outroProgress });
          },
          onRefresh: () => {
            setMobileCardGeometry();
            introTimeline.invalidate();
            cardsTimeline.invalidate().progress(renderedCardsProgress);
          },
        });

        cleanupMobileMotion = () => {
          mobileTrigger.kill();
          gsap.ticker.remove(renderCards);
          introTimeline.kill();
          cardsTimeline.kill();
        };
      }, section);

      return () => {
        cleanupMobileMotion();
        section.removeAttribute("data-effect-mobile-ready");
        ctx.revert();
      };
    },
  );

  return () => {
    mm.revert();
    section.removeAttribute("data-effect-ready");
    section.removeAttribute("data-effect-mobile-ready");
    section.removeAttribute("data-effect-overlap-ready");
    section.removeAttribute("data-effect-front");
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

const WORK_FOCUS_SCROLL_LENGTH = 6;
const WORK_MOBILE_SCROLL_LENGTH = 6;
const WORK_MOBILE_TITLE_END = 0.16;
const WORK_MOBILE_ORBIT_REVEAL_START = 0.12;
const WORK_MOBILE_ORBIT_START = 0.2;
const WORK_MOBILE_ORBIT_END = 0.92;

// 04 / Arbeid — én sammenhengende scene. Ordtraverseringen er en egen
// ScrollTrigger. Pinnen eier én scrollstyrt Osmo-orbit for de seks komplette
// kapabilitetslenkene; ingen autonom loop eller tidligere panelmotor kjører
// parallelt. Første Webapp-flate er også åpningen ved pin-grensen.
function workFocusScene(compact: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const stage = section.querySelector<HTMLElement>("[data-work-focus-stage]");
  const opening = section.querySelector<HTMLElement>("[data-work-opening]");
  const title = section.querySelector<HTMLElement>(".work-focus__title");
  const titleTop = section.querySelector<HTMLElement>("[data-work-title-top]");
  const titleBottom = section.querySelector<HTMLElement>("[data-work-title-bottom]");
  const openingCopy = section.querySelector<HTMLElement>("[data-work-opening-copy]");
  const head = section.querySelector<HTMLElement>(".work-focus__head");
  const foot = section.querySelector<HTMLElement>(".work-focus__foot");
  const orbitCollection = section.querySelector<HTMLElement>("[data-orbit-tiles-collection]");
  const orbitList = section.querySelector<HTMLElement>("[data-orbit-tiles-list]");
  const panels = gsap.utils.toArray<HTMLElement>("[data-work-panel]", section);
  const orbitContents = gsap.utils.toArray<HTMLElement>(
    "[data-orbit-tiles-content]",
    section,
  );
  const count = section.querySelector<HTMLElement>("[data-work-active-count]");
  const activeName = section.querySelector<HTMLElement>("[data-work-active-name]");
  if (
    !stage
    || !opening
    || !title
    || !titleTop
    || !titleBottom
    || !openingCopy
    || !head
    || !foot
    || !orbitCollection
    || !orbitList
    || panels.length !== 6
    || orbitContents.length !== panels.length
  ) return () => {};

  const names = panels.map((panel) => panel.querySelector("h3")?.textContent?.trim() ?? "");
  const cleanups: Array<() => void> = [];
  let activeIndex = -1;

  const ctx = gsap.context(() => {
    if (compact) {
      section.setAttribute("data-work-mobile-ready", "");
      const mobileOrbit = window.matchMedia("(max-width: 767px)").matches;
      const openingAlreadyVisible = opening.getBoundingClientRect().top < window.innerHeight * 0.84;
      if (!mobileOrbit && !openingAlreadyVisible) {
        const openingTimeline = gsap.timeline({
          scrollTrigger: { trigger: opening, start: "top 74%", once: true },
          defaults: { ease: "power3.out" },
        });
        openingTimeline
          .from([titleTop, titleBottom], {
            autoAlpha: 0,
            y: 24,
            duration: 0.72,
            stagger: 0.08,
          }, 0)
          .from(openingCopy, { autoAlpha: 0, y: 18, duration: 0.6 }, 0.28);
      }

      if (mobileOrbit) {
        section.setAttribute("data-work-mobile-orbit-ready", "");

        const media = panels.map((panel) =>
          panel.querySelector<HTMLElement>(".work-focus__media"));
        if (media.some((item) => !item)) return;

        const clamp = gsap.utils.clamp;
        const orbitTarget = { progress: 0 };
        let orbitProgress = 0;
        let lastTick = 0;
        let sceneIsNear = false;
        let mobileCopyReady = false;
        let tickerAttached = false;
        let geometry = {
          tileWidth: 0,
          tileHeight: 0,
          radiusX: 0,
          radiusY: 0,
        };

        const measure = () => {
          const cardAspect = 568 / 812;
          const tileWidth = Math.min(
            window.innerWidth * 0.82,
            window.innerHeight * 0.47 / cardAspect,
          );

          geometry = {
            tileWidth,
            tileHeight: tileWidth * cardAspect,
            radiusX: Math.max(window.innerWidth * 0.7, tileWidth * 0.92),
            radiusY: Math.min(window.innerHeight * 0.09, 72),
          };
          stage.style.setProperty(
            "--work-mobile-tile-width",
            `${geometry.tileWidth.toFixed(3)}px`,
          );
          stage.style.setProperty(
            "--work-mobile-tile-height",
            `${geometry.tileHeight.toFixed(3)}px`,
          );
        };

        const selectMobilePanel = (nextIndex: number) => {
          if (nextIndex === activeIndex) return;
          activeIndex = nextIndex;
          panels.forEach((panel, index) => {
            const isActive = index === nextIndex;
            panel.setAttribute(
              "data-orbit-tiles-item-status",
              isActive ? "active" : "not-active",
            );
            if (isActive) panel.setAttribute("data-work-active", "");
            else panel.removeAttribute("data-work-active");
          });
          if (count) {
            count.textContent = `${String(nextIndex + 1).padStart(2, "0")} / 06`;
          }
          if (activeName) activeName.textContent = names[nextIndex] ?? "";
        };

        const stopMobileTicker = () => {
          if (!tickerAttached) return;
          gsap.ticker.remove(renderMobileOrbit);
          tickerAttached = false;
          lastTick = 0;
        };

        const startMobileTicker = () => {
          if (tickerAttached) return;
          gsap.ticker.add(renderMobileOrbit);
          tickerAttached = true;
        };

        function renderMobileOrbit(time = gsap.ticker.time) {
          const delta = lastTick
            ? Math.min(Math.max(time - lastTick, 0), 0.05)
            : 1 / 60;
          lastTick = time;
          const smoothing = 1 - Math.pow(0.001, delta);
          orbitProgress += (orbitTarget.progress - orbitProgress) * smoothing;
          if (Math.abs(orbitTarget.progress - orbitProgress) < 0.0001) {
            orbitProgress = orbitTarget.progress;
          }

          const displayProgress = orbitProgress;
          const sceneProgress = clamp(
            0,
            1,
            (displayProgress - WORK_MOBILE_ORBIT_START)
              / (WORK_MOBILE_ORBIT_END - WORK_MOBILE_ORBIT_START),
          );
          const titleProgress = clamp(
            0,
            1,
            displayProgress / WORK_MOBILE_TITLE_END,
          );
          const orbitOpacity = clamp(
            0,
            1,
            (displayProgress - WORK_MOBILE_ORBIT_REVEAL_START)
              / (WORK_MOBILE_ORBIT_START - WORK_MOBILE_ORBIT_REVEAL_START),
          );
          const travel = sceneProgress * (panels.length - 1);
          const orbitStates = panels.map((_, index) => {
            const angle = ((index - travel) / panels.length) * Math.PI * 2;
            const wrappedAngle = Math.atan2(Math.sin(angle), Math.cos(angle));
            return {
              angle,
              distance: Math.abs(wrappedAngle),
              alignment: (Math.cos(angle) + 1) / 2,
            };
          });
          const active = orbitStates.reduce((closest, state, index) =>
            state.distance < orbitStates[closest].distance ? index : closest, 0);
          const nextCopyReady = orbitOpacity > 0.82
            && orbitStates[active].alignment > 0.9;
          if (nextCopyReady !== mobileCopyReady) {
            mobileCopyReady = nextCopyReady;
            section?.toggleAttribute(
              "data-work-mobile-copy-ready",
              mobileCopyReady,
            );
          }
          selectMobilePanel(active);

          gsap.set(titleTop, {
            x: `${-100 + titleProgress * 200}vw`,
          });
          gsap.set(titleBottom, {
            x: `${100 - titleProgress * 200}vw`,
          });
          gsap.set(title, {
            opacity: titleProgress > 0.82
              ? 1 - (titleProgress - 0.82) / 0.18
              : 1,
          });
          gsap.set(openingCopy, {
            opacity: 1 - clamp(0, 1, (orbitProgress - 0.08) / 0.1),
          });
          gsap.set(foot, { opacity: orbitOpacity });

          panels.forEach((panel, index) => {
            const item = media[index];
            if (!item) return;

            const { angle, alignment } = orbitStates[index];
            const adjustedDepth = Math.pow(alignment, 1.35);
            const orbitX = Math.sin(angle) * geometry.radiusX;
            const orbitY = Math.sin(angle) * geometry.radiusY
              - (1 - alignment) * geometry.radiusY * 0.85;
            const selectedScale = index === active ? 1.025 : 1;

            gsap.set(item, {
              xPercent: -50,
              yPercent: -50,
              x: orbitX,
              y: orbitY,
              scale: gsap.utils.interpolate(0.48, selectedScale, adjustedDepth),
              rotationY: Math.sin(angle) * -12,
              rotationZ: Math.sin(angle) * 1.8,
              opacity: gsap.utils.interpolate(0.16, 1, adjustedDepth)
                * orbitOpacity,
              filter: `blur(${gsap.utils.interpolate(5.5, 0, adjustedDepth)}px) brightness(${gsap.utils.interpolate(0.42, 1, adjustedDepth)})`,
              zIndex: Math.round(adjustedDepth * 1000),
            });
          });

          if (
            sceneIsNear
            || Math.abs(orbitTarget.progress - orbitProgress) > 0.0001
          ) {
            return;
          }
          stopMobileTicker();
        }

        measure();
        renderMobileOrbit();
        cleanups.push(stopMobileTicker);

        const mobileTrigger = ScrollTrigger.create({
          id: "work-focus-mobile-orbit",
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.round(window.innerHeight * WORK_MOBILE_SCROLL_LENGTH)}`,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            sceneIsNear = self.isActive;
            orbitTarget.progress = self.progress;
            startMobileTicker();
            renderMobileOrbit();
          },
          onUpdate: (self) => {
            orbitTarget.progress = self.progress;
            startMobileTicker();
            renderMobileOrbit();
          },
          onRefresh: (self) => {
            measure();
            orbitTarget.progress = self.progress;
            orbitProgress = self.progress;
            renderMobileOrbit();
          },
        });

        panels.forEach((panel, index) => {
          const link = panel.querySelector<HTMLElement>(".work-focus__link");
          if (!link) return;
          const onFocusIn = () => {
            const landingProgress = WORK_MOBILE_ORBIT_START
              + (index / (panels.length - 1))
                * (WORK_MOBILE_ORBIT_END - WORK_MOBILE_ORBIT_START);
            mobileTrigger.scroll(
              mobileTrigger.start
                + (mobileTrigger.end - mobileTrigger.start) * landingProgress,
            );
            orbitTarget.progress = landingProgress;
            orbitProgress = landingProgress;
            renderMobileOrbit();
          };
          link.addEventListener("focusin", onFocusIn);
          cleanups.push(() => link.removeEventListener("focusin", onFocusIn));
        });

        const refreshFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
        cleanups.push(() => window.cancelAnimationFrame(refreshFrame));

        let resizeFrame = 0;
        const onResize = () => {
          window.cancelAnimationFrame(resizeFrame);
          resizeFrame = window.requestAnimationFrame(() => {
            measure();
            renderMobileOrbit();
          });
        };
        window.addEventListener("resize", onResize, { passive: true });
        cleanups.push(() => {
          window.removeEventListener("resize", onResize);
          window.cancelAnimationFrame(resizeFrame);
        });

        return;
      }

      panels.forEach((panel) => {
        const media = panel.querySelector<HTMLElement>(".work-focus__media");
        const copy = panel.querySelector<HTMLElement>(".work-focus__copy");
        if (!media || !copy || panel.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        const panelTimeline = gsap.timeline({
          scrollTrigger: { trigger: panel, start: "top 82%", once: true },
          defaults: { ease: "power3.out" },
        });
        panelTimeline
          .from(media, {
            autoAlpha: 0,
            clipPath: "inset(8% 0% 8% 0%)",
            y: 28,
            duration: 0.85,
          })
          .from(copy, { autoAlpha: 0, y: 24, duration: 0.65 }, "-=0.45");
      });
      return;
    }

    section.setAttribute("data-work-focus-ready", "");
    section.setAttribute("data-work-orbit-ready", "");
    const firstPanel = panels[0];
    const firstMedia = firstPanel?.querySelector<HTMLElement>(".work-focus__media");
    const firstCopy = firstPanel?.querySelector<HTMLElement>(".work-focus__copy");
    if (!firstPanel || !firstMedia || !firstCopy) return;

    // Osmo source values. Timing is mapped onto scroll instead of an autonomous
    // clock, while the orbit geometry and depth interpolation stay intact.
    const radiusXMultiplier = 1;
    const radiusYMultiplier = 0;
    const blurMultiplier = 0.04;
    const minScale = 0.2;
    const minOpacity = 1;
    const minDarkness = 0.3;
    const moveDuration = 2.5;
    const staggerAmount = moveDuration * 0.03;
    const linearRotateDuration = 24;
    const tileStates = panels.map(() => ({ progress: 0 }));
    const orbitState = { rotation: 0 };

    const select = (nextIndex: number) => {
      if (nextIndex === activeIndex) return;
      activeIndex = nextIndex;
      panels.forEach((panel, index) => {
        const isActive = index === nextIndex;
        panel.setAttribute(
          "data-orbit-tiles-item-status",
          isActive ? "active" : "not-active",
        );
        if (isActive) panel.setAttribute("data-work-active", "");
        else panel.removeAttribute("data-work-active");
      });
      if (nextIndex >= 0) {
        if (count) count.textContent = `${String(nextIndex + 1).padStart(2, "0")} / 06`;
        if (activeName) activeName.textContent = names[nextIndex] ?? "";
      }
    };

    const getActiveIndex = () => tileStates.reduce((closest, state, index) => {
      const currentPosition = ((index - state.progress) % panels.length + panels.length)
        % panels.length;
      const previousPosition = (
        (closest - tileStates[closest].progress) % panels.length + panels.length
      ) % panels.length;
      const current = Math.min(currentPosition, panels.length - currentPosition);
      const previous = Math.min(previousPosition, panels.length - previousPosition);
      return current < previous ? index : closest;
    }, 0);

    const renderOrbit = () => {
      const tileWidth = panels[0].offsetWidth;
      const radiusX = tileWidth * radiusXMultiplier;
      const radiusY = tileWidth * radiusYMultiplier;
      const maxBlur = tileWidth * blurMultiplier;

      select(getActiveIndex());
      gsap.set(orbitList, { rotation: orbitState.rotation });
      gsap.set(orbitContents, { rotation: -orbitState.rotation });

      panels.forEach((panel, index) => {
        const angle = ((index - tileStates[index].progress) / panels.length)
          * Math.PI * 2;
        const depth = (Math.cos(angle) + 1) / 2;
        const adjustedDepth = Math.pow(depth, 1.3);

        gsap.set(panel, {
          x: Math.sin(angle) * radiusX,
          y: Math.cos(angle) * radiusY,
          scale: gsap.utils.interpolate(minScale, 1, adjustedDepth),
          opacity: gsap.utils.interpolate(minOpacity, 1, adjustedDepth),
          filter: `blur(${gsap.utils.interpolate(maxBlur, 0, adjustedDepth)}px) brightness(${gsap.utils.interpolate(minDarkness, 1, adjustedDepth)})`,
          zIndex: Math.round(adjustedDepth * 1000),
        });
      });
    };

    gsap.set(firstCopy, { autoAlpha: 0, y: 28 });
    gsap.set(opening, { opacity: 1 });
    gsap.set(orbitCollection, {
      opacity: 0,
      clipPath: "polygon(49.6% 0%, 50.4% 0%, 50.4% 100%, 49.6% 100%)",
    });
    gsap.set(foot, { autoAlpha: 0 });
    if (count) gsap.set(count, { autoAlpha: 0 });
    renderOrbit();

    // Source-matched title motion: start outside opposite sides, then traverse
    // the viewport under a separate scrub-.6 trigger. The local 70% entry
    // point lets both words meet before this section reaches its pin boundary.
    gsap.set(title, { yPercent: -50 });
    gsap.set(titleTop, { x: 0, xPercent: -100 });
    gsap.set(titleBottom, { x: 0, xPercent: 100 });
    const titleTimeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    titleTimeline
      .fromTo(title, { y: "-42vh" }, { y: 0, duration: 0.47 }, 0)
      .to(titleTop, { x: "100vw", duration: 1 }, 0)
      .to(titleBottom, { x: "-100vw", duration: 1 }, 0);

    ScrollTrigger.create({
      id: "work-focus-title-traverse",
      trigger: section,
      start: "top 70%",
      end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
      scrub: 0.6,
      invalidateOnRefresh: true,
      animation: titleTimeline,
    });

    const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    const orbitDuration = moveDuration * panels.length
      + staggerAmount * (panels.length - 1);

    timeline
      .to(orbitCollection, {
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: moveDuration,
        ease: "work-orbit",
      }, 0)
      .to(opening, {
        opacity: 0,
        duration: moveDuration * 0.18,
      }, moveDuration * 0.58)
      .to(firstCopy, {
        autoAlpha: 1,
        y: 0,
        duration: moveDuration * 0.18,
        ease: "power3.out",
      }, moveDuration * 0.76)
      .to([foot, count].filter(Boolean), {
        autoAlpha: 1,
        duration: moveDuration * 0.16,
        ease: "power2.out",
      }, moveDuration * 0.82)
      .to(orbitState, {
        rotation: (orbitDuration / linearRotateDuration) * 360,
        duration: orbitDuration,
        ease: "none",
        onUpdate: renderOrbit,
      }, 0);

    for (let step = 1; step < panels.length; step += 1) {
      const start = moveDuration * step;
      const previousActive = step - 1;
      const orderedIndexes = panels.map((_, index) => ({
        index,
        offset: (index - previousActive + panels.length) % panels.length,
      })).sort((a, b) => a.offset - b.offset);

      orderedIndexes.forEach(({ index }, order) => {
        timeline.to(tileStates[index], {
          progress: step,
          duration: moveDuration,
          ease: "work-orbit",
          onUpdate: renderOrbit,
        }, start + order * staggerAmount);
      });
    }

    timeline.to({}, { duration: Math.max(0, orbitDuration - timeline.duration()) });

    const trigger = ScrollTrigger.create({
      id: "work-focus-scene",
      trigger: section,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * WORK_FOCUS_SCROLL_LENGTH)}`,
      pin: stage,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.6,
      invalidateOnRefresh: true,
      animation: timeline,
      onUpdate: renderOrbit,
    });

    // The first frame is the readable server state until this scene owns it.
    timeline.progress(0);
    trigger.refresh();

    // Tab order remains the DOM order. Focusing a capability moves the pinned
    // scene to that tile's settled frame, so the focused link is also the
    // visible/active surface instead of sitting blurred outside the viewport.
    panels.forEach((panel, index) => {
      const link = panel.querySelector<HTMLElement>(".work-focus__link");
      if (!link) return;
      const onFocusIn = () => {
        const landingProgress = (index + 1) / panels.length;
        trigger.scroll(
          trigger.start + (trigger.end - trigger.start) * landingProgress,
        );
        timeline.progress(landingProgress);
        renderOrbit();
      };
      link.addEventListener("focusin", onFocusIn);
      cleanups.push(() => link.removeEventListener("focusin", onFocusIn));
    });
  }, section);

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    ctx.revert();
    section.removeAttribute("data-work-focus-ready");
    section.removeAttribute("data-work-orbit-ready");
    section.removeAttribute("data-work-mobile-ready");
    section.removeAttribute("data-work-mobile-orbit-ready");
    section.removeAttribute("data-work-mobile-copy-ready");
    stage.style.removeProperty("--work-mobile-tile-width");
    stage.style.removeProperty("--work-mobile-tile-height");
    panels.forEach((panel) => {
      panel.removeAttribute("data-work-active");
      panel.removeAttribute("data-orbit-tiles-item-status");
    });
    if (count) count.textContent = "01 / 06";
    if (activeName) activeName.textContent = names[0] ?? "Webapp";
  };
}

// 04 → 05 — Osmo Overlapping Parallax tilpasset én sammenhengende side.
// Prosess er den faktiske innkommende flaten. Arbeid trekker seg bare et kort
// stykke tilbake og mørklegges mens Prosess dekker det nedenfra.
function workProcessJourney(compact: boolean) {
  const journey = document.querySelector<HTMLElement>("[data-work-process-journey]");
  const work = document.querySelector<HTMLElement>("[data-work-process-transition]");
  const workStage = work?.querySelector<HTMLElement>("[data-work-focus-stage]");
  const process = journey?.querySelector<HTMLElement>(".process-journey");
  const shade = work?.querySelector<HTMLElement>("[data-work-exit-shade]");
  if (!journey || !work || !workStage || !process || !shade) return () => {};

  const ctx = gsap.context(() => {
    gsap.set(shade, { autoAlpha: 0 });
    journey.setAttribute("data-work-process-ready", "");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: work,
        start: compact
          ? () => ScrollTrigger.getById("work-focus-mobile-orbit")?.end
            ?? "bottom top"
          : () => `top+=${Math.round(window.innerHeight * WORK_FOCUS_SCROLL_LENGTH)} top`,
        end: "+=100%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(workStage, {
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

// 06 / System — one local, one-shot text entrance. The complete composition
// is the server/no-JS state; GSAP only settles the three visible lines and the
// short support sentence when the section is approached in ordinary flow.
function manifestoReveal(): () => void {
  const section = document.querySelector<HTMLElement>(".system-manifesto");
  if (!section) return () => {};
  // Allerede-synlig-garde: ved dyp-lasting forbi seksjonen beholdes server-
  // tilstanden (sluttilstand) — from-tweens skal ikke spille entré på nytt.
  if (section.getBoundingClientRect().top <= window.innerHeight * 0.72) return () => {};

  const lines = gsap.utils.toArray<HTMLElement>("[data-system-line]", section);
  const support = section.querySelector<HTMLElement>("[data-manifesto-support]");
  if (!lines.length) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "system-manifesto-reveal",
        trigger: section,
        start: "top 72%",
        once: true,
      },
      defaults: { ease: "power4.out" },
    });

    tl.from(lines, {
      yPercent: 160,
      duration: 1,
      stagger: 0.13,
    });

    if (support) {
      tl.from(support, {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
      }, "-=0.42");
    }
  }, section);

  return () => ctx.revert();
}

// 05 / Prosess — one compact semantic list, two deliberate compositions.
// Desktop adapts Trionn Key Facts' verified top-hinged fold in ordinary flow.
// Mobile pins the smaller deck and maps vertical progress to a measured
// horizontal journey. Without this enhancement the same list remains a native
// touch/keyboard scroll-snap deck.
function processScene(compact: boolean) {
  const stage = document.querySelector<HTMLElement>("[data-process-stage]");
  if (!stage) return () => {};

  const track = stage.querySelector<HTMLElement>("[data-process-track]");
  const viewport = stage.querySelector<HTMLElement>("[data-process-viewport]");
  const panels = gsap.utils.toArray<HTMLElement>("[data-process-surface]", stage);
  if (!track || !viewport || panels.length !== 3) return () => {};

  let activeIndex = -1;
  const setActive = (nextIndex: number) => {
    const index = Math.max(0, Math.min(panels.length - 1, nextIndex));
    if (index === activeIndex) return;
    activeIndex = index;
    panels.forEach((panel, panelIndex) => {
      panel.toggleAttribute("data-process-active", panelIndex === index);
    });
  };

  const ctx = gsap.context(() => {
    if (compact) {
      // A pinned horizontal stage is too cramped in short landscape viewports.
      // Those keep the native scroll-snap baseline instead.
      if (window.matchMedia("(max-height: 559px)").matches) return;

      stage.setAttribute("data-process-motion", "mobile");
      setActive(0);
      gsap.set(track, { x: 0, willChange: "transform" });

      const travelToLastPanel = () => {
        const lastPanel = panels.at(-1);
        if (!lastPanel) return 0;
        const lastCenter = lastPanel.offsetLeft + lastPanel.offsetWidth / 2;
        const desired = lastCenter - viewport.clientWidth / 2;
        const maximum = Math.max(0, track.scrollWidth - viewport.clientWidth);
        return -Math.min(maximum, Math.max(0, desired));
      };

      let timeline: gsap.core.Timeline;
      timeline = gsap.timeline({
        onUpdate: () => {
          const viewportRect = viewport.getBoundingClientRect();
          const viewportCenter = viewportRect.left + viewportRect.width / 2;
          const nearest = panels.reduce((closestIndex, panel, panelIndex) => {
            const closestRect = panels[closestIndex].getBoundingClientRect();
            const panelRect = panel.getBoundingClientRect();
            const closestDistance = Math.abs(closestRect.left + closestRect.width / 2 - viewportCenter);
            const panelDistance = Math.abs(panelRect.left + panelRect.width / 2 - viewportCenter);
            return panelDistance < closestDistance ? panelIndex : closestIndex;
          }, 0);
          setActive(nearest);
        },
        scrollTrigger: {
          id: "process-deck-mobile",
          trigger: stage,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 0.68)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(track, {
        x: travelToLastPanel,
        duration: 1,
        ease: "none",
      });
      return;
    }

    stage.setAttribute("data-process-motion", "desktop");
    const shortLandscape = window.matchMedia("(max-height: 520px)").matches;
    gsap.timeline({
      scrollTrigger: {
        id: "process-deck-desktop",
        trigger: stage,
        start: "top center",
        end: "top top",
        scrub: shortLandscape ? 0.65 : 2,
        invalidateOnRefresh: true,
      },
    }).fromTo(panels, {
      autoAlpha: 0,
      rotateX: shortLandscape ? -34 : -92,
      transformOrigin: "center top",
      transformPerspective: 1400,
      force3D: true,
    }, {
      autoAlpha: 1,
      rotateX: 0,
      duration: shortLandscape ? 1 : 2.65,
      stagger: { each: shortLandscape ? 0.1 : 0.6, from: "start" },
      ease: "none",
      force3D: true,
    });
  }, stage);

  return () => {
    ctx.revert();
    stage.removeAttribute("data-process-motion");
    panels.forEach((panel) => panel.removeAttribute("data-process-active"));
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

    // Effekt init-es over fordi den kan pinne scenen og påvirke layout.
    // De resterende scenene under fold lazy-init-es med 1600px forvarsel.
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = runWhenNear("[data-intro-story]", introFillScene);
      const teardownWorkCapability = eagerProcessLanding
        ? workFocusScene(window.matchMedia("(max-width: 900px)").matches)
        : runWhenNear(".work-proof", () =>
          workFocusScene(window.matchMedia("(max-width: 900px)").matches));
      const teardownWorkProcess = eagerProcessLanding
        ? workProcessJourney(window.matchMedia("(max-width: 1100px)").matches)
        : runWhenNear("[data-work-process-journey]", () =>
          workProcessJourney(window.matchMedia("(max-width: 1100px)").matches));
      const teardownManifesto = runWhenNear(".system-manifesto", manifestoReveal);
      const teardownFooter = runWhenNear(".contact-footer", footerReveals);
      return () => {
        teardownIntro();
        teardownWorkCapability();
        teardownWorkProcess();
        teardownManifesto();
        teardownFooter();
      };
    });

    // Mobile keeps Effekt in ordinary document flow, while the
    // capability wall continues with its compact one-shot reveals.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownIntro = runWhenNear("[data-intro-story]", introFillScene);
      const teardownWorkCapability = eagerProcessLanding
        ? workFocusScene(true)
        : runWhenNear(".work-proof", () => workFocusScene(true));
      const teardownWorkProcess = eagerProcessLanding
        ? workProcessJourney(true)
        : runWhenNear("[data-work-process-journey]", () => workProcessJourney(true));
      const teardownManifesto = runWhenNear(".system-manifesto", manifestoReveal);
      const teardownFooter = runWhenNear(".contact-footer", footerReveals);
      return () => {
        teardownIntro();
        teardownWorkCapability();
        teardownWorkProcess();
        teardownManifesto();
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
      lenis?.lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
      teardownFooterParallax();
      teardownOsmoParallax();
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
