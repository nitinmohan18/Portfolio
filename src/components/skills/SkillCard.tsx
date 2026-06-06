"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/skill";

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
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, scale: 1.03 }}
      className="flex flex-col gap-3 p-4 glass-card group cursor-default"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-xs text-slate-500 font-mono">{skill.level}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.04 + 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );
}
