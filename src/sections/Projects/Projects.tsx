import { useRef } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { Section } from '@/components/Section';
import { projects } from '@/data/projects';
import { useScrollFocus } from '@/hooks/useScrollFocus';
import { pad2 } from '@/lib/format';
import { ProjectCard } from './ProjectCard';

const years = projects.map((p) => Number(p.year));
const range = `(${pad2(projects.length)}) ${Math.min(...years)} — ${new Date().getFullYear()}`;

export function Projects({ onOpen }: { onOpen: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const focus = useScrollFocus(ref);

  return (
    <Section
      id="projects"
      ref={ref}
      className="flex flex-col gap-[clamp(80px,10vw,140px)] pt-[clamp(72px,9vw,120px)] pb-[clamp(96px,12vw,180px)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader eyebrow="/ 04 Projects" title={['Selected', 'Work']} size="lg" />
        <span className="font-mono text-label text-fg-muted uppercase">{range}</span>
      </div>

      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} focus={focus[i] ?? 1} onOpen={() => onOpen(i)} />
      ))}
    </Section>
  );
}
