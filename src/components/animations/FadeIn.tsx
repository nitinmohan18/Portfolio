"use client";

import { motion, MotionProps, Variant } from "framer-motion";
import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

function getVariants(direction: Direction, distance: number) {
  const hidden: Variant = { opacity: 0 };
  if (direction === "up") hidden.y = distance;
  if (direction === "down") hidden.y = -distance;
  if (direction === "left") hidden.x = distance;
  if (direction === "right") hidden.x = -distance;

  const visible: Variant = { opacity: 1, y: 0, x: 0 };
  return { hidden, visible };
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 24,
  once = true,
  className,
  ...rest
}: FadeInProps) {
  const { hidden, visible } = getVariants(direction, distance);

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{ hidden, visible }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      {...(rest as MotionProps)}
    >
      {children}
    </motion.div>
  );
}
