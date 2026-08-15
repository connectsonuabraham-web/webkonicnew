import type { Metadata } from "next";
import { Red_Hat_Display, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ScreenFrame } from "@/components/ScreenFrame";
import { PageLoader } from "@/components/PageLoader";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FluidEffect } from "@/components/FluidEffect";
import { ScrollToTop } from "@/components/ScrollToTop";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Webkonic — Digital Growth & Technology Agency",
  description:
    "We build smarter systems, stronger digital experiences, and growth-focused solutions for modern businesses.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${redHatDisplay.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body
        className="min-h-screen"
        style={{
          fontFamily:
            'var(--font-red-hat-display), "Red Hat Display", Arial, Helvetica, sans-serif',
          backgroundColor: "rgb(13, 7, 24)",
          color: "rgb(245, 244, 248)",
        }}
      >
        <div className="noise-overlay" />
        <ScreenFrame />
        <PageLoader />
        <FluidEffect />
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
