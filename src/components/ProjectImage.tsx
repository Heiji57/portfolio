import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import type { Media } from '@/data/projectMedia';
import { cx } from '@/lib/format';
import { Placeholder } from './Placeholder';

interface ProjectImageProps extends ComponentProps<typeof Placeholder> {
  src?: string;
  /** Defaults to an image; videos play muted, inline and looped. */
  kind?: Media['kind'];
  alt: string;
  /** `cover` fills the box and crops overflow; `contain` shows the whole image. */
  fit?: 'cover' | 'contain';
  /** Centred over the media on a dark scrim; only shown when `src` is set. */
  overlay?: ReactNode;
  /** Videos only: false pauses it, and becoming true restarts it from the beginning. */
  active?: boolean;
  /** Videos only: called with the duration in seconds once metadata is loaded. */
  onDuration?: (seconds: number) => void;
}

/**
 * Real screenshot or video when `src` is set, otherwise the striped placeholder with `children` as its label.
 * The media is wrapped so sizing classes (aspect, flex, absolute) behave the same either way.
 */
export function ProjectImage({
  src,
  kind = 'image',
  alt,
  fit = 'contain',
  overlay,
  active = true,
  onDuration,
  className,
  style,
  ...placeholder
}: ProjectImageProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  // Browsers refuse to play (and pause) off-screen muted video, so only play while it is on screen.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [src, kind]);

  useEffect(() => {
    if (active && video.current) video.current.currentTime = 0;
  }, [active, src]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (active && visible) el.play().catch(() => {});
    else el.pause();
  }, [active, visible, src]);

  if (!src) return <Placeholder className={className} style={style} {...placeholder} />;

  const mediaClass = cx('block size-full', fit === 'cover' ? 'object-cover' : 'object-contain');

  return (
    <div className={cx('overflow-hidden bg-surface', !!overlay && 'relative', className)} style={style}>
      {kind === 'video' ? (
        <video
          ref={video}
          src={src}
          aria-label={alt}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && onDuration?.(e.currentTarget.duration)}
          className={mediaClass}
        />
      ) : (
        <img src={src} alt={alt} loading="lazy" decoding="async" className={mediaClass} />
      )}
      {overlay && <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,.55)] p-6 text-center">{overlay}</div>}
    </div>
  );
}
