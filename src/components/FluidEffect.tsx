"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";

export function FluidEffect() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen opacity-40">
      <div className="w-full h-full pointer-events-none" style={{ cursor: "none" }}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 50 }}
          gl={{ alpha: true, antialias: false }}
          style={{ background: "transparent", pointerEvents: "none" }}
        >
          <EffectComposer>
            <Fluid fluidColor="#1b1b1b" curl={30} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
