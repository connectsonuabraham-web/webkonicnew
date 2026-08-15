import { Metadata } from "next";
import { Header } from "@/components/Header";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBio } from "@/components/about/AboutBio";
import { ToolsSection } from "@/components/about/ToolsSection";
import { ApproachSection } from "@/components/about/ApproachSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AboutScrollContainer } from "@/components/about/AboutScrollContainer";
import { WorkBgGradient } from "@/components/WorkBgGradient";

export const metadata: Metadata = {
  title: "About | Ricardo Chance",
  description:
    "Design Engineer & Creative Developer from Buenos Aires. Building the future of digital experiences through design, technology, and human imagination.",
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Header />
      <WorkBgGradient />
      <main>
        <AboutScrollContainer>
          <AboutHero />
          <AboutBio />
          <ToolsSection />
          <ApproachSection />
          <CTASection />
        </AboutScrollContainer>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
