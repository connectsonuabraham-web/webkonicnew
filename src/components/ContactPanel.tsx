"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ContactPanel({
  isOverlay = false,
  onClose,
}: {
  isOverlay?: boolean;
  onClose?: () => void;
}) {
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
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Trigger slide-in animation
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      } else {
        router.back();
      }
    }, 400);
  };

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

  return (
    <>
      {/* Backdrop (only for overlay mode) */}
      {isOverlay && (
        <div
          className={`fixed inset-0 z-[999998] bg-black/50 backdrop-blur-sm transition-opacity duration-400 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className={`${
          isOverlay ? "fixed" : "relative min-h-screen"
        } top-0 right-0 z-[999999] w-full ${
          isOverlay ? "max-w-[480px]" : ""
        } h-full bg-[rgb(13,7,24)] border-l border-white/8 flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden ${
          isOverlay
            ? visible
              ? "translate-x-0"
              : "translate-x-full"
            : ""
        }`}
        style={
          !isOverlay
            ? {
                background:
                  "linear-gradient(180deg, rgb(13, 7, 24) 0%, rgb(18, 10, 32) 100%)",
              }
            : undefined
        }
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-2">
          <div>
            <h2
              className="text-3xl md:text-4xl font-medium"
              style={{
                fontFamily:
                  'var(--font-instrument-serif), "Instrument Serif", serif',
                fontStyle: "italic",
              }}
            >
              Contact
            </h2>
            <p className="text-sm opacity-60 mt-1">
              Got a project in mind?{" "}
              <span className="italic font-medium opacity-100">
                Let&apos;s talk.
              </span>
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
            aria-label="Close contact form"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Email link */}
        <div className="px-8 pb-4">
          <Link
            href="mailto:hello@webkonic.com"
            className="text-sm hover:opacity-80 transition-opacity"
          >
            hello@webkonic.com
          </Link>
        </div>

        {/* Form - no scroll on desktop, scrollable on mobile */}
        <div className="flex-1 flex flex-col px-8 pb-6 overflow-y-auto md:overflow-hidden">
          <div className="flex flex-col flex-1 gap-0">
            {/* Name */}
            <div className="flex flex-col border-t border-white/8 py-2 md:py-4">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Elon Musk"
                className="bg-transparent outline-none text-sm md:text-base py-1 placeholder:text-white/30"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="flex flex-col border-t border-white/8 py-2 md:py-4">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="elon@spacex.com"
                className="bg-transparent outline-none text-sm md:text-base py-1 placeholder:text-white/30"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Company */}
            <div className="flex flex-col border-t border-white/8 py-2 md:py-4">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50 mb-1">
                Company
              </label>
              <input
                type="text"
                placeholder="SpaceX"
                className="bg-transparent outline-none text-sm md:text-base py-1 placeholder:text-white/30"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>

            {/* Service dropdown */}
            <div className="flex flex-col border-t border-white/8 py-2 md:py-4 relative">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50 mb-1">
                Services
              </label>
              <button
                className="bg-transparent outline-none text-sm md:text-base py-1 text-left flex justify-between items-center"
                onClick={() => {
                  setServiceOpen(!serviceOpen);
                  setBudgetOpen(false);
                }}
              >
                <span className={formData.service ? "opacity-100" : "opacity-30"}>
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
                  className={`transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
              {serviceOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[rgb(20,14,35)] border border-white/10 rounded-lg overflow-hidden z-50 max-h-[180px] overflow-y-auto">
                  {services.map((s) => (
                    <button
                      key={s}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
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
            <div className="flex flex-col border-t border-white/8 py-2 md:py-4 relative">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50 mb-1">
                Budget
              </label>
              <button
                className="bg-transparent outline-none text-sm md:text-base py-1 text-left flex justify-between items-center"
                onClick={() => {
                  setBudgetOpen(!budgetOpen);
                  setServiceOpen(false);
                }}
              >
                <span className={formData.budget ? "opacity-100" : "opacity-30"}>
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
                  className={`transition-transform duration-200 ${budgetOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
              {budgetOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[rgb(20,14,35)] border border-white/10 rounded-lg overflow-hidden overflow-y-auto max-h-[180px] z-50">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
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

            {/* Message - takes remaining space */}
            <div className="flex flex-col border-t border-white/8 py-2 md:py-4 flex-1 min-h-[80px]">
              <label className="text-[11px] font-medium uppercase tracking-wider opacity-50 mb-1">
                Message
              </label>
              <textarea
                placeholder="I have a project launching in September and need..."
                className="bg-transparent outline-none text-sm md:text-base py-1 placeholder:text-white/30 flex-1 resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
          </div>

          {/* Send message button at bottom */}
          <div className="pt-4">
            <button
              className="w-full py-4 rounded-full bg-white text-[rgb(13,7,24)] font-medium text-sm hover:opacity-90 transition-opacity"
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
    </>
  );
}
