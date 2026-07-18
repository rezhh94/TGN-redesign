"use client";

import { useEffect, useRef } from "react";

export function HomeAtmosphere() {
  const waveRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wave = waveRef.current;
    if (!wave) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (reduced.matches || document.hidden) {
        wave.pause();
        return;
      }
      void wave.play().catch(() => {});
    };
    const guardReducedPlayback = () => {
      if (reduced.matches) wave.pause();
    };

    reduced.addEventListener("change", syncPlayback);
    wave.addEventListener("play", guardReducedPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      wave.pause();
      reduced.removeEventListener("change", syncPlayback);
      wave.removeEventListener("play", guardReducedPlayback);
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
          <div className="home-atmosphere__poster" />
          <video
            ref={waveRef}
            className="home-atmosphere__video"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            poster="/video/work-wave-poster.jpg"
            disablePictureInPicture
            data-home-atmosphere-wave
          >
            <source src="/video/work-wave-loop.mp4" type="video/mp4" />
          </video>
          <noscript>
            <style>{`.home-atmosphere__video{display:none!important}`}</style>
          </noscript>
          <div
            className="home-atmosphere__spotlight"
            data-home-atmosphere-spotlight
          />
          <div className="home-atmosphere__vignette" />
          <div className="home-atmosphere__material" />
        </div>

        <div className="home-atmosphere__veil" data-home-atmosphere-veil />
      </div>

      <div
        className="home-atmosphere__grain-stage"
        data-home-atmosphere-grain
        aria-hidden="true"
      >
        <span className="home-atmosphere__grain home-atmosphere__grain--coarse" />
        <span className="home-atmosphere__grain home-atmosphere__grain--fine" />
      </div>
    </>
  );
}
