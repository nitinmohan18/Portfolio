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

  const filtered = repos.filter(
    (r) => r.name.toLowerCase() !== "nitin-portfolio" && r.description
  );

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
        className="grid w-full gap-8"
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.a
          whileHover={{ scale: 1.05, y: -3, boxShadow: "0 15px 40px -10px rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/nitinmohan18"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[15px] text-white overflow-hidden transition-shadow"
          style={{
            background: "linear-gradient(135deg, #111318 0%, #000000 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
          }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
          
          <Github size={20} className="relative z-10 transition-transform group-hover:rotate-12 duration-300" />
          <span className="relative z-10 tracking-wider">Explore All Repositories</span>
          <GitBranch size={16} className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </motion.div>
    </div>
  );
}
