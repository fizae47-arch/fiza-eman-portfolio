import { createServerClient } from "./supabase-server";
import {
  defaultEducation,
  defaultProjects,
  defaultSettings,
  defaultSkills,
} from "./defaults";
import type { Article, EduItem, Project, SkillGroup } from "./types";

// On a query error we fall back to built-in defaults.
// If the query works but the table is empty, we respect that (admin deleted everything).

export async function getProjects(): Promise<Project[]> {
  const sb = createServerClient();
  if (!sb) return defaultProjects;
  const { data, error } = await sb.from("projects").select("*").order("sort_order");
  if (error || !data) return defaultProjects;
  return data as Project[];
}

export async function getSkills(): Promise<SkillGroup[]> {
  const sb = createServerClient();
  if (!sb) return defaultSkills;
  const { data, error } = await sb.from("skills").select("*").order("sort_order");
  if (error || !data) return defaultSkills;
  return data as SkillGroup[];
}

export async function getEducation(): Promise<EduItem[]> {
  const sb = createServerClient();
  if (!sb) return defaultEducation;
  const { data, error } = await sb.from("education_items").select("*").order("sort_order");
  if (error || !data) return defaultEducation;
  return data as EduItem[];
}

export async function getSettings(): Promise<Record<string, string>> {
  const settings = { ...defaultSettings };
  const sb = createServerClient();
  if (!sb) return settings;
  const { data } = await sb.from("site_settings").select("key,value");
  data?.forEach((row: { key: string; value: string }) => {
    if (row.value) settings[row.key] = row.value;
  });
  return settings;
}

export async function getArticles(limit?: number): Promise<Article[]> {
  const sb = createServerClient();
  if (!sb) return [];
  let query = sb
    .from("articles")
    .select("id,title,slug,summary,category,published,created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error || !data) return [];
  return data as Article[];
}

export async function getArticle(slug: string): Promise<Article | null> {
  const sb = createServerClient();
  if (!sb) return null;
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  return data as Article;
}

export function readingTime(text: string | undefined): number {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
