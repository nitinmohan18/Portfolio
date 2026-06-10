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
      <div
        className="grid w-full gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          perspective: "1200px",
        }}
      >
        {filtered.slice(0, 8).map((repo, i) => (
          <ProjectCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href="https://github.com/nitinmohan18"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-8 py-4 rounded-2xl border font-semibold text-[15px] text-white transition-all duration-300 hover:border-[rgba(96,165,250,0.4)] hover:bg-[rgba(96,165,250,0.05)] hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]"
          style={{
            background: "rgba(8,12,24,0.7)",
            borderColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Github size={18} />
          Explore All Repositories
          <GitBranch size={15} className="opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>
      </motion.div>
    </div>
  );
}
