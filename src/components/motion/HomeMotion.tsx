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
  const carrier = section.querySelector<HTMLElement>("[data-bridge-carrier]");
  const rail = section.querySelector<HTMLElement>(".effect-bridge__rail");
  const registers = gsap.utils.toArray<HTMLElement>("[data-bridge-register]", section);
  const words = gsap.utils.toArray<HTMLElement>("[data-bridge-word]", section);

  const tl = gsap.timeline({
    scrollTrigger: scrub
      ? { trigger: section, start: "top 80%", end: "center 44%", scrub: 0.5, invalidateOnRefresh: true }
      : { trigger: section, start: "top 74%", once: true },
    defaults: { ease: scrub ? "none" : "power3.out" },
  });

  if (registers[0]) {
    tl.from(registers[0], { autoAlpha: 0, x: -14, duration: 0.3 });
  }
  if (line) {
    tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1 }, "<");
  }
  if (carrier && rail) {
    // The finished surface rides the tip of the rail from UT to INN.
    gsap.set(carrier, { left: 0 });
    tl.fromTo(
      carrier,
      { x: 0 },
      { x: () => rail.clientWidth - 9, duration: 1, ease: scrub ? "none" : "power2.inOut" },
      "<"
    );
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

  // Measure layer — the chamber lays a dimension line over the active word
  // and re-measures on every swap. The readout carries the målepunkt.
  const measure = section.querySelector<HTMLElement>("[data-measure]");
  const measureFill = section.querySelector<HTMLElement>("[data-measure-fill]");
  const measureReadout = section.querySelector<HTMLElement>("[data-measure-readout]");
  const signals = order.map(
    (key) => note(key)?.querySelector(".what-improve__signal")?.textContent?.trim() ?? ""
  );

  let lastActive = -1;

  const stage = section.querySelector<HTMLElement>(".what-improve__stage");

  // rect-based: the words sit on translateY(-50%), which offsetTop ignores
  const layoutMeasure = (index: number) => {
    const w = word(order[index]);
    if (!measure || !w || !stage) return;
    const wordRect = w.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    gsap.set(measure, { top: wordRect.top - stageRect.top - 30, width: wordRect.width });
  };

  if (measure) {
    gsap.set(measure, { autoAlpha: 0 });
    if (measureFill) gsap.set(measureFill, { scaleX: 0 });
    layoutMeasure(0);
  }
  const remeasure = () => layoutMeasure(Math.max(lastActive, 0));
  ScrollTrigger.addEventListener("refresh", remeasure);

  const measureTo = (active: number) => {
    if (!measure) return;
    const w = word(order[active]);
    if (measureReadout && signals[active]) measureReadout.textContent = signals[active];
    if (lastActive === -1) {
      gsap.to(measure, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
    }
    if (w) {
      gsap.to(measure, {
        width: w.getBoundingClientRect().width,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (measureFill) {
      gsap.fromTo(
        measureFill,
        { scaleX: 0.25 },
        { scaleX: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }
      );
    }
  };

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
        if (active !== lastActive) {
          measureTo(active);
          lastActive = active;
        }
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
    ScrollTrigger.removeEventListener("refresh", remeasure);
    section.classList.remove("what-improve--stage");
    order.forEach((key) => spineItem(key)?.classList.remove("is-active", "is-done"));
    rulerTicks.forEach((tick) => tick.classList.remove("is-lit"));
  };
}

// 04 / Arbeid — split proof staged. One-time entrance: the statement words
// rise out of the monolith, the slab settles into its lean, the cuts land
// with their hard shadows. Then depth: slab and cuts drift at their own
// rates while the chapter crosses the viewport (desktop scrub only).
function workProofScene(scrub: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return;

  const words = gsap.utils.toArray<HTMLElement>(".work-proof__word", section);
  const lead = section.querySelector<HTMLElement>(".work-proof__lead");
  const link = section.querySelector<HTMLElement>(".work-proof__link");
  const slab = section.querySelector<HTMLElement>(".work-proof__slab");
  const cuts = gsap.utils.toArray<HTMLElement>(".work-proof__cut", section);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: "top 64%", once: true },
    defaults: { ease: "power3.out" },
  });

  if (words.length) {
    tl.from(words, { yPercent: 34, autoAlpha: 0, duration: 0.75, stagger: 0.09 });
  }
  if (slab) {
    // The slab is laid down: arrives lower and steeper, settles into place.
    tl.from(slab, { y: 90, rotation: -5.2, autoAlpha: 0, duration: 1.1, ease: "expo.out" }, 0.15);
  }
  if (cuts.length) {
    // yPercent here — the scrub depth pass below owns plain y.
    tl.from(cuts, { yPercent: 26, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, 0.5);
  }
  if (lead) {
    tl.from(lead, { autoAlpha: 0, y: 16, duration: 0.5 }, 0.55);
  }
  if (link) {
    tl.from(link, { autoAlpha: 0, y: 12, duration: 0.45 }, 0.7);
  }

  if (!scrub) return;

  // Depth pass — the cast objects sit at different distances from the wall.
  if (slab) {
    gsap.fromTo(
      slab,
      { yPercent: 2.5 },
      {
        yPercent: -2.5,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
      }
    );
  }
  const depths = [10, 6, 14];
  cuts.forEach((cut, index) => {
    const depth = depths[index % depths.length];
    gsap.fromTo(
      cut,
      { y: depth },
      {
        y: -depth,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
      }
    );
  });
}

// 05 / Prosess — MWG 031-adapted vertical card sequence. Each content-wrapper
// pins for one viewport while the card recedes with scale, rotationX, a small
// deterministic rotationZ and then fades out.
function processStage(full: boolean) {
  const section = document.querySelector<HTMLElement>(".process-layers");
  if (!section) return () => {};

  const ctx = gsap.context(() => {
    const intro = section.querySelector<HTMLElement>("[data-process-intro]");
    const slides = gsap.utils.toArray<HTMLElement>("[data-process-slide]", section);

    if (full) {
      if (intro) {
        gsap.from(intro.children, {
          autoAlpha: 0,
          y: 22,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        });
      }

      slides.forEach((slide, index) => {
        const contentWrapper = slide.querySelector<HTMLElement>("[data-process-wrapper]");
        const content = slide.querySelector<HTMLElement>("[data-process-content]");
        if (!contentWrapper || !content) return;

        gsap.to(content, {
          rotationZ: [-2.6, 2.2, -1.6, 2.8][index] ?? 0,
          scale: 0.7,
          rotationX: 40,
          ease: "power1.in",
          scrollTrigger: {
            pin: contentWrapper,
            trigger: slide,
            start: "top 0%",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(content, {
          autoAlpha: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: content,
            start: "top -80%",
            end: () => `+=${0.2 * window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      return;
    }

    slides.forEach((slide) => {
      gsap.from(slide, {
        autoAlpha: 0,
        y: 26,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: {
          trigger: slide,
          start: "top 88%",
          once: true,
        },
      });
    });
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
      workProofScene(true);
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
      workProofScene(false);
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
