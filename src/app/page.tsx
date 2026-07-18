import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { EffectWorkBridge } from "@/components/EffectWorkBridge";
import { HomeMotion } from "@/components/motion/HomeMotion";
import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { HomeAtmosphere } from "@/components/HomeAtmosphere";
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
      <div
        className="home-atmosphere-continuum"
        data-home-atmosphere
        data-atmosphere-state="intro-focus"
      >
        <HomeAtmosphere />
        <ApproachStatementBridge />
        <WhatWeBuild />
        <OutcomeTensionBridge />
        <WhatWeImprove />
        <div className="work-process-journey" data-work-process-journey>
          <EffectWorkBridge>
            <WorkProof />
          </EffectWorkBridge>
          <ProcessLayers />
        </div>
      </div>
      <SystemManifesto />
      <ContactFooter />
      <HomeMotion />
    </main>
  );
}
