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
        className="flex items-center gap-2"
      >
        <span className="h-px w-10 bg-[rgba(255,255,255,0.45)]" />
        <span className="text-[14px] font-mono tracking-widest text-[#60a5fa] uppercase font-[600]">
          Hey, I&apos;m —
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        className="font-display font-[800] text-white tracking-tight flex flex-wrap"
        style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } }
        }}
      >
        {nameLetters.map((letter, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.6, filter: "blur(12px)" },
              visible: { 
                opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            style={{ 
              willChange: "transform, opacity, filter", 
              marginRight: letter === " " ? "0.3em" : "0" 
            }}
            className={i >= profile.firstName.length + 1 ? "text-[#60a5fa]" : ""}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* Role typing / Subtitle shimmer */}
      <motion.div 
        initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ willChange: "transform" }}
        className="font-display font-[600] text-[rgba(255,255,255,0.85)] min-h-[2rem] relative overflow-hidden" 
      >
        <motion.div
          initial={{ backgroundPosition: "200% center" }}
          animate={isVisible ? { backgroundPosition: "-200% center" } : {}}
          transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          style={{
            fontSize: "clamp(18px, 2.5vw, 26px)",
            background: "linear-gradient(90deg, rgba(255,255,255,0.85) 0%, #ffffff 50%, rgba(255,255,255,0.85) 100%)",
            backgroundSize: "200% auto",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          <TypingText />
        </motion.div>
      </motion.div>

      {/* Bio */}
      <motion.p 
        initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ willChange: "transform" }}
        className="text-[rgba(255,255,255,0.65)] text-[16px] leading-[1.75] max-w-[520px]"
      >
        {profile.bio}
      </motion.p>

      {/* CTA Buttons + Socials */}
      <motion.div 
        initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{ willChange: "transform" }}
      >
        <HeroButtons />
      </motion.div>

      {/* Stats grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-[12px] pt-2"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } // stagger 120ms
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
            whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.18)", transition: { duration: 0.3, ease: "easeOut" } }}
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
