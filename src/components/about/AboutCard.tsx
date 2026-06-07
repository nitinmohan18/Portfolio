"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  accent?: string;
}

export default function AboutCard({
  icon,
  title,
  description,
  delay = 0,
}: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -4, borderColor: "rgba(96,165,250,0.3)" }}
      className="premium-card p-[24px] flex flex-col group cursor-default"
    >
      <div className="w-[48px] h-[48px] rounded-full bg-[rgba(96,165,250,0.12)] border border-[rgba(96,165,250,0.2)] flex items-center justify-center text-[#60a5fa]">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-[700] text-[15px] text-white mt-[14px]">{title}</h3>
        <p className="text-[rgba(255,255,255,0.55)] text-[13px] leading-[1.6] mt-[6px]">{description}</p>
      </div>
    </motion.div>
  );
}
