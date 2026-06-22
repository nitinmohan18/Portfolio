"use client";

import { useGithub } from "@/hooks/useGithub";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Loader2, GitBranch } from "lucide-react";
import { Github } from "@/components/ui/Icons";

export default function GithubProjects() {
  const { repos, loading, error } = useGithub();

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-24">
        <Loader2 size={28} className="animate-spin text-[#60a5fa]" />
        <p className="text-sm font-mono text-[rgba(255,255,255,0.4)] tracking-widest">FETCHING REPOSITORIES</p>
      </div>
    );
  }

  if (error || repos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-24">
        <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
          <Github size={28} className="text-[rgba(255,255,255,0.3)]" />
        </div>
        <p className="text-sm font-mono text-[rgba(255,255,255,0.4)]">Could not load repositories.</p>
        <a
          href="https://github.com/nitinmohan18"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(255,255,255,0.12)] text-white hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
        >
          View GitHub Profile
        </a>
      </div>
    );
  }

  let filtered = repos.filter(
    (r) => r.name.toLowerCase() !== "nitinmohan18" && r.description
  );

  const portfolioRepo = {
    id: 999999,
    name: "Portfolio",
    full_name: "nitinmohan18/Portfolio",
    description: "Modern personal developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features highly interactive 3D UI elements and dynamic project fetching.",
    html_url: "https://github.com/nitinmohan18/Portfolio",
    homepage: "https://portfolio-coral-theta-92.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["nextjs", "react", "tailwindcss", "framer-motion", "portfolio"],
    fork: false,
    updated_at: new Date().toISOString()
  };

  const existingIdx = filtered.findIndex(r => r.name.toLowerCase() === "portfolio" || r.name.toLowerCase() === "nitin-portfolio");
  if (existingIdx !== -1) {
    filtered.splice(existingIdx, 1);
  }
  filtered.splice(2, 0, portfolioRepo as any);

  return (
    <div className="flex flex-col items-center gap-12 w-full">

      {/* Grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.9,
            },
          },
        }}
        className="grid w-full gap-8 max-sm:!grid-cols-1 max-sm:!w-[92vw]"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          perspective: "1200px",
        }}
      >
        {filtered.slice(0, 8).map((repo, i) => (
          <ProjectCard key={repo.id} repo={repo} index={i} />
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2, 
          type: "spring", 
          stiffness: 100, 
          damping: 15 
        }}
        className="mt-10"
      >
        <motion.a
          whileHover={{ scale: 1.05, y: -5, boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -4px 10px rgba(0,0,0,1), 0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95, y: 2, boxShadow: "inset 0 4px 8px rgba(0,0,0,1), inset 0 1px 2px rgba(0,0,0,0.8)" }}
          href="https://github.com/nitinmohan18"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-5 px-10 py-5 rounded-[20px] font-bold text-[16px] text-white overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(145deg, #111111, #000000)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -4px 10px rgba(0,0,0,1), 0 10px 30px rgba(0,0,0,0.8), 0 0 30px rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Animated gradient fill that sweeps across (Permanently visible) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-100" />
          
          {/* Shine mask (Still animates on hover) */}
          <div className="absolute inset-[-100%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 group-hover:animate-bg-shine transition-opacity duration-300" />

          {/* Icon Box */}
          <div
            className="w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 border relative z-10 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, #1a1a1a, #050505)`,
              borderColor: `rgba(255, 255, 255, 0.15)`,
              boxShadow: `inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 5px 15px rgba(0,0,0,0.5)`
            }}
          >
            <Github size={22} className="text-white" style={{ filter: `drop-shadow(0 0 8px rgba(255,255,255,0.4))` }} />
          </div>

          <span className="relative z-10 tracking-[2.5px] uppercase font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 text-[14px]">
            Explore All Repositories
          </span>

          <GitBranch size={22} className="relative z-10 text-white opacity-100 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" style={{ filter: `drop-shadow(0 0 8px rgba(255,255,255,0.3))` }} />
        </motion.a>
      </motion.div>
    </div>
  );
}
