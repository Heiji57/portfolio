import type { ComponentProps } from 'react';
import { cx } from '@/lib/format';

type SectionProps = ComponentProps<'section'> & { bordered?: boolean };

/** Page section with the shared horizontal gutter and top divider. */
export function Section({ bordered = true, className, ...props }: SectionProps) {
  return <section className={cx('px-gutter', bordered && 'border-t border-line', className)} {...props} />;
}
