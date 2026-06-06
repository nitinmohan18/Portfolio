"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Mountains() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Simple procedural terrain using noise
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 40, 64, 64);
    
    // Displace vertices to create mountains
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Simple math-based height generation
      let z = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 2;
      z += Math.sin(x * 0.5 + y * 0.3) * 1.5;
      z += Math.sin(x * 0.05) * 4; // Main shape
      
      // Keep edges lower
      const distFromCenter = Math.sqrt(x*x + y*y);
      z = Math.max(0, z - distFromCenter * 0.1);
      
      pos.setZ(i, z);
    }
    
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: "#1c2b3b",
      roughness: 0.8,
      metalness: 0.1,
      flatShading: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, -2, -15]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      castShadow
    />
  );
}
