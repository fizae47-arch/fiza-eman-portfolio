const socials = [
  { label: "GitHub", href: "https://github.com/fizae47-arch" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fiza-eman-90323a311" },
  { label: "LeetCode", href: "https://leetcode.com/u/Fizaeman/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-border py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-body text-xs text-paper-faint">
          © {new Date().getFullYear()} Fiza Eman
        </p>
        <div className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-paper-faint transition-colors hover:text-paper-muted"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
