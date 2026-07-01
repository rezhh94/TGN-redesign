import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { Hero } from "@/components/Hero";
import { WhatWeBuild } from "@/components/WhatWeBuild";

export default function Home() {
  return (
    <main id="main" className="page-shell">
      <Hero />
      <ApproachStatementBridge />
      <WhatWeBuild />
    </main>
  );
}
