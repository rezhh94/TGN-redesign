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
      spineItem(key)?.classList.toggle("is-active", index === active);
    });
  };

  order.forEach((key, index) => {
    gsap.set(
      [word(key), note(key)],
      index === 0 ? { autoAlpha: 1, yPercent: 0 } : { autoAlpha: 0, yPercent: 12 }
    );
  });
  setSpine(0);

  // Normalized progress where each outcome takes the stage (mid-swap points
  // of the timeline below) — drives the spine bidirectionally.
  const thresholds = [0, 0.22, 0.5, 0.78];

  const progressBar = section.querySelector<HTMLElement>("[data-effect-progress-bar]");

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
    tl.to([word(prevKey), note(prevKey)], {
      autoAlpha: 0,
      yPercent: -10,
      duration: 0.45,
      ease: "none",
    });
    tl.fromTo(
      [word(key), note(key)],
      { autoAlpha: 0, yPercent: 12 },
      { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "none", immediateRender: false },
      ">-0.12"
    );
    tl.to({}, { duration: 1 });
  });

  return () => {
    section.classList.remove("what-improve--stage");
    order.forEach((key) => spineItem(key)?.classList.remove("is-active"));
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

// 05 / Prosess — production scene. Motion explains the machine: the unclear
// input settles out of a fog, the axis draws with scroll, each stratum sets
// calmly with its hairline and material state, and the finished output lands
// out of a mask. FROM-tweens only — fully readable without JS.
function processScene(full: boolean) {
  const section = document.querySelector<HTMLElement>(".process-layers");
  if (!section) return;

  const intro = section.querySelector<HTMLElement>("[data-process-in]");
  if (intro) {
    gsap.from(intro, {
      autoAlpha: 0,
      y: 30,
      filter: full ? "blur(14px)" : "blur(0px)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: intro, start: "top 80%", once: true },
    });
  }

  const lead = section.querySelector<HTMLElement>("[data-process-lead]");
  if (lead) {
    gsap.from(lead, {
      autoAlpha: 0,
      y: 16,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: lead, start: "top 86%", once: true },
    });
  }

  const axis = section.querySelector<HTMLElement>("[data-process-axis]");
  if (axis && full) {
    gsap.fromTo(
      axis,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: "[data-process-machine]",
          start: "top 74%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      }
    );
  }

  const stages = gsap.utils.toArray<HTMLElement>("[data-process-stage]", section);

  const activate = (index: number) => {
    stages.forEach((stage, i) => {
      stage.classList.toggle("is-active", i === index);
      stage.classList.toggle("is-dimmed", i !== index);
    });
  };

  stages.forEach((stage, index) => {
    const line = stage.querySelector<HTMLElement>("[data-stage-line]");
    const out = stage.querySelector<HTMLElement>("[data-stage-out]");
    const copy = stage.querySelectorAll<HTMLElement>(
      ".process-layers__code, .process-layers__verb, .process-layers__desc"
    );

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: stage, start: "top 82%", once: true },
    });

    if (line) {
      tl.from(line, { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "expo.out" });
    }
    if (copy.length) {
      tl.from(copy, { y: 26, autoAlpha: 0, duration: 0.6, stagger: 0.04 }, "-=0.55");
    }
    if (out) {
      tl.from(out, { x: 24, autoAlpha: 0, duration: 0.55 }, "-=0.35");
    }

    if (full) {
      ScrollTrigger.create({
        trigger: stage,
        start: "top 58%",
        end: "bottom 40%",
        onEnter: () => activate(index),
        onEnterBack: () => activate(index),
      });
    }
  });

  const outWord = section.querySelector<HTMLElement>("[data-process-out]");
  if (outWord) {
    gsap.from(outWord, {
      yPercent: 112,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: { trigger: outWord, start: "top 86%", once: true },
    });
  }

  const chainItems = section.querySelectorAll<HTMLElement>("[data-process-chain] > span");
  if (chainItems.length) {
    gsap.from(chainItems, {
      autoAlpha: 0,
      y: 10,
      duration: 0.45,
      ease: "power2.out",
      stagger: 0.06,
      scrollTrigger: { trigger: "[data-process-chain]", start: "top 90%", once: true },
    });
  }
}

// 04 / Arbeid — the standards ledger: rows rise once as they cross the
// reading band; each row's hairline draws in with it.
function ledgerReveal() {
  const rows = gsap.utils.toArray<HTMLElement>("[data-ledger-row]");
  if (!rows.length) return;

  for (const row of rows) {
    gsap.from(row, {
      y: 22,
      autoAlpha: 0,
      duration: 0.55,
      ease: "power3.out",
      scrollTrigger: { trigger: row, start: "top 86%", once: true },
    });
  }
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
      const teardownStage = effectStage(true);
      workReveal(true);
      ledgerReveal();
      processScene(true);
      manifestoReveal();
      footerReveals();
      return () => {
        teardownGhost();
        teardownStage();
      };
    });

    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      approachFill(false);
      serviceReveals();
      effectStage(false);
      workReveal(false);
      ledgerReveal();
      processScene(false);
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
