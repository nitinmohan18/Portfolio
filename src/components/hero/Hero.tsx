"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import HeroContent from "./HeroContent";

interface HeroProps {
  isVisible?: boolean;
}

export default function Hero({ isVisible = true }: HeroProps) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimationKey(prev => prev + 1);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 w-full isolate"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full h-full flex flex-col justify-center"
          >
            {/* Bottom fade into sections */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, transparent 0%, transparent 100%)",
              }}
            />

            {/* Content */}
            <div className="container-wide relative z-[5] w-full">
              <HeroContent isVisible={isVisible} />
            </div>

            {/* Scroll indicator */}
            <style>{`
              .scroll-text {
                font-size: 9px;
                letter-spacing: 4px;
                text-transform: uppercase;
                color: rgba(100,255,218,0.35);
                font-family: monospace;
                animation: scrollTextPulse 2.5s ease-in-out infinite;
              }
              @keyframes scrollTextPulse {
                0%, 100% { opacity: 0.3; }
                50%       { opacity: 0.7; }
              }
              .scroll-mouse {
                border-color: rgba(100,255,218,0.3);
              }
              .scroll-dot {
                background: #64FFDA;
                box-shadow: 0 0 6px rgba(100,255,218,0.6);
              }
            `}</style>
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ willChange: "transform, opacity" }}
            >
              <span className="scroll-text">
                Scroll Down
              </span>
              <div className="w-5 h-8 border rounded-[50px] flex items-start justify-center p-1 scroll-mouse">
                <motion.div
                  className="w-1 h-1.5 rounded-full scroll-dot"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ willChange: "transform" }}
                />
              </div>
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </section>
  );
}
