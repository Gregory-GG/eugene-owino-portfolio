import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ value, onChange, placeholder = 'Search roles, companies, skills' }) {
  return (
    <div className="search-bar" role="search">
      <label htmlFor="portfolio-search" className="visually-hidden">
        Search work
      </label>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" aria-hidden="true" />
      <input
        id="portfolio-search"
        type="search"
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      {value && (
        <button type="button" className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  );
}
