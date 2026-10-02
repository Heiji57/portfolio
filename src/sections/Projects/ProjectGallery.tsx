import { useState } from 'react';
import { Placeholder } from '@/components/Placeholder';
import { galleryCaptions } from '@/data/projects';
import { useInterval } from '@/hooks/useInterval';
import { cx, pad2 } from '@/lib/format';

const TICK_MS = 200;
const TICKS_PER_SLIDE = 20;

/** Auto-advancing slideshow with story-style progress bars. Remount to restart. */
export function ProjectGallery() {
  const [tick, setTick] = useState(0);
  useInterval(() => setTick((t) => t + 1), TICK_MS);

  const count = galleryCaptions.length;
  const current = Math.floor(tick / TICKS_PER_SLIDE) % count;
  const phase = tick % TICKS_PER_SLIDE;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${count},1fr)` }}>
        {galleryCaptions.map((caption, i) => {
          const width = i < current ? 100 : i === current ? ((phase + 1) / TICKS_PER_SLIDE) * 100 : 0;
          return (
            <span key={caption} className="relative block h-[3px] overflow-hidden bg-line">
              <span
                className={cx('absolute inset-y-0 left-0 block bg-fg', i === current && phase > 0 && 'transition-[width] duration-200 ease-linear')}
                style={{ width: `${width}%` }}
              />
            </span>
          );
        })}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        {galleryCaptions.map((caption, i) => {
          const on = i === current;
          return (
            <Placeholder
              key={caption}
              stripes="lg"
              className="absolute inset-0 text-label"
              style={{
                opacity: on ? 1 : 0,
                transform: `scale(${on ? 1.07 : 1})`,
                transition: 'opacity .9s ease, transform 4.2s linear',
              }}
            >
              [{caption}]
            </Placeholder>
          );
        })}
      </div>

      <span className="font-mono text-label">
        {pad2(current + 1)} / {pad2(count)} <span className="text-fg-muted">— {galleryCaptions[current]}</span>
      </span>
    </div>
  );
}
