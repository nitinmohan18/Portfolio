"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, GraduationCap } from "lucide-react";
import type { EducationEntry } from "@/data/education";

interface TimelineProps {
  entries: EducationEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative pl-[32px] md:pl-[48px] py-4">
      {/* Left vertical line: gradient blue→violet top to bottom */}
      <div className="absolute left-[15px] md:left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#60a5fa] via-[#a78bfa] to-transparent opacity-40" />

      <div className="flex flex-col gap-10">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform" }}
            className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-[24px] bg-[rgba(5,10,20,0.65)] backdrop-blur-[12px] rounded-[14px] border border-[rgba(255,255,255,0.06)] group hover:border-[rgba(255,255,255,0.15)] transition-colors duration-300"
          >
            {/* Connector dot: scale pulse ring on viewport enter */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.2, type: "spring" }}
              className="absolute left-[-32px] md:left-[-48px] top-[32px] w-[32px] h-[32px] md:w-[48px] flex items-center justify-center z-10"
            >
               <div className="relative flex items-center justify-center">
                 <motion.div 
                   animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className={`absolute w-6 h-6 rounded-full ${entry.current ? "bg-[#60a5fa]" : "bg-[#a78bfa]"}`}
                 />
                 <div className={`w-3 h-3 rounded-full border-[2px] border-[#090A0F] relative z-10 ${entry.current ? "bg-[#60a5fa]" : "bg-[#a78bfa]"}`} />
               </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                <div
                  className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 ${
                    entry.current
                      ? "bg-[rgba(96,165,250,0.15)] text-[#60a5fa]"
                      : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.65)]"
                  }`}
                >
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="text-[18px] font-[700] text-white font-display tracking-tight">
                    {entry.degree}
                  </h3>
                  <p className="text-[14px] text-[rgba(255,255,255,0.65)] mt-[2px]">{entry.institution}</p>
                </div>
              </div>
              
              <p className="text-[14px] text-[rgba(255,255,255,0.55)] mt-[12px] leading-[1.6]">
                {entry.description}
              </p>

              {entry.highlights.length > 0 && (
                <ul className="flex flex-col gap-2 mt-4">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[13px] text-[rgba(255,255,255,0.55)] leading-[1.6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.15)] mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0 sm:min-w-[140px] pt-1">
              {entry.current && (
                <motion.span 
                  animate={{ boxShadow: ["0 0 0px rgba(40,202,65,0)", "0 0 12px rgba(40,202,65,0.5)", "0 0 0px rgba(40,202,65,0)"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-[rgba(40,202,65,0.1)] border border-[rgba(40,202,65,0.25)] text-[#28ca41] text-[10px] px-[10px] py-[3px] rounded-[20px] font-mono tracking-widest mb-2"
                >
                  CURRENT
                </motion.span>
              )}
              <span className="flex items-center gap-1.5 text-[12px] text-[rgba(255,255,255,0.45)] font-mono">
                <Calendar size={12} />
                {entry.period}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-[rgba(255,255,255,0.45)] font-mono">
                <MapPin size={12} />
                {entry.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
