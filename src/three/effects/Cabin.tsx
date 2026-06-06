"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Cabin() {
  const windowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (windowMaterialRef.current) {
      // Subtle flicker
      windowMaterialRef.current.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
    }
  });

  return (
    <group position={[8, 0.5, 4]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2, 1, 1.5]} />
        <meshStandardMaterial color="#2d1f18" roughness={0.9} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 1.25, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[1.5, 1, 4]} />
        <meshStandardMaterial color="#1a110d" roughness={1} />
      </mesh>

      {/* Glowing Window */}
      <mesh position={[-1.01, 0.5, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial 
          ref={windowMaterialRef}
          color="#ff9900" 
          emissive="#ff9900" 
          emissiveIntensity={1} 
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
