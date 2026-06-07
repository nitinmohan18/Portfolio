"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroVideoBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const currentTilt = useRef({ xPct: 0, yPct: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const inner = innerRef.current;
    if (!inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5);
      const yPct = (e.clientY / window.innerHeight - 0.5);
      currentTilt.current = { xPct, yPct };
      
      gsap.to(inner, {
        x: xPct * -30,
        y: yPct * -20,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      currentTilt.current = { xPct: 0, yPct: 0 };
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleMouseDown = () => {
      const { xPct, yPct } = currentTilt.current;
      gsap.to(inner, {
        x: xPct * -45,
        y: yPct * -30,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const handleMouseUp = () => {
      const { xPct, yPct } = currentTilt.current;
      gsap.to(inner, {
        x: xPct * -30,
        y: yPct * -20,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const xPct = (e.touches[0].clientX / window.innerWidth - 0.5);
      const yPct = (e.touches[0].clientY / window.innerHeight - 0.5);
      currentTilt.current = { xPct, yPct };
      
      gsap.to(inner, {
        x: xPct * -30,
        y: yPct * -20,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleTouchEnd = () => {
      currentTilt.current = { xPct: 0, yPct: 0 };
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 w-[100vw] h-[100vh] z-0 overflow-hidden pointer-events-none"
      style={{ background: "#04080f" }}
    >
      <div
        ref={innerRef}
        className="absolute pointer-events-none"
        style={{
          top: "-50px",
          left: "-50px",
          width: "calc(100vw + 100px)",
          height: "calc(100vh + 100px)",
        }}
      >
        <video
          src="/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
            pointerEvents: 'none',
            filter: 'none',
            opacity: 1,
            backgroundColor: '#04080f',
          }}
        />
        
        {/* Top/Bottom Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.25) 100%)",
          }}
        />

        {/* Left Strip Fill */}
        <div 
          className="absolute top-0 left-0 h-full pointer-events-none"
          style={{
            width: "13%",
            background: "linear-gradient(to right, #04080f 0%, #060c14 40%, rgba(4,8,15,0.6) 75%, rgba(4,8,15,0.0) 100%)",
            zIndex: 2,
          }}
        />

        {/* Right Strip Fill */}
        <div 
          className="absolute top-0 right-0 h-full pointer-events-none"
          style={{
            width: "13%",
            background: "linear-gradient(to left, #04080f 0%, #060c14 40%, rgba(4,8,15,0.6) 75%, rgba(4,8,15,0.0) 100%)",
            zIndex: 2,
          }}
        />

        {/* Left Decorative Line */}
        <div 
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "2px",
            width: "1px",
            height: "80%",
            background: "linear-gradient(to bottom, transparent 0%, rgba(100,160,255,0.08) 20%, rgba(100,160,255,0.15) 50%, rgba(100,160,255,0.08) 80%, transparent 100%)",
            zIndex: 5,
          }}
        />

        {/* Right Decorative Line */}
        <div 
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            right: "2px",
            width: "1px",
            height: "80%",
            background: "linear-gradient(to bottom, transparent 0%, rgba(100,160,255,0.08) 20%, rgba(100,160,255,0.15) 50%, rgba(100,160,255,0.08) 80%, transparent 100%)",
            zIndex: 5,
          }}
        />
      </div>
    </div>
  );
}
