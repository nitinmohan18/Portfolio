"use client";


import { motion } from "framer-motion";
import { Briefcase, Clock, Mail, MapPin } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";

/* ═══════════════════════════════════════════════
   Custom Keyframes (contact-scoped)
   ═══════════════════════════════════════════════ */
const contactKeyframes = `
  @keyframes contact-nucleus {
    0%, 100% {
      box-shadow: 0 0 6px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4), 0 0 40px rgba(34,211,238,0.12);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 10px rgba(34,211,238,1), 0 0 28px rgba(34,211,238,0.6), 0 0 56px rgba(34,211,238,0.2);
      transform: scale(1.18);
    }
  }
  @keyframes contact-ring-pulse {
    0%, 100% { opacity: 0.65; }
    50% { opacity: 1; }
  }
`;

/* ═══════════════════════════════════════════════
   Contact Info Data
   ═══════════════════════════════════════════════ */
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
  },
  {
    icon: Briefcase,
    label: "Availability",
    value: "Open for opportunities",
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
            animation: "contact-nucleus 3s ease-in-out infinite",
            willChange: "transform, box-shadow",
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
  href?: string;
  index: number;
}

function InfoCard({ icon: Icon, label, value, href, index }: InfoCardProps) {
  const inner = (
    <div className="flex items-start gap-5">
      {/* Circular glowing icon */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-500 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/20 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.35)] group-hover:text-white">
        <Icon size={20} />
      </div>

      {/* Text Stack */}
      <div className="flex flex-col justify-center pt-1">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 transition-colors duration-300 group-hover:text-cyan-400/80">
          {label}
        </p>
        <p className="mt-1 text-[15px] font-medium text-white/80 transition-colors duration-300 group-hover:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  const sharedClasses =
    "group flex items-center p-2 -m-2 rounded-2xl transition-all duration-300 hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.2 + index * 0.07,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {href ? (
        <a href={href} className={sharedClasses}>
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
        <div className="relative z-10 grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20 xl:gap-28">
          {/* ═══ Left Column ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -32, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Section Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/60" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                Contact
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-white">
              Let&apos;s build
              <br />
              something{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                extraordinary.
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="mt-8 max-w-lg text-[clamp(16px,1.3vw,19px)] leading-[1.8] text-white/60">
              Have a project in mind or want to work together?
              <br className="hidden sm:block" />
              I&apos;d love to hear from you. Let&apos;s create impactful
              solutions and bring ideas to life.
            </p>

            {/* ── Info Cards ── */}
            <div className="mt-14 flex flex-col gap-8 sm:gap-10">
              {contactInfo.map((info, index) => (
                <InfoCard
                  key={info.label}
                  icon={info.icon}
                  label={info.label}
                  value={info.value}
                  href={info.href}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* ═══ Right Column ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          className="relative z-10 mt-24 lg:mt-32"
        >
          {/* Outer subtle glow */}
          <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-cyan-400/[0.12] via-blue-500/[0.1] to-cyan-400/[0.12] blur-2xl opacity-80" />

          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.15] bg-[rgba(8,12,24,0.65)] px-8 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-[40px] sm:px-12 md:px-14 md:py-9">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
              {/* ── Left: Title ── */}
              <div className="shrink-0">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-400/70">
                  Let&apos;s Connect
                </h4>
                <p className="mt-1 text-[13px] text-white/40">
                  Find me on these platforms
                </p>
              </div>

              {/* ── Center: Social Links ── */}
              <SocialLinks />

              {/* ── Right: Availability + Orbital ── */}
              <div className="flex items-center gap-5 lg:gap-6">
                {/* Availability badge */}
                <div className="shrink-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                    Available for
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-white/65">
                      Full-time, Freelance, or Contract
                    </span>
                    {/* Green pulsing indicator */}
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
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
