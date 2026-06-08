"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "slide-up" | "slide-right" | "scale-up" | "space-item";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

const variantsMap: Record<RevealVariant, any> = {
  "slide-up": {
    hidden: { opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 },
    visible: { 
      opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  },
  "slide-right": {
    hidden: { opacity: 0, x: -48, filter: "blur(12px)" },
    visible: {
      opacity: 1, x: 0, filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1, scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    }
  },
  "space-item": {
    hidden: { opacity: 0, rotateX: -15, y: 80, scale: 0.9, filter: "blur(20px)" },
    visible: {
      opacity: 1, rotateX: 0, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  }
};

export default function Reveal({
  children,
  variant = "slide-up",
  delay = 0,
  className,
  stagger = false,
  staggerDelay = 0.08,
  ...props
}: RevealProps) {
  
  if (stagger) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: staggerDelay, delayChildren: delay }
          }
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const baseVariant = variantsMap[variant];
  const customVariant = {
    ...baseVariant,
    visible: {
      ...baseVariant.visible,
      transition: { ...baseVariant.visible.transition, delay }
    }
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={customVariant}
      style={{ willChange: "transform, opacity, filter" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealContainer({
  children,
  className,
  delay = 0,
}: { children: ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } }
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, variant = "slide-up", className }: { children: ReactNode, variant?: RevealVariant, className?: string }) {
  return (
    <motion.div className={cn(className)} variants={variantsMap[variant]} style={{ willChange: "transform, opacity, filter" }}>
      {children}
    </motion.div>
  );
}
