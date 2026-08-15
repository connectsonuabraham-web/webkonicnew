"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What services does Webkonic offer?",
    answer: "We offer AI Agents & Automation, Website Development, Apps & Software, E-commerce, SEO, Google Ads, and Branding. Our services work together as a connected system — not isolated pieces.",
  },
  {
    question: "How do your AI agents work?",
    answer: "Our AI agents handle tasks like answering calls, qualifying leads, booking appointments, customer support, and automating workflows. They integrate with your existing tools (CRM, WhatsApp, email) and work 24/7 without hiring additional staff.",
  },
  {
    question: "How long does a typical project take?",
    answer: "It depends on the scope. A website typically takes 2-4 weeks. AI agent setup takes 1-3 weeks. Full digital systems (website + AI + automation + marketing) can take 4-8 weeks. We scope carefully and communicate timelines upfront.",
  },
  {
    question: "What's your pricing structure?",
    answer: "Projects start from $500 for simple websites and go up to $15,000+ for full digital growth systems. We provide custom quotes based on your specific needs after an initial discovery call.",
  },
  {
    question: "Do you work with businesses in specific industries?",
    answer: "We work across industries — SMEs, startups, professional services, e-commerce, healthcare, real estate, education, hospitality, and B2B companies. If your business needs to grow digitally, we can help.",
  },
  {
    question: "What makes Webkonic different from other agencies?",
    answer: "We don't just build websites or run ads in isolation. We create connected digital systems where your AI, website, marketing, and automation work together. One partner, one system, real results — not scattered tools from different vendors.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const section = sectionRef.current;
    if (section) {
      section.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative px-6 py-32 max-w-[900px] mx-auto">
      <div data-reveal className="reveal-section mb-12">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium"
          style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif', fontStyle: "italic" }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col">
        {faqs.map((faq, i) => (
          <div
            key={i}
            data-reveal
            className="reveal-section border-t border-white/10"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <button
              className="w-full flex items-center justify-between py-6 text-left group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm md:text-base font-medium pr-4 group-hover:opacity-100 opacity-80 transition-opacity">
                {faq.question}
              </span>
              <span
                className={`text-lg opacity-50 transition-transform duration-300 shrink-0 ${
                  openIndex === i ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                openIndex === i ? "max-h-[300px] pb-6" : "max-h-0"
              }`}
            >
              <p className="text-sm opacity-60 leading-relaxed pr-8">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </div>
  );
}
