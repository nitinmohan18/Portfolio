"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, GraduationCap } from "lucide-react";
import type { EducationEntry } from "@/data/education";

interface TimelineProps {
  entries: EducationEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="flex flex-col">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          className="flex items-start gap-[20px] py-[20px] border-b border-[rgba(255,255,255,0.06)] last:border-0"
        >
          {/* Icon */}
          <div
            className={`w-[44px] h-[44px] rounded-full border-[2px] flex items-center justify-center shrink-0 ${
              entry.current
                ? "bg-[rgba(96,165,250,0.2)] border-[#60a5fa] text-white"
                : "bg-[rgba(96,165,250,0.1)] border-[rgba(96,165,250,0.3)] text-[#60a5fa]"
            }`}
          >
            <GraduationCap size={20} />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex flex-col">
              <h3 className="text-[16px] font-[700] text-white">
                {entry.degree}
              </h3>
              <p className="text-[14px] text-[rgba(255,255,255,0.65)] mt-[2px]">{entry.institution}</p>
              
              <p className="text-[13px] text-[rgba(255,255,255,0.4)] mt-[8px] leading-[1.5]">
                {entry.description}
              </p>

              {entry.highlights.length > 0 && (
                <ul className="flex flex-col gap-1.5 mt-3">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13px] text-[rgba(255,255,255,0.4)] leading-[1.5]">
                      <span className="w-1 h-1 rounded-full bg-[#60a5fa] mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
              <span className="flex items-center gap-1.5 text-[12px] text-[rgba(255,255,255,0.4)]">
                <Calendar size={12} />
                {entry.period}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-[rgba(255,255,255,0.35)]">
                <MapPin size={12} />
                {entry.location}
              </span>
              {entry.current && (
                <span className="bg-[rgba(40,202,65,0.15)] border border-[rgba(40,202,65,0.3)] text-[#28ca41] text-[10px] px-[10px] py-[3px] rounded-[20px] font-[600] mt-1">
                  CURRENT
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
