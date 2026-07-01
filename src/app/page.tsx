import { ApproachStatementBridge } from "@/components/ApproachStatementBridge";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main id="main" className="page-shell">
      <Hero />
      <ApproachStatementBridge />
    </main>
  );
}
