"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Github, Linkedin } from "@/components/ui/Icons";

/* ─── Social Icons ─── */
const socialIcons: Record<string, ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  email: <Mail size={18} />,
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
};

/* ─── Platforms to display in bottom bar ─── */
const SHOW_PLATFORMS = ["github", "linkedin", "twitter", "instagram", "email"];

const brandColors: Record<string, { border: string, shadow: string, text: string, topGlow: string, sweep: string }> = {
  github: {
    border: "hover:border-[#A371F7]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(163,113,247,0.35),0_2px_15px_rgba(163,113,247,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#A371F7] group-hover:drop-shadow-[0_0_10px_rgba(163,113,247,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(163,113,247,1)] via-[#A371F7]/90",
    sweep: "via-[#A371F7]/25"
  },
  linkedin: {
    border: "hover:border-[#0A66C2]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(10,102,194,0.35),0_2px_15px_rgba(10,102,194,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#0A66C2] group-hover:drop-shadow-[0_0_10px_rgba(10,102,194,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(10,102,194,1)] via-[#0A66C2]/90",
    sweep: "via-[#0A66C2]/25"
  },
  twitter: {
    border: "hover:border-white/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(255,255,255,0.25),0_2px_15px_rgba(255,255,255,0.4),inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(255,255,255,1)] via-white/90",
    sweep: "via-white/20"
  },
  instagram: {
    border: "hover:border-[#F472B6]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(244,114,182,0.35),0_2px_15px_rgba(244,114,182,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#F472B6] group-hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(244,114,182,1)] via-[#F472B6]/90",
    sweep: "via-[#F472B6]/25"
  },
  email: {
    border: "hover:border-[#EA4335]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(234,67,53,0.35),0_2px_15px_rgba(234,67,53,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#EA4335] group-hover:drop-shadow-[0_0_10px_rgba(234,67,53,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(234,67,53,1)] via-[#EA4335]/90",
    sweep: "via-[#EA4335]/25"
  }
};

export default function SocialLinks() {
  const visibleSocials = profile.socials.filter((s) =>
    SHOW_PLATFORMS.includes(s.platform)
  );

  return (
    <div className="flex flex-wrap max-sm:flex-nowrap items-center justify-center gap-3 max-sm:gap-2.5 lg:gap-4 shrink-0 max-sm:snap-center">
      {visibleSocials.map((social, index) => {
        const isEmail = social.platform === "email";
        const colors = brandColors[social.platform] || brandColors.github;

        return (
          <motion.a
            key={social.platform}
            href={social.url}
            title={`View ${social.label} Profile`}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: 0.08 + index * 0.06,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.9, y: 2 }}
            className={`group relative flex h-12 w-12 max-sm:h-9 max-sm:w-9 items-center justify-center overflow-hidden rounded-full border border-black/80 bg-[linear-gradient(180deg,#1e2536_0%,#070a12_100%)] text-white/70 shadow-[0_10px_20px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.9)] transition-all duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${colors.border} ${colors.shadow}`}
            aria-label={social.label}
          >
            {/* 3D Inner Casing/Bevel */}
            <div className="absolute inset-[1px] rounded-full border border-white/[0.04] pointer-events-none" />
            <div className="absolute inset-[2px] rounded-full border border-black/40 pointer-events-none" />

            {/* Realistic Curved Top Glass Reflection */}
            <div className="absolute inset-x-2 top-1 h-[35%] bg-gradient-to-b from-white/[0.12] to-transparent rounded-t-full opacity-90 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            
            {/* Top glowing edge on hover */}
            <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${colors.topGlow}`} />

            {/* Sweep effect */}
            <div className={`absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-[150%] ${colors.sweep}`} />
            
            {/* Icon */}
            <span className={`relative z-10 transition-all duration-300 ${colors.text}`}>
              {socialIcons[social.platform] ?? null}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
