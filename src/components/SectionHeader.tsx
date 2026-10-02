import type { ReactNode } from 'react';
import { cx } from '@/lib/format';
import { DisplayHeading, type DisplaySize } from './DisplayHeading';
import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  eyebrow: ReactNode;
  title: readonly ReactNode[];
  size: DisplaySize;
  className?: string;
  /** Extra content under the heading (description, body copy). */
  children?: ReactNode;
}

export function SectionHeader({ eyebrow, title, size, className = 'gap-4', children }: SectionHeaderProps) {
  return (
    <div className={cx('flex flex-col', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <DisplayHeading size={size} lines={title} />
      {children}
    </div>
  );
}
