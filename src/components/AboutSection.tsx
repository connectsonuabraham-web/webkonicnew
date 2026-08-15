"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function AboutSection() {
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
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll("[data-reveal]");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative px-6 py-32 max-w-[1400px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left - Heading */}
        <div className="lg:w-1/2">
          <h2
            data-reveal
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] reveal-section"
            style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif', fontStyle: "italic" }}
          >
            <span className="block">AI + Technology</span>
            <span className="block">+ Digital</span>
            <span className="block">Experiences</span>
            <span className="block opacity-60">+ Growth.</span>
          </h2>
        </div>

        {/* Right - Description */}
        <div className="lg:w-1/2 flex flex-col justify-end gap-6">
          <p
            data-reveal
            className="text-base leading-relaxed opacity-70 reveal-section max-w-[480px]"
          >
            We combine AI agents &amp; automation, web development, apps, e-commerce, SEO, Google Ads, and branding to provide businesses with both the technology and digital growth infrastructure they need.
          </p>
          <Link href="/about" data-reveal className="reveal-section">
            <button className="btn-outline inline-flex items-center gap-2">
              <span>Learn more</span>
              <span className="text-xs opacity-60">about Webkonic</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
