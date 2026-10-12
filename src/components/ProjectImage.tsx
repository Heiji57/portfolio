import type { ComponentProps, ReactNode } from 'react';
import { cx } from '@/lib/format';
import { Placeholder } from './Placeholder';

interface ProjectImageProps extends ComponentProps<typeof Placeholder> {
  src?: string;
  alt: string;
  /** `cover` fills the box and crops overflow; `contain` shows the whole image. */
  fit?: 'cover' | 'contain';
  /** Centred over the image on a dark scrim; only shown when `src` is set. */
  overlay?: ReactNode;
}

/**
 * Real screenshot when `src` is set, otherwise the striped placeholder with `children` as its label.
 * The image is wrapped so sizing classes (aspect, flex, absolute) behave the same either way.
 */
export function ProjectImage({ src, alt, fit = 'contain', overlay, className, style, ...placeholder }: ProjectImageProps) {
  if (!src) return <Placeholder className={className} style={style} {...placeholder} />;

  return (
    <div className={cx('relative overflow-hidden bg-surface', className)} style={style}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cx('block size-full', fit === 'cover' ? 'object-cover' : 'object-contain')}
      />
      {overlay && <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,.55)] p-6 text-center">{overlay}</div>}
    </div>
  );
}
