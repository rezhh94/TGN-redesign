"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destroyLenis, initLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ON_DARK = "242, 241, 235";

function setupServiceAccordion() {
  const list = document.querySelector<HTMLElement>("[data-build-list]");
  if (!list) return () => {};

  // Collapse without transition so the page height is final before
  // ScrollTrigger measures positions (the 400ms collapse otherwise leaves
  // late triggers with stale, unreachable start values).
  const bodies = Array.from(list.querySelectorAll<HTMLElement>("[data-build-body]"));
  for (const body of bodies) body.style.transition = "none";
  list.classList.add("what-build--enhanced");
  void list.offsetHeight;
  requestAnimationFrame(() => {
    for (const body of bodies) body.style.transition = "";
  });

  const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-build-row]"));
  const syncAria = () => {
    for (const row of rows) {
      const trigger = row.querySelector<HTMLButtonElement>("[data-build-trigger]");
      trigger?.setAttribute("aria-expanded", row.hasAttribute("data-open") ? "true" : "false");
    }
  };
  syncAria();

  const onClick = (event: Event) => {
    const trigger = (event.target as HTMLElement).closest("[data-build-trigger]");
    if (!trigger || !list.contains(trigger)) return;
    const row = trigger.closest<HTMLElement>("[data-build-row]");
    if (!row) return;

    const wasOpen = row.hasAttribute("data-open");
    for (const other of rows) other.removeAttribute("data-open");
    if (!wasOpen) row.setAttribute("data-open", "");
    syncAria();
  };

  list.addEventListener("click", onClick);
  return () => {
    list.removeEventListener("click", onClick);
    list.classList.remove("what-build--enhanced");
    for (const row of rows) {
      row.querySelector("[data-build-trigger]")?.removeAttribute("aria-expanded");
    }
  };
}

// One-time opening scene: title lines rise, then panel and bar settle.
// FROM-tweens only — without JS everything is simply visible (no CLS).
function heroEntrance(full: boolean) {
  const titleLines = gsap.utils.toArray<HTMLElement>(".hero__title span");
  if (!titleLines.length) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(titleLines, { yPercent: 26, autoAlpha: 0, duration: 0.8, stagger: 0.09 });

  if (full) {
    tl.from(".hero__visual", { autoAlpha: 0, y: 26, duration: 0.7 }, "-=0.55");
  }
  tl.from(".hero__bar", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.4");
}

// Ghost index numeral behind the service list tracks hover/open row.
function setupBuildGhost() {
  const ghost = document.querySelector<HTMLElement>("[data-build-ghost]");
  const list = document.querySelector<HTMLElement>("[data-build-list]");
  if (!ghost || !list) return () => {};

  const numberFor = (row: Element | null) =>
    row?.querySelector(".what-build__number")?.textContent?.trim() ?? null;

  const openNumber = () => numberFor(list.querySelector("[data-build-row][data-open]"));

  let current = ghost.textContent?.trim() ?? "";
  const swap = (value: string | null) => {
    if (!value || value === current) return;
    current = value;
    gsap
      .timeline()
      .to(ghost, { autoAlpha: 0, y: 18, duration: 0.16, ease: "power2.in" })
      .call(() => {
        ghost.textContent = value;
      })
      .to(ghost, { autoAlpha: 1, y: 0, duration: 0.34, ease: "power3.out" });
  };

  const onOver = (event: Event) => {
    const row = (event.target as HTMLElement).closest("[data-build-row]");
    if (row) swap(numberFor(row));
  };
  const onLeave = () => swap(openNumber());
  const onClick = () => swap(openNumber());

  swap(openNumber());
  list.addEventListener("pointerover", onOver);
  list.addEventListener("pointerleave", onLeave);
  list.addEventListener("click", onClick);
  return () => {
    list.removeEventListener("pointerover", onOver);
    list.removeEventListener("pointerleave", onLeave);
    list.removeEventListener("click", onClick);
  };
}

function approachFill(scrub: boolean) {
  const section = document.querySelector(".approach-bridge");
  if (!section) return;

  const words = gsap.utils.toArray<HTMLElement>("[data-fill-word]");
  const support = section.querySelector("[data-fill-support]");

  const tl = gsap.timeline({
    scrollTrigger: scrub
      ? { trigger: section, start: "top 78%", end: "center 42%", scrub: 0.5 }
      : { trigger: section, start: "top 70%", once: true },
  });

  tl.from(words, {
    color: `rgba(${ON_DARK}, 0.14)`,
    stagger: scrub ? 0.35 : 0.12,
    duration: scrub ? 1 : 0.7,
    ease: scrub ? "none" : "power2.out",
  });

  if (support) {
    tl.from(support, { autoAlpha: 0, y: 14, duration: scrub ? 0.6 : 0.5, ease: "power2.out" }, "<55%");
  }
}

// 02→03 / Overlevering — the handoff band: the signal rail draws from the
// "ut" register to the "inn" register, then the statement lands. Scrubbed on
// desktop (the line literally carries you across); one-time reveal on mobile.
function effectBridge(scrub: boolean) {
  const section = document.querySelector<HTMLElement>(".effect-bridge");
  if (!section) return;

  const line = section.querySelector<HTMLElement>("[data-bridge-line]");
  const registers = gsap.utils.toArray<HTMLElement>("[data-bridge-register]", section);
  const words = gsap.utils.toArray<HTMLElement>("[data-bridge-word]", section);

  const tl = gsap.timeline({
    scrollTrigger: scrub
      ? { trigger: section, start: "top 80%", end: "center 44%", scrub: 0.5 }
      : { trigger: section, start: "top 74%", once: true },
    defaults: { ease: scrub ? "none" : "power3.out" },
  });

  if (registers[0]) {
    tl.from(registers[0], { autoAlpha: 0, x: -14, duration: 0.3 });
  }
  if (line) {
    tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1 }, "<");
  }
  if (registers[1]) {
    tl.from(registers[1], { autoAlpha: 0, x: 14, duration: 0.3 }, ">-0.25");
  }
  if (words.length) {
    tl.from(words, { autoAlpha: 0, y: 22, duration: 0.5, stagger: 0.14 }, ">-0.2");
  }
}

function serviceReveals() {
  const rows = gsap.utils.toArray<HTMLElement>("[data-build-row]");
  if (!rows.length) return;

  gsap.from(rows, {
    y: 26,
    autoAlpha: 0,
    duration: 0.55,
    ease: "power3.out",
    stagger: 0.06,
    scrollTrigger: { trigger: "[data-build-list]", start: "top 82%", once: true },
  });
}

// 03 / Effekt — the page's single pinned moment. One outcome on stage at a
// time; scroll swaps FUNNET → FORSTÅTT → VALGT → MÅLT while the spine indexes
// the sequence. Non-pinned contexts get simple one-time reveals of the list.
function effectStage(pinned: boolean) {
  const section = document.querySelector<HTMLElement>(".what-improve");
  if (!section) return () => {};

  const order = ["funnet", "forstatt", "valgt", "malt"];
  const word = (key: string) =>
    section.querySelector<HTMLElement>(`[data-outcome-word][data-outcome="${key}"]`);
  const note = (key: string) =>
    section.querySelector<HTMLElement>(`[data-outcome-note="${key}"]`);
  const spineItem = (key: string) =>
    section.querySelector<HTMLElement>(`[data-spine="${key}"]`);

  if (!pinned) {
    for (const key of order) {
      const w = word(key);
      const n = note(key);
      if (w) {
        gsap.from(w, {
          color: `rgba(${ON_DARK}, 0.2)`,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: w, start: "top 80%", once: true },
        });
      }
      if (n) {
        gsap.from(n, {
          autoAlpha: 0,
          y: 18,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 86%", once: true },
        });
      }
    }
    return () => {};
  }

  section.classList.add("what-improve--stage");

  const setSpine = (active: number) => {
    order.forEach((key, index) => {
      const item = spineItem(key);
      item?.classList.toggle("is-active", index === active);
      item?.classList.toggle("is-done", index < active);
    });
  };

  // Words swap with a measured wipe (clip), notes with a quiet fade.
  const CLIP_VISIBLE = "inset(0% 0% 0% 0%)";
  const CLIP_BEFORE = "inset(0% 100% 0% 0%)";
  const CLIP_AFTER = "inset(0% 0% 0% 100%)";

  order.forEach((key, index) => {
    gsap.set(word(key), { clipPath: index === 0 ? CLIP_VISIBLE : CLIP_BEFORE });
    gsap.set(note(key), index === 0 ? { autoAlpha: 1, yPercent: 0 } : { autoAlpha: 0, yPercent: 12 });
  });
  setSpine(0);

  // Normalized progress where each outcome takes the stage (mid-swap points
  // of the timeline below) — drives the spine bidirectionally.
  const thresholds = [0, 0.22, 0.5, 0.78];

  const progressBar = section.querySelector<HTMLElement>("[data-effect-progress-bar]");
  const railFill = section.querySelector<HTMLElement>("[data-spine-rail-fill]");
  const rulerTicks = gsap.utils.toArray<HTMLElement>("[data-ruler-tick]", section);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=280%",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        let active = 0;
        for (let i = 0; i < thresholds.length; i += 1) {
          if (self.progress >= thresholds[i]) active = i;
        }
        setSpine(active);
        if (progressBar) gsap.set(progressBar, { scaleX: self.progress });
        if (railFill) gsap.set(railFill, { scaleY: self.progress });
        if (rulerTicks.length) {
          const lit = Math.round(self.progress * (rulerTicks.length - 1));
          rulerTicks.forEach((tick, index) => {
            tick.classList.toggle("is-lit", index <= lit);
          });
        }
      },
    },
  });

  // Long holds, quick controlled swaps: hold(1) → out(0.45)/in(0.55) → hold(1)
  order.forEach((key, index) => {
    if (index === 0) {
      tl.to({}, { duration: 1 });
      return;
    }
    const prevKey = order[index - 1];
    tl.to(word(prevKey), { clipPath: CLIP_AFTER, duration: 0.45, ease: "none" });
    tl.to(note(prevKey), { autoAlpha: 0, yPercent: -10, duration: 0.45, ease: "none" }, "<");
    tl.fromTo(
      word(key),
      { clipPath: CLIP_BEFORE },
      { clipPath: CLIP_VISIBLE, duration: 0.55, ease: "none", immediateRender: false },
      ">-0.12"
    );
    tl.fromTo(
      note(key),
      { autoAlpha: 0, yPercent: 12 },
      { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "none", immediateRender: false },
      "<"
    );
    tl.to({}, { duration: 1 });
  });

  return () => {
    section.classList.remove("what-improve--stage");
    order.forEach((key) => spineItem(key)?.classList.remove("is-active", "is-done"));
    rulerTicks.forEach((tick) => tick.classList.remove("is-lit"));
  };
}

function workReveal(parallax: boolean) {
  const section = document.querySelector<HTMLElement>(".work-showcase");
  if (!section) return;

  const layout = section.querySelector<HTMLElement>(".work-showcase__layout");
  const main = section.querySelector<HTMLElement>('[data-work-visual="main"]');
  const detail = section.querySelector<HTMLElement>('[data-work-visual="detail"]');
  const metaItems = section.querySelectorAll<HTMLElement>(".work-showcase__meta > *");

  if (main) {
    gsap.from(main, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: { trigger: layout ?? section, start: "top 62%", once: true },
    });
  }

  if (detail) {
    gsap.from(detail, {
      y: 44,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: layout ?? section, start: "top 52%", once: true },
    });
  }

  if (metaItems.length) {
    gsap.from(metaItems, {
      y: 16,
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.05,
      scrollTrigger: { trigger: layout ?? section, start: "top 58%", once: true },
    });
  }

  // Registration marks settle after the plates — the proof gets "approved".
  const regs = section.querySelectorAll<HTMLElement>(".work-showcase__reg");
  if (regs.length) {
    gsap.from(regs, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.05,
      scrollTrigger: { trigger: layout ?? section, start: "top 50%", once: true },
    });
  }

  if (parallax && main) {
    gsap.fromTo(
      main,
      { yPercent: 3.5 },
      {
        yPercent: -3.5,
        ease: "none",
        scrollTrigger: { trigger: layout ?? section, start: "top bottom", end: "bottom top", scrub: 0.8 },
      }
    );
  }
}

// 05 / Prosess — layer assembly stage. Desktop pins the scene and assembles
// the four-plate system object with scroll: plates fly in from a scattered
// state, the ghost "Uklart" dissolves, one phase holds the floor at a time
// and the title completes itself ("System ut."). Non-pinned contexts get the
// calm assembled flow layout with one-time reveals.
function processStage(full: boolean) {
  const section = document.querySelector<HTMLElement>(".process-stage");
  if (!section) return () => {};

  const object = section.querySelector<HTMLElement>("[data-stage-object]");
  const phases = gsap.utils.toArray<HTMLElement>("[data-stage-phase]", section);

  if (!full) {
    const head = section.querySelector<HTMLElement>(".process-stage__head");
    if (head) {
      gsap.from(head, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    }
    if (object) {
      gsap.from(object, {
        autoAlpha: 0,
        y: 34,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: object, start: "top 84%", once: true },
      });
    }
    for (const phase of phases) {
      gsap.from(phase, {
        autoAlpha: 0,
        y: 22,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: phase, start: "top 88%", once: true },
      });
    }
    return () => {};
  }

  section.classList.add("process-stage--scene");

  const plates = gsap.utils.toArray<HTMLElement>("[data-stage-plate]", section);
  const labels = plates.map((plate) =>
    plate.querySelector<HTMLElement>(".process-stage__plate-label")
  );
  const ticks = gsap.utils.toArray<HTMLElement>("[data-stage-tick]", section);
  const floor = section.querySelector<HTMLElement>("[data-stage-floor]");
  const stackShadow = section.querySelector<HTMLElement>(".process-stage__stack-shadow");
  const ghost = section.querySelector<HTMLElement>("[data-stage-ghost]");
  const titleOut = section.querySelector<HTMLElement>("[data-stage-title-out]");
  const ioIn = section.querySelector<HTMLElement>("[data-stage-io-in]");
  const ioOut = section.querySelector<HTMLElement>("[data-stage-io-out]");

  // Scattered start state — the unclear pile the scroll assembles.
  const scatter = [
    { x: -300, y: 230, rotation: -14 },
    { x: 320, y: -210, rotation: 10 },
    { x: -260, y: -250, rotation: -8 },
    { x: 350, y: 190, rotation: 14 },
  ];

  plates.forEach((plate, index) => {
    gsap.set(plate, {
      x: scatter[index].x,
      y: scatter[index].y,
      z: index * 44,
      rotation: scatter[index].rotation,
      autoAlpha: 0.3,
    });
  });
  labels.forEach((label) => label && gsap.set(label, { opacity: 0.3 }));
  phases.forEach((phase) => gsap.set(phase, { autoAlpha: 0, y: 26 }));
  if (titleOut) gsap.set(titleOut, { opacity: 0.2 });
  if (ioOut) gsap.set(ioOut, { opacity: 0.25 });
  if (floor) gsap.set(floor, { autoAlpha: 0.3 });
  if (stackShadow) gsap.set(stackShadow, { autoAlpha: 0.2 });

  // Normalized progress where each phase takes the floor (segment starts of
  // the timeline below) — drives the tick register bidirectionally.
  const thresholds = [0.06, 0.28, 0.5, 0.72];

  const setTicks = (progress: number) => {
    ticks.forEach((tick, index) => {
      tick.classList.toggle("is-active", progress >= thresholds[index]);
    });
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=260%",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => setTicks(self.progress),
    },
  });

  // Intro hold — scattered pile under the ghost word.
  tl.to({}, { duration: 0.35 });

  // The floor and the shadow pool build with the assembly across the scene.
  if (floor) tl.to(floor, { autoAlpha: 1, duration: 5, ease: "none" }, 0);
  if (stackShadow) tl.to(stackShadow, { autoAlpha: 1, duration: 5, ease: "none" }, 0);

  const plateEdges = [0.22, 0.28, 0.34, 0.45];

  phases.forEach((phase, index) => {
    if (index > 0) {
      tl.to(phases[index - 1], { autoAlpha: 0, y: -18, duration: 0.25, ease: "none" });
    }
    tl.to(phase, { autoAlpha: 1, y: 0, duration: 0.3, ease: "none" }, index > 0 ? ">-0.08" : ">");
    tl.to(
      plates[index],
      { x: 0, y: 0, rotation: 0, autoAlpha: 1, duration: 0.8, ease: "power2.inOut" },
      "<"
    );
    // Landing pulse — the plate's edge flashes as it locks into the stack.
    tl.to(
      plates[index],
      { borderColor: "rgba(242, 241, 235, 0.85)", duration: 0.12, ease: "none" },
      ">-0.12"
    );
    tl.to(plates[index], {
      borderColor: `rgba(242, 241, 235, ${plateEdges[index]})`,
      duration: 0.3,
      ease: "none",
    });
    if (labels[index]) {
      tl.to(labels[index], { opacity: 1, duration: 0.3, ease: "none" }, "<");
    }
    if (index === 0 && ghost) {
      tl.to(ghost, { autoAlpha: 0, duration: 0.75, ease: "none" }, "<");
    }
    tl.to({}, { duration: 0.35 });
  });

  // Finale — the stack compresses and the system locks in.
  tl.to(plates, { z: (index: number) => index * 32, duration: 0.5, ease: "power2.inOut" });
  if (titleOut) tl.to(titleOut, { opacity: 1, duration: 0.4, ease: "none" }, "<");
  if (ioOut) tl.to(ioOut, { opacity: 1, duration: 0.4, ease: "none" }, "<");
  if (ioIn) tl.to(ioIn, { opacity: 0.28, duration: 0.4, ease: "none" }, "<");
  tl.to({}, { duration: 0.3 });

  return () => {
    section.classList.remove("process-stage--scene");
    ticks.forEach((tick) => tick.classList.remove("is-active"));
  };
}

// 04 / Arbeid — the standard strip: the four commitments rise once as one
// colophon band crossing the reading line.
function specsReveal() {
  const items = gsap.utils.toArray<HTMLElement>("[data-spec-item]");
  if (!items.length) return;

  gsap.from(items, {
    y: 20,
    autoAlpha: 0,
    duration: 0.55,
    ease: "power3.out",
    stagger: 0.07,
    scrollTrigger: { trigger: ".work-showcase__specs", start: "top 84%", once: true },
  });
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
  const corners = section.querySelectorAll(".system-manifesto__corner");

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: "top 64%", once: true },
    defaults: { ease: "power3.out" },
  });

  if (lines.length) {
    tl.from(lines, { yPercent: 108, duration: 0.8, stagger: 0.12 });
  }
  if (support) {
    tl.from(support, { autoAlpha: 0, y: 16, duration: 0.55 }, "-=0.35");
  }
  if (corners.length) {
    tl.from(corners, { autoAlpha: 0, duration: 0.45, stagger: 0.05 }, "-=0.4");
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
      copyButton.hidden = true;
    });
  }

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

export function HomeMotion() {
  useEffect(() => {
    const teardownAccordion = setupServiceAccordion();
    const teardownUtilities = setupFooterUtilities();
    const lenis = initLenis({ lerp: 0.12 });
    lenis?.lenis.on("scroll", ScrollTrigger.update);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownGhost = setupBuildGhost();
      approachFill(true);
      serviceReveals();
      effectBridge(true);
      const teardownStage = effectStage(true);
      workReveal(true);
      specsReveal();
      const teardownProcess = processStage(true);
      manifestoReveal();
      footerReveals();
      return () => {
        teardownGhost();
        teardownStage();
        teardownProcess();
      };
    });

    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      approachFill(false);
      serviceReveals();
      effectBridge(false);
      effectStage(false);
      workReveal(false);
      specsReveal();
      processStage(false);
      manifestoReveal();
      footerReveals();
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      mm.revert();
      lenis?.lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
      teardownAccordion();
      teardownUtilities();
    };
  }, []);

  return null;
}
