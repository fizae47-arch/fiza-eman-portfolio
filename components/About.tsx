import { getSettings } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default async function About() {
  const settings = await getSettings();
  const paragraphs = settings.about.split(/\n\s*\n/).filter(Boolean);

  return (
    <section id="about" className="border-t border-ink-border py-24">
      <Reveal className="section-shell grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <h2 className="font-display text-3xl font-semibold text-paper">About<span className="title-bar" /></h2>

        <div className="max-w-2xl space-y-5 font-body text-base leading-relaxed text-paper-muted">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
