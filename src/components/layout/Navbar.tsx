"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Sun } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { profile } from "@/data/profile";
import { useActiveSection, useScrollProgress } from "@/hooks/useScrollProgress";
import MagneticButton from "@/components/ui/MagneticButton";
import GlowButton from "@/components/ui/GlowButton";

const sectionIds = NAV_ITEMS.map((n) => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left"
        style={{ scaleX: progress }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-white/[0.06] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => handleNav("#home")}
              className="flex items-center gap-2.5 group"
              aria-label="Go to top"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-bold font-display text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {profile.initials}
              </div>
              <span className="font-display font-semibold text-white text-sm tracking-wide hidden sm:block">
                {profile.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:block" />
            </button>
          </MagneticButton>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.href)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  activeSection === item.id
                    ? "text-white bg-primary/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="block h-[2px] bg-primary rounded-full mt-0.5 mx-auto w-4"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <MagneticButton className="hidden sm:flex">
              <a
                href={profile.socials.find((s) => s.platform === "github")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </MagneticButton>
            <MagneticButton className="hidden sm:flex">
              <a
                href={profile.socials.find((s) => s.platform === "linkedin")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </MagneticButton>

            {profile.resumeUrl && (
              <GlowButton href={profile.resumeUrl} size="sm" className="hidden sm:flex gap-1.5">
                <Download size={14} />
                Resume
              </GlowButton>
            )}
            {!profile.resumeUrl && (
              <div className="hidden sm:flex px-4 py-2 text-xs font-medium text-slate-500 border border-white/10 rounded-xl">
                Resume Soon
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 glass border-b border-white/[0.06] px-6 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 mb-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    "text-left px-4 py-3 text-sm font-medium rounded-xl transition-all",
                    activeSection === item.id
                      ? "text-white bg-primary/10 border border-primary/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="text-primary/60 mr-2 font-mono text-xs">
                    0{i + 1}.
                  </span>
                  {item.label}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              {profile.socials.slice(0, 4).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side vertical nav indicator (desktop) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-6">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.href)}
            className="flex items-center gap-3 group"
            aria-label={`Navigate to ${item.label}`}
          >
            <span
              className={cn(
                "text-[10px] font-mono tracking-widest transition-all duration-300",
                activeSection === item.id
                  ? "text-white opacity-100"
                  : "text-slate-600 group-hover:text-slate-400 opacity-0 group-hover:opacity-100"
              )}
            >
              0{i + 1} {item.label.toUpperCase()}
            </span>
            <span
              className={cn(
                "w-2 h-2 rounded-full border transition-all duration-300",
                activeSection === item.id
                  ? "bg-primary border-primary scale-125"
                  : "bg-transparent border-slate-600 group-hover:border-slate-400"
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactNode> = {
    github: <Github size={16} />,
    linkedin: <Linkedin size={16} />,
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
    email: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  };
  return <>{icons[platform] ?? null}</>;
}
