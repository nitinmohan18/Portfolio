"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import TypingText from "./TypingText";
import HeroButtons from "./HeroButtons";
import {
  Code2,
  Briefcase,
  Trophy,
  Sparkles,
} from "lucide-react";

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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const spaceItem = {
  hidden: { opacity: 0, y: 80, rotateX: 25, scale: 0.75 },
  visible: {
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const statContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
};

const statItemVariant = {
  hidden: {
    opacity: 0,
    y: 60,
    z: -400,
    scale: 0.85,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    z: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export default function HeroContent({ isVisible = true }: HeroContentProps) {
  return (
    <motion.div
      className="flex flex-col gap-7 max-w-2xl"
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      style={{ perspective: "1400px", perspectiveOrigin: "50% 30%" }}
    >
      {/* Eyebrow */}
      <motion.div variants={spaceItem} className="flex items-center gap-2">
        <span className="h-px w-10 bg-[rgba(255,255,255,0.45)]" />
        <span className="premium-heading-label">
          Hey, I&apos;m —
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={spaceItem}
        className="font-display font-[800] text-white tracking-tight"
        style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
      >
        {profile.firstName}{" "}
        <span className="gradient-text">{profile.lastName}</span>
      </motion.h1>

      {/* Role typing */}
      <motion.div variants={spaceItem} className="font-display font-[600] text-[rgba(255,255,255,0.85)] min-h-[2rem]" style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}>
        <TypingText />
      </motion.div>

      {/* Bio */}
      <motion.p variants={spaceItem} className="text-[rgba(255,255,255,0.65)] text-[16px] leading-[1.75] max-w-[520px]">
        {profile.bio}
      </motion.p>

      {/* CTA Buttons + Socials */}
      <motion.div variants={spaceItem}>
        <HeroButtons />
      </motion.div>

      {/* Stats grid */}
      <motion.div
        variants={statContainer}
        className="grid grid-cols-2 sm:grid-cols-4 gap-[12px] pt-2"
      >
        {profile.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={statItemVariant}
            whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.2)", transition: { duration: 0.3, ease: "easeOut" } }}
            className="flex flex-col p-[20px] rounded-[14px] bg-[rgba(5,10,20,0.7)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[16px]"
          >
            <div className={`w-[36px] h-[36px] rounded-lg flex items-center justify-center mb-3 ${iconColors[i]}`}>
              {iconMap[stat.icon] ?? <Code2 size={20} />}
            </div>
            <div>
              <div className="font-display font-[800] text-[28px] text-white leading-none mb-1">{stat.value}</div>
              <div className="text-[13px] font-[600] text-[rgba(255,255,255,0.8)]">{stat.label}</div>
              <div className="text-[11px] text-[rgba(255,255,255,0.45)] mt-[4px] leading-tight">{stat.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
