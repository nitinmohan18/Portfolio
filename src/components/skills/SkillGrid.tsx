"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import Image from "next/image";

export default function SkillGrid() {
  const headerVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const chipsContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 }
    }
  };

  const chipVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {skillGroups.map((group, i) => (
        <motion.div
          key={group.category}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
             hidden: { opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 },
             visible: { 
               opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
               transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }
             }
          }}
          whileHover="hover"
          style={{ willChange: "transform" }}
          className="relative flex flex-col h-full overflow-hidden group cursor-default rounded-[14px] bg-[rgba(5,10,20,0.75)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-2"
        >
          {/* Card hover: shimmer gradient sweep across background */}
          <motion.div 
            variants={{
              hover: { x: ["-100%", "200%"], opacity: [0, 1, 0] }
            }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.2 }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent skew-x-12 pointer-events-none"
            style={{ x: "-100%", opacity: 0 }}
          />

          {/* Header */}
          <motion.div variants={headerVariant as any} className="px-[20px] pt-[20px] pb-[16px] flex items-center gap-3 relative z-10">
            {/* Category dot: continuous pulse */}
            <motion.div 
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] shadow-[0_0_12px_rgba(96,165,250,0.8)]" 
            />
            <h3 className="text-[16px] font-[700] text-white tracking-wide font-display">
              {group.label}
            </h3>
          </motion.div>

          {/* Chips */}
          <motion.div variants={chipsContainerVariant as any} className="flex flex-wrap gap-[8px] px-[20px] pb-[20px] relative z-10">
            {group.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={chipVariant as any}
              >
                <motion.div
                  whileHover="hover"
                  variants={{ hover: { scale: 1.08 } }}
                  style={{
                    backgroundColor: `rgba(255,255,255,0.03)`,
                    borderColor: skill.color ? `${skill.color}40` : "rgba(255,255,255,0.1)",
                  }}
                  className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[12px] border cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                >
                  <motion.div
                    variants={{
                      hover: { rotate: 360, transition: { duration: 0.4, ease: "easeInOut" } }
                    }}
                    className="flex items-center justify-center"
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
                  </motion.div>
                  <span className="text-[12px] font-[500] text-[#ffffff] font-mono tracking-tight">
                    {skill.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
