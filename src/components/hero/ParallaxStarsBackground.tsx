"use client";

import React, { useMemo, useState, useEffect } from 'react';

// Helper to generate random box shadows, scaled for 5000x4000 area to prevent looping gaps
const generateBoxShadows = (n: number) => {
  let value = `${Math.floor(Math.random() * 5000)}px ${Math.floor(Math.random() * 4000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 5000)}px ${Math.floor(Math.random() * 4000)}px #FFF`;
  }
  return value;
};

export default function ParallaxStarsBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const speed = 1;

  // Scaled up counts for 5000x4000 area (5x the original 2000x2000 area)
  const shadowsSmall = useMemo(() => generateBoxShadows(3500), []);
  const shadowsMedium = useMemo(() => generateBoxShadows(1000), []);
  const shadowsBig = useMemo(() => generateBoxShadows(500), []);

  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 overflow-hidden bg-[#090A0F] pointer-events-none">
        <div 
          className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}
        />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 overflow-hidden bg-[#090A0F] pointer-events-none">
      <style>{`
        .bg-radial-space {
          background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        }
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-4000px); }
        }
      `}</style>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial-space z-0" />

      {/* Stars Layer 1 (Small) */}
      <div 
        className="absolute left-0 top-0 w-[1px] h-[1px] bg-transparent z-10 animate-[animStar_50s_linear_infinite]"
        style={{ 
          boxShadow: shadowsSmall,
          animationDuration: `${50 / speed}s`
        }}
      >
        <div 
          className="absolute top-[4000px] w-[1px] h-[1px] bg-transparent"
          style={{ boxShadow: shadowsSmall }}
        />
      </div>

      {/* Stars Layer 2 (Medium) */}
      <div 
        className="absolute left-0 top-0 w-[2px] h-[2px] bg-transparent z-10 animate-[animStar_100s_linear_infinite]"
        style={{ 
          boxShadow: shadowsMedium,
          animationDuration: `${100 / speed}s`
        }}
      >
        <div 
          className="absolute top-[4000px] w-[2px] h-[2px] bg-transparent"
          style={{ boxShadow: shadowsMedium }}
        />
      </div>

      {/* Stars Layer 3 (Big) */}
      <div 
        className="absolute left-0 top-0 w-[3px] h-[3px] bg-transparent z-10 animate-[animStar_150s_linear_infinite]"
        style={{ 
          boxShadow: shadowsBig,
          animationDuration: `${150 / speed}s`
        }}
      >
        <div 
          className="absolute top-[4000px] w-[3px] h-[3px] bg-transparent"
          style={{ boxShadow: shadowsBig }}
        />
      </div>
    </div>
  );
}
