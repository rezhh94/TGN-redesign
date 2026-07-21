"use client";

import { useEffect, useMemo, useRef } from "react";

type WordShiftLinkProps = {
  href: string;
  text: string;
};

const debounce = (callback: () => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

export function WordShiftLink({ href, text }: WordShiftLinkProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const letters = useMemo(
    () => [...text].map((letter, index) => (
      <span className="text" key={`${letter}-${index}`}>
        {letter === " " ? "\u00a0" : letter}
      </span>
    )),
    [text],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const link = linkRef.current;
    if (!wrapper || !link) return;

    const configure = (direction: "in" | "out") => {
      const characters = wrapper.querySelectorAll<HTMLElement>(".text");
      const buttonRect = link.getBoundingClientRect();
      const word = wrapper.querySelector<HTMLElement>(".word");
      if (!word) return 0;

      const wordRect = word.getBoundingClientRect();
      const paddingRight = Number.parseFloat(getComputedStyle(link).paddingRight) || 0;
      const arrow = wrapper.querySelector<HTMLElement>(".arrow-right");
      const arrowWidth = arrow?.getBoundingClientRect().width ?? 0;
      const arrowGap = 10;
      const inset = Math.max(8, 0.5 * paddingRight);
      const targetRight = direction === "in"
        ? buttonRect.right - paddingRight + 1
        : buttonRect.right - inset - arrowWidth - arrowGap;
      const move = Math.max(0, targetRight - wordRect.right);

      characters.forEach((character, index) => {
        const order = direction === "in" ? characters.length - index - 1 : index;
        character.style.setProperty("--group-move", `${move}px`);
        character.style.setProperty("--delay", `${order * 30}ms`);
        character.style.setProperty("--dur", `${300 + order * 30}ms`);
      });

      return Math.max(
        120,
        Math.round(((characters.length - 1) * 30 + (300 + (characters.length - 1) * 30)) * 0.5),
      );
    };

    let inTimer: ReturnType<typeof setTimeout> | undefined;
    let outTimer: ReturnType<typeof setTimeout> | undefined;
    const cancelTimers = () => {
      clearTimeout(inTimer);
      clearTimeout(outTimer);
    };
    const currentX = (element: HTMLElement) => {
      const transform = getComputedStyle(element).transform;
      return transform && transform !== "none"
        ? new DOMMatrixReadOnly(transform).m41
        : 0;
    };
    const animateSprite = (
      element: HTMLElement | null,
      x: string,
      opacity: number,
      duration: number,
      delay = 0,
    ) => {
      if (!element) return;
      element.getAnimations().forEach((animation) => animation.cancel());
      const animation = element.animate(
        [
          { transform: `translateX(${currentX(element)}px)`, opacity: getComputedStyle(element).opacity },
          { transform: `translateX(${x})`, opacity },
        ],
        { duration, delay, easing: "ease", fill: "forwards" },
      );
      animation.onfinish = () => {
        element.style.transform = `translateX(${x})`;
        element.style.opacity = String(opacity);
      };
    };
    const animateLine = (
      element: HTMLElement | null,
      origin: "left" | "right",
      scale: number,
      duration: number,
      delay = 0,
    ) => {
      if (!element) return;
      element.style.transformOrigin = `${origin} center`;
      const transform = getComputedStyle(element).transform;
      const matrix = transform && transform !== "none"
        ? new DOMMatrixReadOnly(transform)
        : null;
      const currentScale = matrix ? Math.hypot(matrix.m11, matrix.m12) : 1;
      element.getAnimations().forEach((animation) => animation.cancel());
      const animation = element.animate(
        [
          { transform: `scaleX(${currentScale})` },
          { transform: `scaleX(${scale})` },
        ],
        { duration, delay, easing: "ease", fill: "forwards" },
      );
      animation.onfinish = () => {
        element.style.transform = `scaleX(${scale})`;
      };
    };

    const rightArrow = wrapper.querySelector<HTMLElement>(".arrow-right .arrow-sprite");
    const leftArrow = wrapper.querySelector<HTMLElement>(".arrow-left .arrow-sprite");
    const rightLine = wrapper.querySelector<HTMLElement>(".u-right");
    const leftLine = wrapper.querySelector<HTMLElement>(".u-left");

    const enter = () => {
      const reentryDelay = configure("in");
      wrapper.classList.add("is-hovered");
      cancelTimers();
      animateSprite(rightArrow, "28px", 0, 200);
      animateSprite(leftArrow, "0px", 1, 320, reentryDelay);
      animateLine(rightLine, "right", 0, 1000);
      inTimer = setTimeout(() => animateLine(leftLine, "left", 1, 500), reentryDelay);
    };
    const leave = () => {
      const reentryDelay = configure("out");
      wrapper.classList.remove("is-hovered");
      cancelTimers();
      animateSprite(leftArrow, "-28px", 0, 200);
      animateSprite(rightArrow, "0px", 1, 320, reentryDelay);
      animateLine(leftLine, "left", 0, 1000);
      outTimer = setTimeout(() => animateLine(rightLine, "right", 1, 500), reentryDelay);
    };
    const debouncedEnter = debounce(enter, 20);
    const debouncedLeave = debounce(leave, 20);
    const resize = () => configure(wrapper.classList.contains("is-hovered") ? "in" : "out");
    const touchEnter = () => {
      if (!wrapper.classList.contains("is-hovered")) enter();
    };
    const touchOutside = (event: TouchEvent) => {
      if (
        wrapper.classList.contains("is-hovered")
        && event.target instanceof Node
        && !wrapper.contains(event.target)
      ) leave();
    };

    configure("out");
    link.addEventListener("mouseenter", debouncedEnter);
    link.addEventListener("mouseleave", debouncedLeave);
    link.addEventListener("focus", debouncedEnter);
    link.addEventListener("blur", debouncedLeave);
    link.addEventListener("touchstart", touchEnter, { passive: true });
    document.addEventListener("touchstart", touchOutside, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelTimers();
      link.removeEventListener("mouseenter", debouncedEnter);
      link.removeEventListener("mouseleave", debouncedLeave);
      link.removeEventListener("focus", debouncedEnter);
      link.removeEventListener("blur", debouncedLeave);
      link.removeEventListener("touchstart", touchEnter);
      document.removeEventListener("touchstart", touchOutside);
      window.removeEventListener("resize", resize);
    };
  }, [text]);

  return (
    <div className="service-word-shift" ref={wrapperRef}>
      <a className="btn" href={href} ref={linkRef} draggable={false}>
        <span className="underline" aria-hidden="true">
          <span className="u-right" />
          <span className="u-left" />
        </span>
        <span className="word">{letters}</span>
        <span className="arrow arrow-right" aria-hidden="true">
          <span className="arrow-sprite">
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
              <path d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z" />
            </svg>
          </span>
        </span>
        <span className="arrow arrow-left" aria-hidden="true">
          <span className="arrow-sprite">
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
              <path d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V0L9.32372 3.836V4.816L5.47372 8.652ZM0 5.11V3.542H8.60972V5.11H0Z" />
            </svg>
          </span>
        </span>
      </a>
    </div>
  );
}
