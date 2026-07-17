import type { ReactNode } from "react";
import { WorkAtmosphereCanvas } from "@/components/WorkAtmosphereCanvas";

export function EffectWorkAtmosphere() {
  return (
    <>
      <div
        className="effect-work-continuum__backdrop"
        data-effect-work-backdrop
        aria-hidden="true"
      >
        <div className="work-atmosphere__details" data-work-atmosphere-details>
          <video
            className="work-atmosphere__video"
            muted
            playsInline
            loop
            preload="none"
            data-work-wave
          >
            <source data-src="/video/work-wave-loop.mp4" type="video/mp4" />
          </video>
          <div
            className="work-atmosphere__spotlight"
            data-work-atmosphere-spotlight
          />
          <div className="work-atmosphere__vignette" />
        </div>

        <div className="effect-work-continuum__veil" data-effect-veil />
      </div>

      <div
        className="effect-work-continuum__grain-stage"
        data-effect-grain
        aria-hidden="true"
      >
        <WorkAtmosphereCanvas />
      </div>
    </>
  );
}

export function EffectWorkBridge({ children }: { children: ReactNode }) {
  return (
    <div className="effect-work-journey" data-effect-work-journey>
      {children}
    </div>
  );
}
