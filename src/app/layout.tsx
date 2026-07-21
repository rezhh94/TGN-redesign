import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/SiteHeader";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/typography.css";
import "@/styles/actions.css";
import "@/styles/nav.css";
import "@/styles/hero.css";
import "@/styles/approach-statement-bridge.css";
import "@/styles/intro-services-journey.css";
import "@/styles/service-prelude.css";
import "@/styles/what-we-build.css";
import "@/styles/outcome-tension-bridge.css";
import "@/styles/what-we-improve.css";
import "@/styles/homepage-body.css";
import "@/styles/work-proof.css";
import "@/styles/process-layers.css";
import "@/styles/system-manifesto.css";
import "@/styles/contact-footer.css";

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/PPNeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const familjenGrotesk = localFont({
  src: [
    {
      path: "./fonts/FamiljenGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/FamiljenGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const martianMono = localFont({
  src: "./fonts/MartianMono-StdLt.woff2",
  weight: "300",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  fallback: ["SFMono-Regular", "Consolas", "monospace"],
});

const editorialNew = localFont({
  src: "./fonts/PPEditorialNew-Ultralight.woff2",
  weight: "200",
  style: "normal",
  variable: "--font-editorial",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

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
    <html
      lang="nb"
      className={`${neueMontreal.variable} ${familjenGrotesk.variable} ${martianMono.variable} ${editorialNew.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
