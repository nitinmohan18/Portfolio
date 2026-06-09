"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Code2, School, Book, Cpu, Star, Check, Sparkles } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

const primaryBadges = [
  { icon: <Brain size={14} />, title: "AI/ML Engineer" },
  { icon: <Code2 size={14} />, title: "Full-Stack Developer" }
];

const skillBadges = [
  { title: "Python", color: "#f59e0b", colorRGB: "245, 158, 11" },
  { title: "Deep Learning", color: "#818cf8", colorRGB: "129, 140, 248" },
  { title: "React", color: "#38bdf8", colorRGB: "56, 189, 248" },
  { title: "Generative AI", color: "#f472b6", colorRGB: "244, 114, 182" },
  { title: "Collaborative Builder", color: "#34d399", colorRGB: "52, 211, 153" }
];

const educationData = [
  {
    label: "SECONDARY EDUCATION",
    icon: <School size={12} />,
    degree: "Class X — Matriculation",
    school: "Saraswati Vidya Mandir, Nagar Untari",
    location: "Garhwa, Jharkhand",
    badge: "Completed · 2021",
    scoreText: "95% Score",
    scoreIcon: <Star size={10} />,
    color: "#34d399",
    colorRGB: "52, 211, 153"
  },
  {
    label: "HIGHER SECONDARY",
    icon: <Book size={12} />,
    degree: "Class XII — ISC (PCM)",
    school: "St. Xavier's College",
    location: "Ranchi, Jharkhand",
    badge: "Completed · 2023",
    scoreText: "71% Score",
    scoreIcon: <Check size={10} />,
    color: "#38bdf8",
    colorRGB: "56, 189, 248"
  },
  {
    label: "CURRENT — UNDERGRADUATE",
    icon: <Cpu size={12} />,
    degree: "B.Tech — AI & Machine Learning",
    school: "SIRT Bhopal (RGPV)",
    location: "Bhopal, Madhya Pradesh",
    badge: "Current · 2024–2028",
    scoreText: "Pursuing",
    color: "#818cf8",
    colorRGB: "129, 140, 248",
    active: true
  }
];

export default function About() {
  return (
    <SectionWrapper 
      id="about" 
      fullHeight={false}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "100px 80px 60px",
        position: "relative"
      }}
    >
      <style>{`
        @keyframes dotBeat {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.4); opacity: 1; }
        }

        @keyframes smoothTravel {
          0%   { top: 0%;   opacity: 0; transform: scale(0.6); }
          8%   { top: 0%;   opacity: 1; transform: scale(1); }
          
          /* Stop exactly at Card 1 node */
          30%  { top: 16%;  transform: scale(1.3); }
          40%  { top: 16%;  transform: scale(1); }
          
          /* Stop exactly at Card 2 node */
          62%  { top: 46%;  transform: scale(1.3); }
          72%  { top: 46%;  transform: scale(1); }
          
          /* Stop at Card 3 node */
          90%  { top: 83%;  transform: scale(1.3); opacity: 1; }
          95%  { top: 83%;  transform: scale(1); }
          100% { top: 83%;  opacity: 0; }
        }

        @keyframes nodeRing {
          0%, 29%, 61%, 89% { transform: scale(1); opacity: 0; border-width: 1px; }
          40%, 72%, 100% { transform: scale(2.5); opacity: 0.6; border-width: 0px; }
        }

        @keyframes nodePulse {
          0%, 100% { box-shadow: 0 0 4px rgba(var(--card-rgb),0.4); }
          50%      { box-shadow: 0 0 10px rgba(var(--card-rgb),0.8); }
        }

        @keyframes borderGlow {
          0%, 100% { border-color: rgba(129,140,248,0.15); }
          50%      { border-color: rgba(129,140,248,0.35); }
        }

        .edu-card {
          background: rgba(13,16,28,0.75);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          transform: translateY(0) scale(1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }

        .group:hover .edu-card {
          border-color: rgba(var(--card-rgb), 0.35);
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 12px 32px rgba(0,0,0,0.35), inset 0 0 20px rgba(var(--card-rgb),0.03);
        }

        .top-accent {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .group:hover .top-accent {
          opacity: 1;
        }

        .edu-dot {
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          animation: nodePulse 2.5s ease-in-out infinite;
        }
        .group:hover .edu-dot {
          transform: scale(1.5);
          background: var(--card-color) !important;
        }

        .score-badge {
          transition: all 0.25s ease;
        }
        .group:hover .score-badge {
          background: rgba(var(--card-rgb), 0.14) !important;
          border-color: rgba(var(--card-rgb), 0.35) !important;
        }

        .card-3-glow {
          animation: borderGlow 3s ease-in-out infinite;
        }
        .group:hover .card-3-glow {
          animation: none;
        }

        @keyframes shimmer {
          0%   { left: -60%; }
          100% { left: 160%; }
        }

        .badge-primary {
          background: rgba(100,255,218,0.06);
          border: 1px solid rgba(100,255,218,0.2);
          color: rgba(100,255,218,0.9);
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .badge-primary::after {
          content: "";
          background: linear-gradient(90deg, transparent, rgba(100,255,218,0.12), transparent);
          width: 60%;
          height: 100%;
          position: absolute;
          top: 0;
          left: -60%;
          animation: shimmer 3s ease-in-out infinite;
        }

        .badge-primary:hover {
          background: rgba(100,255,218,0.12);
          border-color: rgba(100,255,218,0.5);
          box-shadow: 0 0 16px rgba(100,255,218,0.2), inset 0 0 12px rgba(100,255,218,0.05);
          transform: translateY(-2px) scale(1.03);
        }

        .badge-primary:active {
          transform: scale(0.97);
          transition: 0.12s ease;
        }

        .badge-dark {
          background: rgba(13,16,28,0.6);
          border: 1px solid rgba(var(--badge-rgb), 0.15);
          color: rgba(220,230,255,0.85);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 0 10px rgba(var(--badge-rgb), 0.03);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .badge-dark:hover {
          border-color: rgba(var(--badge-rgb), 0.5);
          background: rgba(var(--badge-rgb), 0.08);
          color: #ffffff;
          box-shadow: 0 0 20px rgba(var(--badge-rgb), 0.2), inset 0 0 15px rgba(var(--badge-rgb), 0.08);
          transform: translateY(-3px) scale(1.02);
        }

        .badge-dark:active {
          transform: scale(0.97);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 8px var(--card-color), 0 0 12px var(--card-color);
          animation: pulseDot 3s infinite alternate;
        }

        @keyframes pulseDot {
          0% { opacity: 0.6; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes smoothTravel {
          0%   { top: 0px;  opacity: 0; transform: scale(0.8); }
          4%   { top: 0px;  opacity: 1; transform: scale(1); }

          20%  { top: 18%;  opacity: 1; transform: scale(1); }
          26%  { top: 18%;  opacity: 1; transform: scale(1.4); }
          33%  { top: 18%;  opacity: 1; transform: scale(1); }

          48%  { top: 46%;  opacity: 1; transform: scale(1); }
          54%  { top: 46%;  opacity: 1; transform: scale(1.4); }
          61%  { top: 46%;  opacity: 1; transform: scale(1); }

          80%  { top: 83%;  opacity: 1; transform: scale(1); }
          86%  { top: 83%;  opacity: 1; transform: scale(1.4); }
          93%  { top: 83%;  opacity: 1; transform: scale(1); }

          100% { top: 92%;  opacity: 1; transform: scale(1); }
        }

        @keyframes nodeRing {
          0%, 19%, 47%, 79%  { transform: scale(1);   opacity: 0;   border-width: 1px; }
          33%                { transform: scale(2.5); opacity: 0.6; border-width: 0px; }
          61%                { transform: scale(2.5); opacity: 0.6; border-width: 0px; }
          93%, 100%          { transform: scale(2.5); opacity: 0.6; border-width: 0px; }
        }

        @keyframes endPulseRing {
          0%   { transform: scale(1); opacity: 0.8; border-width: 1px; }
          100% { transform: scale(2.5); opacity: 0; border-width: 0px; }
        }
      `}</style>
      
      <motion.div 
        className="absolute w-full text-center z-10"
        style={{ top: "-80px", left: 0 }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 
          style={{ 
            fontSize: "22px",
            letterSpacing: "8px",
            color: "#ffffff",
            fontWeight: 900,
            textTransform: "uppercase",
            fontFamily: "monospace",
            margin: 0,
            display: "inline-block",
            position: "relative",
            textShadow: "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2)"
          }}
        >
          ABOUT ME
        </h3>
      </motion.div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center w-full mt-8">
        
        {/* Left — text */}
        <div className="flex flex-col pt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ marginBottom: "32px" }}
          >
            <h2 
              style={{ 
                margin: 0, 
                fontSize: "clamp(32px, 4vw, 52px)", 
                fontWeight: "bold", 
                letterSpacing: "-0.02em", 
                lineHeight: 1.1, 
                color: "white" 
              }}
            >
              AI & ML Student | <span style={{ color: "#64FFDA" }}>Full-Stack Developer</span>
            </h2>
          </motion.div>

          {/* Bio paragraphs */}
          <div className="flex flex-col gap-0 text-[rgba(255,255,255,0.65)] text-[16px] leading-[1.75]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ marginBottom: "16px" }}
            >
              <p>
                AI & Machine Learning student at SIRT Bhopal focused on generative AI, machine learning, intelligent automation, and scalable web applications.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ marginBottom: "16px" }}
            >
              <p>
                Strong foundation in Python, machine learning, deep learning, and modern web 
                frameworks — focused on work that is precise, scalable, and impactful.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ marginBottom: "28px" }}
            >
              <p>
                Currently seeking internships at the intersection of AI and product 
                engineering.
              </p>
            </motion.div>
          </div>

          {/* Badge Rows */}
          <div className="flex flex-col">
            {/* Primary Badges */}
            <div className="flex flex-wrap" style={{ gap: "10px", marginBottom: "10px" }}>
              {primaryBadges.map((badge, idx) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx === 0 ? 0.6 : 0.75, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center gap-[6px] badge-primary cursor-default"
                >
                  <span style={{ display: "flex", color: "rgba(100,255,218,0.9)" }}>{badge.icon}</span>
                  {badge.title}
                </motion.div>
              ))}
            </div>

            {/* Skill Badges Row */}
            <div className="flex flex-wrap" style={{ gap: "10px" }}>
              {skillBadges.map((badge, idx) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="badge-dark cursor-default"
                  style={{ 
                    "--badge-rgb": badge.colorRGB,
                    "--card-color": badge.color 
                  } as React.CSSProperties}
                >
                  <div className="badge-dot" style={{ background: badge.color }} />
                  {badge.title}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Right — Timeline Cards */}
        <div className="flex flex-col items-stretch relative w-full self-center" style={{ maxWidth: "480px" }}>

          <motion.div 
            className="w-full flex justify-center mb-10"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 24px rgba(100,255,218,0.4), inset 0 0 12px rgba(100,255,218,0.1)",
                borderColor: "rgba(100,255,218,0.8)"
              }}
              className="relative overflow-hidden cursor-default group flex items-center gap-3"
              style={{
                background: "linear-gradient(90deg, rgba(13,16,28,0.95), rgba(20,25,40,0.95))",
                border: "1px solid rgba(100,255,218,0.3)",
                borderRadius: "12px",
                padding: "10px 24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(100,255,218,0.1), transparent)",
                  transform: "skewX(-20deg)",
                  animation: "shimmer 2s infinite"
                }}
              />
              
              <Sparkles size={16} className="text-[#64FFDA]" style={{ filter: "drop-shadow(0 0 8px rgba(100,255,218,0.8))" }} />
              
              <span 
                style={{
                  fontSize: "13px",
                  letterSpacing: "3.5px",
                  color: "#64FFDA",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  textShadow: "0 0 10px rgba(100,255,218,0.5)"
                }}
              >
                ACADEMIC JOURNEY
              </span>
            </motion.div>
          </motion.div>

          {/* Wrapper for exactly the timeline threads and cards */}
          <div className="relative w-full flex flex-col items-stretch">
            
            {/* Continuous Left Timeline Line */}
            <motion.div 
              className="absolute z-0"
              style={{
                left: "-30px", // 30px left of the cards
                width: "2px",
                top: "0px", // Starts exactly at the first thread
                bottom: "0px", // Ends exactly at the bottom of the last card
                background: "linear-gradient(180deg, rgba(52,211,153,0.6) 0%, rgba(56,189,248,0.6) 40%, rgba(129,140,248,0.6) 80%, transparent 100%)",
                boxShadow: "0 0 8px rgba(100,255,218,0.2)",
                transformOrigin: "top"
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Traveling Cap Icon on the Left Line */}
            <motion.div
              className="absolute z-20 flex items-center justify-center opacity-0"
              style={{ 
                left: "-37px", 
                marginTop: "-12px", // Center on coordinate
                color: "#64FFDA",
                filter: "drop-shadow(0 0 6px rgba(100,255,218,0.8))"
              }}
              initial={{ animation: "none" }}
              whileInView={{ animation: "smoothTravel 5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-[#0d101c] rounded-full p-[4px] relative z-10 flex items-center justify-center">
                <School size={16} />
              </div>
              <motion.div 
                className="absolute rounded-full border border-[#64FFDA] opacity-0 z-0" 
                style={{ width: "24px", height: "24px" }} 
                initial={{ animation: "none" }}
                whileInView={{ animation: "nodeRing 5s linear 0.8s forwards" }}
                viewport={{ once: true, margin: "-100px" }}
              />
              <motion.div 
                className="absolute rounded-full border border-[#64FFDA] opacity-0 z-0" 
                style={{ width: "24px", height: "24px" }} 
                initial={{ animation: "none" }}
                whileInView={{ animation: "endPulseRing 2s ease-out 5.8s infinite" }}
                viewport={{ once: true, margin: "-100px" }}
              />
            </motion.div>

            {educationData.map((item, index) => {
            const isHero = item.active;
            const cardDelay = 0.5 + index * 0.2; // 0.5, 0.7, 0.9

            let threadHeight = "20px";
            let threadGradient = "linear-gradient(180deg, rgba(100,255,218,0.5), rgba(52,211,153,0.3))";
            
            if (index === 1) {
              threadHeight = "16px";
              threadGradient = "linear-gradient(180deg, rgba(52,211,153,0.3), rgba(56,189,248,0.3))";
            } else if (index === 2) {
              threadHeight = "16px";
              threadGradient = "linear-gradient(180deg, rgba(56,189,248,0.3), rgba(129,140,248,0.3))";
            }

            return (
              <React.Fragment key={item.label}>
                <motion.div 
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: cardDelay - 0.1 }}
                  style={{
                    width: "1px",
                    height: threadHeight,
                    background: threadGradient,
                    alignSelf: "center",
                    flexShrink: 0,
                    transformOrigin: "top"
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: cardDelay,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex items-start w-full relative group cursor-default"
                  style={{ 
                    "--card-rgb": item.colorRGB,
                    "--card-color": item.color
                  } as React.CSSProperties}
                >
                  {/* Left Side Dot Wrapper */}
                  <div 
                    className="absolute z-10 flex items-center justify-center" 
                    style={{ 
                      left: "-34px", // -30px + 1px center - 5px radius wrapper
                      top: "50%", 
                      transform: "translateY(-50%)", 
                      width: "10px", 
                      height: "10px" 
                    }}
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: cardDelay }}
                      className="w-[8px] h-[8px] rounded-full edu-dot"
                      style={{
                        background: item.color,
                        border: `2px solid rgba(${item.colorRGB}, 0.3)`,
                        animationDelay: `${index * 0.4}s`
                      }}
                    />
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`flex-1 flex flex-col relative edu-card ${isHero ? 'card-3-glow' : ''}`}
                    style={{ width: "100%" }}
                  >
                  {/* Top Accent Line */}
                  <div 
                    className="top-accent"
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, ${item.color}, transparent)`,
                      borderRadius: "2px 2px 0 0"
                    }}
                  />

                  {/* Corner Radial Glow */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-30px", right: "-30px",
                      width: "100px", height: "100px",
                      borderRadius: "50%",
                      filter: "blur(30px)",
                      opacity: 0.07,
                      pointerEvents: "none",
                      background: item.color
                    }}
                  />

                  {/* Top Row: Left Info + Right Badge */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-[6px] mb-[6px]">
                        <div style={{ color: item.color }}>{item.icon}</div>
                        <span 
                          className="font-mono uppercase"
                          style={{
                            fontSize: "8px",
                            letterSpacing: "2px",
                            color: `rgba(${item.colorRGB}, 0.6)`
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      
                      <h4 
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "rgba(225,235,255,0.9)",
                          marginBottom: "4px"
                        }}
                      >
                        {item.degree}
                      </h4>
                      
                      <div 
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "rgba(185,200,225,0.82)",
                          marginBottom: "2px"
                        }}
                      >
                        {item.school}
                      </div>
                      
                      <div style={{ fontSize: "10px", color: "rgba(120,140,170,0.55)" }}>
                        {item.location}
                      </div>
                    </div>

                    {/* Top-Right Year Badge */}
                    <div
                      className="flex-shrink-0"
                      style={{
                        background: `rgba(${item.colorRGB}, ${isHero ? 0.1 : 0.08})`,
                        border: `1px solid rgba(${item.colorRGB}, ${isHero ? 0.3 : 0.2})`,
                        color: `rgba(${item.colorRGB}, ${isHero ? 0.9 : 0.8})`,
                        borderRadius: "20px",
                        padding: "3px 10px",
                        fontSize: "10px",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      {isHero && (
                        <span 
                          className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                          style={{ background: "#818cf8", animation: "dotBeat 1.8s ease-in-out infinite" }}
                        />
                      )}
                      {item.badge}
                    </div>
                  </div>
                  
                  {/* Middle Row: Score/Status Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: cardDelay + 0.2 }}
                  >
                    <span 
                      className="inline-flex items-center gap-[5px] score-badge"
                      style={{
                        marginTop: "4px",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        fontWeight: 600,
                        background: `rgba(${item.colorRGB}, 0.08)`,
                        border: `1px solid rgba(${item.colorRGB}, 0.2)`,
                        color: isHero ? item.color : `rgba(${item.colorRGB}, 0.9)`
                      }}
                    >
                      {isHero ? (
                        <>
                          <span 
                            className="w-[5px] h-[5px] rounded-full flex-shrink-0" 
                            style={{ background: item.color, animation: 'dotBeat 1.8s ease-in-out infinite' }}
                          />
                          {item.scoreText}
                        </>
                      ) : (
                        <>
                          {item.scoreIcon}
                          {item.scoreText}
                        </>
                      )}
                    </span>
                  </motion.div>

                  {/* Bottom Row: Focus Areas (Hero Only) */}
                  {isHero && (
                    <div 
                      style={{ 
                        marginTop: "8px",
                        borderTop: "1px solid rgba(129,140,248,0.1)",
                        paddingTop: "8px"
                      }}
                    >
                      <div
                        style={{
                          fontSize: "8px",
                          letterSpacing: "2px",
                          color: "rgba(129,140,248,0.5)",
                          fontFamily: "monospace",
                          marginBottom: "6px"
                        }}
                      >
                        FOCUS AREAS
                      </div>
                      <div 
                        className="flex flex-row flex-wrap gap-[6px]"
                      >
                        {["Machine Learning", "Deep Learning", "Full-Stack Dev"].map((pill, idx) => (
                          <motion.span
                            key={pill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 1.1 + idx * 0.08 }}
                            style={{
                              padding: "2px 8px",
                              borderRadius: "8px",
                              fontSize: "9px",
                              background: "rgba(129,140,248,0.07)",
                              border: "1px solid rgba(129,140,248,0.15)",
                              color: "rgba(180,190,220,0.75)",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {pill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              </React.Fragment>
            );
          })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
