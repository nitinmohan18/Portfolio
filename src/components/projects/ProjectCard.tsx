"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import type { GithubRepo } from "@/types/project";
import { detectLanguageColor } from "@/lib/github";
import GlowButton from "@/components/ui/GlowButton";

interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
}

export default function ProjectCard({ repo, index }: ProjectCardProps) {
  const langColor = detectLanguageColor(repo.language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="glass-card p-6 flex flex-col gap-4 group h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-white text-base group-hover:text-primary transition-colors leading-snug flex-1">
          {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {repo.html_url && (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-500 hover:text-white transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={15} />
            </a>
          )}
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-500 hover:text-white transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
        {repo.description ?? "No description provided."}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/80 font-mono"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: langColor }}
              />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star size={11} />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={11} />
              {repo.forks_count}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
