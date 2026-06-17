"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HexagonPortraitProps {
  isVisible?: boolean;
}

const PARTICLES = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  size: Math.random() * 2 + 1.5,
  orbitSpeed: Math.random() * 20 + 20,
  orbitRadius: Math.random() * 15 + 40, // 40% to 55% from center
  initialAngle: Math.random() * 360,
  reverse: Math.random() > 0.5,
}));

export default function HexagonPortrait({ isVisible = true }: HexagonPortraitProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Motion values for smooth, spring-based parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Background glow moves slightly opposite for a depth effect
  const glowX = useTransform(springX, (v) => v * -0.6);
  const glowY = useTransform(springY, (v) => v * -0.6);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      // Max movement ~12px each way
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[420px] aspect-square flex items-center justify-center -translate-y-8 lg:-translate-y-16 xl:-translate-y-24 group z-20">
      
      {/* Ambient Glow / Halo (Depth & Lighting) */}
      <motion.div
        className="absolute inset-0 rounded-full blur-[80px] mix-blend-screen pointer-events-none breathing-glow"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(8,145,178,0.15) 40%, transparent 70%)",
          x: isDesktop ? glowX : 0,
          y: isDesktop ? glowY : 0,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* Orbiting Particles */}
      {isVisible && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.6, type: "spring", stiffness: 40, damping: 20 }}
        >
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute inset-0"
              style={{ transform: `rotate(${p.initialAngle}deg)` }}
            >
              <div
                className="absolute inset-0"
                style={{
                  animation: `orbit ${p.orbitSpeed}s linear infinite ${p.reverse ? "reverse" : "normal"}`,
                  animationDelay: `-${Math.random() * 20}s`,
                }}
              >
                <div
                  className="absolute rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    top: `${50 - p.orbitRadius}%`,
                    left: '50%',
                    opacity: Math.random() * 0.4 + 0.3,
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Floating & Parallax Container */}
      <motion.div
        className="relative w-full h-full z-10 flex items-center justify-center cursor-pointer"
        style={{
          x: isDesktop ? springX : 0,
          y: isDesktop ? springY : 0,
          transformPerspective: 1200,
        }}
        initial={{ 
          opacity: 0, 
          scale: 0.4, 
          rotateY: 120, 
          rotateX: 30, 
          z: -800,
          filter: "blur(20px) saturate(0) brightness(2)" 
        }}
        animate={isVisible ? { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0, 
          rotateX: 0, 
          z: 0,
          filter: "blur(0px) saturate(1) brightness(1)" 
        } : { 
          opacity: 0, 
          scale: 0.4, 
          rotateY: 120, 
          rotateX: 30, 
          z: -800,
          filter: "blur(20px) saturate(0) brightness(2)" 
        }}
        whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 15 } }}
        whileTap={{ 
          scale: 0.97, 
          rotateX: 8, 
          rotateY: -4, 
          filter: "brightness(1.1) saturate(1.1)", 
          transition: { type: "spring", stiffness: 600, damping: 20 } 
        }}
        transition={{ 
          delay: 0.2, 
          type: "spring", 
          stiffness: 60, 
          damping: 18, 
          mass: 1.2 
        }}
      >
        {/* Continuous Floating CSS Animation Wrapper */}
        <div className="relative w-full h-full portrait-float">
          {/* Breathing Neon Glow wrapper */}
          <div className="relative w-full h-full breathing-drop-shadow transition-all duration-500 group-hover:drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]">
            
            <div 
              className="relative w-full h-full overflow-hidden transition-all duration-500 group-hover:contrast-[1.05]" 
              style={{ 
                clipPath: "polygon(50% 0%, 92.5% 25%, 92.5% 75%, 50% 100%, 7.5% 75%, 7.5% 25%)",
                WebkitClipPath: "polygon(50% 0%, 92.5% 25%, 92.5% 75%, 50% 100%, 7.5% 75%, 7.5% 25%)"
              }}
            >
              <Image
                src="/images/hexagon-portrait.jpg"
                alt="Hexagon Portrait"
                fill
                priority
                className="object-contain select-none scale-105"
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 45vw"
              />

              {/* Premium Vignette Overlay to obscure background text */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  background: "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(5,10,20,0.75) 75%, rgba(5,10,20,0.95) 100%)"
                }} 
              />

              {/* Additional side-shadows to specifically target the text areas */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-multiply" 
                style={{
                  background: "linear-gradient(90deg, rgba(5,10,20,0.8) 0%, transparent 25%, transparent 75%, rgba(5,10,20,0.8) 100%)"
                }} 
              />

              {/* Edge Highlights */}
              <div className="absolute inset-0 shadow-[inset_0_0_25px_rgba(34,211,238,0.4)] pointer-events-none mix-blend-overlay" />
              
              {/* Glass Reflection Sweep */}
              <div className="absolute inset-0 pointer-events-none glass-sweep mix-blend-overlay" />
            </div>

          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes floatPremium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .portrait-float {
          animation: floatPremium 8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes breathingGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        .breathing-glow {
          animation: breathingGlow 6s ease-in-out infinite;
          will-change: opacity;
        }

        @keyframes breathingDropShadow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(34,211,238,0.25)); }
          50% { filter: drop-shadow(0 0 28px rgba(34,211,238,0.45)); }
        }
        .breathing-drop-shadow {
          animation: breathingDropShadow 6s ease-in-out infinite;
          will-change: filter;
        }

        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glassSweep {
          0% { transform: translateX(-150%) skewX(-45deg); opacity: 0; }
          8% { opacity: 0.5; }
          15% { transform: translateX(300%) skewX(-45deg); opacity: 0; }
          100% { transform: translateX(300%) skewX(-45deg); opacity: 0; }
        }
        .glass-sweep {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.4),
            transparent
          );
          width: 50%;
          height: 200%;
          top: -50%;
          left: 0;
          animation: glassSweep 12s cubic-bezier(0.19, 1, 0.22, 1) infinite;
          animation-delay: 2s;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
