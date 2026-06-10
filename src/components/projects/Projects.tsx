"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import GithubProjects from "./GithubProjects";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col items-center gap-16 w-full">

        {/* Heading — centered */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="h-px w-8 bg-[rgba(96,165,250,0.6)]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#60a5fa] font-mono">
              Engineering Portfolio
            </span>
            <span className="h-px w-8 bg-[rgba(96,165,250,0.6)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] leading-relaxed"
            style={{ color: "rgba(180,195,220,0.65)" }}
          >
            A curated selection of my best engineering work, focusing on AI-driven applications,
            full-stack systems, and polished digital experiences.
          </motion.p>
        </div>

        <GithubProjects />
      </div>
    </SectionWrapper>
  );
}
