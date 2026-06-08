"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PagePreloaderProps {
  onComplete: () => void;
}

export default function PagePreloader({ onComplete }: PagePreloaderProps) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // Phase 1→2 (warp): after 1600ms
    const t1 = setTimeout(() => setPhase(1), 1600);
    // Phase 2→done: after 1600+700=2300ms, call onComplete + setPhase(2)
    const t2 = setTimeout(() => { onComplete(); setPhase(2); }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] bg-[#090A0F] flex items-center justify-center overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { transform: translateY(-100%) }
          100% { transform: translateY(100vh) }
        }
      `}} />

      {/* Layer 1 — Ambient scanlines */}
      <motion.div 
        animate={phase === 1 ? { opacity: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96,165,250,0.015) 2px, rgba(96,165,250,0.015) 4px)"
        }}
      />

      {/* Layer 2 — Corner brackets */}
      <motion.div
        animate={phase === 1 ? { opacity: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Top Left */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-4 left-4">
          <div className="w-[20px] h-[1px] bg-[rgba(96,165,250,0.5)] absolute top-0 left-0" />
          <div className="w-[1px] h-[20px] bg-[rgba(96,165,250,0.5)] absolute top-0 left-0" />
        </motion.div>
        {/* Top Right */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-4 right-4">
          <div className="w-[20px] h-[1px] bg-[rgba(96,165,250,0.5)] absolute top-0 right-0" />
          <div className="w-[1px] h-[20px] bg-[rgba(96,165,250,0.5)] absolute top-0 right-0" />
        </motion.div>
        {/* Bottom Left */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-4 left-4">
          <div className="w-[20px] h-[1px] bg-[rgba(96,165,250,0.5)] absolute bottom-0 left-0" />
          <div className="w-[1px] h-[20px] bg-[rgba(96,165,250,0.5)] absolute bottom-0 left-0" />
        </motion.div>
        {/* Bottom Right */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-4 right-4">
          <div className="w-[20px] h-[1px] bg-[rgba(96,165,250,0.5)] absolute bottom-0 right-0" />
          <div className="w-[1px] h-[20px] bg-[rgba(96,165,250,0.5)] absolute bottom-0 right-0" />
        </motion.div>
      </motion.div>

      {/* Layer 6 — Loading bar at bottom */}
      <motion.div
        animate={phase === 1 ? { opacity: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-[10px] font-mono tracking-widest text-[rgba(255,255,255,0.6)] flex items-center">
          INITIALIZING
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="ml-1"
          >
            _
          </motion.span>
        </div>
        <div className="w-[120px] h-[1px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[rgba(96,165,250,0.8)] origin-left"
            style={{ width: "100%" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Center Group Wrapper (Layers 3,4,5) */}
      <motion.div
        animate={phase === 1 ? { scale: [1, 0.9, 25], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.65, ease: [0.55, 0, 1, 0.45] }}
        className="relative flex items-center justify-center"
      >
        {/* Layer 3 — Pulse rings */}
        {[0, 0.6, 1.2].map((delay, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 3.5], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeOut" }}
            style={{
              position: "absolute", width: 144, height: 144, borderRadius: "50%",
              border: "1px solid rgba(96,165,250,0.6)", willChange: "transform, opacity",
              transform: "translateZ(0)"
            }}
          />
        ))}

        {/* Layer 4 — Rotating conic border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", width: 144, height: 144, borderRadius: "50%",
            background: "conic-gradient(from 0deg, transparent 0deg, #60a5fa 90deg, #a78bfa 180deg, transparent 360deg)",
            padding: "1.5px", willChange: "transform", transform: "translateZ(0)"
          }}
        >
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#090A0F" }} />
        </motion.div>

        {/* Layer 5 — NM inner circle */}
        <div style={{
          position: "absolute", width: 141, height: 141, borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, rgba(96,165,250,0.12) 0%, #090A0F 60%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
          boxShadow: "0 0 80px rgba(96,165,250,0.2), inset 0 0 40px rgba(96,165,250,0.06)"
        }}>
          <span style={{
            fontFamily: "var(--font-outfit)", fontWeight: 800, fontSize: 24,
            background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #a78bfa 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "0.15em"
          }}>NM</span>
          <span style={{
            fontSize: 8, letterSpacing: "0.35em", color: "rgba(96,165,250,0.6)",
            fontFamily: "var(--font-mono)", textTransform: "uppercase"
          }}>PORTFOLIO</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
