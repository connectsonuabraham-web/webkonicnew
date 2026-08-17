"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";

export function FluidEffect() {
  // Disabled on mobile for performance
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen opacity-30 hidden md:block">
      <div className="w-full h-full pointer-events-none" style={{ cursor: "none" }}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          style={{ background: "transparent", pointerEvents: "none" }}
          frameloop="demand"
        >
          <EffectComposer>
            <Fluid fluidColor="#1b1b1b" curl={20} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
