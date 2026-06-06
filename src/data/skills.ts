import type { SkillGroup } from "@/types/skill";

export const skillGroups: SkillGroup[] = [
  {
    category: "languages",
    label: "Programming Languages",
    icon: "code-2",
    skills: [
      { name: "Python", icon: "python", level: 85, color: "#3776AB" },
      { name: "TypeScript", icon: "typescript", level: 80, color: "#3178C6" },
      { name: "JavaScript", icon: "javascript", level: 85, color: "#F7DF1E" },
      { name: "C++", icon: "cpp", level: 70, color: "#00599C" },
      { name: "Java", icon: "java", level: 65, color: "#ED8B00" },
    ],
  },
  {
    category: "ai-ml",
    label: "AI / ML",
    icon: "brain",
    skills: [
      { name: "TensorFlow", icon: "tensorflow", level: 75, color: "#FF6F00" },
      { name: "PyTorch", icon: "pytorch", level: 70, color: "#EE4C2C" },
      { name: "scikit-learn", icon: "scikitlearn", level: 80, color: "#F7931E" },
      { name: "NumPy", icon: "numpy", level: 85, color: "#013243" },
      { name: "Pandas", icon: "pandas", level: 85, color: "#150458" },
      { name: "OpenCV", icon: "opencv", level: 65, color: "#5C3EE8" },
    ],
  },
  {
    category: "frontend",
    label: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", icon: "react", level: 82, color: "#61DAFB" },
      { name: "Next.js", icon: "nextjs", level: 78, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: "tailwind", level: 85, color: "#06B6D4" },
      { name: "Three.js", icon: "threejs", level: 65, color: "#FFFFFF" },
      { name: "HTML5", icon: "html", level: 90, color: "#E34F26" },
      { name: "CSS3", icon: "css", level: 88, color: "#1572B6" },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", icon: "nodejs", level: 75, color: "#339933" },
      { name: "FastAPI", icon: "fastapi", level: 72, color: "#009688" },
      { name: "Express.js", icon: "express", level: 70, color: "#FFFFFF" },
      { name: "REST APIs", icon: "api", level: 80, color: "#6C63FF" },
    ],
  },
  {
    category: "databases",
    label: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", level: 70, color: "#336791" },
      { name: "MongoDB", icon: "mongodb", level: 72, color: "#47A248" },
      { name: "MySQL", icon: "mysql", level: 68, color: "#4479A1" },
      { name: "Firebase", icon: "firebase", level: 65, color: "#FFCA28" },
    ],
  },
  {
    category: "devtools",
    label: "Developer Tools",
    icon: "wrench",
    skills: [
      { name: "Git", icon: "git", level: 85, color: "#F05032" },
      { name: "GitHub", icon: "github", level: 85, color: "#FFFFFF" },
      { name: "Docker", icon: "docker", level: 60, color: "#2496ED" },
      { name: "VS Code", icon: "vscode", level: 95, color: "#007ACC" },
      { name: "Linux", icon: "linux", level: 70, color: "#FCC624" },
      { name: "Jupyter", icon: "jupyter", level: 85, color: "#F37626" },
    ],
  },
];