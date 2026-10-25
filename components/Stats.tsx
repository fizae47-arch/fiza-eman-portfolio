import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { getArticles, getProjects, getSkills } from "@/lib/data";

// Numbers come straight from the database, so they update when you add things in /admin.
export default async function Stats() {
  const [projects, skills, articles] = await Promise.all([
    getProjects(),
    getSkills(),
    getArticles(),
  ]);

  const stats = [
    { label: "Projects built", value: projects.length },
    { label: "Live deployments", value: projects.filter((p) => p.live).length },
    { label: "Technologies", value: new Set(skills.flatMap((g) => g.items)).size },
    { label: "Articles written", value: articles.length },
  ].filter((s) => s.value > 0);

  return (
    <section aria-label="Highlights" className="pb-16">
      <div className="section-shell grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 120}>
            <div className="rounded-lg border border-ink-border bg-ink-surface/60 p-5 backdrop-blur-sm">
              <p className="text-shimmer font-display text-4xl font-semibold sm:text-5xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2 font-mono text-xs text-paper-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
