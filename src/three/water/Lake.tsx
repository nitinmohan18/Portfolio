"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lake() {
  const mapRef = useRef<THREE.Texture | null>(null);
  
  const normalMap = useMemo(() => {
    // We create a procedural noise canvas for the normal map to simulate ripples
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#8080ff"; // flat normal
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "#9999ff" : "#6666ff";
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
  }, []);

  useFrame((state) => {
    if (normalMap) {
      normalMap.offset.x -= 0.001;
      normalMap.offset.y += 0.002;
    }
  });

  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <meshStandardMaterial
        color="#0d2035"
        roughness={0.1}
        metalness={0.9}
        normalMap={normalMap}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}
