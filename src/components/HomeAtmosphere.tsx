"use client";

import { useEffect, useRef } from "react";
import { WorkAtmosphereCanvas } from "@/components/WorkAtmosphereCanvas";

export function HomeAtmosphere() {
  const waveRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wave = waveRef.current;
    if (!wave) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 768px)");

    const syncPlayback = () => {
      if (reduced.matches || compact.matches || document.hidden) {
        wave.pause();
        return;
      }
      void wave.play().catch(() => {});
    };

    reduced.addEventListener("change", syncPlayback);
    compact.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      wave.pause();
      reduced.removeEventListener("change", syncPlayback);
      compact.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <>
      <div
        className="home-atmosphere__backdrop"
        data-home-atmosphere-backdrop
        aria-hidden="true"
      >
        <div className="home-atmosphere__details" data-home-atmosphere-details>
          <video
            ref={waveRef}
            className="home-atmosphere__video"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            data-home-atmosphere-wave
          >
            <source src="/video/work-wave-loop.mp4" type="video/mp4" />
          </video>
          <div
            className="home-atmosphere__spotlight"
            data-home-atmosphere-spotlight
          />
          <div className="home-atmosphere__vignette" />
        </div>

        <div className="home-atmosphere__veil" data-home-atmosphere-veil />
      </div>

      <div
        className="home-atmosphere__grain-stage"
        data-home-atmosphere-grain
        aria-hidden="true"
      >
        <WorkAtmosphereCanvas />
      </div>
    </>
  );
}
