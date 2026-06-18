import { IconType } from "react-icons";
import { 
  SiPython, SiJavascript, SiCplusplus, SiTypescript, 
  SiHtml5, SiCss, SiNextdotjs, 
  SiFastapi, SiFlask, SiExpress, SiNodedotjs, SiDjango, 
  SiMongodb, SiMysql, SiPostgresql, SiRedis, 
  SiTensorflow, SiPytorch, SiScikitlearn, SiNumpy, SiPandas, 
  SiGit, SiGithub, SiVercel, SiRender 
} from "react-icons/si";

export interface Skill {
  name: string;
  icon: IconType;
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
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    ],
  },
  {
    category: "tools",
    label: "Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#181717" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
    ],
  },
  {
    category: "databases",
    label: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    category: "ai_ml",
    label: "AI/ML",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "NumPy", icon: SiNumpy, color: "#013243" },
      { name: "Pandas", icon: SiPandas, color: "#150458" },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Flask", icon: SiFlask, color: "#000000" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Django", icon: SiDjango, color: "#092E20" },
    ],
  },
];