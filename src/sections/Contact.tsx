import { SectionHeader } from '@/components/SectionHeader';
import { Section } from '@/components/Section';
import { contactLinks, faqs } from '@/data/profile';
import { cx } from '@/lib/format';

export function Contact() {
  return (
    <Section
      id="contact"
      className="flex min-h-screen flex-col gap-[clamp(64px,8vw,112px)] pt-[clamp(96px,12vw,160px)]"
    >
      <SectionHeader eyebrow="/ 05 Contact" title={['Ask me', 'anything']} size="sm" />

      <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] content-start gap-12 pb-[clamp(64px,8vw,120px)]">
        {faqs.map(({ question, answer }, i) => (
          <article key={question} className="flex flex-col gap-6 border-t border-line-strong pt-8">
            <span className="font-display text-display-2xs">Q{i + 1}.</span>
            <h3 className="m-0 text-title leading-[1.4] font-bold">{question}</h3>
            <p className="m-0 text-body leading-[1.85] text-pretty text-fg-subtle">{answer}</p>
          </article>
        ))}
      </div>

      <div className="-mx-gutter grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-t border-line font-mono">
        {contactLinks.map(({ label, value, href }, i) => (
          <a
            key={label}
            href={href}
            className={cx(
              'flex flex-col gap-1.5 py-11 hover:bg-fg hover:text-bg',
              i === 0 ? 'px-gutter' : 'border-l border-line px-8',
            )}
          >
            <span className="text-micro uppercase opacity-60">{label}</span>
            <span className="text-base">{value}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}
