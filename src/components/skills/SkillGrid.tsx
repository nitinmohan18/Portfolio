"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { skillGroups } from "@/data/skills";
import type { Skill } from "@/types/skill";
import Image from "next/image";

export default function SkillGrid() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-[1100px] perspective-1000">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.category} group={group} index={i} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const isSingle = group.skills.length === 1;

  // 3D Tilt Effect Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full rounded-[16px] bg-[#0e1320] border border-white/[0.12] hover:border-blue-500/40 transition-colors duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
    >
      {/* 3D Depth element - creates an inner glowing shadow */}
      <div 
        className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" 
        style={{ transform: "translateZ(1px)" }} 
      />
      
      {/* Sharp top edge highlight for premium feel */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />

      <div 
        className="p-5 md:p-6 flex flex-col h-full relative z-10 w-full"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6 w-full">
          {/* Sharp Glowing Category Indicator */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-[8px] bg-[#161d2d] border border-white/10 shadow-inner group-hover:border-blue-500/50 transition-colors duration-500">
            <div className="w-1.5 h-1.5 rounded-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] group-hover:scale-125 transition-transform duration-500" />
          </div>
          <h3 className="text-[17px] font-bold text-white tracking-wide">
            {group.label}
          </h3>
        </div>

        {/* Skills Grid */}
        <div className={`grid gap-3 w-full ${isSingle ? 'grid-cols-1' : 'grid-cols-2'} mt-auto`}>
          {group.skills.map((skill, j) => {
            // Check if it's the 5th (odd) item in a multi-skill card
            const isLastOdd = !isSingle && group.skills.length % 2 !== 0 && j === group.skills.length - 1;
            
            return (
              <SkillChip 
                key={skill.name} 
                skill={skill} 
                index={j} 
                isSingle={isSingle} 
                className={isLastOdd ? "col-span-2 place-self-center w-[calc(50%-6px)]" : "w-full"}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function SkillChip({ skill, index, isSingle, className = "" }: { skill: Skill; index: number; isSingle: boolean; className?: string }) {
  // Map pure black or very dark colors to white so the glowing animation is visible against dark backgrounds
  const isDark = ["#000000", "#181717"].includes(skill.color);
  const glowColor = isDark ? "#ffffff" : skill.color;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: index * 0.05 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`relative flex items-center gap-3 p-2.5 rounded-[10px] bg-[#161d2d] border border-white/[0.08] hover:bg-[#1c2538] hover:border-white/[0.2] transition-all duration-300 group/skill cursor-default shadow-sm hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)] ${isSingle ? 'py-5 justify-center' : ''} ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform, opacity, filter" }}
    >
      {/* Skill specific hover glow behind the chip */}
      <div 
        className="absolute inset-0 rounded-[10px] opacity-0 group-hover/skill:opacity-20 transition-opacity duration-500 pointer-events-none blur-md"
        style={{ backgroundColor: glowColor }}
      />

      {/* Sharp Logo Container with Orbiting Ring */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-[8px] overflow-hidden bg-[#0c101a]"
        style={{ width: isSingle ? 44 : 36, height: isSingle ? 44 : 36, transform: "translateZ(15px)" }}
      >
        {/* The spinning conic gradient border (Around Animation) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200%] h-[200%] opacity-80 group-hover/skill:opacity-100 transition-opacity duration-300"
          style={{
             background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, ${glowColor} 100%)`
          }}
        />
        
        {/* Inner dark rectangle to mask the center, leaving border */}
        <div className="absolute inset-[1.5px] rounded-[6.5px] bg-[#0c101a] z-0" />

        {/* Rotatable Skill Icon Container */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative z-10 flex items-center justify-center w-full h-full"
        >
          <Image
            src={`https://cdn.simpleicons.org/${skill.icon}/white`}
            alt={skill.name}
            width={isSingle ? 22 : 16}
            height={isSingle ? 22 : 16}
            className={`object-contain drop-shadow-sm`}
            unoptimized
          />
        </motion.div>
      </div>
      
      {!isSingle && (
        <span 
          className="text-[13px] font-semibold text-gray-300 group-hover/skill:text-white transition-colors truncate"
          style={{ transform: "translateZ(10px)" }}
        >
          {skill.name}
        </span>
      )}
      {isSingle && (
        <span 
          className="text-[15px] font-bold text-gray-200 group-hover/skill:text-white transition-colors truncate ml-2"
          style={{ transform: "translateZ(10px)" }}
        >
          {skill.name}
        </span>
      )}
    </motion.div>
  );
}
