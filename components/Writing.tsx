import Link from "next/link";
import { formatDate, getArticles, readingTime } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default async function Writing() {
  const articles = await getArticles(3);
  if (articles.length === 0) return null;

  return (
    <section id="writing" className="border-t border-ink-border py-24">
      <Reveal className="section-shell">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-semibold text-paper">Writing<span className="title-bar" /></h2>
          <Link
            href="/blog"
            className="font-body text-sm font-medium text-indigo transition-colors hover:text-paper"
          >
            All articles
          </Link>
        </div>

        <div className="mt-10 divide-y divide-ink-border border-y border-ink-border">
          {articles.map((a) => (
            <Link key={a.id} href={`/blog/${a.slug}`} className="group block py-6">
              <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-paper-faint">
                {a.category && <span className="text-teal">{a.category}</span>}
                <span>{formatDate(a.created_at)}</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold text-paper transition-colors group-hover:text-indigo">
                {a.title}
              </h3>
              {a.summary && (
                <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-paper-muted">
                  {a.summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
