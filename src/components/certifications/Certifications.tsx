"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code, Braces, ArrowRight, ShieldCheck } from "lucide-react";
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
    progressBar: string;
    progressText: string;
    arrowRing: string;
    arrowText: string;
    dotClass: string;
    dotGlow: string;
    statusText: string;
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
      "from-[#04101e]/97 to-[#030c1c]/99 border-blue-500/12 hover:border-blue-400/30",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/22",
    progressBar: "from-blue-500 via-blue-400 to-sky-300",
    progressText: "text-blue-400",
    arrowRing:
      "border-blue-400/65 shadow-[0_0_24px_rgba(59,130,246,0.55),inset_0_0_14px_rgba(59,130,246,0.14)] bg-blue-500/10",
    arrowText: "text-blue-300",
    dotClass: "bg-blue-400",
    dotGlow: "shadow-[0_0_8px_3px_rgba(59,130,246,0.7)]",
    statusText: "text-blue-400/65",
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
      "from-[#0e0425]/97 to-[#090318]/99 border-purple-500/12 hover:border-purple-400/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/22",
    progressBar: "from-purple-500 via-purple-400 to-violet-300",
    progressText: "text-purple-400",
    arrowRing:
      "border-purple-400/65 shadow-[0_0_24px_rgba(168,85,247,0.55),inset_0_0_14px_rgba(168,85,247,0.14)] bg-purple-500/10",
    arrowText: "text-purple-300",
    dotClass: "bg-emerald-400",
    dotGlow: "shadow-[0_0_8px_3px_rgba(52,211,153,0.7)]",
    statusText: "text-emerald-400/65",
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
      "from-[#021315]/97 to-[#020f12]/99 border-cyan-500/12 hover:border-cyan-400/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/22",
    progressBar: "from-cyan-500 via-cyan-400 to-teal-300",
    progressText: "text-cyan-400",
    arrowRing:
      "border-cyan-400/65 shadow-[0_0_24px_rgba(6,182,212,0.55),inset_0_0_14px_rgba(6,182,212,0.14)] bg-cyan-500/10",
    arrowText: "text-cyan-300",
    dotClass: "bg-emerald-400",
    dotGlow: "shadow-[0_0_8px_3px_rgba(52,211,153,0.7)]",
    statusText: "text-emerald-400/65",
  },
};

/* ─────────────────────────────────────────────
   Floating Icon  –  outer ring creates the
   "placed inside the card separately" effect
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
    /* Outer ring — visible gap between card edge and icon box */
    <div
      className={`p-[5px] rounded-[20px] border ${c.outerRing}`}
    >
      {/* Inner illuminated box */}
      <div
        className={`w-[92px] h-[92px] rounded-[15px] flex items-center justify-center
          border relative overflow-hidden ${c.iconBox} ${c.iconGlow}
          group-hover:scale-[1.04] transition-transform duration-500`}
      >
        {/* Corner accent marks */}
        <span className="absolute top-0 left-0 w-[15px] h-[15px] border-t-[1.5px] border-l-[1.5px] border-white/28 rounded-tl-[15px]" />
        <span className="absolute bottom-0 right-0 w-[15px] h-[15px] border-b-[1.5px] border-r-[1.5px] border-white/10 rounded-br-[15px]" />
        {/* Subtle diagonal sheen */}
        <span className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent" />
        {/* Icon */}
        <div
          className={`relative z-10 ${c.iconText} drop-shadow-[0_0_20px_currentColor]
            group-hover:scale-110 transition-transform duration-500`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Arrow Button
───────────────────────────────────────────── */
const ArrowBtn = ({ color }: { color: ColorKey }) => {
  const c = colorMap[color];
  return (
    <button
      className={`relative w-[52px] h-[52px] rounded-full border-2 flex items-center
        justify-center transition-all duration-300 hover:scale-110 shrink-0 overflow-hidden
        ${c.arrowRing}`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/12 to-transparent" />
      <ArrowRight
        size={18}
        className={`relative z-10 ${c.arrowText} drop-shadow-[0_0_8px_currentColor]`}
      />
    </button>
  );
};

/* ─────────────────────────────────────────────
   Filter Tabs
───────────────────────────────────────────── */
const TABS: { id: FilterType; label: string; type: "all" | "progress" | "check" }[] = [
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
  <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-full p-[5px] gap-1">
    {TABS.map((tab) => {
      const isActive = active === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative flex items-center gap-[7px] px-5 py-[9px] rounded-full
            text-[13px] font-medium tracking-wide transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white shadow-[0_0_22px_rgba(59,130,246,0.45),0_2px_10px_rgba(0,0,0,0.45)]"
                : "text-white/40 hover:text-white/70"
            }`}
        >
          {/* Progress spinner icon */}
          {tab.type === "progress" && (
            <svg
              className={`w-[13px] h-[13px] shrink-0 ${isActive ? "animate-spin" : ""}`}
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
          {/* Checkmark icon */}
          {tab.type === "check" && (
            <svg
              className="w-[13px] h-[13px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
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
        </button>
      );
    })}
  </div>
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
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center w-full mb-5"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-5">
            <div className="h-[1px] w-10 bg-indigo-500/50" />
            <span className="font-mono text-[11.5px] font-bold uppercase tracking-[0.34em] text-indigo-400 drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
              CERTIFICATIONS
            </span>
            <div className="h-[1px] w-10 bg-indigo-500/50" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-[clamp(2.8rem,5.5vw,4.6rem)] font-bold leading-[1.08] text-white mb-4 tracking-tight">
            Milestones{" "}
            <span className="font-serif italic font-medium bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              that matter.
            </span>
          </h2>

          {/* Subtext */}
          <p className="max-w-[420px] text-[15px] text-white/48 leading-relaxed mb-9">
            Each certification represents a commitment to growth, problem-solving, and
            real-world impact.
          </p>

          {/* Filter tabs */}
          <FilterTabs active={filter} onChange={setFilter} />
        </motion.div>

        {/* ── Cards ── */}
        <div className="w-full max-w-[880px] flex flex-col gap-[14px] mt-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => {
              const Icon = cert.icon;
              const isCompleted = cert.status === "completed";
              const c = colorMap[cert.color];
              const statusLabel = isCompleted ? "COMPLETED" : "IN PROGRESS";

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.42,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.07,
                  }}
                  className="flex items-center gap-4"
                >
                  {/* ── Left status label (desktop only) ── */}
                  <div className="w-[104px] hidden lg:flex items-center justify-end gap-[7px] shrink-0">
                    <div
                      className={`w-[6px] h-[6px] rounded-full shrink-0 ${c.dotClass} ${c.dotGlow}`}
                    />
                    <span
                      className={`text-[9.5px] font-bold tracking-[0.16em] ${c.statusText}`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* ── Card ── */}
                  <div
                    className={`group flex-1 relative flex flex-row items-center
                      bg-gradient-to-r backdrop-blur-xl border rounded-[24px]
                      transition-all duration-500 overflow-hidden
                      px-5 py-5 gap-5 ${c.cardBg}`}
                  >
                    {/* Floating icon */}
                    <div className="shrink-0">
                      <FloatingIcon color={cert.color}>
                        <Icon size={40} strokeWidth={1.25} />
                      </FloatingIcon>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col min-w-0 gap-[8px]">
                      {/* Status badge */}
                      <div
                        className={`inline-flex self-start items-center px-[10px] py-[3.5px]
                          rounded-full text-[9.5px] font-bold tracking-[0.16em] border ${c.badge}`}
                      >
                        {isCompleted ? "COMPLETED" : "ONGOING"}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-[21px] font-semibold text-white tracking-wide leading-snug">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/42 text-[13.5px] leading-[1.68]">
                        {cert.description}
                      </p>

                      {/* ── In-progress: progress bar ── */}
                      {!isCompleted && cert.progress !== undefined && (
                        <div className="flex items-center gap-3 mt-[2px]">
                          {/* Spinning indicator + label */}
                          <div
                            className={`flex items-center gap-[6px] text-[12px] font-medium
                              ${c.progressText} shrink-0`}
                          >
                            <svg
                              className="w-[13px] h-[13px] animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeOpacity="0.28"
                              />
                              <path
                                d="M12 3a9 9 0 0 1 7.79 4.5"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            {cert.progress}% Complete
                          </div>

                          {/* Track */}
                          <div className="flex-1 h-[3px] bg-white/8 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${cert.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.4, ease: "easeOut", delay: 0.35 }}
                              className={`h-full bg-gradient-to-r ${c.progressBar} rounded-full`}
                            />
                          </div>
                        </div>
                      )}

                      {/* ── Completed: issued date ── */}
                      {isCompleted && cert.issuedDate && (
                        <div className="flex items-center gap-[7px] mt-[2px]">
                          <svg
                            className="w-[14px] h-[14px] text-emerald-400 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M7.5 12l3 3 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[12.5px] text-white/36">
                            Issued ·{" "}
                            <span className="text-white/56">{cert.issuedDate}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Arrow button */}
                    <div className="shrink-0 pl-1">
                      <ArrowBtn color={cert.color} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state when filter returns nothing */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-14 text-white/28 text-[14px]"
            >
              No certifications in this category yet.
            </motion.div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mt-10 flex items-center justify-center gap-[9px] text-[13px] text-white/28 font-medium">
          <ShieldCheck size={16} className="text-white/20 shrink-0" />
          <p>
            All certifications are{" "}
            <span className="text-blue-400/72 drop-shadow-[0_0_8px_rgba(59,130,246,0.35)]">
              verified
            </span>{" "}
            and backed by continuous learning.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}