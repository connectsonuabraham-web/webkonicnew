"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const services = [
  "Website Development",
  "AI & Automation",
  "SEO",
  "Google Ads",
  "Branding",
  "Apps & Software",
  "Ecommerce",
];

const budgets = [
  "$500 - $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $15,000",
  "$15,000+",
];

export function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [serviceOpen, setServiceOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div
        className={`max-w-[600px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium mb-4"
            style={{
              fontFamily:
                'var(--font-instrument-serif), "Instrument Serif", serif',
              fontStyle: "italic",
            }}
          >
            Contact
          </h1>
          <p className="text-base opacity-60">
            Got a project in mind?{" "}
            <span className="italic font-medium opacity-100">
              Let&apos;s talk.
            </span>
          </p>
          <Link
            href="mailto:hello@webkonic.com"
            className="inline-block mt-3 text-sm hover:opacity-80 transition-opacity"
          >
            hello@webkonic.com
          </Link>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider opacity-50">
              Name
            </label>
            <input
              type="text"
              placeholder="Elon Musk"
              className="form-input text-lg"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider opacity-50">
              Email
            </label>
            <input
              type="email"
              placeholder="elon@spacex.com"
              className="form-input text-lg"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider opacity-50">
              Company
            </label>
            <input
              type="text"
              placeholder="SpaceX"
              className="form-input text-lg"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          {/* Two columns for dropdowns on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service dropdown */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50">
                Services
              </label>
              <button
                className="form-input text-left flex justify-between items-center text-lg"
                onClick={() => {
                  setServiceOpen(!serviceOpen);
                  setBudgetOpen(false);
                }}
              >
                <span
                  className={formData.service ? "opacity-100" : "opacity-30"}
                >
                  {formData.service || "Select a service"}
                </span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    serviceOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
              {serviceOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[rgb(20,14,35)] border border-white/10 rounded-lg overflow-hidden z-50 max-h-[240px] overflow-y-auto">
                  {services.map((s) => (
                    <button
                      key={s}
                      className="block w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                      onClick={() => {
                        setFormData({ ...formData, service: s });
                        setServiceOpen(false);
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Budget dropdown */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50">
                Budget
              </label>
              <button
                className="form-input text-left flex justify-between items-center text-lg"
                onClick={() => {
                  setBudgetOpen(!budgetOpen);
                  setServiceOpen(false);
                }}
              >
                <span
                  className={formData.budget ? "opacity-100" : "opacity-30"}
                >
                  {formData.budget || "Select a range"}
                </span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    budgetOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
              {budgetOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[rgb(20,14,35)] border border-white/10 rounded-lg overflow-hidden z-50">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      className="block w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                      onClick={() => {
                        setFormData({ ...formData, budget: b });
                        setBudgetOpen(false);
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider opacity-50">
              Message
            </label>
            <textarea
              placeholder="I have a project launching in September and need..."
              className="form-input min-h-[150px] resize-none text-lg"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              className="w-full py-4 rounded-full bg-white text-[rgb(13,7,24)] font-medium text-base hover:opacity-90 transition-opacity"
              onClick={async () => {
                setSendStatus("sending");
                const res = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    access_key: "15dc0d97-afed-45a3-98d3-4367ebddc88b",
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    service: formData.service,
                    budget: formData.budget,
                    message: formData.message,
                  }),
                });
                if (res.ok) {
                  setSendStatus("success");
                  setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
                  setTimeout(() => setSendStatus("idle"), 4000);
                } else {
                  setSendStatus("error");
                  setTimeout(() => setSendStatus("idle"), 4000);
                }
              }}
            >
              {sendStatus === "sending" ? "Sending..." : sendStatus === "success" ? "✓ Sent!" : "Send message"}
            </button>
            {sendStatus === "success" && (
              <p className="text-center text-green-400 text-sm mt-3">Message sent successfully!</p>
            )}
            {sendStatus === "error" && (
              <p className="text-center text-red-400 text-sm mt-3">Failed to send. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
