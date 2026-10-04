import { useRef } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { Section } from '@/components/Section';
import { about } from '@/data/profile';
import { useInView } from '@/hooks/useInView';
import { Laptop } from './laptop/Laptop';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.35);

  return (
    <Section
      id="me"
      ref={ref}
      className="relative flex min-h-screen flex-wrap content-center items-center gap-4 overflow-hidden py-[clamp(64px,8vw,96px)]"
    >
      <div
        className="pointer-events-none absolute -top-10 -left-[120px] h-[760px] w-[900px]"
        style={{ background: 'radial-gradient(ellipse 40% 35% at 45% 50%,rgba(190,205,235,.05) 0%,rgba(190,205,235,0) 70%)' }}
      />
      <div className="relative h-[616px] max-w-full flex-[0_0_720px]" aria-hidden>
        <Laptop open={inView} />
      </div>
      <SectionHeader
        eyebrow="/ 03 About"
        title={['About', 'Me']}
        size="2xl"
        className="relative z-1 min-w-0 flex-[1_1_320px] gap-8 ml-30"
      >
        <p className="m-0 max-w-[850px] font-mono text-body leading-[1.75] text-pretty break-words">{about}</p>
      </SectionHeader>
    </Section>
  );
}
