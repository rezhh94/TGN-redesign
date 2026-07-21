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

// Osmo: Shutter Scroll Transition. Bevarer kildens genererte panel/rader,
// cover/reveal-retning, data-styrte scrollposisjoner, stagger og breakpoints.
// Tigon tilpasser bare wrapperens farge, radantall og start/slutt i markup/CSS.
export function initShutterScrollTransition(root: ParentNode = document) {
  const defaultRows = 6;
  const defaultMode = "cover";
  const defaultScrollStart = { cover: "bottom bottom", reveal: "top bottom" };
  const defaultScrollEnd = { cover: "bottom top", reveal: "top center" };
  const defaultScrub = 0.3;
  const defaultShutterDuration = 0.1;
  const defaultStaggerAmount = 0.01;
  const panelClass = "shutter-scroll-transition__panel";
  const rowClass = "shutter-scroll-transition__row";

  const breakpoints = {
    mobile: "(max-width: 478px)",
    landscape: "(max-width: 767px)",
    tablet: "(max-width: 991px)",
  };

  type ShutterMode = keyof typeof defaultScrollStart;
  type ShutterInstance = {
    wrapper: HTMLElement;
    timeline: gsap.core.Timeline;
  };

  const wrappers = Array.from(
    root.querySelectorAll<HTMLElement>("[data-shutter-scroll-transition]"),
  );
  if (!wrappers.length) return () => {};

  const getMode = (wrapper: HTMLElement): ShutterMode =>
    wrapper.dataset.mode === "reveal" ? "reveal" : defaultMode;

  const getRows = (wrapper: HTMLElement) => {
    const base = Number.parseInt(wrapper.dataset.rows ?? "", 10) || defaultRows;
    if (window.matchMedia(breakpoints.mobile).matches) {
      return Number.parseInt(wrapper.dataset.rowsMobile ?? "", 10) || base;
    }
    if (window.matchMedia(breakpoints.landscape).matches) {
      return Number.parseInt(wrapper.dataset.rowsLandscape ?? "", 10) || base;
    }
    if (window.matchMedia(breakpoints.tablet).matches) {
      return Number.parseInt(wrapper.dataset.rowsTablet ?? "", 10) || base;
    }
    return base;
  };

  const buildInstance = (wrapper: HTMLElement): ShutterInstance => {
    const mode = getMode(wrapper);
    const section = wrapper.closest("section") ?? wrapper.parentElement ?? wrapper;
    const getScrollPosition = (position: string) => {
      const offsetSelector = wrapper.dataset.scrollOffsetMobile;
      if (!offsetSelector || !window.matchMedia(breakpoints.landscape).matches) {
        return position;
      }
      const offsetTarget = section.querySelector<HTMLElement>(offsetSelector);
      const offset = offsetTarget?.offsetHeight ?? 0;
      if (!offset) return position;
      const [triggerPoint, ...scrollerPoint] = position.trim().split(/\s+/);
      if (!triggerPoint || !scrollerPoint.length) return position;
      return `${triggerPoint}+=${offset} ${scrollerPoint.join(" ")}`;
    };
    const panel = document.createElement("div");
    panel.classList.add(panelClass);
    panel.setAttribute("data-shutter-scroll-panel", "");

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < getRows(wrapper); index += 1) {
      const row = document.createElement("div");
      row.classList.add(rowClass);
      row.setAttribute("data-shutter-scroll-row", "");
      fragment.appendChild(row);
    }
    panel.appendChild(fragment);
    wrapper.appendChild(panel);

    const rows = Array.from(panel.children) as HTMLElement[];
    const fromScale = mode === "cover" ? 0 : 1;
    const toScale = mode === "cover" ? 1 : 0;
    const origin = mode === "cover" ? "bottom center" : "top center";

    gsap.set(rows, { scaleY: fromScale, transformOrigin: origin });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => getScrollPosition(
          wrapper.dataset.scrollStart || defaultScrollStart[mode],
        ),
        end: () => getScrollPosition(
          wrapper.dataset.scrollEnd || defaultScrollEnd[mode],
        ),
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(rows, {
      scaleY: toScale,
      duration: defaultShutterDuration,
      stagger: { each: defaultStaggerAmount, from: "end" },
      ease: "none",
    });

    return { wrapper, timeline };
  };

  const destroyInstance = (instance: ShutterInstance) => {
    instance.timeline.scrollTrigger?.kill();
    instance.timeline.kill();
    instance.wrapper.querySelector("[data-shutter-scroll-panel]")?.remove();
  };

  const matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isDesktop: "(min-width: 992px)",
      isTablet: "(min-width: 768px) and (max-width: 991px)",
      isLandscape: "(min-width: 479px) and (max-width: 767px)",
      isMobile: "(max-width: 478px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions?.reduceMotion) return;
      const instances = wrappers.map(buildInstance);

      ScrollTrigger.refresh();
      return () => instances.forEach(destroyInstance);
    },
  );

  return () => matchMedia.revert();
}

// Osmo: Pixelated Scroll Transition. A responsive grid is generated inside
// each wrapper and covers the outgoing section in the adjacent section colour.
// Reduced motion keeps the ordinary hard section boundary and creates no DOM.
export function initPixelatedScrollTransition(root: ParentNode = document) {
  const defaultColumns = 12;
  const defaultRows = 6;
  const breakpoints = {
    mobile: "(max-width: 478px)",
    landscape: "(max-width: 767px)",
    tablet: "(max-width: 991px)",
  };
  const instances: Array<{
    wrapper: HTMLElement;
    timeline: gsap.core.Timeline;
  }> = [];
  const matchMedia = gsap.matchMedia();

  const getColumns = (wrapper: HTMLElement) => {
    const base = Number.parseInt(wrapper.dataset.columns ?? "", 10) || defaultColumns;
    if (window.matchMedia(breakpoints.mobile).matches) {
      return Number.parseInt(wrapper.dataset.columnsMobile ?? "", 10) || Math.max(4, Math.round(base * 0.4));
    }
    if (window.matchMedia(breakpoints.landscape).matches) {
      return Number.parseInt(wrapper.dataset.columnsLandscape ?? "", 10) || Math.max(6, Math.round(base * 0.6));
    }
    if (window.matchMedia(breakpoints.tablet).matches) {
      return Number.parseInt(wrapper.dataset.columnsTablet ?? "", 10) || Math.max(8, Math.round(base * 0.75));
    }
    return base;
  };

  const getRows = (wrapper: HTMLElement) => {
    const base = Number.parseInt(wrapper.dataset.rows ?? "", 10) || defaultRows;
    if (window.matchMedia(breakpoints.mobile).matches) {
      return Number.parseInt(wrapper.dataset.rowsMobile ?? "", 10) || base;
    }
    if (window.matchMedia(breakpoints.landscape).matches) {
      return Number.parseInt(wrapper.dataset.rowsLandscape ?? "", 10) || base;
    }
    if (window.matchMedia(breakpoints.tablet).matches) {
      return Number.parseInt(wrapper.dataset.rowsTablet ?? "", 10) || base;
    }
    return base;
  };

  const buildGrid = (wrapper: HTMLElement, columns: number, rows: number) => {
    const panel = document.createElement("div");
    panel.className = "pixelated-scroll-transition__panel";
    panel.setAttribute("data-pixelated-scroll-panel", "");

    const fragment = document.createDocumentFragment();
    for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
      const column = document.createElement("div");
      column.className = "pixelated-scroll-transition__col";
      column.setAttribute("data-pixelated-scroll-column", "");
      for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        const pixel = document.createElement("div");
        pixel.className = "pixelated-scroll-transition__pixel";
        pixel.setAttribute("data-pixelated-scroll-pixel", "");
        column.appendChild(pixel);
      }
      fragment.appendChild(column);
    }
    panel.appendChild(fragment);
    wrapper.appendChild(panel);
    return panel;
  };

  const collectCells = (panel: HTMLElement, rows: number) => {
    const columns = panel.querySelectorAll<HTMLElement>("[data-pixelated-scroll-column]");
    const cells: Array<{ element: Element; priority: number }> = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
      columns.forEach((column, columnIndex) => {
        const pixel = column.children[rowIndex];
        if (!pixel) return;
        const distance = rows - 1 - rowIndex;
        const priority = distance * 50 + Math.random() * 300 + Math.sin(columnIndex * 0.3) * 30;
        cells.push({ element: pixel, priority });
      });
    }

    cells.sort((a, b) => a.priority - b.priority);
    return cells.map(({ element }) => element);
  };

  const destroyAll = () => {
    instances.forEach(({ wrapper, timeline }) => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      wrapper.querySelector("[data-pixelated-scroll-panel]")?.remove();
    });
    instances.length = 0;
  };

  matchMedia.add(
    {
      desktop: "(min-width: 992px)",
      tablet: "(min-width: 768px) and (max-width: 991px)",
      landscape: "(min-width: 479px) and (max-width: 767px)",
      mobile: "(max-width: 478px)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions?.reduce) return;

      root.querySelectorAll<HTMLElement>("[data-pixelated-scroll-transition]").forEach((wrapper) => {
        const section = wrapper.closest("section") ?? wrapper.parentElement ?? wrapper;
        const rows = getRows(wrapper);
        const panel = buildGrid(wrapper, getColumns(wrapper), rows);
        const cells = collectCells(panel, rows);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: wrapper.dataset.scrollStart || "bottom bottom",
            end: wrapper.dataset.scrollEnd || "bottom top",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(cells, { autoAlpha: 0 });
        timeline.to(cells, {
          autoAlpha: 1,
          duration: 0.1,
          stagger: { amount: 1.5, from: "start" },
          ease: "none",
        });
        instances.push({ wrapper, timeline });
      });

      ScrollTrigger.refresh();
      return destroyAll;
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

// Osmo: Pixelate Image Render Effect. The stepping algorithm, data attributes
// and trigger modes (load/inview/hover/click) are preserved from the source.
// Lifecycle is adapted for scoped init and cleanup so dynamic content (e.g.
// dialog media) can re-run the render per activation.
export function initPixelateImageRenderEffect(root: ParentNode = document) {
  const renderDuration = 150; // Duration per step (in ms)
  const renderSteps = 12; // Number of steps from chunky to sharp
  const renderColumns = 12; // Starting number of columns at the most pixelated stage

  const cleanups: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>("[data-pixelate-render]").forEach(setupPixelate);

  function setupPixelate(rootEl: HTMLElement) {
    const img = rootEl.querySelector<HTMLImageElement>("[data-pixelate-render-img]");
    if (!img) return;

    const trigger = (rootEl.getAttribute("data-pixelate-render-trigger") || "load").toLowerCase();

    // Per-element overrides
    const durAttr = parseInt(rootEl.getAttribute("data-pixelate-render-duration") ?? "", 10);
    const stepsAttr = parseInt(rootEl.getAttribute("data-pixelate-render-steps") ?? "", 10);
    const colsAttr = parseInt(rootEl.getAttribute("data-pixelate-render-columns") ?? "", 10);

    const fitMode = (rootEl.getAttribute("data-pixelate-render-fit") || "cover").toLowerCase();

    const elRenderDuration = Number.isFinite(durAttr) ? Math.max(16, durAttr) : renderDuration;
    const elRenderSteps = Number.isFinite(stepsAttr) ? Math.max(1, stepsAttr) : renderSteps;
    const elRenderColumns = Number.isFinite(colsAttr) ? Math.max(1, colsAttr) : renderColumns;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("data-pixelate-canvas", "");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    rootEl.style.position ||= "relative";
    rootEl.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      canvas.remove();
      return;
    }
    ctx.imageSmoothingEnabled = false;

    const back = document.createElement("canvas");
    const tiny = document.createElement("canvas");
    const bctx = back.getContext("2d", { alpha: true });
    const tctx = tiny.getContext("2d", { alpha: true });
    if (!bctx || !tctx) {
      canvas.remove();
      return;
    }

    let naturalW = 0;
    let naturalH = 0;
    let playing = false;
    let stageIndex = 0;
    let stageStart = 0;
    let backDirty = true;
    let resizeTimeout = 0;
    let steps = [elRenderColumns];
    let disposed = false;

    function fitCanvas() {
      const r = rootEl.getBoundingClientRect();
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        back.width = w;
        back.height = h;
        backDirty = true;
      }
      regenerateSteps();
    }

    function regenerateSteps() {
      const cw = Math.max(1, canvas.width);
      const startCols = Math.min(elRenderColumns, cw);
      const total = Math.max(1, elRenderSteps);
      const use = Math.max(1, Math.floor(total * 0.9)); // hard-coded 80%
      const a: number[] = [];
      const ratio = Math.pow(cw / startCols, 1 / total);
      for (let i = 0; i < use; i++) {
        a.push(Math.max(1, Math.round(startCols * Math.pow(ratio, i))));
      }
      for (let i = 1; i < a.length; i++) if (a[i] <= a[i - 1]) a[i] = a[i - 1] + 1;
      steps = a.length ? a : [startCols];
    }

    function drawImageToBack() {
      if (!backDirty || !naturalW || !naturalH) return;
      const cw = back.width;
      const ch = back.height;
      let dw = cw;
      let dh = ch;
      let dx = 0;
      let dy = 0;
      if (fitMode !== "stretch") {
        const s =
          fitMode === "cover"
            ? Math.max(cw / naturalW, ch / naturalH)
            : Math.min(cw / naturalW, ch / naturalH);
        dw = Math.max(1, Math.round(naturalW * s));
        dh = Math.max(1, Math.round(naturalH * s));
        dx = (cw - dw) >> 1;
        dy = (ch - dh) >> 1;
      }
      bctx!.clearRect(0, 0, cw, ch);
      bctx!.imageSmoothingEnabled = true;
      bctx!.drawImage(img!, dx, dy, dw, dh);
      backDirty = false;
    }

    function pixelate(columns: number) {
      const cw = canvas.width;
      const ch = canvas.height;
      const cols = Math.max(1, Math.floor(columns));
      const rows = Math.max(1, Math.round(cols * (ch / cw)));
      if (tiny.width !== cols || tiny.height !== rows) {
        tiny.width = cols;
        tiny.height = rows;
      }
      tctx!.imageSmoothingEnabled = false;
      tctx!.clearRect(0, 0, cols, rows);
      tctx!.drawImage(back, 0, 0, cw, ch, 0, 0, cols, rows);
      ctx!.imageSmoothingEnabled = false;
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.drawImage(tiny, 0, 0, cols, rows, 0, 0, cw, ch);
    }

    function draw(stepCols: number) {
      if (!canvas.width || !canvas.height) return;
      drawImageToBack();
      pixelate(stepCols);
    }

    function animate(t: number) {
      if (!playing || disposed) return;
      if (!stageStart) stageStart = t;
      if (t - stageStart >= elRenderDuration) {
        stageIndex++;
        stageStart = t;
      }
      draw(steps[Math.min(stageIndex, steps.length - 1)]);
      if (stageIndex >= steps.length - 1) {
        canvas.style.opacity = "0";
        playing = false;
        window.removeEventListener("resize", onWindowResize);
        setTimeout(() => {
          canvas.remove();
        }, 250);
        return;
      }
      requestAnimationFrame(animate);
    }

    function prime() {
      fitCanvas();
      const run = () => {
        if (disposed) return;
        naturalW = img!.naturalWidth;
        naturalH = img!.naturalHeight;
        if (!naturalW || !naturalH) return;
        stageIndex = 0;
        canvas.style.opacity = "1";
        backDirty = true;
        draw(steps[0]);
      };
      if (img!.complete && img!.naturalWidth) run();
      else img!.addEventListener("load", run, { once: true });
    }

    function start() {
      if (playing || disposed) return;
      fitCanvas();
      const run = () => {
        if (disposed) return;
        naturalW = img!.naturalWidth;
        naturalH = img!.naturalHeight;
        if (!naturalW || !naturalH) return;
        stageIndex = 0;
        stageStart = 0;
        canvas.style.opacity = "1";
        backDirty = true;
        playing = true;
        requestAnimationFrame(animate);
      };
      if (img!.complete && img!.naturalWidth) run();
      else img!.addEventListener("load", run, { once: true });
    }

    function onResize() {
      fitCanvas();
      if (!playing) draw(steps[Math.min(stageIndex, steps.length - 1)] || steps[0]);
    }

    function onWindowResize() {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(onResize, 250);
    }

    let observer: IntersectionObserver | null = null;

    if (trigger === "load") {
      prime();
      start();
    } else if (trigger === "inview") {
      prime();
      observer = new IntersectionObserver(
        (es) => {
          for (const e of es)
            if (e.isIntersecting) {
              start();
              observer?.disconnect();
              break;
            }
        },
        { rootMargin: "0px 0px -25% 0px", threshold: 0.25 },
      );
      observer.observe(rootEl);
      window.addEventListener("resize", onWindowResize);
    } else if (trigger === "hover") {
      prime();
      rootEl.addEventListener("mouseenter", start, { once: true });
      window.addEventListener("resize", onWindowResize);
    } else if (trigger === "click") {
      prime();
      rootEl.addEventListener("click", start, { once: true });
      window.addEventListener("resize", onWindowResize);
    }

    cleanups.push(() => {
      disposed = true;
      playing = false;
      observer?.disconnect();
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onWindowResize);
      rootEl.removeEventListener("mouseenter", start);
      rootEl.removeEventListener("click", start);
      canvas.remove();
    });
  }

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    cleanups.length = 0;
  };
}
