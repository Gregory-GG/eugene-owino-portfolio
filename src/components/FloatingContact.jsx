import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { mailUrl } from '../utils/contact.js';

export default function FloatingContact() {
  return (
    <a href={mailUrl} className="fab-float" aria-label={`Email ${site.fullName}`} title="Send an email">
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
  );
}
