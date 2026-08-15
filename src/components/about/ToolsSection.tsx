"use client";

import { DissolveEdge } from "./DissolveEdge";

const capabilities = [
  { title: "AI Agents", items: ["Voice Agents", "Chatbots", "Receptionists", "Sales Agents", "Support Agents", "Booking Agents"] },
  { title: "Automation", items: ["Workflow Automation", "CRM Integration", "Lead Qualification", "Multi-agent Systems", "Custom AI Systems"] },
  { title: "Web & Apps", items: ["Next.js", "React", "TypeScript", "Node.js", "Web Applications", "Mobile Apps"] },
  { title: "E-commerce", items: ["Custom Stores", "Payment Systems", "Checkout Optimization", "Inventory", "Analytics"] },
  { title: "Marketing", items: ["Google Ads", "SEO", "Landing Pages", "Conversion Tracking", "Performance Campaigns"] },
  { title: "Design", items: ["Brand Identity", "UI/UX", "Motion Design", "Visual Systems", "Digital Experiences"] },
];

const industries = [
  "SMEs & Startups",
  "Professional Services",
  "E-commerce",
  "Healthcare",
  "Real Estate",
  "Education",
  "Manufacturing",
  "Hospitality",
  "B2B Companies",
];

export function ToolsSection() {
  return (
    <section
      className="relative"
      style={{ color: "rgb(3, 2, 6)" }}
    >
      {/* Top - dissolve shader reveals the white section */}
      <div className="relative w-full h-[400px] overflow-hidden" style={{ backgroundColor: "transparent" }}>
        <DissolveEdge position="top" color="#f5f4f8" />
      </div>

      {/* Main content */}
      <div style={{ backgroundColor: "rgb(245, 244, 248)" }} className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <h2
            className="js-s-print-opacity text-3xl md:text-4xl mb-12"
            data-start="top 80%"
            data-end="top 40%"
            style={{
              fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
            }}
          >
            Capabilities
          </h2>

          {/* Capability cards */}
          <div className="columns-2 sm:columns-3 lg:columns-3 gap-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
            {capabilities.map((category, i) => (
              <div
                key={category.title}
                data-delay={String(i * 0.05)}
                className="js-s-fade flex flex-col p-4 min-w-[160px] bg-white/60 border border-black/8 rounded-lg"
              >
                <h3
                  className="js-s-lines text-sm font-medium mb-2"
                  style={{
                    fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
                  }}
                >
                  {category.title}
                </h3>
                <ul className="flex flex-col gap-0.5">
                  {category.items.map((item) => (
                    <li key={item} className="js-s-lines text-sm opacity-70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div className="mt-24">
            <h3
              className="js-s-print-opacity text-2xl md:text-3xl mb-6"
              data-start="top 85%"
              data-end="top 45%"
              style={{
                fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
              }}
            >
              Industries We Serve
            </h3>
            <p className="js-s-lines text-sm md:text-base leading-relaxed opacity-70 max-w-[560px] mb-8">
              Webkonic works across industries rather than being locked into one niche. We help any modern business that wants to grow, automate, and improve their digital presence.
            </p>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="js-s-fade text-xs px-3 py-1.5 rounded-full border border-black/10 opacity-70"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - dissolve shader transitions back to dark */}
      <div className="relative w-full h-[400px] overflow-hidden" style={{ backgroundColor: "transparent" }}>
        <DissolveEdge position="bottom" color="#f5f4f8" />
      </div>
    </section>
  );
}
