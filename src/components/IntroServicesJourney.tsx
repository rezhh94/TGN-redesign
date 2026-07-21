import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { ServicePrelude } from "@/components/ServicePrelude";
import { WhatWeBuild } from "@/components/WhatWeBuild";

export function IntroServicesJourney() {
  return (
    <div className="intro-services-journey" data-intro-services-journey>
      <ApproachStatementBridge />
      <ServicePrelude />
      <WhatWeBuild />
    </div>
  );
}
