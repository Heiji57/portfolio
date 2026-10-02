import { useEffect, useState, type RefObject } from 'react';

/** True while at least `threshold` of the element is visible. */
export function useInView(ref: RefObject<Element | null>, threshold = 0) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return inView;
}
