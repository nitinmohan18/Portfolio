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
    title: "Full Stack Development",
    issuer: "Udemy",
    description:
      "Modern web development with React, Node.js, APIs, databases, and deployment.",
    status: "completed" as const,
    icon: Code,
    color: "purple" as ColorKey,
    progress: 100,
    issuedDate: "May 2024",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    issuer: "Udemy",
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
      "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5),0_0_80px_rgba(59,130,246,0.17)]",
    iconText: "text-blue-400",
    cardBg:
      "bg-gradient-to-br from-[#04101e] via-[#030d1e] to-[#020918] border-blue-500/[0.08]",
    cardHover:
      "hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_16px_60px_rgba(59,130,246,0.2),inset_0_0_20px_rgba(59,130,246,0.05)]",
    badge: "bg-blue-500/[0.08] text-blue-300 border-blue-500/20",
    arrowRing:
      "border-blue-400/40 shadow-[0_0_16px_rgba(59,130,246,0.3),inset_0_0_10px_rgba(59,130,246,0.08)] bg-blue-500/6 hover:bg-blue-500/12 hover:border-blue-400/60 hover:shadow-[0_0_28px_rgba(59,130,246,0.5)]",
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
      "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5),0_0_80px_rgba(168,85,247,0.17)]",
    iconText: "text-purple-400",
    cardBg:
      "bg-gradient-to-br from-[#0e0425] via-[#0a031c] to-[#060214] border-purple-500/[0.08]",
    cardHover:
      "hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-[0_16px_60px_rgba(168,85,247,0.2),inset_0_0_20px_rgba(168,85,247,0.05)]",
    badge: "bg-purple-500/[0.08] text-purple-300 border-purple-500/20",
    arrowRing:
      "border-purple-400/40 shadow-[0_0_16px_rgba(168,85,247,0.3),inset_0_0_10px_rgba(168,85,247,0.08)] bg-purple-500/6 hover:bg-purple-500/12 hover:border-purple-400/60 hover:shadow-[0_0_28px_rgba(168,85,247,0.5)]",
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
      "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.5),0_0_80px_rgba(6,182,212,0.17)]",
    iconText: "text-cyan-400",
    cardBg:
      "bg-gradient-to-br from-[#021315] via-[#021012] to-[#010c0f] border-cyan-500/[0.08]",
    cardHover:
      "hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_16px_60px_rgba(6,182,212,0.2),inset_0_0_20px_rgba(6,182,212,0.05)]",
    badge: "bg-cyan-500/[0.08] text-cyan-300 border-cyan-500/20",
    arrowRing:
      "border-cyan-400/40 shadow-[0_0_16px_rgba(6,182,212,0.3),inset_0_0_10px_rgba(6,182,212,0.08)] bg-cyan-500/6 hover:bg-cyan-500/12 hover:border-cyan-400/60 hover:shadow-[0_0_28px_rgba(6,182,212,0.5)]",
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
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

const cardUp = {
  hidden: { opacity: 0, y: 32, scale: 0.975 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

const popIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 500, damping: 22 },
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
      whileHover={{ scale: 1.06, rotate: 1.5 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`p-[5px] rounded-[20px] border cursor-pointer ${c.outerRing}`}
    >
      <div
        className={`w-[74px] h-[74px] rounded-[14px] flex items-center justify-center
          border relative overflow-hidden transition-shadow duration-500
          ${c.iconBox} ${c.iconGlow} ${c.iconGlowHover}`}
      >
        <span className="absolute top-0 left-0 w-[12px] h-[12px] border-t-[1.5px] border-l-[1.5px] border-white/28 rounded-tl-[14px]" />
        <span className="absolute bottom-0 right-0 w-[12px] h-[12px] border-b-[1.5px] border-r-[1.5px] border-white/10 rounded-br-[14px]" />
        <span className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent" />
        <div
          className={`relative z-10 ${c.iconText} drop-shadow-[0_0_14px_currentColor]
            group-hover:scale-110 transition-transform duration-500`}
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
      whileHover={{ scale: 1.12, x: 2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`relative w-[52px] h-[52px] rounded-full border-2 flex items-center
        justify-center shrink-0 overflow-hidden cursor-pointer
        transition-all duration-300 ${c.arrowRing}`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
      <ArrowRight
        size={18}
        className={`relative z-10 ${c.arrowText} drop-shadow-[0_0_8px_currentColor]
          group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-45 transition-all duration-300`}
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
    isActive ? "text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" : "text-white/35 group-hover:text-white/60"
  }`;

  if (type === "layers") {
    return <Layers size={18} className={baseClasses} strokeWidth={isActive ? 2.5 : 2} />;
  }
  if (type === "progress") {
    return <CircleDashed size={18} className={baseClasses} strokeWidth={isActive ? 2.5 : 2} />;
  }
  if (type === "check") {
    return <CheckCircle2 size={18} className={baseClasses} strokeWidth={isActive ? 2.5 : 2} />;
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
  <motion.div variants={fadeBlur} className="relative isolate -translate-y-2 z-10 w-full max-w-xl mx-auto mb-14 flex items-center justify-center gap-6 sm:gap-12">
    {TABS.map((tab) => {
      const isActive = active === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative flex items-center justify-center gap-2.5 px-2 py-4 text-[15px] sm:text-[17px] font-medium transition-colors duration-300 outline-none select-none group ${
            isActive
              ? "text-white"
              : "text-white/40 hover:text-white/80"
          }`}
        >
          <TabIcon type={tab.icon} isActive={isActive} />
          <span className="tracking-wide">{tab.label}</span>

          {isActive && (
            <motion.div
              layoutId="activeFilterUnderline"
              className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-indigo-400 blur-[4px] opacity-80" />
            </motion.div>
          )}
        </button>
      );
    })}
  </motion.div>
);

/* ─────────────────────────────────────────────
   Timeline Pulse
───────────────────────────────────────────── */
const TimelinePulse = () => (
  <motion.div
    className="absolute left-0 w-full h-[36px] bg-gradient-to-b from-transparent via-indigo-400/25 to-transparent rounded-full blur-[2px]"
    initial={{ top: "-10%" }}
    animate={{ top: "110%" }}
    transition={{
      duration: 3.5,
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
    <SectionWrapper id="certifications" className="!py-16 lg:!py-24 w-full">
      <div ref={sectionRef} className="w-full flex flex-col items-center px-4">
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionStagger}
          className="flex flex-col items-center text-center w-full mb-10"
        >
          {/* Section label */}
          <motion.div
            variants={fadeBlur}
            className="flex items-center gap-4 mb-4 relative -translate-y-10"
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
            className="font-display text-[clamp(2.8rem,5.5vw,4.6rem)] font-bold leading-[1.08] text-white mb-3 tracking-tight
              drop-shadow-[0_0_40px_rgba(255,255,255,0.06)] relative -translate-y-10"
          >
            Pursuit of <span className="font-serif italic font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_24px_rgba(99,102,241,0.4)] animate-[certShimmer_6s_ease-in-out_infinite]" style={{ backgroundSize: "200% auto" }}>Excellence</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeBlur}
            className="max-w-[440px] text-[15px] text-white/50 leading-relaxed mb-6 relative -translate-y-10"
          >
            Validated expertise in software engineering, problem solving, and emerging technologies.
          </motion.p>

          {/* Subtle Counter */}
          <motion.div
            variants={fadeBlur}
            className="flex flex-wrap items-center justify-center gap-3 text-[13px] font-medium text-white/40 relative -translate-y-10 mb-12"
          >
            <span>{totalCerts} Certifications</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-emerald-400/80">{completedCerts} Completed</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-blue-400/80">{ongoingCerts} In Progress</span>
          </motion.div>

          {/* Filter tabs */}
          <FilterTabs active={filter} onChange={setFilter} />
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.16, delayChildren: 0.45 },
            },
          }}
          className="relative w-full max-w-[840px] flex flex-col gap-6 mt-16 mx-auto"
        >
          {/* Vertical Timeline */}
          <div className="absolute left-[-14px] md:left-[-24px] top-8 bottom-8 w-[2px] hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-purple-500/15 to-cyan-500/10 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.25)]" />
            <div className="absolute inset-0 overflow-hidden">
              <TimelinePulse />
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => {
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
                    className={`absolute left-[-21px] md:left-[-31px] top-1/2 -translate-y-1/2 hidden md:flex
                      items-center justify-center w-[16px] h-[16px] rounded-full
                      bg-[#020610] z-10 border-2
                      ${isCompleted ? "border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.1)]" : "border-white/[0.05] shadow-[0_0_12px_rgba(0,0,0,0.4)]"}`}
                  >
                    <div
                      className={`w-[6px] h-[6px] rounded-full shrink-0 ${c.dotClass} ${isCompleted ? c.dotGlow : "opacity-60"}`}
                    />
                    {!isCompleted && (
                      <motion.div
                        className={`absolute inset-[-4px] rounded-full ${c.pulseColor}`}
                        initial={{ opacity: 0.6, scale: 1 }}
                        animate={{ opacity: 0, scale: 2.2 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Card */}
                  <motion.div
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
                    className={`group w-full relative flex flex-col md:flex-row items-center
                      backdrop-blur-xl border rounded-[22px]
                      transition-all duration-500 cursor-pointer
                      p-8 md:py-10 md:pl-8 md:pr-12 gap-8 md:gap-10
                      ${c.cardBg} ${c.cardHover}`}
                  >
                    {/* Top-edge highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent rounded-t-[22px]" />

                    {/* Floating icon */}
                    <div className="shrink-0 relative translate-x-[16px]">
                      <FloatingIcon color={cert.color}>
                        <Icon size={32} strokeWidth={1.25} />
                      </FloatingIcon>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col min-w-0 gap-3 justify-center">
                      {/* Status badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex self-start items-center gap-1.5 px-3 py-[4px]
                          rounded-full text-[11px] font-medium tracking-wide border cursor-pointer
                          transition-all duration-300 ${c.badge} mb-1`}
                      >
                        {isCompleted ? "✓ Completed" : "↻ In Progress"}
                      </motion.div>

                      {/* Title */}
                      <h3
                        className="font-display text-[22px] font-semibold text-white tracking-wide leading-snug
                          group-hover:text-white transition-colors duration-300"
                      >
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-[14px] leading-relaxed group-hover:text-white/70 transition-colors duration-500 mb-2">
                        {cert.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center gap-[7px] mt-1">
                        <Award size={16} className={`${c.iconText} shrink-0 opacity-80`} />
                        <span className="text-[13px] text-white/40">
                          {isCompleted ? "Certified by" : "Provided by"} ·{" "}
                          <span className="text-white/60 font-medium tracking-wide">
                            {cert.issuer}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Arrow button */}
                    <div className="shrink-0 mt-4 md:mt-0 relative -translate-x-[16px]">
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
      </div>
    </SectionWrapper>
  );
}