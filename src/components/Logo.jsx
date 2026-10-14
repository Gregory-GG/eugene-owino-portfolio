import { Link } from 'react-router-dom';
import site from '../config/site.js';

export default function Logo({ onClick }) {
  const [first, ...rest] = site.brandName.split(' ');
  return (
    <Link to="/" className="brand-logo" onClick={onClick} aria-label={`${site.brandName}, home`}>
      <span className="brand-mark" aria-hidden="true">{site.monogram}</span>
      <span className="brand-word">
        {first} <span className="text-gold">{rest.join(' ')}</span>
      </span>
    </Link>
  );
}
