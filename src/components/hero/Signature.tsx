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
      initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
      animate={isVisible ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(15px)" }}
      transition={{ delay: 1.0, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <style>{`
        @keyframes signaturePulse3D {
          0%, 100% { 
            filter: drop-shadow(1px 1px 0px rgba(8, 145, 178, 0.5)) drop-shadow(0px 0px 8px rgba(34, 211, 238, 0.25)); 
            transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) rotateZ(-3deg) translateY(0px);
          }
          50% { 
            filter: drop-shadow(1px 1px 0px rgba(8, 145, 178, 0.5)) drop-shadow(0px 0px 15px rgba(34, 211, 238, 0.45)); 
            transform: perspective(1000px) rotateX(8deg) rotateY(-2deg) rotateZ(-3deg) translateY(-2px);
          }
        }
        .signature-glow-pulse-3d {
          animation: signaturePulse3D 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
      `}</style>
      
      {/* Cursive Name - Sweeps in from left like it's being written */}
      <motion.div 
        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
        animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -30, filter: "blur(8px)" }}
        transition={{ delay: 1.3, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="signature-glow-pulse-3d">
          <div 
            className={`${signatureFont.className} text-6xl md:text-7xl lg:text-[5.5rem] whitespace-nowrap`}
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff 0%, #cffafe 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              padding: "10px 40px",
              lineHeight: "1.2",
              fontWeight: 400,
            }}
          >
            Nitin mohan
          </div>
        </div>
      </motion.div>
      
      {/* Decorative divider and Last Name - Slides up elegantly to anchor the design */}
      <motion.div 
        className="flex items-center gap-4 mt-2 sm:mt-4 w-full max-w-[500px] justify-center opacity-90 relative -top-5"
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(5px)" }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-r from-transparent to-[#22d3ee] opacity-80" style={{ boxShadow: "0 0 8px rgba(34,211,238,0.8)" }}></div>
        
        <span 
          className="font-outfit text-transparent bg-clip-text font-medium text-sm sm:text-base md:text-lg tracking-[0.4em] md:tracking-[0.5em] uppercase pl-[0.4em] md:pl-[0.5em]"
          style={{ 
            backgroundImage: "linear-gradient(to right, #22d3ee 0%, #ffffff 50%, #22d3ee 100%)",
            filter: "drop-shadow(0px 0px 10px rgba(34, 211, 238, 0.6))",
          }}
        >
          Pandey
        </span>

        <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-l from-transparent to-[#22d3ee] opacity-80" style={{ boxShadow: "0 0 8px rgba(34,211,238,0.8)" }}></div>
      </motion.div>
      
    </motion.div>
  );
}
