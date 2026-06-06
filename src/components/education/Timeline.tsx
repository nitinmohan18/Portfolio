"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, GraduationCap } from "lucide-react";
import type { EducationEntry } from "@/data/education";

interface TimelineProps {
  entries: EducationEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative flex flex-col gap-0">
      {/* Vertical line */}
      <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

      {entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className="relative flex gap-8 pb-12 last:pb-0"
        >
          {/* Dot */}
          <div className="relative z-10 shrink-0 mt-1">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, delay: i * 0.15 + 0.2 }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                entry.current
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-dark-700 border-white/20 text-slate-400"
              }`}
            >
              <GraduationCap size={16} />
            </motion.div>
            {entry.current && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse border-2 border-dark-900" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 glass-card p-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-white text-lg leading-snug">
                  {entry.degree}
                </h3>
                <p className="text-primary font-medium mt-1">{entry.institution}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Calendar size={12} />
                  {entry.period}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={12} />
                  {entry.location}
                </span>
                {entry.current && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium mt-1">
                    Current
                  </span>
                )}
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">{entry.description}</p>

            {entry.highlights.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {entry.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
