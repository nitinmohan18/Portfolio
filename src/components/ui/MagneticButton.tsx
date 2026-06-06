"use client";

import { useRef, useCallback, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  strength = 0.3,
  disabled = false,
  className,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      wrapperRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transform = "translate(0px, 0px)";
    wrapperRef.current.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transition = "transform 0.15s ease";
  }, []);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn("inline-flex magnetic-wrapper", className)}
      {...props}
    >
      {children}
    </div>
  );
}
