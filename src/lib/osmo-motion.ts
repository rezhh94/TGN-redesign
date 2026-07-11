import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, Flip, MotionPathPlugin, SplitText);

type RevealItemSlot = {
  type: "item";
  el: HTMLElement;
};

type RevealNestedSlot = {
  type: "nested";
  parentEl: HTMLElement;
  nestedEl: HTMLElement;
  includeParent: boolean;
  nestedChildren: HTMLElement[];
};

type RevealSlot = RevealItemSlot | RevealNestedSlot;

const elementChildren = (element: Element) =>
  Array.from(element.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

// Osmo: Elements Reveal on Scroll. The data attributes and animation behavior
// stay intact; the DOMContentLoaded wrapper is replaced by a React-safe setup
// function with an explicit teardown.
export function initContentRevealScroll(root: ParentNode = document) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((groupEl) => {
      const groupStaggerSec =
        (Number.parseFloat(groupEl.getAttribute("data-stagger") ?? "") || 100) / 1000;
      const groupDistance = groupEl.getAttribute("data-distance") || "2em";
      const triggerStart = groupEl.getAttribute("data-start") || "top 80%";

      const animDuration = 0.8;
      const animEase = "power4.inOut";

      if (prefersReduced) {
        gsap.set(groupEl, { clearProps: "all", y: 0, autoAlpha: 1 });
        return;
      }

      const directChildren = elementChildren(groupEl);
      if (!directChildren.length) {
        gsap.set(groupEl, { y: groupDistance, autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: groupEl,
          start: triggerStart,
          once: true,
          onEnter: () =>
            gsap.to(groupEl, {
              y: 0,
              autoAlpha: 1,
              duration: animDuration,
              ease: animEase,
              onComplete: () => gsap.set(groupEl, { clearProps: "all" }),
            }),
        });
        return;
      }

      const slots: RevealSlot[] = [];
      directChildren.forEach((child) => {
        const nestedGroup = child.matches("[data-reveal-group-nested]")
          ? child
          : child.querySelector<HTMLElement>(":scope [data-reveal-group-nested]");

        if (nestedGroup) {
          const includeParent =
            child.getAttribute("data-ignore") !== "true" &&
            (child.getAttribute("data-ignore") === "false" ||
              nestedGroup.getAttribute("data-ignore") === "false");

          const nestedChildren = elementChildren(nestedGroup).filter(
            (element) => element.getAttribute("data-ignore") !== "true",
          );

          slots.push({
            type: "nested",
            parentEl: child,
            nestedEl: nestedGroup,
            includeParent,
            nestedChildren,
          });
          return;
        }

        if (child.getAttribute("data-ignore") !== "true") {
          slots.push({ type: "item", el: child });
        }
      });

      slots.forEach((slot) => {
        if (slot.type === "item") {
          const isNestedSelf = slot.el.matches("[data-reveal-group-nested]");
          const distance = isNestedSelf
            ? groupDistance
            : slot.el.getAttribute("data-distance") || groupDistance;
          gsap.set(slot.el, { y: distance, autoAlpha: 0 });
          return;
        }

        if (slot.includeParent) {
          gsap.set(slot.parentEl, { y: groupDistance, autoAlpha: 0 });
        }
        const nestedDistance = slot.nestedEl.getAttribute("data-distance") || groupDistance;
        slot.nestedChildren.forEach((target) =>
          gsap.set(target, { y: nestedDistance, autoAlpha: 0 }),
        );
      });

      slots.forEach((slot) => {
        if (slot.type === "nested" && slot.includeParent) {
          gsap.set(slot.parentEl, { y: groupDistance });
        }
      });

      ScrollTrigger.create({
        trigger: groupEl,
        start: triggerStart,
        once: true,
        onEnter: () => {
          const timeline = gsap.timeline();

          slots.forEach((slot, slotIndex) => {
            const slotTime = slotIndex * groupStaggerSec;

            if (slot.type === "item") {
              timeline.to(
                slot.el,
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: animDuration,
                  ease: animEase,
                  onComplete: () => gsap.set(slot.el, { clearProps: "all" }),
                },
                slotTime,
              );
              return;
            }

            if (slot.includeParent) {
              timeline.to(
                slot.parentEl,
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: animDuration,
                  ease: animEase,
                  onComplete: () => gsap.set(slot.parentEl, { clearProps: "all" }),
                },
                slotTime,
              );
            }

            const nestedMs = Number.parseFloat(
              slot.nestedEl.getAttribute("data-stagger") ?? "",
            );
            const nestedStaggerSec = Number.isNaN(nestedMs)
              ? groupStaggerSec
              : nestedMs / 1000;

            slot.nestedChildren.forEach((nestedChild, nestedIndex) => {
              timeline.to(
                nestedChild,
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: animDuration,
                  ease: animEase,
                  onComplete: () => gsap.set(nestedChild, { clearProps: "all" }),
                },
                slotTime + nestedIndex * nestedStaggerSec,
              );
            });
          });
        },
      });
    });
  });

  return () => ctx.revert();
}

// Osmo: Global Parallax Setup. It remains dormant until a section receives
// data-parallax="trigger" and the accompanying configuration attributes.
export function initGlobalParallax(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: "(max-width:479px)",
      isMobileLandscape: "(max-width:767px)",
      isTablet: "(max-width:991px)",
      isDesktop: "(min-width:992px)",
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions as {
        isMobile: boolean;
        isMobileLandscape: boolean;
        isTablet: boolean;
        isDesktop: boolean;
      };

      const ctx = gsap.context(() => {
        root
          .querySelectorAll<HTMLElement>('[data-parallax="trigger"]')
          .forEach((trigger) => {
            const disable = trigger.getAttribute("data-parallax-disable");
            if (
              (disable === "mobile" && isMobile) ||
              (disable === "mobileLandscape" && isMobileLandscape) ||
              (disable === "tablet" && isTablet)
            ) {
              return;
            }

            const target =
              trigger.querySelector<HTMLElement>('[data-parallax="target"]') || trigger;
            const direction = trigger.getAttribute("data-parallax-direction") || "vertical";
            const property = direction === "horizontal" ? "xPercent" : "yPercent";

            const scrubAttr = trigger.getAttribute("data-parallax-scrub");
            const scrub = scrubAttr ? Number.parseFloat(scrubAttr) : true;

            const startAttr = trigger.getAttribute("data-parallax-start");
            const startValue = startAttr !== null ? Number.parseFloat(startAttr) : 20;

            const endAttr = trigger.getAttribute("data-parallax-end");
            const endValue = endAttr !== null ? Number.parseFloat(endAttr) : -20;

            const scrollStartRaw =
              trigger.getAttribute("data-parallax-scroll-start") || "top bottom";
            const scrollEndRaw =
              trigger.getAttribute("data-parallax-scroll-end") || "bottom top";

            gsap.fromTo(
              target,
              { [property]: startValue },
              {
                [property]: endValue,
                ease: "none",
                scrollTrigger: {
                  trigger,
                  start: `clamp(${scrollStartRaw})`,
                  end: `clamp(${scrollEndRaw})`,
                  scrub,
                },
              },
            );
          });
      });

      return () => ctx.revert();
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Footer Parallax Effect. The original wrapper/inner/dark hooks and
// yPercent choreography are preserved. Mobile and reduced-motion keep the
// same semantic footer in ordinary document flow.
export function initFooterParallax(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
    () => {
      const ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-footer-parallax]").forEach((element) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "clamp(top bottom)",
              end: "clamp(top top)",
              scrub: true,
            },
          });

          const inner = element.querySelector<HTMLElement>("[data-footer-parallax-inner]");
          const dark = element.querySelector<HTMLElement>("[data-footer-parallax-dark]");

          if (inner) {
            timeline.from(inner, {
              yPercent: -25,
              ease: "linear",
            });
          }

          if (dark) {
            timeline.from(
              dark,
              {
                opacity: 0.5,
                ease: "linear",
              },
              "<",
            );
          }
        });
      });

      return () => ctx.revert();
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Stacking Sticky Cards (Bounce). The original data hooks, tier-specific
// transform values and settle pulse are kept, but every timeline is scoped to
// its own process stack and reverts cleanly on breakpoint changes.
export function initStackingStickyCardsBounce(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      desktop: "(min-width: 992px)",
      tablet: "(min-width: 768px) and (max-width: 991px)",
      mobile: "(max-width: 767px)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const conditions = context.conditions ?? {};
      const tier = conditions.desktop ? "desktop" : conditions.tablet ? "tablet" : "mobile";
      const sections = Array.from(
        root.querySelectorAll<HTMLElement>("[data-stacking-cards-init]"),
      );

      const ctx = gsap.context(() => {
        sections.forEach((section) => {
          const enabled = section.getAttribute(`data-stacking-cards-${tier}`) === "true";
          const cards = Array.from(
            section.querySelectorAll<HTMLElement>("[data-stacking-card]"),
          );

          if (!enabled || !cards.length || conditions.reduce) return;

          const stickyTop = Number.parseFloat(getComputedStyle(cards[0]).top) || 0;
          const parseNumbers = (name: string, fallback: number[]) => {
            const values = (section.getAttribute(name) ?? "")
              .split(",")
              .map((value) => Number.parseFloat(value.trim()));
            return values.length && values.every(Number.isFinite) ? values : fallback;
          };
          const parseAxes = (name: string) => {
            const values = (section.getAttribute(name) ?? "")
              .split(",")
              .map((value) => value.trim())
              .filter(Boolean);
            return values.length ? values : ["0em"];
          };

          const rotations = parseNumbers(`data-stacking-cards-${tier}-rotate`, [0, 1, -1]);
          const xValues = parseAxes(`data-stacking-cards-${tier}-x`);
          const yValues = parseAxes(`data-stacking-cards-${tier}-y`);

          const pulse = (target: HTMLElement) => {
            const width = Math.max(target.offsetWidth, 1);
            const height = Math.max(target.offsetHeight, 1);
            const stretch = (Number.parseFloat(getComputedStyle(target).fontSize) || 16) * 1.1;

            gsap.timeline()
              .to(target, {
                scaleX: (width + stretch) / width,
                scaleY: (height - stretch * 0.33) / height,
                duration: 0.1,
                ease: "power1.out",
              })
              .to(target, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.9,
                ease: "elastic.out(1, 0.32)",
              });
          };

          cards.forEach((card, index) => {
            const target = card.querySelector<HTMLElement>("[data-stacking-card-target]");
            if (!target) return;

            gsap.set(target, { zIndex: cards.length - index });
            gsap.to(target, {
              rotate: rotations[index % rotations.length],
              x: xValues[index % xValues.length],
              y: yValues[index % yValues.length],
              ease: "power1.in",
              overwrite: "auto",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                end: `top-=${stickyTop} top`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            ScrollTrigger.create({
              trigger: card,
              start: `top-=${stickyTop} top`,
              onEnter: () => pulse(target),
            });
          });
        });
      });

      ScrollTrigger.refresh();
      return () => ctx.revert();
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Looping Words with Selector. Each local list keeps the original
// elastic word movement and selector-width response. Cleanup restores React's
// original DOM order after the looping routine rotates child nodes.
export function initLoopingWordsWithSelector(root: ParentNode = document) {
  const cleanups: Array<() => void> = [];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.querySelectorAll<HTMLElement>(".looping-words").forEach((wrap) => {
    const list = wrap.querySelector<HTMLElement>("[data-looping-words-list]");
    const selector = wrap.querySelector<HTMLElement>("[data-looping-words-selector]");
    if (!list || !selector) return;

    const originalWords = Array.from(list.children) as HTMLElement[];
    const words = [...originalWords];
    const totalWords = words.length;
    if (totalWords < 2) return;

    const wordHeight = 100 / totalWords;
    let currentIndex = 0;
    const section = wrap.closest<HTMLElement>(".what-improve");
    const details = section
      ? Array.from(section.querySelectorAll<HTMLElement>("[data-looping-detail]"))
      : [];
    const indexes = section
      ? Array.from(section.querySelectorAll<HTMLElement>("[data-looping-index]"))
      : [];

    if (!reduced && section && details.length) section.classList.add("what-improve--enhanced");

    const updateActiveDetail = () => {
      if (reduced || !section) return;
      const centerWord = words[(currentIndex + 1) % totalWords];
      const key = centerWord.dataset.loopingKey;
      if (!key) return;
      details.forEach((detail) => detail.toggleAttribute("data-active", detail.dataset.loopingDetail === key));
      indexes.forEach((item) => item.toggleAttribute("data-active", item.dataset.loopingIndex === key));
    };

    const updateSelectorWidth = (animate = true) => {
      const centerWord = words[(currentIndex + 1) % totalWords];
      const listWidth = Math.max(list.getBoundingClientRect().width, 1);
      const width = `${(centerWord.getBoundingClientRect().width / listWidth) * 100}%`;

      if (animate && !reduced) {
        gsap.to(selector, { width, duration: 0.5, ease: "expo.out" });
      } else {
        gsap.set(selector, { width });
      }
      updateActiveDetail();
    };

    updateSelectorWidth(false);

    let loop: gsap.core.Timeline | null = null;
    if (!reduced) {
      const moveWords = () => {
        currentIndex += 1;
        gsap.to(list, {
          yPercent: -wordHeight * currentIndex,
          duration: 1.2,
          ease: "elastic.out(1, 0.85)",
          onStart: () => updateSelectorWidth(true),
          onComplete: () => {
            if (currentIndex >= totalWords - 3) {
              const first = list.firstElementChild;
              if (first) list.appendChild(first);
              currentIndex -= 1;
              gsap.set(list, { yPercent: -wordHeight * currentIndex });
              const shifted = words.shift();
              if (shifted) words.push(shifted);
            }
          },
        });
      };

      loop = gsap.timeline({ repeat: -1, delay: 1 });
      loop.call(moveWords).to({}, { duration: 2 });
    }

    const resizeObserver = new ResizeObserver(() => updateSelectorWidth(false));
    resizeObserver.observe(list);

    cleanups.push(() => {
      resizeObserver.disconnect();
      loop?.kill();
      gsap.killTweensOf([list, selector]);
      originalWords.forEach((word) => list.appendChild(word));
      gsap.set([list, selector], { clearProps: "all" });
      section?.classList.remove("what-improve--enhanced");
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

// Osmo: Shutter Scroll Transition. Rows are generated per breakpoint and use
// the adjacent section colour through currentColor. Reduced motion keeps the
// ordinary document transition and creates no extra DOM.
export function initShutterScrollTransition(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      desktop: "(min-width: 992px)",
      tablet: "(min-width: 768px) and (max-width: 991px)",
      mobile: "(max-width: 767px)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions?.reduce) return;
      const cleanups: Array<() => void> = [];

      root.querySelectorAll<HTMLElement>("[data-shutter-scroll-transition]").forEach((wrapper) => {
        const base = Number.parseInt(wrapper.dataset.rows ?? "", 10) || 6;
        const count = context.conditions?.desktop
          ? base
          : context.conditions?.tablet
            ? Number.parseInt(wrapper.dataset.rowsTablet ?? "", 10) || base
            : Number.parseInt(wrapper.dataset.rowsMobile ?? "", 10) || base;
        const panel = document.createElement("div");
        panel.className = "shutter-scroll-transition__panel";
        panel.setAttribute("data-shutter-scroll-panel", "");

        for (let index = 0; index < count; index += 1) {
          const row = document.createElement("div");
          row.className = "shutter-scroll-transition__row";
          row.setAttribute("data-shutter-scroll-row", "");
          panel.appendChild(row);
        }
        wrapper.appendChild(panel);

        const rows = Array.from(panel.children) as HTMLElement[];
        const section = wrapper.closest("section") ?? wrapper.parentElement ?? wrapper;
        gsap.set(rows, { scaleY: 0, transformOrigin: "bottom center" });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });
        timeline.to(rows, {
          scaleY: 1,
          duration: 0.1,
          stagger: { each: 0.01, from: "end" },
          ease: "none",
        });

        cleanups.push(() => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          panel.remove();
        });
      });

      ScrollTrigger.refresh();
      return () => cleanups.forEach((cleanup) => cleanup());
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Sticky Features. Desktop keeps the source's pinned two-column scene,
// clip transitions and progress bar. Mobile, reduced motion and no-JS retain
// the fully expanded server-rendered list instead of hiding service content.
export function initStickyFeatures(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    "(prefers-reduced-motion: no-preference) and (min-width: 901px)",
    () => {
      const enhanced: HTMLElement[] = [];
      const ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-sticky-feature-wrap]").forEach((wrap) => {
          const visuals = Array.from(
            wrap.querySelectorAll<HTMLElement>("[data-sticky-feature-visual-wrap]"),
          );
          const items = Array.from(
            wrap.querySelectorAll<HTMLElement>("[data-sticky-feature-item]"),
          );
          const progress = wrap.querySelector<HTMLElement>("[data-sticky-feature-progress]");
          const count = Math.min(visuals.length, items.length);
          if (!count) return;

          wrap.classList.add("sticky-features--enhanced");
          enhanced.push(wrap);
          gsap.set(visuals[0], { clipPath: "inset(0% round var(--radius))" });
          gsap.set(items[0], { autoAlpha: 1 });

          const texts = (item: HTMLElement) =>
            Array.from(item.querySelectorAll<HTMLElement>("[data-sticky-feature-text]"));
          let current = 0;

          const transition = (from: number, to: number) => {
            if (from === to) return;
            const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });

            if (from < to) {
              timeline.to(
                visuals[to],
                { clipPath: "inset(0% round var(--radius))", duration: 0.75, ease: "power4.inOut" },
                0,
              );
            } else {
              timeline.to(
                visuals[from],
                { clipPath: "inset(50% round var(--radius))", duration: 0.75, ease: "power4.inOut" },
                0,
              );
            }

            gsap.to(texts(items[from]), {
              autoAlpha: 0,
              y: -30,
              duration: 0.4,
              ease: "power4.out",
              onComplete: () => gsap.set(items[from], { autoAlpha: 0 }),
            });
            gsap.set(items[to], { autoAlpha: 1 });
            gsap.fromTo(
              texts(items[to]),
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power4.out" },
            );
          };

          const steps = Math.max(1, count - 1);
          ScrollTrigger.create({
            trigger: wrap,
            start: "center center",
            end: () => `+=${steps * 100}%`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const normalized = Math.min(self.progress, 0.9) / 0.9;
              const next = Math.max(0, Math.min(steps, Math.floor(normalized * steps + 1e-6)));
              if (progress) gsap.set(progress, { scaleX: normalized });
              if (next !== current) {
                transition(current, next);
                current = next;
              }
            },
          });
        });
      });

      ScrollTrigger.refresh();
      return () => {
        ctx.revert();
        enhanced.forEach((wrap) => wrap.classList.remove("sticky-features--enhanced"));
      };
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Draw Path on Scroll + Follow SVG Path on Scroll. The path stays fully
// visible without JS; enhancement redraws the active stroke and lets the TGN
// marker travel along the same breakpoint-specific route.
export function initApproachPathJourney(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-draw-scroll-wrap]").forEach((wrap) => {
          const mobile = window.matchMedia("(max-width: 768px)").matches;
          const svg = wrap.querySelector<SVGSVGElement>(
            mobile ? "[data-draw-scroll-mobile]" : "[data-draw-scroll-desktop]",
          );
          const path = svg?.querySelector<SVGPathElement>("[data-draw-scroll-path]");
          const marker = wrap.querySelector<HTMLElement>('[data-motionpath="item"]');
          if (!path || !marker) return;

          gsap.set(path, { drawSVG: "0%" });
          gsap.set(marker, { autoAlpha: 1, transformOrigin: "50% 50%" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: wrap,
              start: "clamp(top 72%)",
              end: "clamp(bottom 34%)",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(path, { drawSVG: "100%", duration: 1, ease: "none" }, 0);
          timeline.to(
            marker,
            {
              duration: 1,
              ease: "none",
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
              },
            },
            0,
          );
        });
      });

      ScrollTrigger.refresh();
      return () => ctx.revert();
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Scaling Element on Scroll (GSAP Flip). One real element moves between
// the two layout waypoints, so type and proportions scale as a single surface.
// Mobile/reduced motion retain both the small launch card and destination copy.
export function initFlipOnScroll(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
    () => {
      const enhanced: HTMLElement[] = [];
      const ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-flip-section]").forEach((section) => {
          const wrappers = Array.from(
            section.querySelectorAll<HTMLElement>('[data-flip-element="wrapper"]'),
          );
          const target = section.querySelector<HTMLElement>('[data-flip-element="target"]');
          if (!target || wrappers.length < 2) return;

          section.classList.add("effect-bridge--flip-enhanced");
          enhanced.push(section);

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: wrappers[0],
              start: "center 55%",
              endTrigger: wrappers[wrappers.length - 1],
              end: "center 45%",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          });

          wrappers.slice(1).forEach((wrapper, index) => {
            const fitTween = Flip.fit(target, wrapper, {
              duration: 1,
              ease: "none",
              scale: true,
            }) as gsap.core.Tween | null;
            if (fitTween) timeline.add(fitTween, index);
          });
        });
      });

      ScrollTrigger.refresh();
      return () => {
        ctx.revert();
        enhanced.forEach((section) => section.classList.remove("effect-bridge--flip-enhanced"));
      };
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Animated Grid Overlay (Columns). The reveal is local to the manifesto,
// fires once, and leaves the grid visible as a quiet structural texture.
export function initManifestoGridReveal(root: ParentNode = document) {
  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-animated-grid]").forEach((grid) => {
          const columns = Array.from(
            grid.querySelectorAll<HTMLElement>("[data-animated-grid-col]"),
          ).filter((column) => getComputedStyle(column).display !== "none");
          if (!columns.length) return;

          gsap.from(columns, {
            yPercent: 101,
            duration: 1.05,
            ease: "expo.inOut",
            stagger: 0.035,
            clearProps: "transform",
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true,
            },
          });
        });
      });

      return () => ctx.revert();
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Highlight Marker Text Reveal. The source's line splitting, cover bars
// and directional scale-away are preserved. Important text is visible by
// default; bars are only created after fonts are ready and never for PRM.
export function initHighlightMarkerTextReveal(root: ParentNode = document) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const cleanups: Array<() => void> = [];
  const directionMap = {
    right: { property: "scaleX", origin: "right center" },
    left: { property: "scaleX", origin: "left center" },
    up: { property: "scaleY", origin: "center top" },
    down: { property: "scaleY", origin: "center bottom" },
  } as const;

  root.querySelectorAll<HTMLElement>("[data-highlight-marker-reveal]").forEach((element) => {
    const direction = element.getAttribute("data-marker-direction") ?? "right";
    const config = directionMap[direction as keyof typeof directionMap] ?? directionMap.right;
    const theme = element.getAttribute("data-marker-theme") ?? "--color-on-dark";
    const color = theme.startsWith("--")
      ? getComputedStyle(document.documentElement).getPropertyValue(theme).trim()
      : theme;
    const stagger =
      (Number.parseFloat(element.getAttribute("data-marker-stagger") ?? "") || 100) / 1000;

    const split = new SplitText(element, {
      type: "lines",
      linesClass: "highlight-marker-line",
    });
    const bars: HTMLElement[] = [];
    const timeline = gsap.timeline({ paused: true });

    (split.lines as HTMLElement[]).forEach((line, index) => {
      gsap.set(line, { position: "relative", overflow: "hidden" });
      const bar = document.createElement("span");
      bar.className = "highlight-marker-bar";
      line.appendChild(bar);
      bars.push(bar);

      gsap.set(bar, {
        backgroundColor: color || "#ffffff",
        transformOrigin: config.origin,
        [config.property]: 1,
      });
      timeline.to(
        bar,
        {
          [config.property]: 0,
          duration: 0.6,
          ease: "power3.inOut",
        },
        index * stagger,
      );
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 86%",
      once: true,
      onEnter: () => timeline.play(),
    });

    cleanups.push(() => {
      trigger.kill();
      timeline.kill();
      bars.forEach((bar) => bar.remove());
      split.revert();
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
