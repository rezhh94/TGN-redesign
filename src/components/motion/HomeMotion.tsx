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

function effectSequence(pinned: boolean) {
  const section = document.querySelector<HTMLElement>(".what-improve");
  if (!section) return;

  const order = ["funnet", "forstatt", "valgt", "malt"];
  const word = (key: string) =>
    section.querySelector<HTMLElement>(`[data-outcome-word][data-outcome="${key}"]`);
  const annotation = (key: string) =>
    section.querySelector<HTMLElement>(`.what-improve__annotation--${key}`);

  if (!pinned) {
    for (const key of order) {
      const w = word(key);
      const a = annotation(key);
      if (!w || !a) continue;
      gsap.from(w, {
        color: `rgba(${ON_DARK}, 0.2)`,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: w, start: "top 78%", once: true },
      });
      gsap.from(a, {
        autoAlpha: 0,
        y: 18,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: a, start: "top 84%", once: true },
      });
    }
    return;
  }

  // The page's single pinned moment: scroll drives the sequence —
  // found before understood before chosen before measured.
  gsap.set(
    order.map(word),
    { color: `rgba(${ON_DARK}, 0.18)` }
  );
  gsap.set(
    order.map(annotation),
    { autoAlpha: 0.15, y: 10 }
  );

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=220%",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  order.forEach((key, index) => {
    const w = word(key);
    const a = annotation(key);
    if (!w || !a) return;

    const at = index === 0 ? 0.15 : `>+0.25`;
    tl.to(w, { color: `rgba(${ON_DARK}, 0.94)`, duration: 1, ease: "none" }, at);
    tl.to(a, { autoAlpha: 1, y: 0, duration: 0.6, ease: "none" }, "<");

    if (index > 0) {
      const prev = word(order[index - 1]);
      if (prev) tl.to(prev, { color: `rgba(${ON_DARK}, 0.58)`, duration: 0.8, ease: "none" }, "<");
    }
  });

  // settle: brief tail so the last state can be read before unpinning
  tl.to({}, { duration: 0.5 });

  // The canvas is taller than the viewport on most screens; while pinned the
  // bottom words (MÅLT) would sit below the fold for the whole sequence.
  // Drift the inner content up by exactly the overflow across the scrub so
  // each word is on screen when its turn comes.
  const inner = section.querySelector<HTMLElement>(".what-improve__inner");
  if (inner) {
    tl.to(
      inner,
      {
        y: () => -Math.max(0, section.offsetHeight - window.innerHeight),
        duration: tl.duration(),
        ease: "none",
      },
      0
    );
  }
}

function workReveal(parallax: boolean) {
  const section = document.querySelector<HTMLElement>(".work-showcase");
  if (!section) return;

  const main = section.querySelector<HTMLElement>('[data-work-visual="main"]');
  const detail = section.querySelector<HTMLElement>('[data-work-visual="detail"]');
  const metaItems = section.querySelectorAll<HTMLElement>(".work-showcase__meta > *");

  if (main) {
    gsap.from(main, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: { trigger: section, start: "top 62%", once: true },
    });
  }

  if (detail) {
    gsap.from(detail, {
      y: 44,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 52%", once: true },
    });
  }

  if (metaItems.length) {
    gsap.from(metaItems, {
      y: 16,
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.05,
      scrollTrigger: { trigger: section, start: "top 58%", once: true },
    });
  }

  if (parallax && main) {
    gsap.fromTo(
      main,
      { yPercent: 3.5 },
      {
        yPercent: -3.5,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
      }
    );
  }
}

function processStack(full: boolean) {
  const layers = gsap.utils.toArray<HTMLElement>("[data-process-layer]");
  if (!layers.length) return;

  const activate = (index: number) => {
    layers.forEach((layer, i) => {
      layer.classList.toggle("is-active", i === index);
      layer.classList.toggle("is-dimmed", i !== index);
    });
  };

  layers.forEach((layer, index) => {
    gsap.from(layer, {
      y: full ? 64 : 32,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: layer, start: "top 86%", once: true },
    });

    if (full) {
      ScrollTrigger.create({
        trigger: layer,
        start: "top 62%",
        end: "bottom 38%",
        onEnter: () => activate(index),
        onEnterBack: () => activate(index),
      });
    }
  });
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

export function HomeMotion() {
  useEffect(() => {
    const teardownAccordion = setupServiceAccordion();
    const lenis = initLenis({ lerp: 0.12 });
    lenis?.lenis.on("scroll", ScrollTrigger.update);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      approachFill(true);
      serviceReveals();
      effectSequence(true);
      workReveal(true);
      processStack(true);
      footerReveals();
    });

    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      approachFill(false);
      serviceReveals();
      effectSequence(false);
      workReveal(false);
      processStack(false);
      footerReveals();
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      mm.revert();
      lenis?.lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
      teardownAccordion();
    };
  }, []);

  return null;
}
