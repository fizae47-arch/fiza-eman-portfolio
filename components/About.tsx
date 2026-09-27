export default function About() {
  return (
    <section id="about" className="border-t border-ink-border py-24">
      <div className="section-shell grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <h2 className="font-display text-3xl font-semibold text-paper">About</h2>

        <div className="max-w-2xl space-y-5 font-body text-base leading-relaxed text-paper-muted">
          <p>
            I&apos;m a BS Information Technology student at Government
            College University Faisalabad and a full-stack developer who
            prefers finishing things over talking about them. Most of what I
            know comes from building complete applications rather than
            isolated exercises.
          </p>
          <p>
            My strongest foundation is the MERN stack — React, Node.js,
            Express, and MongoDB — with authentication, REST APIs, and
            real-time features built in from the start. I&apos;ve since added
            Next.js and TypeScript to that, and use them for anything that
            needs to scale cleanly or ship fast.
          </p>
          <p>
            One of my projects, a restaurant POS system, is currently used
            for real daily order and sales operations — not a demo, an
            actual tool someone relies on. That&apos;s the standard I hold
            the rest of my work to.
          </p>
        </div>
      </div>
    </section>
  );
}
