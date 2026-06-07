"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroBackground() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-dark-950">
      {/* Deep premium gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1120] via-dark-950 to-dark-950" />
      
      {/* Subtle glows */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-[var(--accent-blue)]/5 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-[var(--accent-purple)]/5 rounded-full blur-[120px] mix-blend-screen" />

      {/* Lightweight particle field */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/[0.05]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: ["0%", "-100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
