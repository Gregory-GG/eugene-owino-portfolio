import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Fades elements with the "reveal" class in as they scroll into view.
 * Watches the page for new elements (route changes, "Load more") too.
 * Content stays visible when JS, IntersectionObserver or motion is unavailable.
 */
export default function useReveal() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      root.classList.remove('reveal-ready');
      return undefined;
    }
    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    const watch = () => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.getElementById('main') || document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname, search]);
}
