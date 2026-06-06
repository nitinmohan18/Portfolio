"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lighting() {
  return (
    <>
      {/* AmbientLight blue dim */}
      <ambientLight intensity={0.1} color="#4b6b9e" />
      
      {/* DirectionalLight cool white from top-left simulating moonlight */}
      <directionalLight
        position={[-20, 30, -10]}
        intensity={0.8}
        color="#e2e8f0"
        castShadow
      />
      
      {/* Cabin Warm Glow */}
      <pointLight
        position={[8, 1, 5]}
        intensity={1.5}
        color="#ff8c42"
        distance={20}
        decay={2}
      />
    </>
  );
}
