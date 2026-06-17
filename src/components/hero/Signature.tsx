"use client";

import { motion } from "framer-motion";
import { Pinyon_Script } from "next/font/google";

const signatureFont = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface SignatureProps {
  isVisible?: boolean;
}

export default function Signature({ isVisible = true }: SignatureProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center -mt-5 sm:-mt-11 z-20 pointer-events-none"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 1.0, duration: 1.2, type: "spring", stiffness: 40 }}
    >
      <style>{`
        @keyframes signaturePulse {
          0%, 100% { filter: drop-shadow(0px 0px 10px rgba(34, 211, 238, 0.3)); }
          50% { filter: drop-shadow(0px 0px 22px rgba(34, 211, 238, 0.65)); }
        }
        .signature-glow-pulse {
          animation: signaturePulse 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* Cursive Name */}
      <div className="signature-glow-pulse" style={{ transform: "rotate(-3deg)" }}>
        <div 
          className={`${signatureFont.className} text-6xl md:text-7xl lg:text-[5.5rem] whitespace-nowrap`}
          style={{
            backgroundImage: "linear-gradient(to right, #ffffff 0%, #cffafe 50%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            padding: "10px 30px",
            lineHeight: "1.2",
            fontWeight: 400,
          }}
        >
          Nitin mohan
        </div>
      </div>
      
      {/* Decorative divider and Last Name */}
      <div className="flex items-center gap-4 mt-0 sm:mt-1 w-full max-w-[400px] justify-center" style={{ color: "#22d3ee" }}>
        <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-r from-transparent via-[#22d3ee] to-[#cffafe] opacity-80" style={{ boxShadow: "0 0 5px rgba(34,211,238,0.5)" }}></div>
        <span 
          className="font-outfit text-transparent bg-clip-text font-medium text-sm md:text-base tracking-[0.5em] md:tracking-[0.6em] uppercase pl-[0.5em] md:pl-[0.6em]"
          style={{ 
            backgroundImage: "linear-gradient(90deg, #22d3ee 0%, #cffafe 50%, #22d3ee 100%)",
            filter: "drop-shadow(0px 0px 8px rgba(34, 211, 238, 0.6))",
            textShadow: "0px 0px 1px rgba(255,255,255,0.2)",
          }}
        >
          Pandey
        </span>
        <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-l from-transparent via-[#22d3ee] to-[#cffafe] opacity-80" style={{ boxShadow: "0 0 5px rgba(34,211,238,0.5)" }}></div>
      </div>
      
    </motion.div>
  );
}
