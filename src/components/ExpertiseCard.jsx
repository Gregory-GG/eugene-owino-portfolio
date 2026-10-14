import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { iconFor } from '../utils/icons.js';
import TechIcon from './TechIcon.jsx';

export default function ExpertiseCard({ area, compact = false }) {
  return (
    <article className="service-card spotlight h-100">
      {area.image && (
        <div className="service-media" aria-hidden="true">
          <img src={area.image} alt="" loading="lazy" decoding="async" width="900" height="600" />
        </div>
      )}
      <span className="service-icon" aria-hidden="true">
        <FontAwesomeIcon icon={iconFor(area.icon)} />
      </span>
      <h3 className="service-title">{area.title}</h3>
      <p className="text-muted-brand service-desc">{area.description}</p>
      {!compact && area.tags?.length > 0 && (
        <ul className="chip-list mb-4" aria-label={`${area.title} keywords`}>
          {area.tags.map((t) => (
            <li key={t} className="chip">
              <TechIcon name={t} />
              {t}
            </li>
          ))}
        </ul>
      )}
      {!compact && (
        <Link
          to={`/contact?topic=${area.slug}`}
          className="btn btn-outline-brand btn-sm mt-auto align-self-start"
          aria-label={`Get in touch about ${area.title}`}
        >
          Get in touch <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      )}
    </article>
  );
}
