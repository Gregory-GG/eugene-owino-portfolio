import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getAdjacentWork, getCategory, getWorkItem } from '../api/data.js';
import { formatRange } from '../utils/contact.js';
import { iconFor } from '../utils/icons.js';
import SEO from '../components/SEO.jsx';
import TechChips from '../components/TechChips.jsx';
import NotFound from './NotFound.jsx';

export default function WorkDetail() {
  const { slug } = useParams();
  const item = getWorkItem(slug);
  if (!item) return <NotFound />;

  const category = getCategory(item.category);
  const { prev, next } = getAdjacentWork(item.slug);

  const facts = [
    ['Organization', item.organization],
    ['Dates', formatRange(item.start, item.end)],
    ['Location', item.location],
    ['Type', category?.label],
  ].filter(([, v]) => v);

  return (
    <>
      <SEO
        title={item.title}
        path={`/work/${item.slug}`}
        type="article"
        description={`${item.summary} ${item.organization}.`}
      />
      <section className="section detail-section">
        <Container>
          <Link to="/work" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to work
          </Link>
          {item.image && (
            <div className="detail-banner hero-enter" aria-hidden="true">
              <img src={item.image} alt="" fetchPriority="high" />
              <span className="detail-banner-org">{item.organization}</span>
            </div>
          )}
          <Row className="gy-5 gx-lg-5 mt-1">
            <Col lg={7} className="order-2 order-lg-1">
              <div className="detail-body reveal">
                <h2 className="h3 mb-4">Highlights</h2>
                <ul className="highlight-list">
                  {item.highlights.map((h, i) => (
                    <li key={h} className="reveal" style={{ '--reveal-delay': `${i * 60}ms` }}>
                      {h}
                    </li>
                  ))}
                </ul>
                {item.tech?.length > 0 && (
                  <>
                    <h2 className="h3 mt-5 mb-3">Tech</h2>
                    <TechChips items={item.tech} />
                  </>
                )}
              </div>
            </Col>
            <Col lg={5} className="order-1 order-lg-2">
              <div className="detail-info">
                <span className="detail-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={iconFor(item.icon)} />
                </span>
                {category && (
                  <Link to={`/work?category=${category.slug}`} className="eyebrow text-decoration-none d-flex mt-4">
                    {category.label}
                  </Link>
                )}
                <h1 className="detail-title mt-3">{item.title}</h1>
                <p className="lead-brand">{item.summary}</p>
                <dl className="detail-facts">
                  {facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="detail-cta">
                  <p className="font-heading mb-3">Working on something similar?</p>
                  <Link to="/contact" className="btn btn-gold">
                    <FontAwesomeIcon icon={faEnvelope} /> Get in touch
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          <nav className="post-nav" aria-label="More work">
            {prev ? (
              <Link to={`/work/${prev.slug}`} className="post-nav-link">
                <span className="post-nav-dir"><FontAwesomeIcon icon={faArrowLeft} /> More recent</span>
                <span className="post-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/work/${next.slug}`} className="post-nav-link text-end">
                <span className="post-nav-dir">Earlier <FontAwesomeIcon icon={faArrowRight} /></span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Container>
      </section>
    </>
  );
}
