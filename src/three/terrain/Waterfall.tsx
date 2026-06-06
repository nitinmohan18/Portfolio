"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { waterfallVertexShader, waterfallFragmentShader } from "../shaders/WaterfallShader";

export default function Waterfall() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[15, 8, -10]} rotation={[0, -Math.PI / 6, 0]}>
      {/* Waterfall face */}
      <mesh>
        <planeGeometry args={[10, 20, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={waterfallVertexShader}
          fragmentShader={waterfallFragmentShader}
          uniforms={{
            uTime: { value: 0 },
          }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Underlying cliff face behind waterfall */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[12, 22, 16, 16]} />
        <meshStandardMaterial color="#1a1c23" roughness={0.9} />
      </mesh>
    </group>
  );
}
