import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { EffectBridge } from "@/components/EffectBridge";
import { HomeMotion } from "@/components/motion/HomeMotion";
import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { ProcessLayers } from "@/components/ProcessLayers";
import { SystemManifesto } from "@/components/SystemManifesto";
import { WorkShowcase } from "@/components/WorkShowcase";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { WhatWeImprove } from "@/components/WhatWeImprove";

export default function Home() {
  return (
    <main id="main" className="page-shell">
      <Hero />
      <ApproachStatementBridge />
      <WhatWeBuild />
      <EffectBridge />
      <WhatWeImprove />
      <WorkShowcase />
      <ProcessLayers />
      <SystemManifesto />
      <ContactFooter />
      <HomeMotion />
    </main>
  );
}
