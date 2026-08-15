"use client";

import { useState, useEffect } from "react";

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");

  useEffect(() => {
    // Phase 1: Show loader briefly
    const t1 = setTimeout(() => setPhase("revealing"), 800);
    // Phase 2: Slide away
    const t2 = setTimeout(() => setPhase("done"), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "revealing" ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ backgroundColor: "rgb(13, 7, 24)" }}
    >
      {/* Logo or loading indicator */}
      <div
        className={`transition-opacity duration-500 ${
          phase === "revealing" ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src="/images/logo.png"
          alt="Webkonic"
          className="h-10 w-auto animate-pulse"
        />
      </div>
    </div>
  );
}
