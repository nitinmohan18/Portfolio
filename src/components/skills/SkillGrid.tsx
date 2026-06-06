"use client";

import { motion } from "framer-motion";
import type { SkillGroup } from "@/types/skill";
import SkillCard from "./SkillCard";
import {
  Code2,
  Server,
  Database,
  Brain,
  Wrench,
  FileCode2,
} from "lucide-react";

const categoryIconMap: Record<string, React.ReactNode> = {
  languages: <FileCode2 size={16} />,
  "ai-ml": <Brain size={16} />,
  frontend: <Code2 size={16} />,
  backend: <Server size={16} />,
  databases: <Database size={16} />,
  devtools: <Wrench size={16} />,
};

interface SkillGridProps {
  groups: SkillGroup[];
}

export default function SkillGrid({ groups }: SkillGridProps) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: gi * 0.08 }}
        >
          {/* Group header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              {categoryIconMap[group.category] ?? <Code2 size={16} />}
            </div>
            <h3 className="font-display font-semibold text-white text-base">{group.label}</h3>
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-slate-600 font-mono">{group.skills.length} skills</span>
          </div>

          {/* Skills row */}
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide w-full max-w-full">
            {group.skills.map((skill, si) => (
              <SkillCard key={skill.name} skill={skill} index={si} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
