"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import TypingText from "./TypingText";
import HeroButtons from "./HeroButtons";
import {
  Code2,
  Briefcase,
  Trophy,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 size={20} />,
  briefcase: <Briefcase size={20} />,
  trophy: <Trophy size={20} />,
  sparkles: <Sparkles size={20} />,
};

const statColors = [
  "from-primary/20 to-primary/5 border-primary/20",
  "from-violet-500/20 to-violet-500/5 border-violet-500/20",
  "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  "from-amber-500/20 to-amber-500/5 border-amber-500/20",
];

const iconColors = [
  "text-primary bg-primary/10",
  "text-violet-400 bg-violet-500/10",
  "text-emerald-400 bg-emerald-500/10",
  "text-amber-400 bg-amber-500/10",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function HeroContent() {
  return (
    <motion.div
      className="flex flex-col gap-7 max-w-2xl"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow */}
      <motion.div variants={item} className="flex items-center gap-2">
        <span className="h-px w-10 bg-primary/60" />
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/80">
          Hey, I&apos;m —
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={item}
        className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] tracking-tight text-white"
        style={{ textShadow: "0 0 80px rgba(108,99,255,0.15)" }}
      >
        {profile.firstName}{" "}
        <span className="gradient-text">{profile.lastName}</span>
      </motion.h1>

      {/* Role typing */}
      <motion.div variants={item} className="text-xl sm:text-2xl text-slate-300 font-display min-h-[2rem]">
        <TypingText />
      </motion.div>

      {/* Bio */}
      <motion.p variants={item} className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
        {profile.bio}
      </motion.p>

      {/* CTA Buttons + Socials */}
      <motion.div variants={item}>
        <HeroButtons />
      </motion.div>

      {/* Stats grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
      >
        {profile.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`flex flex-col gap-3 p-4 rounded-xl border bg-gradient-to-br backdrop-blur-sm ${statColors[i]}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColors[i]}`}>
              {iconMap[stat.icon] ?? <Code2 size={18} />}
            </div>
            <div>
              <div className="font-display font-bold text-xl text-white">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-300">{stat.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{stat.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
