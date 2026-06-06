"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import Image from "next/image";

export default function SkillGrid() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card flex flex-col h-full overflow-hidden border-[var(--border-default)] group"
          >
            {/* Terminal Header */}
            <div className="bg-dark-900/60 border-b border-[var(--border-default)] px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                POWERSHELL • \SKILLS\{group.category.toUpperCase()}
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 flex flex-col flex-1 gap-5">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-mono font-bold text-white group-hover:text-[var(--accent-purple)] transition-colors">
                  <span className="text-[var(--accent-purple)] mr-2">&gt;</span>
                  {group.label}
                </h3>
                <span className="text-xs font-mono italic text-[var(--text-muted)] animate-pulse pl-5">
                  Loading modules...
                </span>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      backgroundColor: skill.color,
                      borderRadius: "var(--radius-sm)",
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 shadow-sm cursor-default"
                  >
                    <Image
                      src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                      alt={skill.name}
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 object-contain"
                      unoptimized
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
