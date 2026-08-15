"use client";

import { useEffect, useRef } from "react";

const serviceCategories = [
  {
    label: "AI Agents & Automation",
    services: [
      {
        title: "AI Voice Agents",
        subtitle: "AI-powered phone agents for your business.",
        description:
          "Answer calls, qualify leads, book appointments, make outbound calls, and transfer to human staff — 24/7 without hiring.",
      },
      {
        title: "AI Chatbots & Receptionists",
        subtitle: "Conversational AI for websites & WhatsApp.",
        description:
          "AI systems that greet customers, answer questions, capture leads, handle support, and book appointments across all channels.",
      },
      {
        title: "Workflow Automation",
        subtitle: "Connect tools. Eliminate manual work.",
        description:
          "Automating repetitive workflows across CRM, sales, operations, marketing, support, and payments — so your team focuses on what matters.",
      },
    ],
  },
  {
    label: "Websites & Digital Experiences",
    services: [
      {
        title: "Website Development",
        subtitle: "Custom sites that convert, not just exist.",
        description:
          "Business websites, landing pages, web applications, and digital products — premium, modern, fast, and designed around your goals.",
      },
      {
        title: "E-commerce",
        subtitle: "Online stores built to sell.",
        description:
          "Custom e-commerce with seamless checkout, payment integration, inventory management, and conversion optimization built in.",
      },
      {
        title: "Apps & Software",
        subtitle: "Custom digital products for your business.",
        description:
          "Mobile apps, web applications, customer portals, admin dashboards, and API integrations — built to solve your specific problems.",
      },
    ],
  },
  {
    label: "Growth & Marketing",
    services: [
      {
        title: "SEO",
        subtitle: "Get found on Google organically.",
        description:
          "Technical SEO, content strategy, keyword optimization, and ongoing improvements that drive real organic traffic and visibility.",
      },
      {
        title: "Google Ads",
        subtitle: "Paid campaigns that deliver ROI.",
        description:
          "Search, display, and remarketing campaigns managed with precision. Traffic → Leads → Conversions → Revenue.",
      },
      {
        title: "Branding & Identity",
        subtitle: "A brand people remember.",
        description:
          "Logo, visual identity, typography, color systems, and brand guidelines that communicate who you are before you say a word.",
      },
    ],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll("[data-reveal]");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative px-6 py-32 max-w-[1400px] mx-auto">
      {/* Header */}
      <div data-reveal className="reveal-section mb-16 max-w-[700px]">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mb-6"
          style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif', fontStyle: "italic" }}
        >
          From Strategy to Launch — Everything Connected.
        </h2>
        <p className="text-sm opacity-60 leading-relaxed max-w-[500px]">
          We don&apos;t just build isolated services. We create connected digital systems — AI, websites, marketing, and automation working together to grow your business.
        </p>
      </div>

      {/* Service categories */}
      <div className="flex flex-col gap-16">
        {serviceCategories.map((category, catIdx) => (
          <div key={category.label} data-reveal className="reveal-section" style={{ transitionDelay: `${catIdx * 150}ms` }}>
            {/* Category label */}
            <p className="text-xs uppercase tracking-wider opacity-40 mb-6">
              {category.label}
            </p>

            {/* Service cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.services.map((service) => (
                <div key={service.title} className="service-card">
                  <h3 className="text-base font-medium mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-70 mb-3">{service.subtitle}</p>
                  <p className="text-xs opacity-50 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
