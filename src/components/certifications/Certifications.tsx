"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code,
  Braces,
  ArrowRight,
  CircleDashed,
  CheckCircle2,
} from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
type FilterType = "all" | "in-progress" | "completed";
type ColorKey = "blue" | "purple" | "cyan";

const certificationsData = [
  {
    id: "aiml",
    title: "AI/ML Certification",
    description:
      "Deep learning, machine learning models, NLP, and real-world AI applications.",
    status: "in-progress" as const,
    icon: Brain,
    color: "blue" as ColorKey,
    progress: 60,
    issuedDate: null as string | null,
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
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
    description:
      "Problem solving, algorithm design, complexity analysis, and data structures mastery.",
    status: "completed" as const,
    icon: Braces,
    color: "cyan" as ColorKey,
    progress: 100,
    issuedDate: "Mar 2024",
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
    iconText: string;
    cardBg: string;
    badge: string;
    arrowRing: string;
    arrowText: string;
    dotClass: string;
    dotGlow: string;
    hoverGlow: string;
  }
> = {
  blue: {
    outerRing:
      "border-blue-500/20 bg-gradient-to-br from-blue-900/18 to-[#020a18]/80",
    iconBox:
      "border-blue-400/38 bg-gradient-to-br from-blue-900/55 via-blue-950/80 to-[#020a18]",
    iconGlow:
      "shadow-[0_0_30px_rgba(59,130,246,0.55),0_0_65px_rgba(59,130,246,0.18)]",
    iconText: "text-blue-400",
    cardBg:
      "from-[#04101e]/97 to-[#030c1c]/99 border-blue-500/12 hover:border-blue-400/35",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/22",
    arrowRing:
      "border-blue-400/65 shadow-[0_0_24px_rgba(59,130,246,0.55),inset_0_0_14px_rgba(59,130,246,0.14)] bg-blue-500/10",
    arrowText: "text-blue-300",
    dotClass: "bg-blue-400",
    dotGlow: "shadow-[0_0_8px_3px_rgba(59,130,246,0.7)]",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]",
  },
  purple: {
    outerRing:
      "border-purple-500/20 bg-gradient-to-br from-purple-900/18 to-[#060115]/80",
    iconBox:
      "border-purple-400/38 bg-gradient-to-br from-purple-900/55 via-purple-950/80 to-[#060115]",
    iconGlow:
      "shadow-[0_0_30px_rgba(168,85,247,0.55),0_0_65px_rgba(168,85,247,0.18)]",
    iconText: "text-purple-400",
    cardBg:
      "from-[#0e0425]/97 to-[#090318]/99 border-purple-500/12 hover:border-purple-400/35",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/22",
    arrowRing:
      "border-purple-400/65 shadow-[0_0_24px_rgba(168,85,247,0.55),inset_0_0_14px_rgba(168,85,247,0.14)] bg-purple-500/10",
    arrowText: "text-purple-300",
    dotClass: "bg-emerald-400",
    dotGlow: "shadow-[0_0_8px_3px_rgba(52,211,153,0.7)]",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]",
  },
  cyan: {
    outerRing:
      "border-cyan-500/20 bg-gradient-to-br from-cyan-900/18 to-[#020c10]/80",
    iconBox:
      "border-cyan-400/38 bg-gradient-to-br from-cyan-900/55 via-cyan-950/80 to-[#010a0d]",
    iconGlow:
      "shadow-[0_0_30px_rgba(6,182,212,0.55),0_0_65px_rgba(6,182,212,0.18)]",
    iconText: "text-cyan-400",
    cardBg:
      "from-[#021315]/97 to-[#020f12]/99 border-cyan-500/12 hover:border-cyan-400/35",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/22",
    arrowRing:
      "border-cyan-400/65 shadow-[0_0_24px_rgba(6,182,212,0.55),inset_0_0_14px_rgba(6,182,212,0.14)] bg-cyan-500/10",
    arrowText: "text-cyan-300",
    dotClass: "bg-emerald-400",
    dotGlow: "shadow-[0_0_8px_3px_rgba(52,211,153,0.7)]",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]",
  },
};

/* ─────────────────────────────────────────────
   Stagger animation variants
───────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const headerWordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
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
      whileHover={{ scale: 1.06, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`p-[5px] rounded-[20px] border cursor-pointer ${c.outerRing}`}
    >
      <div
        className={`w-[92px] h-[92px] rounded-[15px] flex items-center justify-center
          border relative overflow-hidden ${c.iconBox} ${c.iconGlow}
          group-hover:scale-[1.04] transition-transform duration-500`}
      >
        <span className="absolute top-0 left-0 w-[15px] h-[15px] border-t-[1.5px] border-l-[1.5px] border-white/28 rounded-tl-[15px]" />
        <span className="absolute bottom-0 right-0 w-[15px] h-[15px] border-b-[1.5px] border-r-[1.5px] border-white/10 rounded-br-[15px]" />
        <span className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent" />
        <div
          className={`relative z-10 ${c.iconText} drop-shadow-[0_0_20px_currentColor]
            group-hover:scale-110 transition-transform duration-500`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Arrow Button — with hover + tap animations
───────────────────────────────────────────── */
const ArrowBtn = ({ color }: { color: ColorKey }) => {
  const c = colorMap[color];
  return (
    <motion.button
      whileHover={{ scale: 1.15, x: 2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`relative w-[52px] h-[52px] rounded-full border-2 flex items-center
        justify-center shrink-0 overflow-hidden cursor-pointer
        ${c.arrowRing}`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/12 to-transparent" />
      <ArrowRight
        size={18}
        className={`relative z-10 ${c.arrowText} drop-shadow-[0_0_8px_currentColor]`}
      />
    </motion.button>
  );
};

/* ─────────────────────────────────────────────
   Filter Tabs — premium glass pill with spring anim
───────────────────────────────────────────── */
const TABS: {
  id: FilterType;
  label: string;
  type: "all" | "progress" | "check";
}[] = [
  { id: "all", label: "All", type: "all" },
  { id: "in-progress", label: "In Progress", type: "progress" },
  { id: "completed", label: "Completed", type: "check" },
];

const FilterTabs = ({
  active,
  onChange,
}: {
  active: FilterType;
  onChange: (v: FilterType) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="flex items-center bg-[#060a14]/90 backdrop-blur-2xl border border-white/[0.08]
      rounded-full p-[6px] gap-[6px]
      shadow-[0_4px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]"
  >
    {TABS.map((tab) => {
      const isActive = active === tab.id;
      return (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          whileHover={{ scale: isActive ? 1 : 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={`relative flex items-center gap-[7px] px-7 py-[11px] rounded-full
            text-[13px] font-semibold tracking-wide transition-colors duration-300
            ${isActive ? "text-white" : "text-white/35 hover:text-white/65"}`}
        >
          {isActive && (
            <motion.div
              layoutId="filter-active-pill"
              className="absolute inset-0 rounded-full
                bg-gradient-to-b from-blue-500 to-blue-700
                shadow-[0_0_28px_rgba(59,130,246,0.5),0_4px_14px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]"
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-[7px]">
            {tab.type === "progress" && (
              <svg
                className={`w-[14px] h-[14px] shrink-0 ${
                  isActive ? "animate-spin" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeOpacity="0.3"
                />
                <path
                  d="M12 3a9 9 0 0 1 7.79 4.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {tab.type === "check" && (
              <svg
                className="w-[14px] h-[14px] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M7.5 12l3 3 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {tab.label}
          </span>
        </motion.button>
      );
    })}
  </motion.div>
);

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function Certifications() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = certificationsData.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <SectionWrapper id="certifications" className="!py-16 lg:!py-24 w-full">
      <div className="w-full flex flex-col items-center px-4">
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center w-full mb-4"
        >
          {/* Section label — FIX 4: 20% bigger + stronger glow */}
          <motion.div
            variants={headerWordVariants}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-indigo-500/60" />
            <span
              className="font-mono text-[14px] font-bold uppercase tracking-[0.35em]
                text-indigo-400 drop-shadow-[0_0_18px_rgba(99,102,241,0.9)]"
            >
              CERTIFICATIONS
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-indigo-500/60" />
          </motion.div>

          {/* Headline — FIX 3: moved up slightly via tighter mb */}
          <motion.h2
            variants={headerWordVariants}
            className="font-display text-[clamp(2.8rem,5.5vw,4.6rem)] font-bold leading-[1.08] text-white mb-3 tracking-tight"
          >
            Milestones{" "}
            <span
              className="font-serif italic font-medium bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400
                bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.35)]"
            >
              that matter.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={headerWordVariants}
            className="max-w-[440px] text-[15px] text-white/48 leading-relaxed mb-8"
          >
            Each certification represents a commitment to growth,
            problem-solving, and real-world impact.
          </motion.p>

          {/* Filter tabs — FIX 3: mb-0 so gap comes from cards mt */}
          <FilterTabs active={filter} onChange={setFilter} />
        </motion.div>

        {/* ── Cards ── FIX 3: mt-14 gives generous gap between tabs and first card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={containerVariants}
          className="relative w-full max-w-[840px] flex flex-col gap-7 mt-14 mx-auto"
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-[-20px] md:left-[-40px] top-16 bottom-16 w-[2px] bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-cyan-500/20 hidden md:block" />

          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => {
              const Icon = cert.icon;
              const isCompleted = cert.status === "completed";
              const c = colorMap[cert.color];

              return (
                <motion.div
                  key={cert.id}
                  layout
                  variants={itemVariants}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(4px)",
                    transition: { duration: 0.3 },
                  }}
                  className="relative w-full"
                >
                  {/* ── Timeline Node (desktop only) ── */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: i * 0.12,
                    }}
                    className="absolute left-[-27px] md:left-[-47px] top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[#020610] border-2 border-white/10 z-10"
                  >
                    <div
                      className={`w-[6px] h-[6px] rounded-full shrink-0 ${c.dotClass} ${c.dotGlow}`}
                    />
                  </motion.div>

                  {/* ── Card ── FIX 2: pr-10 md:pr-12 moves arrow away from right edge */}
                  <motion.div
                    whileHover={{
                      scale: 1.012,
                      y: -2,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                    whileTap={{ scale: 0.995 }}
                    className={`group w-full relative flex flex-col md:flex-row items-center
                      bg-gradient-to-r backdrop-blur-xl border rounded-[24px]
                      transition-all duration-500 overflow-hidden cursor-pointer
                      p-6 md:py-8 md:pl-8 md:pr-12 gap-6 md:gap-8
                      ${c.cardBg} ${c.hoverGlow}`}
                  >
                    {/* Floating icon */}
                    <div className="shrink-0">
                      <FloatingIcon color={cert.color}>
                        <Icon size={40} strokeWidth={1.25} />
                      </FloatingIcon>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col min-w-0 gap-[6px] justify-center">
                      {/* Status badge — with tap animation */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex self-start items-center px-[10px] py-[4px]
                          rounded-full text-[9.5px] font-bold tracking-[0.16em] border cursor-pointer
                          transition-colors duration-300 ${c.badge}`}
                      >
                        {isCompleted ? "COMPLETED" : "ONGOING"}
                      </motion.div>

                      {/* Title — with subtle hover effect */}
                      <motion.h3
                        className="font-display text-[21px] font-semibold text-white tracking-wide leading-snug
                          group-hover:text-white transition-colors duration-300"
                      >
                        {cert.title}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-white/42 text-[13.5px] leading-[1.68] group-hover:text-white/55 transition-colors duration-500">
                        {cert.description}
                      </p>

                      {/* ── Footer ── */}
                      <div className="flex items-center gap-[7px] mt-1">
                        {!isCompleted ? (
                          <>
                            <CircleDashed
                              size={16}
                              className="text-blue-400 shrink-0 animate-[spin_3s_linear_infinite]"
                            />
                            <span className="text-[13px] text-white/36">
                              Status ·{" "}
                              <span className="text-blue-400/80 font-medium tracking-wide">
                                In Progress
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2
                              size={16}
                              className="text-emerald-400 shrink-0"
                            />
                            <span className="text-[13px] text-white/36">
                              Issued ·{" "}
                              <span className="text-white/56 font-medium tracking-wide">
                                {cert.issuedDate}
                              </span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Arrow button — FIX 2: already padded via card pr-12 */}
                    <div className="shrink-0">
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

        {/* FIX 1: Bottom "verified" text removed entirely */}
      </div>
    </SectionWrapper>
  );
}