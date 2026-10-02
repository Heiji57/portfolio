import { useEffect, useRef } from 'react';

const OVERLAY = [
  'linear-gradient(to right,rgba(11,11,12,.62) 0%,rgba(11,11,12,.55) 12%,rgba(11,11,12,.44) 22%,rgba(11,11,12,.3) 32%,rgba(11,11,12,.17) 42%,rgba(11,11,12,.07) 52%,rgba(11,11,12,0) 62%)',
  'radial-gradient(ellipse 70% 80% at 64% 45%,rgba(27,32,41,0) 45%,rgba(27,32,41,.85) 100%)',
  'linear-gradient(to bottom,rgba(11,11,12,0) 45%,rgba(11,11,12,.04) 55%,rgba(11,11,12,.12) 63%,rgba(11,11,12,.26) 71%,rgba(11,11,12,.45) 79%,rgba(11,11,12,.66) 87%,rgba(11,11,12,.85) 94%,#0b0b0c 100%)',
].join(',');

/** WebGL scene plus the gradient that fades it into the page. */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    // three.js is ~600KB; load it after first paint.
    import('./heroScene').then(({ mountHeroScene }) => {
      if (!cancelled && ref.current) dispose = mountHeroScene(ref.current);
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <>
      <div ref={ref} className="absolute inset-0 z-0" />
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: OVERLAY }} />
    </>
  );
}
