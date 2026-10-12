import { useState } from 'react';
import { ProjectImage } from '@/components/ProjectImage';
import type { GallerySlide } from '@/data/projects';
import { useInterval } from '@/hooks/useInterval';
import { cx, pad2 } from '@/lib/format';

const TICK_MS = 200;
/** Images stay for this many ticks; videos stay for their own length. */
const IMAGE_TICKS = 20;

/** Auto-advancing slideshow with story-style progress bars. Remount to restart. */
export function ProjectGallery({ title, slides }: { title: string; slides: GallerySlide[] }) {
  const [tick, setTick] = useState(0);
  const [videoTicks, setVideoTicks] = useState<Record<number, number>>({});
  useInterval(() => setTick((t) => t + 1), TICK_MS);

  const count = slides.length;
  const ticksOf = (i: number) => (slides[i].kind === 'video' ? (videoTicks[i] ?? IMAGE_TICKS) : IMAGE_TICKS);
  const total = slides.reduce((sum, _, i) => sum + ticksOf(i), 0);

  // Walk the slides to find which one the current tick falls in, and how far into it.
  let current = 0;
  let phase = tick % total;
  while (phase >= ticksOf(current)) phase -= ticksOf(current++);
  const slideTicks = ticksOf(current);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${count},1fr)` }}>
        {slides.map((_, i) => {
          const width = i < current ? 100 : i === current ? ((phase + 1) / slideTicks) * 100 : 0;
          return (
            <span key={i} className="relative block h-[3px] overflow-hidden bg-line">
              <span
                className={cx('absolute inset-y-0 left-0 block bg-fg', i === current && phase > 0 && 'transition-[width] duration-200 ease-linear')}
                style={{ width: `${width}%` }}
              />
            </span>
          );
        })}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        {slides.map(({ caption, src, kind }, i) => {
          const on = i === current;
          return (
            <ProjectImage
              key={i}
              src={src}
              kind={kind}
              active={on}
              onDuration={(s) => setVideoTicks((t) => ({ ...t, [i]: Math.max(1, Math.ceil((s * 1000) / TICK_MS)) }))}
              alt={`${title} — ${caption}`}
              stripes="lg"
              className="absolute inset-0 text-label"
              style={{
                opacity: on ? 1 : 0,
                transform: `scale(${on && kind === 'image' ? 1.07 : 1})`,
                transition: 'opacity .9s ease, transform 4.2s linear',
              }}
            >
              [{caption}]
            </ProjectImage>
          );
        })}
      </div>

      <span className="font-mono text-label">
        {pad2(current + 1)} / {pad2(count)} <span className="text-fg-muted">— {slides[current]?.caption}</span>
      </span>
    </div>
  );
}
