"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Mist() {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: 10 + Math.random() * 10,
      y: Math.random() * 5,
      z: -5 - Math.random() * 15,
      speed: 0.1 + Math.random() * 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.x + Math.sin(time * particle.speed + particle.offset) * 2,
        particle.y + Math.cos(time * particle.speed * 0.5 + particle.offset) * 1,
        particle.z + Math.sin(time * particle.speed * 0.8 + particle.offset) * 2
      );
      
      const scale = 2 + Math.sin(time * particle.speed + particle.offset) * 0.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[2, 16, 16]} />
      <meshBasicMaterial 
        color="#a2c2e6" 
        transparent 
        opacity={0.03} 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
