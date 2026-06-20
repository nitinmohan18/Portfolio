"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

const ROLES = profile.typingRoles;

export default function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const enterTime = currentRole.length * 40; 
    const holdTime = 2400;
    const exitTime = 350;
    
    const cycleTimer = setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, enterTime + holdTime + exitTime + 100);

    return () => clearTimeout(cycleTimer);
  }, [roleIndex]);

  const currentRole = ROLES[roleIndex];
  const words = currentRole.split(" ");

  return (
    <div className="h-[52px] flex items-center relative w-full" style={{ perspective: "1000px" }}>
      <style>{`
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .cursor-dots {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
          margin-left: 6px;
          vertical-align: baseline;
          position: relative;
          bottom: 2px;
        }
        .cursor-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #22d3ee;
          will-change: transform, opacity;
        }
        .cursor-dot:nth-child(1) { animation: dotPulse 1.2s ease-in-out infinite 0s; }
        .cursor-dot:nth-child(2) { animation: dotPulse 1.2s ease-in-out infinite 0.2s; }
        .cursor-dot:nth-child(3) { animation: dotPulse 1.2s ease-in-out infinite 0.4s; }
      `}</style>
      <AnimatePresence mode="wait">
        <motion.div
          key={roleIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
            exit: {
              y: -16,
              opacity: 0,
              transition: { duration: 0.35, ease: "easeIn" },
            },
          }}
          className="flex items-baseline flex-wrap w-full"
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((char, cIdx) => (
                <motion.span
                  key={`${wIdx}-${cIdx}`}
                  variants={{
                    hidden: { opacity: 0, y: 20, rotateX: 90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                    },
                  }}
                  style={{
                    display: "inline-block",
                    transformOrigin: "bottom",
                    color: "#CBD5E1", 
                    fontWeight: 500,
                    textShadow: "none"
                  }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Add space after word unless it's the last word */}
              {wIdx < words.length - 1 && (
                <span style={{ display: "inline-block", width: "0.25em" }}>&nbsp;</span>
              )}
            </span>
          ))}
          {/* Blinking 3-Dot Trail Cursor */}
          <motion.div
            className="cursor-dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="cursor-dot" />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
