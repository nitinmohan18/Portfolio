export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface SkillGroup {
  category: string;
  label: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "languages",
    label: "Languages",
    skills: [
      { name: "Python", icon: "python", color: "#3776AB" },
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
      { name: "C++", icon: "cplusplus", color: "#00599C" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    ],
  },
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "Next.js", icon: "nextdotjs", color: "#000000" },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "FastAPI", icon: "fastapi", color: "#009688" },
      { name: "Flask", icon: "flask", color: "#000000" },
      { name: "Express.js", icon: "express", color: "#000000" },
      { name: "Node.js", icon: "nodedotjs", color: "#339933" },
      { name: "Django", icon: "django", color: "#092E20" },
    ],
  },
  {
    category: "databases",
    label: "Databases",
    skills: [
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "MySQL", icon: "mysql", color: "#4479A1" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
      { name: "Redis", icon: "redis", color: "#DC382D" },
    ],
  },
  {
    category: "ai_ml",
    label: "AI/ML",
    skills: [
      { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00" },
      { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
      { name: "Scikit-Learn", icon: "scikitlearn", color: "#F7931E" },
      { name: "NumPy", icon: "numpy", color: "#013243" },
      { name: "Pandas", icon: "pandas", color: "#150458" },
    ],
  },
  {
    category: "devops",
    label: "DevOps",
    skills: [
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "GitHub", icon: "github", color: "#181717" },
      { name: "Vercel", icon: "vercel", color: "#000000" },
      { name: "Render", icon: "render", color: "#46E3B7" },
      { name: "Canva", icon: "canva", color: "#00C4CC" },
    ],
  },
];