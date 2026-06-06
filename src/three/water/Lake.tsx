"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { waterVertexShader, waterFragmentShader } from "./WaterShader";

export default function Lake() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveHeight: { value: 0.08 },
      uWaveFrequency: { value: 2.5 },
      uDepthColor: { value: new THREE.Color("#0d1b3e") },
      uSurfaceColor: { value: new THREE.Color("#1a3a5c") },
      uColorOffset: { value: 0.08 },
      uColorMultiplier: { value: 5.0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
