"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Rocket, Users } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import AboutCard from "./AboutCard";
import FadeIn from "@/components/animations/FadeIn";

const cards = [
  {
    icon: <Brain size={20} />,
    title: "AI & ML Enthusiast",
    description:
      "Passionate about deep learning, computer vision, and NLP. Actively building projects that combine intelligence with real-world impact.",
    accent: "primary",
  },
  {
    icon: <Code2 size={20} />,
    title: "Full Stack Developer",
    description:
      "Comfortable across the full stack — from React & Next.js frontends to FastAPI/Node.js backends and cloud deployments.",
    accent: "violet",
  },
  {
    icon: <Rocket size={20} />,
    title: "Continuous Learner",
    description:
      "Consistently exploring new technologies, contributing to open source, and sharpening problem-solving skills through DSA practice.",
    accent: "accent",
  },
  {
    icon: <Users size={20} />,
    title: "Collaborative Builder",
    description:
      "I enjoy working on team projects, discussing ideas, and translating complex technical concepts into elegant, user-facing solutions.",
    accent: "emerald",
  },
];

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

          <div className="flex flex-col gap-5 text-slate-400 leading-relaxed">
            <FadeIn delay={0.15}>
              <p>
                I&apos;m an AI & ML engineering student at Sagar Institute of Research
                and Technology, Bhopal (RGPV). I build production-ready intelligent
                systems — from neural networks to full-stack web applications.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p>
                With a strong mathematical foundation from ISC and hands-on
                experience in Python, deep learning, and modern web frameworks,
                I focus on work that is precise, scalable, and impactful.
              </p>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p>
                Currently seeking internships and collaborations at the intersection
                of AI and product engineering.
              </p>
            </FadeIn>
          </div>

          {/* Quick stats */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { value: "3+", label: "Years of Learning" },
                { value: "15+", label: "Projects Built" },
                { value: "AI/ML", label: "Primary Focus" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display font-bold text-2xl gradient-text">{s.value}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
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
