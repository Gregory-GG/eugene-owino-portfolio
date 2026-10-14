import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { techIcon } from '../utils/techIcons.js';

/** Monochrome tech logo that takes its brand colour on hover (via --brand). */
export default function TechIcon({ name, className = '', size }) {
  const icon = techIcon(name);
  if (!icon) return null;
  const style = { '--brand': icon.hex, ...(size ? { width: size, height: size } : {}) };
  if (icon.type === 'fa') {
    return <FontAwesomeIcon icon={icon.icon} className={`tech-icon ${className}`} style={style} aria-hidden="true" />;
  }
  return (
    <svg viewBox="0 0 24 24" className={`tech-icon ${className}`} style={style} aria-hidden="true" focusable="false">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
