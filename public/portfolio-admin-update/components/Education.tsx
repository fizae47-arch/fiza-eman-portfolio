import { getEducation } from "@/lib/data";

export default async function Education() {
  const items = await getEducation();
  const education = items.filter((i) => i.kind === "education");
  const certifications = items.filter((i) => i.kind === "certification");

  return (
    <section id="education" className="border-t border-ink-border py-24">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold text-paper">Education</h2>
          <div className="mt-8 space-y-6">
            {education.map((item) => (
              <div key={item.id} className="border-l-2 border-ink-border pl-5">
                <h3 className="font-display text-base font-medium text-paper">{item.title}</h3>
                {item.subtitle && (
                  <p className="mt-1 font-body text-sm text-paper-muted">{item.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {certifications.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-semibold text-paper">Certifications</h2>
            <ul className="mt-8 space-y-4">
              {certifications.map((c) => (
                <li
                  key={c.id}
                  className="border-l-2 border-ink-border pl-5 font-body text-sm text-paper-muted"
                >
                  {c.title}
                  {c.subtitle ? ` · ${c.subtitle}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
