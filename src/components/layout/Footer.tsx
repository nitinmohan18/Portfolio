"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Mail, Heart, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { NAV_ITEMS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

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
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full overflow-hidden bg-transparent">
      {/* Dynamic Fixed Bottom Border (Hides on scroll down, Animated) */}
      <motion.div 
        animate={{ 
          y: hidden ? 10 : 0, 
          opacity: hidden ? 0 : 1,
          backgroundPosition: ["0% center", "200% center"]
        }}
        transition={{ 
          y: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.3, ease: "easeInOut" },
          backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.8) 50%, transparent 100%)",
          backgroundSize: "200% auto"
        }}
        className="fixed bottom-0 left-0 right-0 z-50 h-[2px] shadow-[0_-2px_15px_rgba(34,211,238,0.6)] pointer-events-none"
      />

      {/* Top border: 1px linear gradient with glowing center */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/50 to-transparent shadow-[0_0_15px_rgba(96,165,250,0.5)]" />

      <div className="container-wide py-[60px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-[800] text-white text-[20px] tracking-tight">
              {profile.name}
            </span>
            <span className="text-[rgba(255,255,255,0.45)] text-[14px] font-mono tracking-widest uppercase">{profile.role}</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-[rgba(255,255,255,0.55)] hover:text-white text-[14px] font-[500] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {profile.socials.map((social) => (
              <MagneticButton key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-[10px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.65)] hover:text-white hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] transition-all duration-300"
                  aria-label={social.label}
                >
                  <div className="hover:scale-110 transition-transform">
                    {socialIcons[social.platform] ?? null}
                  </div>
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        <div className="mt-[60px] pt-[30px] border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-6 relative">
          
          {/* Copyright text: infinite gradient pan effect */}
          <motion.p 
            className="text-[13px] font-[600] font-mono tracking-wider"
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)",
              backgroundSize: "200% auto",
              color: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            © {year} {profile.name}. ALL RIGHTS RESERVED.
          </motion.p>

          <p className="text-[rgba(255,255,255,0.45)] text-[12px] flex items-center gap-1.5 font-mono">
            BUILT WITH <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> USING NEXT.JS
          </p>

          {/* Back to top button: floating spring bounce + hover rocket emoji */}
          <div className="absolute right-0 top-[-24px] sm:top-[-32px]">
            <MagneticButton>
              <motion.button
                onClick={handleScrollTop}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover="hover"
                className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] flex items-center justify-center rounded-full bg-[rgba(5,10,20,0.8)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.12)] cursor-pointer hover:border-[#60a5fa]/50 transition-colors group relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                aria-label="Back to top"
              >
                <motion.div
                  variants={{
                    hover: { y: -40, opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-white"
                >
                  <ArrowUp size={20} className="sm:w-[24px] sm:h-[24px]" />
                </motion.div>
                <motion.div
                  variants={{
                    hover: { y: 0, opacity: 1 }
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute text-[20px] sm:text-[24px]"
                >
                  🚀
                </motion.div>
              </motion.button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
