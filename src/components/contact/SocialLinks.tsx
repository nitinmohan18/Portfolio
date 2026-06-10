"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Github, Linkedin } from "@/components/ui/Icons";

const socialIcons: Record<string, ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  email: <Mail size={18} />,
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
};

export default function SocialLinks() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/36">
          Channels
        </p>
        <h4 className="mt-1 font-display text-xl font-bold text-white">
          Continue the signal anywhere
        </h4>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {profile.socials.map((social, index) => {
          const isEmail = social.platform === "email";

          return (
            <motion.a
              key={social.platform}
              href={social.url}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.14 + index * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-white/68 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/24 hover:bg-white/[0.055] hover:text-white"
              aria-label={social.label}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] text-white/58 transition duration-300 group-hover:border-cyan-300/24 group-hover:text-cyan-300">
                {socialIcons[social.platform] ?? null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{social.label}</span>
                <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-white/32">
                  {isEmail ? "Direct inbox" : "Public profile"}
                </span>
              </span>
              <ArrowUpRight size={15} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
