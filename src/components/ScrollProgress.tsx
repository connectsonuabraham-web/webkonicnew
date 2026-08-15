"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Hide on work and contact pages
  const hidden = pathname === "/work" || pathname === "/contact";

  useEffect(() => {
    if (hidden) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hidden]);

  if (hidden) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-[99998] pointer-events-none">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150"
          />
        </svg>
        <span className="absolute text-[9px] font-mono text-white/70">
          {progress}
        </span>
      </div>
    </div>
  );
}
