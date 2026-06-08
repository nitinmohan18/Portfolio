"use client";

import React, { useMemo, useState, useEffect } from 'react';

// Helper to generate shadows with variable opacities/colors for more depth
const generateCinematicBoxShadows = (n: number, colorBase: string = '255, 255, 255') => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px rgba(${colorBase}, ${Math.random() * 0.8 + 0.2})`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px rgba(${colorBase}, ${Math.random() * 0.8 + 0.2})`;
  }
  return value;
};

export default function ParallaxStarsBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // Animation speed multiplier
  const speed = 1.2;

  // Layer 1: Tiny, dense, dim stars (far background)
  const shadowsSmall = useMemo(() => generateCinematicBoxShadows(1200, '200, 220, 255'), []);
  
  // Layer 2: Medium, less dense, slightly brighter stars (mid-ground)
  const shadowsMedium = useMemo(() => generateCinematicBoxShadows(400, '220, 230, 255'), []);
  
  // Layer 3: Large, sparse, bright stars (foreground)
  const shadowsBig = useMemo(() => generateCinematicBoxShadows(150, '255, 255, 255'), []);

  // Layer 4: Twinkling stars (static position, pulsing opacity)
  const shadowsTwinkle = useMemo(() => generateCinematicBoxShadows(150, '255, 240, 220'), []);

  // Second twinkle layer
  const shadowsTwinkle2 = useMemo(() => generateCinematicBoxShadows(50, '255, 255, 255'), []);

  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 overflow-hidden bg-[#02040a] pointer-events-none">
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom, #0a1128 0%, #02040a 100%)' }}
        />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 overflow-hidden bg-[#02040a] pointer-events-none">
      <style>{`
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulseNebula {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>

      {/* Base Space Background with Faint Blue/Purple Atmosphere */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, #0a1128 0%, #02040a 100%)'
        }}
      />

      {/* Subtle Nebula Glows */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0 animate-[pulseNebula_20s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, rgba(40,20,80,0.5) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[80%] rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0 animate-[pulseNebula_25s_ease-in-out_infinite_reverse]"
        style={{ background: 'radial-gradient(circle, rgba(20,50,90,0.4) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0 animate-[pulseNebula_30s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle, rgba(60,30,70,0.3) 0%, transparent 60%)' }}
      />

      {/* Stars Layer 1 (Small) */}
      <div 
        className="absolute left-0 top-0 w-[1px] h-[1px] bg-transparent z-10 pointer-events-none animate-[animStar_100s_linear_infinite]"
        style={{ boxShadow: shadowsSmall, animationDuration: `${100 / speed}s` }}
      >
        <div className="absolute top-[2000px] w-[1px] h-[1px] bg-transparent pointer-events-none" style={{ boxShadow: shadowsSmall }} />
      </div>

      {/* Stars Layer 2 (Medium) */}
      <div 
        className="absolute left-0 top-0 w-[2px] h-[2px] bg-transparent z-10 pointer-events-none animate-[animStar_150s_linear_infinite]"
        style={{ boxShadow: shadowsMedium, animationDuration: `${150 / speed}s` }}
      >
        <div className="absolute top-[2000px] w-[2px] h-[2px] bg-transparent pointer-events-none" style={{ boxShadow: shadowsMedium }} />
      </div>

      {/* Stars Layer 3 (Big) */}
      <div 
        className="absolute left-0 top-0 w-[3px] h-[3px] bg-transparent z-10 pointer-events-none animate-[animStar_200s_linear_infinite]"
        style={{ boxShadow: shadowsBig, borderRadius: '50%', animationDuration: `${200 / speed}s` }}
      >
        <div className="absolute top-[2000px] w-[3px] h-[3px] bg-transparent pointer-events-none" style={{ boxShadow: shadowsBig, borderRadius: '50%' }} />
      </div>

      {/* Twinkling Stars Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div 
          className="absolute left-0 top-0 w-[2px] h-[2px] bg-transparent pointer-events-none animate-[twinkle_4s_ease-in-out_infinite]"
          style={{ boxShadow: shadowsTwinkle, borderRadius: '50%' }}
        />
        <div 
          className="absolute left-0 top-0 w-[3px] h-[3px] bg-transparent pointer-events-none animate-[twinkle_5s_ease-in-out_infinite_reverse]"
          style={{ boxShadow: shadowsTwinkle2, borderRadius: '50%' }}
        />
      </div>

      {/* Depth Fog Effect (Vignette & Bottom Fade) */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(2,4,10,0.85) 100%), linear-gradient(to bottom, transparent 70%, rgba(2,4,10,0.95) 100%)'
        }}
      />
    </div>
  );
}
