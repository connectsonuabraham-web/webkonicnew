"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We analyze your business, identify growth opportunities, and map out the digital infrastructure you need.",
  },
  {
    number: "02",
    title: "Design & Architecture",
    description:
      "Visual design, system architecture, and AI workflow planning. You see the full picture before we build.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description:
      "Development, AI deployment, automation setup, and system integration — everything connected and working together.",
  },
  {
    number: "04",
    title: "Launch & Growth",
    description:
      "Deployment, optimization, and ongoing support. We stay involved to ensure your systems keep delivering results.",
  },
];

export function ProcessSection() {
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
      { threshold: 0.15 }
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
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left - Header */}
        <div className="lg:w-1/2 lg:sticky lg:top-32 lg:self-start">
          <h2
            data-reveal
            className="reveal-section text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif', fontStyle: "italic" }}
          >
            A process built around results.
          </h2>
          <p data-reveal className="reveal-section text-sm opacity-60 leading-relaxed max-w-[400px] mb-8">
            No surprises, no disconnected tools. Just a clear path from first conversation to a connected digital system that works.
          </p>
          <a
            href="/contact"
            data-reveal
            className="reveal-section btn-primary"
          >
            Let&apos;s build something
          </a>
        </div>

        {/* Right - Steps */}
        <div className="lg:w-1/2 flex flex-col gap-12">
          {steps.map((step, i) => (
            <div
              key={step.number}
              data-reveal
              className="process-step flex flex-col gap-3 pb-12 border-b border-white/8 last:border-b-0"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="text-xs opacity-40 font-mono">
                {step.number}
              </span>
              <h3 className="text-xl font-medium">{step.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed max-w-[380px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
