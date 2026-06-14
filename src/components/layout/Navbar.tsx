"use client";

import { useState, useCallback } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const progress = useScrollProgress();

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <style>{`
        @keyframes statusPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.4; }
        }
        .nm-logo {
          background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          letter-spacing: 2px;
          position: relative;
        }
        .group:hover .nm-logo {
          background: linear-gradient(135deg, #22d3ee 0%, #6366f1 60%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-link-hover {
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          padding: 4px 0;
        }
        .nav-link-hover:hover {
          color: #CBD5E1;
          transform: translateY(-1px);
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 15%;
          right: 15%;
          height: 2px;
          background: linear-gradient(90deg, #22d3ee, #7DD3FC);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }
        .nav-link-hover.active::after, .nav-link-hover:hover::after {
          transform: scaleX(1);
        }
        .nav-link-hover.active::after {
          box-shadow: 0 0 12px rgba(125,211,252,0.8);
          background: #7DD3FC;
        }
        .nav-social-icons {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 6px 12px;
          border: 1px solid rgba(34,211,238,0.12);
          border-radius: 20px;
          background: rgba(34,211,238,0.03);
          position: relative;
        }
        .nav-social-icon {
          color: rgba(200,200,210,0.6);
          transition: all 0.3s ease;
          border-radius: 50%;
          padding: 4px;
        }
        .nav-social-icon.github:hover {
          color: #ffffff;
          box-shadow: 0 0 14px rgba(140,120,255,0.3);
        }
        .nav-social-icon.linkedin:hover {
          color: #0A66C2;
          box-shadow: 0 0 14px rgba(10,102,194,0.35);
        }
        .nav-social-tooltip {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: rgba(10,12,20,0.95);
          border: 1px solid rgba(34,211,238,0.2);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 11px;
          color: #22d3ee;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(-4px);
          transition: all 0.25s ease;
          pointer-events: none;
        }
        .nav-social-icons:hover .nav-social-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
        /* Container */
        .side-nav {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 22px;
          z-index: 100;
        }

        /* Vertical line connecting all dots */
        .side-nav-track {
          position: absolute;
          right: 5px;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(34,211,238,0.2) 20%,
            rgba(34,211,238,0.2) 80%,
            transparent 100%
          );
          z-index: -1;
        }

        /* Each row */
        .side-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          position: relative;
        }

        /* Section name label */
        .side-nav-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(34,211,238,0.0);
          transform: translateX(6px);
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          pointer-events: none;
          font-family: monospace;
        }

        /* Label appears on hover OR active */
        .side-nav-item:hover .side-nav-label,
        .side-nav-item.active .side-nav-label {
          color: rgba(34,211,238,0.7);
          transform: translateX(0px);
        }

        /* Dot wrapper */
        .side-nav-dot {
          position: relative;
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Outer ring — hidden by default */
        .dot-ring {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(34,211,238,0.0);
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* Inner dot */
        .dot-core {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(34,211,238,0.25);
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* HOVER STATE */
        .side-nav-item:hover .dot-core {
          background: rgba(34,211,238,0.6);
          transform: scale(1.2);
        }

        .side-nav-item:hover .dot-ring {
          border-color: rgba(34,211,238,0.4);
          transform: scale(1.3);
        }

        /* ACTIVE STATE */
        .side-nav-item.active .dot-core {
          width: 7px;
          height: 7px;
          background: #22d3ee;
          box-shadow: 0 0 8px rgba(34,211,238,0.8),
                      0 0 16px rgba(34,211,238,0.4);
        }

        .side-nav-item.active .dot-ring {
          width: 14px;
          height: 14px;
          border-color: rgba(34,211,238,0.5);
          animation: ringPulse 2s ease-in-out infinite;
        }

        /* Active ring pulse */
        @keyframes ringPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Active section label stays permanently visible */
        .side-nav-item.active .side-nav-label {
          color: rgba(34,211,238,0.9);
          transform: translateX(0);
        }

        @media (max-width: 767px) {
          .side-nav {
            display: none !important;
          }
        }
      `}</style>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#60a5fa] z-[1001] origin-left"
        style={{ scaleX: progress }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -100, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform", backdropFilter: "none" }}
        className="fixed top-0 left-0 w-full z-[1000] bg-transparent border-b-0 py-3 transition-all duration-400"
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => handleNav("#home")}
              className="flex items-center gap-2.5 group relative"
              aria-label="Go to top"
            >
              <motion.div 
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative flex items-center justify-center overflow-hidden rounded-[10px] border border-black/80 bg-[linear-gradient(180deg,#1e2536_0%,#070a12_100%)] shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(34,211,238,0.25),inset_0_2px_2px_rgba(255,255,255,0.2),inset_0_-4px_8px_rgba(0,0,0,0.9)] px-2.5 py-1.5"
                style={{ willChange: "transform" }}
              >
                {/* 3D Inner Casing/Bevel */}
                <div className="absolute inset-[1px] rounded-[8px] border border-white/[0.04] pointer-events-none" />
                <div className="absolute inset-[2px] rounded-[6px] border border-black/40 pointer-events-none" />

                {/* Realistic Curved Top Glass Reflection */}
                <div className="absolute inset-x-1 top-1 h-[35%] bg-gradient-to-b from-white/[0.12] to-transparent rounded-t-[6px] opacity-90 pointer-events-none" />
                
                <div className="flex items-center nm-logo drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-300 relative z-10">
                  <span>{profile.initials[0]}</span>
                  <span>{profile.initials[1]}</span>
                </div>
              </motion.div>
              
              <div className="hidden sm:flex relative overflow-hidden">
                 <span className="font-display font-semibold text-white text-sm transition-all duration-300 relative" style={{ letterSpacing: "0.5px" }}>
                   <span className="relative z-10">{profile.name}</span>
                   <span className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite] bg-[length:200%_100%] mix-blend-overlay pointer-events-none" />
                 </span>
              </div>
              <div 
                style={{ animation: 'statusPulse 2s ease-in-out infinite' }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] hidden sm:block ml-1" 
              />
            </button>
          </MagneticButton>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-[36px]" aria-label="Primary navigation">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 + i * 0.06, duration: 0.4 }}
                  onClick={() => handleNav(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "nav-link-hover relative border border-transparent",
                    isActive ? "active text-[#7DD3FC]" : "text-[rgba(180,195,220,0.75)]"
                  )}
                  style={{ 
                    ...(isActive ? { 
                      textShadow: '0 0 12px rgba(125,211,252,0.8), 0 0 24px rgba(125,211,252,0.4)',
                      fontWeight: 700
                    } : {}),
                    fontSize: "clamp(10px, 0.85vw, 13px)"
                  }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6 + NAV_ITEMS.length * 0.06, duration: 0.4 }}
              className="hidden sm:flex nav-social-icons group/social"
            >
              <a
                href={profile.socials.find((s) => s.platform === "github")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-icon github relative"
                aria-label="GitHub"
              >
                <Github size={18} />
                <div 
                  className="absolute bottom-[2px] right-[2px] w-[6px] h-[6px] bg-[#22c55e] rounded-full shadow-[0_0_4px_rgba(34,197,94,0.6)]"
                  style={{ animation: 'statusPulse 2s ease-in-out infinite' }}
                />
              </a>
              <a
                href={profile.socials.find((s) => s.platform === "linkedin")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-icon linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <div className="nav-social-tooltip">
                <span className="animate-pulse mr-1 text-emerald-400">✦</span> Open to Opportunities
              </div>
            </motion.div>

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
              className="md:hidden p-2 text-[rgba(34,211,238,0.7)] hover:text-[#22d3ee] transition-all duration-300 z-[1000] relative"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[rgba(8,10,20,0.97)] backdrop-blur-[20px] flex flex-col items-center justify-center gap-[32px] md:hidden"
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  onClick={() => handleNav(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-[24px] font-[600] tracking-[3px] uppercase transition-all duration-300",
                    isActive
                      ? "text-[#7DD3FC] drop-shadow-[0_0_16px_rgba(125,211,252,0.8)] scale-105"
                      : "text-[rgba(180,195,220,0.8)] hover:text-[#22d3ee] hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  )}
                >
                  {item.label}
                </motion.button>
              );
            })}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: NAV_ITEMS.length * 0.08, duration: 0.3 }}
              className="flex items-center gap-6 mt-4"
            >
              {profile.socials.slice(0, 4).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(180,195,220,0.8)] hover:text-[#22d3ee] transition-colors duration-300"
                  aria-label={social.label}
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side vertical nav indicator (desktop & tablet) */}
      <div className="side-nav hidden md:flex">
        <div className="side-nav-track" />
        {sectionIds.map((section) => (
          <div
            key={section}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${section}`}
            aria-current={activeSection === section ? "page" : undefined}
            className={`side-nav-item ${activeSection === section ? 'active' : ''}`}
            onClick={() => handleNav(`#${section}`)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNav(`#${section}`);
              }
            }}
          >
            <span className="side-nav-label">{section}</span>
            <div className="side-nav-dot">
              <div className="dot-ring" />
              <div className="dot-core" />
            </div>
          </div>
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
