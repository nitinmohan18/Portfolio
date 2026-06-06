"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  fullHeight?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className,
  innerClassName,
  fullHeight = false,
  ...rest
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-10 section-padding",
        fullHeight && "min-h-screen",
        className
      )}
      {...rest}
    >
      <div className={cn("container-wide", innerClassName)}>{children}</div>
    </section>
  );
}
