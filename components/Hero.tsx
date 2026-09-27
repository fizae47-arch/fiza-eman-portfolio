export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="section-shell grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-sm text-teal">Hafizabad, Punjab, Pakistan</p>

          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-paper sm:text-6xl">
            Fiza Eman
          </h1>

          <p className="mt-4 max-w-md font-display text-2xl font-medium leading-snug text-paper-muted sm:text-3xl">
            Full-Stack Web Developer
          </p>

          <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-paper-muted">
            I build and ship complete web applications — from a restaurant POS
            system running in daily use to a multi-vendor e-commerce
            platform — using the MERN stack, Next.js, and TypeScript.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-md bg-indigo px-6 py-3 font-body text-sm font-medium text-ink transition-colors hover:bg-indigo-dim"
            >
              View projects
            </a>
            <a
              href="https://github.com/fizae47-arch"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-ink-border px-6 py-3 font-body text-sm font-medium text-paper transition-colors hover:border-paper-faint"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-ink-border bg-ink-surface shadow-2xl shadow-black/30">
          <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
            <span className="ml-2 font-mono text-xs text-paper-faint">stack.sh</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-paper-muted">
            <code>
              <span className="text-teal">$</span> whoami{"\n"}
              full-stack developer · BS IT, GCUF{"\n\n"}
              <span className="text-teal">$</span> frontend{"\n"}
              React · Next.js · TypeScript{"\n"}
              Redux Toolkit · Tailwind CSS{"\n\n"}
              <span className="text-teal">$</span> backend{"\n"}
              Node.js · Express.js · REST APIs{"\n"}
              JWT Auth · Socket.IO{"\n\n"}
              <span className="text-teal">$</span> data{"\n"}
              MongoDB · Mongoose · Supabase{"\n\n"}
              <span className="text-teal">$</span> deploy{"\n"}
              Vercel · Netlify · Railway
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
