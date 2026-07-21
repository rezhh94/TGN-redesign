import { HomeMotion } from "@/components/motion/HomeMotion";
import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { IntroServicesJourney } from "@/components/IntroServicesJourney";
import { ProcessLayers } from "@/components/ProcessLayers";
import { SystemManifesto } from "@/components/SystemManifesto";
import { WorkProof } from "@/components/WorkProof";
import { WhatWeImprove } from "@/components/WhatWeImprove";

export default function Home() {
  return (
    <main id="main" className="page-shell">
      <Hero />
      <div className="homepage-body">
        <IntroServicesJourney />
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
