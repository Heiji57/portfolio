import { useState } from 'react';
import { profile } from '@/data/profile';
import { useInterval } from '@/hooks/useInterval';
import { cx, pad2 } from '@/lib/format';

/** Big rotating list of roles; the active one is lit and marked "← now". */
export function RoleTicker() {
  const { roles, initialRole, roleIntervalMs } = profile;
  const [active, setActive] = useState<number>(initialRole);
  useInterval(() => setActive((i) => (i + 1) % roles.length), roleIntervalMs);

  return (
    <ul className="m-0 list-none p-0">
      {roles.map((role, i) => {
        const on = i === active;
        return (
          <li key={role} className="flex min-w-0 items-baseline gap-7 border-b border-line py-3.5">
            <span className={cx('font-mono text-ui transition-colors duration-500', on ? 'text-fg' : 'text-fg-muted')}>
              {pad2(i + 1)}
            </span>
            <span
              className={cx(
                'font-display text-role whitespace-nowrap uppercase transition-colors duration-500',
                on ? 'text-fg' : 'text-fg/16',
              )}
            >
              {role}
            </span>
            <span
              className={cx('ml-auto font-mono text-label transition-opacity duration-500', on ? 'opacity-100' : 'opacity-0')}
            >
              ← now
            </span>
          </li>
        );
      })}
    </ul>
  );
}
