import { useEffect, useState, type RefObject } from 'react';
import { clamp01 } from '@/lib/format';

/**
 * For each `[data-focus-item]` inside `ref`, returns how close it is to the
 * viewport centre: 1 when near the middle, falling to 0 as it scrolls away.
 */
export function useScrollFocus(ref: RefObject<HTMLElement | null>) {
  const [focus, setFocus] = useState<number[]>([]);

  useEffect(() => {
    const update = () => {
      const container = ref.current;
      if (!container) return;
      const vh = window.innerHeight;
      const items = container.querySelectorAll<HTMLElement>('[data-focus-item]');
      setFocus(
        Array.from(items, (item) => {
          const r = item.getBoundingClientRect();
          const offset = (r.top + r.height / 2 - vh / 2) / vh;
          return 1 - clamp01((Math.abs(offset) - 0.28) * 2.2);
        }),
      );
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return focus;
}
