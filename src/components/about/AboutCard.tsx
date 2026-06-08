"use client";

import { motion } from "framer-motion";

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  accent?: "primary" | "violet" | "emerald" | "accent";
}

const accentGradients: Record<string, string> = {
  primary: "from-[#60a5fa] to-transparent",
  violet: "from-[#a78bfa] to-transparent",
  emerald: "from-[#34d399] to-transparent",
  accent: "from-[#fbbf24] to-transparent",
};

const borderGlows: Record<string, string> = {
  primary: "rgba(96,165,250,0.3)",
  violet: "rgba(167,139,250,0.3)",
  emerald: "rgba(52,211,153,0.3)",
  accent: "rgba(251,191,36,0.3)",
};

const iconColors: Record<string, string> = {
  primary: "bg-[#60a5fa]/10 border-[#60a5fa]/20 text-[#60a5fa]",
  violet: "bg-[#a78bfa]/10 border-[#a78bfa]/20 text-[#a78bfa]",
  emerald: "bg-[#34d399]/10 border-[#34d399]/20 text-[#34d399]",
  accent: "bg-[#fbbf24]/10 border-[#fbbf24]/20 text-[#fbbf24]",
};

export default function AboutCard({
  icon,
  title,
  description,
  delay = 0,
  accent = "primary",
}: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -8, 
        borderColor: borderGlows[accent], 
        boxShadow: `0 8px 30px -10px ${borderGlows[accent]}` 
      }}
      style={{ willChange: "transform" }}
      className="relative p-[24px] flex flex-col group cursor-pointer bg-[rgba(5,10,20,0.75)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] rounded-[14px] overflow-hidden"
    >
      {/* Colored top-border gradient */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentGradients[accent]} opacity-70`} />

      <motion.div 
        className={`w-[48px] h-[48px] rounded-full border flex items-center justify-center transition-colors duration-300 ${iconColors[accent]}`}
        variants={{
          hover: { rotate: 15 }
        }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="font-display font-[700] text-[15px] text-white mt-[14px]">{title}</h3>
        <p className="text-[rgba(255,255,255,0.65)] text-[13px] leading-[1.6] mt-[6px]">{description}</p>
      </div>
    </motion.div>
  );
}
