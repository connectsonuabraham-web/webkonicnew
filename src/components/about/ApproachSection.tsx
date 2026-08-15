"use client";

import Link from "next/link";

export function ApproachSection() {
  return (
    <section className="relative px-6 md:px-20 py-16 md:py-24 max-w-[1400px] mx-auto">
      {/* Full width heading */}
      <h2
        className="js-s-print-opacity text-3xl md:text-4xl lg:text-5xl mb-12"
        data-start="top 80%"
        data-end="top 40%"
        style={{
          fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
          fontStyle: "italic",
        }}
      >
        Our Approach
      </h2>

      {/* Two column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <p className="js-s-lines text-sm md:text-base leading-relaxed opacity-70">
            We don&apos;t separate strategy from execution. We start with the business problem, map out the digital infrastructure needed, and build it end-to-end. No handoff chaos, no disconnected systems.
          </p>

          <div className="flex flex-col gap-2">
            <h3
              className="js-s-lines text-lg md:text-xl font-medium"
              style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif' }}
            >
              What We Believe
            </h3>
            <p className="js-s-lines text-sm md:text-base leading-relaxed opacity-70">
              Every modern business deserves AI-powered systems, professional digital experiences, and growth infrastructure that actually works together. Not scattered tools — but one connected system designed around how your business operates.
            </p>
          </div>

          {/* Available badge */}
          <div className="js-s-fade mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for projects
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3
              className="js-s-lines text-lg md:text-xl font-medium"
              style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif' }}
            >
              What to Expect
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="js-s-lines text-sm md:text-base leading-relaxed opacity-70">
                <strong className="opacity-100 font-medium">Connected systems.</strong>{" "}
                Your AI, website, marketing, and automation work together — not as isolated pieces.
              </li>
              <li className="js-s-lines text-sm md:text-base leading-relaxed opacity-70">
                <strong className="opacity-100 font-medium">Results-focused.</strong>{" "}
                We measure success by business outcomes — leads, revenue, time saved — not just deliverables.
              </li>
              <li className="js-s-lines text-sm md:text-base leading-relaxed opacity-70">
                <strong className="opacity-100 font-medium">Premium execution.</strong>{" "}
                Performant, modern, and built to scale. Not templates. Not generic. Built for your business.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
