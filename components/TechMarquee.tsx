import { getSkills } from "@/lib/data";

// Two endless rows of technology names scrolling in opposite directions.
export default async function TechMarquee() {
  const groups = await getSkills();
  const items = Array.from(new Set(groups.flatMap((g) => g.items)));
  if (items.length === 0) return null;

  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)].filter((r) => r.length > 0);

  const chips = (row: string[]) =>
    row.map((t) => (
      <span
        key={t}
        className="mr-3 shrink-0 rounded-full border border-ink-border bg-ink-surface/70 px-4 py-2 font-mono text-sm text-paper-muted transition-colors hover:border-indigo/60 hover:text-paper"
      >
        {t}
      </span>
    ));

  return (
    <section
      aria-label="Technologies I work with"
      className="space-y-3 overflow-hidden border-y border-ink-border py-6"
    >
      {rows.map((row, r) => (
        <div key={r} className="marquee-mask overflow-hidden">
          <div
            className={`marquee-track ${r === 1 ? "marquee-reverse" : ""}`}
            style={{ ["--n" as string]: row.length }}
          >
            <div className="flex shrink-0">{chips(row)}</div>
            <div className="flex shrink-0" aria-hidden="true">
              {chips(row)}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
