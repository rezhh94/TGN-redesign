import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/typography.css";
import "@/styles/nav.css";
import "@/styles/hero.css";
import "@/styles/approach-statement-bridge.css";
import "@/styles/what-we-build.css";
import "@/styles/what-we-improve.css";
import "@/styles/work-showcase.css";
import "@/styles/process-layers.css";
import "@/styles/contact-footer.css";

export const metadata: Metadata = {
  title: "Tigon Studio | Nettsider og apper som blir funnet",
  description: "Tigon Studio bygger nettsider og apper som blir funnet, forstått og valgt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
