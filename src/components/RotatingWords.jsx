import { useEffect, useState } from 'react';

/** Cycles through words with a fade. Screen readers get the full list once. */
export default function RotatingWords({ words, interval = 2600 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="rotating">
      <span className="visually-hidden">{words.join(', ')}</span>
      <span className="rotating-word" key={i} aria-hidden="true">
        {words[i]}
      </span>
    </span>
  );
}
