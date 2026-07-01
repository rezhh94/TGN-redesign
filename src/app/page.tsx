import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { Hero } from "@/components/Hero";
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
    </main>
  );
}
