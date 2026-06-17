"use client";

import { motion } from "framer-motion";
import { Alex_Brush, Pinyon_Script } from "next/font/google";

const signatureFont = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const stylishCapital = Pinyon_Script({
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
      className="flex flex-col items-center justify-center mt-4 sm:mt-8 z-20 pointer-events-none"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 1.0, duration: 1.2, type: "spring", stiffness: 40 }}
    >
      {/* Cursive Name */}
      <div style={{ filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.9)) drop-shadow(0px 0px 20px rgba(202,138,4,0.4))", transform: "rotate(-4deg)" }}>
        <div 
          className={`${signatureFont.className} text-6xl md:text-7xl lg:text-8xl whitespace-nowrap`}
          style={{
            backgroundImage: "linear-gradient(135deg, #fef08a 0%, #ca8a04 30%, #38bdf8 70%, #0284c7 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            padding: "10px 20px",
            lineHeight: "1.3",
          }}
        >
          <span className={stylishCapital.className} style={{ fontSize: "1.4em", paddingRight: "4px" }}>N</span>itin Mohan
        </div>
      </div>
      
      {/* Decorative divider and Last Name */}
      <div className="flex items-center gap-4 mt-2 sm:mt-4 w-full max-w-[400px] justify-center" style={{ color: "#eab308" }}>
        <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-r from-transparent via-[#ca8a04] to-[#fef08a] opacity-80" style={{ boxShadow: "0 0 5px rgba(234,179,8,0.5)" }}></div>
        <span 
          className="font-outfit text-transparent bg-clip-text font-medium text-sm md:text-base tracking-[0.5em] md:tracking-[0.6em] uppercase pl-[0.5em] md:pl-[0.6em]"
          style={{ 
            backgroundImage: "linear-gradient(90deg, #ca8a04 0%, #fef08a 50%, #ca8a04 100%)",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.8))",
          }}
        >
          Pandey
        </span>
        <div className="h-[1px] flex-1 max-w-[80px] md:max-w-[120px] bg-gradient-to-l from-transparent via-[#ca8a04] to-[#fef08a] opacity-80" style={{ boxShadow: "0 0 5px rgba(234,179,8,0.5)" }}></div>
      </div>
      
      {/* Decorative element below PANDEY */}
      <div className="mt-3 md:mt-4 flex justify-center text-[#fef08a] opacity-90" style={{ filter: "drop-shadow(0 0 8px rgba(234,179,8,0.4))" }}>
         <svg width="140" height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left flourish */}
            <path d="M55 12C45 12 30 6 30 6C30 6 40 18 55 15" stroke="url(#gold-grad)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M50 12C40 12 35 9 35 9C35 9 40 15 50 14" stroke="url(#gold-grad)" strokeWidth="0.75" strokeLinecap="round" fill="none"/>
            <path d="M30 6C20 6 10 10 0 12" stroke="url(#gold-grad)" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.5"/>
            
            {/* Right flourish */}
            <path d="M85 12C95 12 110 6 110 6C110 6 100 18 85 15" stroke="url(#gold-grad)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M90 12C100 12 105 9 105 9C105 9 100 15 90 14" stroke="url(#gold-grad)" strokeWidth="0.75" strokeLinecap="round" fill="none"/>
            <path d="M110 6C120 6 130 10 140 12" stroke="url(#gold-grad)" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.5"/>
            
            {/* Center Diamond */}
            <path d="M70 2L74 12L70 22L66 12L70 2Z" fill="url(#gold-grad)"/>
            
            {/* Inner details / little dots */}
            <circle cx="58" cy="12" r="1.5" fill="url(#gold-grad)"/>
            <circle cx="82" cy="12" r="1.5" fill="url(#gold-grad)"/>
            <circle cx="62" cy="12" r="1" fill="#fff" opacity="0.6"/>
            <circle cx="78" cy="12" r="1" fill="#fff" opacity="0.6"/>

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gold-grad" x1="0" y1="0" x2="140" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ca8a04"/>
                <stop offset="50%" stopColor="#fef08a"/>
                <stop offset="100%" stopColor="#ca8a04"/>
              </linearGradient>
            </defs>
         </svg>
      </div>
    </motion.div>
  );
}
