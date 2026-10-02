import type { ReactNode } from 'react';
import { cx } from '@/lib/format';

const sizes = {
  '2xs': 'text-display-2xs',
  xs: 'text-display-xs',
  sm: 'text-display-sm',
  md: 'text-display-md',
  lg: 'text-display-lg',
  xl: 'text-display-xl',
  '2xl': 'text-display-2xl',
} as const;

export type DisplaySize = keyof typeof sizes;

interface DisplayHeadingProps {
  size: DisplaySize;
  /** Each entry renders on its own line. */
  lines: readonly ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'span';
  className?: string;
}

/** Anton, uppercase, tightly set heading. */
export function DisplayHeading({ size, lines, as: Tag = 'h2', className }: DisplayHeadingProps) {
  return (
    <Tag className={cx('m-0 font-display font-normal uppercase', sizes[size], className)}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </Tag>
  );
}
