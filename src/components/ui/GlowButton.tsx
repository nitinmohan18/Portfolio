"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type GlowButtonVariant = "primary" | "outline" | "ghost";
type GlowButtonSize = "sm" | "md" | "lg";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlowButtonVariant;
  size?: GlowButtonSize;
  glow?: boolean;
  href?: string;
}

const variantStyles: Record<GlowButtonVariant, string> = {
  primary:
    "bg-primary text-white border border-primary/30 hover:bg-primary/90 hover:shadow-glow",
  outline:
    "bg-transparent text-white border border-white/15 hover:border-primary/40 hover:bg-white/5",
  ghost:
    "bg-transparent text-slate-300 border border-transparent hover:text-white hover:bg-white/5",
};

const sizeStyles: Record<GlowButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2",
};

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      glow = false,
      href,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "relative inline-flex items-center justify-center rounded-xl font-medium",
      "transition-all duration-300 ease-smooth",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
      "disabled:opacity-50 disabled:pointer-events-none",
      "overflow-hidden glow-button",
      variantStyles[variant],
      sizeStyles[size],
      glow && "animate-pulse-glow",
      className
    );

    if (href) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export default GlowButton;
