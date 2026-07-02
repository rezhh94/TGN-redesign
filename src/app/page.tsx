import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { HomeMotion } from "@/components/motion/HomeMotion";
import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { ProcessLayers } from "@/components/ProcessLayers";
import { WorkShowcase } from "@/components/WorkShowcase";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { WhatWeImprove } from "@/components/WhatWeImprove";

export default function Home() {
  return (
    <main id="main" className="page-shell">
      <Hero />
      <ApproachStatementBridge />
      <WhatWeBuild />
      <WhatWeImprove />
      <WorkShowcase />
      <ProcessLayers />
      <ContactFooter />
      <HomeMotion />
    </main>
  );
}
