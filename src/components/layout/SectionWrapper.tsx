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
        "relative overflow-hidden isolate py-[100px] md:py-[140px] bg-transparent",
        fullHeight && "min-h-screen",
        className
      )}
      {...rest}
    >
      <div className={cn("container-wide relative z-10", innerClassName)}>{children}</div>
    </section>
  );
}
