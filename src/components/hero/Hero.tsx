"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Dark gradient overlay over 3D canvas */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(3,7,18,0.85) 0%, rgba(3,7,18,0.55) 50%, rgba(3,7,18,0.2) 100%)",
        }}
      />

      {/* Bottom fade into sections */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #030712 0%, transparent 100%)",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] orb orb-primary opacity-20 z-[1]" />
      <div className="absolute bottom-1/4 left-1/6 w-[300px] h-[300px] orb orb-purple opacity-15 z-[1]" />

      {/* Content */}
      <div className="container-wide relative z-[5] pt-28 pb-20">
        <HeroContent />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-mono">
          Scroll Down
        </span>
        <div className="w-5 h-8 border border-slate-600 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
