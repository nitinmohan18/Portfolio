"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  stagger?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export function RevealContainer({
  children,
  className,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: RevealProps) {
  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
