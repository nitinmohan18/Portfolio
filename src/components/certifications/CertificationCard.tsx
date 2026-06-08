"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Award, Calendar } from "lucide-react";
import type { Certification } from "@/data/certifications";
import MagneticButton from "@/components/ui/MagneticButton";

interface CertificationCardProps {
  cert: Certification;
  index: number;
}

const categoryColors: Record<string, string> = {
  "ai-ml": "text-[#60a5fa] border-[#60a5fa]/20 bg-[#60a5fa]/10",
  cloud: "text-sky-400 border-sky-500/20 bg-sky-500/10",
  web: "text-violet-400 border-violet-500/20 bg-violet-500/10",
  data: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  other: "text-slate-400 border-white/10 bg-white/5",
};

export default function CertificationCard({ cert, index }: CertificationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map to rotate limits (-10 to 10 deg)
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / rect.width);
    y.set((e.clientY - cy) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      className="group relative p-[24px] flex flex-col gap-4 bg-[rgba(5,10,20,0.75)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] rounded-[14px] cursor-pointer"
    >
      {/* 3D hover border glow */}
      <div className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[rgba(255,255,255,0.18)]" style={{ transform: "translateZ(1px)" }} />
      
      <div className="flex items-start justify-between gap-2" style={{ transform: "translateZ(20px)" }}>
        {/* Logo: grayscale to full color + brightness burst */}
        <div className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white filter grayscale group-hover:grayscale-0 group-hover:brightness-125 transition-all duration-500">
          <Award size={22} className="group-hover:text-[#60a5fa] transition-colors duration-500" />
        </div>
        <span className={`text-[10px] px-[8px] py-[3px] rounded-full border font-mono tracking-widest ${categoryColors[cert.category] || categoryColors.other}`}>
          {cert.category.toUpperCase()}
        </span>
      </div>

      <div style={{ transform: "translateZ(25px)" }} className="mt-2">
        <h3 className="font-display font-[700] text-[18px] text-white group-hover:text-[#60a5fa] transition-colors duration-300">
          {cert.title}
        </h3>
        <p className="text-[rgba(255,255,255,0.65)] text-[14px] mt-[4px]">{cert.issuer}</p>
      </div>

      {/* Date badge: magnetic pull on hover */}
      <div style={{ transform: "translateZ(30px)" }}>
        <MagneticButton strength={0.3}>
          <div className="flex items-center gap-2 text-[12px] text-[rgba(255,255,255,0.45)] font-mono w-max px-2 py-1.5 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
            <Calendar size={12} />
            {cert.date}
          </div>
        </MagneticButton>
      </div>

      {cert.skills.length > 0 && (
        <div className="flex flex-wrap gap-[6px] mt-2" style={{ transform: "translateZ(15px)" }}>
          {cert.skills.map((skill) => (
            <span key={skill} className="text-[10px] px-[10px] py-[4px] rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.65)] font-mono tracking-tight">
              {skill}
            </span>
          ))}
        </div>
      )}

      {cert.credentialUrl && (
        <div className="mt-auto pt-4" style={{ transform: "translateZ(30px)" }}>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#60a5fa] hover:text-white transition-colors font-[600] group/link"
          >
            <ExternalLink size={12} className="group-hover/link:translate-x-[1px] group-hover/link:-translate-y-[1px] transition-transform" />
            Verify Credential
          </a>
        </div>
      )}
    </motion.div>
  );
}
