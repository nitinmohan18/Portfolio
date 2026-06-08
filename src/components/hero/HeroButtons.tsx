"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";
import { useState, useRef, ReactNode } from "react";

const socialIcons: Record<string, ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
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

function RippleButton({ children, className, onClick, href, as = "button" }: any) {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const Component = as as any;

  return (
    <Component
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
      {isHovering && (
        <motion.div
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
            width: "150px",
            height: "150px",
            left: coords.x - 75,
            top: coords.y - 75,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Component>
  );
}

export default function HeroButtons() {
  const socials = profile.socials.filter((s) =>
    ["github", "linkedin", "instagram", "twitter"].includes(s.platform)
  );

  return (
    <div className="flex flex-col gap-6">
      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4">
        <MagneticButton>
          <RippleButton
            as="button"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-br from-[#60a5fa] to-[#a78bfa] text-white border-none px-[28px] py-[14px] rounded-[50px] font-[600] text-[15px]"
          >
            View My Work
            <ArrowRight size={18} />
          </RippleButton>
        </MagneticButton>

        <MagneticButton>
          <RippleButton
            as="button"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.18)] text-white px-[28px] py-[14px] rounded-[50px] font-[600] text-[15px] hover:border-[rgba(255,255,255,0.3)] transition-colors duration-200"
          >
            Contact Me
            <Mail size={18} />
          </RippleButton>
        </MagneticButton>

        {profile.resumeUrl && (
          <MagneticButton>
            <RippleButton
              as="a"
              href={profile.resumeUrl}
              className="bg-[rgba(255,255,255,0.03)] text-white border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] px-[20px] py-[14px] rounded-[50px] font-[600] text-[15px] transition-colors duration-200"
            >
              Resume <Download size={18} />
            </RippleButton>
          </MagneticButton>
        )}
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3">
        {socials.map((social, i) => (
          <MagneticButton key={social.platform}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.1)] text-white transition-colors duration-200"
            >
              <div className="hover:scale-110 transition-transform duration-200 relative">
                {socialIcons[social.platform] ?? null}
              </div>
            </a>
          </MagneticButton>
        ))}
      </div>
    </div>
  );
}
