"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import type { GithubRepo } from "@/types/project";

export default function ProjectCard({ repo, index }: { repo: GithubRepo; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{ transition: "all var(--transition-normal)" }}
      className="glass-card flex flex-col h-full hover:-translate-y-1 hover:shadow-[var(--glow-blue)] group overflow-hidden"
    >
      {/* Top Bar Terminal Style */}
      <div className="bg-dark-900/50 border-b border-[var(--border-default)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
          ACTIVE
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-mono font-bold text-white group-hover:text-[var(--accent-blue)] transition-colors">
            <span className="text-[var(--accent-blue)]">~/</span>
            {repo.name}
          </h3>
          <span className="text-xs font-mono text-[var(--text-muted)] animate-pulse">
            Loading dependencies...
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
          {repo.description}
        </p>

        {/* Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border-default)]"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 mt-2 border-t border-[var(--border-default)]">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-white text-sm font-medium transition-colors border border-[var(--border-default)]"
            style={{ gridColumn: repo.homepage ? "1" : "1 / -1" }}
          >
            <Github size={16} />
            Git Repo
          </a>
          
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[var(--accent-blue)] hover:bg-sky-400 text-dark-950 text-sm font-bold transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
