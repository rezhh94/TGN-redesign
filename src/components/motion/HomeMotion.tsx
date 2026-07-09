"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { destroyLenis, initLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Mobile address-bar show/hide fires resize; refreshing mid-pin makes
// pinned scenes jump. Dimension changes from real rotation still refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

// 02 / Tjenester — three-part chapter. Pillars + accordion rows rise in once;
// the accordion becomes interactive (one row open at a time, no images).
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

    rows.forEach((row, i) => {
      const panel = panelOf(row);
      const btn = btnOf(row);
      const open = i === 0;
      if (open) row.setAttribute("data-open", "");
      else row.removeAttribute("data-open");
      btn?.setAttribute("aria-expanded", String(open));
      if (panel) gsap.set(panel, { height: open ? "auto" : 0 });
    });

    const openRow = (row: HTMLElement) => {
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
        rows.forEach((other) => {
          if (other !== row && other.hasAttribute("data-open")) closeRow(other);
        });
        openRow(row);
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    cleanups.push(() => {
      section.classList.remove("what-build--enhanced");
      rows.forEach((row) => {
        row.removeAttribute("data-open");
        btnOf(row)?.setAttribute("aria-expanded", "true");
        const panel = panelOf(row);
        if (panel) gsap.set(panel, { clearProps: "height" });
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
      gsap.set(els, { autoAlpha: 0, y: 40 });
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

  const tracks = gsap.utils.toArray<HTMLElement>("[data-bridge-track]", section);
  const lockup = section.querySelector<HTMLElement>("[data-bridge-lockup]");
  const media = section.querySelector<HTMLElement>("[data-bridge-media]");

  const ctx = gsap.context(() => {
    if (tracks[0]) {
      gsap.fromTo(tracks[0], { xPercent: -10 }, {
        xPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.75 },
      });
    }
    if (tracks[1]) {
      gsap.fromTo(tracks[1], { xPercent: 10 }, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.75 },
      });
    }
    if (media) {
      gsap.fromTo(media, { yPercent: 12, scale: 0.92 }, {
        yPercent: -8,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 88%", end: "bottom 18%", scrub: 0.65 },
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

// 03 / Effekt — tracks the active band in the typographic signal journey.
// CSS owns layout and transitions; JS only updates focus, count and progress.
function improveScene() {
  const section = document.querySelector<HTMLElement>(".what-improve");
  if (!section) return () => {};

  const blocks = gsap.utils.toArray<HTMLElement>("[data-improve-block]", section);
  const count = section.querySelector<HTMLElement>("[data-improve-count]");
  if (!blocks.length) return () => {};

  section.classList.add("what-improve--tracked");

  const setActive = (index: number) => {
    blocks.forEach((block, i) => block.classList.toggle("is-active", i === index));
    section.dataset.improveState = String(index);
    if (count) count.textContent = String(index + 1).padStart(2, "0");
  };
  setActive(0);

  const ctx = gsap.context(() => {
    blocks.forEach((block, index) => {
      ScrollTrigger.create({
        trigger: block,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      });
    });
  }, section);

  return () => {
    ctx.revert();
    section.classList.remove("what-improve--tracked");
    section.removeAttribute("data-improve-state");
    blocks.forEach((block) => block.classList.remove("is-active"));
    if (count) count.textContent = "01";
  };
}

// 04 / Arbeid — normal-flow editorial project index. Every item is readable in
// the document; desktop adds only mild, section-local image drift and one-shot
// settling. There is no pin, active card state or scroll-jacked timeline.
function workProof(parallax: boolean) {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};
  const items = gsap.utils.toArray<HTMLElement>("[data-work-item]", section);
  if (!items.length) return () => {};

  const ctx = gsap.context(() => {
    items.forEach((item, index) => {
      const image = item.querySelector<HTMLElement>(".work-proof__media img");
      gsap.from(item, {
        y: index % 2 === 0 ? 42 : 58,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 88%", once: true },
      });

      if (image) {
        gsap.from(image, {
          scale: 1.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      }

      if (parallax && image) {
        gsap.fromTo(image, { yPercent: -4 }, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        });
      }
    });
  }, section);

  return () => ctx.revert();
}

// 05 / Prosess — static editorial steps with one-shot content reveals and a
// title decode. The system visual no longer follows scroll state or pins.
function processJourney() {
  const section = document.querySelector<HTMLElement>(".process-journey");
  if (!section) return () => {};

  const rows = gsap.utils.toArray<HTMLElement>("[data-process-step]", section);
  const system = section.querySelector<HTMLElement>("[data-process-system]");
  const tokens = gsap.utils.toArray<HTMLElement>("[data-process-token]", section);
  const progressLine = section.querySelector<HTMLElement>("[data-process-progress]");
  const decode = section.querySelector<HTMLElement>("[data-process-decode]");
  const line1 = decode?.querySelector<HTMLElement>(".process-journey__line1") ?? null;
  const line1Final = line1?.textContent ?? "Uklart inn.";
  const GLYPH = "ABCDEFGHIJKLMNOPQR#%&/()=+*0123456789";
  let rafId = 0;

  const noise = (value: string) =>
    value
      .split("")
      .map((char) =>
        char === " " || char === "."
          ? char
          : GLYPH[Math.floor(Math.random() * GLYPH.length)]
      )
      .join("");

  const scramble = (element: HTMLElement, finalText: string, durationMs: number) => {
    let startedAt = 0;
    const chars = finalText.split("");
    const frame = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / durationMs);
      const locked = Math.floor(progress * chars.length);
      element.textContent = chars
        .map((char, index) =>
          char === " " || char === "." || index < locked
            ? char
            : GLYPH[Math.floor(Math.random() * GLYPH.length)]
        )
        .join("");
      if (progress < 1) rafId = requestAnimationFrame(frame);
      else element.textContent = finalText;
    };
    rafId = requestAnimationFrame(frame);
  };

  const ctx = gsap.context(() => {
    rows.forEach((row) => {
      const parts = row.querySelectorAll<HTMLElement>(
        ".process-system__phase-meta, .process-system__phase-word, .process-system__phase h3, .process-system__phase-body, .process-system__output"
      );
      gsap.from(parts, {
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: { trigger: row, start: "top 84%", once: true },
      });
    });

    if (system && tokens.length) {
      gsap.fromTo(tokens, {
        x: (index) => (index % 3 === 0 ? -24 : index % 3 === 1 ? 18 : -10),
        y: (index) => (index % 2 === 0 ? 18 : -14),
        rotation: (index) => (index % 2 === 0 ? -2 : 2),
        opacity: 0.28,
      }, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: { trigger: system, start: "top 74%", once: true },
      });
    }

    if (system && progressLine) {
      gsap.fromTo(progressLine, { scaleX: 0 }, {
        scaleX: 1,
        duration: 1.15,
        ease: "power2.inOut",
        scrollTrigger: { trigger: system, start: "top 72%", once: true },
      });
    }

    if (decode && line1) {
      line1.textContent = noise(line1Final);
      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => scramble(line1, line1Final, 900),
      });
    }
  }, section);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    ctx.revert();
    if (line1) line1.textContent = line1Final;
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
    const teardownUtilities = setupFooterUtilities();
    const lenis = initLenis({ lerp: 0.12 });
    lenis?.lenis.on("scroll", ScrollTrigger.update);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownIntro = approachIntroScene();
      const teardownGap = approachGapScene(true);
      const teardownServices = servicesScene();
      const teardownBridge = bridgeScene();
      const teardownImprove = improveScene();
      const teardownWork = workProof(window.matchMedia("(min-width: 901px)").matches);
      const teardownProcess = processJourney();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownGap();
        teardownServices();
        teardownBridge();
        teardownImprove();
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
      const teardownImprove = improveScene();
      const teardownWork = workProof(false);
      const teardownProcess = processJourney();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownIntro();
        teardownGap();
        teardownServices();
        teardownBridge();
        teardownImprove();
        teardownWork();
        teardownProcess();
      };
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      mm.revert();
      lenis?.lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
      teardownUtilities();
    };
  }, []);

  return null;
}
