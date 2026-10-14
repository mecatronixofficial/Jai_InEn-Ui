import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/pages.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import OpeningSpecialCard from "@/components/OpeningSpecialCard";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thangaveltextile.in"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "textile manufacturer Erode",
    "cotton petticoat",
    "lungi manufacturer",
    "wholesale textile India",
    "handloom lungi",
    "cotton bed sheets",
    "Tamil Nadu textile",
    "gamcha",
    "cotton dhoti",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-cream-50 text-ink">
        <Navbar />
        <main className="public-page min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollToTop />
        <OpeningSpecialCard />
      </body>
    </html>
  );
}
