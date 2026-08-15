"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // 1. js-s-lines: Lines reveal — slide up from below with rotation
        const lineElements =
          container.querySelectorAll<HTMLElement>(".js-s-lines");
        lineElements.forEach((el) => {
          const text = el.innerHTML;
          el.innerHTML = `<div class="overflow-hidden-mask" style="position:relative;display:block;overflow:clip;"><div class="overflow-hidden-inner" style="display:block;will-change:transform;transform:translate(0%, 100%) rotate(6deg);">${text}</div></div>`;

          const inner = el.querySelector(
            ".overflow-hidden-inner"
          ) as HTMLElement;
          if (!inner) return;

          ScrollTrigger.create({
            trigger: el,
            start: "top 95%",
            onEnter: () => {
              gsap.to(inner, {
                y: 0,
                yPercent: 0,
                rotate: 0,
                duration: 1.0,
                ease: "power3.out",
              });
            },
            onEnterBack: () => {
              gsap.to(inner, {
                y: 0,
                yPercent: 0,
                rotate: 0,
                duration: 1.0,
                ease: "power3.out",
              });
            },
          });
        });

        // 2. js-s-print-opacity: Character-by-character opacity reveal on scroll
        const printElements =
          container.querySelectorAll<HTMLElement>(".js-s-print-opacity");
        printElements.forEach((el) => {
          const text = el.textContent || "";
          el.innerHTML = text
            .split("")
            .map((char) =>
              char === " "
                ? " "
                : `<span class="print-char" style="opacity:0.1;display:inline;will-change:opacity;transition:opacity 0.05s;">${char}</span>`
            )
            .join("");

          const chars = el.querySelectorAll<HTMLElement>(".print-char");
          const start = el.getAttribute("data-start") || "top 85%";
          const end = el.getAttribute("data-end") || "bottom 30%";

          ScrollTrigger.create({
            trigger: el,
            start,
            end,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              chars.forEach((char, i) => {
                const charProgress = i / chars.length;
                const opacity = Math.min(
                  1,
                  Math.max(0.1, (progress - charProgress * 0.7) / 0.3)
                );
                char.style.opacity = String(opacity);
              });
            },
          });
        });

        // 3. js-s-fade: Simple fade in
        const fadeElements =
          container.querySelectorAll<HTMLElement>(".js-s-fade");
        fadeElements.forEach((el) => {
          const delay = parseFloat(el.getAttribute("data-delay") || "0");
          gsap.set(el, { opacity: 0, y: 20 });

          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay,
                ease: "power2.out",
              });
            },
            onEnterBack: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay,
                ease: "power2.out",
              });
            },
          });
        });

        // Refresh to catch elements already in viewport
        ScrollTrigger.refresh();
      }, container);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  );
}
