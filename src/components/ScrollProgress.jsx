import { useEffect, useRef } from 'react';

/** Thin gold bar at the top of the page showing scroll position. */
export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
