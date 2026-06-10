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
      } as CSSProperties}
      className={`group relative flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,10,20,0.74)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl ${
        featured ? "lg:col-span-2 lg:p-7" : ""
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),transparent_38%,rgba(var(--cert-accent-rgb),0.08))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--cert-accent)] to-transparent opacity-55" />

      <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(28px)" }}>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--cert-accent)] to-transparent opacity-70" />
          <div className="absolute -right-8 -top-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-[var(--cert-accent)] opacity-60">
            <Award size={44} />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(var(--cert-accent-rgb),0.24)] bg-[rgba(var(--cert-accent-rgb),0.1)] font-display text-lg font-extrabold text-white">
              {cert.issuerLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cert.issuerLogo} alt="" className="h-8 w-8 object-contain" />
              ) : (
                getIssuerMark(cert.issuer)
              )}
            </div>
            <span className="rounded-full border border-[rgba(var(--cert-accent-rgb),0.25)] bg-[rgba(var(--cert-accent-rgb),0.09)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
              {meta.label}
            </span>
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
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3">
            <div className="flex items-center gap-2 text-white/38">
              <CalendarDays size={14} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Issued</span>
            </div>
            <p className="mt-1 text-sm font-bold text-white">{cert.date}</p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3">
            <div className="flex items-center gap-2 text-white/38">
              <ShieldCheck size={14} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Status</span>
            </div>
            <p className="mt-1 text-sm font-bold text-white">
              {cert.expiryDate ? `Valid until ${cert.expiryDate}` : "No expiry listed"}
            </p>
          </div>
        </div>

        {cert.skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/65"
              >
                <Sparkles size={12} className="text-[var(--cert-accent)]" />
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/15 px-3 py-2 text-sm text-white/58">
            <BadgeCheck size={16} className="text-[var(--cert-accent)]" />
            <span>{cert.credentialId ? `Credential ID ${cert.credentialId}` : "Issuer verification ready"}</span>
          </div>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(var(--cert-accent-rgb),0.32)] bg-[rgba(var(--cert-accent-rgb),0.12)] px-4 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--cert-accent-rgb),0.5)] hover:bg-[rgba(var(--cert-accent-rgb),0.18)]"
            >
              Verify credential
              <ExternalLink size={16} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
