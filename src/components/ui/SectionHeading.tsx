"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const fullTitle = highlight
    ? title.replace(highlight, `__HIGHLIGHT__`)
    : title;
  const parts = fullTitle.split("__HIGHLIGHT__");

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="h-px w-8 bg-primary/60" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-primary/60" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white"
      >
        {parts[0]}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
        {parts[1]}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
