import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WorkBgGradient } from "@/components/WorkBgGradient";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <WorkBgGradient />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedWork />
        <ServicesSection />
        <ProcessSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
