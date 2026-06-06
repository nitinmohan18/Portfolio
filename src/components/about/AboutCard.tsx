"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  accent?: string;
}

export default function AboutCard({
  icon,
  title,
  description,
  delay = 0,
  accent = "primary",
}: AboutCardProps) {
  const accentMap: Record<string, string> = {
    primary: "text-primary bg-primary/10 border-primary/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    accent: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };
  const accentClass = accentMap[accent] ?? accentMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 flex flex-col gap-4 group cursor-default"
    >
      <div className={cn("w-11 h-11 rounded-xl border flex items-center justify-center", accentClass)}>
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold text-white mb-1.5">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
