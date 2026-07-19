import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { WhatWeBuild } from "@/components/WhatWeBuild";

export function IntroServicesJourney() {
  return (
    <div className="intro-services-journey" data-intro-services-journey>
      <ApproachStatementBridge />

      <div
        className="intro-services-journey__bridge"
        data-intro-services-bridge
        aria-label="Fra én helhet til fem fagområder"
      >
        <div className="intro-services-journey__bridge-grid">
          <p className="intro-services-journey__bridge-label" data-journey-from>
            <span>01</span>
            <span>Én helhet</span>
          </p>

          <div className="intro-services-journey__axis" aria-hidden="true">
            <span className="intro-services-journey__axis-line" />
            <span className="intro-services-journey__axis-progress" data-journey-progress />
            <span className="intro-services-journey__axis-marker" data-journey-marker>
              <span />
              <span />
            </span>
          </div>

          <p className="intro-services-journey__bridge-label" data-journey-to>
            <span>02</span>
            <span>Fem fag</span>
          </p>
        </div>
      </div>

      <WhatWeBuild />
    </div>
  );
}
