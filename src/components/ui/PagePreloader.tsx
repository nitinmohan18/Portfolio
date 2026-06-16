"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface PagePreloaderProps {
  onComplete: () => void;
}

export default function PagePreloader({ onComplete }: PagePreloaderProps) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Phase 1→2 (warp): after 2000ms
    const t1 = setTimeout(() => setPhase(1), 2000);
    // Phase 2→done: after 2000+600=2600ms, call onComplete + setPhase(2)
    const t2 = setTimeout(() => { onCompleteRef.current(); setPhase(2); }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

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
        <div className="text-[11px] font-mono tracking-[0.35em] text-[rgba(255,255,255,0.7)] drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] flex items-center mb-1">
          LOADING PORTFOLIO
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="ml-1 text-[#22d3ee]"
          >
            _
          </motion.span>
        </div>
        <div className="w-[140px] h-[2px] rounded-full bg-[rgba(255,255,255,0.05)] relative overflow-hidden shadow-inner">
          <motion.div
            className="absolute top-0 left-0 h-full origin-left rounded-full"
            style={{ 
              width: "100%", 
              background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.8) 50%, #818cf8 100%)",
              boxShadow: "0 0 12px rgba(34,211,238,0.6)"
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      {/* Center Group Wrapper */}
      <motion.div
        animate={phase === 1 ? { scale: [1, 0.9, 4], opacity: [1, 1, 0], filter: ["blur(0px)", "blur(0px)", "blur(10px)"] } : {}}
        transition={{ duration: 0.6, ease: [0.55, 0, 1, 0.45] }}
        className="relative flex items-center justify-center"
      >
        {/* Layer 2.5 — Premium Pulse Rings (Restored) */}
        {[0, 0.8, 1.6].map((delay, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 4], opacity: [0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay, ease: "easeOut" }}
            style={{
              position: "absolute", width: 140, height: 140, borderRadius: "50%",
              border: "1px solid rgba(34,211,238,0.5)",
              boxShadow: "0 0 20px rgba(34,211,238,0.2), inset 0 0 10px rgba(34,211,238,0.1)",
              willChange: "transform, opacity",
              transform: "translateZ(0)"
            }}
          />
        ))}

        {/* Layer 3 — Sleek GPU-Friendly Loading Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", width: 160, height: 160, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.05)",
            borderTopColor: "rgba(34,211,238,0.9)",
            borderRightColor: "rgba(167,139,250,0.5)",
            boxShadow: "0 0 25px rgba(34,211,238,0.4)",
            willChange: "transform", transform: "translateZ(0)"
          }}
        />

        {/* Layer 4 — Premium Glassmorphism Inner Circle */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", width: 140, height: 140, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(20,30,45,0.9) 0%, rgba(5,10,15,0.95) 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -4px 10px rgba(0,0,0,0.8), 0 15px 35px rgba(0,0,0,0.9)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            borderBottom: "1px solid rgba(0,0,0,0.8)",
            backdropFilter: "blur(12px)",
            willChange: "transform, opacity", transform: "translateZ(0)"
          }}
        >
          {/* Animated Shimmer Text */}
          <motion.span 
            initial={{ backgroundPosition: "200% center" }}
            animate={{ backgroundPosition: "-200% center" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              fontFamily: "var(--font-outfit)", fontWeight: 800, fontSize: 36,
              background: "linear-gradient(120deg, rgba(147,197,253,0.8) 0%, #ffffff 45%, #ffffff 55%, rgba(167,139,250,0.8) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "0.15em",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
              marginLeft: "0.15em" /* optical centering for tracking */
            }}
          >
            NM
          </motion.span>
          <span style={{
            fontSize: 9, letterSpacing: "0.4em", color: "rgba(147,197,253,0.7)",
            fontFamily: "var(--font-mono)", textTransform: "uppercase",
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
            marginLeft: "0.4em" /* optical centering for tracking */
          }}>
            PORTFOLIO
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
