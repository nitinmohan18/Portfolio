"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Birds() {
  const count = 12;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const birds = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 60,
      y: 15 + Math.random() * 10,
      z: -20 - Math.random() * 20,
      speed: 1 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    
    birds.forEach((bird, i) => {
      // Move right to left slowly
      bird.x -= bird.speed * 0.05;
      
      // Loop around
      if (bird.x < -30) {
        bird.x = 30 + Math.random() * 10;
        bird.y = 15 + Math.random() * 10;
      }
      
      const wingFlap = Math.sin(time * 10 + bird.offset) * 0.2;
      
      dummy.position.set(
        bird.x,
        bird.y + Math.sin(time * bird.speed * 0.5 + bird.offset) * 2,
        bird.z
      );
      
      // Point towards flight direction
      dummy.rotation.set(0, -Math.PI / 2, wingFlap);
      
      const scale = 0.2 + (bird.z / -100);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Simple V shape low poly bird */}
      <coneGeometry args={[1, 2, 3]} />
      <meshBasicMaterial color="#0f172a" fog={true} />
    </instancedMesh>
  );
}
