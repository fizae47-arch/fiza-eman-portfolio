import { getSettings } from "@/lib/data";
import Tilt from "@/components/Tilt";
import TypedRoles from "@/components/TypedRoles";

type TermBlock = { cmd: string; out: string[] };

const blocks: TermBlock[] = [
  { cmd: "whoami", out: ["full-stack developer · BS IT, GCUF"] },
  { cmd: "frontend", out: ["React · Next.js · TypeScript", "Redux Toolkit · Tailwind CSS"] },
  { cmd: "backend", out: ["Node.js · Express.js · REST APIs", "JWT Auth · Socket.IO"] },
  { cmd: "data", out: ["MongoDB · Mongoose · Supabase"] },
  { cmd: "devops", out: ["Docker · Kubernetes · GitHub Actions", "AWS · Linux · Nginx"] },
  { cmd: "deploy", out: ["Vercel · Netlify · Railway"] },
];

const NAME = "Fiza Eman";

const btn =
  "rounded-md px-6 py-3 font-body text-sm font-medium transition-all duration-200 hover:-translate-y-0.5";

export default async function Hero() {
  const settings = await getSettings();

  // Each terminal line fades in a little after the previous one.
  let step = 0;
  const START = 900;
  const GAP = 240;
  const next = () => START + GAP * step++;

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="section-shell grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="rise font-mono text-sm text-teal" style={{ animationDelay: "0ms" }}>
            {settings.location}
          </p>

          <h1
            aria-label={NAME}
            className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-paper sm:text-7xl"
          >
            {NAME.split("").map((c, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="char"
                style={{ animationDelay: `${150 + i * 60}ms` }}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </h1>

          <p
            className="rise mt-4 min-h-[2.75em] font-display text-2xl font-medium leading-snug text-paper-muted sm:min-h-[1.375em] sm:text-3xl"
            style={{ animationDelay: "700ms" }}
          >
            <TypedRoles />
          </p>

          <p
            className="rise mt-5 max-w-lg font-body text-base leading-relaxed text-paper-muted"
            style={{ animationDelay: "850ms" }}
          >
           I build and ship complete software solutions—from
           web applications and mobile apps to real-world systems
           like a restaurant POS and a multi-vendor e-commerce 
           platform—using modern technologies.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "1000ms" }}
          >
            <a
              href="#projects"
              className={`${btn} btn-shine bg-indigo text-ink hover:bg-indigo-dim`}
            >
              View projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-ink-border text-paper hover:border-indigo/60`}
            >
              View resume
            </a>
            <a
              href="https://github.com/fizae47-arch"
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-ink-border text-paper hover:border-indigo/60`}
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="rise" style={{ animationDelay: "400ms" }}>
          <div className="float-slow">
            <Tilt
              max={6}
              className="rounded-lg border border-ink-border bg-ink-surface/90 shadow-2xl shadow-black/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                <span className="ml-2 font-mono text-xs text-paper-faint">stack.sh</span>
              </div>
              <div className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-paper-muted">
                {blocks.map((b) => (
                  <div key={b.cmd} className="mb-3 last:mb-0">
                    <span className="term-line" style={{ animationDelay: `${next()}ms` }}>
                      <span className="text-teal">$</span> {b.cmd}
                    </span>
                    {b.out.map((line) => (
                      <span
                        key={line}
                        className="term-line"
                        style={{ animationDelay: `${next()}ms` }}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                ))}
                <span className="term-line mt-3" style={{ animationDelay: `${next()}ms` }}>
                  <span className="text-teal">$</span> <span className="cursor" aria-hidden="true" />
                </span>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
