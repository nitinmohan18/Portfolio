"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HexagonPortraitProps {
  isVisible?: boolean;
}

export default function HexagonPortrait({ isVisible = true }: HexagonPortraitProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      // Subtle movement: max 15px offset
      const x = (e.clientX / window.innerWidth - 0.5) * 30; 
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[420px] aspect-square flex items-center justify-center">
      {/* Ambient Glow Behind Hexagon */}
      <motion.div
        className="absolute inset-0 rounded-full blur-[80px] opacity-30 mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 60%)",
          transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />

      {/* Floating & Parallax Container */}
      <motion.div
        className="relative w-full h-full z-10 portrait-float flex items-center justify-center"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        animate={isVisible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="relative w-full h-full drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
          <div 
            className="relative w-full h-full" 
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
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes floatPremium {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .portrait-float {
          animation: floatPremium 7s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
