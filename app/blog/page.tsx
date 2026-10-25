import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ambient from "@/components/Ambient";
import { formatDate, getArticles } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing — Fiza Eman",
  description: "Articles by Fiza Eman on web development and what I'm learning.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen">
      <Ambient />
      <Navbar />
      <section className="pb-24 pt-32 sm:pt-40">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-semibold text-paper">Writing</h1>
            <p className="mt-3 font-body text-base text-paper-muted">
              Notes on what I build and what I&apos;m learning.
            </p>

            {articles.length === 0 ? (
              <p className="mt-16 font-body text-sm text-paper-faint">No articles yet.</p>
            ) : (
              <div className="mt-12 divide-y divide-ink-border border-y border-ink-border">
                {articles.map((a) => (
                  <Link key={a.id} href={`/blog/${a.slug}`} className="group block py-7">
                    <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-paper-faint">
                      {a.category && <span className="text-teal">{a.category}</span>}
                      <span>{formatDate(a.created_at)}</span>
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-paper transition-colors group-hover:text-indigo">
                      {a.title}
                    </h2>
                    {a.summary && (
                      <p className="mt-2 font-body text-sm leading-relaxed text-paper-muted">
                        {a.summary}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
