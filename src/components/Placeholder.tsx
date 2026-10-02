import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/format';

interface PlaceholderProps {
  children: ReactNode;
  /** `cover` puts the label bottom-left; `center` centres it. */
  variant?: 'cover' | 'center';
  stripes?: 'sm' | 'lg';
  className?: string;
  style?: CSSProperties;
}

/** Striped stand-in for project imagery until real screenshots exist. */
export function Placeholder({ children, variant = 'center', stripes = 'sm', className, style }: PlaceholderProps) {
  return (
    <div
      className={cx(
        'flex font-mono text-fg-muted',
        stripes === 'lg' ? 'bg-stripes-lg' : 'bg-stripes',
        variant === 'cover' ? 'items-end p-5 text-caption' : 'items-center justify-center',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
