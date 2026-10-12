import { getSkills } from "@/lib/data";

export default async function Skills() {
  const groups = await getSkills();

  return (
    <section id="skills" className="border-t border-ink-border py-24">
      <div className="section-shell">
        <h2 className="font-display text-3xl font-semibold text-paper">Skills</h2>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="border-l-2 border-indigo/40 pl-5">
              <h3 className="font-display text-sm font-medium text-paper">{group.category}</h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="font-body text-sm text-paper-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
