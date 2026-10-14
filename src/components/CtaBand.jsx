import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getProfile } from '../api/data.js';

export default function CtaBand({
  title = 'Building AI that has to be right? Let’s talk.',
  text = 'Open to conversations about AI evaluation, LLM and RAG systems, and fintech platforms.',
}) {
  const bg = getProfile().images?.cta;
  return (
    <section className="cta-band on-dark" aria-labelledby="cta-title">
      {bg && <img className="cta-bg" src={bg} alt="" loading="lazy" decoding="async" aria-hidden="true" />}
      <Container className="position-relative reveal">
        <span className="gold-rule mx-auto mb-4" />
        <h2 id="cta-title" className="text-center mx-auto cta-title">{title}</h2>
        {text && <p className="text-center cta-text mx-auto">{text}</p>}
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <Link to="/contact" className="btn btn-gold btn-lg btn-shine">
            <FontAwesomeIcon icon={faEnvelope} /> Get in touch
          </Link>
          {site.cvUrl && (
            <a href={site.cvUrl} className="btn btn-outline-brand btn-lg" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFileArrowDown} /> Download CV
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
