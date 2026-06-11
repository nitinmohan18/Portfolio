"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code,
  Braces,
  CheckCircle2,
  CircleDashed,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

type Status = "all" | "completed" | "in-progress";

const certificationsData = [
  {
    id: "aiml",
    title: "AI/ML Certification",
    description: "Deep learning, machine learning models, NLP, and real-world AI applications.",
    status: "in-progress",
    progress: 60,
    date: "2025",
    icon: Brain,
    color: "blue",
    dotColor: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]",
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description: "Modern web development with React, Node.js, APIs, databases, and deployment.",
    status: "completed",
    date: "May 2024",
    icon: Code,
    color: "purple",
    dotColor: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Problem solving, algorithm design, complexity analysis, and data structures mastery.",
    status: "completed",
    date: "Mar 2024",
    icon: Braces,
    color: "cyan",
    dotColor: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]",
  },
];

// Futuristic isolated icon box — floats with margin inside the card
const SquareIcon = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const styles = {
    blue: {
      border: "border-blue-400/40",
      glow: "shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_30px_rgba(59,130,246,0.35),0_0_60px_rgba(59,130,246,0.15)]",
      bg: "bg-gradient-to-br from-blue-900/60 via-blue-950/80 to-[#030a1c]",
      icon: "text-blue-400",
      scanline: "from-blue-400/10 via-transparent to-transparent",
    },
    purple: {
      border: "border-purple-400/40",
      glow: "shadow-[0_0_0_1px_rgba(168,85,247,0.15),0_0_30px_rgba(168,85,247,0.35),0_0_60px_rgba(168,85,247,0.15)]",
      bg: "bg-gradient-to-br from-purple-900/60 via-purple-950/80 to-[#0a0414]",
      icon: "text-purple-400",
      scanline: "from-purple-400/10 via-transparent to-transparent",
    },
    cyan: {
      border: "border-cyan-400/40",
      glow: "shadow-[0_0_0_1px_rgba(6,182,212,0.15),0_0_30px_rgba(6,182,212,0.35),0_0_60px_rgba(6,182,212,0.15)]",
      bg: "bg-gradient-to-br from-cyan-900/60 via-cyan-950/80 to-[#020e12]",
      icon: "text-cyan-400",
      scanline: "from-cyan-400/10 via-transparent to-transparent",
    },
  }[color] ?? {
    border: "border-blue-400/40",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    bg: "bg-blue-950/60",
    icon: "text-blue-400",
    scanline: "from-blue-400/10 via-transparent to-transparent",
  };

  return (
    <div className={`relative w-[100px] h-[100px] rounded-[18px] flex items-center justify-center shrink-0 border ${styles.border} ${styles.bg} ${styles.glow} transition-all duration-500 overflow-hidden group-hover:scale-[1.03]`}>
      {/* Top-left corner accent */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/20 rounded-tl-[18px]" />
      {/* Bottom-right corner accent */}
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/10 rounded-br-[18px]" />
      {/* Diagonal scanline shimmer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.scanline} opacity-60`} />
      {/* Icon */}
      <div className={`relative z-10 ${styles.icon} drop-shadow-[0_0_16px_currentColor] transition-transform duration-500 group-hover:scale-110`}>
        {children}
      </div>
    </div>
  );
};

// 3D watery glowing arrow button
const ArrowBtn = ({ color }: { color: string }) => {
  const ringColor =
    color === "blue"
      ? "border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_0_12px_rgba(59,130,246,0.15)]"
      : color === "purple"
      ? "border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.5),inset_0_0_12px_rgba(168,85,247,0.15)]"
      : "border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.5),inset_0_0_12px_rgba(6,182,212,0.15)]";

  const bgGlow =
    color === "blue"
      ? "bg-[radial-gradient(circle_at_40%_30%,rgba(59,130,246,0.25),transparent_70%)]"
      : color === "purple"
      ? "bg-[radial-gradient(circle_at_40%_30%,rgba(168,85,247,0.25),transparent_70%)]"
      : "bg-[radial-gradient(circle_at_40%_30%,rgba(6,182,212,0.25),transparent_70%)]";

  const iconColor =
    color === "blue" ? "text-blue-300" : color === "purple" ? "text-purple-300" : "text-cyan-300";

  return (
    <button
      className={`relative w-[52px] h-[52px] rounded-full border-2 ${ringColor} ${bgGlow} flex items-center justify-center transition-all duration-300 hover:scale-110 group-hover:brightness-125 overflow-hidden`}
    >
      {/* Inner water ripple layer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-tl from-white/5 to-transparent" />
      <ArrowRight size={19} className={`relative z-10 ${iconColor} drop-shadow-[0_0_8px_currentColor]`} />
    </button>
  );
};

export default function Certifications() {
  const [filter, setFilter] = useState<Status>("all");

  const filteredData = certificationsData.filter((cert) =>
    filter === "all" ? true : cert.status === filter
  );

  return (
    <SectionWrapper id="certifications" className="!py-24 lg:!py-32 w-full">
      <div className="w-full flex flex-col items-center px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center w-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-indigo-500/50" />
            <span className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] text-indigo-400 drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
              CERTIFICATIONS
            </span>
            <div className="h-[1px] w-12 bg-indigo-500/50" />
          </div>

          <h2 className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold leading-tight text-white mb-5 tracking-tight">
            Milestones{" "}
            <span className="font-serif italic font-medium bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              that matter.
            </span>
          </h2>

          <p className="max-w-md text-[15px] text-white/55 leading-relaxed mb-10">
            Each certification represents a commitment to growth, problem-solving, and real-world impact.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1.5 rounded-full border border-white/5 bg-[#060a14]/80 mb-12 backdrop-blur-xl">
            {(["all", "in-progress", "completed"] as Status[]).map((f) => {
              const isActive = filter === f;
              const label = f === "all" ? "All" : f === "in-progress" ? "In Progress" : "Completed";
              const Icon = f === "in-progress" ? CircleDashed : f === "completed" ? CheckCircle2 : null;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative flex items-center gap-2 px-7 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/75"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-600/30 to-blue-700/10 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                    />
                  )}
                  {Icon && <Icon size={14} className={`relative z-10 ${isActive ? "text-blue-400" : ""}`} />}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="w-full max-w-[820px] flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredData.map((cert) => {
              const Icon = cert.icon;
              const isCompleted = cert.status === "completed";

              // Card background — dark gradient with color tint
              const cardBg =
                cert.color === "blue"
                  ? "from-[#040e24]/90 to-[#030b1c]/95 border-blue-500/15 hover:border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.04)]"
                  : cert.color === "purple"
                  ? "from-[#0f0520]/90 to-[#0a0418]/95 border-purple-500/15 hover:border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.04)]"
                  : "from-[#021418]/90 to-[#031010]/95 border-cyan-500/15 hover:border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.04)]";

              const badgeColor = isCompleted
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                : "bg-blue-500/10 text-blue-400 border-blue-500/25";

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`group w-full relative flex flex-row items-center bg-gradient-to-r backdrop-blur-xl border rounded-2xl transition-all duration-500 overflow-hidden ${cardBg}`}>

                    {/* Icon — isolated with its own padding from card edge */}
                    <div className="p-4 shrink-0">
                      <SquareIcon color={cert.color}>
                        <Icon size={42} strokeWidth={1.3} />
                      </SquareIcon>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col py-6 pr-2 min-w-0 gap-2">

                      <div className={`inline-flex self-start items-center px-3 py-[3px] rounded-full text-[10px] font-bold tracking-[0.13em] border ${badgeColor}`}>
                        {isCompleted ? "COMPLETED" : "ONGOING"}
                      </div>

                      <h3 className="font-display text-[22px] font-semibold text-white tracking-wide leading-snug">
                        {cert.title}
                      </h3>

                      <p className="text-white/50 text-[14px] leading-relaxed">
                        {cert.description}
                      </p>

                      <div className="mt-1">
                        {!isCompleted ? (
                          <div className="flex items-center gap-3 max-w-[300px]">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <div className="w-3.5 h-3.5 rounded-full border border-blue-500/40 bg-blue-500/10 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              </div>
                              <span className="text-blue-400 text-[12px] font-bold whitespace-nowrap">{cert.progress}% Complete</span>
                            </div>
                            <div className="flex-1 h-[5px] bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                style={{ width: `${cert.progress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-400 text-[13px] font-medium">
                            <CheckCircle2 size={15} className="drop-shadow-[0_0_5px_currentColor]" />
                            <span>{cert.date}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Arrow button with 3D watery effect */}
                    <div className="px-6 shrink-0">
                      <ArrowBtn color={cert.color} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-center gap-3 text-[13px] text-white/35 font-medium">
          <ShieldCheck size={18} className="text-white/25" />
          <p>
            All certifications are{" "}
            <span className="text-blue-400/80 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">verified</span>{" "}
            and backed by continuous learning.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}