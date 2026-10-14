import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SEO from '../components/SEO.jsx';

export default function NotFound() {
  return (
    <section className="section notfound">
      <SEO title="Page not found" description="This page could not be found. Head back home or get in touch with Eugene Owino." />
      <Container className="text-center">
        <p className="notfound-code font-heading" aria-hidden="true">404</p>
        <span className="eyebrow">Not found</span>
        <h1 className="mt-3 notfound-title">This page failed evaluation.</h1>
        <p className="lead-brand mx-auto">The link may be old, or the page has moved.</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <Link to="/" className="btn btn-outline-brand">Back to home</Link>
          <Link to="/contact" className="btn btn-gold">Get in touch</Link>
        </div>
      </Container>
    </section>
  );
}
