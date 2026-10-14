import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import site from '../config/site.js';
import { telUrl, mailUrl } from '../utils/contact.js';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-5">
          <Col lg={5}>
            <Logo />
            <p className="footer-tagline font-heading">{site.tagline}</p>
            <p className="text-muted-brand mb-0">
              {site.role}. Building AI evaluation and fintech systems for regulated financial services.
            </p>
          </Col>
          <Col sm={6} lg={3}>
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-list">
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/expertise">Expertise</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          <Col sm={6} lg={4}>
            <h2 className="footer-heading">Contact</h2>
            <ul className="footer-list">
              <li>
                <a href={mailUrl} className="text-break"><FontAwesomeIcon icon={faEnvelope} fixedWidth /> {site.email}</a>
              </li>
              {telUrl && (
                <li>
                  <a href={telUrl}><FontAwesomeIcon icon={faPhone} fixedWidth /> {site.phoneDisplay || site.phone}</a>
                </li>
              )}
              {site.linkedin && (
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} fixedWidth /> LinkedIn
                  </a>
                </li>
              )}
              {site.github && (
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} fixedWidth /> GitHub
                  </a>
                </li>
              )}
              {site.cvUrl && (
                <li>
                  <a href={site.cvUrl} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFileArrowDown} fixedWidth /> Download CV (PDF)
                  </a>
                </li>
              )}
              <li className="text-muted-brand">
                <FontAwesomeIcon icon={faLocationDot} fixedWidth /> {site.location}
              </li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom">
          <span>© 2026 {site.fullName}</span>
        </div>
      </Container>
    </footer>
  );
}
