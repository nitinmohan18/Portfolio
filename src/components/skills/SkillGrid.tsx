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

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Bound the touch coordinates within the element
    const touchX = Math.max(0, Math.min(e.touches[0].clientX - rect.left, width));
    const touchY = Math.max(0, Math.min(e.touches[0].clientY - rect.top, height));
    const xPct = touchX / width - 0.5;
    const yPct = touchY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.96, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
        background: "linear-gradient(180deg, #1e2536 0%, #070a12 100%)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6), inset 0 2px 2px rgba(255,255,255,0.15), inset 0 -4px 8px rgba(0,0,0,0.9)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className="group relative flex flex-col h-full rounded-[16px] border border-black/80 transition-colors duration-500 cursor-pointer hover:border-[#22d3ee]/50 hover:shadow-[0_15px_30px_rgba(34,211,238,0.2),inset_0_2px_2px_rgba(255,255,255,0.25),inset_0_-4px_8px_rgba(0,0,0,0.9)]"
    >
      {/* 3D Inner Casing/Bevel */}
      <div className="absolute inset-[1px] rounded-[15px] border border-white/[0.04] pointer-events-none" style={{ transform: "translateZ(1px)" }} />
      <div className="absolute inset-[2px] rounded-[14px] border border-black/40 pointer-events-none" style={{ transform: "translateZ(1px)" }} />

      {/* Realistic Curved Top Glass Reflection */}
      <div className="absolute inset-x-2 top-1 h-[35%] bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-[14px] opacity-90 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div 
        className="p-5 md:p-6 flex flex-col h-full relative z-10 w-full"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6 w-full">
          {/* Sharp Glowing Category Indicator */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-[8px] bg-[#0d101c] border border-[#22d3ee]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-[#22d3ee]/70 transition-colors duration-500">
            <div className="w-1.5 h-1.5 rounded-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(34,211,238,1)] transition-all duration-500" />
          </div>
          <h3 className="text-[17px] font-bold text-white tracking-wide drop-shadow-md">
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
  
  const isPandasOrDjango = skill.name.toLowerCase() === "pandas" || skill.name.toLowerCase() === "django";
  const baseY = isPandasOrDjango ? -4 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: baseY + 20, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, scale: 1, y: baseY, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: index * 0.05 }}
      whileHover={{ y: baseY - 2, scale: 1.05, boxShadow: `inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 20px -4px ${glowColor}40` }}
      whileTap={{ y: baseY + 2, scale: 0.94, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.3)" }}
      className={`relative flex items-center gap-3 p-2.5 rounded-[12px] border transition-all duration-300 group/skill cursor-pointer hover:border-[${glowColor}]/50 ${isSingle ? 'py-5 justify-center' : ''} ${className}`}
      style={{ 
        transformStyle: "preserve-3d", 
        willChange: "transform, opacity, filter",
        background: "linear-gradient(145deg, rgba(16, 22, 38, 0.7), rgba(8, 10, 16, 0.95))",
        borderColor: "rgba(255,255,255,0.1)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.3)"
      }}
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
            priority
            loading="eager"
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
