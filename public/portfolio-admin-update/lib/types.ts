export type Project = {
  id: string;
  name: string;
  tag: string | null;
  live: string | null;
  github: string | null;
  description: string | null;
  highlights: string[];
  tech: string[];
  image_url: string | null;
  sort_order: number;
};

export type SkillGroup = {
  id: string;
  category: string;
  items: string[];
  sort_order: number;
};

export type EduItem = {
  id: string;
  kind: "education" | "certification";
  title: string;
  subtitle: string | null;
  sort_order: number;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content?: string;
  category: string | null;
  published: boolean;
  created_at: string;
};
