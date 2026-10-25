import { getSkills } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";

export default async function Skills() {
  const groups = await getSkills();

  return (
    <section id="skills" className="border-t border-ink-border py-24">
      <div className="section-shell">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-paper">
            Skills
            <span className="title-bar" />
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.id} delay={i * 90} className="h-full">
              <Tilt
                max={0}
                className="h-full rounded-lg border border-ink-border bg-ink-surface/60 p-6 transition-colors hover:border-indigo/50"
              >
                <h3 className="font-display text-sm font-medium text-teal">{group.category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-ink-border px-2.5 py-1 font-mono text-xs text-paper-muted transition-colors hover:border-indigo/60 hover:text-paper"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
