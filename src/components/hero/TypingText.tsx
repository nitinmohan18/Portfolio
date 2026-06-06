"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const ROLES = profile.typingRoles;
const TYPING_SPEED = 80;
const ERASE_SPEED = 40;
const PAUSE_MS = 2000;

export default function TypingText() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pause"), PAUSE_MS);
      }
    } else if (phase === "pause") {
      setPhase("erasing");
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, ERASE_SPEED);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, phase, roleIndex]);

  return (
    <span className="text-primary font-display font-semibold">
      {displayed}
      <span className="animate-cursor border-r-2 border-primary ml-0.5 inline-block h-[1em] align-middle" />
    </span>
  );
}
