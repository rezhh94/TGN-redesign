import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/typography.css";
import "@/styles/nav.css";

export const metadata: Metadata = {
  title: "Tigon Studio",
  description: "Ren redesign-base for Tigon Studio.",
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
