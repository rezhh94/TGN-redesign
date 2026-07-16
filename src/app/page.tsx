import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { EffectWorkBridge } from "@/components/EffectWorkBridge";
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
      <ApproachStatementBridge />
      <WhatWeBuild />
      <OutcomeTensionBridge />
      <WhatWeImprove />
      <EffectWorkBridge />
      <WorkProof />
      <ProcessLayers />
      <SystemManifesto />
      <ContactFooter />
      <HomeMotion />
    </main>
  );
}
