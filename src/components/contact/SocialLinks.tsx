"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  email: <Mail size={20} />,
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

export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h4 className="text-[18px] font-[700] text-white font-display">Let&apos;s Connect</h4>
        <p className="text-[14px] text-[rgba(255,255,255,0.55)]">
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4" style={{ perspective: "1000px" }}>
        {profile.socials.map((social, i) => (
          <motion.a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, rotateX: -90, y: 30 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.12, duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
            style={{ transformStyle: "preserve-3d", transformOrigin: "bottom" }}
            className="flex flex-col gap-3 p-[20px] rounded-[14px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] transition-colors duration-300 group"
          >
            <div className="w-[40px] h-[40px] rounded-[10px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.65)] group-hover:text-[#60a5fa] group-hover:border-[#60a5fa]/30 transition-colors duration-300">
              {socialIcons[social.platform] ?? null}
            </div>
            <span className="text-[14px] font-[600] text-white tracking-wide">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
