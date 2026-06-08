"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroContent from "./HeroContent";

interface HeroProps {
  isVisible?: boolean;
}

export default function Hero({ isVisible = true }: HeroProps) {
  return (
    <section
      id="home"
      className="relative z-10 w-full h-screen min-h-screen overflow-hidden flex flex-col isolate"
    >
      <div className="relative z-10 w-full h-full overflow-hidden flex flex-col justify-center">
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
        <div className="container-wide relative z-[5] w-full">
          <HeroContent isVisible={isVisible} />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
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
      </div>
    </section>
  );
}
