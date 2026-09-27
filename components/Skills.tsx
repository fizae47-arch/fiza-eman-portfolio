const groups = [
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux Toolkit",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Middleware"],
  },
  {
    label: "Database & storage",
    items: ["MongoDB", "Mongoose", "Supabase"],
  },
  {
    label: "Auth & services",
    items: ["Firebase Google OAuth", "Socket.IO", "PayPal", "Cloudinary"],
  },
  {
    label: "Tools & deployment",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Railway", "Vite", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-ink-border py-24">
      <div className="section-shell">
        <h2 className="font-display text-3xl font-semibold text-paper">Skills</h2>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.label} className="border-l-2 border-indigo/40 pl-5">
              <h3 className="font-display text-sm font-medium text-paper">{group.label}</h3>
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
