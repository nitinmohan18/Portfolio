"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink, Star, GitFork, Circle } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import type { GithubRepo } from "@/types/project";

const CATEGORY_MAP: Record<string, { label: string; color: string; rgb: string }> = {
  python: { label: "AI PRODUCT", color: "#818cf8", rgb: "129,140,248" },
  javascript: { label: "WEB EXPERIENCE", color: "#38bdf8", rgb: "56,189,248" },
  typescript: { label: "WEB EXPERIENCE", color: "#38bdf8", rgb: "56,189,248" },
  default: { label: "OPEN SOURCE", color: "#34d399", rgb: "52,211,153" },
};

function getCategory(lang: string | null) {
  const key = lang?.toLowerCase() ?? "default";
  return CATEGORY_MAP[key] ?? CATEGORY_MAP.default;
}

export default function ProjectCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 20, stiffness: 100 });
  const sy = useSpring(y, { damping: 20, stiffness: 100 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5.6, -5.6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5.6, 5.6]);

  const cat = getCategory(repo.language);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(${cat.rgb}, 0.15), transparent 80%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) / r.width);
    y.set((e.clientY - r.top - r.height / 2) / r.height);
    
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
    >
      {/* Glass body */}
      <div
        className="relative flex flex-col flex-1 rounded-2xl border transition-all duration-300"
        style={{
          padding: "clamp(2rem, 5%, 3rem)",
          background: "rgba(8, 12, 24, 0.8)",
          borderColor: `rgba(${cat.rgb}, 0.15)`,
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
          style={{ background: spotlight }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
        />

        {/* Corner glow */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: cat.color, filter: "blur(60px)", opacity: 0.06 }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between mb-4" style={{ transform: "translateZ(20px)" }}>
          {/* Category + icon */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                background: `rgba(${cat.rgb}, 0.1)`,
                borderColor: `rgba(${cat.rgb}, 0.25)`,
                color: cat.color,
              }}
            >
              <Github size={16} />
            </div>
            <div>
              <div
                className="font-mono text-[9px] tracking-[3px] uppercase mb-0.5 flex items-center gap-1.5"
                style={{ color: `rgba(${cat.rgb}, 0.7)` }}
              >
                <Circle size={5} fill={cat.color} color={cat.color} className="animate-pulse" />
                {cat.label}
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono border shrink-0"
            style={{
              background: `rgba(${cat.rgb}, 0.08)`,
              borderColor: `rgba(${cat.rgb}, 0.25)`,
              color: cat.color,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}`, animation: "pulse 2s infinite" }}
            />
            {repo.homepage ? "LIVE DEMO" : "ACTIVE BUILD"}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white mb-3 transition-colors duration-300 group-hover:text-[#e2e8ff] capitalize"
          style={{ fontSize: "clamp(18px, 1.5vw, 22px)", letterSpacing: "0.02em", transform: "translateZ(25px)" }}
        >
          {repo.name.replace(/-/g, " ")}
        </h3>

        {/* Description */}
        <p
          className="text-[14px] leading-relaxed flex-1 mb-6"
          style={{ color: "rgba(180,195,220,0.65)", letterSpacing: "0.015em", transform: "translateZ(15px)" }}
        >
          {repo.description ?? "No description provided."}
        </p>

        {/* Language tag */}
        {repo.language && (
          <div className="flex flex-wrap gap-2.5 mb-5" style={{ transform: "translateZ(15px)" }}>
            <motion.span
              whileHover={{ scale: 1.08, y: -3, boxShadow: `0 8px 20px -4px rgba(${cat.rgb}, 0.4)` }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden px-3.5 py-1.5 rounded-lg text-[11px] font-bold font-mono border backdrop-blur-md cursor-pointer transition-all"
              style={{
                background: `linear-gradient(135deg, rgba(${cat.rgb}, 0.15), rgba(${cat.rgb}, 0.05))`,
                borderColor: `rgba(${cat.rgb}, 0.3)`,
                color: `rgba(${cat.rgb}, 1)`,
                boxShadow: `0 2px 10px -2px rgba(${cat.rgb}, 0.2)`
              }}
            >
              {repo.language}
            </motion.span>

            {repo.name.toLowerCase().includes("windly") && repo.name.toLowerCase().includes("frontend") && (
              <>
                <motion.span
                  whileHover={{ scale: 1.08, y: -3, boxShadow: "0 8px 20px -4px rgba(227, 79, 38, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden px-3.5 py-1.5 rounded-lg text-[11px] font-bold font-mono border backdrop-blur-md cursor-pointer transition-all"
                  style={{
                    background: "linear-gradient(135deg, rgba(227, 79, 38, 0.15), rgba(227, 79, 38, 0.05))",
                    borderColor: "rgba(227, 79, 38, 0.3)",
                    color: "rgba(255, 120, 80, 1)",
                    boxShadow: "0 2px 10px -2px rgba(227, 79, 38, 0.2)"
                  }}
                >
                  HTML
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.08, y: -3, boxShadow: "0 8px 20px -4px rgba(38, 77, 228, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden px-3.5 py-1.5 rounded-lg text-[11px] font-bold font-mono border backdrop-blur-md cursor-pointer transition-all"
                  style={{
                    background: "linear-gradient(135deg, rgba(38, 77, 228, 0.15), rgba(38, 77, 228, 0.05))",
                    borderColor: "rgba(38, 77, 228, 0.3)",
                    color: "rgba(100, 150, 255, 1)",
                    boxShadow: "0 2px 10px -2px rgba(38, 77, 228, 0.2)"
                  }}
                >
                  CSS
                </motion.span>
              </>
            )}

            {repo.topics?.slice(0, 2).map((t) => (
              <motion.span
                whileHover={{ scale: 1.08, y: -3, boxShadow: "0 8px 20px -4px rgba(255,255,255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                key={t}
                className="relative overflow-hidden px-3.5 py-1.5 rounded-lg text-[11px] font-bold font-mono border backdrop-blur-md cursor-pointer transition-all"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "rgba(200,215,235,0.8)",
                  boxShadow: "0 2px 10px -2px rgba(255,255,255, 0.05)"
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div
          className="flex items-center gap-4 mb-5 text-[12px] font-mono"
          style={{ color: "rgba(150,165,185,0.5)", transform: "translateZ(15px)" }}
        >
          <span className="flex items-center gap-1.5">
            <Star size={11} /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1.5">
            <GitFork size={11} /> {repo.forks_count}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mt-auto" style={{ transform: "translateZ(30px)" }}>
          <motion.a
            whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 25px -5px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-[13px] font-bold overflow-hidden relative transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
              backdropFilter: "blur(10px)"
            }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <Github size={16} className="relative z-10" />
            <span className="relative z-10 tracking-wide">Source code</span>
          </motion.a>

          {repo.homepage && (
            <motion.a
              whileHover={{ scale: 1.05, y: -3, boxShadow: `0 15px 35px -5px rgba(${cat.rgb}, 0.5)` }}
              whileTap={{ scale: 0.95 }}
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-[13px] font-bold text-white relative overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(${cat.rgb},1), rgba(${cat.rgb},0.7))`,
                border: `1px solid rgba(255,255,255,0.3)`,
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <ExternalLink size={16} className="relative z-10" />
              <span className="relative z-10 tracking-wide">Live demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
