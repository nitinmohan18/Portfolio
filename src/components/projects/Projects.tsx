"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers3, Sparkles } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import GithubProjects from "./GithubProjects";

const showcaseSignals = [
  { label: "AI + web builds", icon: Cpu },
  { label: "Product-grade UX", icon: Sparkles },
  { label: "Source-first proof", icon: Layers3 },
];

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="!py-24 md:!py-32">
      <div className="relative flex flex-col gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/70" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.55)]">
              Project Lab
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/70" />
          </div>

          <h2 className="font-display text-[clamp(2.4rem,7vw,5.2rem)] font-extrabold leading-[0.98] tracking-tight text-white">
            Builds that feel like{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              products
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
            A curated GitHub-powered showcase of AI experiments, full-stack systems,
            and interface work presented with the same clarity expected from a
            serious engineering portfolio.
          </p>

          <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
            {showcaseSignals.map((signal, index) => {
              const Icon = signal.icon;

              return (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white/72 backdrop-blur-xl transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] hover:text-white"
                >
                  <Icon size={16} className="text-cyan-300 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>{signal.label}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.a
            href="https://github.com/nitinmohan18"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/70 transition duration-300 hover:border-cyan-300/35 hover:text-white"
          >
            Live GitHub feed
            <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

        <GithubProjects />
      </div>
    </SectionWrapper>
  );
}
