import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowRight,
  faCertificate,
  faFileArrowDown,
  faFlask,
  faLocationDot,
  faQuoteLeft,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getExpertise, getFeaturedWork, getImpact, getProfile, getTestimonials, getWorkItem } from '../api/data.js';
import SEO from '../components/SEO.jsx';
import OrgStrip from '../components/OrgStrip.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import WorkGrid from '../components/WorkGrid.jsx';
import ExpertiseCard from '../components/ExpertiseCard.jsx';
import TechChips from '../components/TechChips.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ImpactStat from '../components/ImpactStat.jsx';
import RotatingWords from '../components/RotatingWords.jsx';
import TechMarquee from '../components/TechMarquee.jsx';

const HERO_WORDS = ['LLM & RAG evaluation', 'Red teaming', 'Fintech platforms', 'Evaluation pipelines'];
const TEASER_AREAS = ['ai-evaluation-platforms', 'llm-rag-evaluation', 'red-teaming-ai-safety', 'fintech-systems'];

export default function Home() {
  const profile = getProfile();
  const impact = getImpact();
  const featured = getFeaturedWork();
  const spotlight = getWorkItem(profile.spotlightSlug);
  const areas = getExpertise().filter((a) => TEASER_AREAS.includes(a.slug));
  const testimonials = getTestimonials();

  const scrollToWork = (e) => {
    e.preventDefault();
    const el = document.getElementById('featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <SEO description="Eugene Owino is a Toronto-based staff software engineer building AI evaluation systems and fintech platforms for regulated financial services." />

      {/* Hero */}
      <section className="hero hero-text on-dark" aria-labelledby="hero-title">
        {profile.images?.hero && (
          <div className="hero-photo" aria-hidden="true">
            <img src={profile.images.hero} alt="" fetchPriority="high" />
          </div>
        )}
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <Container className="hero-content">
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <div className="hero-copy hero-enter">
                <span className="eyebrow">
                  <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> {site.role} · {site.location.split(',')[0]}
                </span>
                <h1 id="hero-title" className="hero-title">
                  Eugene <span className="text-gold-hero">Owino</span>
                </h1>
                <p className="hero-tagline font-heading">{site.tagline}</p>
                <p className="hero-rotator">
                  <span className="text-muted-hero">Focused on </span>
                  <RotatingWords words={HERO_WORDS} />
                </p>
                <p className="hero-intro">
                  {profile.yearsExperience} years building fintech platforms and AI evaluation systems for regulated
                  financial services.
                </p>
                <ul className="hero-facts">
                  <li><FontAwesomeIcon icon={faUsers} aria-hidden="true" /> Leads a team of 8</li>
                  <li><FontAwesomeIcon icon={faFlask} aria-hidden="true" /> Part-time PhD, Waterloo</li>
                  <li><FontAwesomeIcon icon={faCertificate} aria-hidden="true" /> 6 cloud &amp; AI certifications</li>
                </ul>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a href="#featured" onClick={scrollToWork} className="btn btn-gold btn-lg btn-shine">
                    See the work <FontAwesomeIcon icon={faArrowDown} />
                  </a>
                  {site.cvUrl && (
                    <a href={site.cvUrl} className="btn btn-outline-brand btn-lg" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFileArrowDown} /> Download CV
                    </a>
                  )}
                </div>
              </div>
            </Col>
            {impact.length > 0 && (
              <Col lg={5}>
                <div className="impact-panel hero-enter-late">
                  <span className="impact-monogram" aria-hidden="true">{site.monogram}</span>
                  <h2 className="impact-heading">Selected impact</h2>
                  <dl className="impact-grid">
                    {impact.map((m) => (
                      <ImpactStat key={m.label} metric={m} />
                    ))}
                  </dl>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <OrgStrip />
      <TechMarquee />

      {/* Featured work */}
      <section className="section" id="featured" tabIndex={-1} aria-labelledby="featured-title">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-5 reveal">
            <SectionHeading eyebrow="Selected work" title="Roles, research and projects" id="featured-title">
              AI evaluation platforms, payments infrastructure, and research on evaluating models in finance.
            </SectionHeading>
            <Link to="/work" className="btn btn-outline-brand">
              All work <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <WorkGrid items={featured} />
        </Container>
      </section>

      {/* Engineer and researcher */}
      <section className="section section-surface split-section" aria-labelledby="split-title">
        <Container>
          <Row className="align-items-center gy-5 gx-lg-5">
            <Col lg={6}>
              <figure className="quote-card mb-0 reveal">
                {profile.images?.quote && <img className="quote-bg" src={profile.images.quote} alt="" loading="lazy" aria-hidden="true" />}
                <FontAwesomeIcon icon={faQuoteLeft} className="text-gold quote-mark" aria-hidden="true" />
                <blockquote className="font-heading">{profile.dissertation}</blockquote>
                <figcaption>PhD dissertation · University of Waterloo</figcaption>
              </figure>
            </Col>
            <Col lg={6} className="reveal" style={{ '--reveal-delay': '120ms' }}>
              <span className="eyebrow">Industry meets research</span>
              <h2 id="split-title" className="mt-3 mb-4">
                Engineer by trade, <em className="text-gold">researcher by training.</em>
              </h2>
              <p className="lead-brand">
                Eugene leads a team of 8 engineers building a production LLM/RAG evaluation platform for KYC, AML, fraud,
                and compliance workflows.
              </p>
              <p className="text-muted-brand">
                His part-time PhD in Computer Science at the University of Waterloo focuses on reliable evaluation of
                foundation models in finance. The research and the production work feed each other.
              </p>
              <Link to="/about" className="btn btn-outline-brand mt-3">
                About Eugene <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Project spotlight */}
      {spotlight && (
        <section className="section live-section" aria-labelledby="spotlight-title">
          <Container>
            <Row className="align-items-center gy-5 gx-lg-5">
              <Col lg={5} className="reveal">
                <span className="eyebrow">Project spotlight</span>
                <h2 id="spotlight-title" className="mt-3 mb-4">{spotlight.title}</h2>
                <p className="lead-brand">{spotlight.summary}</p>
                <p className="text-muted-brand">{spotlight.organization}</p>
                <Link to={`/work/${spotlight.slug}`} className="btn btn-outline-brand mt-3">
                  Read more <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </Col>
              <Col lg={7}>
                <div className="spotlight-panel reveal" style={{ '--reveal-delay': '120ms' }}>
                  {spotlight.image && <img className="spotlight-img" src={spotlight.image} alt="" loading="lazy" aria-hidden="true" />}
                  <ul className="spotlight-list">
                    {spotlight.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <TechChips items={spotlight.tech} label="Project keywords" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Expertise teaser */}
      <section className="section section-surface" aria-labelledby="expertise-title">
        <Container>
          <div className="reveal">
          <SectionHeading eyebrow="Expertise" title="Where the work sits" align="center" id="expertise-title">
            Evaluation, safety and infrastructure for AI in regulated financial services.
          </SectionHeading>
          </div>
          <Row xs={1} sm={2} lg={4} className="g-4 mt-4">
            {areas.map((a, i) => (
              <Col key={a.slug} className="reveal" style={{ '--reveal-delay': `${i * 90}ms` }}>
                <ExpertiseCard area={a} compact />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Link to="/expertise" className="btn btn-gold">
              All expertise <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Testimonials: hidden until real ones are added */}
      {testimonials.length > 0 && (
        <section className="section" aria-labelledby="testimonials-title">
          <Container>
            <SectionHeading eyebrow="Recommendations" title="What colleagues say" align="center" id="testimonials-title" />
            <Row xs={1} md={2} lg={3} className="g-4 mt-4">
              {testimonials.map((t, i) => (
                <Col key={i}>
                  <figure className="testimonial h-100">
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-gold" aria-hidden="true" />
                    <blockquote className="mt-3">{t.quote}</blockquote>
                    <figcaption>
                      <strong>{t.name}</strong>
                      {t.role && <span className="text-muted-brand"> · {t.role}</span>}
                    </figcaption>
                  </figure>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
