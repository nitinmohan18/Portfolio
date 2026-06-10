export type SkillCategory =
  | "frontend"
  | "backend"
  | "languages"
  | "databases"
  | "ai-ml"
  | "devtools";

export interface Skill {
  name: string;
  icon: string;
  level?: number; // 0-100
  color: string;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  icon: string;
  skills: Skill[];
}