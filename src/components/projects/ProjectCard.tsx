"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import type { GithubRepo } from "@/types/project";

const CATEGORY_MAP: Record<string, { label: string; color: string; rgb: string }> = {
  python: { label: "INTELLIGENT SYSTEMS", color: "#818cf8", rgb: "129,140,248" },
  javascript: { label: "FULL-STACK APP", color: "#38bdf8", rgb: "56,189,248" },
  typescript: { label: "FULL-STACK APP", color: "#38bdf8", rgb: "56,189,248" },
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

  const handleMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) / r.width);
    y.set((e.clientY - r.top - r.height / 2) / r.height);
    
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }, [x, y, mouseX, mouseY]);

  const handleMouseLeave = React.useCallback(() => {
    x.set(0); 
    y.set(0);
  }, [x, y]);

  const cardVariants = React.useMemo(() => {
    const isEven = index % 2 === 0;
    const startAngle = isEven ? -(25 + index * 1.5) : (25 + index * 1.5);
    
    return {
      hidden: {
        opacity: 0,
        x: isEven ? 200 : -200,
        y: 220,
        rotateZ: startAngle,
        rotateX: 50,
        rotateY: isEven ? 30 : -30,
        scale: 0.65,
        z: -200,
        filter: "blur(12px)",
      },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
        transition: {
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      },
    };
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col rounded-[24px] overflow-hidden cursor-default"
    >
      {/* Card body - 3D Solid Matte Dark Finish */}
      <div
        className="relative flex flex-col flex-1 rounded-[24px] border transition-all duration-500 group-hover:border-opacity-100"
        style={{
          padding: "clamp(1.5rem, 5vw, 3rem)",
          background: "linear-gradient(165deg, #131824 0%, #05070a 100%)", // Fully solid matte dark finish
          borderColor: `rgba(${cat.rgb}, 0.25)`,
          boxShadow: `inset 0 2px 2px rgba(255, 255, 255, 0.05), inset 0 -4px 12px rgba(0, 0, 0, 0.8), 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 40px rgba(${cat.rgb}, 0.1)`,
        }}
      >
        {/* Spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
          style={{ background: spotlight }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px] transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
        />

        {/* Corner glow */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: cat.color, filter: "blur(60px)", opacity: 0.08 }}
        />

        {/* Header row */}
        <div className="flex items-center justify-between mb-8" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center gap-4">
            {/* Github Logo Box */}
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border relative z-10 transition-transform duration-300 hover:scale-105"
              style={{
                background: `rgba(${cat.rgb}, 0.05)`,
                borderColor: `rgba(${cat.rgb}, 0.4)`,
                boxShadow: `inset 0 0 20px rgba(${cat.rgb}, 0.2), 0 0 15px rgba(${cat.rgb}, 0.2)`
              }}
            >
              <Github size={22} color={cat.color} style={{ filter: `drop-shadow(0 0 8px ${cat.color})` }} />
            </div>

            {/* Category Text */}
            <div
              className="font-mono text-[13px] font-bold tracking-[2px] uppercase flex items-center gap-2"
              style={{ color: cat.color, textShadow: `0 0 10px rgba(${cat.rgb}, 0.5)` }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}` }} 
              />
              {cat.label}
            </div>
          </div>

          {/* Right side LIVE DEMO badge (only if homepage exists) */}
          {repo.homepage && (
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-mono font-bold tracking-wider relative z-10"
              style={{
                borderColor: `rgba(${cat.rgb}, 0.4)`,
                color: cat.color,
                background: `rgba(${cat.rgb}, 0.05)`,
                boxShadow: `0 0 15px rgba(${cat.rgb}, 0.15)`
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
              LIVE DEMO
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-white mb-4 relative z-10 capitalize"
          style={{ fontSize: "36px", letterSpacing: "0.01em", transform: "translateZ(25px)" }}
        >
          {repo.name.toLowerCase() === "windly-frontend" ? "Windly" : repo.name.replace(/-/g, " ")}
        </h3>

        {/* Description */}
        <p
          className="text-[17px] leading-[1.6] mb-6 relative z-10"
          style={{ color: "rgba(180, 195, 220, 0.8)", transform: "translateZ(15px)" }}
        >
          {repo.description ?? "No description provided."}
        </p>

        {/* Premium 3D Tags */}
        {(repo.language || repo.topics?.length) && (
          <div className="flex flex-wrap gap-2.5 mb-8 relative z-10" style={{ transform: "translateZ(15px) translateY(10px)" }}>
            {repo.language && (
              <motion.span
                whileHover={{ y: -2, scale: 1.05, boxShadow: `inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 20px -4px rgba(${cat.rgb}, 0.5)` }}
                className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold border cursor-default transition-all duration-300 tracking-wide"
                style={{
                  background: `linear-gradient(145deg, rgba(16, 22, 38, 0.7), rgba(8, 10, 16, 0.95))`,
                  borderColor: `rgba(${cat.rgb}, 0.4)`,
                  color: cat.color,
                  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.3)`
                }}
              >
                {repo.language}
              </motion.span>
            )}
            
            {repo.name.toLowerCase().includes("windly") && repo.name.toLowerCase().includes("frontend") && (
              <>
                <motion.span
                  whileHover={{ y: -2, scale: 1.05, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 20px -4px rgba(227, 79, 38, 0.5)" }}
                  className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold border cursor-default transition-all duration-300 tracking-wide"
                  style={{
                    background: "linear-gradient(145deg, rgba(16, 22, 38, 0.7), rgba(8, 10, 16, 0.95))",
                    borderColor: "rgba(227, 79, 38, 0.4)",
                    color: "rgba(255, 120, 80, 1)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.3)"
                  }}
                >
                  HTML
                </motion.span>
                <motion.span
                  whileHover={{ y: -2, scale: 1.05, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 20px -4px rgba(38, 77, 228, 0.5)" }}
                  className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold border cursor-default transition-all duration-300 tracking-wide"
                  style={{
                    background: "linear-gradient(145deg, rgba(16, 22, 38, 0.7), rgba(8, 10, 16, 0.95))",
                    borderColor: "rgba(38, 77, 228, 0.4)",
                    color: "rgba(100, 150, 255, 1)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.3)"
                  }}
                >
                  CSS
                </motion.span>
              </>
            )}
            
            {repo.topics?.slice(0, 3).map((t) => (
              <motion.span
                whileHover={{ y: -2, scale: 1.05, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 20px -4px rgba(255, 255, 255, 0.3)" }}
                key={t}
                className="px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold border cursor-default transition-all duration-300 tracking-wide"
                style={{
                  background: "linear-gradient(145deg, rgba(16, 22, 38, 0.7), rgba(8, 10, 16, 0.95))",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(200, 215, 240, 0.9)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.3)"
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        )}

        {/* Stats Row */}
        <div
          className="flex items-center gap-6 pt-5 mb-8 text-[14px] font-mono relative z-10"
          style={{ color: "rgba(150,165,185,0.6)", transform: "translateZ(15px) translateY(16px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="flex items-center gap-2">
            <Star size={16} /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-2">
            <GitFork size={16} /> {repo.forks_count}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-auto relative z-10" style={{ transform: `translateZ(30px) translateY(${index === 0 ? '26px' : '16px'})` }}>
          <motion.a
            whileHover={{ y: -3, scale: 1.02, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.8), 0 10px 20px -5px rgba(0,0,0,0.8)" }}
            whileTap={{ y: 2, scale: 0.98, boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9), inset 0 1px 2px rgba(0,0,0,0.6)" }}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-[12px] text-[15px] font-bold text-[rgba(255,255,255,0.9)] transition-colors duration-300 hover:text-white"
            style={{
              background: "linear-gradient(145deg, #1e2433, #0a0d14)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <Github size={18} />
            Source code
          </motion.a>

          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 py-4 rounded-[12px] text-[15px] font-bold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(180deg, rgba(${cat.rgb}, 0.25) 0%, rgba(${cat.rgb}, 0.05) 100%)`,
                border: `1px solid rgba(${cat.rgb}, 0.4)`,
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.2), 0 0 20px rgba(${cat.rgb}, 0.3)`,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)"
              }}
            >
              <ExternalLink size={18} />
              Live demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}