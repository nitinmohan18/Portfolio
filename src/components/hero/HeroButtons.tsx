"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";
import { usePreloader } from "@/components/layout/ClientLayout";
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
const brandColors: Record<string, { border: string, shadow: string, text: string, topGlow: string, sweep: string }> = {
  github: {
    border: "hover:border-[#A371F7]/60 active:border-[#A371F7]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(163,113,247,0.35),0_2px_15px_rgba(163,113,247,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)] active:shadow-[0_15px_30px_rgba(163,113,247,0.35),0_2px_15px_rgba(163,113,247,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#A371F7] group-hover:drop-shadow-[0_0_10px_rgba(163,113,247,0.9)] group-active:text-[#A371F7] group-active:drop-shadow-[0_0_10px_rgba(163,113,247,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(163,113,247,1)] via-[#A371F7]/90",
    sweep: "via-[#A371F7]/25"
  },
  linkedin: {
    border: "hover:border-[#0A66C2]/60 active:border-[#0A66C2]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(10,102,194,0.35),0_2px_15px_rgba(10,102,194,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)] active:shadow-[0_15px_30px_rgba(10,102,194,0.35),0_2px_15px_rgba(10,102,194,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#0A66C2] group-hover:drop-shadow-[0_0_10px_rgba(10,102,194,0.9)] group-active:text-[#0A66C2] group-active:drop-shadow-[0_0_10px_rgba(10,102,194,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(10,102,194,1)] via-[#0A66C2]/90",
    sweep: "via-[#0A66C2]/25"
  },
  twitter: {
    border: "hover:border-white/60 active:border-white/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(255,255,255,0.25),0_2px_15px_rgba(255,255,255,0.4),inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.9)] active:shadow-[0_15px_30px_rgba(255,255,255,0.25),0_2px_15px_rgba(255,255,255,0.4),inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] group-active:text-white group-active:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(255,255,255,1)] via-white/90",
    sweep: "via-white/20"
  },
  instagram: {
    border: "hover:border-[#F472B6]/60 active:border-[#F472B6]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(244,114,182,0.35),0_2px_15px_rgba(244,114,182,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)] active:shadow-[0_15px_30px_rgba(244,114,182,0.35),0_2px_15px_rgba(244,114,182,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#F472B6] group-hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.9)] group-active:text-[#F472B6] group-active:drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(244,114,182,1)] via-[#F472B6]/90",
    sweep: "via-[#F472B6]/25"
  },
  email: {
    border: "hover:border-[#EA4335]/60 active:border-[#EA4335]/60",
    shadow: "hover:shadow-[0_15px_30px_rgba(234,67,53,0.35),0_2px_15px_rgba(234,67,53,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)] active:shadow-[0_15px_30px_rgba(234,67,53,0.35),0_2px_15px_rgba(234,67,53,0.5),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.9)]",
    text: "group-hover:text-[#EA4335] group-hover:drop-shadow-[0_0_10px_rgba(234,67,53,0.9)] group-active:text-[#EA4335] group-active:drop-shadow-[0_0_10px_rgba(234,67,53,0.9)]",
    topGlow: "shadow-[0_1px_8px_rgba(234,67,53,1)] via-[#EA4335]/90",
    sweep: "via-[#EA4335]/25"
  }
};

export default function HeroButtons() {
  const { showContent: isVisible } = usePreloader();
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
        .btn-primary .arrow-icon {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
          color: #22d3ee;
          filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.45));
        }
        @media (hover: hover) and (pointer: fine) {
          .btn-primary:hover {
            border-color: rgba(34, 211, 238, 0.40);
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.15), inset 0 -3px 8px rgba(0, 0, 0, 0.8), 0 12px 25px -5px rgba(0, 0, 0, 0.6), 0 0 12px rgba(34, 211, 238, 0.15);
            transform: translateY(-4px) scale(1.02);
            text-shadow: 0 0 4px rgba(34, 211, 238, 0.30);
          }
          .btn-primary:hover::before {
            transform: translateX(200%) skewX(-15deg);
          }
          .btn-primary:hover .arrow-icon {
            transform: translateX(5px) scale(1.1);
            filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.75));
          }
        }
        .btn-primary:active {
          transform: translateY(1px) scale(0.97);
          border-color: rgba(34, 211, 238, 0.40);
          box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.15), inset 0 2px 8px rgba(0,0,0,0.8), 0 8px 20px -5px rgba(0, 0, 0, 0.6), 0 0 12px rgba(34, 211, 238, 0.15);
          text-shadow: 0 0 4px rgba(34, 211, 238, 0.30);
          transition: all 0.1s ease;
        }
        .btn-primary:active::before {
          transform: translateX(200%) skewX(-15deg);
        }
        .btn-primary:active .arrow-icon {
          transform: translateX(5px) scale(1.1);
          filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.75));
        }

        .btn-secondary {
          position: relative;
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.01) 100%);
          border: 1px solid rgba(34, 211, 238, 0.15);
          border-top: 1px solid rgba(34, 211, 238, 0.4);
          border-bottom: 2px solid rgba(34, 211, 238, 0.2);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.15), 
            inset 0 -4px 10px rgba(34, 211, 238, 0.08), 
            0 8px 16px -4px rgba(0, 0, 0, 0.6),
            0 0 10px rgba(34, 211, 238, 0.05);
          backdrop-filter: blur(12px);
          padding: 14px 28px;
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #22d3ee;
          font-weight: 700;
          font-size: 15px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          overflow: hidden;
        }
        .btn-secondary::after {
           content: "";
           position: absolute;
           inset: 0;
           border-radius: 12px;
           box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
           pointer-events: none;
        }
        .btn-secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(105deg, transparent, rgba(34, 211, 238, 0.08), transparent);
          transform: translateX(-150%) skewX(-15deg);
          transition: transform 0.6s ease;
          pointer-events: none;
          z-index: 1;
        }
        .btn-secondary .mail-icon,
        .btn-secondary svg {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
          filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.3));
        }
        @media (hover: hover) and (pointer: fine) {
          .btn-secondary:hover {
            background: linear-gradient(180deg, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0.04) 100%);
            border-top: 1px solid rgba(34, 211, 238, 0.6);
            box-shadow: 
              inset 0 1px 2px rgba(255, 255, 255, 0.25), 
              inset 0 -4px 10px rgba(34, 211, 238, 0.15), 
              0 12px 24px -4px rgba(0, 0, 0, 0.7), 
              0 0 20px rgba(34, 211, 238, 0.2);
            transform: translateY(-4px) scale(1.02);
            text-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
          }
          .btn-secondary:hover::before {
            transform: translateX(200%) skewX(-15deg);
          }
          .btn-secondary:hover .mail-icon,
          .btn-secondary:hover svg {
            transform: rotate(15deg) scale(1.1);
            filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.6));
          }
        }
        .btn-secondary:active {
          transform: translateY(2px) scale(0.98);
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0.04) 100%);
          border-top: 1px solid rgba(34, 211, 238, 0.6);
          box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(0,0,0,0.4), 0 8px 16px -4px rgba(0, 0, 0, 0.7), 0 0 15px rgba(34, 211, 238, 0.15);
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
          transition: all 0.1s ease;
        }
        .btn-secondary:active::before {
          transform: translateX(200%) skewX(-15deg);
        }
        .btn-secondary:active .mail-icon,
        .btn-secondary:active svg {
          transform: rotate(15deg) scale(1.1);
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.6));
        }
      `}</style>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 hero-buttons">
        <MagneticButton strength={0.12}>
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 40, rotateX: 45 }}
            animate={isVisible ? { opacity: 1, scale: 1, y: 0, rotateX: 0 } : {}}
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
            animate={isVisible ? { opacity: 1, scale: 1, y: 0, rotateX: 0 } : {}}
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
              animate={isVisible ? { opacity: 1, scale: 1, y: 0, rotateX: 0 } : {}}
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
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } }
        }}
      >
        {socials.map((social) => {
          const colors = brandColors[social.platform] || brandColors.github;

          return (
            <MagneticButton key={social.platform}>
              <motion.a
                variants={{
                  hidden: { opacity: 0, scale: 0, rotate: -45 },
                  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 12 } }
                }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.9, y: 2 }}
                style={{ willChange: "transform, opacity" }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-black/80 bg-[linear-gradient(180deg,#1e2536_0%,#070a12_100%)] text-white/70 shadow-[0_10px_20px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.9)] transition-all duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${colors.border} ${colors.shadow}`}
              >
                {/* 3D Inner Casing/Bevel */}
                <div className="absolute inset-[1px] rounded-full border border-white/[0.04] pointer-events-none" />
                <div className="absolute inset-[2px] rounded-full border border-black/40 pointer-events-none" />

                {/* Realistic Curved Top Glass Reflection */}
                <div className="absolute inset-x-2 top-1 h-[35%] bg-gradient-to-b from-white/[0.12] to-transparent rounded-t-full opacity-90 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                
                {/* Top glowing edge on hover/active */}
                <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 ${colors.topGlow}`} />

                {/* Ambient glow sweep on hover/active */}
                <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-full group-active:translate-x-full group-hover:opacity-100 group-active:opacity-100 ${colors.sweep}`} />
                
                {/* Icon Container */}
                <div className={`relative z-10 transition-colors duration-300 ${colors.text}`}>
                  {socialIcons[social.platform]}
                </div>
              </motion.a>
            </MagneticButton>
          );
        })}
      </motion.div>
    </div>
  );
}
