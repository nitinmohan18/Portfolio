"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function ScrollToTop() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-2 right-2 z-50 sm:bottom-10 sm:right-10 max-sm:scale-75 max-sm:origin-bottom-right">
      <MagneticButton>
        <motion.button
          onClick={handleScrollTop}
          animate="idle"
          whileHover="hover"
          whileTap="tap"
          variants={{
            idle: { 
              y: [0, -8, 0],
              background: "linear-gradient(165deg, rgba(30, 40, 60, 0.5), rgba(10, 15, 25, 0.9))",
              boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -4px 10px rgba(0, 0, 0, 0.8), 0 8px 24px -4px rgba(0, 0, 0, 0.7), 0 0 8px rgba(255, 255, 255, 0.05)",
              borderTop: "1px solid rgba(255, 255, 255, 0.25)",
              borderBottom: "2px solid rgba(0, 0, 0, 0.8)",
              scale: 1,
              transition: { y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }, duration: 0.4 }
            },
            hover: {
              y: -12,
              background: "linear-gradient(165deg, rgba(40, 50, 80, 0.6), rgba(15, 20, 35, 0.95))",
              boxShadow: "inset 0 2px 6px rgba(255, 255, 255, 0.25), inset 0 -4px 10px rgba(0, 0, 0, 0.8), 0 16px 32px -4px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.15)",
              borderTop: "1px solid rgba(255, 255, 255, 0.4)",
              borderBottom: "2px solid rgba(0, 0, 0, 0.8)",
              scale: 1.05,
              transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 15 }
            },
            tap: {
              y: -2,
              background: "linear-gradient(165deg, rgba(15, 20, 35, 0.9), rgba(10, 15, 25, 0.95))",
              boxShadow: "inset 0 6px 15px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
              scale: 0.95,
              transition: { duration: 0.1 }
            }
          }}
          className="group relative flex h-[48px] w-[48px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-l border-r border-white/5 backdrop-blur-[16px] sm:h-[64px] sm:w-[64px]"
          aria-label="Back to top"
        >
          <motion.div
            variants={{
              idle: { y: 0, opacity: 1 },
              hover: { y: -40, opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            <ArrowUp size={20} className="sm:h-[24px] sm:w-[24px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
          </motion.div>
          <motion.div
            variants={{
              idle: { y: 40, opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* The Rocket */}
            <div className="relative z-10">
              <div 
                className="text-[26px] sm:text-[30px]" 
                style={{ 
                  transform: "rotate(-45deg)", 
                  transformOrigin: "center",
                  filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.4)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8))"
                }}
              >
                🚀
              </div>
            </div>
            
            {/* The Engine Flame */}
            <div className="absolute top-[65%] flex justify-center w-full">
              {/* Outer Plume */}
              <motion.div
                 animate={{ 
                   height: ["30px", "45px", "35px"], 
                   width: ["14px", "16px", "15px"],
                   opacity: [0.6, 0.8, 0.7],
                 }}
                 transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-0 rounded-[50%_50%_20%_20%]"
                 style={{
                   background: "linear-gradient(to bottom, rgba(253, 186, 116, 0.9) 0%, rgba(239, 68, 68, 0.7) 60%, transparent 100%)",
                   filter: "blur(4px)",
                   boxShadow: "0 10px 25px rgba(239, 68, 68, 0.8)",
                 }}
              />
              {/* Inner Mach Diamond Core */}
              <motion.div
                 animate={{ 
                   height: ["20px", "28px", "24px"], 
                   opacity: [0.9, 1, 0.95],
                 }}
                 transition={{ duration: 0.1, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-0 w-[4px] rounded-[50%_50%_10%_10%]"
                 style={{
                   background: "linear-gradient(to bottom, #ffffff 0%, #bfdbfe 30%, transparent 100%)",
                   filter: "blur(0.5px)",
                   boxShadow: "0 0 8px #ffffff, 0 0 15px #60a5fa",
                 }}
              />
            </div>
          </motion.div>
        </motion.button>
      </MagneticButton>
    </div>
  );
}
