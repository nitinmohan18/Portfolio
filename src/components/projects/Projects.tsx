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
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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

          <h2
            className="font-display font-bold text-white leading-[0.8] tracking-tight flex items-center justify-center gap-x-3 gap-y-0 max-sm:-space-y-[10px] flex-wrap"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", perspective: "1000px" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: -60 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
              className="inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              Featured
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: -60 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.25 }}
              className="inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 15px rgba(167, 139, 250, 0.4))",
                  display: "inline-block"
                }}
              >
                Projects
              </span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
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
