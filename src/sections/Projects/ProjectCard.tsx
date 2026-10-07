import type { MouseEvent } from 'react';
import { ProjectImage } from '@/components/ProjectImage';
import type { Project } from '@/data/projects';
import { clamp01, pad2 } from '@/lib/format';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** 0..1, how centred the card is in the viewport. */
  focus: number;
  onOpen: () => void;
}

export function ProjectCard({ project, index, focus, onOpen }: ProjectCardProps) {
  const blur = 1 - focus;
  const sharp = focus > 0.75;
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <a
      href="#"
      data-focus-item
      onClick={handleClick}
      className="flex cursor-pointer flex-wrap items-center gap-[clamp(32px,5vw,64px)] text-fg transition-[opacity,filter,transform] duration-350"
      style={{
        flexDirection: index % 2 ? 'row-reverse' : 'row',
        opacity: 0.25 + 0.75 * focus,
        filter: `blur(${(blur * 4).toFixed(2)}px)`,
        transform: `scale(${0.94 + 0.06 * focus})`,
      }}
    >
      <ProjectImage
        src={project.cover}
        alt={`${project.title} cover`}
        variant="cover"
        className="aspect-[16/11] max-w-[860px] flex-[1.6_1_600px] outline-offset-[10px] transition-[outline-color] duration-350"
        style={{ outline: `1px solid ${sharp ? 'rgba(237,237,237,.35)' : 'rgba(237,237,237,0)'}` }}
      >
        [ {project.title} cover ]
      </ProjectImage>

      <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[22px]">
        <span
          className="font-display text-display-md leading-[.8] transition-colors duration-350"
          style={{ color: sharp ? 'var(--color-fg)' : 'transparent', WebkitTextStroke: '1.5px var(--color-stroke)' }}
        >
          {pad2(index + 1)}
        </span>
        <h3 className="m-0 font-display text-display-xs font-normal uppercase">{project.title}</h3>
        <p className="m-0 text-body leading-[1.7] text-pretty text-fg-subtle">{project.summary}</p>
        <div className="relative h-px bg-line">
          <span
            className="absolute top-0 left-0 block h-px bg-fg transition-[width] duration-350"
            style={{ width: `${Math.round(clamp01(focus * 1.4 - 0.3) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between gap-4 font-mono text-caption uppercase">
          <span className="text-fg-muted">{project.stack}</span>
          <span>{project.year} ↗</span>
        </div>
      </div>
    </a>
  );
}
