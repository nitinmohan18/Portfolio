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
    border: "hover:border-[#A371F7]/40",
    shadow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8),0_10px_25px_-5px_rgba(163,113,247,0.35)]",
    text: "group-hover:text-[#A371F7] group-hover:drop-shadow-[0_0_8px_rgba(163,113,247,0.5)]",
    topGlow: "shadow-[0_1px_5px_rgba(163,113,247,0.6)] via-[#A371F7]/80",
    sweep: "via-[#A371F7]/15"
  },
  linkedin: {
    border: "hover:border-[#0A66C2]/50",
    shadow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8),0_10px_25px_-5px_rgba(10,102,194,0.35)]",
    text: "group-hover:text-[#0A66C2] group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.6)]",
    topGlow: "shadow-[0_1px_5px_rgba(10,102,194,0.6)] via-[#0A66C2]/80",
    sweep: "via-[#0A66C2]/15"
  },
  twitter: {
    border: "hover:border-white/40",
    shadow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8),0_10px_25px_-5px_rgba(255,255,255,0.3)]",
    text: "group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]",
    topGlow: "shadow-[0_1px_5px_rgba(255,255,255,0.6)] via-white/80",
    sweep: "via-white/10"
  },
  instagram: {
    border: "hover:border-[#F472B6]/50",
    shadow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8),0_10px_25px_-5px_rgba(244,114,182,0.45)]",
    text: "group-hover:text-[#F472B6] group-hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]",
    topGlow: "shadow-[0_1px_5px_rgba(244,114,182,0.6)] via-[#F472B6]/80",
    sweep: "via-[#F472B6]/15"
  },
  email: {
    border: "hover:border-[#EA4335]/50",
    shadow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8),0_10px_25px_-5px_rgba(234,67,53,0.35)]",
    text: "group-hover:text-[#EA4335] group-hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.6)]",
    topGlow: "shadow-[0_1px_5px_rgba(234,67,53,0.6)] via-[#EA4335]/80",
    sweep: "via-[#EA4335]/15"
  }
};

export default function SocialLinks() {
  const visibleSocials = profile.socials.filter((s) =>
    SHOW_PLATFORMS.includes(s.platform)
  );

  return (
    <div className="flex flex-wrap items-center gap-3 lg:gap-4">
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
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            className={`group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-gradient-to-br from-[#12182B] to-[#0A0F1C] text-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.8),0_5px_15px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${colors.border} ${colors.shadow}`}
            aria-label={social.label}
          >
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
