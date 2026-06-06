"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, glow = false, hover = true, padding = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card relative overflow-hidden",
          paddingMap[padding],
          hover && "card-lift cursor-default",
          glow && "glow-primary",
          className
        )}
        {...props}
      >
        {/* Subtle inner gradient */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[16px] opacity-40"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.06) 0%, transparent 50%, rgba(56,189,248,0.03) 100%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
