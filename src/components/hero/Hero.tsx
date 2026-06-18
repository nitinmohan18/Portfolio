"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import HeroContent from "./HeroContent";
import HexagonPortrait from "./HexagonPortrait";
import Signature from "./Signature";
import { usePreloader } from "@/components/layout/ClientLayout";

export default function Hero() {
  const { showContent: isVisible } = usePreloader();
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimationKey(prev => prev + 1);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 w-full isolate flex items-center min-h-[100svh] pt-20 pb-24 lg:pt-0 lg:pb-0 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full flex flex-col justify-center h-full"
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
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">
                {/* Left side text content */}
                <div className="w-full lg:w-[55%] xl:w-[50%] flex-shrink-0 z-10 pt-20 lg:pt-0">
                  <HeroContent isVisible={isVisible} />
                </div>
                
                {/* Right side portrait */}
                <div className="w-full lg:w-[45%] xl:w-[50%] flex flex-col justify-center items-center relative z-10 top-4 lg:top-12">
                  <HexagonPortrait isVisible={isVisible} />
                  <div className="w-full flex justify-center pointer-events-none -mt-4 lg:-mt-8 z-30">
                    <Signature isVisible={isVisible} />
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <style>{`
              .scroll-text {
                font-size: 10px;
                font-weight: 800;
                letter-spacing: 5px;
                text-transform: uppercase;
                font-family: monospace;
                background: linear-gradient(180deg, #fff 0%, #22d3ee 50%, #0891b2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 0px 8px rgba(34,211,238,0.5));
                animation: scrollTextPulse 3s ease-in-out infinite;
              }
              @keyframes scrollTextPulse {
                0%, 100% { filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 0px 4px rgba(34,211,238,0.3)); opacity: 0.7; }
                50%       { filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 0px 12px rgba(34,211,238,0.8)); opacity: 1; }
              }
              .scroll-mouse {
                background: linear-gradient(180deg, rgba(10, 15, 25, 0.9), rgba(5, 8, 15, 0.95));
                border: 1px solid rgba(255, 255, 255, 0.05);
                box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -4px 8px rgba(0, 0, 0, 0.8), 0 5px 15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 211, 238, 0.2);
                backdrop-filter: blur(12px);
                position: relative;
                overflow: hidden;
              }
              .scroll-mouse::before {
                content: '';
                position: absolute;
                top: 0; left: 15%; right: 15%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
              }
              .scroll-dot {
                background: linear-gradient(180deg, #fff, #22d3ee);
                box-shadow: 0 0 10px #22d3ee, 0 0 25px #22d3ee;
                border-radius: 50px;
              }
            `}</style>
            <motion.div
              className="relative mt-12 lg:mt-0 lg:absolute lg:bottom-6 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ willChange: "transform, opacity", perspective: "400px" }}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              <motion.span 
                className="scroll-text"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Scroll Down
              </motion.span>
              <motion.div 
                className="w-[26px] h-[42px] rounded-[50px] flex items-start justify-center p-[4px] scroll-mouse"
                whileHover={{ scale: 1.05, boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -4px 8px rgba(0, 0, 0, 0.8), 0 8px 20px rgba(0, 0, 0, 0.6), 0 0 30px rgba(34, 211, 238, 0.4)" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="w-[4px] h-[8px] scroll-dot"
                  animate={{ y: [0, 18], opacity: [1, 0], scaleY: [1, 1.5] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </section>
  );
}
