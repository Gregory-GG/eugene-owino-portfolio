import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getExpertise } from '../api/data.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ExpertiseCard from '../components/ExpertiseCard.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Expertise() {
  const areas = getExpertise();
  return (
    <>
      <SEO
        title="Expertise"
        path="/expertise"
        description="Eugene Owino's expertise: AI evaluation platforms, LLM and RAG evaluation, red teaming and AI safety, fintech systems, ML infrastructure and RLHF."
      />
      <section className="page-header">
        <Container className="hero-enter">
          <SectionHeading eyebrow="Expertise" title="AI you can measure, systems you can audit" as="h1">
            Evaluation, safety and infrastructure for AI in regulated financial services.
          </SectionHeading>
          <div className="service-notes">
            <p>
              <FontAwesomeIcon icon={faCloud} className="text-gold" aria-hidden="true" /> Python, Go, Java, TypeScript and SQL
              on AWS, GCP and Azure
            </p>
            <p>
              <FontAwesomeIcon icon={faLocationDot} className="text-gold" aria-hidden="true" /> {site.location}
            </p>
          </div>
        </Container>
      </section>
      <section className="section pt-0" aria-label="Expertise areas">
        <Container>
          <Row xs={1} md={2} xl={3} className="g-4">
            {areas.map((a, i) => (
              <Col key={a.slug} className="reveal" style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}>
                <ExpertiseCard area={a} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
