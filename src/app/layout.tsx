import type { Metadata } from "next";
import { DM_Sans, Libre_Baskerville, Montserrat, Poppins } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/pages.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import OpeningSpecialCard from "@/components/OpeningSpecialCard";
import { siteConfig } from "@/data/site";

const display = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const publicHeading = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-heading",
  display: "swap",
});

const publicBody = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-public-body",
  display: "swap",
});

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
    <html lang="en" className={`${display.variable} ${sans.variable} ${publicHeading.variable} ${publicBody.variable}`}>
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
