"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { getBrowserClient } from "@/lib/supabase-browser";
import CrudManager, { type Field } from "@/components/admin/CrudManager";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const articleFields: Field[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "URL slug", type: "text", hint: "Leave empty to create it from the title." },
  { name: "category", label: "Category", type: "text", hint: "For example: DevOps, Next.js, Learning." },
  { name: "summary", label: "Short summary", type: "textarea" },
  { name: "content", label: "Article (Markdown)", type: "markdown", hint: "Use ## for headings, **bold**, - for lists, ``` for code." },
  { name: "published", label: "Published (untick to keep as draft)", type: "checkbox" },
];

const projectFields: Field[] = [
  { name: "name", label: "Project name", type: "text", required: true },
  { name: "tag", label: "Tag", type: "text", hint: "Small label above the title, e.g. E-commerce." },
  { name: "live", label: "Live demo URL", type: "text" },
  { name: "github", label: "GitHub URL", type: "text", hint: "Leave empty to hide the GitHub link." },
  { name: "description", label: "Description", type: "textarea" },
  { name: "highlights", label: "Highlights", type: "list", sep: "\n" },
  { name: "tech", label: "Tech stack", type: "list", sep: "," },
  { name: "image_url", label: "Screenshot", type: "image" },
  { name: "sort_order", label: "Order", type: "number", hint: "Smaller number shows first." },
];

const skillFields: Field[] = [
  { name: "category", label: "Group name", type: "text", required: true, hint: "For example: DevOps." },
  { name: "items", label: "Skills", type: "list", sep: "," },
  { name: "sort_order", label: "Order", type: "number", hint: "Smaller number shows first." },
];

const educationFields: Field[] = [
  { name: "kind", label: "Type", type: "select", options: ["education", "certification"], required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Details", type: "text", hint: "School / institute and year." },
  { name: "sort_order", label: "Order", type: "number" },
];

const settingFields: Field[] = [
  { name: "key", label: "Key", type: "text", required: true, hint: "Use: about (About text) or location (shown in the hero)." },
  { name: "value", label: "Value", type: "textarea", required: true, hint: "For the About text, separate paragraphs with a blank line." },
];

const tabs = [
  { id: "articles", label: "Articles" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "settings", label: "About & location" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminPage() {
  const sb = getBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<TabId>("articles");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sb) {
      setReady(true);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    if (!sb) return;
    setBusy(true);
    setError("");
    const { error: err } = await sb.auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setBusy(false);
  }

  const shell = "mx-auto w-full max-w-3xl px-6 py-12";

  if (!ready) {
    return <main className="min-h-screen bg-ink" />;
  }

  if (!sb) {
    return (
      <main className="min-h-screen bg-ink">
        <div className={shell}>
          <h1 className="font-display text-2xl font-semibold text-paper">Admin</h1>
          <p className="mt-4 font-body text-sm text-paper-muted">
            Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (and to Vercel), then restart.
          </p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-ink">
        <div className="mx-auto w-full max-w-sm px-6 py-24">
          <h1 className="font-display text-2xl font-semibold text-paper">Admin login</h1>
          <form onSubmit={signIn} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block font-body text-sm text-paper">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-ink-border bg-ink-surface px-3 py-2 font-body text-sm text-paper focus:border-indigo focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block font-body text-sm text-paper">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-ink-border bg-ink-surface px-3 py-2 font-body text-sm text-paper focus:border-indigo focus:outline-none"
              />
            </div>
            {error && <p className="font-body text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-md bg-indigo px-4 py-2.5 font-body text-sm font-medium text-ink transition-colors hover:bg-indigo-dim disabled:opacity-50"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink">
      <div className={shell}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-paper">Admin</h1>
            <p className="mt-1 font-body text-xs text-paper-faint">{session.user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-md border border-ink-border px-4 py-2 font-body text-sm text-paper hover:border-paper-faint"
            >
              View site
            </Link>
            <button
              onClick={() => sb.auth.signOut()}
              className="rounded-md border border-ink-border px-4 py-2 font-body text-sm text-paper hover:border-paper-faint"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-ink-border pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-4 py-2 font-body text-sm transition-colors ${
                tab === t.id ? "bg-ink-raised text-paper" : "text-paper-muted hover:text-paper"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "articles" && (
            <CrudManager
              key="articles"
              table="articles"
              title="Articles"
              itemLabel="article"
              fields={articleFields}
              orderBy="created_at"
              ascending={false}
              primaryField="title"
              secondaryField="category"
              newDefaults={{ published: true }}
              transform={(p) => ({
                ...p,
                slug: p.slug ? slugify(String(p.slug)) : slugify(String(p.title)),
              })}
            />
          )}
          {tab === "projects" && (
            <CrudManager
              key="projects"
              table="projects"
              title="Projects"
              itemLabel="project"
              fields={projectFields}
              orderBy="sort_order"
              primaryField="name"
              secondaryField="tech"
              newDefaults={{ sort_order: 10 }}
            />
          )}
          {tab === "skills" && (
            <CrudManager
              key="skills"
              table="skills"
              title="Skills"
              itemLabel="skill group"
              fields={skillFields}
              orderBy="sort_order"
              primaryField="category"
              secondaryField="items"
              newDefaults={{ sort_order: 10 }}
            />
          )}
          {tab === "education" && (
            <CrudManager
              key="education"
              table="education_items"
              title="Education & certifications"
              itemLabel="entry"
              fields={educationFields}
              orderBy="sort_order"
              primaryField="title"
              secondaryField="kind"
              newDefaults={{ kind: "certification", sort_order: 10 }}
            />
          )}
          {tab === "settings" && (
            <CrudManager
              key="settings"
              table="site_settings"
              title="About text & location"
              itemLabel="setting"
              fields={settingFields}
              orderBy="key"
              primaryField="key"
              secondaryField="value"
            />
          )}
        </div>
      </div>
    </main>
  );
}
