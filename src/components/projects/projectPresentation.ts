import type { GithubRepo } from "@/types/project";

export type ProjectProfile = {
  label: string;
  accent: string;
  accentRgb: string;
  signal: string;
};

export type ProjectPresentation = {
  title: string;
  description: string;
  profile: ProjectProfile;
  status: string;
  stack: string[];
  achievements: string[];
  updatedLabel: string;
  repoName: string;
};

const profiles: ProjectProfile[] = [
  {
    label: "AI Product",
    accent: "#60a5fa",
    accentRgb: "96, 165, 250",
    signal: "Model-driven workflow",
  },
  {
    label: "Full-stack App",
    accent: "#34d399",
    accentRgb: "52, 211, 153",
    signal: "End-to-end product build",
  },
  {
    label: "Developer Tool",
    accent: "#a78bfa",
    accentRgb: "167, 139, 250",
    signal: "Workflow acceleration",
  },
  {
    label: "Data System",
    accent: "#f59e0b",
    accentRgb: "245, 158, 11",
    signal: "Insight and automation layer",
  },
  {
    label: "Web Experience",
    accent: "#38bdf8",
    accentRgb: "56, 189, 248",
    signal: "Interactive interface",
  },
];

const technologyLabels: Record<string, string> = {
  ai: "AI",
  ml: "ML",
  "machine-learning": "Machine Learning",
  deeplearning: "Deep Learning",
  "deep-learning": "Deep Learning",
  genai: "Generative AI",
  "generative-ai": "Generative AI",
  llm: "LLM",
  nlp: "NLP",
  nextjs: "Next.js",
  "next-js": "Next.js",
  reactjs: "React",
  tailwindcss: "Tailwind CSS",
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  nodejs: "Node.js",
  expressjs: "Express",
  mongodb: "MongoDB",
};

function titleCaseToken(token: string) {
  if (!token) return "";
  const known = technologyLabels[token.toLowerCase()];
  if (known) return known;
  return token
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatRepoTitle(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => titleCaseToken(part))
    .join(" ");
}

function getProfile(repo: GithubRepo): ProjectProfile {
  const haystack = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${repo.topics.join(" ")}`.toLowerCase();

  if (/(ai|ml|machine|deep|neural|model|llm|nlp|genai|tensorflow|pytorch)/.test(haystack)) {
    return profiles[0];
  }

  if (/(fullstack|full-stack|mern|next|react|node|express|mongo|firebase|api)/.test(haystack)) {
    return profiles[1];
  }

  if (/(cli|tool|automation|script|utility|package|extension)/.test(haystack)) {
    return profiles[2];
  }

  if (/(data|analytics|dashboard|visualization|prediction|classifier)/.test(haystack)) {
    return profiles[3];
  }

  return profiles[4];
}

function getStatus(repo: GithubRepo) {
  if (repo.homepage) return "Live demo";

  const updatedAt = new Date(repo.updated_at).getTime();
  const daysSinceUpdate = Number.isFinite(updatedAt)
    ? Math.floor((Date.now() - updatedAt) / 86_400_000)
    : 999;

  if (daysSinceUpdate <= 45) return "Active build";
  if (daysSinceUpdate <= 180) return "Maintained";
  return "Case study";
}

function formatUpdated(updatedAt: string) {
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return "Recently updated";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function buildStack(repo: GithubRepo) {
  const stack = [
    repo.language,
    ...repo.topics.map((topic) => technologyLabels[topic.toLowerCase()] ?? titleCaseToken(topic)),
  ].filter(Boolean) as string[];

  return Array.from(new Set(stack)).slice(0, 5);
}

function buildAchievements(repo: GithubRepo, stack: string[], profile: ProjectProfile) {
  const achievements = [
    profile.signal,
    repo.homepage ? "Live experience available" : "Source-first case study",
    stack[0] ? `${stack[0]} implementation` : "Documented engineering build",
  ];

  if (repo.stargazers_count > 0) {
    achievements.push(`${repo.stargazers_count} GitHub star${repo.stargazers_count === 1 ? "" : "s"}`);
  } else if (repo.forks_count > 0) {
    achievements.push(`${repo.forks_count} fork${repo.forks_count === 1 ? "" : "s"} from developers`);
  } else if (repo.topics[0]) {
    achievements.push(`${titleCaseToken(repo.topics[0])} focus area`);
  }

  return Array.from(new Set(achievements)).slice(0, 4);
}

export function getProjectPresentation(repo: GithubRepo): ProjectPresentation {
  const profile = getProfile(repo);
  const stack = buildStack(repo);

  return {
    title: formatRepoTitle(repo.name),
    description:
      repo.description ??
      "A focused engineering build from GitHub with source code available for review.",
    profile,
    status: getStatus(repo),
    stack,
    achievements: buildAchievements(repo, stack, profile),
    updatedLabel: formatUpdated(repo.updated_at),
    repoName: repo.name,
  };
}
