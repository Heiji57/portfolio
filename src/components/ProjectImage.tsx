import type { ComponentProps } from 'react';
import { cx } from '@/lib/format';
import { Placeholder } from './Placeholder';

interface ProjectImageProps extends ComponentProps<typeof Placeholder> {
  src?: string;
  alt: string;
}

/**
 * Real screenshot when `src` is set, otherwise the striped placeholder with `children` as its label.
 * The image is wrapped so sizing classes (aspect, flex, absolute) behave the same either way.
 */
export function ProjectImage({ src, alt, className, style, ...placeholder }: ProjectImageProps) {
  if (!src) return <Placeholder className={className} style={style} {...placeholder} />;

  return (
    <div className={cx('overflow-hidden bg-surface', className)} style={style}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block size-full object-cover" />
    </div>
  );
}
