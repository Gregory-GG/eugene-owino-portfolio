import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faAward,
  faCode,
  faFileArrowDown,
  faGraduationCap,
  faLocationDot,
  faMicrochip,
  faScaleBalanced,
  faServer,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getCertifications, getEducation, getProfile, getSkills } from '../api/data.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import TechChips from '../components/TechChips.jsx';
import TechIcon from '../components/TechIcon.jsx';

const GROUP_ICONS = {
  Languages: faCode,
  'AI Evaluation': faScaleBalanced,
  'ML and Data': faMicrochip,
  'Fintech Domain': faSackDollar,
  Infrastructure: faServer,
};
import CtaBand from '../components/CtaBand.jsx';

export default function About() {
  const profile = getProfile();
  const skills = getSkills();
  const education = getEducation();
  const certifications = getCertifications();

  return (
    <>
      <SEO
        title="About"
        path="/about"
        description="About Eugene Owino: staff software engineer in Toronto, part-time PhD at the University of Waterloo, building AI evaluation and fintech systems."
      />

      <section className="page-header about-intro">
        <Container>
          <Row className="align-items-center gy-5 gx-lg-5">
            <Col lg={5} className="order-lg-2">
              <figure className="about-visual mb-0 reveal">
                {profile.images?.about && <img src={profile.images.about} alt="Toronto skyline at night" loading="eager" />}
                <span className="about-visual-mark" aria-hidden="true">{site.monogram}</span>
                <figcaption>
                  <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> Based in {site.location}
                </figcaption>
              </figure>
            </Col>
            <Col lg={7} className="hero-enter">
              <span className="eyebrow">About</span>
              <h1 className="mt-3 mb-4">{site.fullName}</h1>
              <p className="lead-brand">
                {site.role} in {site.location}, working where AI evaluation meets regulated financial services.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                {site.cvUrl && (
                  <a href={site.cvUrl} className="btn btn-gold" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFileArrowDown} /> Download CV
                  </a>
                )}
                <Link to="/contact" className="btn btn-outline-brand">Get in touch</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section pt-0" aria-labelledby="story-title">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 id="story-title" className="visually-hidden">Profile</h2>
              <div className="story reveal">
                <h3>Today</h3>
                <p>
                  Eugene is a staff software engineer at Northwind Financial Technologies. He leads a team of 8 engineers
                  building a production AI evaluation platform for LLM and RAG systems used in KYC document review, AML case
                  summarization, fraud operations, payment support, and compliance Q&amp;A.
                </p>
                <h3>Evaluation first</h3>
                <p>
                  At Northwind, CI/CD quality gates he added cut post-deployment AI incidents by 35%. Before that, at Meridian
                  Payments, he built judge calibration pipelines and adversarial tests that caught 15 high-severity issues
                  before launch.
                </p>
                <h3>Payments roots</h3>
                <p>
                  Earlier, at Lumen Ledger Labs, he built Java/Spring Boot payment services, model-serving pipelines, and an
                  AI audit trail for reconciliation decisions.
                </p>
                <h3>Research</h3>
                <p>
                  He holds an MSc in Computer Science from the University of Toronto, where he was a graduate research
                  assistant in machine learning for financial systems, and a BSc in Computer Science from Stanford
                  University. His part-time PhD at the University of Waterloo focuses on reliable evaluation of foundation
                  models in finance.
                </p>
                <h3>Hands on</h3>
                <p className="mb-0">
                  He also works as a part-time AI model evaluation specialist, rating and ranking LLM outputs against detailed
                  rubrics and writing adversarial prompts. He builds in Python, Go, Java, TypeScript, and SQL on AWS, GCP, and
                  Azure.
                </p>
              </div>

              {profile.dissertation && (
                <figure className="pull-quote reveal">
                  <blockquote className="font-heading">“{profile.dissertation}”</blockquote>
                  <figcaption>PhD dissertation · University of Waterloo</figcaption>
                </figure>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {skills.length > 0 && (
        <section className="section section-surface" aria-labelledby="skills-title">
          <Container>
            <div className="reveal">
              <SectionHeading eyebrow="Toolkit" title="Core skills" id="skills-title" />
            </div>
            <Row xs={1} md={2} className="g-4 mt-3">
              {skills.map((s, i) => (
                <Col key={s.group} className="reveal" style={{ '--reveal-delay': `${(i % 2) * 100}ms` }}>
                  <div className="skill-group spotlight h-100">
                    <h3 className="skill-group-title">
                      <span className="skill-group-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={GROUP_ICONS[s.group] || faCode} />
                      </span>
                      {s.group}
                    </h3>
                    <TechChips items={s.items} label={s.group} />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      <section className="section" aria-label="Education and certifications">
        <Container>
          <Row className="gy-5 gx-lg-5">
            {education.length > 0 && (
              <Col lg={6} className="reveal">
                <span className="eyebrow">Education</span>
                <h2 className="mt-3 mb-4">Degrees</h2>
                <ul className="fact-list">
                  {education.map((e) => (
                    <li key={e.degree} className="fact-with-icon">
                      <span className="fact-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={faGraduationCap} />
                      </span>
                      <span className="fact-name">{e.degree}</span>
                      <span className="fact-meta">
                        {e.school}, {e.location} · {e.years}
                      </span>
                      {e.field && <span className="fact-meta">{e.field}</span>}
                      {e.note && <span className="fact-meta fst-italic">{e.note}</span>}
                    </li>
                  ))}
                </ul>
              </Col>
            )}
            {certifications.length > 0 && (
              <Col lg={6} className="reveal" style={{ '--reveal-delay': '120ms' }}>
                <span className="eyebrow">Credentials</span>
                <h2 className="mt-3 mb-4">Certifications</h2>
                <ul className="fact-list">
                  {certifications.map((c) => (
                    <li key={c.name} className="fact-with-icon">
                      <span className="fact-icon" aria-hidden="true">
                        {c.logo ? <TechIcon name={c.logo} /> : <FontAwesomeIcon icon={faAward} />}
                      </span>
                      <span className="fact-name">{c.name}</span>
                      <span className="fact-meta">
                        {c.issuer} · Issued {c.issued}
                      </span>
                    </li>
                  ))}
                </ul>
              </Col>
            )}
          </Row>
          <div className="mt-5">
            <Link to="/work" className="btn btn-outline-brand">
              See the work <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
