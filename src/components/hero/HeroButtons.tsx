"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";
import { ReactNode } from "react";

const socialIcons: Record<string, ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
};

export default function HeroButtons() {
  const socials = profile.socials.filter((s) =>
    ["github", "linkedin", "instagram", "twitter"].includes(s.platform)
  );

  return (
    <div className="flex flex-col gap-6">
      <style>{`
        .btn-primary {
          position: relative;
          background: linear-gradient(165deg, #0f172a, #1e293b, #020617);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -2px 6px rgba(0, 0, 0, 0.8), 0 10px 20px -5px rgba(0, 0, 0, 0.5), 0 0 5px rgba(34, 211, 238, 0.05);
          padding: 14px 28px;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: white;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
        .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          transform: translateX(-150%) skewX(-15deg);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .btn-primary:hover {
          border-color: rgba(34, 211, 238, 0.40);
          box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.15), inset 0 -3px 8px rgba(0, 0, 0, 0.8), 0 12px 25px -5px rgba(0, 0, 0, 0.6), 0 0 12px rgba(34, 211, 238, 0.15);
          transform: translateY(-4px) scale(1.02);
          text-shadow: 0 0 4px rgba(34, 211, 238, 0.30);
        }
        .btn-primary:hover::before {
          transform: translateX(200%) skewX(-15deg);
        }
        .btn-primary .arrow-icon {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
          color: #22d3ee;
          filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.45));
        }
        .btn-primary:hover .arrow-icon {
          transform: translateX(5px) scale(1.1);
          filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.75));
        }
        .btn-primary:active {
          transform: translateY(1px) scale(0.97);
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), inset 0 1px 2px rgba(0,0,0,0.6), 0 0 0 rgba(34,211,238,0);
        }

        .btn-secondary {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(34, 211, 238, 0.25);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05), inset 0 -1px 2px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          padding: 14px 28px;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #22d3ee;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
        .btn-secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(105deg, transparent, rgba(34, 211, 238, 0.05), transparent);
          transform: translateX(-150%) skewX(-15deg);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .btn-secondary:hover {
          background: rgba(34, 211, 238, 0.06);
          border-color: rgba(34, 211, 238, 0.6);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 211, 238, 0.15);
          transform: translateY(-4px) scale(1.02);
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
        }
        .btn-secondary:hover::before {
          transform: translateX(200%) skewX(-15deg);
        }
        .btn-secondary .mail-icon,
        .btn-secondary svg {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
          filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.3));
        }
        .btn-secondary:hover .mail-icon,
        .btn-secondary:hover svg {
          transform: rotate(15deg) scale(1.1);
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.6));
        }
        .btn-secondary:active {
          transform: translateY(1px) scale(0.97);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.6), inset 0 1px 2px rgba(0,0,0,0.4), 0 0 0 rgba(34,211,238,0);
        }

        .social-icon-btn {
          position: relative;
          overflow: visible;
          background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #fff;
          cursor: pointer;
          user-select: none;
        }
        .social-icon-btn .icon-inner {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .social-icon-btn:hover {
          transform: translateY(-4px) scale(1.05);
        }
        .social-icon-btn.github:hover {
          background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(140, 120, 255, 0.05));
          border-color: rgba(140, 120, 255, 0.5);
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), 0 0 18px rgba(140, 120, 255, 0.25);
          color: #ffffff;
        }
        .social-icon-btn.linkedin:hover {
          background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(10,102,194,0.05));
          border-color: #0A66C2;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), 0 0 18px rgba(10,102,194,0.3);
          color: #0A66C2;
        }
        .social-icon-btn.instagram:hover {
          background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(225,48,108,0.05));
          border-color: #E1306C;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), 0 0 18px rgba(225,48,108,0.3);
          color: #E1306C;
        }
        .social-icon-btn.twitter:hover {
          background: linear-gradient(145deg, rgba(255,255,255,0.15), rgba(15, 15, 15, 0.85));
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), 0 0 18px rgba(255, 255, 255, 0.08), 0 0 30px rgba(0, 0, 0, 0.6);
          color: #e7e9ea;
        }
        .social-icon-btn:hover .icon-inner {
          transform: scale(1.18) rotate(-6deg);
        }
        .social-icon-btn:active {
          transform: translateY(-1px) scale(0.97);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 2px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 hero-buttons">
        <MagneticButton strength={0.12}>
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 40, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1.0, type: "spring", stiffness: 150, damping: 10 }}
            style={{ willChange: "transform, opacity" }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
          >
            Explore Projects
            <ArrowRight size={18} className="arrow-icon" />
          </motion.button>
        </MagneticButton>

        <MagneticButton strength={0.12}>
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 40, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1.15, type: "spring", stiffness: 150, damping: 10 }}
            style={{ willChange: "transform, opacity" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-secondary"
          >
            Get In Touch
            <Mail size={18} className="mail-icon" />
          </motion.button>
        </MagneticButton>

        {profile.resumeUrl && (
          <MagneticButton strength={0.12}>
            <motion.a
              initial={{ opacity: 0, scale: 0.5, y: 40, rotateX: 45 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 150, damping: 10 }}
              href={profile.resumeUrl}
              className="btn-secondary"
              style={{
                willChange: "transform, opacity",
                color: "rgba(255,255,255,0.8)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              Resume <Download size={18} />
            </motion.a>
          </MagneticButton>
        )}
      </div>

      {/* Social links */}
      <motion.div 
        className="flex items-center gap-[14px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } }
        }}
      >
        {socials.map((social) => (
          <MagneticButton key={social.platform}>
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0, rotate: -45 },
                visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 12 } }
              }}
              style={{ willChange: "transform, opacity" }}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`social-icon-btn ${social.platform}`}
            >
              <div className="icon-inner">
                {socialIcons[social.platform]}
              </div>
            </motion.a>
          </MagneticButton>
        ))}
      </motion.div>
    </div>
  );
}
