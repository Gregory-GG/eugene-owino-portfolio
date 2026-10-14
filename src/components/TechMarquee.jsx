import { MARQUEE } from '../utils/techIcons.js';
import TechIcon from './TechIcon.jsx';

/** Endless strip of tech logos. The list is rendered twice so the loop is seamless. */
export default function TechMarquee({ items = MARQUEE }) {
  return (
    <section className="tech-marquee" aria-label="Technologies Eugene works with">
      <ul className="visually-hidden">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((t) => (
              <span className="marquee-item" key={`${copy}-${t}`}>
                <TechIcon name={t} />
                <span>{t}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
