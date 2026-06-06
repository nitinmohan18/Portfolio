"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Fireflies() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = Math.random() * 2 + 0.1;
      const z = (Math.random() - 0.5) * 15;
      const speed = Math.random() * 0.5 + 0.5;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, offset });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      const { x, y, z, speed, offset } = particle;
      dummy.position.set(
        x + Math.sin(time * speed * 0.5 + offset) * 1.5,
        y + Math.cos(time * speed * 0.4 + offset) * 0.5,
        z + Math.sin(time * speed * 0.3 + offset) * 1.5
      );
      // Gentle scale pulsing
      const scale = 0.03 + Math.abs(Math.sin(time * speed * 2 + offset)) * 0.02;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#a78bfa" toneMapped={false} />
    </instancedMesh>
  );
}
