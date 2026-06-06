"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";

export default function Mountains() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate procedural mountain terrain
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 40, 128, 64);
    geo.rotateX(-Math.PI / 2);

    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      
      // We want mountains primarily in the background (z < -10)
      // and higher in the center (x between -20 and 20)
      let height = 0;
      
      if (z < -10) {
        const depthFactor = Math.abs(z + 10) / 30; // 0 to 1
        
        // Base noise
        const noise1 = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 5;
        const noise2 = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2;
        
        // Center peak grouping
        const centerDist = Math.abs(x);
        const centerPeak = Math.max(0, 15 - centerDist) * 1.2;
        
        height = (noise1 + noise2 + centerPeak) * depthFactor;
      }
      
      positions.setY(i, height > 0 ? height : 0);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      position={[0, -2, -20]}
      receiveShadow
    >
      <meshStandardMaterial 
        color="#1a233a" 
        roughness={0.8}
        metalness={0.1}
        flatShading
      />
    </mesh>
  );
}
