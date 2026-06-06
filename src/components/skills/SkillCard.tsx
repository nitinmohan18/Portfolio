"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types/skill";
import Image from "next/image";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      style={{
        backgroundColor: skill.color,
        borderRadius: "var(--radius-xl)",
        borderColor: "var(--border-default)",
        transition: "var(--transition-fast)",
      }}
      className="flex items-center gap-2 px-4 py-2 border text-white shadow-sm hover:shadow-[var(--glow-sm)] cursor-default shrink-0"
    >
      <Image
        src={`https://cdn.simpleicons.org/${skill.icon}/white`}
        alt={skill.name}
        width={16}
        height={16}
        className="w-4 h-4 object-contain"
        unoptimized
      />
      <span className="text-xs font-bold uppercase tracking-wider">{skill.name}</span>
    </motion.div>
  );
}
