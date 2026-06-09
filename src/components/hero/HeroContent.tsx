"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import TypingText from "./TypingText";
import HeroButtons from "./HeroButtons";
import { useState, useEffect } from "react";
import { Code2, GitBranch, Target, Sparkles } from "lucide-react";

interface HeroContentProps {
  isVisible?: boolean;
}

const STAT_CARDS = [
  {
    icon: <Sparkles size={18} />,
    iconColor: "#818cf8",
    label: "CURRENTLY EXPLORING",
    title: "Generative AI & LLMs",
    subtitle: "RAG · Agents · Prompt Eng."
  },
  {
    icon: <Code2 size={18} />,
    iconColor: "#38bdf8",
    label: "CORE STACK",
    title: "Full-Stack · Python · React",
    subtitle: "Node.js · TensorFlow · SQL"
  },
  {
    icon: <GitBranch size={18} />,
    iconColor: "#34d399",
    label: "OPEN SOURCE",
    title: "Active GitHub Contributor",
    subtitle: "Building in Public"
  },
  {
    icon: <Target size={18} />,
    iconColor: "#f472b6",
    label: "OPEN TO",
    title: "Internships & Collabs",
    subtitle: "AI/ML · Full-Stack Roles",
    special: true
  }
];

export default function HeroContent({ isVisible = true }: HeroContentProps) {
  const nameLetters = (profile.firstName + " " + profile.lastName).split("");

  return (
    <div
      className="flex flex-col gap-8 max-w-2xl"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 30%" }}
    >
      <div className="flex flex-col" style={{ gap: "4px" }}>
      {/* Eyebrow */}
      <motion.div 
        className="hey-label"
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
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
          margin-bottom: 0px;
        }
        .hey-text {
          font-size: clamp(9px, 0.9vw, 11px);
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
          font-size: clamp(13px, 1.1vw, 15px);
          line-height: 1.85;
          color: rgba(148, 163, 184, 0.85);
          max-width: 480px;
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
        /* Removed hero-name and hero-bio to rely on framer-motion */
        .stat-card-wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          max-width: 780px;
        }
        @media (max-width: 768px) {
          .stat-card-wrapper {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
        @media (max-width: 480px) {
          .stat-card-wrapper {
            gap: 8px;
          }
        }
        .stat-card {
          background: rgba(13, 16, 28, 0.85);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 14px 14px;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @media (max-width: 480px) {
          .stat-card {
            padding: 14px 12px;
          }
        }
        .stat-card:hover {
          transform: translateY(-4px) scale(1.015);
          border-color: var(--hover-border);
          box-shadow: 0 12px 32px rgba(0,0,0,0.25), 0 0 16px var(--hover-glow);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .stat-card:active {
          transform: translateY(-2px) scale(0.99);
          transition: all 0.15s ease;
        }
        .stat-card-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 2px 2px 0 0;
          background: linear-gradient(90deg, var(--icon-color), transparent);
          transform: scaleX(0.6);
          transform-origin: left;
          opacity: 0.8;
          transition: 0.4s ease;
        }
        .stat-card:hover .stat-card-top-line {
          transform: scaleX(1);
          opacity: 1;
          transition: all 0.4s ease;
        }
        .stat-card-inner-glow {
          position: absolute;
          bottom: -20px; right: -20px;
          width: 80px; height: 80px;
          border-radius: 50%;
          filter: blur(25px);
          opacity: 0.06;
          background: var(--icon-color);
          pointer-events: none;
        }
        .stat-card-icon-box {
          width: 30px; height: 30px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
          background: var(--icon-bg);
          border: 1px solid var(--icon-border);
          color: var(--icon-color);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .stat-card:hover .stat-card-icon-box {
          background: var(--icon-bg-hover);
          border-color: var(--icon-border-hover);
          transform: scale(1.08) rotate(-4deg);
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .stat-card-label {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--icon-label);
          font-family: monospace;
          margin-bottom: 8px;
        }
        .stat-card-title {
          font-size: clamp(11px, 1vw, 14px);
          font-weight: 600;
          color: rgba(220, 235, 255, 0.92);
          line-height: 1.4;
          margin-bottom: 5px;
        }
        .stat-card-subtitle {
          font-size: 10px;
          font-weight: 400;
          color: rgba(148, 163, 184, 0.65);
          line-height: 1.5;
        }
        .stat-card-special {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .stat-card-special-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.6);
          animation: statusPulse 2s ease-in-out infinite;
        }
        .stat-card-special-text {
          font-size: 10px;
          color: rgba(34,197,94,0.8);
          font-weight: 500;
          letter-spacing: 0.5px;
        }
      `}</style>
      
      {/* Name */}
      <motion.h1
        className="font-display font-[800] text-white tracking-tight flex flex-wrap"
        style={{ fontSize: "clamp(32px, 4.5vw, 60px)", marginBottom: "8px", perspective: "1000px" }}
        initial={{ opacity: 0, rotateX: 60, y: 40, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : { opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
      >
        <span className="name-first">{profile.firstName}</span>
        <span className="name-second">{profile.lastName}</span>
      </motion.h1>

      {/* Role typing / Subtitle shimmer */}
      <motion.div 
        initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
        animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 }}
        style={{ willChange: "transform", fontSize: "clamp(16px, 2vw, 28px)" }}
        className="font-display font-[600] text-white min-h-[40px] relative" 
      >
        <TypingText />
      </motion.div>
      </div>

      {/* Bio */}
      <motion.div 
        className="bio-text"
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.6 }}
        style={{ willChange: "transform, opacity" }}
      >
        Building scalable web applications,{" "}
        intelligent systems, and impactful digital experiences through{" "}
        <span className="bio-highlight">AI</span>, innovation, and{" "}
        <span className="bio-highlight">open-source contributions</span>.
      </motion.div>

      {/* CTA Buttons + Socials */}
      <div className="relative z-10 w-full">
        <HeroButtons />
      </div>

      {/* Stats grid */}
      <div className="stat-card-wrapper pt-2">
        {STAT_CARDS.map((stat, i) => (
          <StatCardItem key={stat.label} stat={stat} index={i} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
}

function StatCardItem({ stat, index, isVisible }: { stat: typeof STAT_CARDS[0], index: number, isVisible: boolean }) {
  const [willChange, setWillChange] = useState<"transform, opacity" | "auto">("transform, opacity");
  
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.8, rotate: index % 2 === 0 ? -4 : 4 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : { opacity: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 12, 
        delay: index * 0.15 + 0.8
      }}
      onAnimationComplete={() => setWillChange("auto")}
      className="stat-card"
      style={{ 
        willChange,
        "--icon-color": stat.iconColor,
        "--hover-border": hexToRgba(stat.iconColor, 0.25),
        "--hover-glow": hexToRgba(stat.iconColor, 0.08),
        "--icon-bg": hexToRgba(stat.iconColor, 0.1),
        "--icon-border": hexToRgba(stat.iconColor, 0.2),
        "--icon-bg-hover": hexToRgba(stat.iconColor, 0.18),
        "--icon-border-hover": hexToRgba(stat.iconColor, 0.4),
        "--icon-label": hexToRgba(stat.iconColor, 0.7),
      } as React.CSSProperties}
    >
      <div className="stat-card-top-line" />
      <div className="stat-card-inner-glow" />
      
      <div className="stat-card-icon-box">
        {stat.icon}
      </div>
      
      <div className="stat-card-label">{stat.label}</div>
      <div className="stat-card-title">{stat.title}</div>
      <div className="stat-card-subtitle">{stat.subtitle}</div>
      
      {stat.special && (
        <div className="stat-card-special">
          <div className="stat-card-special-dot" />
          <span className="stat-card-special-text">Available</span>
        </div>
      )}
    </motion.div>
  );
}
