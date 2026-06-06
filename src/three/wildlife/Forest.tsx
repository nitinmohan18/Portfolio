"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";

export default function Forest() {
  const treeCount = 150;
  
  const leavesRef = useRef<THREE.InstancedMesh>(null);
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    // Generate tree positions mostly on the sides and background
    if (!leavesRef.current || !trunkRef.current) return;
    
    for (let i = 0; i < treeCount; i++) {
      // Distribute trees
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 20;
      
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius - 15;
      
      // Keep clear of the center lake
      if (x > -10 && x < 10 && z > -5 && z < 10) {
        x += x > 0 ? 10 : -10;
        z -= 10;
      }

      const y = Math.random() * 0.5 - 0.5; // Slight height variation
      
      const scale = 0.5 + Math.random() * 0.8;
      
      // Leaves (cone)
      dummy.position.set(x, y + 2 * scale, z);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(0, Math.random() * Math.PI, 0);
      dummy.updateMatrix();
      leavesRef.current.setMatrixAt(i, dummy.matrix);
      
      // Trunk (cylinder)
      dummy.position.set(x, y + 0.5 * scale, z);
      dummy.scale.set(scale * 0.3, scale, scale * 0.3);
      dummy.updateMatrix();
      trunkRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    leavesRef.current.instanceMatrix.needsUpdate = true;
    trunkRef.current.instanceMatrix.needsUpdate = true;
  }, [treeCount]);

  return (
    <group>
      {/* Trunks */}
      <instancedMesh ref={trunkRef} args={[undefined, undefined, treeCount]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 5]} />
        <meshStandardMaterial color="#2a1e12" roughness={1} />
      </instancedMesh>
      
      {/* Leaves */}
      <instancedMesh ref={leavesRef} args={[undefined, undefined, treeCount]} castShadow>
        <coneGeometry args={[2, 4, 6]} />
        <meshStandardMaterial color="#0b1c14" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
