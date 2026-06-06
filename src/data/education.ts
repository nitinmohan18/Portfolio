export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  startYear: number;
  endYear: number | null;
  description: string;
  highlights: string[];
  current: boolean;
  logo?: string;
}

export const educationData: EducationEntry[] = [
  {
    id: "btech",
    degree: "Bachelor of Technology — Computer Science & Engineering (AI/ML)",
    institution: "University / College Name",
    location: "India",
    period: "2023 — Present",
    startYear: 2023,
    endYear: null,
    current: true,
    description:
      "Pursuing B.Tech in Computer Science with specialization in Artificial Intelligence and Machine Learning. Focused on deep learning, computer vision, NLP, and intelligent systems.",
    highlights: [
      "Core focus: Deep Learning & Neural Networks",
      "Active participant in coding competitions",
      "Building real-world AI/ML projects",
      "Exploring open-source contributions",
    ],
  },
  {
    id: "12th",
    degree: "Higher Secondary Education (12th Grade)",
    institution: "School Name",
    location: "India",
    period: "2021 — 2023",
    startYear: 2021,
    endYear: 2023,
    current: false,
    description:
      "Completed higher secondary education with Physics, Chemistry, and Mathematics. Developed strong analytical foundation for engineering studies.",
    highlights: [
      "Mathematics & Physics specialization",
      "Foundation in logical reasoning",
    ],
  },
];