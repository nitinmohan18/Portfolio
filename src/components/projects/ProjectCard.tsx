"use client";

import type { CSSProperties, MouseEvent } from "react";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  GitFork,
  Layers3,
  Star,
} from "lucide-react";
import {
  motion,
  type Variants,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Github } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { GithubRepo } from "@/types/project";
import { getProjectPresentation } from "./projectPresentation";

interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
  featured?: boolean;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.68, ease: premiumEase },
  },
};

export default function ProjectCard({ repo, index, featured = false }: ProjectCardProps) {
  const project = getProjectPresentation(repo);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(${project.profile.accentRgb}, 0.18), transparent 48%)`;

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: featured ? 1.012 : 1.018,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        "--project-accent": project.profile.accent,
        "--project-accent-rgb": project.profile.accentRgb,
      } as CSSProperties}
      className={cn(
        "group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,10,20,0.72)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/18",
        featured
          ? "md:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-[540px] lg:p-7"
          : index === 1
            ? "lg:col-span-5"
            : "lg:col-span-4"
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.08),transparent_35%,rgba(var(--project-accent-rgb),0.08))] opacity-60" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--project-accent)] to-transparent opacity-45" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/10 bg-white/[0.025] blur-[1px] transition-transform duration-700 group-hover:scale-125" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Layers3 size={21} className="text-[var(--project-accent)]" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-[rgba(5,10,20,0.85)] bg-[var(--project-accent)] shadow-[0_0_16px_rgba(var(--project-accent-rgb),0.9)]" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/38">
                {project.profile.label}
              </p>
              <h3 className="mt-1 truncate font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                {project.title}
              </h3>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(var(--project-accent-rgb),0.26)] bg-[rgba(var(--project-accent-rgb),0.09)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/78">
            <Activity size={12} className="text-[var(--project-accent)]" />
            {project.status}
          </span>
        </div>

        <p className={cn("mt-6 text-sm leading-7 text-white/62", featured && "lg:max-w-xl lg:text-base lg:leading-8")}>
          {project.description}
        </p>

        <div className={cn("mt-6 grid gap-2", featured ? "sm:grid-cols-2" : "grid-cols-1")}>
          {project.achievements.map((achievement) => (
            <div
              key={achievement}
              className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-sm text-white/70"
            >
              <CheckCircle2 size={15} className="shrink-0 text-[var(--project-accent)]" />
              <span className="line-clamp-1">{achievement}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(project.stack.length ? project.stack : ["GitHub", "Source"]).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-white/64 transition duration-300 group-hover:border-[rgba(var(--project-accent-rgb),0.24)] group-hover:text-white/82"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-white/[0.07] bg-black/15 px-3 py-2">
              <div className="flex items-center gap-1.5 text-white/38">
                <Star size={13} />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em]">Stars</span>
              </div>
              <p className="mt-1 font-display text-lg font-bold text-white">{repo.stargazers_count}</p>
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-black/15 px-3 py-2">
              <div className="flex items-center gap-1.5 text-white/38">
                <GitFork size={13} />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em]">Forks</span>
              </div>
              <p className="mt-1 font-display text-lg font-bold text-white">{repo.forks_count}</p>
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-black/15 px-3 py-2">
              <div className="flex items-center gap-1.5 text-white/38">
                <CalendarDays size={13} />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em]">Updated</span>
              </div>
              <p className="mt-1 truncate font-display text-sm font-bold text-white">{project.updatedLabel}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-white/80 transition duration-300 hover:border-white/22 hover:bg-white/[0.085] hover:text-white"
            >
              <Github size={16} />
              Source code
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>

            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[rgba(var(--project-accent-rgb),0.35)] bg-[linear-gradient(135deg,rgba(var(--project-accent-rgb),0.24),rgba(167,139,250,0.18))] px-4 py-3 text-sm font-bold text-white shadow-[0_16px_40px_-24px_rgba(var(--project-accent-rgb),0.9)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--project-accent-rgb),0.55)]"
              >
                <ExternalLink size={16} />
                Live demo
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
