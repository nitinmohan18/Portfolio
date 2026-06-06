"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Environment from "./Environment";
import CameraController from "./CameraController";

export default function Experience() {
  return (
    <div id="three-canvas" className="fixed inset-0 pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 60 }}
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 2]} // Optimize for performance and retina displays
      >
        <CameraController />
        <Environment />
        <Preload all />
      </Canvas>
    </div>
  );
}
