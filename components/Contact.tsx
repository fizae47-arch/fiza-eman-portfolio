const socials = [
  { label: "GitHub", href: "https://github.com/fizae47-arch" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fiza-eman-90323a311" },
  { label: "LeetCode", href: "https://leetcode.com/u/Fizaeman/" },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-ink-border py-28">
      <div className="section-shell">
        <h2 className="font-display text-3xl font-semibold text-paper">
          Let&apos;s build something.
        </h2>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-paper-muted">
          Open to full-stack roles and freelance projects. The fastest way to
          reach me is email.
        </p>

        <a
          href="mailto:fizae380@gmail.com"
          className="mt-8 inline-block font-display text-2xl font-medium text-indigo transition-colors hover:text-paper sm:text-3xl"
        >
          fizae380@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-paper-muted transition-colors hover:text-paper"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
