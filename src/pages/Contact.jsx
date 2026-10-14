import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleCheck,
  faEnvelope,
  faFileArrowDown,
  faLocationDot,
  faPaperPlane,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import site from '../config/site.js';
import { getExpertise, getExpertiseArea } from '../api/data.js';
import { mailUrl, mailtoUrl, telUrl } from '../utils/contact.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const REASONS = ['Full-time role', 'Contract or consulting', 'Research collaboration', 'Other'];
const EMPTY = { name: '', email: '', company: '', reason: '', topic: '', message: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'That email address does not look right.';
  if (!v.reason) e.reason = 'Please choose what this is about.';
  if (v.message.trim().length < 10) e.message = 'Please add a short message (at least 10 characters).';
  return e;
}

function buildBody(v) {
  const area = getExpertiseArea(v.topic);
  const lines = [`Name: ${v.name.trim()}`, `Email: ${v.email.trim()}`];
  if (v.company.trim()) lines.push(`Company: ${v.company.trim()}`);
  lines.push(`About: ${v.reason}`);
  if (area) lines.push(`Area: ${area.title}`);
  lines.push('', v.message.trim());
  return lines.join('\n');
}

export default function Contact() {
  const [params] = useSearchParams();
  const areas = getExpertise();
  const preselected = getExpertiseArea(params.get('topic'))?.slug || '';
  const [values, setValues] = useState({ ...EMPTY, topic: preselected });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const formRef = useRef(null);

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      formRef.current?.querySelector(`[name="${firstKey}"]`)?.focus();
      return;
    }
    const subject = `${values.reason}: message from ${values.name.trim()}`;
    const url = mailtoUrl(subject, buildBody(values));

    if (site.formspreeId) {
      // Formspree delivers the message directly; no mail app needed.
      fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          topic: getExpertiseArea(values.topic)?.title || '',
          _replyto: values.email.trim(),
          _subject: subject,
        }),
      })
        .then((r) => setSent({ url, name: values.name.trim().split(' ')[0], via: r.ok ? 'form' : 'mail' }))
        .catch(() => setSent({ url, name: values.name.trim().split(' ')[0], via: 'mail' }));
      return;
    }
    // No Formspree: open the visitor's email app with the message ready to send.
    window.location.href = url;
    setSent({ url, name: values.name.trim().split(' ')[0], via: 'mail' });
  };

  const field = (key) => ({
    name: key,
    value: values[key],
    onChange: set(key),
    isInvalid: Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  const error = (key) =>
    errors[key] ? (
      <Form.Control.Feedback type="invalid" id={`${key}-error`}>
        {errors[key]}
      </Form.Control.Feedback>
    ) : null;

  return (
    <>
      <SEO
        title="Contact"
        path="/contact"
        description="Contact Eugene Owino about roles, contract work or research collaboration in AI evaluation and fintech systems."
      />
      <section className="page-header">
        <Container className="hero-enter">
          <SectionHeading eyebrow="Contact" title="Let's talk" as="h1">
            Roles, contract work or research collaboration. Send a note and it goes straight to Eugene&apos;s inbox.
          </SectionHeading>
        </Container>
      </section>

      <section className="section pt-0">
        <Container>
          <Row className="gy-5 gx-lg-5">
            <Col lg={8}>
              <div className="form-card reveal">
                {sent ? (
                  <div className="text-center py-4" role="status" aria-live="polite">
                    <FontAwesomeIcon icon={faCircleCheck} className="confirm-icon" aria-hidden="true" />
                    <h2 className="mt-3">Thank you{sent.name ? `, ${sent.name}` : ''}.</h2>
                    {sent.via === 'form' ? (
                      <p className="lead-brand mx-auto">Your message has been sent to Eugene.</p>
                    ) : (
                      <>
                        <p className="lead-brand mx-auto">
                          Your message is ready in your email app. Press send there to reach Eugene.
                        </p>
                        <p className="text-muted-brand">Email app didn&apos;t open? Write to {site.email}.</p>
                      </>
                    )}
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                      {sent.via !== 'form' && (
                        <a href={sent.url} className="btn btn-gold">
                          <FontAwesomeIcon icon={faEnvelope} /> Open email again
                        </a>
                      )}
                      <Button
                        variant="outline-brand"
                        onClick={() => {
                          setSent(null);
                          setValues({ ...EMPTY, topic: preselected });
                        }}
                      >
                        Write another message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form noValidate onSubmit={onSubmit} ref={formRef} aria-label="Contact form">
                    <p className="text-muted-brand small mb-4">
                      Fields marked <span aria-hidden="true">*</span>
                      <span className="visually-hidden">with an asterisk</span> are required.
                    </p>
                    <Row className="g-4">
                      <Col md={6}>
                        <Form.Group controlId="contact-name">
                          <Form.Label>Your name *</Form.Label>
                          <Form.Control type="text" autoComplete="name" required {...field('name')} />
                          {error('name')}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="contact-email">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control type="email" autoComplete="email" required {...field('email')} />
                          {error('email')}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="contact-company">
                          <Form.Label>Company or organization</Form.Label>
                          <Form.Control type="text" autoComplete="organization" {...field('company')} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="contact-reason">
                          <Form.Label>What is this about? *</Form.Label>
                          <Form.Select required {...field('reason')}>
                            <option value="">Choose one</option>
                            {REASONS.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </Form.Select>
                          {error('reason')}
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="contact-topic">
                          <Form.Label>Area of interest</Form.Label>
                          <Form.Select {...field('topic')}>
                            <option value="">Any</option>
                            {areas.map((a) => (
                              <option key={a.slug} value={a.slug}>
                                {a.title}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="contact-message">
                          <Form.Label>Message *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="The role, project or question."
                            required
                            {...field('message')}
                          />
                          {error('message')}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" variant="gold" size="lg" className="mt-4 tw-w-full sm:tw-w-auto btn-shine">
                      <FontAwesomeIcon icon={faPaperPlane} /> Send message
                    </Button>
                  </Form>
                )}
              </div>
            </Col>

            <Col lg={4}>
              <aside className="contact-panel reveal" style={{ '--reveal-delay': '120ms' }} aria-labelledby="contact-title">
                <h2 id="contact-title" className="h3">Prefer to reach out directly?</h2>
                <a href={mailUrl} className="btn btn-gold w-100 mt-3">
                  <FontAwesomeIcon icon={faEnvelope} /> Email Eugene
                </a>
                <ul className="contact-list">
                  <li>
                    <a href={mailUrl} className="text-break">
                      <FontAwesomeIcon icon={faEnvelope} fixedWidth className="text-gold" /> {site.email}
                    </a>
                  </li>
                  {telUrl && (
                    <li>
                      <a href={telUrl}>
                        <FontAwesomeIcon icon={faPhone} fixedWidth className="text-gold" /> {site.phoneDisplay || site.phone}
                      </a>
                    </li>
                  )}
                  {site.linkedin && (
                    <li>
                      <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} fixedWidth className="text-gold" /> LinkedIn
                      </a>
                    </li>
                  )}
                  {site.github && (
                    <li>
                      <a href={site.github} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} fixedWidth className="text-gold" /> GitHub
                      </a>
                    </li>
                  )}
                  {site.cvUrl && (
                    <li>
                      <a href={site.cvUrl} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFileArrowDown} fixedWidth className="text-gold" /> Download CV (PDF)
                      </a>
                    </li>
                  )}
                  <li className="text-muted-brand">
                    <FontAwesomeIcon icon={faLocationDot} fixedWidth className="text-gold" /> {site.location}
                  </li>
                </ul>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
