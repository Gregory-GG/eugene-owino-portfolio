import { Container } from 'react-bootstrap';
import { getOrganizations } from '../api/data.js';

export default function OrgStrip({ title = 'Engineering and research at' }) {
  const orgs = getOrganizations();
  if (!orgs.length) return null;
  return (
    <section className="venue-strip" aria-labelledby="org-strip-title">
      <Container>
        <h2 id="org-strip-title" className="venue-strip-title">{title}</h2>
        <ul className="venue-list">
          {orgs.map((o) => (
            <li key={o.name}>
              <span className="venue-name">{o.name}</span>
              {o.note && <span className="venue-area">{o.note}</span>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
