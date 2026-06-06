export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string | 'Present';
  description: string;
  highlights: string[];
  logo?: string;
  current: boolean;
}

export const educationData: Education[] = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology — Artificial Intelligence & Machine Learning',
    institution: 'Your University Name',
    location: 'India',
    startYear: '2022',
    endYear: 'Present',
    description:
      'Pursuing a specialized degree in AI & ML with focus on deep learning, computer vision, natural language processing, and intelligent systems design.',
    highlights: [
      'Deep Learning & Neural Networks',
      'Computer Vision',
      'Natural Language Processing',
      'Data Structures & Algorithms',
      'Machine Learning Mathematics',
    ],
    current: true,
  },
  {
    id: 'highschool',
    degree: 'Higher Secondary Education (12th) — Science (PCM)',
    institution: 'Your School Name',
    location: 'India',
    startYear: '2020',
    endYear: '2022',
    description: 'Completed higher secondary education with Physics, Chemistry, and Mathematics.',
    highlights: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    current: false,
  },
];