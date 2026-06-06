"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Mist() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 30;

  // Create a simple radial gradient for the mist sprite
  const spriteTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const mists = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        15 + (Math.random() - 0.5) * 10,
        Math.random() * 8,
        -10 + (Math.random() - 0.5) * 10
      ),
      scale: 3 + Math.random() * 4,
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((sprite, i) => {
      const mist = mists[i];
      sprite.position.x = mist.position.x + Math.sin(time * mist.speed + mist.offset) * 2;
      sprite.position.y = mist.position.y + Math.cos(time * mist.speed * 0.5 + mist.offset) * 1;
      
      const currentScale = mist.scale + Math.sin(time * mist.speed + mist.offset) * 1.5;
      sprite.scale.set(currentScale, currentScale, 1);
    });
  });

  return (
    <group ref={groupRef}>
      {mists.map((mist, i) => (
        <sprite key={i} position={mist.position} scale={[mist.scale, mist.scale, 1]}>
          <spriteMaterial 
            map={spriteTexture} 
            color="#ffffff" 
            transparent 
            opacity={0.08} 
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
