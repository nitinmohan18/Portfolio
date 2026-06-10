"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, GitFork, Loader2, Radio, Star } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { Github } from "@/components/ui/Icons";
import { useGithub } from "@/hooks/useGithub";
import ProjectCard from "./ProjectCard";

const premiumEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const metricVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: premiumEase },
  },
};

function ProjectSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl ${
            index === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
          }`}
        >
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.08] via-transparent to-cyan-300/[0.06]" />
          <div className="relative flex h-full flex-col gap-5">
            <div className="h-8 w-1/2 rounded-full bg-white/10" />
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="mt-auto grid grid-cols-3 gap-3">
              <div className="h-9 rounded-lg bg-white/10" />
              <div className="h-9 rounded-lg bg-white/10" />
              <div className="h-9 rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GithubProjects() {
  const { repos, loading, error } = useGithub();

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="mx-auto flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-sm font-semibold text-cyan-100">
          <Loader2 size={16} className="animate-spin text-cyan-300" />
          Loading live repositories
        </div>
        <ProjectSkeleton />
      </div>
    );
  }

  const filteredRepos = repos.filter(
    (repo) => repo.name.toLowerCase() !== "nitin-portfolio" && repo.description
  );

  if (error || filteredRepos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-2xl flex-col items-center self-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-8 py-14 text-center backdrop-blur-2xl"
      >
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
          <Github size={30} />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">
          GitHub showcase is temporarily unavailable
        </h3>
        <p className="mt-3 max-w-md text-sm leading-7 text-white/58">
          The project feed could not load in this session, but the public source
          profile is still available for review.
        </p>
        <GlowButton
          href="https://github.com/nitinmohan18"
          variant="outline"
          size="md"
          className="mt-7"
        >
          <Github size={16} />
          View GitHub Profile
        </GlowButton>
      </motion.div>
    );
  }

  const showcaseRepos = filteredRepos.slice(0, 7);
  const stats = [
    {
      label: "Showcase repos",
      value: `${showcaseRepos.length}`,
      icon: Radio,
    },
    {
      label: "GitHub stars",
      value: `${filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}`,
      icon: Star,
    },
    {
      label: "Public forks",
      value: `${filteredRepos.reduce((sum, repo) => sum + repo.forks_count, 0)}`,
      icon: GitFork,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="grid gap-3 sm:grid-cols-3"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              variants={metricVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.055]"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-3xl font-extrabold text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/18 bg-cyan-300/[0.07] text-cyan-300">
                  <Icon size={20} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-12"
      >
        {showcaseRepos.map((repo, index) => (
          <ProjectCard
            key={repo.id}
            repo={repo}
            index={index}
            featured={index === 0}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center pt-2"
      >
        <GlowButton
          href="https://github.com/nitinmohan18"
          variant="outline"
          size="lg"
          className="group rounded-full border-white/15 bg-white/[0.025] px-6"
        >
          <Github size={17} />
          Explore all repositories
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </GlowButton>
      </motion.div>
    </div>
  );
}
