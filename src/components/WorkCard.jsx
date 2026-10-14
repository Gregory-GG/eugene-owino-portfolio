import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { getCategory } from '../api/data.js';
import { formatRange } from '../utils/contact.js';
import { iconFor } from '../utils/icons.js';
import TechIcon from './TechIcon.jsx';

/** Image card for a role or project. The photo is decorative (stock), so it has empty alt text. */
export default function WorkCard({ item, headingLevel: H = 'h3' }) {
  const category = getCategory(item.category);
  const range = formatRange(item.start, item.end);
  const logos = (item.tech || []).filter(Boolean).slice(0, 12);
  return (
    <Link to={`/work/${item.slug}`} className="work-card spotlight">
      <div className="work-media work-poster">
        {item.image && <img src={item.image} alt="" loading="lazy" decoding="async" width="1000" height="625" />}
        <span className="work-shade" aria-hidden="true" />
        <span className="work-icon" aria-hidden="true">
          <FontAwesomeIcon icon={iconFor(item.icon)} />
        </span>
        {category && <span className="work-badge">{category.label}</span>}
        <span className="work-org">{item.organization}</span>
      </div>
      <div className="work-body">
        {range && (
          <span className="work-cat">
            <FontAwesomeIcon icon={faCalendar} aria-hidden="true" /> {range}
          </span>
        )}
        <H className="work-title">{item.title}</H>
        <p className="work-summary">{item.summary}</p>
        <div className="work-foot">
          <span className="work-logos" aria-hidden="true">
            {logos.map((t) => (
              <TechIcon key={t} name={t} />
            ))}
          </span>
          <span className="work-more">
            Details <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </div>
    </Link>
  );
}
