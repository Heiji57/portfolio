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

  const multiple = count > 1;
  /** Jump to a slide and restart its timer (progress bar and video begin from zero). */
  const goTo = (index: number) => {
    const target = (index + count) % count;
    setTick(slides.slice(0, target).reduce((sum, _, i) => sum + ticksOf(i), 0));
  };

  return (
    <div className="flex flex-col gap-3">
      {multiple && (
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
      )}

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
              alt={caption ? `${title} — ${caption}` : `${title} ${pad2(i + 1)}`}
              stripes="lg"
              className="absolute inset-0 text-label"
              style={{
                opacity: on ? 1 : 0,
                transition: 'opacity .9s ease',
              }}
            >
              [{caption ?? pad2(i + 1)}]
            </ProjectImage>
          );
        })}

        {multiple && (
          <>
            <NavButton side="left" label="이전 이미지" onClick={() => goTo(current - 1)} />
            <NavButton side="right" label="다음 이미지" onClick={() => goTo(current + 1)} />
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-label">
          {multiple && `${pad2(current + 1)} / ${pad2(count)}`}
          {slides[current].caption && (
            <span className="text-fg-muted">
              {multiple && ' — '}
              {slides[current].caption}
            </span>
          )}
        </span>
        {slides[current].description && (
          <p className="m-0 text-small leading-[1.7] text-pretty text-fg-subtle">{slides[current].description}</p>
        )}
      </div>
    </div>
  );
}

/** Semi-transparent round arrow on the left or right edge of the slide area. */
function NavButton({ side, label, onClick }: { side: 'left' | 'right'; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx(
        'absolute top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-[rgba(0,0,0,.45)] p-0 text-white transition-colors duration-200 hover:bg-[rgba(0,0,0,.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        side === 'left' ? 'left-3' : 'right-3',
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={side === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );
}
