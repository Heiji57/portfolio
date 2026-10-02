import { useState, type MouseEvent } from 'react';
import { Placeholder } from '@/components/Placeholder';
import { projects } from '@/data/projects';
import { cx, pad2 } from '@/lib/format';

const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg';

/** Footer of the detail view: step list of all projects plus a preview of the next (or hovered) one. */
export function ProjectSwitcher({ current, onOpen }: { current: number; onOpen: (index: number) => void }) {
  const next = (current + 1) % projects.length;
  const [hovered, setHovered] = useState<number | null>(null);
  const selected = hovered !== null && hovered !== current ? hovered : next;
  const preview = projects[selected];

  const open = (index: number) => (e: MouseEvent) => {
    e.preventDefault();
    if (index !== current) {
      setHovered(null);
      onOpen(index);
    }
  };

  return (
    <div className="grid grid-cols-[minmax(0,760px)] justify-center border-t border-line px-gutter pt-18 pb-24">
      <div className="flex flex-col gap-6">
        <span className="font-mono text-caption text-fg-muted uppercase">
          Projects · {pad2(current + 1)} / {pad2(projects.length)} 보는 중
        </span>

        <nav className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
          {projects.map((project, i) => {
            const isCurrent = i === current;
            const isSelected = i === selected;
            const tag = isCurrent ? '보는 중' : i === next ? '다음' : project.category;
            return (
              <a
                key={project.title}
                href="#"
                onClick={open(i)}
                onMouseEnter={() => !isCurrent && setHovered(i)}
                onFocus={() => !isCurrent && setHovered(i)}
                aria-current={isCurrent ? 'page' : undefined}
                className={cx(
                  'flex flex-col gap-3 py-3.5',
                  focusRing,
                  isCurrent ? 'cursor-default text-fg-dim' : isSelected ? 'text-fg' : 'text-fg-muted',
                )}
              >
                <span
                  className={cx(
                    'block h-1 transition-colors duration-200',
                    isCurrent ? 'bg-fg-dim' : isSelected ? 'bg-fg' : 'bg-line',
                  )}
                />
                <span className="font-mono text-micro uppercase">
                  {pad2(i + 1)} · {tag}
                </span>
                <span className="text-title-sm font-bold">{project.title}</span>
              </a>
            );
          })}
        </nav>

        <a
          href="#"
          onClick={open(selected)}
          className={cx(
            'grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-center gap-6 border-t border-line pt-6 text-fg',
            focusRing,
          )}
        >
          <Placeholder className="aspect-[16/10] max-w-60 text-caption">[{preview.title}]</Placeholder>
          <span className="flex flex-col gap-2">
            <span className="font-mono text-micro text-fg-muted uppercase">
              {selected === next ? '다음 프로젝트 · 클릭해서 열기' : '바로 이동 · 클릭해서 열기'}
            </span>
            <span className="font-display text-display-2xs leading-[.9] uppercase">{preview.title}</span>
            <span className="text-small text-fg-subtle">{preview.summary}</span>
          </span>
        </a>
      </div>
    </div>
  );
}
