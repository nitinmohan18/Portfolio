"use client";

import type { CSSProperties, MouseEvent } from "react";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Certification } from "@/data/certifications";

interface CertificationCardProps {
  cert: Certification;
  index: number;
  featured?: boolean;
}

const categoryMeta: Record<Certification["category"], { label: string; accent: string; accentRgb: string }> = {
  "ai-ml": { label: "AI/ML", accent: "#60a5fa", accentRgb: "96, 165, 250" },
  cloud: { label: "Cloud", accent: "#38bdf8", accentRgb: "56, 189, 248" },
  web: { label: "Web", accent: "#a78bfa", accentRgb: "167, 139, 250" },
  data: { label: "Data", accent: "#f59e0b", accentRgb: "245, 158, 11" },
  other: { label: "Credential", accent: "#34d399", accentRgb: "52, 211, 153" },
};

function getIssuerMark(issuer: string) {
  return issuer
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function CertificationCard({ cert, index, featured = false }: CertificationCardProps) {
  const meta = categoryMeta[cert.category] ?? categoryMeta.other;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const springY = useSpring(tiltY, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${mouseX}px ${mouseY}px, rgba(${meta.accentRgb}, 0.18), transparent 52%)`;

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    mouseX.set(localX);
    mouseY.set(localY);
    tiltX.set((localX - rect.width / 2) / rect.width);
    tiltY.set((localY - rect.height / 2) / rect.height);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 42, scale: 0.95, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.68, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        "--cert-accent": meta.accent,
        "--cert-accent-rgb": meta.accentRgb,
        background: "linear-gradient(165deg, #131824 0%, #05070a 100%)",
        borderColor: `rgba(${meta.accentRgb}, 0.2)`,
        boxShadow: `inset 0 2px 2px rgba(255, 255, 255, 0.05), inset 0 -4px 12px rgba(0, 0, 0, 0.8), 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 40px rgba(${meta.accentRgb}, 0.08)`,
      } as CSSProperties}
      className={`group relative flex min-h-[390px] flex-col overflow-hidden rounded-[24px] border transition-all duration-500 hover:border-[rgba(var(--cert-accent-rgb),0.5)] p-6 ${
        featured ? "lg:col-span-2 lg:p-8" : ""
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{ background: spotlight }}
      />
      
      {/* 3D Depth element - creates an inner glowing shadow without covering inset */}
      <div 
        className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none z-0" 
        style={{ transform: "translateZ(1px)" }} 
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px] transition-opacity duration-300 opacity-60 group-hover:opacity-100 z-0"
        style={{ background: `linear-gradient(90deg, var(--cert-accent), transparent)` }}
      />

      {/* Corner glow */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background: "var(--cert-accent)", filter: "blur(60px)", opacity: 0.15 }}
      />

      <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(28px)" }}>
        <div 
          className="relative overflow-hidden rounded-[20px] border border-white/[0.08] p-6 transition-all duration-300"
          style={{ 
            background: "linear-gradient(145deg, rgba(16, 22, 38, 0.4), rgba(8, 10, 16, 0.8))", 
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.05), inset 0 -2px 6px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)" 
          }}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--cert-accent)] to-transparent opacity-50" />
          <div className="absolute -right-8 -top-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[var(--cert-accent)] opacity-40 shadow-[inset_0_0_20px_rgba(var(--cert-accent-rgb),0.1)]">
            <Award size={44} style={{ filter: "drop-shadow(0 0 10px rgba(var(--cert-accent-rgb), 0.35))" }} />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div 
              className="flex h-14 w-14 items-center justify-center rounded-[14px] border relative z-10 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `rgba(var(--cert-accent-rgb), 0.05)`,
                borderColor: `rgba(var(--cert-accent-rgb), 0.3)`,
                boxShadow: `inset 0 0 20px rgba(var(--cert-accent-rgb), 0.1), 0 0 15px rgba(var(--cert-accent-rgb), 0.1)`
              }}
            >
              {cert.issuerLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cert.issuerLogo} alt="" className="h-8 w-8 object-contain" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }} />
              ) : (
                <span className="font-display text-lg font-extrabold text-white" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}>
                  {getIssuerMark(cert.issuer)}
                </span>
              )}
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase relative z-10"
              style={{
                borderColor: `rgba(var(--cert-accent-rgb), 0.3)`,
                color: "var(--cert-accent)",
                background: `rgba(var(--cert-accent-rgb), 0.05)`,
                boxShadow: `0 0 10px rgba(var(--cert-accent-rgb), 0.1)`
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cert-accent)", boxShadow: "0 0 6px var(--cert-accent)" }} />
              {meta.label}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/36">
              Verified credential
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">
              {cert.title}
            </h3>
            <p className="mt-3 text-sm font-semibold text-white/58">{cert.issuer}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div 
            className="rounded-[16px] border border-white/[0.08] p-4 transition-all duration-300 hover:bg-white/[0.02]"
            style={{ background: "rgba(0,0,0,0.4)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 text-white/50">
              <CalendarDays size={16} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Issued</span>
            </div>
            <p className="mt-2 text-[15px] font-bold text-white">{cert.date}</p>
          </div>
          <div 
            className="rounded-[16px] border border-white/[0.08] p-4 transition-all duration-300 hover:bg-white/[0.02]"
            style={{ background: "rgba(0,0,0,0.4)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 text-white/50">
              <ShieldCheck size={16} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">Status</span>
            </div>
            <p className="mt-2 text-[15px] font-bold text-white">
              {cert.expiryDate ? `Valid until ${cert.expiryDate}` : "No expiry listed"}
            </p>
          </div>
        </div>

        {cert.skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12px] font-bold tracking-wide transition-colors duration-300 hover:text-white"
                style={{
                  background: "linear-gradient(145deg, rgba(16, 22, 38, 0.7), rgba(8, 10, 16, 0.95))",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(200, 215, 240, 0.8)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6)"
                }}
              >
                <Sparkles size={12} className="text-[var(--cert-accent)]" style={{ filter: "drop-shadow(0 0 4px rgba(var(--cert-accent-rgb), 0.5))" }} />
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-8">
          <div className="mb-5 flex items-center justify-center gap-2 rounded-[12px] border border-white/[0.05] bg-black/40 px-3 py-2.5 text-[13px] font-mono tracking-wide text-white/50">
            <BadgeCheck size={16} className="text-[var(--cert-accent)]" />
            <span>{cert.credentialId ? `Credential ID: ${cert.credentialId}` : "Issuer verification ready"}</span>
          </div>

          {cert.credentialUrl && (
            <motion.a
              whileHover={{ scale: 1.02, y: -3, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 6px rgba(0,0,0,0.8), 0 10px 20px -5px rgba(var(--cert-accent-rgb),0.4)" }}
              whileTap={{ scale: 0.98, y: 1, boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9), inset 0 1px 2px rgba(0,0,0,0.6)" }}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex w-full items-center justify-center gap-3 rounded-[16px] border px-4 py-4 text-[15px] font-bold text-white transition-colors duration-300"
              style={{
                background: "linear-gradient(145deg, #1e2433, #0a0d14)",
                borderColor: "rgba(var(--cert-accent-rgb),0.3)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -2px 4px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.3)"
              }}
            >
              Verify credential
              <ExternalLink size={18} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 text-[var(--cert-accent)]" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
