const stages = [
  { label: "Frontend", detail: "React & Next.js interfaces" },
  { label: "Backend", detail: "Express services & business logic" },
  { label: "APIs", detail: "REST endpoints & auth" },
  { label: "Databases", detail: "MongoDB schema design" },
  { label: "Deployment", detail: "Vercel, Netlify, Railway" },
];

export default function WhatIBuild() {
  return (
    <section className="border-t border-ink-border py-24">
      <div className="section-shell">
        <h2 className="font-display text-3xl font-semibold text-paper">What I build</h2>
        <p className="mt-3 max-w-md font-body text-sm text-paper-muted">
          Every project goes through the same pipeline, end to end.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-4">
          {stages.map((stage, i) => (
            <div key={stage.label} className="relative">
              <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo/50 font-mono text-xs text-indigo">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="sm:mt-4">
                  <h3 className="font-display text-base font-medium text-paper">
                    {stage.label}
                  </h3>
                  <p className="mt-1 font-body text-sm text-paper-muted">{stage.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
