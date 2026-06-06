import type { SkillGroup } from "@/types/skill";

export const skillGroups: SkillGroup[] = [
  {
    category: "languages",
    label: "Languages",
    icon: "code-2",
    skills: [
      { name: "Python", icon: "python", level: 100, color: "#3776AB" },
      { name: "JavaScript", icon: "javascript", level: 100, color: "#F7DF1E" },
      { name: "C++", icon: "cplusplus", level: 100, color: "#00599C" },
      { name: "TypeScript", icon: "typescript", level: 100, color: "#3178C6" },
    ],
  },
  {
    category: "frontend",
    label: "Frontend",
    icon: "layout",
    skills: [
      { name: "Next.js", icon: "nextdotjs", level: 100, color: "#000000" },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    icon: "server",
    skills: [
      { name: "FastAPI", icon: "fastapi", level: 100, color: "#009688" },
      { name: "Flask", icon: "flask", level: 100, color: "#000000" },
      { name: "Express.js", icon: "express", level: 100, color: "#333333" },
      { name: "Node.js", icon: "nodedotjs", level: 100, color: "#339933" },
      { name: "Django", icon: "django", level: 100, color: "#092E20" },
    ],
  },
  {
    category: "databases",
    label: "Databases",
    icon: "database",
    skills: [
      { name: "MongoDB", icon: "mongodb", level: 100, color: "#47A248" },
      { name: "MySQL", icon: "mysql", level: 100, color: "#4479A1" },
      { name: "PostgreSQL", icon: "postgresql", level: 100, color: "#336791" },
      { name: "Redis", icon: "redis", level: 100, color: "#DC382D" },
    ],
  },
  {
    category: "ai-ml",
    label: "AI / ML",
    icon: "brain",
    skills: [
      { name: "TensorFlow", icon: "tensorflow", level: 100, color: "#FF6F00" },
      { name: "PyTorch", icon: "pytorch", level: 100, color: "#EE4C2C" },
      { name: "Scikit-Learn", icon: "scikitlearn", level: 100, color: "#F7931E" },
      { name: "NumPy", icon: "numpy", level: 100, color: "#013243" },
      { name: "Pandas", icon: "pandas", level: 100, color: "#150458" },
    ],
  },
  {
    category: "devtools",
    label: "DevOps",
    icon: "wrench",
    skills: [
      { name: "Git", icon: "git", level: 100, color: "#F05032" },
      { name: "GitHub", icon: "github", level: 100, color: "#181717" },
      { name: "Vercel", icon: "vercel", level: 100, color: "#000000" },
      { name: "Render", icon: "render", level: 100, color: "#46E3B7" },
      { name: "Canva", icon: "canva", level: 100, color: "#00C4CC" },
    ],
  },
];