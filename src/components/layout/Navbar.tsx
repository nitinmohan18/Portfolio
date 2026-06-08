"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { profile } from "@/data/profile";
import { useActiveSection, useScrollProgress } from "@/hooks/useScrollProgress";
import MagneticButton from "@/components/ui/MagneticButton";

const sectionIds = NAV_ITEMS.map((n) => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#60a5fa] z-[100] origin-left"
        style={{ scaleX: progress }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -100, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-[rgba(5,10,20,0.75)] backdrop-blur-[24px] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => handleNav("#home")}
              className="flex items-center gap-2.5 group relative"
              aria-label="Go to top"
            >
              <div className="w-9 h-9 rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-sm font-bold font-display text-[#ffffff] transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] group-hover:border-[rgba(96,165,250,0.5)]">
                <div className="flex items-center transition-all duration-300">
                  <span>{profile.initials[0]}</span>
                  <span>{profile.initials[1]}</span>
                </div>
              </div>
              
              <div className="hidden sm:flex relative overflow-hidden">
                 <span className="font-display font-semibold text-white text-sm tracking-wide transition-all duration-300 group-hover:tracking-[0.15em] relative">
                   <span className="relative z-10">{profile.name}</span>
                   <span className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite] bg-[length:200%_100%] mix-blend-overlay pointer-events-none" />
                 </span>
              </div>
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] hidden sm:block ml-1" 
              />
            </button>
          </MagneticButton>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Primary navigation">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 + i * 0.06, duration: 0.4 }}
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    "relative px-[16px] py-[8px] text-[14px] rounded-[12px] transition-all duration-200 border border-transparent",
                    isActive
                      ? "text-[#60a5fa] font-[600] bg-[rgba(96,165,250,0.12)] border-[rgba(96,165,250,0.3)]"
                      : "text-[rgba(255,255,255,0.65)] font-[500] hover:text-white hover:tracking-[0.02em]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-[-1px] left-[15%] right-[15%] h-[2px] bg-[#60a5fa] rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                      transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <MagneticButton className="hidden sm:flex">
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.6 + NAV_ITEMS.length * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.15, rotate: 8, textShadow: "0 0 12px rgba(255,255,255,0.8)", color: "#ffffff" }}
                href={profile.socials.find((s) => s.platform === "github")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[rgba(255,255,255,0.65)] transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </motion.a>
            </MagneticButton>
            <MagneticButton className="hidden sm:flex">
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.6 + (NAV_ITEMS.length + 1) * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.15, rotate: 8, textShadow: "0 0 12px rgba(255,255,255,0.8)", color: "#ffffff" }}
                href={profile.socials.find((s) => s.platform === "linkedin")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[rgba(255,255,255,0.65)] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </motion.a>
            </MagneticButton>

            {profile.resumeUrl && (
              <MagneticButton>
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6 + (NAV_ITEMS.length + 2) * 0.06, duration: 0.4 }}
                  href={profile.resumeUrl}
                  className="hidden sm:flex items-center gap-1.5 px-[18px] py-[8px] rounded-[50px] text-[13px] font-[600] text-white border border-[rgba(255,255,255,0.18)] relative overflow-hidden group/resume"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.1)] group-hover/resume:from-[rgba(96,165,250,0.2)] group-hover/resume:to-[rgba(167,139,250,0.2)] transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent opacity-0 group-hover/resume:opacity-100 group-hover/resume:animate-[shimmer_1.5s_infinite] bg-[length:200%_100%] -skew-x-12" />
                  <Download size={14} className="relative z-10" />
                  <span className="relative z-10">Resume</span>
                </motion.a>
              </MagneticButton>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-[rgba(255,255,255,0.65)] hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Animated Gradient Bottom Border on Scroll */}
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[rgba(96,165,250,0.3)] to-[rgba(167,139,250,0.3)]"
          />
        )}

        {/* Subtle Scanline Divider below navbar always */}
        <div className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(96,165,250,0.15)] to-transparent pointer-events-none" />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(12px)" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform" }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[rgba(5,10,20,0.75)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.08)] px-6 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 mb-6">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    style={{ willChange: "transform" }}
                    onClick={() => handleNav(item.href)}
                    className={cn(
                      "text-left px-4 py-3 text-[14px] rounded-[12px] transition-all duration-200",
                      isActive
                        ? "text-white font-[600] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.18)]"
                        : "text-[rgba(255,255,255,0.65)] font-[500] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                    )}
                  >
                    <span className="text-[#60a5fa]/60 mr-2 font-mono text-xs">
                      0{i + 1}.
                    </span>
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              {profile.socials.slice(0, 4).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[rgba(255,255,255,0.65)] hover:text-white transition-all duration-200 hover:-translate-y-[1.5px] hover:translate-x-[1.5px]"
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
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6">
        {/* Full track line */}
        <div className="absolute right-[4px] top-4 bottom-4 w-[1px] bg-[rgba(255,255,255,0.08)] z-[-1]" />
        
        {/* Active line fill (computed based on active index) */}
        {(() => {
          const activeIndex = NAV_ITEMS.findIndex(n => n.id === activeSection);
          const heightPercent = activeIndex >= 0 ? (activeIndex / (NAV_ITEMS.length - 1)) * 100 : 0;
          
          return (
            <motion.div 
              className="absolute right-[4px] w-[1px] bg-gradient-to-b from-[#60a5fa] to-[#a78bfa] z-[-1]"
              initial={{ height: 0 }}
              animate={{ top: "16px", height: `calc(${heightPercent}% - 32px)` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          );
        })()}

        {NAV_ITEMS.map((item, i) => {
          const isActive = activeSection === item.id;
          return (
            <SideNavItem 
              key={item.id} 
              item={item} 
              i={i} 
              isActive={isActive} 
              onClick={() => handleNav(item.href)} 
            />
          );
        })}
      </div>
    </>
  );
}

function SideNavItem({ item, i, isActive, onClick }: { item: any; i: number; isActive: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-end gap-4 group relative h-[10px]"
      aria-label={`Navigate to ${item.label}`}
    >
      <AnimatePresence mode="wait">
        {(isActive || isHovered) && (
          <motion.div
            key="text"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="text-[10px] font-mono tracking-widest text-[#60a5fa]">
              0{i + 1}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">
              {item.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-center w-[10px] h-[10px]">
        {/* Inactive state */}
        <motion.div
          animate={{
            width: isActive ? 10 : isHovered ? 8 : 6,
            height: isActive ? 10 : isHovered ? 8 : 6,
            backgroundColor: isActive ? "#60a5fa" : "transparent",
            borderColor: isActive ? "#60a5fa" : isHovered ? "rgba(96,165,250,0.5)" : "rgba(71,85,105,1)",
            boxShadow: isActive ? "0 0 12px rgba(96,165,250,0.8)" : "none",
          }}
          transition={{ duration: isActive ? 0.4 : 0.3, type: isActive ? "spring" : "tween" }}
          className="rounded-full border absolute"
        />

        {/* Active pulsing ring */}
        {isActive && (
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute rounded-full border border-[#60a5fa] w-[10px] h-[10px]"
          />
        )}

        {/* Click pulse ring */}
        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full border-[2px] border-[#60a5fa] w-[10px] h-[10px]"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.button>
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
