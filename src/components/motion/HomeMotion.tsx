"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
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

gsap.registerPlugin(ScrollTrigger, Flip, ScrambleTextPlugin);

// Mobile address-bar show/hide fires resize; refreshing mid-pin makes
// pinned scenes jump. Dimension changes from real rotation still refresh.
ScrollTrigger.config({
  ignoreMobileResize: true,
  limitCallbacks: true,
});

// 02 / Tjenester — Tigon-adaptasjon av Codrops DualWaveAnimation.
// Original mekanikk: Valentin Descombes/Codrops, MIT, commit 90dfeb2.
// Én sticky midtakse, fem lokale kubeflater og komplette lenker i to
// motgående sinusstrømmer. Ingen ScrollSmoother eller fremmed asset-livssyklus.
function servicesScene() {
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
  // Samlet viser serviceforløpet både topp-, bunn- og sideflater uten å legge
  // en ekstra full rotasjon mellom hvert lesbare stopp.
  const serviceTurnPitch = [-58, 48, -58, 0] as const;
  const serviceTurnRoll = [7, -6, 7, -5] as const;
  const mm = gsap.matchMedia();

  const ctx = gsap.context(() => {
    const createWave = (compact: boolean, mobile = false) => {
      let leftRange = 0;
      let rightRange = 0;
      let rowCenters: number[] = [];
      let minimumCubeScale = 0.003;
      let activeIndex = -1;
      let resizeFrame = 0;
      let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

      const responseDuration = mobile ? 0.2 : compact ? 0.34 : 0.56;
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
      const anchorOpacity = gsap.quickTo(anchorCopy, "opacity", {
        duration: compact ? 0.28 : 0.42,
        ease: "power2.out",
      });

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
        minimumCubeScale = 1 / Math.max(1, cubeStage.offsetWidth);
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

      const updateCube = (position: number, entranceProgress: number) => {
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
        // Én rolig sammensatt bue per service: Y eier selve 90°-skiftet, mens
        // en begrenset X/Z-bue viser flere terningflater. Både pitch og roll er
        // null i endene, så hvert godkjente service-stopp forblir uendret.
        const turnArc = Math.sin(easedProgress * Math.PI);
        const depthFactor = mobile ? 0.8 : compact ? 0.9 : 1;
        const transitionPitch = (serviceTurnPitch[fromIndex] ?? 0)
          * turnArc
          * depthFactor;
        const transitionRoll = (serviceTurnRoll[fromIndex] ?? 0)
          * turnArc
          * depthFactor;
        // NuDot-prinsippet: størrelse akselererer sent, mens rotasjonen går
        // kontinuerlig og lineært helt fra objektet bare er én CSS-piksel.
        const entranceTurn = 1 - entranceProgress;

        gsap.set(cube, {
          rotateX:
            gsap.utils.interpolate(from.rotateX, to.rotateX, easedProgress)
            + transitionPitch
            - 360 * entranceTurn,
          rotateY:
            gsap.utils.interpolate(from.rotateY, to.rotateY, easedProgress)
            - 540 * entranceTurn,
          rotateZ: transitionRoll - 42 * entranceTurn,
          scale: 1,
          transformOrigin: "50% 50%",
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
        const depthScale = progress * progress * progress;
        // Ved eksakt inngangsposisjon er ettpiksel-kuben usynlig, så den ikke
        // leses som et hvitt punktum. Den fades raskt inn idet scrollen starter;
        // størrelse og rotasjon beregnes fortsatt kontinuerlig fra progress 0.
        const entranceVisibility = progress <= 0.006
          ? 0
          : smoother(gsap.utils.clamp(0, 1, (progress - 0.006) / 0.024));

        gsap.set(cubeStage, {
          autoAlpha: entranceVisibility,
          scale: gsap.utils.interpolate(minimumCubeScale, 1, depthScale),
          transformOrigin: "50% 50%",
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
        updateColumn(leftSetters, leftRange, self.progress, 1);
        updateColumn(rightSetters, rightRange, self.progress, -1);
        const position = getServicePosition();
        const entranceProgress = updateCubeEntrance();
        updateCube(position, entranceProgress);
        setActiveRow(position);

        const edge = 0.055;
        const visibility = gsap.utils.clamp(
          0,
          1,
          Math.min(self.progress / edge, (1 - self.progress) / edge),
        );
        anchorOpacity(visibility);
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
      gsap.set(cubeStage, { autoAlpha: 0, scale: minimumCubeScale });
      gsap.set(cube, { rotateX: 0, rotateY: 0, scale: 1 });
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

    mm.add("(min-width: 901px)", () => createWave(false));
    mm.add("(min-width: 801px) and (max-width: 900px)", () => createWave(true));
    mm.add("(max-width: 800px)", () => createWave(true, true));
  }, section);

  return () => {
    mm.revert();
    ctx.revert();
  };
}

// 02 → 03 — Osmo Sticky Title Scroll adapted as an unnumbered tension bridge.
// Desktop and mobile keep one typographic stage sticky while three complete,
// server-rendered statements replace one another over the same dark video/grain
// atmosphere as 03 and 04. Reduced motion and no-JS remain readable in flow.
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

// 03 / Effekt — én delt 02→03→04-scene. Introduksjonen står på mørk flate,
// resultatfeltet blir sticky, og den samme video/grain-flaten som bærer broen og 04
// vokser frem under mockup og resultatord. Bildet bruker samme maske, zoom og
// overscan-parallax som capability-flatene. Uten JS står alt lesbart i flyt.
function homeAtmosphereStateScene() {
  const continuum = document.querySelector<HTMLElement>("[data-home-atmosphere]");
  const intro = continuum?.querySelector<HTMLElement>("[data-intro-story]");
  const services = continuum?.querySelector<HTMLElement>("[data-build-section]");
  const tension = continuum?.querySelector<HTMLElement>("[data-outcome-tension]");
  const field = continuum?.querySelector<HTMLElement>("[data-effect-field]");
  const archive = continuum?.querySelector<HTMLElement>("[data-work-archive]");
  const work = continuum?.querySelector<HTMLElement>("[data-work-process-transition]");
  const details = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-details]");
  const spotlight = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-spotlight]");
  const veil = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-veil]");
  const grain = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-grain]");
  if (
    !continuum || !intro || !services || !tension || !field || !archive || !work
    || !details || !spotlight || !veil || !grain
  ) return () => {};

  const compact = window.matchMedia("(max-width: 768px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let appliedState = "";
  let stateTweens: gsap.core.Tween[] = [];

  const clearStateTweens = () => {
    stateTweens.forEach((tween) => tween.kill());
    stateTweens = [];
  };

  const applyEarlyState = (state: string, immediate: boolean) => {
    if (reduced || !state.includes("intro") && !state.includes("services")) return;

    const values = state === "intro-focus"
      ? { details: 1, light: compact ? 0.46 : 0.58, scale: 1.04, x: -2, y: 2, veil: compact ? 0.2 : 0.16, grain: 0.32 }
      : state === "intro-services-handoff"
        ? { details: 1, light: compact ? 0.48 : 0.62, scale: 1.03, x: 0, y: 0, veil: compact ? 0.18 : 0.14, grain: 0.34 }
        : state === "services-focus"
          ? { details: 1, light: compact ? 0.58 : 0.76, scale: 1.06, x: -4, y: -4, veil: compact ? 0.12 : 0.08, grain: 0.4 }
          : { details: 1, light: compact ? 0.52 : 0.68, scale: 1.04, x: 1, y: -2, veil: compact ? 0.16 : 0.12, grain: 0.37 };

    clearStateTweens();
    const detailVars: gsap.TweenVars = { autoAlpha: values.details, overwrite: "auto" };
    const spotlightVars: gsap.TweenVars = {
        autoAlpha: values.light,
        scale: values.scale,
        xPercent: values.x,
        yPercent: values.y,
        ease: "power2.out",
        overwrite: "auto",
      };
    const veilVars: gsap.TweenVars = {
      autoAlpha: values.veil,
      ease: "power2.out",
      overwrite: "auto",
    };
    const grainVars: gsap.TweenVars = {
      autoAlpha: values.grain,
      ease: "power2.out",
      overwrite: "auto",
    };

    if (immediate) {
      gsap.set(details, detailVars);
      gsap.set(spotlight, spotlightVars);
      gsap.set(veil, veilVars);
      gsap.set(grain, grainVars);
      return;
    }

    stateTweens = [
      gsap.to(details, { ...detailVars, duration: 0.8 }),
      gsap.to(spotlight, { ...spotlightVars, duration: 0.8 }),
      gsap.to(veil, { ...veilVars, duration: 0.8 }),
      gsap.to(grain, { ...grainVars, duration: 0.8 }),
    ];
  };

  let frame = 0;
  const check = () => {
    frame = 0;
    const viewport = window.innerHeight;
    const introRect = intro.getBoundingClientRect();
    const servicesRect = services.getBoundingClientRect();
    const tensionRect = tension.getBoundingClientRect();
    const fieldRect = field.getBoundingClientRect();
    const archiveRect = archive.getBoundingClientRect();
    const workRect = work.getBoundingClientRect();

    let state = "intro-focus";
    if (workRect.bottom <= viewport * 1.04) state = "exit";
    else if (archiveRect.top <= viewport * 0.7) state = "work-focus";
    else if (fieldRect.bottom <= viewport * 1.05) state = "handoff";
    else if (fieldRect.top <= viewport * 0.9) state = "effect-focus";
    else if (tensionRect.top <= viewport * 0.82) state = "services-effect-handoff";
    else if (servicesRect.top <= viewport * 0.82) state = "services-focus";
    else if (introRect.bottom <= viewport * 1.08) state = "intro-services-handoff";

    if (appliedState !== state) {
      continuum.dataset.atmosphereState = state;
      applyEarlyState(state, !appliedState);
      if (!state.includes("intro") && !state.includes("services")) clearStateTweens();
      appliedState = state;
    }
  };

  const requestCheck = () => {
    if (!frame) frame = window.requestAnimationFrame(check);
  };

  window.addEventListener("scroll", requestCheck, { passive: true });
  window.addEventListener("resize", requestCheck);
  ScrollTrigger.addEventListener("refresh", requestCheck);
  check();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", requestCheck);
    window.removeEventListener("resize", requestCheck);
    ScrollTrigger.removeEventListener("refresh", requestCheck);
    clearStateTweens();
    continuum.dataset.atmosphereState = "intro-focus";
  };
}

function effectScene() {
  const section = document.querySelector<HTMLElement>("[data-effect-section]");
  const continuum = document.querySelector<HTMLElement>("[data-home-atmosphere]");
  const field = section?.querySelector<HTMLElement>("[data-effect-field]");
  const stage = section?.querySelector<HTMLElement>("[data-effect-stage]");
  const visual = section?.querySelector<HTMLElement>("[data-effect-visual]");
  const image = visual?.querySelector<HTMLElement>("img");
  const details = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-details]");
  const spotlight = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-spotlight]");
  const veil = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-veil]");
  const grain = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-grain]");
  if (!section || !continuum || !field || !stage || !visual || !image || !veil) {
    return () => {};
  }

  const outcomes = gsap.utils.toArray<HTMLElement>("[data-effect-outcome]", section);
  const markers = gsap.utils.toArray<HTMLElement>("[data-effect-marker]", section);
  const closing = section.querySelector<HTMLElement>("[data-effect-closing]");
  const mutedCopy = section.querySelectorAll<HTMLElement>(
    ".what-improve__outcome header, .what-improve__outcome-copy p:last-child",
  );
  const bodyCopy = section.querySelectorAll<HTMLElement>(
    ".what-improve__outcome-copy p:first-child",
  );
  if (!markers.length || outcomes.length < 4) return () => {};

  const matchMedia = gsap.matchMedia();

  matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
    const compact = window.matchMedia("(max-width: 900px)").matches;
    const ctx = gsap.context(() => {
      const atmosphere = gsap.timeline({
        scrollTrigger: {
          trigger: field,
          start: compact ? "top 92%" : "top bottom",
          end: compact ? "bottom 34%" : "bottom bottom",
          scrub: compact ? 0.22 : 0.55,
          invalidateOnRefresh: true,
        },
      });

      if (details && !compact) {
        atmosphere.to(details, { autoAlpha: 0.9, duration: 0.34, ease: "none" }, 0.08);
      }
      if (spotlight) {
        atmosphere.to(spotlight, {
          autoAlpha: compact ? 0.44 : 0.86,
          scale: 1,
          xPercent: 0,
          yPercent: compact ? -2 : -4,
          duration: 0.52,
          ease: "none",
        }, 0.1);
      }
      if (grain && !compact) {
        atmosphere.to(grain, { autoAlpha: 0.39, duration: 0.3, ease: "none" }, 0.16);
      }

      atmosphere
        .to(veil, { autoAlpha: compact ? 0.34 : 0.08, duration: 0.5, ease: "none" }, 0.18)
        .to(stage, { color: "#f2f1eb", duration: 0.3, ease: "none" }, 0.53)
        .to(outcomes, { borderColor: "rgba(242, 241, 235, 0.28)", duration: 0.3, ease: "none" }, 0.53)
        .to(bodyCopy, { color: "rgba(242, 241, 235, 0.82)", duration: 0.3, ease: "none" }, 0.53)
        .to(mutedCopy, { color: "rgba(242, 241, 235, 0.54)", duration: 0.3, ease: "none" }, 0.53)
        .to(closing, { color: "rgba(242, 241, 235, 0.62)", duration: 0.3, ease: "none" }, 0.53);

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
    }, continuum);

    return () => {
      ctx.revert();
    };
  });

  return () => matchMedia.revert();
}

// 03 → 04 — nudot-grep: ingen mellomtittel. Broen er en kort, scrubbet
// lysovergang der sløret mørkner 04-flaten mens atmosfæren roes ned.
// «Dette kan Tigon lage» finnes ett sted: som arkivtittelen i selve 04.
function effectWorkJourney(compact: boolean) {
  const journey = document.querySelector<HTMLElement>("[data-effect-work-journey]");
  const continuum = document.querySelector<HTMLElement>("[data-home-atmosphere]");
  const archive = journey?.querySelector<HTMLElement>("[data-work-archive]");
  const details = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-details]");
  const spotlight = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-spotlight]");
  const veil = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-veil]");
  const grain = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-grain]");
  const wave = continuum?.querySelector<HTMLVideoElement>("[data-home-atmosphere-wave]");
  if (!journey || !continuum || !archive || !veil) return () => {};

  journey.setAttribute("data-effect-work-ready", "");

  const ctx = gsap.context(() => {
    const handoff = gsap.timeline({
      scrollTrigger: {
        trigger: archive,
        start: compact ? "top 92%" : "top bottom",
        end: compact ? "top 34%" : "top 28%",
        scrub: compact ? 0.24 : 0.7,
        invalidateOnRefresh: true,
      },
    });

    if (details) {
      handoff.to(details, { autoAlpha: compact ? 1 : 0.72, ease: "none" }, 0);
    }
    if (spotlight) {
      handoff.to(spotlight, {
        autoAlpha: compact ? 0.44 : 0.72,
        scale: compact ? 1.04 : 1.14,
        xPercent: 0,
        yPercent: compact ? -3 : -7,
        ease: "none",
      }, 0);
    }
    if (wave && !compact) {
      handoff.to(wave, { opacity: 0.3, scale: 1.07, ease: "none" }, 0);
    }
    if (grain && !compact) {
      handoff.to(grain, { autoAlpha: 0.34, ease: "none" }, 0);
    }
    handoff.to(veil, { autoAlpha: compact ? 0.32 : 0.18, ease: "none" }, 0);
  }, continuum);

  return () => {
    journey.removeAttribute("data-effect-work-ready");
    ctx.revert();
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

// 01 / Tilnærming — direkte seksjonsavgrenset adaptasjon av Codrops
// ScrollTextMotion: samme posisjonsklasser, Flip-passering og scramble-logikk.
function introStoryScene() {
  const section = document.querySelector<HTMLElement>("[data-intro-story]");
  if (!section) return () => {};

  const textElements = gsap.utils.toArray<HTMLElement>(".el", section);
  const logoBlock = section.querySelector<HTMLElement>(".logo__block");
  const support = section.querySelector<HTMLElement>(".approach-intro__preserved");
  const handoff = section.querySelector<HTMLElement>("[data-intro-handoff]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!textElements.length) return () => {};

  textElements.forEach((element) => {
    const textTarget = element.querySelector<HTMLElement>(".el__text") ?? element;
    textTarget.dataset.text = textTarget.textContent ?? "";
  });
  const scrambleTweens = new WeakMap<HTMLElement, gsap.core.Tween>();
  let clearanceFrame = 0;
  section.setAttribute("data-intro-clearance-ready", "");

  const updateClearance = () => {
    clearanceFrame = 0;
    if (!logoBlock) return;

    const block = logoBlock.getBoundingClientRect();
    const protectedRect = {
      left: block.left - 30,
      right: block.right + 30,
      top: block.top - 24,
      bottom: block.bottom + 24,
    };
    const feather = 72;

    textElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const horizontalGap = Math.max(
        protectedRect.left - rect.right,
        rect.left - protectedRect.right,
        0,
      );
      const verticalGap = Math.max(
        protectedRect.top - rect.bottom,
        rect.top - protectedRect.bottom,
        0,
      );
      const distance = Math.hypot(horizontalGap, verticalGap);
      const clearance = horizontalGap === 0 && verticalGap === 0
        ? 0
        : gsap.utils.clamp(0, 1, distance / feather);
      element.style.setProperty("--intro-clearance", clearance.toFixed(3));
    });
  };

  const requestClearance = () => {
    if (!clearanceFrame) clearanceFrame = window.requestAnimationFrame(updateClearance);
  };

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: requestClearance,
      onEnterBack: requestClearance,
      onUpdate: requestClearance,
      onRefresh: requestClearance,
    });

    textElements.forEach((element) => {
      if (reduced) return;

      gsap.set(element, { clearProps: "transform,filter" });

      const originalClass = [...element.classList].find((name) => name.startsWith("pos-"));
      const targetClass = element.dataset.altPos;
      const flipEase = element.dataset.flipEase || "expo.inOut";
      if (!originalClass || !targetClass) return;

      element.classList.add(targetClass);
      element.classList.remove(originalClass);
      const flipState = Flip.getState(element, { props: "filter,width" });
      element.classList.add(originalClass);
      element.classList.remove(targetClass);

      Flip.to(flipState, {
        ease: flipEase,
        scrollTrigger: {
          trigger: element,
          start: "clamp(bottom bottom-=10%)",
          end: "clamp(center center)",
          scrub: true,
        },
      });

      Flip.from(flipState, {
        ease: flipEase,
        scrollTrigger: {
          trigger: element,
          start: "clamp(center center)",
          end: "clamp(top top)",
          scrub: true,
        },
      });

      const scramble = () => {
        const textTarget = element.querySelector<HTMLElement>(".el__text") ?? element;
        const text = textTarget.dataset.text ?? textTarget.textContent ?? "";
        const duration = textTarget.dataset.scrambleDuration
          ? Number.parseFloat(textTarget.dataset.scrambleDuration)
          : 1;

        scrambleTweens.get(textTarget)?.kill();
        const scrambleTween = gsap.fromTo(
          textTarget,
          { scrambleText: { text: "", chars: "" } },
          {
            scrambleText: { text, chars: "upperAndLowerCase" },
            duration,
          },
        );
        scrambleTweens.set(textTarget, scrambleTween);
      };

      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        onEnter: scramble,
        onEnterBack: scramble,
      });
    });

    if (!reduced) {
      if (logoBlock && support) {
        gsap.fromTo(
          logoBlock,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: support,
              start: "top 72%",
              end: "top 50%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const detailTimeline = gsap.timeline({
        scrollTrigger: { trigger: support ?? section, start: "clamp(top 84%)", once: true },
        defaults: { ease: "power3.out" },
      });
      if (support) detailTimeline.from(support, { autoAlpha: 0, y: 20, duration: 0.6 }, 0);
      if (handoff) detailTimeline.from(handoff, { autoAlpha: 0, y: 12, duration: 0.5 }, 0.16);
    }
  }, section);

  return () => {
    window.cancelAnimationFrame(clearanceFrame);
    section.removeAttribute("data-intro-clearance-ready");
    textElements.forEach((element) => element.style.removeProperty("--intro-clearance"));
    ctx.revert();
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

    // Broens tittel-exit eies av effectWorkJourney (handoff-tidslinjen der);
    // arkivscenen rører ikke broens elementer.

    // Entré: maskede ord stiger opp én gang, timet til at broens linjer er
    // halvveis ute (handoff-tidslinjen i effectWorkJourney) — samme utsagn
    // vender om fra liten bro-tittel til monumental arkivtittel.
    // Ved dyp-lasting midt i seksjonen står alt ferdig uten animasjon.
    const alreadyPast =
      archive.getBoundingClientRect().top <= window.innerHeight * 0.85;
    if (words.length && !alreadyPast) {
      gsap.set(words, { yPercent: 130 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: archive, start: "top 85%", once: true },
      });
    }
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
  const continuum = document.querySelector<HTMLElement>("[data-home-atmosphere]");
  const backdrop = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-backdrop]");
  const grain = continuum?.querySelector<HTMLElement>("[data-home-atmosphere-grain]");
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
    if (grain) {
      timeline.to(grain, { autoAlpha: 0, duration: 0.42, ease: "none" }, 0.12);
    }
    if (backdrop) {
      timeline.to(backdrop, { autoAlpha: 0, duration: 0.55, ease: "none" }, 0.2);
    }
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
    const teardownAtmosphereState = homeAtmosphereStateScene();
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

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = introStoryScene();
      const teardownTension = outcomeTensionBridge();
      const teardownEffectWork = effectWorkJourney(false);
      const teardownWorkArchive = workArchiveScene(
        window.matchMedia("(max-width: 1000px)").matches,
      );
      const teardownWorkProcess = workProcessJourney(
        window.matchMedia("(max-width: 1100px)").matches,
      );
      const teardownProcess = processScene(false);
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownTension();
        teardownEffectWork();
        teardownWorkArchive();
        teardownWorkProcess();
        teardownProcess();
      };
    });

    // Mobile keeps the same 03→04 typographic page turn, while the capability
    // wall itself stays in ordinary document flow with small one-shot reveals.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownIntro = introStoryScene();
      const teardownTension = outcomeTensionBridge();
      const teardownEffectWork = effectWorkJourney(true);
      const teardownWorkArchive = workArchiveScene(true);
      const teardownWorkProcess = workProcessJourney(true);
      const teardownProcess = processScene(true);
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownTension();
        teardownEffectWork();
        teardownWorkArchive();
        teardownWorkProcess();
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
      teardownAtmosphereState();
      teardownShutter();
      teardownApproachPath();
      teardownSectionTheme();
      teardownWorkCursor();
      teardownUtilities();
    };
  }, []);

  return null;
}
