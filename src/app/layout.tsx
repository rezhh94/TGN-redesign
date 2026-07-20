import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/typography.css";
import "@/styles/actions.css";
import "@/styles/nav.css";
import "@/styles/hero.css";
import "@/styles/approach-statement-bridge.css";
import "@/styles/intro-services-journey.css";
import "@/styles/what-we-build.css";
import "@/styles/outcome-tension-bridge.css";
import "@/styles/what-we-improve.css";
import "@/styles/homepage-body.css";
import "@/styles/work-proof.css";
import "@/styles/process-layers.css";
import "@/styles/system-manifesto.css";
import "@/styles/contact-footer.css";

export const metadata: Metadata = {
  title: "Tigon Studio | Nettsider og apper som blir funnet",
  description: "Tigon Studio bygger nettsider og apper som blir funnet, forstått og valgt.",
  icons: {
    icon: [
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/brand/favicon-32.png",
    apple: [{ url: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body>
        {/* LCP er tekst i disse tre fontene; preload fjerner font-swap-blinket.
            React hoister link-elementene til <head>. */}
        <link
          rel="preload"
          href="/fonts/TGSPerfectCondensed.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/JUSTSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CSCalebMono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
