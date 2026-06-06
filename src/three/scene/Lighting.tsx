"use client";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#a0b5d9" />
      
      {/* Main directional light (moon/cool light) */}
      <directionalLight
        position={[10, 20, -10]}
        intensity={1.2}
        color="#b0c4de"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Accent light for the focal point */}
      <spotLight
        position={[-5, 10, 5]}
        intensity={2}
        color="#6C63FF"
        distance={30}
        angle={0.5}
        penumbra={1}
      />
      
      {/* Soft fill light */}
      <hemisphereLight
        args={["#030712", "#1a3a5c", 0.6]}
      />
    </>
  );
}
