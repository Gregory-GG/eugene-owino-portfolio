import { useEffect, useRef, useState } from 'react';

/** Counts from 0 to the number inside `value` (e.g. "35%") once the element is on screen. */
export default function useCountUp(value, duration = 1400) {
  const match = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? Number(match[2]) : null;
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (target === null || !el || reduce || !('IntersectionObserver' in window)) return undefined;
    let raf;
    setDisplay(`${match[1]}0${match[3]}`);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${match[1]}${Math.round(target * eased)}${match[3]}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return [ref, display];
}
