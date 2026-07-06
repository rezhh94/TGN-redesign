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

// 02 / Tjenester — every service row is static and fully open (title, meta,
// description, categories, link + image frame all visible). No toggle, no
// collapse. Rows rise in once on scroll; that is the only motion here.

// Service rows rise in once as the list enters the viewport.
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

// 01 / Tilnærming — MWG 049-adapted defying gravity. The statement pins at
// the top of its 100vh container while every runtime-wrapped letter starts
// offset downward by a random distance and scrubs back into place over
// exactly that distance — the sentence assembles as you scroll. Teardown
// restores the original markup.
function approachScene() {
  const section = document.querySelector<HTMLElement>(".approach-bridge");
  if (!section) return () => {};

  const container = section.querySelector<HTMLElement>("[data-approach-container]");
  const title = section.querySelector<HTMLElement>("[data-approach-title]");
  const support = section.querySelector<HTMLElement>("[data-approach-support]");
  if (!container || !title) return () => {};

  // Wrap every character in a span (MWG 049 util) — screen readers keep the
  // full statement via aria-label; the spans are presentation only.
  const lines = gsap.utils.toArray<HTMLElement>(".approach-bridge__line", title);
  const originals = lines.map((line) => line.innerHTML);
  title.setAttribute("aria-label", (title.textContent ?? "").replace(/\s+/g, " ").trim());
  for (const line of lines) {
    const text = line.textContent ?? "";
    line.setAttribute("aria-hidden", "true");
    line.innerHTML = text
      .split("")
      .map((char) =>
        char === " " ? '<span class="ab-letter">&nbsp;</span>' : `<span class="ab-letter">${char}</span>`
      )
      .join("");
  }

  const ctx = gsap.context(() => {
    const dist = container.clientHeight - title.clientHeight;

    ScrollTrigger.create({
      trigger: container,
      pin: title,
      start: "top top",
      end: "+=" + dist,
    });

    // NB: the reference triggers on the title, but its title sits flush with
    // the container top. Ours is offset by the fixed header, so the title
    // never reaches 'top top' — trigger on the container instead, which is
    // exactly where the pin starts.
    const letters = title.querySelectorAll<HTMLElement>(".ab-letter");
    letters.forEach((letter) => {
      const randomDistance = Math.random() * dist;
      gsap.from(letter, {
        y: randomDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=" + randomDistance,
          scrub: true,
        },
      });
    });

    if (support) {
      gsap.from(support, {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: support, start: "top 88%", once: true },
      });
    }
  }, section);

  return () => {
    ctx.revert();
    lines.forEach((line, index) => {
      line.innerHTML = originals[index];
      line.removeAttribute("aria-hidden");
    });
    title.removeAttribute("aria-label");
  };
}

// 02→03 / Overlevering — dominant "ignite" pin. On desktop the statement is
// pinned to the center of the viewport while the scroll scrubs through ~120vh;
// the first line stays dim and the second line's words burn from muted grey to
// full white in a stagger, with a subtle scale settle. On mobile there is no
// pin — the same ignite scrubs as the section crosses the viewport. Colours are
// set from JS, so no-JS / reduced-motion keep the static SSR statement.
function bridgeScene(pin: boolean) {
  const section = document.querySelector<HTMLElement>(".effect-bridge");
  if (!section) return () => {};

  const inner = section.querySelector<HTMLElement>("[data-bridge-inner]");
  const ignite = gsap.utils.toArray<HTMLElement>("[data-bridge-ignite]", section);
  if (!inner || !ignite.length) return () => {};

  const dim = "rgba(242, 241, 235, 0.2)";
  const bright = "rgba(246, 245, 241, 1)";

  const ctx = gsap.context(() => {
    // Start the second line dim; the scrub burns it to full white.
    gsap.set(ignite, { color: dim });

    const trigger = pin
      ? { trigger: section, start: "top top", end: "+=120%", scrub: 0.5, pin: inner, anticipatePin: 1, invalidateOnRefresh: true }
      : { trigger: section, start: "top 78%", end: "top 32%", scrub: 0.5 };

    const tl = gsap.timeline({ scrollTrigger: trigger });

    if (pin) {
      tl.fromTo(inner, { scale: 0.94 }, { scale: 1, ease: "none" }, 0);
    }
    tl.to(ignite, { color: bright, ease: "none", stagger: 0.5 }, 0.12);
  }, section);

  return () => ctx.revert();
}

// 03 / Effekt — stacking outcome cards. The right column's four cards stack via
// CSS position:sticky (pure layout, works with no JS). This only tracks which
// card is currently at the front and lights its index entry + un-greys its
// image. No-JS / reduced motion keep the static two-column document (cards still
// stack — that's CSS, not motion).
function improveScene() {
  const section = document.querySelector<HTMLElement>(".what-improve");
  if (!section) return () => {};

  const blocks = gsap.utils.toArray<HTMLElement>("[data-improve-block]", section);
  const dots = gsap.utils.toArray<HTMLElement>("[data-improve-dot]", section);
  if (!blocks.length) return () => {};

  section.classList.add("what-improve--tracked");

  // Only the front-most card is active at a time.
  const setActive = (index: number) => {
    blocks.forEach((block, i) => block.classList.toggle("is-active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };
  setActive(0);

  const ctx = gsap.context(() => {
    // A card becomes the front one exactly when its top reaches its own sticky
    // offset (read from the resolved CSS `top`, so it tracks the clamp + resize).
    // Scrolling up, when a card un-sticks the previous one is front again.
    blocks.forEach((block, index) => {
      ScrollTrigger.create({
        trigger: block,
        start: () => "top top+=" + (parseFloat(getComputedStyle(block).top) + 2),
        end: "max",
        onToggle: (self) => {
          if (self.isActive) setActive(index);
          else if (index > 0) setActive(index - 1);
        },
      });
    });
  }, section);

  return () => {
    ctx.revert();
    section.classList.remove("what-improve--tracked");
    blocks.forEach((block) => block.classList.remove("is-active"));
    dots.forEach((dot) => dot.classList.remove("is-active"));
  };
}

// 04 / Arbeid — "Stort proof". A vertical gallery of large stills. Each piece
// rises in once as it enters, and its image glows from dimmed grayscale to full
// colour (the .is-lit class flips the CSS filter). No pin, no auto-motion, no
// drag — the whole beat is scroll-authored. PRM / no-JS keep the static,
// full-colour vertical list.
function workProof() {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};

  const pieces = gsap.utils.toArray<HTMLElement>("[data-work-piece]", section);
  if (!pieces.length) return () => {};

  section.classList.add("work-proof--reveal");

  const ctx = gsap.context(() => {
    pieces.forEach((piece) => {
      gsap.from(piece, {
        y: 44,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: piece, start: "top 82%", once: true },
      });

      // Grayscale → colour glow, slightly later than the rise so the piece has
      // already landed when it lights.
      ScrollTrigger.create({
        trigger: piece,
        start: "top 68%",
        once: true,
        onEnter: () => piece.classList.add("is-lit"),
      });
    });
  }, section);

  return () => {
    ctx.revert();
    pieces.forEach((piece) => piece.classList.remove("is-lit"));
    section.classList.remove("work-proof--reveal");
  };
}

// 05 / Prosess — "Prosjektreisen". Three step rows stacked vertically (STEG · 0X
// + text left, large media right). A plain scroll-reveal: each row's text and
// media rise once on enter, the media pushes in from a slight over-scale, and
// the title decodes from noise. Same layout on desktop and mobile — no pin, so
// nothing to break on a tall screen. PRM / no-JS keep the static, readable
// section fully visible.
function processJourney() {
  const section = document.querySelector<HTMLElement>(".process-journey");
  if (!section) return () => {};

  const rows = gsap.utils.toArray<HTMLElement>("[data-journey-row]", section);

  // Title decode ("Uklart inn." resolves from noise). Own rAF so it can be
  // cancelled on teardown; text is restored to its final value.
  const decode = section.querySelector<HTMLElement>("[data-process-decode]");
  const line1 = decode?.querySelector<HTMLElement>(".process-journey__line1") ?? null;
  const line1Final = line1?.textContent ?? "Uklart inn.";
  const GLYPH = "ABCDEFGHIJKLMNOPQR#%&/()=+*0123456789";
  const noise = (s: string) =>
    s
      .split("")
      .map((c) => (c === " " || c === "." ? c : GLYPH[Math.floor(Math.random() * GLYPH.length)]))
      .join("");
  let rafId = 0;
  const scramble = (el: HTMLElement, finalText: string, durationMs: number) => {
    let start = 0;
    const chars = finalText.split("");
    const frame = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / durationMs);
      const locked = Math.floor(p * chars.length);
      let out = "";
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        out += c === " " || c === "." || i < locked ? c : GLYPH[Math.floor(Math.random() * GLYPH.length)];
      }
      el.textContent = out;
      if (p < 1) rafId = requestAnimationFrame(frame);
      else el.textContent = finalText;
    };
    rafId = requestAnimationFrame(frame);
  };

  const ctx = gsap.context(() => {
    rows.forEach((row) => {
      const parts = row.querySelectorAll<HTMLElement>(
        ".process-journey__step, .process-journey__heading, .process-journey__body, .process-journey__out"
      );
      gsap.from(parts, {
        y: 26,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: row, start: "top 80%", once: true },
      });

      const media = row.querySelector<HTMLElement>("[data-journey-media]");
      if (media) {
        gsap.from(media, {
          autoAlpha: 0,
          y: 42,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%", once: true },
        });
        const img = media.querySelector<HTMLElement>("img");
        if (img) {
          gsap.from(img, {
            scale: 1.12,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
          });
        }
      }
    });

    // Title decode: prefill with noise, resolve on enter (once).
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
      const teardownApproach = approachScene();
      serviceReveals();
      const teardownBridge = bridgeScene(true);
      const teardownImprove = improveScene();
      const teardownWork = workProof();
      const teardownProcess = processJourney();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownApproach();
        teardownBridge();
        teardownImprove();
        teardownWork();
        teardownProcess();
      };
    });

    // Mobile: no horizontal Prosess-pin. The rail's sideways scroll-jack is
    // clumsy on a tall narrow screen, and the production-line beat is a
    // horizontal device that leaves a dead gap when stretched vertically — so
    // mobile falls back to the static vertical list (the same clean, readable
    // mode as no-JS / reduced-motion). Everything else keeps its motion.
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownApproach = approachScene();
      serviceReveals();
      const teardownBridge = bridgeScene(false);
      const teardownImprove = improveScene();
      const teardownWork = workProof();
      const teardownProcess = processJourney();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownApproach();
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
