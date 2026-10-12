import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Markdown from "@/components/Markdown";
import { formatDate, getArticle, readingTime } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found — Fiza Eman" };
  return {
    title: `${article.title} — Fiza Eman`,
    description: article.summary ?? undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <article className="pb-24 pt-32 sm:pt-40">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/blog"
              className="font-body text-sm text-paper-muted transition-colors hover:text-paper"
            >
              ← All articles
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 font-mono text-xs text-paper-faint">
              {article.category && <span className="text-teal">{article.category}</span>}
              <span>{formatDate(article.created_at)}</span>
              <span>{readingTime(article.content)} min read</span>
            </div>

            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-paper">
              {article.title}
            </h1>
            {article.summary && (
              <p className="mt-4 font-body text-lg leading-relaxed text-paper-muted">
                {article.summary}
              </p>
            )}

            <div className="article-body mt-10 border-t border-ink-border pt-8">
              <Markdown>{article.content ?? ""}</Markdown>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
