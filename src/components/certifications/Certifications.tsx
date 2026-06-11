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
    date: "",
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

const SquareIcon = ({ children, color }: { children: React.ReactNode; color: string }) => {
  let ringColor, glowColor, bgColor, iconColor;
  if (color === "blue") {
    ringColor = "border-blue-500/30";
    glowColor = "shadow-[0_0_30px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_45px_rgba(59,130,246,0.45)]";
    bgColor = "bg-blue-950/50";
    iconColor = "text-blue-400";
  } else if (color === "purple") {
    ringColor = "border-purple-500/30";
    glowColor = "shadow-[0_0_30px_rgba(168,85,247,0.25)] group-hover:shadow-[0_0_45px_rgba(168,85,247,0.45)]";
    bgColor = "bg-purple-950/50";
    iconColor = "text-purple-400";
  } else {
    ringColor = "border-cyan-500/30";
    glowColor = "shadow-[0_0_30px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_45px_rgba(6,182,212,0.45)]";
    bgColor = "bg-cyan-950/50";
    iconColor = "text-cyan-400";
  }

  return (
    <div className={`relative w-[88px] h-[88px] rounded-2xl flex items-center justify-center shrink-0 border ${ringColor} ${bgColor} ${glowColor} transition-all duration-500 overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className={`relative z-10 ${iconColor} drop-shadow-[0_0_14px_currentColor] transition-transform duration-500 group-hover:scale-110`}>
        {children}
      </div>
    </div>
  );
};

export default function Certifications() {
  const [filter, setFilter] = useState<Status>("all");

  const filteredData = certificationsData.filter((cert) =>
    filter === "all" ? true : cert.status === filter
  );

  return (
    <SectionWrapper id="certifications" className="!py-24 lg:!py-32 w-full">
      {/* Full-width centering wrapper — no left offset, equal padding both sides */}
      <div className="w-full flex flex-col items-center px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center w-full"
        >
          <div className="flex items-center gap-4 mb-6 opacity-90">
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
          <div className="flex items-center gap-1 p-1.5 rounded-full border border-white/5 bg-[#060a14]/80 mb-12 backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
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

        {/* Cards area — centered, max-width constrained, equal side padding */}
        <div className="w-full max-w-[760px] flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredData.map((cert) => {
              const Icon = cert.icon;
              const isCompleted = cert.status === "completed";

              const cardBg =
                cert.color === "blue"
                  ? "from-[#030c20] to-[#040e1e] border-blue-500/20 hover:border-blue-500/35"
                  : cert.color === "purple"
                  ? "from-[#0e0420] to-[#0b0518] border-purple-500/20 hover:border-purple-500/35"
                  : "from-[#021318] to-[#030f14] border-cyan-500/20 hover:border-cyan-500/35";

              const badgeColor = isCompleted
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                : "bg-blue-500/10 text-blue-400 border-blue-500/25";

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Card */}
                  <div className={`group w-full relative flex flex-row items-center gap-7 px-7 py-7 rounded-2xl border bg-gradient-to-r backdrop-blur-xl transition-all duration-500 ${cardBg}`}>

                    {/* Icon box */}
                    <SquareIcon color={cert.color}>
                      <Icon size={38} strokeWidth={1.4} />
                    </SquareIcon>

                    {/* Text block */}
                    <div className="flex-1 flex flex-col min-w-0">

                      {/* Badge */}
                      <div className={`inline-flex self-start items-center px-3 py-[3px] rounded-full text-[10px] font-bold tracking-[0.13em] border mb-3 ${badgeColor}`}>
                        {isCompleted ? "COMPLETED" : "ONGOING"}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-[22px] font-semibold text-white tracking-wide leading-snug mb-2">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-[14px] leading-relaxed mb-4">
                        {cert.description}
                      </p>

                      {/* Footer: progress bar or issued date */}
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
                          <span>Issued · {cert.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Arrow button */}
                    <div className="shrink-0 relative">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`absolute w-24 h-24 rounded-full border opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${cert.color === "blue" ? "border-blue-500/40" : cert.color === "purple" ? "border-purple-500/40" : "border-cyan-500/40"}`} />
                        <div className={`absolute w-32 h-32 rounded-full border opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${cert.color === "blue" ? "border-blue-500/20" : cert.color === "purple" ? "border-purple-500/20" : "border-cyan-500/20"}`} />
                      </div>
                      <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 z-10 text-white/60 hover:text-white">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer note */}
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