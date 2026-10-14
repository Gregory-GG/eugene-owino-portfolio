import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { getCategories, getCategory, getWork } from '../api/data.js';
import SEO from '../components/SEO.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CategoryPills from '../components/CategoryPills.jsx';
import SearchBar from '../components/SearchBar.jsx';
import WorkGrid from '../components/WorkGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';
import CtaBand from '../components/CtaBand.jsx';

const PAGE_SIZE = 12;

export default function Work() {
  const [params, setParams] = useSearchParams();
  const categories = getCategories();
  const category = getCategory(params.get('category')) ? params.get('category') : 'all';
  const q = params.get('q') || '';
  const sort = params.get('sort') === 'featured' ? 'featured' : 'newest';
  const [visible, setVisible] = useState(PAGE_SIZE);
  // Local input state keeps typing smooth; the URL follows it.
  const [search, setSearch] = useState(q);

  useEffect(() => setVisible(PAGE_SIZE), [category, q, sort]);

  const { items, total } = useMemo(
    () => getWork({ category, q, sort, limit: visible, offset: 0 }),
    [category, q, sort, visible]
  );

  const update = (key, value, fallback) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === fallback) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  };

  const onSearch = (value) => {
    setSearch(value);
    update('q', value, '');
  };

  const reset = () => {
    setSearch('');
    setParams(new URLSearchParams(), { replace: true });
  };
  const activeLabel = category === 'all' ? 'All work' : getCategory(category).label;

  return (
    <>
      <SEO
        title="Work"
        path="/work"
        description="Eugene Owino's roles, research and projects: AI evaluation platforms, LLM and RAG evaluation, payments infrastructure and fintech systems."
      />
      <section className="page-header">
        <Container className="hero-enter">
          <SectionHeading eyebrow="Work" title="Roles, research and projects" as="h1">
            Seven years across fintech platforms, AI evaluation and machine-learning research.
          </SectionHeading>
        </Container>
      </section>

      <section className="section pt-0" aria-label="Work">
        <Container>
          <div className="filter-bar">
            <CategoryPills categories={categories} active={category} onChange={(v) => update('category', v, 'all')} />
            <div className="filter-row">
              <SearchBar value={search} onChange={onSearch} />
              <div className="sort-select">
                <Form.Label htmlFor="work-sort" className="visually-hidden">
                  Sort
                </Form.Label>
                <Form.Select id="work-sort" value={sort} onChange={(e) => update('sort', e.target.value, 'newest')}>
                  <option value="newest">Most recent first</option>
                  <option value="featured">Featured first</option>
                </Form.Select>
              </div>
            </div>
          </div>

          <p className="results-count" aria-live="polite">
            {activeLabel} · {total} {total === 1 ? 'entry' : 'entries'}
            {q && <> matching “{q}”</>}
          </p>

          {items.length ? (
            <>
              <WorkGrid items={items} headingLevel="h2" />
              {items.length < total && (
                <div className="text-center mt-5">
                  <button type="button" className="btn btn-outline-brand" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Load more ({total - items.length} more)
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="No matching work"
              action={
                <button type="button" className="btn btn-gold" onClick={reset}>
                  Show all work
                </button>
              }
            >
              Try another search or category.
            </EmptyState>
          )}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
