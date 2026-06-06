"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const colorObj = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Primary or accent color
      colorObj.set(Math.random() > 0.5 ? "#6C63FF" : "#38BDF8");
      col[i * 3] = colorObj.r;
      col[i * 3 + 1] = colorObj.g;
      col[i * 3 + 2] = colorObj.b;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        // Gentle floating motion
        positions[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.005;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
