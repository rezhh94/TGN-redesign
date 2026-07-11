"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { destroyLenis, initLenis } from "@/lib/motion";
import {
  initApproachPathJourney,
  initContentRevealScroll,
  initFooterParallax,
  initGlobalParallax,
  initLoopingWordsWithSelector,
  initShutterScrollTransition,
} from "@/lib/osmo-motion";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Mobile address-bar show/hide fires resize; refreshing mid-pin makes
// pinned scenes jump. Dimension changes from real rotation still refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

// 02 / Tjenester — three-part chapter. Pillars + accordion rows rise in once;
// the accordion becomes interactive and the open row composes its existing
// image pair as one primary preview plus one clipped detail.
// The bottom register stays as stable text for keyboard, AT and SEO. All
// content is SSR and readable with no JS. Teardown restores that state.
function servicesScene() {
  const section = document.querySelector<HTMLElement>("[data-build-section]");
  if (!section) return () => {};

  const cleanups: Array<() => void> = [];

  const pillars = section.querySelector<HTMLElement>("[data-build-list]");
  const accordion = section.querySelector<HTMLElement>("[data-build-accordion]");
  const rows = accordion
    ? gsap.utils.toArray<HTMLElement>("[data-build-row]", accordion)
    : [];

  if (accordion && rows.length) {
    // Enhance into an accordion — one row open at a time. Default open = first.
    section.classList.add("what-build--enhanced");
    const panelOf = (row: HTMLElement) =>
      row.querySelector<HTMLElement>("[data-build-panel]");
    const btnOf = (row: HTMLElement) =>
      row.querySelector<HTMLElement>("[data-build-toggle]");
    const previewOf = (row: HTMLElement) =>
      row.querySelector<HTMLElement>("[data-build-preview]");
    const previewItemsOf = (row: HTMLElement) =>
      gsap.utils.toArray<HTMLElement>("[data-build-preview-item]", row);

    const animatePreview = (row: HTMLElement, origin?: DOMRect) => {
      const [primary, detail] = previewItemsOf(row);
      const preview = previewOf(row);
      if (!preview || !primary || !detail) return;
      gsap.killTweensOf([preview, primary, detail]);

      // MWG 105 adaptation: the active media field snaps from 1.1 to rest with
      // the same short back.out focus response, scoped to the open accordion.
      gsap.fromTo(preview, { scale: 1.1 }, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
        clearProps: "transform",
      });

      const target = primary.getBoundingClientRect();
      const sharedStart = origin
        ? {
            x: origin.left - target.left,
            y: origin.top - target.top,
            scaleX: origin.width / Math.max(target.width, 1),
            scaleY: origin.height / Math.max(target.height, 1),
            clipPath: "inset(0% 0% 0% 0%)",
          }
        : {
            x: 0,
            y: 18,
            scaleX: 0.96,
            scaleY: 0.96,
            clipPath: "inset(0% 100% 0% 0%)",
          };

      gsap.fromTo(primary, sharedStart, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: origin ? 0.58 : 0.5,
        ease: "power3.inOut",
        clearProps: "transform",
      });

      gsap.fromTo(detail, {
        autoAlpha: 0,
        x: 28,
        y: 18,
        rotation: 2.5,
        clipPath: "inset(100% 0% 0% 0%)",
      }, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotation: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.52,
        delay: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      });
    };

    rows.forEach((row, i) => {
      const panel = panelOf(row);
      const btn = btnOf(row);
      const open = i === 0;
      if (open) row.setAttribute("data-open", "");
      else row.removeAttribute("data-open");
      btn?.setAttribute("aria-expanded", String(open));
      if (panel) gsap.set(panel, { height: open ? "auto" : 0 });
    });

    const openRow = (row: HTMLElement, origin?: DOMRect) => {
      const panel = panelOf(row);
      if (!panel) return;
      row.setAttribute("data-open", "");
      btnOf(row)?.setAttribute("aria-expanded", "true");
      gsap.set(panel, { height: "auto" });
      const h = panel.offsetHeight;
      gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: h,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        }
      );
      animatePreview(row, origin);
    };

    const closeRow = (row: HTMLElement) => {
      const panel = panelOf(row);
      if (!panel) return;
      row.removeAttribute("data-open");
      btnOf(row)?.setAttribute("aria-expanded", "false");
      gsap.fromTo(
        panel,
        { height: panel.offsetHeight },
        { height: 0, duration: 0.45, ease: "power3.inOut" }
      );
    };

    rows.forEach((row) => {
      const btn = btnOf(row);
      if (!btn) return;
      const onClick = () => {
        const isOpen = row.hasAttribute("data-open");
        if (isOpen) {
          closeRow(row);
          return;
        }
        const previous = rows.find(
          (other) => other !== row && other.hasAttribute("data-open")
        );
        const previousPrimary = previous ? previewItemsOf(previous)[0] : null;
        const origin = previousPrimary?.getBoundingClientRect();

        rows.forEach((other) => {
          if (other !== row && other.hasAttribute("data-open")) closeRow(other);
        });
        openRow(row, origin);
      };
      const onPreviewFocus = () => {
        if (row.hasAttribute("data-open")) animatePreview(row);
      };
      btn.addEventListener("click", onClick);
      btn.addEventListener("pointerenter", onPreviewFocus);
      btn.addEventListener("focusin", onPreviewFocus);
      cleanups.push(() => {
        btn.removeEventListener("click", onClick);
        btn.removeEventListener("pointerenter", onPreviewFocus);
        btn.removeEventListener("focusin", onPreviewFocus);
      });
    });

    cleanups.push(() => {
      section.classList.remove("what-build--enhanced");
      rows.forEach((row) => {
        row.removeAttribute("data-open");
        btnOf(row)?.setAttribute("aria-expanded", "true");
        const panel = panelOf(row);
        if (panel) gsap.set(panel, { clearProps: "height" });
        gsap.set(previewItemsOf(row), { clearProps: "all" });
      });
    });
  }

  // Reveal — rise 40 + fade, matching Arbeid (workProof). Explicit hidden state
  // via gsap.set (unconditional, unlike gsap.from's immediateRender which
  // ScrollTrigger was skipping here after the accordion collapse), then fade in
  // on enter. onRefresh reveals immediately if a group is already in view at
  // load, so content is never stuck hidden.
  const revealCtx = gsap.context(() => {
    const groups: Array<[string, string]> = [
      ["[data-build-list]", "[data-build-list] [data-build-row]"],
      ["[data-build-accordion]", "[data-build-accordion] [data-build-row]"],
    ];
    groups.forEach(([trigger, target]) => {
      const els = gsap.utils.toArray<HTMLElement>(target);
      if (!els.length) return;
      gsap.set(els, { autoAlpha: 0, y: 16 });
      let done = false;
      const reveal = () => {
        if (done) return;
        done = true;
        gsap.to(els, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
        });
      };
      ScrollTrigger.create({
        trigger,
        start: "top 80%",
        onEnter: reveal,
        onRefresh: (self) => {
          if (self.progress > 0) reveal();
        },
      });
    });
  }, section);
  cleanups.push(() => revealCtx.revert());

  return () => {
    for (const c of cleanups) c();
  };
}
// One-time opening scene: title lines rise, then the film and interface settle.
// FROM-tweens only — without JS everything is simply visible (no CLS).
function heroEntrance(full: boolean) {
  const titleLines = gsap.utils.toArray<HTMLElement>(".hero__title span");
  if (!titleLines.length) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(titleLines, { yPercent: 26, autoAlpha: 0, duration: 0.8, stagger: 0.09 });

  if (full) {
    tl.from(".hero__visual", { autoAlpha: 0, scale: 1.025, duration: 0.9 }, "-=0.7");
    tl.from(
      ".hero__axis, .hero__meta, .hero__scene",
      { autoAlpha: 0, y: 10, duration: 0.45, stagger: 0.05 },
      "-=0.48",
    );
  }
  tl.from(".hero__bar", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.4");
}

// 01 / Tilnærming, beat 1 — «Oppsett». The title rises in once, then the
// structure paragraph fills word by word from dim to bright as the section
// scrolls past (Monolog «fill» text — no pin, pure scrub). Words are wrapped at
// runtime; teardown restores the original markup. No-JS / PRM keep the static,
// already-filled (bright) paragraph.
function approachIntroScene() {
  const intro = document.querySelector<HTMLElement>(".approach-intro");
  if (!intro) return () => {};

  const title = intro.querySelector<HTMLElement>("[data-intro-title]");
  const fill = intro.querySelector<HTMLElement>("[data-intro-fill]");

  // Wrap each word in a span (keep whitespace intact) — the words stay real text
  // for screen readers; only their colour is animated.
  let originalFill = "";
  let words: HTMLElement[] = [];
  if (fill) {
    originalFill = fill.innerHTML;
    const text = (fill.textContent ?? "").replace(/\s+/g, " ").trim();
    fill.innerHTML = text
      .split(" ")
      .map((word) => `<span class="fill-word">${word}</span>`)
      .join(" ");
    words = gsap.utils.toArray<HTMLElement>(".fill-word", fill);
  }

  // Snap to two fixed text-strength steps — --on-dark-faint → --on-dark-strong
  // (the reference's grey → white, on-system rather than an invented alpha).
  const dim = "rgba(242, 241, 235, 0.4)";
  const bright = "rgba(242, 241, 235, 0.9)";

  const ctx = gsap.context(() => {
    if (title) {
      gsap.from(title, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: intro, start: "top 80%", once: true },
      });
    }

    if (words.length) {
      // Fill wavefront ~3 words wide (duration/stagger ratio); scrubbed to scroll
      // as the paragraph crosses the middle of the viewport.
      gsap.set(words, { color: dim });
      gsap.to(words, {
        color: bright,
        ease: "none",
        duration: 1,
        stagger: 0.35,
        scrollTrigger: {
          trigger: fill,
          start: "top 82%",
          end: "bottom 42%",
          scrub: 0.4,
        },
      });
    }
  }, intro);

  return () => {
    ctx.revert();
    if (fill) fill.innerHTML = originalFill;
  };
}

// 01 / Tilnærming, beat 2 — «Lukk gapet» (Monolog-oversatt). The statement is
// two display halves — IDÉ / LØSNING — with an image field in the gap between
// them. On desktop the block pins and the scroll scrubs the field's width from
// wide to a sliver: the halves glide together, closing the gap, while the field
// cycles through the demo frames. The lead line and payoff fade in on enter.
// Mobile stays static (a pinned horizontal headline is unstable on a narrow
// screen). No-JS / PRM keep the static SSR composite. Teardown is ctx.revert().
function approachGapScene(pin: boolean) {
  const gap = document.querySelector<HTMLElement>(".approach-gap");
  if (!gap) return () => {};

  const media = gap.querySelector<HTMLElement>("[data-gap-media]");
  const frames = gsap.utils.toArray<HTMLElement>("[data-gap-frame]", gap);
  const statement = gap.querySelector<HTMLElement>("[data-gap-title]");
  const lead = gap.querySelector<HTMLElement>("[data-gap-lead]");
  const support = gap.querySelector<HTMLElement>("[data-gap-support]");

  // Light one frame at a time — the others fade out (CSS handles the crossfade).
  const setActive = (index: number) => {
    frames.forEach((frame, i) =>
      frame.setAttribute("data-active", i === index ? "true" : "false")
    );
  };

  const ctx = gsap.context(() => {
    if (lead) {
      gsap.from(lead, {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: gap, start: "top 66%", once: true },
      });
    }
    if (support) {
      gsap.from(support, {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: gap, start: "top 58%", once: true },
      });
    }

    if (!media || !statement) {
      setActive(0);
      return;
    }

    const count = frames.length || 1;
    const onUpdate = (self: ScrollTrigger) => {
      const index = Math.min(count - 1, Math.floor(self.progress * count));
      setActive(index);
    };

    // Desktop pins the block and scrubs the close in place. Mobile follows the
    // project's bridgeScene pattern — same scrub, no pin (a pinned horizontal
    // headline jumps with the mobile address bar): the gap closes and the frames
    // cycle as the statement rises through the viewport.
    const trigger = pin
      ? { trigger: gap, start: "top top", end: "+=110%", scrub: true, pin: gap, anticipatePin: 1, invalidateOnRefresh: true, onUpdate }
      : { trigger: statement, start: "top 80%", end: "top 30%", scrub: true, invalidateOnRefresh: true, onUpdate };

    // The field height is em-relative (follows the title); its resting width is
    // ~0.82× that height (a portrait card). Function-based + invalidateOnRefresh
    // so it recomputes when the font/viewport changes. Scrubs down to a sliver.
    gsap.fromTo(
      media,
      { width: () => media.offsetHeight * 0.82 },
      { width: 2, ease: "none", scrollTrigger: trigger }
    );
  }, gap);

  return () => {
    ctx.revert();
    setActive(0);
  };
}

// 02→03 / Overlevering — Jack & AI-adaptert lagdeling without another pin.
// The two oversized decorative tracks cross in opposite directions while the
// readable lockup and image settle once. All continuous work is transform-only
// and scoped to the section's viewport pass.
function bridgeScene() {
  const section = document.querySelector<HTMLElement>(".effect-bridge");
  if (!section) return () => {};

  const lockup = section.querySelector<HTMLElement>("[data-bridge-lockup]");
  const live = section.querySelector<HTMLElement>("[data-bridge-live]");
  const scan = section.querySelector<HTMLElement>("[data-bridge-scan]");

  const ctx = gsap.context(() => {
    if (live && window.matchMedia("(min-width: 761px)").matches) {
      gsap.fromTo(live, { width: "38%", scale: 0.94 }, {
        width: "78%",
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: live, start: "top 88%", end: "bottom 34%", scrub: 0.65 },
      });
    }
    if (scan) {
      gsap.fromTo(scan, { x: 0 }, {
        x: () => Math.max((live?.offsetWidth ?? 0) - 1, 0),
        ease: "none",
        scrollTrigger: { trigger: live ?? section, start: "top 82%", end: "bottom 30%", scrub: 0.5 },
      });
    }
    if (lockup) {
      gsap.from(lockup, {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: lockup, start: "top 82%", once: true },
      });
    }
  }, section);

  return () => ctx.revert();
}

// 04 / Arbeid — én koordinert montering. Fem mockupflater samles til den
// statiske capability-komposisjonen; den kompakte indeksen kommer etterpå.
// Ingen pin, per-rad-gjentakelse eller kontinuerlig parallax.
function workProof(cinematic: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};

  const stage = section.querySelector<HTMLElement>("[data-work-stage]");
  const media = gsap.utils.toArray<HTMLElement>("[data-work-media]", section);
  const lock = section.querySelector<HTMLElement>("[data-work-lock]");
  const indexItems = gsap.utils.toArray<HTMLElement>("[data-work-index] > li", section);
  if (!stage || !media.length || !cinematic) return () => {};

  const arm = (trigger: HTMLElement, play: () => void, start: string) => {
    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      play();
    };
    ScrollTrigger.create({
      trigger,
      start,
      onEnter: fire,
      onRefresh: (self) => {
        if (self.progress > 0) fire();
      },
    });
  };

  const ctx = gsap.context(() => {
    const starts = [
      { x: -72, y: 34, rotation: -2.2, scale: 0.95 },
      { x: 70, y: -26, rotation: 2.4, scale: 0.93 },
      { x: 58, y: 62, rotation: 1.5, scale: 0.94 },
      { x: -54, y: 56, rotation: -1.6, scale: 0.94 },
      { x: 14, y: -58, rotation: 2.8, scale: 0.9 },
    ];

    media.forEach((item, index) => {
      gsap.set(item, { autoAlpha: 0, ...starts[index % starts.length] });
    });
    if (lock) gsap.set(lock, { scaleX: 0, transformOrigin: "left center" });

    const stageTimeline = gsap.timeline({ paused: true });
    stageTimeline.to(media, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.085,
    });
    if (lock) {
      stageTimeline.to(lock, { scaleX: 1, duration: 0.75, ease: "power2.inOut" }, 0.42);
    }
    arm(stage, () => stageTimeline.play(), "top 76%");

    if (indexItems.length) {
      const index = section.querySelector<HTMLElement>("[data-work-index]");
      if (index) {
        gsap.set(indexItems, { autoAlpha: 0, y: 18 });
        arm(index, () => gsap.to(indexItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          ease: "power3.out",
          stagger: 0.055,
        }), "top 82%");
      }
    }
  }, section);

  return () => ctx.revert();
}

// 05 / Prosess — én koreografi etter det harde mørkt→lyst-kuttet:
// 05 / Prosess — én sammenhengende Osmo-inspirert draw-path som følger de tre
// lesbare fasene. Ingen pin eller kortstabel; no-JS / reduced motion viser hele
// systemet statisk.
function processJourney() {
  const section = document.querySelector<HTMLElement>(".process-journey");
  if (!section) return () => {};

  const path = section.querySelector<SVGPathElement>("[data-process-path]");
  const traveler = section.querySelector<HTMLElement>("[data-process-traveler]");
  const stages = gsap.utils.toArray<HTMLElement>("[data-process-stage]", section);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    if (path && !reduced) {
      gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.querySelector("[data-process-path-section]") ?? section,
          start: "top 74%",
          end: "bottom 30%",
          scrub: 0.6,
        },
      });

      if (traveler && window.matchMedia("(min-width: 901px)").matches) {
        gsap.set(traveler, { xPercent: -50, yPercent: -50 });
        gsap.to(traveler, {
          ease: "none",
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          scrollTrigger: {
            trigger: section.querySelector("[data-process-path-section]") ?? section,
            start: "top 74%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        });
      }
    }

    if (!reduced) {
      stages.forEach((stage) => {
        gsap.from(stage, {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: stage, start: "top 78%", once: true },
        });
      });
    }
  }, section);

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
    const lenis = initLenis({ lerp: 0.12 });
    lenis?.lenis.on("scroll", ScrollTrigger.update);
    const teardownOsmoReveal = initContentRevealScroll();
    const teardownOsmoParallax = initGlobalParallax();
    let teardownLoopingWords = () => {};
    let teardownShutter = () => {};
    let teardownFooterParallax = () => {};
    let teardownApproachPath = () => {};
    let footerInitFrame = 0;
    let effectCancelled = false;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = approachIntroScene();
      const teardownGap = approachGapScene(true);
      const teardownServices = servicesScene();
      const teardownBridge = bridgeScene();
      const teardownWork = workProof(window.matchMedia("(min-width: 901px)").matches);
      const teardownProcess = processJourney();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownGap();
        teardownServices();
        teardownBridge();
        teardownWork();
        teardownProcess();
      };
    });

    // Mobile keeps the same static content order. Only small one-shot reveals
    // run; the cinematic Work stage remains disabled below tablet width.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownIntro = approachIntroScene();
      const teardownGap = approachGapScene(false);
      const teardownServices = servicesScene();
      const teardownBridge = bridgeScene();
      const teardownWork = workProof(false);
      const teardownProcess = processJourney();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownGap();
        teardownServices();
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
        teardownLoopingWords = initLoopingWordsWithSelector();
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
      teardownOsmoReveal();
      teardownLoopingWords();
      teardownShutter();
      teardownApproachPath();
      teardownUtilities();
    };
  }, []);

  return null;
}
