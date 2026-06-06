import type { SkillGroup } from '@/types/skill';

export const skillGroups: SkillGroup[] = [
  {
    category: 'languages',
    label: 'Programming Languages',
    icon: 'code-2',
    skills: [
      { id: 'python', name: 'Python', category: 'languages', level: 'advanced', percentage: 85, color: '#3776AB' },
      { id: 'javascript', name: 'JavaScript', category: 'languages', level: 'intermediate', percentage: 70, color: '#F7DF1E' },
      { id: 'typescript', name: 'TypeScript', category: 'languages', level: 'intermediate', percentage: 65, color: '#3178C6' },
      { id: 'cpp', name: 'C++', category: 'languages', level: 'intermediate', percentage: 60, color: '#00599C' },
      { id: 'java', name: 'Java', category: 'languages', level: 'beginner', percentage: 50, color: '#ED8B00' },
    ],
  },
  {
    category: 'ai_ml',
    label: 'AI / ML',
    icon: 'brain',
    skills: [
      { id: 'tensorflow', name: 'TensorFlow', category: 'ai_ml', level: 'intermediate', percentage: 70, color: '#FF6F00' },
      { id: 'pytorch', name: 'PyTorch', category: 'ai_ml', level: 'intermediate', percentage: 65, color: '#EE4C2C' },
      { id: 'sklearn', name: 'Scikit-Learn', category: 'ai_ml', level: 'advanced', percentage: 80, color: '#F89939' },
      { id: 'numpy', name: 'NumPy', category: 'ai_ml', level: 'advanced', percentage: 82, color: '#013243' },
      { id: 'pandas', name: 'Pandas', category: 'ai_ml', level: 'advanced', percentage: 80, color: '#150458' },
      { id: 'opencv', name: 'OpenCV', category: 'ai_ml', level: 'intermediate', percentage: 65, color: '#5C3EE8' },
    ],
  },
  {
    category: 'frontend',
    label: 'Frontend',
    icon: 'layout',
    skills: [
      { id: 'react', name: 'React', category: 'frontend', level: 'intermediate', percentage: 70, color: '#61DAFB' },
      { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 'intermediate', percentage: 65, color: '#FFFFFF' },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 'advanced', percentage: 80, color: '#06B6D4' },
      { id: 'html', name: 'HTML5', category: 'frontend', level: 'advanced', percentage: 85, color: '#E34F26' },
      { id: 'css', name: 'CSS3', category: 'frontend', level: 'advanced', percentage: 80, color: '#1572B6' },
    ],
  },
  {
    category: 'backend',
    label: 'Backend',
    icon: 'server',
    skills: [
      { id: 'nodejs', name: 'Node.js', category: 'backend', level: 'intermediate', percentage: 65, color: '#339933' },
      { id: 'fastapi', name: 'FastAPI', category: 'backend', level: 'intermediate', percentage: 68, color: '#009688' },
      { id: 'flask', name: 'Flask', category: 'backend', level: 'intermediate', percentage: 70, color: '#FFFFFF' },
      { id: 'express', name: 'Express.js', category: 'backend', level: 'beginner', percentage: 55, color: '#FFFFFF' },
    ],
  },
  {
    category: 'databases',
    label: 'Databases',
    icon: 'database',
    skills: [
      { id: 'mongodb', name: 'MongoDB', category: 'databases', level: 'intermediate', percentage: 68, color: '#47A248' },
      { id: 'postgresql', name: 'PostgreSQL', category: 'databases', level: 'intermediate', percentage: 62, color: '#336791' },
      { id: 'mysql', name: 'MySQL', category: 'databases', level: 'intermediate', percentage: 65, color: '#4479A1' },
      { id: 'firebase', name: 'Firebase', category: 'databases', level: 'beginner', percentage: 50, color: '#FFCA28' },
    ],
  },
  {
    category: 'tools',
    label: 'Developer Tools',
    icon: 'wrench',
    skills: [
      { id: 'git', name: 'Git', category: 'tools', level: 'advanced', percentage: 80, color: '#F05032' },
      { id: 'github', name: 'GitHub', category: 'tools', level: 'advanced', percentage: 80, color: '#FFFFFF' },
      { id: 'docker', name: 'Docker', category: 'tools', level: 'beginner', percentage: 45, color: '#2496ED' },
      { id: 'vscode', name: 'VS Code', category: 'tools', level: 'expert', percentage: 90, color: '#007ACC' },
      { id: 'jupyter', name: 'Jupyter', category: 'tools', level: 'advanced', percentage: 82, color: '#F37626' },
      { id: 'linux', name: 'Linux', category: 'tools', level: 'intermediate', percentage: 65, color: '#FCC624' },
    ],
  },
];