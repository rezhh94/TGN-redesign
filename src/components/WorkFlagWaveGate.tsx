"use client";

import { useEffect, useRef } from "react";

type NetworkInformation = {
  saveData?: boolean;
};

export function WorkFlagWaveGate() {
  const gateRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const gate = gateRef.current;
    const route = gate?.closest<HTMLElement>("[data-work-route]");
    if (!gate || !route) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (reducedMotion || connection?.saveData) return;

    const probe = document.createElement("canvas");
    const supportsWebGL = Boolean(
      probe.getContext("webgl2")
      || probe.getContext("webgl")
      || probe.getContext("experimental-webgl"),
    );
    if (!supportsWebGL) return;

    let cancelled = false;
    let loading = false;
    let teardown: (() => void) | undefined;

    const load = async () => {
      if (loading || cancelled) return;
      loading = true;

      try {
        const { initWorkFlagWave } = await import("@/components/motion/WorkFlagWave");
        if (cancelled) return;
        teardown = initWorkFlagWave(route);
      } catch {
        route.setAttribute("data-work-wave-failed", "");
      }
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) return;
        observer?.disconnect();
        void load();
      }, { rootMargin: "400px 0px", threshold: 0 })
      : null;

    if (observer) observer.observe(route);
    else void load();

    return () => {
      cancelled = true;
      observer?.disconnect();
      teardown?.();
    };
  }, []);

  return <span ref={gateRef} className="work-route__wave-gate" aria-hidden="true" />;
}
