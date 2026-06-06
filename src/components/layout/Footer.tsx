"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { NAV_ITEMS } from "@/lib/constants";

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={16} />,
  linkedin: <Linkedin size={16} />,
  email: <Mail size={16} />,
  instagram: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06]">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-bold text-white text-lg">
              {profile.name}
            </span>
            <span className="text-slate-500 text-sm">{profile.role}</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-slate-500 hover:text-white text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {profile.socials.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                aria-label={social.label}
              >
                {socialIcons[social.platform] ?? null}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1">
            Built with <Heart size={10} className="text-red-500 fill-red-500" /> using Next.js & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
