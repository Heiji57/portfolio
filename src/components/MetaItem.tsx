import { cx } from '@/lib/format';

interface MetaItemProps {
  label: string;
  value: string;
  /** `side` is the right-aligned sidebar on wide screens; `inline` sits in a grid. */
  variant: 'side' | 'inline';
  highlight?: boolean;
}

export function MetaItem({ label, value, variant, highlight }: MetaItemProps) {
  return (
    <div
      className={cx(
        'flex flex-col gap-1.5',
        variant === 'side'
          ? cx('border-r-2 pr-4', highlight ? 'border-fg' : 'border-line-strong')
          : 'py-4 pr-4',
      )}
    >
      <span className="font-mono text-micro text-fg-muted uppercase">{label}</span>
      <span className={cx('leading-[1.4] font-semibold', variant === 'side' ? 'text-base' : 'text-small')}>{value}</span>
    </div>
  );
}
