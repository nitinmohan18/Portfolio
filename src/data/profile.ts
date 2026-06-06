// src/data/profile.ts

import type { Profile } from '@/types/profile';

export const profile: Profile = {
  name: 'Nitin Mohan',
  firstName: 'Nitin',
  lastName: 'Mohan',
  initials: 'NM',
  role: 'AI & Machine Learning Student',
  tagline: 'Building the future at the intersection of intelligence and technology.',
  bio: `I'm a passionate AI & Machine Learning student driven by curiosity and a deep
fascination with how machines learn. I love building intelligent systems, exploring
neural architectures, and turning complex ideas into elegant, working solutions.
My journey is fueled by a commitment to continuous learning and a vision to contribute
meaningfully to the AI revolution.`,
  shortBio: 'AI & ML student exploring intelligent systems, neural networks, and the future of technology.',
  email: 'mohannitin494@gmail.com',
  location: 'India',
  available: true,
  social: {
    github: 'https://github.com/nitinmohan18',
    linkedin: 'https://www.linkedin.com/in/nitin-mohan-9251ab328',
    instagram: 'https://www.instagram.com/nitin__.pandey',
    twitter: 'https://x.com/NitinPandey494',
    email: 'mailto:mohannitin494@gmail.com',
  },
  stats: [
    {
      label: 'Years Learning',
      value: '3+',
      description: 'Consistent learning and building',
      icon: 'code',
    },
    {
      label: 'Projects Completed',
      value: '15+',
      description: 'Real-world projects delivered',
      icon: 'briefcase',
    },
    {
      label: 'Problem Solver',
      value: '5+',
      description: 'DSA and algorithm enthusiast',
      icon: 'trophy',
    },
    {
      label: 'AI/ML Explorer',
      value: 'AI/ML',
      description: 'Exploring the future with AI',
      icon: 'rocket',
    },
  ],
  resumeUrl: null,
  typingRoles: [
    'AI & ML Student',
    'Python Developer',
    'Deep Learning Explorer',
    'Problem Solver',
    'Open Source Contributor',
  ],
};