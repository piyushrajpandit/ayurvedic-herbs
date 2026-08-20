"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BotanicalParticlesProps {
  mouseX: number;
  mouseY: number;
  scrollProgress?: number;
}

export default function BotanicalParticles({
  mouseX,
  mouseY,
  scrollProgress = 0,
}: BotanicalParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const meshGroupRef = useRef<THREE.Group>(null!);

  const particleCount = 1200;

  // Generate random particle positions and colors for botanical atmosphere
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const colorEmerald = new THREE.Color("#34c773");
    const colorGold = new THREE.Color("#f59e0b");
    const colorForest = new THREE.Color("#0b2e1a");

    for (let i = 0; i < particleCount; i++) {
      const radius = 12 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = colorEmerald.clone();
      const rand = Math.random();
      if (rand > 0.7) {
        mixedColor.lerp(colorGold, Math.random());
      } else if (rand < 0.3) {
        mixedColor.lerp(colorForest, Math.random());
      }

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }

    if (meshGroupRef.current) {
      // Rotate inner botanical geometric torus mesh
      meshGroupRef.current.rotation.y += delta * 0.2;
      meshGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

      // Parallax smooth camera mapping based on cursor position
      const targetX = mouseX * 1.5;
      const targetY = mouseY * 1.5;
      meshGroupRef.current.position.x += (targetX - meshGroupRef.current.position.x) * 0.05;
      meshGroupRef.current.position.y += (targetY - meshGroupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group>
      {/* Background Particle Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Central Interactive Botanical Core Geometry */}
      <group ref={meshGroupRef} position={[2, 0, 0]}>
        <mesh>
          <torusKnotGeometry args={[1.8, 0.45, 128, 32]} />
          <meshStandardMaterial
            color="#1b6f3f"
            roughness={0.2}
            metalness={0.8}
            wireframe
            emissive="#06180e"
          />
        </mesh>
        
        {/* Inner Glowing Crystal Core */}
        <mesh>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial
            color="#34c773"
            emissive="#10b981"
            emissiveIntensity={0.6}
            roughness={0.1}
            wireframe={false}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>
    </group>
  );
}
