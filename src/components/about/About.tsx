"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Code2, School, Book, Cpu, Star, Check } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

const primaryBadges = [
  { icon: <Brain size={14} />, title: "AI/ML Engineer" },
  { icon: <Code2 size={14} />, title: "Full-Stack Developer" }
];

const skillBadges = [
  { title: "Python", color: "#f59e0b", colorRGB: "245, 158, 11" },
  { title: "Deep Learning", color: "#818cf8", colorRGB: "129, 140, 248" },
  { title: "React", color: "#38bdf8", colorRGB: "56, 189, 248" },
  { title: "Problem Solver", color: "#f472b6", colorRGB: "244, 114, 182" },
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
        padding: "100px 80px 60px"
      }}
    >
      <style>{`
        @keyframes dotBeat {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.4); opacity: 1; }
        }

        @keyframes smoothTravel {
          0%   { top: 0%; opacity: 0; transform: scale(0.6); }
          5%   { top: 8%; opacity: 1; transform: scale(1); }
          
          /* Pause at Card 1 */
          15%  { top: 16%; transform: scale(1.3); }
          25%  { top: 16%; transform: scale(1); }
          
          /* Pause at Card 2 */
          45%  { top: 43%; transform: scale(1.3); }
          60%  { top: 43%; transform: scale(1); }
          
          /* Pause at Card 3 and stop permanently */
          85%  { top: 83%; transform: scale(1.3); opacity: 1; }
          100% { top: 83%; transform: scale(1.3); opacity: 1; }
        }

        @keyframes nodeRing {
          0%, 14%, 44%, 84% { transform: scale(1); opacity: 0; border-width: 1px; }
          25%, 60%, 100% { transform: scale(2.5); opacity: 0.6; border-width: 0px; }
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
          background: rgba(15,18,30,0.8);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(180,195,220,0.8);
          padding: 7px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .badge-dark:hover {
          border-color: rgba(var(--badge-rgb), 0.4);
          background: rgba(var(--badge-rgb), 0.06);
          box-shadow: 0 0 12px rgba(var(--badge-rgb), 0.15);
          transform: translateY(-2px);
        }

        .badge-dark:active {
          transform: scale(0.97);
        }

        .badge-accent {
          width: 2px;
          height: 60%;
          border-radius: 1px;
          position: absolute;
          left: 0;
          top: 20%;
        }

        @keyframes smoothTravel {
          0%   { top: 0px; opacity: 0; }
          5%   { top: 30px; opacity: 1; }
          22%  { top: 28%; opacity: 1; }
          28%  { top: 28%; opacity: 1; }
          55%  { top: 62%; opacity: 1; }
          61%  { top: 62%; opacity: 1; }
          100% { top: 92%; opacity: 1; }
        }

        @keyframes nodeRing {
          0%, 15%, 45%, 90% { transform: scale(1); opacity: 0; border-width: 1px; }
          22%, 55%, 100% { transform: scale(2.5); opacity: 0.6; border-width: 0px; }
        }
      `}</style>
      
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center w-full">
        
        {/* Left — text */}
        <div className="flex flex-col pt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ marginBottom: "32px" }}
          >
            <div 
              style={{ 
                marginTop: "-40px",
                marginBottom: "16px",
                fontSize: "13px",
                letterSpacing: "4px",
                color: "rgba(100,255,218,0.5)",
                fontWeight: 700,
                textTransform: "uppercase",
                fontFamily: "monospace"
              }}
            >
              ABOUT ME
            </div>
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
              Building the Future with <span style={{ color: "#64FFDA" }}>AI</span>
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
                AI & ML engineering student at SIRT Bhopal (RGPV), building 
                production-ready intelligent systems and full-stack web applications.
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
                Strong foundation in Python, deep learning, and modern web 
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
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {skillBadges.map((badge, idx) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="badge-dark cursor-default"
                  style={{ "--badge-rgb": badge.colorRGB } as React.CSSProperties}
                >
                  <div className="badge-accent" style={{ background: badge.color }} />
                  {badge.title}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Right — Timeline Cards */}
        <div className="flex flex-col items-stretch relative w-full self-center" style={{ maxWidth: "480px" }}>

          <motion.div 
            className="w-full text-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div 
              style={{
                background: "rgba(13,16,28,0.9)",
                border: "1px solid rgba(100,255,218,0.2)",
                borderRadius: "8px",
                padding: "5px 14px",
                fontSize: "9px",
                letterSpacing: "2.5px",
                color: "rgba(100,255,218,0.6)",
                fontFamily: "monospace",
                display: "inline-block",
                margin: "0 auto"
              }}
            >
              ACADEMIC JOURNEY
            </div>
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
              whileInView={{ animation: "smoothTravel 4s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-[#0d101c] rounded-full p-[4px] relative z-10 flex items-center justify-center">
                <School size={16} />
              </div>
              <motion.div 
                className="absolute rounded-full border border-[#64FFDA] opacity-0 z-0" 
                style={{ width: "24px", height: "24px" }} 
                initial={{ animation: "none" }}
                whileInView={{ animation: "nodeRing 4s linear 0.8s forwards" }}
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
