"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Waterfall() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6; // x spread
      pos[i * 3 + 1] = Math.random() * 20; // y height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2; // z depth
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      y -= speeds[i];
      if (y < -5) {
        y = 15;
      }
      posAttr.setY(i, y);
      
      // Slight x sway
      let x = posAttr.getX(i);
      x += Math.sin(y * 0.5) * 0.02;
      posAttr.setX(i, x);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group position={[18, 5, -12]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#dbeafe" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      {/* Underlying cliff face behind waterfall */}
      <mesh position={[0, 5, -2]}>
        <planeGeometry args={[8, 25, 1, 1]} />
        <meshStandardMaterial color="#0f172a" roughness={1} />
      </mesh>
    </group>
  );
}
