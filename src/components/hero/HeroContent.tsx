"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import TypingText from "./TypingText";
import HeroButtons from "./HeroButtons";
import { Code2, Briefcase, Trophy, Sparkles } from "lucide-react";

interface HeroContentProps {
  isVisible?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 size={20} />,
  briefcase: <Briefcase size={20} />,
  trophy: <Trophy size={20} />,
  sparkles: <Sparkles size={20} />,
};

const iconColors = [
  "bg-[rgba(96,165,250,0.1)] text-[#60a5fa]",
  "bg-[rgba(167,139,250,0.1)] text-[#a78bfa]",
  "bg-[rgba(52,211,153,0.1)] text-[#34d399]",
  "bg-[rgba(251,191,36,0.1)] text-[#fbbf24]",
];

export default function HeroContent({ isVisible = true }: HeroContentProps) {
  const nameLetters = (profile.firstName + " " + profile.lastName).split("");

  return (
    <div
      className="flex flex-col gap-7 max-w-2xl"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 30%" }}
    >
      {/* Eyebrow */}
      <motion.div 
        initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
        className="flex items-center gap-3"
      >
        <span className="h-[1px] w-10 bg-[rgba(100,255,218,0.25)]" />
        <span className="text-[14px] font-mono tracking-widest text-[rgba(100,255,218,0.5)] uppercase font-[600]">
          Hey, I&apos;m
        </span>
        <span className="h-[1px] w-10 bg-[rgba(100,255,218,0.25)]" />
      </motion.div>

      <style>{`
        @keyframes floatWhite {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes floatCyan {
          0%, 100% { 
            transform: translateY(0);
            text-shadow: 0 0 20px rgba(100,255,218,0);
          }
          50% { 
            transform: translateY(-3px);
            text-shadow: 0 0 30px rgba(100,255,218,0.35);
          }
        }
        .name-first {
          display: inline-block;
          animation: floatWhite 4s ease-in-out infinite;
          animation-delay: 0s;
        }
        .name-second {
          display: inline-block;
          animation: floatCyan 4s ease-in-out infinite;
          animation-delay: 2s;
          color: #64FFDA;
          margin-left: 0.3em;
        }
      `}</style>
      
      {/* Name */}
      <h1
        className="font-display font-[800] text-white tracking-tight flex flex-wrap"
        style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
      >
        <motion.span
          className="name-first"
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          {profile.firstName}
        </motion.span>
        <motion.span
          className="name-second"
          initial={{ opacity: 0, x: 40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ willChange: "transform, opacity" }}
        >
          {profile.lastName}
        </motion.span>
      </h1>

      {/* Role typing / Subtitle shimmer */}
      <motion.div 
        initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ willChange: "transform", fontSize: "clamp(20px, 3vw, 28px)" }}
        className="font-display font-[600] text-white min-h-[52px] relative" 
      >
        <TypingText />
      </motion.div>

      {/* Bio */}
      <motion.div 
        className="text-[rgba(148,163,184,0.9)] text-[16px] leading-[1.75] max-w-[500px] font-[400]"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.8 } }
        }}
      >
        {profile.bio.split(" ").map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" }
              }
            }}
            style={{ willChange: "transform, opacity", display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA Buttons + Socials */}
      <div className="relative z-10 w-full">
        <HeroButtons />
      </div>

      {/* Stats grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-[12px] pt-2"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 1.9 } }
        }}
      >
        {profile.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 80, filter: "blur(12px)", scale: 0.94 },
              visible: {
                opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
                transition: { type: "spring", stiffness: 120, damping: 14 }
              }
            }}
            whileHover={{ 
              y: -4, 
              borderColor: "rgba(100,255,218,0.3)", 
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              transition: { duration: 0.3, ease: "easeOut" } 
            }}
            style={{ willChange: "transform" }}
            className="flex flex-col p-[20px] rounded-[14px] bg-[rgba(5,10,20,0.75)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] cursor-pointer"
          >
            <div className={`w-[36px] h-[36px] rounded-[12px] flex items-center justify-center mb-3 ${iconColors[i]}`}>
              {iconMap[stat.icon] ?? <Code2 size={20} />}
            </div>
            <div>
              <div className="font-display font-[800] text-[28px] text-white leading-none mb-1">{stat.value}</div>
              <div className="text-[13px] font-[600] text-[rgba(255,255,255,0.65)]">{stat.label}</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.45)] mt-[4px] leading-tight">{stat.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
