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
    degree: "B.Tech (AI & ML)",
    institution: "Sagar Institute of Research and Technology (SIRT), Bhopal",
    location: "Bhopal, India",
    period: "2024 — Present",
    startYear: 2024,
    endYear: null,
    current: true,
    description:
      "Affiliation: RGPV — Rajiv Gandhi Proudyogiki Vishwavidyalaya. Status: Pursuing.",
    highlights: [],
  },
  {
    id: "12th",
    degree: "12th Grade (ISC) | Science — Mathematics",
    institution: "St. Xavier's College Ranchi (Intermediate Section)",
    location: "Bhopal, India",
    period: "2023",
    startYear: 2021,
    endYear: 2023,
    current: false,
    description:
      "Completed higher secondary education. Marks: 71%",
    highlights: [],
  },
  {
    id: "10th",
    degree: "10th Grade",
    institution: "Saraswati Vidya Mandir, Nagar Untari, Garhwa",
    location: "Bhopal, India",
    period: "2021",
    startYear: 2020,
    endYear: 2021,
    current: false,
    description:
      "Completed secondary education. Marks: 95%",
    highlights: [],
  },
];