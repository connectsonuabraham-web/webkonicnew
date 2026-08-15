"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const crosshairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const crosshair = crosshairRef.current;
    if (!crosshair) return;

    let x = 0, y = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    let animId: number;
    function animate() {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      if (crosshair) {
        crosshair.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={crosshairRef}
      className="mix-blend-difference pointer-events-none fixed top-0 left-0 z-[100000002] h-1 w-1 will-change-transform transition-opacity duration-200 hidden md:block"
    >
      {/* Top line */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[2px] h-[6px] bg-white" />
      {/* Bottom line */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-[6px] bg-white" />
      {/* Left line */}
      <div className="absolute top-1/2 right-full -translate-y-1/2 w-[6px] h-[2px] bg-white" />
      {/* Right line */}
      <div className="absolute top-1/2 left-full -translate-y-1/2 w-[6px] h-[2px] bg-white" />
    </div>
  );
}
