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
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          background-size: 100%;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          transition: all 0.3s ease;
          color: white;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
        }
        .btn-primary:hover {
          background-size: 200%;
          background-position: right center;
          box-shadow: 0 0 24px rgba(99,102,241,0.45);
        }
        .btn-primary .arrow-icon {
          transition: transform 0.3s ease;
        }
        .btn-primary:hover .arrow-icon {
          transform: translateX(4px);
        }
        .btn-primary:active {
          transform: scale(0.97);
        }

        .btn-secondary {
          border: 1px solid rgba(100,255,218,0.35);
          color: #64FFDA;
          background: transparent;
          padding: 14px 28px;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
        }
        .btn-secondary:hover {
          background: rgba(100,255,218,0.07);
          border-color: rgba(100,255,218,0.7);
          box-shadow: 0 0 16px rgba(100,255,218,0.15);
        }
        .btn-secondary .mail-icon {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .btn-secondary:hover .mail-icon {
          transform: rotate(15deg);
        }
        .btn-secondary:active {
          transform: scale(0.97);
        }

        .social-icon-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #fff;
          cursor: pointer;
          user-select: none;
        }
        .social-icon-btn .icon-inner {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .social-icon-btn.github:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(140, 120, 255, 0.5);
          box-shadow: 0 0 18px rgba(140, 120, 255, 0.25);
          color: #ffffff;
        }
        .social-icon-btn.linkedin:hover {
          background: rgba(10,102,194,0.1);
          border-color: #0A66C2;
          box-shadow: 0 0 18px rgba(10,102,194,0.3);
          color: #0A66C2;
        }
        .social-icon-btn.instagram:hover {
          background: rgba(225,48,108,0.1);
          border-color: #E1306C;
          box-shadow: 0 0 18px rgba(225,48,108,0.3);
          color: #E1306C;
        }
        .social-icon-btn.twitter:hover {
          background: rgba(15, 15, 15, 0.85);
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.08), 
                      0 0 30px rgba(0, 0, 0, 0.6);
          color: #e7e9ea;
        }
        .social-icon-btn:hover .icon-inner {
          transform: scale(1.18) rotate(-6deg);
        }
        .social-icon-btn:active {
          transform: scale(0.97);
        }
      `}</style>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4">
        <MagneticButton>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
          >
            View My Work
            <ArrowRight size={18} className="arrow-icon" />
          </motion.button>
        </MagneticButton>

        <MagneticButton>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-secondary"
          >
            Get In Touch
            <Mail size={18} className="mail-icon" />
          </motion.button>
        </MagneticButton>

        {profile.resumeUrl && (
          <MagneticButton>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              href={profile.resumeUrl}
              className="btn-secondary"
              style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.2)" }}
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
          visible: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } }
        }}
      >
        {socials.map((social) => (
          <MagneticButton key={social.platform}>
            <motion.a
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
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
