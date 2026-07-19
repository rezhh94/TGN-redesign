import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { HomeMotion } from "@/components/motion/HomeMotion";
import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { OutcomeTensionBridge } from "@/components/OutcomeTensionBridge";
import { ProcessLayers } from "@/components/ProcessLayers";
import { SystemManifesto } from "@/components/SystemManifesto";
import { WorkProof } from "@/components/WorkProof";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { WhatWeImprove } from "@/components/WhatWeImprove";

export default function Home() {
  return (
    <main id="main" className="page-shell">
      <Hero />
      <div className="homepage-body">
        <ApproachStatementBridge />
        <WhatWeBuild />
        <OutcomeTensionBridge />
        <WhatWeImprove />
        <div className="work-process-journey" data-work-process-journey>
          <WorkProof />
          <ProcessLayers />
        </div>
      </div>
      <SystemManifesto />
      <ContactFooter />
      <HomeMotion />
    </main>
  );
}
