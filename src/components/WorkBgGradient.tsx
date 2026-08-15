"use client";

import { useEffect, useRef } from "react";

export function WorkBgGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.45, y: 0.35, targetX: 0.45, targetY: 0.35 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; speed: number }[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
        speed: Math.random() * 0.5 + 0.5,
      });
    }

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      const m = mouseRef.current;

      m.x += (m.targetX - m.x) * 0.02;
      m.y += (m.targetY - m.y) * 0.02;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw radial gradient blob
      const centerX = m.x * w;
      const centerY = m.y * h;
      const radius = Math.max(w, h) * 0.8;

      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, "rgba(99, 78, 126, 0.5)");
      gradient.addColorStop(0.4, "rgba(64, 48, 82, 0.3)");
      gradient.addColorStop(1, "rgba(3, 2, 5, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw particles
      for (const p of particles) {
        // Move particles
        p.x += p.vx * p.speed;
        p.y += p.vy * p.speed;

        // Slight attraction to mouse
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.3) {
          p.vx += dx * 0.00002;
          p.vy += dy * 0.00002;
        }

        // Wrap around
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        // Draw
        const px = p.x * w;
        const py = p.y * h;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 160, 220, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-1] opacity-40"
    />
  );
}
