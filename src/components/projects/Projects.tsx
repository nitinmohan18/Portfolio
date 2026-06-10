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
            className="flex items-center gap-4 mb-2"
          >
            <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#60a5fa]" />
            <span 
              className="text-[16px] sm:text-[18px] font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] font-display"
              style={{ filter: "drop-shadow(0 0 10px rgba(96,165,250,0.6))" }}
            >
              My Builds
            </span>
            <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#60a5fa]" />
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
                filter: "drop-shadow(0 0 15px rgba(167, 139, 250, 0.4))",
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
