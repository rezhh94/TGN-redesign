"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";
import { destroyLenis, initLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText, Observer);

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

// 03 / Effekt — MWG 097-adapted tightening word lines. The content column
// is split into lines/words at runtime (after fonts load, so line breaks
// are final); every line is parked fully justified across the container
// width and a scrubbed tween pulls each word back to x:0 as the line
// crosses the viewport — the copy tightens back into focus. Not pinned.
// Teardown reverts the splits so the original SSR text is restored.
function improveScene() {
  const section = document.querySelector<HTMLElement>(".what-improve");
  if (!section) return () => {};

  const container = section.querySelector<HTMLElement>("[data-improve-container]");
  const content = section.querySelector<HTMLElement>("[data-improve-content]");
  if (!container || !content) return () => {};

  let cancelled = false;
  const splits: SplitText[] = [];
  const ctx = gsap.context(() => {}, section);

  const setup = () => {
    if (cancelled) return;
    ctx.add(() => {
      const paragraphs = gsap.utils.toArray<HTMLElement>(
        "[data-improve-content] > *",
        section
      );
      for (const paragraph of paragraphs) {
        splits.push(
          SplitText.create(paragraph, {
            type: "lines, words",
            linesClass: "wi-line",
            wordsClass: "wi-word",
          })
        );
      }

      const lines = gsap.utils.toArray<HTMLElement>(".wi-line", section);
      const containerWidth = container.clientWidth;
      const containerRect = container.getBoundingClientRect();

      for (const line of lines) {
        const words = Array.from(line.querySelectorAll<HTMLElement>(".wi-word"));

        const totalWordsWidth = words.reduce(
          (acc, word) => acc + word.getBoundingClientRect().width,
          0
        );
        const gaps = words.length - 1;
        const freeSpace = Math.max(containerWidth - totalWordsWidth, 0);
        const gapSize = gaps > 0 ? freeSpace / gaps : 0;

        let targetLeft = 0;
        words.forEach((word, index) => {
          const rect = word.getBoundingClientRect();
          const currentLeft = rect.left - containerRect.left;
          gsap.set(word, { x: targetLeft - currentLeft });
          targetLeft += rect.width + (index < words.length - 1 ? gapSize : 0);
        });

        gsap.to(words, {
          x: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: line, start: "top bottom", end: "top 60%", scrub: 0.2 },
        });
      }
    });
  };

  // Split only when line breaks are final.
  (document.fonts?.ready ?? Promise.resolve()).then(setup);

  return () => {
    cancelled = true;
    ctx.revert();
    for (const split of splits) split.revert();
  };
}

// 04 / Arbeid — MWG 008-adapted draggable carousel. The track holds every
// card twice; x is wrapped over half its width for a seamless infinite loop,
// a gsap.ticker drives a slow auto-scroll and an Observer lets the user drag
// it — with a small tilt/scale "wow" while pressed. No pin, no page-scroll
// takeover. PRM / no-JS keep the plain scrollable strip.
function workCarousel() {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};

  const carousel = section.querySelector<HTMLElement>("[data-work-carousel]");
  const track = section.querySelector<HTMLElement>("[data-work-track]");
  const cards = gsap.utils.toArray<HTMLElement>(".work-proof__card", section);
  if (!carousel || !track || cards.length < 2) return () => {};

  section.classList.add("work-proof--drag");

  const cardsLength = cards.length / 2;
  const half = track.clientWidth / 2;
  const wrap = gsap.utils.wrap(-half, 0);

  let total = 0;
  const xTo = gsap.quickTo(track, "x", {
    duration: 0.5,
    ease: "power3",
    modifiers: { x: gsap.utils.unitize(wrap) },
  });

  // A precomputed random offset per card for the press "wow".
  const itemValues: number[] = [];
  for (let i = 0; i < cardsLength; i++) {
    itemValues.push((Math.random() - 0.5) * 20);
  }

  const pressTl = gsap.timeline({ paused: true });
  pressTl.to(cards, {
    rotate: (index: number) => itemValues[index % cardsLength],
    xPercent: (index: number) => itemValues[index % cardsLength],
    yPercent: (index: number) => itemValues[index % cardsLength],
    scale: 0.95,
    duration: 0.5,
    ease: "back.inOut(3)",
  });

  const observer = Observer.create({
    target: carousel,
    type: "pointer,touch",
    onPress: () => pressTl.play(),
    onDrag: (self) => {
      total += self.deltaX;
      xTo(total);
    },
    onRelease: () => pressTl.reverse(),
    onStop: () => pressTl.reverse(),
  });

  const tick = (_time: number, deltaTime: number) => {
    total -= deltaTime / 10;
    xTo(total);
  };
  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    observer.kill();
    pressTl.kill();
    gsap.set(track, { clearProps: "x,transform" });
    gsap.set(cards, { clearProps: "transform,rotate,scale" });
    section.classList.remove("work-proof--drag");
  };
}

// 05 / Prosess — MWG 073-adapted horizontal timeline. The 500vh pin-height
// wrapper is the trigger; the rail is pinned and pulled left until exactly
// one viewport remains (xPercent -100 + x innerWidth). Each giant index
// numeral gets two scrubbed hinge tweens driven by containerAnimation:
// it arrives from the top edge as its panel enters (left 100% → 0%) and
// exits rotated -90° along the right edge as it leaves (left 0% → -100%).
// Runs on both desktop and mobile (like the reference — the mobile layout
// only re-indents the columns in CSS). PRM/no-JS never reach this call and
// keep the static banded list.
function processStage() {
  const section = document.querySelector<HTMLElement>(".process-layers");
  if (!section) return () => {};

  // The stage class must exist before ScrollTrigger measures the runway.
  section.classList.add("process-layers--stage");

  const pinHeight = section.querySelector<HTMLElement>("[data-process-pin]");
  const rail = section.querySelector<HTMLElement>("[data-process-rail]");
  if (!pinHeight || !rail) {
    section.classList.remove("process-layers--stage");
    return () => {};
  }

  const ctx = gsap.context(() => {
    const scrollTween = gsap.to(rail, {
      xPercent: -100,
      x: () => window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        pin: rail,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.utils.toArray<HTMLElement>("[data-process-index]", section).forEach((title) => {
      // Exit hinge: as the panel crosses the viewport's left edge the
      // numeral swings -90° and lands along the right edge.
      gsap.to(title, {
        rotation: -90,
        x: () => window.innerWidth - title.offsetHeight,
        y: () => title.offsetHeight,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: title.parentElement,
          containerAnimation: scrollTween,
          start: "left 0%",
          end: "left -100%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      // Entrance hinge: mirrored — the numeral drops in from the top edge
      // while its panel crosses the viewport from the right.
      gsap.from(title, {
        rotation: 90,
        y: () => -window.innerHeight + title.offsetHeight,
        x: () => title.offsetHeight,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: title.parentElement,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "left 0%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
  }, section);

  return () => {
    ctx.revert();
    section.classList.remove("process-layers--stage");
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
      const teardownWork = workCarousel();
      const teardownProcess = processStage();
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

    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 768px)", () => {
      heroEntrance(false);
      const teardownApproach = approachScene();
      serviceReveals();
      const teardownBridge = bridgeScene(false);
      const teardownImprove = improveScene();
      const teardownWork = workCarousel();
      const teardownProcess = processStage();
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
