"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { skillGroups } from "@/data/skills";
import type { Skill } from "@/data/skills";

export default function SkillGrid() {
  return (
    <div className="w-full flex justify-center items-center max-sm:block">
      <div className="grid grid-cols-2 lg:grid-cols-3 sm:auto-rows-fr gap-x-2.5 gap-y-5 sm:gap-8 lg:gap-12 w-full max-sm:w-[92vw] max-sm:relative max-sm:left-1/2 max-sm:-translate-x-1/2 max-w-[1100px] perspective-1000 px-0 sm:px-0">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.category} group={group} index={i} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const isSingle = group.skills.length === 1;

  // Reduced 3D Tilt Effect Setup (Premium Subtle 3D)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleTouchMove = React.useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const touchX = Math.max(0, Math.min(e.touches[0].clientX - rect.left, width));
    const touchY = Math.max(0, Math.min(e.touches[0].clientY - rect.top, height));
    const xPct = touchX / width - 0.5;
    const yPct = touchY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98, y: 0 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity", // Forces dedicated GPU layer to prevent rendering lag
        background: "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.08) 0%, rgba(10, 15, 28, 0.9) 60%, rgba(5, 8, 15, 1) 100%)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -4px 8px rgba(0,0,0,0.8)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className="group relative flex flex-col h-full rounded-[16px] border border-white/[0.05] overflow-hidden transition-all duration-500 cursor-pointer hover:border-[#22d3ee]/40 hover:shadow-[0_15px_35px_rgba(34,211,238,0.15)]"
    >
      {/* Internal sharp glowing border */}
      <div className="absolute inset-[1px] rounded-[15px] border border-white/[0.03] pointer-events-none" style={{ transform: "translateZ(1px)" }} />

      {/* Realistic Curved Top Glass Reflection */}
      <div className="absolute inset-x-2 top-1 h-[30%] bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-[14px] opacity-80 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />

      <div className="p-2 sm:p-6 md:p-7 flex flex-col h-full relative z-10 w-full" style={{ transform: "translateZ(15px)" }}>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center max-sm:gap-0 sm:gap-3 mb-4 sm:mb-5 w-full">
          {/* Sharp Glowing Category Indicator */}
          <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-[8px] bg-[#0d101c] border border-[#22d3ee]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-[#22d3ee]/70 transition-colors duration-500 shrink-0">
            <div className="w-1.5 h-1.5 rounded-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(34,211,238,1)] transition-all duration-500" />
          </div>
          <h3 className="text-[17px] sm:text-[19px] md:text-[21px] font-bold text-white tracking-wide relative z-10 text-center max-sm:-mt-2" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            {group.label}
          </h3>
        </div>

        {/* Skills Grid */}
        <div className={`
          grid grid-cols-2 gap-1.5 sm:gap-3 w-full mt-auto
          sm:w-[92%] sm:mx-auto sm:relative sm:left-2 md:left-3 
          ${isSingle ? 'grid-cols-1 sm:grid-cols-1' : ''}
        `}>
          {group.skills.map((skill, j) => {
            // Restore desktop specific logic for odd final items
            const isLastOdd = !isSingle && group.skills.length % 2 !== 0 && j === group.skills.length - 1;
            
            return (
              <SkillChip 
                key={skill.name} 
                skill={skill} 
                index={j} 
                isSingle={isSingle} 
                className={`w-full max-sm:w-[calc(100%-8px)] max-sm:mx-auto ${j % 2 === 0 ? 'max-sm:translate-x-[5px]' : ''} ${isLastOdd ? 'col-span-2 sm:col-span-2 place-self-center w-[calc(50%-3px)] sm:w-[calc(50%-6px)]' : ''} ${isSingle ? 'w-full' : ''}`}
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
      initial={{ y: baseY }}
      whileHover={{ y: baseY - 2, scale: 1.05, boxShadow: `inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.8), 0 8px 20px -4px ${glowColor}40` }}
      whileTap={{ y: baseY + 2, scale: 0.94, boxShadow: `inset 0 2px 4px rgba(0,0,0,0.8), 0 4px 15px ${glowColor}60` }}
      className={`relative flex max-sm:flex-col max-sm:justify-center items-center gap-2 sm:gap-2.5 p-2.5 py-3 sm:p-[9px] rounded-[10px] sm:rounded-[12px] border transition-all duration-300 group/skill hover:border-[${glowColor}]/50 active:border-[${glowColor}]/70 ${isSingle ? 'py-4 justify-center' : ''} ${className}`}
      style={{ 
        transformStyle: "preserve-3d", 
        background: "linear-gradient(145deg, rgba(16, 22, 38, 0.7), rgba(8, 10, 16, 0.95))",
        borderColor: "rgba(255,255,255,0.1)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.3)"
      }}
    >
      {/* Skill specific hover glow behind the chip */}
      <div 
        className="absolute inset-0 rounded-[10px] opacity-0 group-hover/skill:opacity-20 group-active/skill:opacity-30 transition-opacity duration-300 pointer-events-none blur-md"
        style={{ backgroundColor: glowColor }}
      />

      {/* Sharp Logo Container with Orbiting Ring */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-[8px] overflow-hidden bg-[#0c101a] w-[28px] h-[28px] sm:w-[34px] sm:h-[34px]"
        style={{ transform: "translateZ(15px)" }}
      >
        {/* The spinning conic gradient border (Around Animation) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200%] h-[200%] opacity-80 group-hover/skill:opacity-100 group-active/skill:opacity-100 transition-opacity duration-300"
          style={{
             background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, ${glowColor} 100%)`
          }}
        />
        
        {/* Inner dark rectangle to mask the center, leaving border */}
        <div className="absolute inset-[1.5px] rounded-[6.5px] bg-[#0c101a] z-0" />

        <motion.div
          whileHover={{ rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative z-10 flex items-center justify-center w-full h-full"
        >
          <skill.icon 
            size={isSingle ? 20 : 16} 
            color="white" 
            className="drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] scale-75 sm:scale-100" 
          />
        </motion.div>
      </div>
      
      {!isSingle && (
        <span 
          className="text-[10px] sm:text-[12px] md:text-[12.5px] font-semibold text-gray-300 group-hover/skill:text-white group-active/skill:text-white transition-colors max-sm:tracking-tight max-sm:text-center max-sm:-mx-1 max-sm:truncate sm:truncate"
          style={{ transform: "translateZ(10px)", maxWidth: "100%" }}
        >
          {skill.name}
        </span>
      )}
      {isSingle && (
        <span 
          className="text-[11px] sm:text-[14px] font-bold text-gray-200 group-hover/skill:text-white group-active/skill:text-white transition-colors max-sm:tracking-tight max-sm:text-center max-sm:-mx-1 max-sm:truncate sm:truncate ml-0 mt-1 sm:ml-2 sm:mt-0"
          style={{ transform: "translateZ(10px)", maxWidth: "100%" }}
        >
          {skill.name}
        </span>
      )}
    </motion.div>
  );
}
