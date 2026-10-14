import { Row, Col } from 'react-bootstrap';
import WorkCard from './WorkCard.jsx';

export default function WorkGrid({ items, headingLevel = 'h3' }) {
  return (
    <Row xs={1} sm={2} lg={3} className="g-4 post-grid" as="ul" role="list">
      {items.map((w, i) => (
        <Col as="li" key={w.slug} className="list-unstyled reveal" style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}>
          <WorkCard item={w} headingLevel={headingLevel} />
        </Col>
      ))}
    </Row>
  );
}
