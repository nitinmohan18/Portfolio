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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ 
              borderColor: "rgba(96,165,250,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}
            className="flex flex-col h-full overflow-hidden group cursor-default"
            style={{
              background: "rgba(5, 10, 20, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              backdropFilter: "blur(16px)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            {/* Glassmorphism Header */}
            <div className="px-[20px] pt-[20px] pb-[16px] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#60a5fa] shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              <h3 className="text-[18px] font-[600] text-white tracking-wide">
                {group.label}
              </h3>
            </div>

            {/* Chips Container */}
            <div className="flex flex-col flex-1">

              {/* Chips */}
              <div className="flex flex-wrap gap-[8px] px-[20px] pb-[20px]">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      backgroundColor: skill.color,
                      borderColor: skill.color,
                    }}
                    className="flex items-center gap-[6px] px-[12px] py-[5px] rounded-[20px] shadow-sm cursor-default border"
                  >
                    <Image
                      src={`https://cdn.simpleicons.org/${skill.icon}/white`}
                      alt={skill.name}
                      width={14}
                      height={14}
                      className="w-3.5 h-3.5 object-contain"
                      unoptimized
                      loading="lazy"
                    />
                    <span className="text-[12px] font-[600] text-white">
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
