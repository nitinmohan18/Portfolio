"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import SkillGrid from "./SkillGrid";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="w-full">
      <div className="flex flex-col gap-16 md:gap-20">
        
        {/* Custom Massive & Appealing Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{ willChange: "transform, opacity, filter" }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-blue-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
              Skills Architecture
            </span>
            <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-blue-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -15, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
            style={{ perspective: "1000px", willChange: "transform, opacity, filter" }}
            className="font-display text-3xl md:text-5xl lg:text-[4.5rem] font-extrabold leading-tight tracking-tight text-white mb-6 drop-shadow-md"
          >
            Technologies Powering My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            style={{ willChange: "transform, opacity, filter" }}
            className="text-gray-400 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed"
          >
            A versatile collection of technologies and tools I use to build scalable web applications and intelligent AI solutions.
          </motion.p>
        </div>

        <SkillGrid />
      </div>
    </SectionWrapper>
  );
}
