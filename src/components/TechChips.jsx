import TechIcon from './TechIcon.jsx';

export default function TechChips({ items, label = 'Technologies' }) {
  if (!items?.length) return null;
  return (
    <ul className="chip-list" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="chip">
          <TechIcon name={t} />
          {t}
        </li>
      ))}
    </ul>
  );
}
