export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'languages'
  | 'databases'
  | 'ai_ml'
  | 'tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  percentage: number;
  icon?: string;
  color?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  icon: string;
  skills: Skill[];
}