"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, Calendar } from "lucide-react";
import type { Certification } from "@/data/certifications";

interface CertificationCardProps {
  cert: Certification;
  index: number;
}

const categoryColors: Record<string, string> = {
  "ai-ml": "text-primary border-primary/20 bg-primary/10",
  cloud: "text-sky-400 border-sky-500/20 bg-sky-500/10",
  web: "text-violet-400 border-violet-500/20 bg-violet-500/10",
  data: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  other: "text-slate-400 border-white/10 bg-white/5",
};

export default function CertificationCard({ cert, index }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 flex flex-col gap-4 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Award size={18} />
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${categoryColors[cert.category]}`}>
          {cert.category.toUpperCase()}
        </span>
      </div>

      <div>
        <h3 className="font-display font-semibold text-white group-hover:text-primary transition-colors">
          {cert.title}
        </h3>
        <p className="text-slate-400 text-sm mt-1">{cert.issuer}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Calendar size={11} />
        {cert.date}
      </div>

      {cert.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {cert.skills.map((skill) => (
            <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
              {skill}
            </span>
          ))}
        </div>
      )}

      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mt-auto"
        >
          <ExternalLink size={11} /> Verify Credential
        </a>
      )}
    </motion.div>
  );
}
