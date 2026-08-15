"use client";

export function AboutBio() {
  return (
    <section className="relative px-6 md:px-20 py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto">
        {/* Who We Are - full width intro */}
        <div className="mb-24 md:mb-40">
          <h2
            className="js-s-print-opacity text-4xl md:text-5xl lg:text-6xl mb-10"
            data-start="top 80%"
            data-end="top 40%"
            style={{
              fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
              fontStyle: "italic",
            }}
          >
            Who We Are
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <p className="js-s-print-opacity text-base md:text-lg leading-[1.7] opacity-80" data-start="top 90%" data-end="top 30%">
              Webkonic is a premium digital growth and technology agency. We help modern businesses build, automate, and grow their digital operations — combining AI, technology, digital experiences, and performance marketing into one connected system.
            </p>
            <p className="js-s-print-opacity text-base md:text-lg leading-[1.7] opacity-80" data-start="top 90%" data-end="top 30%">
              We don&apos;t just sell individual digital services. We build the digital infrastructure around a business — from intelligent AI agents that handle customers, to websites that convert, to marketing systems that drive real revenue.
            </p>
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="mb-24 md:mb-40">
          <h3
            className="js-s-print-opacity text-2xl md:text-3xl mb-10"
            data-start="top 85%"
            data-end="top 45%"
            style={{
              fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
              fontStyle: "italic",
            }}
          >
            Our Pillars
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "AI",
                title: "AI Agents & Automation",
                desc: "Voice agents, chatbots, receptionists, sales agents, workflow automation, and custom AI systems built around your business.",
              },
              {
                label: "Digital",
                title: "Websites & Experiences",
                desc: "Custom websites, web applications, landing pages, digital products — premium, modern, and designed to convert.",
              },
              {
                label: "Growth",
                title: "SEO & Google Ads",
                desc: "Organic visibility and paid acquisition working together to drive traffic, leads, and real revenue.",
              },
              {
                label: "Brand",
                title: "Branding & Identity",
                desc: "Logo, visual identity, brand systems, and guidelines that communicate who you are before you say a word.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="js-s-fade group relative p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300"
              >
                <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono block mb-3">
                  {pillar.label}
                </span>
                <h4 className="text-lg font-medium mb-3">{pillar.title}</h4>
                <p className="text-sm opacity-50 leading-relaxed group-hover:opacity-70 transition-opacity">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Drives Us + How We Work - two column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="js-s-fade p-8 md:p-10 rounded-2xl border border-white/8 bg-white/[0.02]">
            <h3
              className="text-2xl md:text-3xl mb-5"
              style={{
                fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
                fontStyle: "italic",
              }}
            >
              What Drives Us
            </h3>
            <p className="text-sm md:text-base leading-[1.7] opacity-60">
              We believe every modern business deserves access to the kind of digital systems and AI infrastructure that used to be reserved for enterprise companies. Our mission is to make that accessible — building smarter, faster, more connected digital operations for businesses that want to lead, not follow.
            </p>
          </div>

          <div className="js-s-fade p-8 md:p-10 rounded-2xl border border-white/8 bg-white/[0.02]">
            <h3
              className="text-2xl md:text-3xl mb-5"
              style={{
                fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
                fontStyle: "italic",
              }}
            >
              How We Work
            </h3>
            <p className="text-sm md:text-base leading-[1.7] opacity-60">
              Our services work together as one connected system. A business that needs more customers might get: Branding → Website → SEO/Ads → AI Lead Qualification → CRM → AI Follow-up. We don&apos;t build isolated pieces — we build the full digital growth infrastructure.
            </p>
          </div>
        </div>

        {/* The Difference */}
        <div className="mt-24 md:mt-40 max-w-[700px]">
          <h3
            className="js-s-print-opacity text-2xl md:text-3xl mb-6"
            data-start="top 85%"
            data-end="top 45%"
            style={{
              fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
              fontStyle: "italic",
            }}
          >
            The Difference
          </h3>
          <div className="flex flex-col gap-6">
            <div className="js-s-fade flex gap-4 items-start">
              <span className="text-xs font-mono opacity-30 mt-1 shrink-0">01</span>
              <p className="text-sm md:text-base leading-relaxed opacity-70">
                <strong className="opacity-100 font-medium">Connected systems.</strong> Your AI, website, marketing, and automation work together — not as disconnected tools from different vendors.
              </p>
            </div>
            <div className="js-s-fade flex gap-4 items-start">
              <span className="text-xs font-mono opacity-30 mt-1 shrink-0">02</span>
              <p className="text-sm md:text-base leading-relaxed opacity-70">
                <strong className="opacity-100 font-medium">Results-focused.</strong> We measure success by business outcomes — leads generated, revenue driven, hours saved — not just deliverables shipped.
              </p>
            </div>
            <div className="js-s-fade flex gap-4 items-start">
              <span className="text-xs font-mono opacity-30 mt-1 shrink-0">03</span>
              <p className="text-sm md:text-base leading-relaxed opacity-70">
                <strong className="opacity-100 font-medium">Premium execution.</strong> Performant, modern, and built to scale. Not templates. Not generic. Purpose-built for your specific business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
