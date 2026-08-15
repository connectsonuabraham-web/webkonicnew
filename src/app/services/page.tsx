import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ServicesPageContent } from "@/components/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services | Webkonic",
  description:
    "Website Development, AI & Automation, SEO, Google Ads, Branding, Apps & Software, Ecommerce — everything your business needs to grow digitally.",
};

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <ServicesPageContent />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
