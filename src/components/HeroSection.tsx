"use client";

import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Preload video and reveal section faster
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
      video.addEventListener('canplay', () => {
        setVideoLoaded(true);
      });
    }

    // Faster reveal - don't wait for loader
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/videos/webkonic.mp4" type="video/mp4" />
        </video>
        {/* Fallback background while video loads */}
        <div className={`absolute inset-0 bg-[rgb(13,7,24)] transition-opacity duration-500 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(13,7,24)] via-[rgb(13,7,24)]/50 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full min-h-screen px-6 md:px-12 lg:px-20 pb-16 lg:pb-20 pt-32 w-full">
        {/* Top left - Small label + Main heading */}
        <div className="flex flex-col gap-3 mt-8">
          <div className="overflow-clip">
            <p
              className={`text-xs tracking-widest uppercase text-white/60 font-mono transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                revealed ? "translate-y-0 rotate-0" : "translate-y-[120%] rotate-[6deg]"
              }`}
            >
              [ WE ARE WEBKONIC ]
            </p>
          </div>
          <div className="overflow-clip">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl max-w-[600px] leading-[1.1] tracking-tight transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
                revealed ? "translate-y-0 rotate-0" : "translate-y-[120%] rotate-[6deg]"
              }`}
              style={{
                fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
                fontStyle: "italic",
              }}
            >
              A DIGITAL AGENCY<br />
              BUILT TO BUILD<br />
              BETTER BUSINESSES.
            </h1>
          </div>
        </div>

        {/* Bottom row - Buttons left, Sub-para right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Buttons - bottom left */}
          <div className="overflow-clip">
            <div
              className={`flex gap-3 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${
                revealed ? "translate-y-0 rotate-0" : "translate-y-[120%] rotate-[6deg]"
              }`}
            >
              <a href="/contact">
                <button className="btn-outline text-sm">
                  Start a project
                </button>
              </a>
              <a href="/work">
                <button className="btn-outline text-sm">View work</button>
              </a>
            </div>
          </div>

          {/* Sub-para - bottom right */}
          <div className="lg:max-w-[380px] overflow-clip">
            <p
              className={`text-sm md:text-base leading-relaxed transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
                revealed ? "translate-y-0 rotate-0" : "translate-y-[120%] rotate-[6deg]"
              }`}
            >
              Brands that connect. Websites that perform. AI systems that work.
              Marketing that moves. Everything your business needs to grow in a
              digital world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
