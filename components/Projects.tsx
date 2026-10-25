import { getProjects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="border-t border-ink-border py-24">
      <div className="section-shell">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-paper">
            Featured projects
            <span className="title-bar" />
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-24">
          {projects.map((project, i) => (
            <Reveal key={project.id}>
              <article className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  {project.tag && (
                    <span className="font-mono text-xs text-teal">{project.tag}</span>
                  )}
                  <h3 className="mt-2 font-display text-2xl font-semibold text-paper">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-paper-muted">
                      {project.description}
                    </p>
                  )}

                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 font-body text-sm leading-relaxed text-paper-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-ink-border px-2.5 py-1 font-mono text-xs text-paper-muted transition-colors hover:border-indigo/60 hover:text-paper"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 font-body text-sm font-medium text-indigo transition-colors hover:text-paper"
                      >
                        {project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}{" "}
                        <span className="inline-block transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                          ↗
                        </span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-sm font-medium text-paper-muted transition-colors hover:text-paper"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <Tilt
                    max={7}
                    className="overflow-hidden rounded-lg border border-ink-border bg-ink-surface shadow-xl shadow-black/20"
                  >
                    <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                      <span className="ml-2 truncate font-mono text-xs text-paper-faint">
                        {(project.live ?? "").replace(/^https?:\/\//, "")}
                      </span>
                    </div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-ink-raised">
                      {project.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.image_url}
                          alt={`${project.name} screenshot`}
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-display text-lg text-paper-faint">
                          {project.name.split(" — ")[0]}
                        </div>
                      )}
                    </div>
                  </Tilt>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
