import { useEffect } from 'react';

/** Feeds the cursor position to cards (as --mx / --my) for the hover spotlight effect. */
export default function useSpotlight(selector = '.spotlight') {
  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover)').matches) return undefined;
    const onMove = (e) => {
      const card = e.target.closest?.(selector);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, [selector]);
}
