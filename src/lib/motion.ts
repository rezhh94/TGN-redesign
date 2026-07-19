import { gsap } from "gsap";
import Lenis from "lenis";

type LenisConfig = ConstructorParameters<typeof Lenis>[0];

export type InitLenisOptions = LenisConfig & {
  disabledOnTouch?: boolean;
  disabledOnMobile?: boolean;
  mobileBreakpoint?: number;
};

export type LenisController = {
  lenis: InstanceType<typeof Lenis>;
  destroy: () => void;
};

let activeController: LenisController | null = null;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice() {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function isMobileViewport(breakpoint = 768) {
  if (typeof window === "undefined") return true;
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
}

export function canUseSmoothMotion({
  disabledOnTouch = true,
  disabledOnMobile = true,
  mobileBreakpoint = 768,
}: Pick<
  InitLenisOptions,
  "disabledOnTouch" | "disabledOnMobile" | "mobileBreakpoint"
> = {}) {
  if (prefersReducedMotion()) return false;
  if (disabledOnTouch && isTouchDevice()) return false;
  if (disabledOnMobile && isMobileViewport(mobileBreakpoint)) return false;
  return true;
}

export function initLenis(options: InitLenisOptions = {}) {
  if (typeof window === "undefined") return null;

  const {
    disabledOnTouch = true,
    disabledOnMobile = true,
    mobileBreakpoint = 768,
    ...lenisOptions
  } = options;

  if (!canUseSmoothMotion({ disabledOnTouch, disabledOnMobile, mobileBreakpoint })) {
    return null;
  }

  activeController?.destroy();

  const lenis = new Lenis(lenisOptions);
  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(500, 33);

  const controller: LenisController = {
    lenis,
    destroy: () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (activeController === controller) {
        activeController = null;
      }
    },
  };

  activeController = controller;
  return controller;
}

export function destroyLenis() {
  activeController?.destroy();
}
