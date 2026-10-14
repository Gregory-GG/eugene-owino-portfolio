// Data access layer. Everything the UI knows about content comes through here,
// so this file can later be swapped for real API calls (e.g. fetch) without
// touching components. Functions are synchronous today; keep call sites simple.
import db from '../data/db.json';
import site from '../config/site.js';

// Dates are "YYYY-MM" strings, which sort correctly as text. Ongoing roles count as newest.
const endKey = (w) => (w.end ? w.end : w.start ? '9999-99' : '');
const byNewest = (a, b) => endKey(b).localeCompare(endKey(a)) || (b.start || '').localeCompare(a.start || '');
const byFeatured = (a, b) => {
  if (a.featured && b.featured) return a.featuredOrder - b.featuredOrder;
  if (a.featured) return -1;
  if (b.featured) return 1;
  return byNewest(a, b);
};

function matchesQuery(item, q) {
  const haystack = [item.title, item.organization, item.summary, ...(item.highlights || []), ...(item.tech || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function getProfile() {
  return db.profile;
}

export function getCategories() {
  return db.categories;
}

export function getCategory(slug) {
  return db.categories.find((c) => c.slug === slug) || null;
}

/**
 * @param {{category?: string, q?: string, sort?: 'newest'|'featured', limit?: number, offset?: number, featuredOnly?: boolean}} opts
 * @returns {{items: object[], total: number}}
 */
export function getWork({ category, q, sort = 'newest', limit, offset = 0, featuredOnly = false } = {}) {
  let list = db.work;
  if (featuredOnly) list = list.filter((w) => w.featured);
  if (category && category !== 'all') list = list.filter((w) => w.category === category);
  if (q && q.trim()) list = list.filter((w) => matchesQuery(w, q.trim()));
  list = [...list].sort(sort === 'featured' ? byFeatured : byNewest);
  const total = list.length;
  const items = typeof limit === 'number' ? list.slice(offset, offset + limit) : list.slice(offset);
  return { items, total };
}

export function getFeaturedWork() {
  return getWork({ featuredOnly: true, sort: 'featured' }).items;
}

export function getWorkItem(slug) {
  return db.work.find((w) => w.slug === slug) || null;
}

/** Previous (newer) and next (older) entries. */
export function getAdjacentWork(slug) {
  const list = [...db.work].sort(byNewest);
  const i = list.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: list[i - 1] || null, next: list[i + 1] || null };
}

export function getOrganizations() {
  return db.organizations || [];
}

export function getImpact() {
  return db.impact || [];
}

export function getExpertise() {
  return db.expertise || [];
}

export function getExpertiseArea(slug) {
  return getExpertise().find((e) => e.slug === slug) || null;
}

export function getSkills() {
  return db.skills || [];
}

export function getEducation() {
  return db.education || [];
}

export function getCertifications() {
  return db.certifications || [];
}

export function getTestimonials() {
  return [...(db.testimonials || []), ...(site.testimonials || [])];
}
