const items = [
  {
    degree: "Bachelor of Science in Information Technology (BS IT)",
    school: "Government College University Faisalabad (GCUF)",
    period: "3rd year",
  },
  {
    degree: "Intermediate",
    school: "Punjab College, Gujranwala Campus",
    period: "",
  },
];

const certifications = [
  "Dev Weekends Fellowship Certificate — July 2026",
  "MS Office Certificate — Sunshine School, Gujranwala",
];

export default function Education() {
  return (
    <section id="education" className="border-t border-ink-border py-24">
      <div className="section-shell grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold text-paper">Education</h2>
          <div className="mt-8 space-y-6">
            {items.map((item) => (
              <div key={item.degree} className="border-l-2 border-ink-border pl-5">
                <h3 className="font-display text-base font-medium text-paper">
                  {item.degree}
                </h3>
                <p className="mt-1 font-body text-sm text-paper-muted">
                  {item.school}
                  {item.period ? ` · ${item.period}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold text-paper">Certifications</h2>
          <ul className="mt-8 space-y-4">
            {certifications.map((c) => (
              <li
                key={c}
                className="border-l-2 border-ink-border pl-5 font-body text-sm text-paper-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
