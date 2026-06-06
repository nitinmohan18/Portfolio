"use client";

import { useEffect, useRef, useState } from "react";
import { lerp } from "@/lib/utils";

interface MousePosition {
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMouseParallax(strength = 1): MousePosition {
  const [mouse, setMouse] = useState<MousePosition>({
    normalizedX: 0,
    normalizedY: 0,
  });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: ((e.clientX / window.innerWidth) * 2 - 1) * strength,
        y: ((e.clientY / window.innerHeight) * 2 - 1) * strength,
      };
    };

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.05);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.05);
      setMouse({
        normalizedX: currentRef.current.x,
        normalizedY: currentRef.current.y,
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return mouse;
}
