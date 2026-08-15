"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function CTASection() {
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
      { threshold: 0.3 }
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
      className="relative px-6 py-32 max-w-[1400px] mx-auto text-center"
    >
      <div data-reveal className="reveal-section">
        <p className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1]">
          <span className="block uppercase tracking-tight">Ready to</span>
          <span className="block uppercase tracking-tight">grow smarter?</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-lg md:text-xl">
          <Link
            href="mailto:hello@webkonic.com"
            className="underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Drop a line
          </Link>
          <span className="opacity-40">or simply</span>
          <span className="uppercase font-medium tracking-wide">
            GET IN TOUCH
          </span>
        </div>
      </div>
    </div>
  );
}
