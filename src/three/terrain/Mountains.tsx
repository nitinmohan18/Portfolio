"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";

const mountainVertexShader = `
varying float vElevation;
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vElevation = modelPosition.y;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;

const mountainFragmentShader = `
varying float vElevation;
void main() {
  vec3 rockColor = vec3(0.10, 0.15, 0.27); // #1a2744
  vec3 snowColor = vec3(1.0, 1.0, 1.0);
  
  // Mix based on elevation
  float snowMix = smoothstep(6.0, 10.0, vElevation);
  vec3 finalColor = mix(rockColor, snowColor, snowMix);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function Mountains() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 60, 128, 64);
    geo.rotateX(-Math.PI / 2);

    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      
      let height = 0;
      if (z < -10) {
        const depthFactor = Math.abs(z + 10) / 40;
        const noise1 = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 6;
        const noise2 = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2.5;
        const centerDist = Math.abs(x);
        const centerPeak = Math.max(0, 15 - centerDist) * 1.5;
        height = (noise1 + noise2 + centerPeak) * depthFactor;
      }
      positions.setY(i, height > 0 ? height : 0);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -2, -25]}>
      <shaderMaterial
        vertexShader={mountainVertexShader}
        fragmentShader={mountainFragmentShader}
      />
    </mesh>
  );
}
