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
        className="hey-label"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
        style={{ willChange: "opacity" }}
      >
        <span className="hey-line-left" />
        <span className="hey-diamond">✦</span>
        <span className="hey-text">HEY, I&apos;M</span>
        <span className="hey-diamond">✦</span>
        <span className="hey-line-right" />
      </motion.div>

      <style>{`
        .hey-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .hey-text {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(100, 255, 218, 0.5);
          font-family: monospace;
        }
        .hey-diamond {
          font-size: 10px;
          color: rgba(100, 255, 218, 0.35);
          animation: diamondPulse 3s ease-in-out infinite;
        }
        .hey-diamond:last-of-type {
          animation-delay: 1.5s;
        }
        @keyframes diamondPulse {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50%       { opacity: 0.8;  transform: scale(1.2); }
        }
        .hey-line-left {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(100,255,218,0.35));
        }
        .hey-line-right {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, rgba(100,255,218,0.35), transparent);
        }
        .bio-text {
          font-size: 15px;
          line-height: 1.85;
          color: rgba(148, 163, 184, 0.85);
          max-width: 460px;
          font-weight: 400;
          letter-spacing: 0.2px;
        }
        .bio-highlight {
          color: rgba(100, 255, 218, 0.75);
          font-weight: 500;
        }
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
        className="bio-text"
        initial={{ opacity: 0, y: 8 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
        style={{ willChange: "transform, opacity" }}
      >
        Building <span className="bio-highlight">scalable</span> web applications,{" "}
        <span className="bio-highlight">intelligent systems</span>, and impactful digital experiences through{" "}
        <span className="bio-highlight">AI</span>, innovation, and{" "}
        <span className="bio-highlight">open-source</span> contributions.
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
