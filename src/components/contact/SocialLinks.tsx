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
  twitter: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
};

/* ─── Platforms to display in bottom bar ─── */
const SHOW_PLATFORMS = ["github", "linkedin", "twitter", "email"];

export default function SocialLinks() {
  const visibleSocials = profile.socials.filter((s) =>
    SHOW_PLATFORMS.includes(s.platform)
  );

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {visibleSocials.map((social, index) => {
        const isEmail = social.platform === "email";

        return (
          <motion.a
            key={social.platform}
            href={social.url}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: 0.08 + index * 0.06,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-white hover:shadow-[0_10px_30px_-10px_rgba(34,211,238,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 active:scale-95"
            aria-label={social.label}
          >
            <span className="text-white/45 transition-colors duration-500 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              {socialIcons[social.platform] ?? null}
            </span>
            <span className="text-[13px] font-bold tracking-wide">
              {social.label}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
