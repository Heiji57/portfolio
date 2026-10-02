import { useEffect, useRef } from 'react';
import { DisplayHeading } from '@/components/DisplayHeading';
import { Eyebrow } from '@/components/Eyebrow';
import { MetaItem } from '@/components/MetaItem';
import { projects, type Project } from '@/data/projects';
import { pad2 } from '@/lib/format';
import { ProjectGallery } from './ProjectGallery';
import { ProjectSwitcher } from './ProjectSwitcher';

/** Period and Role get the bright marker in the sidebar. */
const metaOf = (p: Project) => [
  { label: 'Period', value: p.period, highlight: true },
  { label: 'Role', value: p.role, highlight: true },
  { label: 'Team', value: p.team, highlight: false },
  { label: 'Stack', value: p.stack, highlight: false },
];

interface ProjectDetailProps {
  index: number;
  onOpen: (index: number) => void;
  onClose: () => void;
}

/** Full-screen case study overlay. Locks page scroll and closes on Escape. */
export function ProjectDetail({ index, onOpen, onClose }: ProjectDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const project = projects[index];
  const meta = metaOf(project);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [index]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 overflow-y-auto bg-bg font-sans text-fg"
    >
      <header className="sticky top-0 z-2 flex items-center justify-between border-b border-line bg-bg px-gutter py-6 font-mono text-label uppercase">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="text-fg-muted hover:text-fg"
        >
          ← All projects
        </a>
        <span className="text-fg-muted">
          {pad2(index + 1)} / {pad2(projects.length)}
        </span>
      </header>

      <div className="grid grid-cols-[minmax(0,760px)] justify-center px-gutter pt-[clamp(40px,6vw,72px)] pb-[100px] wide:grid-cols-[minmax(200px,1fr)_minmax(0,760px)_minmax(0,1fr)] wide:gap-x-12">
        <aside className="sticky top-[120px] mt-[200px] hidden w-[200px] max-w-full flex-col gap-7 self-start justify-self-end text-right wide:flex">
          {meta.map((m) => (
            <MetaItem key={m.label} variant="side" {...m} />
          ))}
        </aside>

        <article className="flex min-w-0 flex-col gap-7">
          <Eyebrow>
            / {project.category} · {project.year}
          </Eyebrow>
          <DisplayHeading as="h2" size="xl" lines={[project.title]} />
          <p className="m-0 text-lead leading-[1.6] font-medium text-pretty text-fg-soft">{project.summary}</p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t border-b border-t-fg border-b-line wide:hidden">
            {meta.map((m) => (
              <MetaItem key={m.label} variant="inline" label={m.label} value={m.value} />
            ))}
          </div>

          <ProjectGallery key={index} />

          {project.sections.map((section, i) => (
            <section key={section.title} className="mt-4 flex flex-col gap-[18px]">
              <h3 className="m-0 text-title-lg font-bold tracking-[-0.02em]">
                <span className="mr-3 font-mono text-ui text-fg-muted">{pad2(i + 1)}</span>
                {section.title}
              </h3>
              <p className="m-0 text-body-lg leading-[1.9] text-pretty text-fg-soft">{section.body}</p>
            </section>
          ))}
        </article>
      </div>

      <ProjectSwitcher current={index} onOpen={onOpen} />
    </div>
  );
}
