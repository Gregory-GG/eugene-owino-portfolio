import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function EmptyState({ title = 'Nothing here yet', children, action }) {
  return (
    <div className="empty-state" role="status">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="empty-icon" aria-hidden="true" />
      <h3 className="mt-3">{title}</h3>
      {children && <p className="text-muted-brand mb-4">{children}</p>}
      {action}
    </div>
  );
}
