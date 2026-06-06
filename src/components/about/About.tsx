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
                I&apos;m a passionate <span className="text-white font-medium">AI & Machine Learning student</span> who
                loves turning ideas into real-world solutions. My journey into tech started with
                curiosity about how machines can think — and that curiosity has never stopped.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p>
                I enjoy bridging the gap between cutting-edge AI research and production-ready
                software. Whether it&apos;s building intelligent web apps, training neural networks, or
                crafting elegant UIs — I bring the same level of care and precision to everything I build.
              </p>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p>
                My goal is to work at the intersection of <span className="text-primary font-medium">AI and product engineering</span> —
                creating tools that genuinely improve people&apos;s lives.
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
