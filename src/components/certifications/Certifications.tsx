"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Brain,
  Code,
  Braces,
  ArrowRight,
  CircleDashed,
  CheckCircle2,
  Layers,
  Award,
} from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
type FilterType = "all" | "in-progress" | "completed";
type ColorKey = "blue" | "purple" | "cyan";

const certificationsData = [
  {
    id: "fullstack",
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    link: undefined,
    image: "/images/fullstack-cert.png",
    description:
      "Modern web development with React, Node.js, APIs, databases, and deployment.",
    status: "completed" as const,
    icon: Code,
    color: "purple" as ColorKey,
    progress: 100,
    issuedDate: "March 2026",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    issuer: "Udemy",
    link: "https://ude.my/UC-62a624e7-6492-4535-a90e-bcfff9399c83",
    image: undefined,
    description:
      "Problem solving, algorithm design, complexity analysis, and data structures mastery.",
    status: "completed" as const,
    icon: Braces,
    color: "cyan" as ColorKey,
    progress: 100,
    issuedDate: "Mar 2024",
  },
  {
    id: "aiml",
    title: "AI/ML Certification",
    issuer: "Udemy",
    link: undefined,
    image: undefined,
    description:
      "Deep learning, machine learning models, NLP, and real-world AI applications.",
    status: "in-progress" as const,
    icon: Brain,
    color: "blue" as ColorKey,
    progress: 60,
    issuedDate: null as string | null,
  },
];

/* ─────────────────────────────────────────────
   Color Token Map
───────────────────────────────────────────── */
const colorMap: Record<
  ColorKey,
  {
    outerRing: string;
    iconBox: string;
    iconGlow: string;
    iconGlowHover: string;
    iconText: string;
    cardBg: string;
    cardHover: string;
    badge: string;
    arrowRing: string;
    arrowText: string;
    dotClass: string;
    dotGlow: string;
    pulseColor: string;
  }
> = {
  blue: {
    outerRing:
      "border-blue-500/20 bg-gradient-to-br from-blue-900/18 to-[#020a18]/80",
    iconBox:
      "border-blue-400/38 bg-gradient-to-br from-blue-900/55 via-blue-950/80 to-[#020a18]",
    iconGlow:
      "shadow-[0_0_30px_rgba(59,130,246,0.38),0_0_65px_rgba(59,130,246,0.12)]",
    iconGlowHover:
      "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5),0_0_80px_rgba(59,130,246,0.17)] group-active:shadow-[0_0_40px_rgba(59,130,246,0.5),0_0_80px_rgba(59,130,246,0.17)]",
    iconText: "text-blue-400",
    cardBg:
      "bg-[linear-gradient(145deg,#0d111a_0%,#02040a_100%)] border-white/[0.05] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-2px_6px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.8)]",
    cardHover:
      "hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(59,130,246,0.15),0_0_30px_rgba(59,130,246,0.05)]",
    badge: "relative bg-[#020612] border-blue-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_0_20px_rgba(59,130,246,0.15)] text-blue-300",
    arrowRing:
      "hover:border-blue-400/60 hover:shadow-[0_10px_25px_rgba(59,130,246,0.4),0_2px_10px_rgba(59,130,246,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    arrowText: "text-blue-300",
    dotClass: "bg-blue-400",
    dotGlow: "shadow-[0_0_6px_2px_rgba(59,130,246,0.6)]",
    pulseColor: "bg-blue-400/30",
  },
  purple: {
    outerRing:
      "border-purple-500/20 bg-gradient-to-br from-purple-900/18 to-[#060115]/80",
    iconBox:
      "border-purple-400/38 bg-gradient-to-br from-purple-900/55 via-purple-950/80 to-[#060115]",
    iconGlow:
      "shadow-[0_0_30px_rgba(168,85,247,0.38),0_0_65px_rgba(168,85,247,0.12)]",
    iconGlowHover:
      "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5),0_0_80px_rgba(168,85,247,0.17)] group-active:shadow-[0_0_40px_rgba(168,85,247,0.5),0_0_80px_rgba(168,85,247,0.17)]",
    iconText: "text-purple-400",
    cardBg:
      "bg-[linear-gradient(145deg,#120b1a_0%,#04020a_100%)] border-white/[0.05] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-2px_6px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.8)]",
    cardHover:
      "hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(168,85,247,0.15),0_0_30px_rgba(168,85,247,0.05)] active:-translate-y-1 active:border-white/[0.15] active:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(168,85,247,0.15),0_0_30px_rgba(168,85,247,0.05)]",
    badge: "relative bg-[#050210] border-purple-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_0_20px_rgba(168,85,247,0.15)] text-purple-300",
    arrowRing:
      "hover:border-purple-400/60 hover:shadow-[0_10px_25px_rgba(168,85,247,0.4),0_2px_10px_rgba(168,85,247,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)] active:border-purple-400/60 active:shadow-[0_10px_25px_rgba(168,85,247,0.4),0_2px_10px_rgba(168,85,247,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    arrowText: "text-purple-300",
    dotClass: "bg-emerald-400",
    dotGlow: "shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]",
    pulseColor: "bg-emerald-400/30",
  },
  cyan: {
    outerRing:
      "border-cyan-500/20 bg-gradient-to-br from-cyan-900/18 to-[#020c10]/80",
    iconBox:
      "border-cyan-400/38 bg-gradient-to-br from-cyan-900/55 via-cyan-950/80 to-[#010a0d]",
    iconGlow:
      "shadow-[0_0_30px_rgba(6,182,212,0.38),0_0_65px_rgba(6,182,212,0.12)]",
    iconGlowHover:
      "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.5),0_0_80px_rgba(6,182,212,0.17)] group-active:shadow-[0_0_40px_rgba(6,182,212,0.5),0_0_80px_rgba(6,182,212,0.17)]",
    iconText: "text-cyan-400",
    cardBg:
      "bg-[linear-gradient(145deg,#0a1518_0%,#02070a_100%)] border-white/[0.05] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-2px_6px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.8)]",
    cardHover:
      "hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(6,182,212,0.15),0_0_30px_rgba(6,182,212,0.05)] active:-translate-y-1 active:border-white/[0.15] active:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_10px_rgba(0,0,0,1),0_20px_50px_rgba(6,182,212,0.15),0_0_30px_rgba(6,182,212,0.05)]",
    badge: "relative bg-[#01080a] border-cyan-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_0_20px_rgba(6,182,212,0.15)] text-cyan-300",
    arrowRing:
      "hover:border-cyan-400/60 hover:shadow-[0_10px_25px_rgba(6,182,212,0.4),0_2px_10px_rgba(6,182,212,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)] active:border-cyan-400/60 active:shadow-[0_10px_25px_rgba(6,182,212,0.4),0_2px_10px_rgba(6,182,212,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    arrowText: "text-cyan-300",
    dotClass: "bg-emerald-400",
    dotGlow: "shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]",
    pulseColor: "bg-emerald-400/30",
  },
};

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeBlur = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

const timelineDraw = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const cardUp = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const popIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
};

/* ─────────────────────────────────────────────
   Floating Icon
───────────────────────────────────────────── */
const FloatingIcon = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: ColorKey;
}) => {
  const c = colorMap[color];
  return (
    <motion.div
      whileHover={{ scale: 1.06, rotate: 1.5, y: -4 }}
      whileTap={{ scale: 0.94, y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`relative p-[6px] rounded-[22px] border cursor-pointer shadow-[0_12px_24px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-4px_8px_rgba(0,0,0,0.9)] ${c.outerRing}`}
    >
      {/* Outer Casing Inner Bevel */}
      <div className="absolute inset-[1px] rounded-[20px] border border-black/60 pointer-events-none" />

      <div
        className={`w-[74px] h-[74px] rounded-[16px] flex items-center justify-center
          border border-black/40 relative overflow-hidden transition-shadow duration-500
          shadow-[inset_0_2px_3px_rgba(255,255,255,0.2),inset_0_-4px_8px_rgba(0,0,0,0.8)]
          ${c.iconBox} ${c.iconGlow} ${c.iconGlowHover}`}
      >
        {/* Realistic Curved Top Glass Reflection */}
        <div className="absolute inset-x-2 top-1 h-[35%] bg-gradient-to-b from-white/[0.18] to-transparent rounded-t-[14px] opacity-90 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        
        {/* Metallic Corner Accents */}
        <span className="absolute top-0 left-0 w-[12px] h-[12px] border-t-[2px] border-l-[2px] border-white/40 rounded-tl-[16px]" />
        <span className="absolute bottom-0 right-0 w-[12px] h-[12px] border-b-[2px] border-r-[2px] border-white/10 rounded-br-[16px]" />
        
        <div
          className={`relative z-10 ${c.iconText} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
            group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_currentColor] group-active:scale-110 group-active:drop-shadow-[0_0_14px_currentColor] transition-all duration-500`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Arrow Button
───────────────────────────────────────────── */
const ArrowBtn = ({ color }: { color: ColorKey }) => {
  const c = colorMap[color];
  return (
    <motion.button
      aria-hidden="true"
      tabIndex={-1}
      whileHover={{ scale: 1.08, x: 2, y: -4 }}
      whileTap={{ scale: 0.92, y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`relative w-[52px] h-[52px] rounded-full border border-black/80 flex items-center
        justify-center shrink-0 overflow-hidden cursor-pointer bg-[linear-gradient(180deg,#1e2536_0%,#070a12_100%)]
        shadow-[0_8px_16px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.9)]
        transition-all duration-150 ${c.arrowRing}`}
    >
      {/* 3D Inner Casing/Bevel */}
      <div className="absolute inset-[1px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute inset-[2px] rounded-full border border-black/40 pointer-events-none" />

      {/* Realistic Curved Top Glass Reflection */}
      <div className="absolute inset-x-2 top-1 h-[35%] bg-gradient-to-b from-white/[0.12] to-transparent rounded-t-full opacity-90 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <ArrowRight
        size={22}
        strokeWidth={1.75}
        className={`relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:drop-shadow-[0_0_12px_currentColor] group-active:drop-shadow-[0_0_12px_currentColor] ${c.arrowText}`}
      />
    </motion.button>
  );
};

/* ─────────────────────────────────────────────
   Premium Filter Tabs — glassmorphism segmented
   control, wider, gradient border, inner glow
───────────────────────────────────────────── */
const TABS: {
  id: FilterType;
  label: string;
  icon: "layers" | "progress" | "check";
}[] = [
  { id: "all", label: "All", icon: "layers" },
  { id: "in-progress", label: "In Progress", icon: "progress" },
  { id: "completed", label: "Completed", icon: "check" },
];

const TabIcon = ({
  type,
  isActive,
}: {
  type: "layers" | "progress" | "check";
  isActive: boolean;
}) => {
  const baseClasses = `shrink-0 transition-all duration-300 ${
    isActive ? "text-indigo-300 drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]" : "text-white/40 group-hover:text-white/70"
  }`;

  if (type === "layers") {
    return <Layers size={20} className={baseClasses} strokeWidth={isActive ? 2.5 : 2} />;
  }
  if (type === "progress") {
    return <CircleDashed size={20} className={baseClasses} strokeWidth={isActive ? 2.5 : 2} />;
  }
  if (type === "check") {
    return <CheckCircle2 size={20} className={baseClasses} strokeWidth={isActive ? 2.5 : 2} />;
  }
  return null;
};

const FilterTabs = ({
  active,
  onChange,
}: {
  active: FilterType;
  onChange: (v: FilterType) => void;
}) => (
  <motion.div variants={fadeBlur} className="relative z-10 w-full flex justify-center mb-24 mt-8 -translate-y-6">
    <div 
      role="tablist"
      aria-label="Filter certifications"
      className="relative inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full border border-white/[0.03]"
      style={{
        background: "linear-gradient(180deg, #02040a 0%, #060a12 100%)",
        boxShadow: "inset 0 6px 12px rgba(0,0,0,1), inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 1px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.9)"
      }}
    >
      <div className="absolute inset-0 rounded-full border border-black/80 pointer-events-none" />
      
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls="certifications-panel"
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center justify-center gap-2.5 px-6 py-2.5 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] font-bold transition-all duration-300 outline-none select-none rounded-full z-10 group shrink-0 whitespace-nowrap ${
              isActive
                ? "text-white"
                : "text-white/30 hover:text-white/70"
            }`}
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/[0.02]" />

            {isActive && (
              <motion.div
                layoutId="activeFilterCapsuleBg"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(145deg, rgba(20,30,48,1) 0%, rgba(10,15,24,1) 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,0,0,0.9), 0 8px 16px rgba(0,0,0,0.9), 0 0 20px rgba(59,130,246,0.3)"
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="absolute inset-[1px] rounded-full border border-white/10" />
                {/* Stunning Top Highlight */}
                <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                {/* Bottom Core Glow */}
                <div className="absolute inset-x-8 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,1)]" />
              </motion.div>
            )}
            
            <div className="relative z-10 flex items-center gap-2.5">
              <TabIcon type={tab.icon} isActive={isActive} />
              <span className="tracking-wide" style={{ textShadow: isActive ? "0 0 15px rgba(255,255,255,0.5)" : "none" }}>{tab.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Timeline Pulse
───────────────────────────────────────────── */
const TimelinePulse = () => (
  <motion.div
    className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[120px] rounded-full"
    style={{
      background: "linear-gradient(to bottom, transparent, rgba(96, 165, 250, 1), transparent)",
      boxShadow: "0 0 15px 2px rgba(96, 165, 250, 0.6), 0 0 30px rgba(167, 139, 250, 0.4)"
    }}
    initial={{ top: "-20%" }}
    animate={{ top: "120%" }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function Certifications() {
  const [filter, setFilter] = useState<FilterType>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered = certificationsData.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const totalCerts = certificationsData.length;
  const completedCerts = certificationsData.filter((c) => c.status === "completed").length;
  const ongoingCerts = certificationsData.filter((c) => c.status === "in-progress").length;

  return (
    <SectionWrapper id="certifications" className="w-full max-sm:pb-8">
      <div ref={sectionRef} className="w-full flex flex-col items-center px-4">
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionStagger}
          className="flex flex-col items-center text-center w-full max-sm:mb-4 mb-10"
        >
          {/* Section label */}
          <motion.div
            variants={fadeBlur}
            className="flex items-center gap-4 mb-8 max-sm:!mb-[24px] relative -translate-y-10"
          >
            <motion.div
              className="h-[1px] w-14 bg-gradient-to-r from-transparent via-indigo-400/40 to-indigo-500/60"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            />
            <span
              className="font-mono text-[14px] font-bold uppercase tracking-[0.35em]
                text-indigo-400
                drop-shadow-[0_0_20px_rgba(99,102,241,0.9)]
                [text-shadow:0_0_30px_rgba(99,102,241,0.5),0_0_60px_rgba(99,102,241,0.2)]"
            >
              CERTIFICATIONS
            </span>
            <motion.div
              className="h-[1px] w-14 bg-gradient-to-l from-transparent via-indigo-400/40 to-indigo-500/60"
              initial={{ scaleX: 0, originX: 1 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeBlur}
            className="font-display text-[clamp(2.8rem,5.5vw,4.6rem)] max-sm:text-[2rem] font-bold leading-[1.08] text-white max-sm:!mb-[8px] mb-5 tracking-tight
              drop-shadow-[0_0_40px_rgba(255,255,255,0.06)] relative -translate-y-10 max-sm:left-0 -left-[9.6px] sm:pt-[24px]"
          >
            Pursuit of <span className="font-serif italic font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_24px_rgba(99,102,241,0.4)] animate-[certShimmer_6s_ease-in-out_infinite]" style={{ backgroundSize: "200% auto" }}>Excellence</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeBlur}
            className="max-w-[440px] max-sm:text-[13px] text-[15px] text-white/50 leading-relaxed max-sm:mb-4 mb-6 relative -translate-y-10 max-sm:px-2"
          >
            Validated expertise in software engineering, problem solving, and emerging technologies.
          </motion.p>

          {/* Subtle Counter */}
          <motion.div
            variants={fadeBlur}
            className="flex flex-row flex-nowrap items-center justify-center max-sm:gap-1.5 md:gap-3 max-sm:text-[11px] md:text-[13px] font-medium text-white/40 relative -translate-y-10 max-sm:mb-6 mb-12 whitespace-nowrap"
          >
            <span>{totalCerts} Certifications</span>
            <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
            <span className="text-emerald-400/80">{completedCerts} Completed</span>
            <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
            <span className="text-blue-400/80">{ongoingCerts} In Progress</span>
          </motion.div>

          {/* Filter tabs */}
          <FilterTabs active={filter} onChange={setFilter} />
        </motion.div>

        {/* ── Cards ── */}
        {/* ── Cards ── */}
        <motion.div
          layout
          className="w-full max-sm:!w-[86vw] max-sm:translate-x-[4vw] max-w-[840px] max-sm:mt-6 mt-16 mx-auto max-sm:min-h-[300px] min-h-[560px] md:min-h-[480px]"
        >
          <motion.div 
            id="certifications-panel"
            layout 
            className="relative flex flex-col gap-6 w-full"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.35, delayChildren: 0.2 },
              },
            }}
          >
            {/* Vertical Timeline */}
            <motion.div
              layout
              variants={timelineDraw}
              style={{ originY: 0 }}
              className="absolute left-[-20px] md:left-[-30px] top-[40px] bottom-[40px] w-[6px] block z-0"
            >
              <div className="absolute inset-0 bg-[#050810] border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,1)] rounded-full" />
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <TimelinePulse />
              </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
            {filtered.map((cert) => {
              const Icon = cert.icon;
              const isCompleted = cert.status === "completed";
              const c = colorMap[cert.color];

              return (
                <motion.div
                  key={cert.id}
                  layout
                  variants={cardUp}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(6px)",
                    transition: { duration: 0.25 },
                  }}
                  className="relative w-full"
                >
                  {/* Timeline Node */}
                  <motion.div
                    variants={popIn}
                    className={`absolute left-[-29px] md:left-[-39px] top-1/2 -translate-y-1/2 flex
                      items-center justify-center w-[24px] h-[24px] rounded-full
                      bg-[#080d1a] z-10 border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.5)]`}
                  >
                    <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.1)_0%,transparent_100%)] pointer-events-none" />
                    
                    <div
                      className={`w-[10px] h-[10px] rounded-full shrink-0 relative z-10 border border-black/40 ${c.dotClass} ${isCompleted ? c.dotGlow : ""}`}
                      style={{ boxShadow: isCompleted ? "inset 0 1px 2px rgba(255,255,255,0.6)" : "inset 0 1px 1px rgba(255,255,255,0.2), 0 0 10px rgba(255,255,255,0.3)" }}
                    />
                    
                    {/* Premium Dual-Ring Sonar Pulse for In Progress */}
                    {!isCompleted && (
                      <>
                        <motion.div
                          className="absolute inset-[2px] rounded-full border border-white/40"
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                        <motion.div
                          className="absolute inset-[2px] rounded-full border border-white/40"
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 1.25,
                          }}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    role={cert.link || cert.image ? "link" : "article"}
                    tabIndex={cert.link || cert.image ? 0 : undefined}
                    aria-label={`Certification: ${cert.title} by ${cert.issuer}`}
                    onClick={() => {
                      if (cert.link) window.open(cert.link, "_blank");
                      else if (cert.image) window.open(cert.image, "_blank");
                    }}
                    onTouchStart={() => {}} // Enables CSS :active pseudo-class on mobile iOS
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (cert.link) window.open(cert.link, "_blank");
                        else if (cert.image) window.open(cert.image, "_blank");
                      }
                    }}
                    whileHover={{
                      scale: 1.015,
                      y: -4,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      },
                    }}
                    whileTap={{ scale: 0.99 }}
                    className={`group w-full relative flex flex-col md:flex-row items-center max-sm:flex-row max-sm:!py-3 max-sm:!px-3 max-sm:!gap-2
                      backdrop-blur-xl border rounded-[22px]
                      transition-all duration-500 ${cert.link || cert.image ? "cursor-pointer" : "cursor-default"}
                      p-8 md:py-10 md:pl-8 md:pr-12 gap-8 md:gap-10
                      ${c.cardBg} ${c.cardHover}`}
                  >
                    {/* Card Flash Glow on Entry */}
                    <motion.div
                      className={`absolute inset-0 ${c.pulseColor} mix-blend-screen pointer-events-none blur-3xl`}
                      initial={{ opacity: 0 }}
                      variants={{
                        visible: {
                          opacity: [0, 0.8, 0],
                          transition: { duration: 1.2, times: [0, 0.2, 1], ease: EASE },
                        }
                      }}
                    />

                    {/* Top-edge highlight */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/[0.3] to-transparent rounded-t-[22px]" />
                    <div className="absolute inset-0 rounded-[22px] bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none" />

                    {/* Floating icon */}
                    <div className="shrink-0 relative translate-x-[16px] max-sm:translate-x-0 max-sm:scale-[0.7] max-sm:mx-0">
                      <FloatingIcon color={cert.color}>
                        <Icon size={32} strokeWidth={1.25} />
                      </FloatingIcon>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col min-w-0 gap-3 max-sm:gap-[2px] justify-center max-sm:w-full">
                      {/* Status badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex self-start items-center gap-2 px-3 py-1.5 translate-y-[10px] max-sm:px-2 max-sm:py-0 max-sm:translate-y-0
                          rounded-full text-[10px] max-sm:text-[7px] font-bold tracking-[0.15em] uppercase border border-white/5 cursor-pointer
                          transition-all duration-300 overflow-hidden ${c.badge} mb-1 max-sm:mb-0`}
                      >
                        {/* Glass Reflection */}
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none" />
                        
                        {/* Glowing Dot Indicator */}
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCompleted ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-pulse"}`} />
                        
                        <span className="relative z-10" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                          {isCompleted ? "COMPLETED" : "IN PROGRESS"}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <h3
                        className="font-display text-[22px] max-sm:text-[14px] font-semibold text-white tracking-wide leading-snug
                          group-hover:text-white transition-colors duration-300 max-sm:overflow-x-auto max-sm:whitespace-nowrap"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p 
                        className="text-white/50 text-[14px] max-sm:text-[10px] leading-relaxed group-hover:text-white/70 transition-colors duration-500 mb-2 max-sm:mb-0 max-sm:overflow-x-auto max-sm:whitespace-nowrap"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        {cert.description}
                      </p>

                      {/* Footer */}
                      <div 
                        className="flex items-center gap-[7px] max-sm:gap-[4px] mt-1 max-sm:mt-0 -translate-y-[7px] max-sm:translate-y-0 max-sm:overflow-x-auto max-sm:whitespace-nowrap"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        <Award size={16} className={`${c.iconText} shrink-0 opacity-80 max-sm:scale-[0.65] max-sm:-mr-0.5`} />
                        <span className="text-[13px] max-sm:text-[10px] text-white/40">
                          {isCompleted ? "Certified by" : "Provided by"} ·{" "}
                          <span className="text-white/60 font-medium tracking-wide">
                            {cert.issuer}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Arrow button */}
                    <div className="shrink-0 mt-4 md:mt-0 relative -translate-x-[16px] max-sm:translate-x-0 max-sm:mt-0 max-sm:scale-[0.6] max-sm:mx-0">
                      <ArrowBtn color={cert.color} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-14 text-white/28 text-[14px]"
            >
              No certifications in this category yet.
            </motion.div>
          )}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}