"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import BotanicalParticles from "./BotanicalParticles";
import { useMousePosition } from "../hooks/useMousePosition";

interface BotanicalSceneProps {
  scrollProgress?: number;
}

export default function BotanicalScene({ scrollProgress = 0 }: BotanicalSceneProps) {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]} // Mobile performance mitigation: Cap device pixel ratio
        gl={{ powerPreference: "high-performance", antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#34c773" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#f59e0b" />
        
        <Suspense fallback={null}>
          <BotanicalParticles
            mouseX={normalizedX}
            mouseY={normalizedY}
            scrollProgress={scrollProgress}
          />
        </Suspense>
      </Canvas>

      {/* Subtle cursor gradient highlight layer */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(600px at ${
            ((normalizedX + 1) / 2) * 100
          }% ${
            ((-normalizedY + 1) / 2) * 100
          }%, rgba(52, 199, 115, 0.12), transparent 80%)`,
        }}
      />
    </div>
  );
}
