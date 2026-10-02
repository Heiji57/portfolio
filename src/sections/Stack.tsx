import { SectionHeader } from '@/components/SectionHeader';
import { Section } from '@/components/Section';
import { stack } from '@/data/profile';

export function Stack() {
  return (
    <Section id="stack" bordered={false} className="flex flex-wrap gap-12 py-[clamp(64px,9vw,120px)]">
      <SectionHeader
        eyebrow="/ 02 Stack"
        title={['My', 'Stack']}
        size="md"
        className="sticky top-12 flex-[1_1_320px] gap-5 self-start"
      >
        <p className="m-0 max-w-80 text-body leading-[1.65] text-pretty text-fg-subtle">{stack.description}</p>
      </SectionHeader>

      <dl className="m-0 flex min-w-0 flex-[2_1_560px] flex-col border-b border-line">
        {stack.groups.map(({ category, items }) => (
          <div
            key={category}
            className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line py-7 transition-[padding] duration-250 hover:pl-3"
          >
            <dt className="flex-[0_0_176px] font-mono text-label text-fg-muted uppercase">{category}</dt>
            <dd className="m-0 flex-[1_1_300px] text-stack-item font-semibold tracking-[-0.01em]">{items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
