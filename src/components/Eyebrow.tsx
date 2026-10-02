import type { ReactNode } from 'react';

/** Small mono label above section headings, e.g. "/ 02 Stack". */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="font-mono text-label tracking-eyebrow text-fg uppercase">{children}</span>;
}
