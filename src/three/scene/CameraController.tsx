"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseParallax } from "@/hooks/useMouseParallax";

export default function CameraController() {
  const { camera } = useThree();
  const mouse = useMouseParallax(0.5);
  
  // Initial camera position
  const targetPos = useRef(new THREE.Vector3(0, 1.5, 5));

  useFrame(() => {
    // Subtle float
    const time = Date.now() * 0.001;
    const floatY = Math.sin(time * 0.5) * 0.1;
    
    // Mouse parallax target
    const targetX = mouse.normalizedX * 1.5;
    const targetY = 1.5 + floatY + mouse.normalizedY * -0.5; // Invert Y
    
    // Smooth damp
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    
    // Always look at center/horizon slightly above
    camera.lookAt(0, 1.5, 0);
  });

  return null;
}
