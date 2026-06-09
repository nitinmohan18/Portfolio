"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Rocket, Users, School, Book, Cpu, Star, Check } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

function IdentityPill({
  icon,
  title,
  color,
  colorRGB,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  colorRGB: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        backgroundColor: `rgba(${colorRGB}, 0.08)`,
        borderColor: `rgba(${colorRGB}, 0.35)`,
        y: -2,
        boxShadow: `0 8px 20px rgba(${colorRGB}, 0.12)`,
        transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
      }}
      whileTap={{
        y: 0,
        scale: 0.97,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 16px",
        borderRadius: "20px",
        background: "rgba(13,16,28,0.8)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        whiteSpace: "nowrap",
      }}
      className="group"
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          background: color,
          opacity: 0.7,
        }}
      />
      <div 
        className="transition-transform duration-300 group-hover:scale-[1.2] group-hover:-rotate-[8deg]"
        style={{ 
          fontSize: "14px", 
          color: color, 
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.5px",
          color: "rgba(210,225,245,0.85)"
        }}
      >
        {title}
      </span>
    </motion.div>
  );
}

const identityCards = [
  { icon: <Brain size={14} />, title: "AI/ML Student", color: "#818cf8", rgb: "129, 140, 248", delay: 0.1 },
  { icon: <Code2 size={14} />, title: "Full-Stack Developer", color: "#38bdf8", rgb: "56, 189, 248", delay: 0.2 },
  { icon: <Rocket size={14} />, title: "Continuous Learner", color: "#f59e0b", rgb: "245, 158, 11", delay: 0.3 },
  { icon: <Users size={14} />, title: "Collaborative Builder", color: "#34d399", rgb: "52, 211, 153", delay: 0.4 },
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
      fullHeight 
      className="flex items-center !pt-[100px] !pb-[100px]"
    >
      <style>{`
        @keyframes dotBeat {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.4); opacity: 1; }
        }

        @keyframes smoothTravel {
          0%   { top: 20px; opacity: 0; transform: scale(0.6); }
          3%   { opacity: 1; transform: scale(1); }
          
          /* Pause at Card 1 (14%) */
          10%  { top: 14%; transform: scale(1.3); }
          25%  { top: 14%; transform: scale(1); }
          
          /* Pause at Card 2 (45%) */
          45%  { top: 45%; transform: scale(1.3); }
          60%  { top: 45%; transform: scale(1); }
          
          /* Pause at Card 3 and stop permanently (81%) */
          85%  { top: 81%; transform: scale(1.3); opacity: 1; }
          100% { top: 81%; transform: scale(1.3); opacity: 1; }
        }

        @keyframes nodeRing {
          0%, 9%  { transform: scale(1); opacity: 0; }
          10%     { transform: scale(1); opacity: 0.8; }
          25%     { transform: scale(2.5); opacity: 0; }
          
          44%     { transform: scale(1); opacity: 0; }
          45%     { transform: scale(1); opacity: 0.8; }
          60%     { transform: scale(2.5); opacity: 0; }
          
          84%     { transform: scale(1); opacity: 0; }
          85%     { transform: scale(1); opacity: 0.8; }
          100%    { transform: scale(2.5); opacity: 0; }
        }

        @keyframes cardBreath {
          0%, 100% { border-color: rgba(129,140,248,0.12); }
          50%      { border-color: rgba(129,140,248,0.28); }
        }

        .edu-card {
          background: rgba(13,16,28,0.75);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          transform: translateX(0) scale(1);
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }

        .group:hover .edu-card {
          border-color: rgba(var(--card-rgb), 0.3);
          background: rgba(var(--card-rgb), 0.04);
          transform: translateX(5px);
        }

        .group:active .edu-card {
          transform: translateX(2px) scale(0.99);
          transition: 0.12s ease;
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

        .card-3-breath {
          animation: cardBreath 3s ease-in-out infinite;
        }
        .group:hover .card-3-breath {
          animation: none;
        }
      `}</style>
      
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center w-full">
        {/* Left — text */}
        <div className="flex flex-col gap-[28px]">
          <SectionHeading
            eyebrow="About Me"
            title="From Logic to "
            highlight="Intelligence"
            align="left"
            className="gap-[12px]"
          />

          <div className="flex flex-col gap-[14px] text-[rgba(255,255,255,0.65)] text-[16px] leading-[1.75]">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                AI & ML engineering student at SIRT Bhopal (RGPV), building 
                production-ready intelligent systems and full-stack web applications.
              </p>
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Strong foundation in Python, deep learning, and modern web 
                frameworks — focused on work that is precise, scalable, and impactful.
              </p>
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Currently seeking internships at the intersection of AI and product 
                engineering.
              </p>
            </motion.div>
          </div>

          {/* 4 Compact Identity Cards */}
          <div className="flex flex-wrap gap-[10px] mt-[32px]">
            {identityCards.map((card) => (
              <IdentityPill 
                key={card.title}
                icon={card.icon}
                title={card.title}
                color={card.color}
                colorRGB={card.rgb}
                delay={card.delay}
              />
            ))}
          </div>
        </div>

        {/* Right — Timeline Cards */}
        <div className="flex flex-col gap-[12px] relative w-full" style={{ maxWidth: "480px" }}>
          {/* Timeline Line */}
          <motion.div 
            className="absolute z-0"
            style={{
              left: "16px",
              width: "1px",
              top: "20px",
              bottom: "-16px",
              background: "linear-gradient(180deg, rgba(52,211,153,0.35) 0%, rgba(56,189,248,0.35) 40%, rgba(129,140,248,0.35) 75%, transparent 100%)",
              transformOrigin: "top"
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Traveling Cap Icon */}
          <motion.div
            className="absolute z-10 flex items-center justify-center opacity-0"
            style={{ 
              left: "9px", // 16px center - 7px
              color: "#64FFDA",
              filter: "drop-shadow(0 0 6px rgba(100,255,218,0.8))"
            }}
            initial={{ animation: "none" }}
            whileInView={{ animation: "smoothTravel 3.5s ease-in-out 0.8s forwards" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <School size={14} />
            <motion.div 
              className="absolute rounded-full border border-[#64FFDA] opacity-0" 
              style={{ width: "14px", height: "14px" }} 
              initial={{ animation: "none" }}
              whileInView={{ animation: "nodeRing 3.5s linear 0.8s forwards" }}
              viewport={{ once: true, margin: "-100px" }}
            />
          </motion.div>

          {educationData.map((item, index) => {
            const isHero = item.active;
            const cardDelay = 0.5 + index * 0.2; // 0.5, 0.7, 0.9

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: cardDelay,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex items-start gap-[16px] relative group w-full cursor-default"
                style={{ 
                  "--card-rgb": item.colorRGB,
                  "--card-color": item.color
                } as React.CSSProperties}
              >
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: cardDelay }}
                  className="w-[8px] h-[8px] rounded-full flex-shrink-0 edu-dot relative z-10 self-center"
                  style={{
                    marginLeft: "12px",
                    background: item.color,
                    border: `2px solid rgba(${item.colorRGB}, 0.3)`,
                  }}
                />
                
                {/* Content Card */}
                <div 
                  className={`flex-1 flex flex-col relative edu-card ${isHero ? 'card-3-breath' : ''}`}
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
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
