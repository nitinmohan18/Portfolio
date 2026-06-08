"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Brain, Code2, Rocket, Users } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import AboutCard from "./AboutCard";

const cards = [
  {
    icon: <Brain size={20} />,
    title: "AI & ML Enthusiast",
    description: "Passionate about deep learning, computer vision, and NLP. Actively building projects that combine intelligence with real-world impact.",
    accent: "primary" as const,
  },
  {
    icon: <Code2 size={20} />,
    title: "Full Stack Developer",
    description: "Comfortable across the full stack — from React & Next.js frontends to FastAPI/Node.js backends and cloud deployments.",
    accent: "violet" as const,
  },
  {
    icon: <Rocket size={20} />,
    title: "Continuous Learner",
    description: "Consistently exploring new technologies, contributing to open source, and sharpening problem-solving skills through DSA practice.",
    accent: "accent" as const,
  },
  {
    icon: <Users size={20} />,
    title: "Collaborative Builder",
    description: "I enjoy working on team projects, discussing ideas, and translating complex technical concepts into elegant, user-facing solutions.",
    accent: "emerald" as const,
  },
];

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="About Me"
            title="Crafting Digital "
            highlight="Experiences"
            align="left"
          />

          <div className="flex flex-col gap-5 text-[rgba(255,255,255,0.65)] text-[16px] leading-[1.8]">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                I&apos;m an AI & ML engineering student at Sagar Institute of Research
                and Technology, Bhopal (RGPV). I build production-ready intelligent
                systems — from neural networks to full-stack web applications.
              </p>
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                With a strong mathematical foundation from ISC and hands-on
                experience in Python, deep learning, and modern web frameworks,
                I focus on work that is precise, scalable, and impactful.
              </p>
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Currently seeking internships and collaborations at the intersection
                of AI and product engineering.
              </p>
            </motion.div>
          </div>

          {/* Quick stats */}
          <motion.div 
            initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform" }}
            className="flex flex-wrap gap-6 pt-2"
          >
            <div className="flex flex-col">
              <span className="font-display font-[800] text-[32px] gradient-text leading-none mb-1">
                <AnimatedNumber value={3} />+
              </span>
              <span className="text-[12px] text-[rgba(255,255,255,0.65)] uppercase tracking-[0.1em] font-mono">Years of Learning</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-[800] text-[32px] gradient-text leading-none mb-1">
                <AnimatedNumber value={15} />+
              </span>
              <span className="text-[12px] text-[rgba(255,255,255,0.65)] uppercase tracking-[0.1em] font-mono">Projects Built</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-[800] text-[32px] gradient-text leading-none mb-1">
                AI/ML
              </span>
              <span className="text-[12px] text-[rgba(255,255,255,0.65)] uppercase tracking-[0.1em] font-mono">Primary Focus</span>
            </div>
          </motion.div>
        </div>

        {/* Right — cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <AboutCard key={card.title} {...card} delay={0.1 * i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
