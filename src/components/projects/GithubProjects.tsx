"use client";

import { useGithub } from "@/hooks/useGithub";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import GlowButton from "@/components/ui/GlowButton";

export default function GithubProjects() {
  const { repos, loading, error } = useGithub();

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-slate-500">
        <Loader2 size={28} className="animate-spin text-primary" />
        <p className="text-sm">Fetching GitHub repositories…</p>
      </div>
    );
  }

  if (error || repos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-slate-500">
        <Github size={40} className="opacity-30" />
        <p className="text-sm">Could not load repositories at this time.</p>
        <GlowButton
          href="https://github.com/nitinmohan18"
          variant="outline"
          size="sm"
        >
          View GitHub Profile
        </GlowButton>
      </div>
    );
  }

  const filteredRepos = repos.filter(
    (repo) => repo.name.toLowerCase() !== "nitin-portfolio" && repo.description
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {filteredRepos.slice(0, 9).map((repo, i) => (
          <ProjectCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center pt-4"
      >
        <GlowButton
          href="https://github.com/nitinmohan18"
          variant="outline"
          size="md"
        >
          <Github size={16} />
          View All on GitHub
        </GlowButton>
      </motion.div>
    </div>
  );
}
