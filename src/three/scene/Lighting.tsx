"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.1} color="#4b6b9e" />
      
      {/* Moon Light */}
      <directionalLight
        position={[-10, 20, -20]}
        intensity={0.6}
        color="#8aaedc"
        castShadow
      />
      
      {/* Cabin Warm Glow */}
      <pointLight
        position={[8, 1, 5]}
        intensity={1.5}
        color="#ff9900"
        distance={20}
        decay={2}
      />
      
      {/* Subtle Waterfall rim light */}
      <spotLight
        position={[15, 15, -10]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        color="#a2c2e6"
        distance={40}
        decay={2}
      />
    </>
  );
}
