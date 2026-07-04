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

// 02→03 / Overlevering — MWG 024-adapted opposite-direction marquees. The
// band pins for 200vh; both phrases loop infinitely in opposite directions
// (started after fonts.ready so widths are final) while the scrub masks
// phrase one upward and reveals phrase two.
function bridgeScene() {
  const section = document.querySelector<HTMLElement>(".effect-bridge");
  if (!section) return () => {};

  const pinHeight = section.querySelector<HTMLElement>("[data-bridge-pin]");
  const container = section.querySelector<HTMLElement>("[data-bridge-container]");
  const sentence1 = section.querySelector<HTMLElement>('[data-bridge-sentence="1"]');
  const sentence2 = section.querySelector<HTMLElement>('[data-bridge-sentence="2"]');
  if (!pinHeight || !container || !sentence1 || !sentence2) return () => {};

  // The stage class must exist before ScrollTrigger measures the runway.
  section.classList.add("effect-bridge--stage");

  let disposed = false;
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    gsap.to([sentence1, sentence2], {
      yPercent: "-=100",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });
  }, section);

  // Infinite loops need final font metrics for a seamless wrap.
  (document.fonts?.ready ?? Promise.resolve()).then(() => {
    if (disposed) return;
    ctx.add(() => {
      gsap.to(sentence1, {
        x: -sentence1.clientWidth / 2,
        ease: "none",
        duration: 10,
        repeat: -1,
      });
      gsap.from(sentence2, {
        x: -sentence2.clientWidth / 2,
        ease: "none",
        duration: 10,
        repeat: -1,
      });
    });
  });

  return () => {
    disposed = true;
    ctx.revert();
    section.classList.remove("effect-bridge--stage");
  };
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

// 04 / Arbeid — MWG 082-adapted mockup stack. Intro band gets a one-time
// reveal; the stage pins for 400vh while every mockup pops in centered
// (elastic reveal timeline played from the scrubbed master), recedes into
// depth with a random tilt and exits upward. Scrolling back re-hides each
// mockup via onReverseComplete, exactly like the reference.
function workScene() {
  const section = document.querySelector<HTMLElement>(".work-proof");
  if (!section) return () => {};

  const pinHeight = section.querySelector<HTMLElement>("[data-work-pin]");
  const stage = section.querySelector<HTMLElement>("[data-work-stage]");
  const medias = gsap.utils.toArray<HTMLElement>("[data-work-media]", section);
  if (!pinHeight || !stage || !medias.length) return () => {};

  // The stage class must exist before ScrollTrigger measures the runway.
  section.classList.add("work-proof--stage");

  const ctx = gsap.context(() => {
    const intro = section.querySelector<HTMLElement>(".work-proof__intro");
    if (intro) {
      gsap.from(intro.children, {
        autoAlpha: 0,
        y: 22,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: intro, start: "top 78%", once: true },
      });
    }

    // Paused elastic pop per mockup — played in real time from the scrub.
    const revealTimelines = medias.map((media, index) => {
      const tlReveal = gsap.timeline({ paused: true });
      tlReveal.set(media, { autoAlpha: 1 }, "media" + index);
      tlReveal.fromTo(
        media,
        { scaleX: 0.9, scaleY: 0.9 },
        {
          scaleX: 1,
          scaleY: 1,
          immediateRender: false,
          ease: "elastic.out(2, 0.6)",
          duration: 0.5,
        },
        "<"
      );
      return tlReveal;
    });

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: stage,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    medias.forEach((media, i) => {
      const tl = gsap.timeline({
        onStart: () => {
          revealTimelines[i].play();
        },
        onReverseComplete: () => {
          revealTimelines[i].progress(-1).pause();
        },
      });

      const angle = (Math.random() - 0.5) * 40;

      tl.to(media, {
        z: () => -window.innerWidth,
        rotation: angle,
        duration: 1,
        ease: "power1.inOut",
      });
      tl.to(
        media,
        {
          x: () => angle * 0.01 * window.innerWidth,
          y: () => -2 * window.innerHeight,
          duration: 0.6,
          ease: "power1.in",
        },
        "<+=0.4"
      );
      master.add(tl, 0.1 * i);
    });
  }, section);

  return () => {
    ctx.revert();
    section.classList.remove("work-proof--stage");
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
    const teardownAccordion = setupServiceAccordion();
    const teardownUtilities = setupFooterUtilities();
    const lenis = initLenis({ lerp: 0.12 });
    lenis?.lenis.on("scroll", ScrollTrigger.update);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      heroEntrance(true);
      const teardownGhost = setupBuildGhost();
      const teardownApproach = approachScene();
      serviceReveals();
      const teardownBridge = bridgeScene();
      const teardownImprove = improveScene();
      const teardownWork = workScene();
      const teardownProcess = processStage();
      manifestoReveal();
      footerReveals();
      return () => {
        teardownGhost();
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
      const teardownBridge = bridgeScene();
      const teardownImprove = improveScene();
      const teardownWork = workScene();
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
      teardownAccordion();
      teardownUtilities();
    };
  }, []);

  return null;
}
