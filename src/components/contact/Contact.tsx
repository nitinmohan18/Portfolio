"use client";


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, FileText, Check } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   Custom Keyframes (contact-scoped)
   ═══════════════════════════════════════════════ */
const contactKeyframes = `
  @keyframes contact-nucleus {
    0%, 100% {
      transform: scale(1) translateZ(0);
    }
    50% {
      transform: scale(1.25) translateZ(0);
    }
  }
  @keyframes contact-ring-pulse {
    0%, 100% { opacity: 0.65; transform: translateZ(0); }
    50% { opacity: 1; transform: translateZ(0); }
  }
  @keyframes contact-line-flow {
    0% { transform: translateY(-100px) translateZ(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(1000px) translateZ(0); opacity: 0; }
  }
`;

/* ═══════════════════════════════════════════════
   Contact Info Data
   ═══════════════════════════════════════════════ */
const contactInfo: Array<{
  icon: any;
  label: string;
  value: string;
  href?: string;
  iconColorClass: string;
  subText?: string;
}> = [
  {
    icon: FileText,
    label: "RESUME",
    value: "Professional Highlights",
    href: profile.resumeUrl || "/resume.pdf",
    iconColorClass: "text-purple-500 group-hover:text-purple-400",
  },
  {
    icon: Mail,
    label: "EMAIL",
    value: "mohannitin494@gmail.com",
    href: `mailto:mohannitin494@gmail.com`,
    iconColorClass: "text-cyan-400 group-hover:text-cyan-300",
  },
  {
    icon: MapPin,
    label: "LOCATION",
    value: "Bhopal, Madhya Pradesh, India",
    iconColorClass: "text-cyan-400 group-hover:text-cyan-300",
  },
];

/* ═══════════════════════════════════════════════
   Framer Motion Variants
   ═══════════════════════════════════════════════ */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════
   Orbital Element
   ═══════════════════════════════════════════════ */
function OrbitalElement() {
  return (
    <div
      className="relative h-[110px] w-[110px] shrink-0"
      aria-hidden="true"
    >
      {/* Ambient glow behind the element */}
      <div className="absolute inset-[-40%] rounded-full bg-cyan-400/[0.08] blur-[32px]" />

      {/* Ring 1 — outermost, slowest */}
      <div
        className="absolute inset-0 rounded-full border border-blue-400/[0.15] animate-spin"
        style={{
          animationDuration: "35s",
          animationTimingFunction: "linear",
          willChange: "transform",
        }}
      >
        {/* Orbiting particle */}
        <div className="absolute -top-[1.5px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.8)]" />
      </div>

      {/* Ring 2 */}
      <div
        className="absolute inset-[15%] rounded-full border border-cyan-400/[0.2] animate-spin"
        style={{
          animationDuration: "25s",
          animationDirection: "reverse",
          animationTimingFunction: "linear",
          willChange: "transform",
        }}
      >
        {/* Orbiting particle */}
        <div className="absolute -right-[2px] top-1/2 h-[4px] w-[4px] -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
      </div>

      {/* Ring 3 */}
      <div
        className="absolute inset-[30%] rounded-full border border-cyan-300/[0.25] animate-spin"
        style={{
          animationDuration: "15s",
          animationTimingFunction: "linear",
          willChange: "transform",
          animation: "spin 15s linear infinite, contact-ring-pulse 4s ease-in-out infinite",
        }}
      >
        {/* Orbiting particle */}
        <div className="absolute -bottom-[1.5px] left-[30%] h-[3px] w-[3px] rounded-full bg-teal-200 shadow-[0_0_10px_rgba(153,246,228,0.9)]" />
      </div>

      {/* Ring 4 — innermost, fastest */}
      <div
        className="absolute inset-[45%] rounded-full border border-white/[0.3] animate-spin"
        style={{
          animationDuration: "10s",
          animationDirection: "reverse",
          animationTimingFunction: "linear",
          willChange: "transform",
        }}
      >
        {/* Orbiting particle */}
        <div className="absolute -top-[1px] right-[18%] h-[2.5px] w-[2.5px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Center nucleus — glowing core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-[8px] w-[8px] rounded-full bg-cyan-300"
          style={{
            boxShadow: "0 0 6px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4), 0 0 40px rgba(34,211,238,0.12)",
            animation: "contact-nucleus 3s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        {/* Inner halo rings */}
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30" />
        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />
      </div>

      {/* Energy trails — subtle gradient arcs */}
      <div
        className="absolute inset-[5%] rounded-full animate-spin"
        style={{
          animationDuration: "20s",
          animationTimingFunction: "linear",
          willChange: "transform",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(34,211,238,0.08) 15%, transparent 30%, transparent 50%, rgba(96,165,250,0.06) 65%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Info Card Sub-Component
   ═══════════════════════════════════════════════ */
interface InfoCardProps {
  icon: typeof Mail;
  label: string;
  value: string;
  subText?: string;
  href?: string;
  iconColorClass?: string;
  index: number;
}

function InfoCard({ icon: Icon, label, value, subText, href, iconColorClass = "text-cyan-400 group-hover:text-cyan-300", index }: InfoCardProps) {
  const [copied, setCopied] = useState(false);
  const isPurple = iconColorClass.includes("purple");
  const borderColor = isPurple ? "border-purple-500/60 group-hover:border-purple-500/90" : "border-cyan-400/60 group-hover:border-cyan-400/90";
  const bgColor = isPurple ? "bg-purple-500/10 group-hover:bg-purple-500/20" : "bg-cyan-400/10 group-hover:bg-cyan-400/20";
  
  // Subtle inline glow
  const glowColor = isPurple ? "rgba(168,85,247,0.25)" : "rgba(34,211,238,0.25)";

  const handleCopy = (e: React.MouseEvent) => {
    if (label === "EMAIL") {
      e.preventDefault();
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const inner = (
    <div className="relative group/card flex items-center gap-5 w-full">
      {/* Futuristic Icon Container (The Node) */}
      <div 
        className={cn(
          "relative flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 z-10",
          "bg-gradient-to-br from-[#1A2238] via-[#0A0F1C] to-[#04060A] border-white/[0.18]",
          "shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(255,255,255,0.05)]",
          isPurple ? "group-hover/card:border-purple-400/60 group-hover/card:shadow-[0_0_25px_rgba(168,85,247,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)]" : "group-hover/card:border-cyan-300/60 group-hover/card:shadow-[0_0_25px_rgba(34,211,238,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)]",
          iconColorClass.replace("group-hover:", "group-hover/card:")
        )} 
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-emerald-400"
            >
              <Check size={28} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Icon size={28} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium 3D Metallic Text Panel */}
      <div className={cn(
        "flex-1 relative overflow-hidden rounded-2xl border min-h-[64px] py-3 pr-4 sm:pr-5 pl-5 sm:pl-6 transition-all duration-500 flex flex-col justify-center",
        "bg-gradient-to-br from-[#0C1222] to-[#03050A] border-white/[0.1]",
        "shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(255,255,255,0.02)]",
        isPurple 
          ? "group-hover/card:border-purple-400/30 group-hover/card:shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(168,85,247,0.1)]" 
          : "group-hover/card:border-cyan-400/30 group-hover/card:shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(34,211,238,0.1)]"
      )}>
        {/* Top Edge Neon Highlight (Matching Main Card) */}
        <div className={cn(
          "absolute inset-x-0 top-0 h-[2px] transition-opacity duration-500 opacity-40 group-hover/card:opacity-100",
          isPurple ? "bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_1px_8px_1px_rgba(168,85,247,0.5)]" : "bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_1px_8px_1px_rgba(34,211,238,0.5)]"
        )} />

        {/* Ambient Gradient Glow */}
        <div 
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover/card:opacity-100",
            isPurple ? "opacity-15 bg-[radial-gradient(250px_circle_at_0%_0%,rgba(168,85,247,0.4),transparent_70%)] group-hover/card:opacity-30" : "opacity-15 bg-[radial-gradient(250px_circle_at_0%_0%,rgba(34,211,238,0.4),transparent_70%)] group-hover/card:opacity-30"
          )} 
        />

        {/* Text Stack */}
        <div className="relative z-10 w-full pr-8" style={{ paddingLeft: "16px" }}>
          <div className="flex items-center gap-3">
            <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover/card:text-white/80 uppercase">
              {label}
            </p>
            {copied && (
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]">Copied!</span>
            )}
          </div>
          <p className="mt-1 text-[15px] sm:text-[16px] font-semibold text-white/90 transition-colors duration-300 group-hover/card:text-white">
            {value}
          </p>
          {subText && (
            <p className="mt-1 text-[12px] text-white/50 transition-colors duration-300 group-hover/card:text-white/70 leading-relaxed">
              {subText}
            </p>
          )}
        </div>
        
        {/* Decorative trailing arrow on hover */}
        <div className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2 opacity-0 translate-x-4 transition-all duration-500 group-hover/card:opacity-100 group-hover/card:translate-x-0 hidden sm:block",
          isPurple ? "text-purple-400/50" : "text-cyan-400/50"
        )}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );

  const sharedClasses =
    "block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-2xl cursor-pointer";

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotateY: 90, filter: "blur(10px)" }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        rotateY: 0,
        filter: "blur(0px)",
        boxShadow: [
          "0 0 0px rgba(0,0,0,0)", 
          isPurple ? "0 0 40px rgba(168,85,247,0.5)" : "0 0 40px rgba(34,211,238,0.5)", 
          "0 0 0px rgba(0,0,0,0)"
        ]
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        opacity: { delay: 0.4 + index * 0.15, duration: 0.6 },
        x: { delay: 0.4 + index * 0.15, duration: 0.8, type: "spring", bounce: 0.4 },
        rotateY: { delay: 0.4 + index * 0.15, duration: 0.8, type: "spring", bounce: 0.4 },
        filter: { delay: 0.4 + index * 0.15, duration: 0.6 },
        boxShadow: { delay: 0.4 + index * 0.15 + 0.4, duration: 1.2, ease: "easeOut" }
      }}
      style={{ transformPerspective: 1000 }}
      className="rounded-2xl"
    >
      {href ? (
        <a 
          href={href} 
          onClick={handleCopy}
          className={sharedClasses}
          {...(!href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      ) : (
        <div className={sharedClasses}>{inner}</div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Main Contact Section
   ═══════════════════════════════════════════════ */
export default function Contact() {
  return (
    <>
      {/* Inject contact-scoped keyframes */}
      <style>{contactKeyframes}</style>

      <SectionWrapper id="contact" className="!py-20 md:!py-28 lg:!py-32">
        {/* ── Background Layer ── */}


        {/* ── Two-Column Layout ── */}
        <div className="relative z-10 grid gap-12 lg:grid-cols-[45fr_55fr] lg:gap-20 xl:gap-28">
          {/* ═══ Left Column ═══ */}
          <div className="flex flex-col justify-center">
            {/* Section Label */}
            <div style={{ transform: "translate(-60px, -100px)", perspective: 800 }}>
              <motion.div 
                initial={{ opacity: 0, z: -100, rotateX: 45, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, z: 0, rotateX: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: 0.1, type: "spring", bounce: 0.5 }}
                className="relative mb-3 flex items-center gap-4 origin-bottom"
              >
                {/* Left Line & Dot */}
                <div className="flex items-center gap-2 shrink-0">
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.6 }}
                    className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/80 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] origin-right" 
                  />
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
                  </span>
                </div>
                
                {/* Text */}
                <span className="shrink-0 font-mono text-[15px] font-bold uppercase tracking-[0.25em] text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.45)]">
                  GET IN TOUCH
                </span>
                {/* Right Dot & Line */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
                  </span>
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.6 }}
                    className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent via-cyan-400/40 to-cyan-400/80 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] origin-left" 
                  />
                </div>
              </motion.div>
            </div>

            {/* Main Heading */}
            <div style={{ transform: "translateY(-76px)", perspective: 1200 }}>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.7rem)] font-extrabold leading-[1.15] tracking-tight text-white flex flex-col items-start">
                <motion.span
                  initial={{ opacity: 0, rotateX: 90, y: 40, filter: "blur(12px)", scale: 0.9 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.4 }}
                  className="origin-bottom"
                >
                  Let&apos;s build something
                </motion.span>
                <div style={{ transform: "translateY(-5px)", display: "inline-block", perspective: 1200 }}>
                  <motion.span 
                    initial={{ opacity: 0, rotateX: -90, y: -40, filter: "blur(12px) brightness(2) drop-shadow(0 0 20px rgba(168,85,247,0.8))", scale: 1.1 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px) brightness(1.2) drop-shadow(0 0 8px rgba(168,85,247,0.3))", scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, delay: 0.3, type: "spring", bounce: 0.5 }}
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent pb-1 inline-block origin-top"
                  >
                    great together.
                  </motion.span>
                </div>
              </h2>
            </div>

            {/* Supporting Text & Badges */}
            <div className="mt-5 flex flex-col gap-5" style={{ transform: "translateY(-60px)", perspective: 800 }}>
              <motion.p 
                initial={{ opacity: 0, z: -50, rotateX: -30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, z: 0, rotateX: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
                className="max-w-lg text-[16px] md:text-[18px] leading-[1.6] text-white/70 origin-top"
              >
                Open to internships, freelance projects, and full-time roles.
              </motion.p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                {/* Full-Stack Developer Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0, rotateZ: -10, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, rotateZ: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.6 }}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/5 bg-[#030610] px-5 py-2.5 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_8px_20px_rgba(34,211,238,0.2),inset_0_2px_4px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(34,211,238,0.15)] cursor-default"
                >
                  {/* Glass Reflection Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none" />

                  {/* Glowing dot */}
                  <span className="relative flex h-2 w-2 shrink-0 z-10">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]" />
                  </span>
                  <span className="relative z-10 font-mono text-[11px] font-bold tracking-[0.15em] text-cyan-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Full-Stack Developer
                  </span>
                  {/* Hover Sweep */}
                  <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-[150%]" />
                </motion.div>

                {/* AI/ML Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0, rotateZ: 10, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, rotateZ: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.6 }}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/5 bg-[#030610] px-5 py-2.5 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_20px_rgba(168,85,247,0.2),inset_0_2px_4px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(168,85,247,0.15)] cursor-default"
                >
                  {/* Glass Reflection Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none" />

                  {/* Glowing dot */}
                  <span className="relative flex h-2 w-2 shrink-0 z-10">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,1)]" />
                  </span>
                  <span className="relative z-10 font-mono text-[11px] font-bold tracking-[0.15em] text-purple-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    AI/ML
                  </span>
                  {/* Hover Sweep */}
                  <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transition-transform duration-700 group-hover:translate-x-[150%]" />
                </motion.div>
              </div>
            </div>

            {/* ── Info Cards ── */}
            <div className="relative mt-10 flex flex-col gap-5" style={{ transform: "translateY(-10px)" }}>
              
              {/* ── Structured Futuristic Connecting Line ── */}
              <div 
                className="absolute z-0 w-[2px] overflow-hidden rounded-full" 
                style={{ 
                  top: "32px", 
                  bottom: "32px",
                  left: "31px", 
                  backgroundColor: "rgba(0,0,0,0.6)",
                  boxShadow: "inset 0 0 4px rgba(0,0,0,1), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {/* Moving glowing core */}
                <div
                  className="absolute left-0 w-full"
                  style={{ 
                    height: "80px", 
                    background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.8), rgba(168,85,247,0.8), transparent)",
                    boxShadow: "0 0 10px 2px rgba(34,211,238,0.4)",
                    animation: "contact-line-flow 4s linear infinite"
                  }}
                />
              </div>

              {contactInfo.map((info, index) => (
                <InfoCard
                  key={info.label}
                  icon={info.icon}
                  label={info.label}
                  value={info.value}
                  subText={info.subText}
                  href={info.href}
                  iconColorClass={info.iconColorClass}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* ═══ Right Column ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -30, rotateX: 10, scale: 0.85, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.1, type: "spring", stiffness: 40, damping: 15 }}
            style={{ marginTop: "-50px", transformPerspective: 1200 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* ═══ Bottom Connection Bar ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
          style={{ marginTop: "60px" }}
        >
          {/* Outer subtle glow */}
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-cyan-400/[0.08] via-blue-500/[0.06] to-purple-500/[0.08] blur-2xl opacity-80" />

          <div className="group relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-gradient-to-br from-[#0C1222] to-[#03050A] px-10 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(34,211,238,0.03)] backdrop-blur-3xl sm:px-14 md:px-16 md:py-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(34,211,238,0.15)] hover:border-cyan-400/30">
            
            {/* Top accent line (Neon lip) */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-30 shadow-[0_1px_8px_1px_rgba(34,211,238,0.5)] transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Ambient Gradient Glow */}
            <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(600px_circle_at_50%_-20%,rgba(34,211,238,0.3),transparent_70%)] transition-opacity duration-500 group-hover:opacity-30" />

            <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              {/* ── Left: Title ── */}
              <div className="shrink-0 text-center lg:text-left pl-3">
                <h4 
                  className="font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]"
                  style={{ transform: "translateX(20px)", display: "inline-block" }}
                >
                  Let&apos;s Connect
                </h4>
                <p className="mt-1.5 text-[14px] font-medium text-white/50">
                  Connect with me across platforms
                </p>
                {/* Quick Response Info for Recruiters */}
                <div className="mt-6 flex flex-col gap-2 text-[12px] text-white/40 font-medium ml-5">
                  <div className="flex items-center justify-center lg:justify-start gap-2.5">
                    <span className="text-[14px]">📍</span> 
                    <span>Based in Bhopal, India</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2.5">
                    <span className="text-[14px]">🌍</span> 
                    <span>Available for Remote Work</span>
                  </div>
                </div>
              </div>

              {/* ── Center: Social Links ── */}
              <SocialLinks />

              {/* ── Right: Availability + Orbital ── */}
              <div className="flex items-center gap-5 lg:gap-6">
                {/* Availability badge */}
                <div className="shrink-0 text-center lg:text-right">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Available for
                  </p>
                  <div className="mt-1.5 flex items-center justify-center lg:justify-end gap-2.5">
                    <span className="text-[13px] font-semibold text-white/80">
                      Internships <span className="text-cyan-400/50 mx-1">•</span> Freelance <span className="text-cyan-400/50 mx-1">•</span> Full-Time Opportunities
                    </span>
                    {/* Green pulsing indicator */}
                    <span className="relative flex h-2.5 w-2.5 shrink-0 ml-1">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    </span>
                  </div>
                </div>

                {/* Orbital decorative element */}
                <div className="hidden lg:block">
                  <OrbitalElement />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>
    </>
  );
}
