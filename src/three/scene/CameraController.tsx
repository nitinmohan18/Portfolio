"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export default function CameraController() {
  const cameraGroupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!cameraGroupRef.current) return;

    // Mouse parallax
    const { x, y } = state.pointer;
    targetRotation.current.x = (y * Math.PI) / 40;
    targetRotation.current.y = -(x * Math.PI) / 40;

    // Smooth lerp
    cameraGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      cameraGroupRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    cameraGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      cameraGroupRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );

    // Auto cinematic drift
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    state.camera.position.y = 1.5 + Math.cos(state.clock.elapsedTime * 0.1) * 0.2;
  });

  return (
    <group ref={cameraGroupRef}>
      <PerspectiveCamera makeDefault position={[0, 1.5, 8]} fov={50} near={0.1} far={1000} />
    </group>
  );
}
